// Точка входа: состояние → ядро геометрии → рендер и UI.
//
// Два разных по цене конвейера. Изделие строится здесь же, чисто
// параметрически, за десяток миллисекунд — и пересобирается на каждое
// движение ползунка. Всё, что требует булевых операций (точная и экспортная
// сборка изделия с ручкой и носиком), уходит в воркер: WASM-модуль manifold
// в главный поток не грузится вовсе, и вкладка не замирает. Оснастку —
// формы, ванночки, отминку — строит cast-builder по выгруженному STL.

import 'maker-kit/styles/kit.css';
import './style.css';
import { el } from 'maker-kit/ui/dom';
import { restoreCards, snapshotCards } from 'maker-kit/ui/card';
import { createScene } from './render/scene';
import { renderFamilyPicker } from './ui/family';
import { shapeControls } from './ui/params';
import type { ControlsHandle } from './ui/controls';
import { renderControls } from './ui/controls';
import { renderReliefCards } from './ui/reliefCards';
import { renderAttachCards } from './ui/attachCards';
import type { ConcaveCardHandle } from './ui/concaveCard';
import { renderConcaveCard } from './ui/concaveCard';
import { renderExportPanel } from './ui/exportPanel';
import { drawProfileGraph } from './ui/graph';
import { createProgress } from 'maker-kit/ui/progress';
import { renderPresetList } from 'maker-kit/ui/presetList';
import { createModal } from 'maker-kit/ui/modal';
import type { StorageStatus } from 'maker-kit/ui/banner';
import { renderBanner } from 'maker-kit/ui/banner';
import type { MessageLine } from 'maker-kit/ui/messageList';
import { renderMessages } from 'maker-kit/ui/messageList';
import { setupSheet } from 'maker-kit/ui/sheet';
import { createLanguagePicker } from 'maker-kit/ui/languagePicker';
import { bindHistory } from 'maker-kit/ui/historyKeys';
import { download } from 'maker-kit/ui/files';
import { applyStaticText } from './ui/staticText';
import { registerServiceWorker } from './pwa';
import type { Key } from './i18n';
import { initLang, lang, setLang, onLangChange, t, tm, tDynamic, hasKey, autoPresetPrefixes, LANGS } from './i18n';
import type { JobProgress } from 'maker-kit/core/progress';
import type { Message } from 'maker-kit/core/message';
import type { SurfaceMesh } from 'maker-kit/3d/mesh';
import { placeInRow, LID_BESIDE_GAP_MM } from './geo/layout';
import { buildVessel, vesselSurface } from './geo/build';
import { buildHandles } from './geo/handle';
import { buildAppliedSpout } from './geo/spout';
import { MARK_DEPTH_MAX_MM, markWarnings } from './geo/mark';
import type { MarkRaster } from './geo/mark';
import { markStrip } from './ui/markRaster';
import { buildHollowVessel } from './geo/hollow';
import { lidFit, lidSeat, buildLidMesh, lidHeightMm, lidDomeContext } from './geo/lid';
import { buildProfile, profileRadius } from './geo/profiles';
import { bandLayout, isContinuous } from './geo/roulette';
import type { RouletteBand, RouletteContext } from './geo/roulette';
import { encodeSTL } from 'maker-kit/3d/stl';
import { validateMesh, assessExport, signedVolume } from 'maker-kit/3d/validate';
import type { OverhangSkip } from './geo/overhang';
import { overhangFraction } from './geo/overhang';
import type { ConcaveLayout } from './geo/concave';
import { concaveLayout, concaveWarnings } from './geo/concave';
import type { AppState } from './state/schema';
import { defaultState, stateForFamily, sanitizeState, toBuildParams, effectiveSpout, lidRelief } from './state/schema';
import { BLANK_PRESET, PRESETS, presetById, presetSignature } from './state/presets';
import { encodeStateToken, decodeStateToken, tokenFromHash } from './state/share';
import { encodePresetFile, decodePresetFile, presetFileName } from './state/presetFile';
import type { ClayPreset } from './state/userPresets';
import { savePresetAs, userPresetsRecord } from './state/userPresets';
import type { StoredProject } from './state/project';
import { projectRecord } from './state/project';
import { History } from 'maker-kit/core/history';
import type { StorageWrite } from 'maker-kit/core/storage';
import { browserStorage, loadRecord, saveRecord } from 'maker-kit/core/storage';
import type { PresetRef } from 'maker-kit/core/presets';
import { nextPresetName, presetStatus, removeUserPreset, renameUserPreset } from 'maker-kit/core/presets';
import type { JobPart } from './worker/protocol';
import { createCsgClient } from './worker/client';

/** Детализация превью изделия: ~10 мс на пересборку, незаметно при перетаскивании. */
const PREVIEW_SEGMENTS = 192;
/**
 * Для точной сборки изделия — тоже огрубляем, по той же причине: на 192
 * булевы операции стоят больше двух секунд, на 128 — около секунды. Показать
 * надо срезанные торцы и сквозной носик, а не миллиметры силуэта: их и так
 * рисует быстрое превью на полной сетке.
 */
const EXACT_SEGMENTS = 128;
/** Полная проверка меша стоит ~70 мс — гоняем её, когда пользователь остановился. */
const AUDIT_DELAY_MS = 220;
/**
 * Всё, что считает воркер, — сотни миллисекунд: точная сборка изделия с
 * ручкой и носиком. Ждём паузы подольше, чем проверки меша.
 */
const CSG_DELAY_MS = 400;
/** Зазор между изделием и крышкой рядом — тот же, что воркер кладёт в STL. */
const BESIDE_GAP_MM = LID_BESIDE_GAP_MM;
/** Сколько шагов помнит отмена. */
const HISTORY_LIMIT = 80;
/**
 * Ниже этой доли высоты кончик носика уже мешает: изделие наполняется только
 * до него, и пятая часть высоты пропадает впустую. Чуть ниже венчика кончик
 * стоит и у настоящих чайников — на это ругаться незачем.
 */
const SPOUT_BELOW_RIM = 0.8;

// Язык — раньше всякой отрисовки: панель строится сразу на нём.
initLang();
applyStaticText(document);

const view = el('view', HTMLCanvasElement);
const panel = el('panel', HTMLElement);
const familyGrid = el('familyGrid', HTMLDivElement);
const shapeParams = el('shapeParams', HTMLDivElement);
const concaveHost = el('concaveCard', HTMLDivElement);
const reliefCards = el('reliefCards', HTMLDivElement);
const attachCards = el('attachCards', HTMLDivElement);
const exportParams = el('exportParams', HTMLDivElement);
const profileGraph = el('profileGraph', HTMLCanvasElement);
const exportBtn = el('exportBtn', HTMLButtonElement);
const statusEl = el('status', HTMLParagraphElement);
const auditEl = el('audit', HTMLParagraphElement);
const messagesEl = el('messages', HTMLUListElement);
const storageNote = el('storageNote', HTMLDivElement);
const presetBtn = el('presetBtn', HTMLButtonElement);
const presetList = el('presetList', HTMLDivElement);
const presetsDialog = createModal(el('presets', HTMLDivElement), { close: el('presetsClose', HTMLButtonElement) });
const saveBtn = el('saveBtn', HTMLButtonElement);
const fileOpenBtn = el('fileOpenBtn', HTMLButtonElement);
const fileSaveBtn = el('fileSaveBtn', HTMLButtonElement);
const fileInput = el('fileInput', HTMLInputElement);
const shareBtn = el('shareBtn', HTMLButtonElement);
const undoBtn = el('undoBtn', HTMLButtonElement);
const redoBtn = el('redoBtn', HTMLButtonElement);
const progress = createProgress(el('progressWrap', HTMLDivElement), { t });

const scene = createScene(view);
const csg = createCsgClient();
const storage = browserStorage();
const opening = openingProject();
const history = new History<AppState>(opening.state, HISTORY_LIMIT);
let state: AppState = history.state;
const historyKeys = bindHistory({
  undo: undoBtn,
  redo: redoBtn,
  onUndo: () => stepHistory('undo'),
  onRedo: () => stepHistory('redo'),
  canUndo: () => history.canUndo,
  canRedo: () => history.canRedo,
});

/**
 * С чем открываемся. Ссылка со состоянием важнее всего: по ней открывают
 * чужую работу. Без неё — изделие, сохранённое в браузере (оно же
 * переживает перезагрузку на новую версию), без него — изделие по умолчанию.
 */
function openingProject(): StoredProject {
  const token = tokenFromHash(location.hash);
  const linked = token ? decodeStateToken(token) : null;
  if (linked) return { state: linked, ref: '', name: '' };
  return loadRecord(storage, projectRecord) ?? { state: defaultState(), ref: '', name: '' };
}

// Панель целиком: строится при старте и заново на каждой смене языка —
// подписи переводятся при отрисовке. Состояние при этом не трогается.
let picker: ReturnType<typeof renderFamilyPicker>;
let paramRows: ControlsHandle<AppState>;
let concaveRows: ConcaveCardHandle;
let reliefRows: ReturnType<typeof renderReliefCards>;
let attachRows: ReturnType<typeof renderAttachCards>;
let exportPanel: ReturnType<typeof renderExportPanel>;

function renderPanel(): void {
  picker = renderFamilyPicker(familyGrid, state.family, (id) => {
    applyState(stateForFamily(id, state), true);
  });

  paramRows = renderShapeParams();

  concaveRows = renderConcaveCard(
    concaveHost,
    () => state.concave,
    (concave, final) => applyState({ ...state, concave }, final),
    () => scene?.viewBottom(),
  );

  reliefRows = renderReliefCards(
    reliefCards,
    () => state.relief,
    () => state.roulette,
    (relief, final) => applyState({ ...state, relief }, final),
    (roulette, final) => applyState({ ...state, roulette }, final),
  );

  attachRows = renderAttachCards(
    attachCards,
    {
      handle: () => state.handle,
      spout: () => state.spout,
      lid: () => state.lid,
      mark: () => state.mark,
    },
    {
      handle: (handle, final) => applyState({ ...state, handle }, final),
      spout: (spout, final) => applyState({ ...state, spout }, final),
      lid: (lid, final) => applyState({ ...state, lid }, final),
      mark: (mark, final) => applyState({ ...state, mark }, final),
      viewBottom: () => scene?.viewBottom(),
    },
  );

  exportPanel = renderExportPanel(exportParams, el('partList', HTMLUListElement), () => state, applyState);
}
renderPanel();

/** Высота и параметры семейства: `#p_heightMm`, `#p_dBelly`… */
function renderShapeParams(): ControlsHandle<AppState> {
  return renderControls(shapeParams, shapeControls(state.family), () => state, applyState, 'p');
}

/**
 * Правка из панели. Кадр жеста (`final` = false: ползунок тащат) показывается
 * сразу, но шагом отмены становится только законченная правка — протаскивание
 * ползунка от края до края это одно действие, а не двести.
 */
function applyState(next: AppState, final: boolean): void {
  const clean = sanitizeState(next);
  if (final) history.commit(clean);
  else history.live(clean);
  showState(clean);
  if (final) keepProject();
}

/** Показывает состояние, которое история уже держит: правку, отмену, старт. */
function showState(next: AppState): void {
  // у каждого семейства свой набор параметров, поэтому смена семейства
  // требует пересоздать строки, а не просто обновить значения
  const familyChanged = next.family !== state.family;
  state = next;
  if (familyChanged) {
    picker.setActive(state.family);
    paramRows = renderShapeParams();
  }
  syncPanel();
}

/** Значения панели — из состояния; плюс пересчёт всего, что от него зависит. */
function syncPanel(): void {
  paramRows.sync(state);
  concaveRows.sync(state.concave);
  reliefRows.sync(state.relief, state.roulette);
  attachRows.sync(state.handle, state.spout, state.lid, state.mark);
  exportPanel.sync(state);
  historyKeys.refresh();
  showPresetButton();
  refresh();
}

/**
 * Предупреждения о самой форме — их считает refresh. Проверка меша дописывает
 * к ним свои и может пройти дважды (по быстрому превью и по точной сборке),
 * поэтому списки хранятся отдельно, а не вычитываются обратно из разметки.
 */
let baseWarnings: MessageLine[] = [];
/** Вердикт проверки меша: что мешает выгрузке и о чём стоит знать. */
let meshLines: MessageLine[] = [];
/** Последняя неудача — сборка, экспорт, чужой файл; держится до следующей проверки меша. */
let failures: MessageLine[] = [];

/** Строка списка сообщений из кода словаря; код уходит в `data-code` (смоук). */
function line(severity: 'bad' | 'warn', message: Message<Key>): MessageLine {
  return { severity, text: tm(message), code: message.code };
}

/** Блокировки первыми, затем предупреждения. */
function showMessages(): void {
  const bad = meshLines.filter((item) => item.severity === 'bad');
  const warn = meshLines.filter((item) => item.severity !== 'bad');
  renderMessages(messagesEl, [...failures, ...bad, ...baseWarnings, ...warn]);
}

let auditTimer: ReturnType<typeof setTimeout> | null = null;
let exactTimer: ReturnType<typeof setTimeout> | null = null;
/** Растёт на каждую пересборку: поздний ответ от старой сборки не должен перебить свежую. */
let generation = 0;
/** Растр строки клейма последней сборки — его же получает воркер. */
let markRaster: MarkRaster | null = null;
/** Вогнутое дно последней сборки: проверка меша не считает его свесом. */
let concave: ConcaveLayout | null = null;

function refresh(): void {
  generation++;
  const stamp = generation;

  const profile = buildProfile(state.family, state.shape, state.heightMm);
  const flatMm = profileRadius(profile, 0);
  concave = concaveLayout(state.concave, flatMm, state.heightMm);
  concaveRows.setDepth(concave?.depthMm ?? null);
  drawProfileGraph(profileGraph, profile, concave?.section);

  reliefRows.setBandNote((band) =>
    describeBand(band, {
      heightMm: state.heightMm,
      radiusAt: (v) => profileRadius(profile, v),
    }),
  );

  // Строку клейма рисует шрифтом только главный поток; воркеру она уходит
  // готовым растром вместе с задачей.
  markRaster = markStrip(state.mark, () => refresh());
  const buildParams = toBuildParams(state, PREVIEW_SEGMENTS, markRaster);
  // Посадку под крышку считаем от того же силуэта и той же стенки, из
  // которых строится полость: крышка обязана входить именно в неё.
  const fit = state.lid.on ? lidFit(profile, state.heightMm, state.hollow, state.lid) : null;
  const hollow = buildHollowVessel(buildParams, state.hollow, fit ? lidSeat(fit) : undefined);
  const outer = buildVessel(buildParams);
  // Крышке булевы операции не нужны — она тело вращения, — поэтому и в
  // превью, и в экспорте её строит один и тот же параметрический код.
  // Надетой её показываем сразу, без ожидания воркера.
  // «Крышка рядом» — в печатном положении, юбкой вниз; иначе — надетой.
  const beside = Boolean(fit) && state.lidBeside;
  if (fit) {
    const dome = lidDomeContext(fit, state.lid);
    attachRows.setLidBandNote((band) => describeBand(band, dome));
  }
  const lidMeshes = fit
    ? [
        buildLidMesh(fit, state.lid, PREVIEW_SEGMENTS, {
          relief: lidRelief(state),
          ...(beside ? {} : { liftMm: fit.liftMm }),
        }),
      ]
    : [];

  baseWarnings = [];
  if (hasAppliedSpout() && state.spout.tipAt < SPOUT_BELOW_RIM) {
    baseWarnings.push(line('warn', { code: 'warn.spoutLow' }));
  }
  if (hollow.pinchedFraction > 0) {
    baseWarnings.push(line('warn', { code: 'warn.pinched', params: { pct: (hollow.pinchedFraction * 100).toFixed(1) } }));
  }
  baseWarnings.push(...concaveWarnings(state.concave, flatMm, state.heightMm).map((message) => line('warn', message)));
  // клеймо на вогнутом дне — в утопленном круге
  baseWarnings.push(...markWarnings(buildParams.mark, concave?.markMm ?? flatMm).map((message) => line('warn', message)));
  if (fit?.tooNarrow) {
    baseWarnings.push(line('warn', { code: 'warn.lidNarrow', params: { d: (fit.seatMm * 2).toFixed(0) } }));
  }
  // предупреждения меша — от прошлой сборки: их заново скажет проверка, блокировки держатся до неё
  meshLines = meshLines.filter((item) => item.severity === 'bad');
  showMessages();

  const widthMm = outerWidth(outer.positions);
  // Глина считается по всему, что придётся напечатать: крышка — такая же
  // деталь изделия, как тело.
  const clayMl = [hollow.mesh, ...lidMeshes].reduce((sum, mesh) => sum + signedVolume(mesh.positions, mesh.indices), 0) / 1000;
  statusEl.textContent = [
    t('size.round', { d: widthMm.toFixed(0), h: state.heightMm.toFixed(0) }),
    t('status.capacity', { v: formatVolume(hollow.capacityMl) }),
    t('status.clay', { v: formatVolume(clayMl) }),
  ].join(' · ');

  if (auditTimer) clearTimeout(auditTimer);
  if (exactTimer) clearTimeout(exactTimer);

  // Пока ползунок в движении, ручку и носик рисуем отдельными мешами: CSG
  // на каждое движение стоил бы 300 мс вместо 10. Снаружи это выглядит
  // ровно как объединение — а вот внутри полости торчат утопленные торцы,
  // и носик стоит заглушенным. Поэтому по паузе картинку заменяет
  // настоящая сборка из воркера (showExactVessel).
  const surface = vesselSurface(buildParams);
  const tube = buildAppliedSpout(effectiveSpout(state), surface.profile, surface.heightMm);
  const shell = hollow.mesh;
  const body = [shell, ...buildHandles(state.handle, surface.profile, surface.heightMm), ...(tube ? [tube] : [])];
  // крышку ставим по габариту тела вместе с ручкой и носиком: точная
  // сборка потом подменит только тело, а крышка останется где стояла
  const lids = beside ? placeInRow([body, lidMeshes], BESIDE_GAP_MM)[1] : lidMeshes;
  scene?.setMeshes([...body, ...lids]);
  const lidNote = fit ? t('size.round', { d: (fit.fieldMm * 2).toFixed(0), h: lidHeightMm(fit, state.lid).toFixed(0) }) : '';
  exportPanel.setParts(
    beside
      ? [{ label: t('part.vesselLid'), note: t('part.oneFile') }]
      : [
          { label: t('part.vessel'), note: t('part.clay', { v: (clayMl / 1000).toFixed(2) }) },
          ...(fit ? [{ label: t('part.lid'), note: lidNote }] : []),
        ],
  );
  auditEl.textContent = t('audit.checking');
  // Быстрый вердикт — по оболочке: он приходит через четверть секунды и
  // почти всегда окончательный. Если есть приставные детали, следом
  // подъезжает точная сборка из воркера и перепроверяет уже её — то самое,
  // что уйдёт в STL.
  auditTimer = setTimeout(() => audit([shell, ...lids]), AUDIT_DELAY_MS);
  if (state.handle.on || hasAppliedSpout()) {
    exactTimer = setTimeout(() => void showExactVessel(stamp, lids), CSG_DELAY_MS);
  }
}

/**
 * Заменяет быстрое превью настоящей сборкой — той самой, что уходит в STL.
 * Только на ней видно, что торцы ручки срезаны полостью, а носик сквозной:
 * склеить это без булевых операций нельзя, поэтому считает воркер.
 */
async function showExactVessel(stamp: number, lidMeshes: SurfaceMesh[]): Promise<void> {
  try {
    // Крышку воркер не считает вовсе: булевых операций ей не нужно, а
    // построенная здесь она уже стоит в сцене — надетой и точной.
    // Без хода работ: у превью один этап, и шкала «0 из 1» выглядела бы
    // зависшей — полоса кита бежит, пока задача идёт.
    const done = await progress.track(csg.run({ kind: 'vessel-preview', state, segments: EXACT_SEGMENTS, markStrip: markRaster }));
    if (!done || stamp !== generation) return;
    const mesh = toMesh(done.result[0]);
    scene?.setMeshes([mesh, ...lidMeshes]);
    audit([mesh, ...lidMeshes]);
  } catch (error) {
    // Сборка не удалась — значит и экспорт не удастся: это тот же код.
    // Молчать об этом нельзя, на экране осталось бы приблизительное превью.
    if (stamp !== generation) return;
    auditEl.textContent = '';
    failures = [line('bad', { code: 'error.vessel', params: { error: message(error) } })];
    showMessages();
    exportBtn.disabled = true;
  }
}

/** Этап задачи воркера для полосы: его код — строка, полоса берёт те, что есть в словаре. */
function stage(progress: JobProgress): JobProgress<Key> {
  const label = progress.label;
  return label && hasKey(label.code)
    ? { ...progress, label: { code: label.code, params: label.params } }
    : { step: progress.step, total: progress.total };
}

/** Меш детали из ответа воркера — буферы пришли переносом, копий нет. */
function toMesh(part: JobPart): SurfaceMesh {
  return { positions: part.positions, indices: part.indices, normals: part.normals };
}

/**
 * Вердикт по всем деталям изделия разом: тело и, если она есть, крышка.
 * Замкнутость и блокировки — по каждой, а свесы меряем только по телу: у
 * крышки потолок купола нависает при любых параметрах, и это предупреждение
 * стало бы вечным шумом, от которого отучаются читать и остальные.
 */
function audit(meshes: SurfaceMesh[]): void {
  const reports = meshes.map((mesh) => validateMesh(mesh));
  const assessments = reports.map((report) => assessExport(report, true));
  const triangles = reports.reduce((sum, report) => sum + report.triangleCount, 0);
  const blocking = assessments.flatMap((assessment) => assessment.blockers);
  const overhang = overhangFraction(meshes[0], 60, bottomSkip());

  auditEl.textContent = reports.every((report) => report.watertight)
    ? t('audit.watertight', { k: Math.round(triangles / 1000) })
    : t('audit.open');

  meshLines = [
    ...blocking.map((message) => line('bad', message)),
    ...assessments.flatMap((assessment) => assessment.warnings).map((message) => line('warn', message)),
    ...(overhang > 0.15 ? [line('warn', { code: 'warn.overhang', params: { pct: (overhang * 100).toFixed(0) } })] : []),
  ];
  failures = [];
  showMessages();
  exportBtn.disabled = blocking.length > 0;
}

/**
 * Вогнутое дно нависает нарочно — это решение, а не ошибка формы, и в
 * процент свесов оно не идёт: цилиндр под ним вместе с оттиском клейма.
 */
function bottomSkip(): OverhangSkip | undefined {
  return concave ? { radiusMm: concave.footprintMm + 0.01, heightMm: concave.depthMm + MARK_DEPTH_MAX_MM + 0.01 } : undefined;
}

/**
 * Есть ли приставная трубка носика. Оттянутый край не в счёт: он оставляет
 * изделие телом вращения, а вбок торчит только трубка.
 */
function hasAppliedSpout(): boolean {
  return state.spout.on && state.spout.kind === 'applied';
}

/** Подпись полосы накатки: сколько оттисков ляжет за оборот и с каким шагом. */
function describeBand(band: RouletteBand, ctx: RouletteContext): string {
  if (band.pattern === 'image' && !band.image) return t('band.noImage');
  const layout = bandLayout(band, ctx);
  const params = {
    n: layout.repeats,
    d: (layout.circumferenceMm / Math.PI).toFixed(0),
    step: layout.stepMm.toFixed(1),
    gap: layout.gapMm.toFixed(1),
  };
  return t(isContinuous(band.pattern) ? 'band.continuous' : 'band.discrete', params);
}

function outerWidth(positions: Float32Array): number {
  let max = 0;
  for (let i = 0; i < positions.length; i += 3) {
    max = Math.max(max, Math.hypot(positions[i], positions[i + 1]));
  }
  return max * 2;
}

function formatVolume(millilitres: number): string {
  return millilitres >= 1000 ? t('volume.l', { v: (millilitres / 1000).toFixed(2) }) : t('volume.ml', { v: millilitres.toFixed(0) });
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

exportBtn.addEventListener('click', () => {
  void runExport();
});

async function runExport(): Promise<void> {
  const label = exportBtn.textContent;
  exportBtn.disabled = true;
  exportBtn.textContent = t('export.busy');
  try {
    // Экспортная детализация — до 384 сегментов; в главном потоке это
    // подвешивало вкладку на секунды, поэтому считает воркер, а полоса
    // показывает, что он не умер.
    const done = await progress.track(
      (onProgress) => csg.run({ kind: 'export', state, markStrip: markRaster }, (p) => onProgress(stage(p))),
      {
        label: 'progress.export',
        delayMs: 0,
      },
    );
    if (!done) return;
    const files = done.result;

    const blocking = files.flatMap((file) => file.blockers);
    if (blocking.length > 0) {
      failures = blocking.map((message) => line('bad', message));
      showMessages();
      return;
    }
    failures = [];
    showMessages();
    for (const file of files) {
      const name = `clayform-${state.family}-${file.id}.stl`;
      download(name, encodeSTL(toMesh(file), { brand: 'ClayForm', name: file.id }), 'model/stl');
      // браузер глотает пачку одновременных загрузок — разносим по времени
      // oxlint-disable-next-line no-await-in-loop -- по одной нарочно
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  } catch (error) {
    failures = [line('bad', { code: 'error.export', params: { error: message(error) } })];
    showMessages();
  } finally {
    exportBtn.textContent = label;
    exportBtn.disabled = false;
  }
}

// --- пресеты ---

let userPresets: ClayPreset[] = loadRecord(storage, userPresetsRecord) ?? [];
/** Какой пресет открыт: 'b:<id>', 'u:<id>' или пусто — его подсвечивает список. */
let presetRef: PresetRef = opening.ref;
/**
 * Имя, данное руками: файлу при сохранении или пришедшее с открытым файлом.
 * Важнее имени пресета, пока не открыт другой пресет.
 */
let givenName = opening.name;
/** Последняя запись изделия в браузер: её сбой держится в баннере, пока длится. */
let projectWrite: StorageWrite = 'ok';
/** Неудачная запись пресета — в баннере, пока её не скроют. */
let presetFailure: StorageStatus['preset'] = null;

/** Имя встроенного пресета — на текущем языке. */
function builtinName(id: string): string {
  return tDynamic(`preset.${id}`);
}

/** Имя проекта на кнопке в шапке и подсказка имени файла. */
function projectName(): string {
  const id = presetRef.slice(2);
  if (givenName) return givenName;
  if (presetRef.startsWith('b:')) return builtinName(id);
  return userPresets.find((preset) => preset.id === id)?.name ?? '';
}

/** Состояние пресета по ссылке — для «изделие ушло от пресета». */
function presetState(ref: PresetRef): AppState | undefined {
  const id = ref.slice(2);
  if (ref.startsWith('b:')) return presetById(id)?.build();
  return userPresets.find((preset) => preset.id === id)?.state;
}

/** Кнопка в шапке: имя проекта, ● — изделие ушло от открытого пресета. */
function showPresetButton(): void {
  presetBtn.textContent = projectName() || t('kit.topbar.presets');
  presetBtn.classList.toggle('changed', presetStatus(presetRef, state, presetState, presetSignature) === 'changed');
  if (presetsDialog.isOpen()) renderPresets();
}

/** Автоимя «Изделие N» / «Piece N»: номер общий для всех языков. */
function autoPresetName(): string {
  return nextPresetName(userPresets, autoPresetPrefixes(), t('presets.auto'));
}

function renderPresets(): void {
  renderPresetList(presetList, {
    builtIn: PRESETS.map((preset) => ({
      id: preset.id,
      label: builtinName(preset.id),
      note: tDynamic(`preset.${preset.id}.note`),
    })),
    user: userPresets.map(({ id, name }) => ({ id, name })),
    current: presetRef,
    status: presetStatus(presetRef, state, presetState, presetSignature),
    t,
    open: openPreset,
    rename: renamePreset,
    remove: deletePreset,
  });
}

/**
 * Изделие — в браузер: после каждой законченной правки, отмены, смены
 * пресета или имени. Ссылка `#s=` в адресе описывала изделие на момент,
 * когда ею поделились: после правки перезагрузка должна открыть правленое,
 * поэтому ссылка из адреса уходит.
 */
function keepProject(): void {
  projectWrite = saveRecord(storage, projectRecord, { state, ref: presetRef, name: givenName });
  if (tokenFromHash(location.hash)) window.history.replaceState(null, '', location.pathname + location.search);
  showBanner();
}

/** Запись своих пресетов; неудача — в баннер, и её можно скрыть. */
function writePresets(next: ClayPreset[], action: 'save' | 'delete'): boolean {
  const result = saveRecord(storage, userPresetsRecord, next);
  presetFailure = result === 'ok' ? null : { action, result };
  showBanner();
  return result === 'ok';
}

function showBanner(): void {
  renderBanner(
    storageNote,
    { project: projectWrite, preset: presetFailure },
    {
      t,
      advice: { blocked: 'kit.storage.advice.file', full: 'kit.storage.advice.fileFull' },
      onDismiss: () => {
        presetFailure = null;
        showBanner();
      },
    },
  );
}

function openPreset(ref: PresetRef): void {
  presetsDialog.close();
  const next = presetState(ref);
  if (!next) return;
  presetRef = ref;
  givenName = '';
  applyState(next, true);
}

function renamePreset(id: string, name: string): void {
  const next = renameUserPreset(userPresets, id, name);
  if (writePresets(next, 'save')) userPresets = next;
  showPresetButton();
}

function deletePreset(id: string): void {
  const next = removeUserPreset(userPresets, id);
  if (!writePresets(next, 'delete')) return;
  userPresets = next;
  // изделие на экране остаётся — пропадает только запись в списке
  if (presetRef === `u:${id}`) presetRef = '';
  showPresetButton();
  keepProject();
  renderPresets();
}

// 📄 — пустой пресет: изделие по умолчанию под именем «Новое изделие»,
// один шаг отмены назад к прежнему
el('newBtn', HTMLButtonElement).addEventListener('click', () => openPreset(`b:${BLANK_PRESET.id}`));

presetBtn.addEventListener('click', () => {
  if (presetsDialog.isOpen()) {
    presetsDialog.close();
    return;
  }
  renderPresets();
  presetsDialog.open(presetBtn);
});

// --- пресет файлом ---

fileSaveBtn.addEventListener('click', () => {
  const suggested = projectName() || autoPresetName();
  const name = prompt(t('presets.prompt'), suggested)?.trim();
  if (!name) return;
  download(presetFileName(name), encodePresetFile(name, state), 'application/json');
  givenName = name;
  showPresetButton();
  keepProject();
  flash(fileSaveBtn, '✓');
});

fileOpenBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  // сброс — чтобы тот же файл можно было открыть ещё раз
  fileInput.value = '';
  if (file) void openPresetFile(file);
});

// Перетаскивание файла на окно. dragover обязан отменять действие по
// умолчанию, иначе браузер не пришлёт drop, а откроет файл сам.
document.addEventListener('dragover', (event) => {
  if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
});
document.addEventListener('drop', (event) => {
  const file = event.dataTransfer?.files[0];
  if (!file) return;
  event.preventDefault();
  void openPresetFile(file);
});

/**
 * Открытый файл применяется как любое состояние, но в «Мои» не попадает:
 * сохранить его туда — отдельное решение, 💾.
 */
async function openPresetFile(file: File): Promise<void> {
  const decoded = decodePresetFile(await file.text().catch(() => ''));
  if (!decoded.ok) {
    failures = [line('bad', { code: `kit.file.${decoded.reason}` })];
    showMessages();
    return;
  }
  // в «Мои» открытый файл не попадает — только имя на кнопке
  presetRef = '';
  givenName = decoded.name;
  applyState(decoded.state, true);
  flash(fileOpenBtn, '✓');
}

saveBtn.addEventListener('click', () => {
  const suggested = autoPresetName();
  const name = prompt(t('presets.prompt'), suggested)?.trim();
  if (!name) return;
  // Список меняется и при неудачной записи: до перезагрузки пресет есть.
  const saved = savePresetAs(userPresets, name, state);
  userPresets = saved.list;
  if (writePresets(userPresets, 'save')) {
    presetRef = `u:${saved.id}`;
    givenName = '';
    showPresetButton();
    keepProject();
    flash(saveBtn, '✓');
  }
});

shareBtn.addEventListener('click', () => {
  const token = encodeStateToken(state);
  location.hash = `s=${token}`;
  // Ссылка уже в адресной строке; буфер обмена — удобство, и его отсутствие
  // (нет разрешения, не тот протокол) не должно выглядеть как поломка.
  void navigator.clipboard?.writeText(`${location.origin}${location.pathname}#s=${token}`).then(
    () => flash(shareBtn, '✓'),
    () => flash(shareBtn, '↑'),
  );
});

function flash(button: HTMLButtonElement, mark: string): void {
  const original = button.textContent;
  button.textContent = mark;
  setTimeout(() => {
    button.textContent = original;
  }, 900);
}

// --- отмена и повтор ---
//
// ↩ ↪ и Ctrl/⌘+Z, Shift+Ctrl/⌘+Z, Ctrl/⌘+Y — китовые (`historyKeys`): на любой
// раскладке и сразу после ползунка; набранный текст отменяется сам.

function stepHistory(direction: 'undo' | 'redo'): void {
  const restored = direction === 'undo' ? history.undo() : history.redo();
  if (!restored) return;
  showState(restored);
  keepProject();
}

// --- мобильная панель ---
//
// До 1024 px панель — нижний лист кита поверх вида; тап по виду его
// закрывает, «⚙ Настройки» поднимает. При загрузке он поднят: без панели
// первый экран пуст и непонятен.

setupSheet({
  panel,
  button: el('sheetOpen', HTMLButtonElement),
  close: el('sheetClose', HTMLButtonElement),
  view: el('viewWrap', HTMLElement),
  narrow: matchMedia('(max-width: 1023px)'),
  open: true,
  onInset: (px) => scene?.setInset(px),
});

// --- язык ---
//
// 🌐 кита со списком языков их собственными именами. Смена перерисовывает
// панель на месте: состояние, история отмены, камера, свёрнутость карточек
// и прокрутка панели остаются как были.

const langPicker = createLanguagePicker(el('topbar', HTMLElement), { locales: LANGS, current: lang(), t, onChange: setLang });

onLangChange(() => {
  applyStaticText(document);
  langPicker.set(lang());
  const collapsed = snapshotCards(panel);
  const scroll = panel.scrollTop;
  renderPanel();
  restoreCards(panel, collapsed);
  panel.scrollTop = scroll;
  showBanner();
  progress.refresh();
  syncPanel();
});

showState(state);

// Офлайн и новые версии — только в сборке: у dev-сервера сервис-воркера нет.
if (import.meta.env.PROD) registerServiceWorker(navigator, window, document);
