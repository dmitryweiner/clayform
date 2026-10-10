// Точка входа: состояние → ядро геометрии → рендер и UI.
//
// Два разных по цене конвейера. Изделие строится здесь же, чисто
// параметрически, за десяток миллисекунд — и пересобирается на каждое
// движение ползунка. Всё, что требует булевых операций (оснастка, экспортная
// сборка изделия с ручкой и носиком), уходит в воркер: WASM-модуль manifold
// в главный поток не грузится вовсе, и вкладка не замирает. Оснастка вдобавок
// пересобирается с задержкой — когда пользователь остановился.

import './style.css';
import { el } from './ui/dom';
import { createScene } from './render/scene';
import { renderFamilyPicker } from './ui/family';
import { renderParams } from './ui/params';
import { renderReliefCards } from './ui/reliefCards';
import { renderAttachCards } from './ui/attachCards';
import { renderExportPanel } from './ui/exportPanel';
import { setupAdjustmentButtons } from './ui/adjust';
import { drawProfileGraph } from './ui/graph';
import { createProgress } from './ui/progress';
import type { SurfaceMesh } from './geo/surface';
import { placeInRow, LID_BESIDE_GAP_MM } from './geo/layout';
import { buildVessel, vesselSurface } from './geo/build';
import { buildHandles } from './geo/handle';
import { buildAppliedSpout } from './geo/spout';
// Прямо из подмодулей, минуя фасад geo/mold: тот тянет за собой csg.ts, а с
// ним и WASM-обвязку manifold. Здесь она не нужна ни строчкой — весь CSG
// живёт в воркере, и путь импорта это подтверждает.
import { analyzeMold, pressWarning } from './geo/mold/analyze';
import { buildHump, humpSurface, buildSlumpShell } from './geo/press';
import { buildHollowVessel } from './geo/hollow';
import { lidFit, lidSeat, buildLidMesh, lidHeightMm, lidDomeContext } from './geo/lid';
import { buildProfile, familyById, profileRadius } from './geo/profiles';
import { bandLayout, isContinuous } from './geo/roulette';
import type { RouletteBand, RouletteContext } from './geo/roulette';
import { encodeSTL } from './geo/stl';
import { validateMesh, assessExport, overhangFraction, signedVolume } from './geo/validate';
import type { AppState } from './state/schema';
import {
  defaultState, stateForFamily, sanitizeState, toBuildParams, effectiveSpout, isPressMode, lidRelief,
  RESOLUTIONS,
} from './state/schema';
import { PRESETS, presetByName } from './state/presets';
import { encodeStateToken, decodeStateToken, tokenFromHash } from './state/share';
import { encodePresetFile, decodePresetFile, presetFileName } from './state/presetFile';
import type { UserPreset } from './state/userPresets';
import { loadUserPresets, saveUserPresets, nextPresetNumber } from './state/userPresets';
import { History } from './state/history';
import type { JobPart } from './worker/protocol';
import { CsgClient } from './worker/client';

/** Детализация превью изделия: ~10 мс на пересборку, незаметно при перетаскивании. */
const PREVIEW_SEGMENTS = 192;
/** Для оснастки сетку огрубляем: стоимость булевых операций растёт с числом граней. */
const MOLD_PREVIEW_SEGMENTS = 96;
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
 * Всё, что считает воркер, — сотни миллисекунд: и оснастка, и точная сборка
 * изделия с ручкой и носиком. Ждём паузы подольше, чем проверки меша.
 */
const CSG_DELAY_MS = 400;
/** Подписи под табами отминки — вместо схемы разъёма. */
const PRESS_NOTES = {
  slump: 'Углублённая форма: пласт вдавливают внутрь, рельеф ложится снаружи изделия, '
    + 'наружные размеры — ровно заданные. Печатается скорлупой толщиной в борт.',
  hump: 'Горб — внутренняя поверхность изделия: пласт кладут сверху, рельеф оказывается внутри. '
    + 'Знак рельефа обратный: валик на горбе — канавка в изделии. Пласт — это стенка изделия.',
} as const;

/** Зазор между деталями в «разнесённом» превью, мм. */
const EXPLODE_GAP_MM = 20;
/** Зазор между изделием и крышкой рядом — тот же, что воркер кладёт в STL. */
const BESIDE_GAP_MM = LID_BESIDE_GAP_MM;
/**
 * Через сколько тишины изменение попадает в историю. Протаскивание ползунка
 * от края до края — это одно действие пользователя, а не двести.
 */
const HISTORY_DELAY_MS = 500;
/**
 * Ниже этой доли высоты кончик носика уже мешает: изделие наполняется только
 * до него, и пятая часть высоты пропадает впустую. Чуть ниже венчика кончик
 * стоит и у настоящих чайников — на это ругаться незачем.
 */
const SPOUT_BELOW_RIM = 0.8;

const view = el('view', HTMLCanvasElement);
const panel = el('panel', HTMLElement);
const familyGrid = el('familyGrid', HTMLDivElement);
const shapeParams = el('shapeParams', HTMLDivElement);
const reliefCards = el('reliefCards', HTMLDivElement);
const attachCards = el('attachCards', HTMLDivElement);
const exportParams = el('exportParams', HTMLDivElement);
const profileGraph = el('profileGraph', HTMLCanvasElement);
const heightInput = el('heightMm', HTMLInputElement);
const resolutionSel = el('resolution', HTMLSelectElement);
const exportBtn = el('exportBtn', HTMLButtonElement);
const statusEl = el('status', HTMLParagraphElement);
const auditEl = el('audit', HTMLParagraphElement);
const warningsEl = el('warnings', HTMLParagraphElement);
const blockersEl = el('blockers', HTMLParagraphElement);
const presetSel = el('presetSel', HTMLSelectElement);
const saveBtn = el('saveBtn', HTMLButtonElement);
const fileOpenBtn = el('fileOpenBtn', HTMLButtonElement);
const fileSaveBtn = el('fileSaveBtn', HTMLButtonElement);
const fileInput = el('fileInput', HTMLInputElement);
const shareBtn = el('shareBtn', HTMLButtonElement);
const undoBtn = el('undoBtn', HTMLButtonElement);
const redoBtn = el('redoBtn', HTMLButtonElement);
const progress = createProgress({
  wrap: el('progressWrap', HTMLDivElement),
  fill: el('progressFill', HTMLDivElement),
  label: el('progressLabel', HTMLSpanElement),
});

const scene = createScene(view);
const csg = new CsgClient();
const history = new History<AppState>(startingState());
let state: AppState = history.value;

/** Ссылка со состоянием важнее дефолта: по ней и открывают чужую работу. */
function startingState(): AppState {
  const token = tokenFromHash(location.hash);
  return (token && decodeStateToken(token)) || defaultState();
}

const picker = renderFamilyPicker(familyGrid, state.family, (id) => {
  applyState(stateForFamily(id, state));
});
setupAdjustmentButtons(panel);

let paramRows = renderShapeParams();

const reliefRows = renderReliefCards(
  reliefCards,
  () => state.relief,
  () => state.roulette,
  (relief) => applyState({ ...state, relief }),
  (roulette) => applyState({ ...state, roulette }),
);

const attachRows = renderAttachCards(
  attachCards,
  {
    handle: () => state.handle,
    spout: () => state.spout,
    lid: () => state.lid,
  },
  {
    handle: (handle) => applyState({ ...state, handle }),
    spout: (spout) => applyState({ ...state, spout }),
    lid: (lid) => applyState({ ...state, lid }),
  },
);

const exportPanel = renderExportPanel(
  {
    vessel: el('tabVessel', HTMLButtonElement),
    master: el('tabMaster', HTMLButtonElement),
    bath: el('tabBath', HTMLButtonElement),
    slump: el('tabSlump', HTMLButtonElement),
    hump: el('tabHump', HTMLButtonElement),
  },
  el('pressTabs', HTMLDivElement),
  exportParams,
  el('schemeNote', HTMLParagraphElement),
  el('partList', HTMLUListElement),
  () => state,
  (next) => applyState(next),
);

function renderShapeParams(): ReturnType<typeof renderParams> {
  return renderParams(shapeParams, familyById(state.family).params, state.shape, (key, value) => {
    applyState({ ...state, shape: { ...state.shape, [key]: value } });
  });
}

function applyState(next: AppState, record = true): void {
  // у каждого семейства свой набор параметров, поэтому смена семейства
  // требует пересоздать строки, а не просто обновить значения
  const familyChanged = next.family !== state.family;
  state = sanitizeState(next);
  if (record) rememberLater(state);
  else history.replace(state);
  if (familyChanged) {
    picker.setActive(state.family);
    paramRows = renderShapeParams();
  } else {
    paramRows.setValues(state.shape);
  }
  reliefRows.sync(state.relief, state.roulette);
  attachRows.sync(state.handle, state.spout, state.lid);
  exportPanel.sync(state);
  heightInput.value = String(Math.round(state.heightMm));
  resolutionSel.value = String(state.resolution);
  updateHistoryButtons();
  refresh();
}

let historyTimer: ReturnType<typeof setTimeout> | null = null;

function rememberLater(next: AppState): void {
  if (historyTimer) clearTimeout(historyTimer);
  historyTimer = setTimeout(() => {
    history.push(next);
    updateHistoryButtons();
  }, HISTORY_DELAY_MS);
}

function updateHistoryButtons(): void {
  undoBtn.disabled = !history.canUndo;
  redoBtn.disabled = !history.canRedo;
}

/**
 * Предупреждения о самой форме — их считает refresh. Проверка меша дописывает
 * к ним свои и может пройти дважды (по быстрому превью и по точной сборке),
 * поэтому список хранится отдельно, а не вычитывается обратно из разметки.
 */
let baseWarnings: string[] = [];

let auditTimer: ReturnType<typeof setTimeout> | null = null;
let moldTimer: ReturnType<typeof setTimeout> | null = null;
let exactTimer: ReturnType<typeof setTimeout> | null = null;
/** Растёт на каждую пересборку: поздний ответ от старой сборки не должен перебить свежую. */
let generation = 0;

function refresh(): void {
  generation++;
  const stamp = generation;

  const profile = buildProfile(state.family, state.shape, state.heightMm);
  drawProfileGraph(profileGraph, profile);

  reliefRows.setBandNote((band) => describeBand(band, {
    heightMm: state.heightMm,
    radiusAt: (v) => profileRadius(profile, v),
  }));

  const buildParams = toBuildParams(state, PREVIEW_SEGMENTS);
  // Посадку под крышку считаем от того же силуэта и той же стенки, из
  // которых строится полость: крышка обязана входить именно в неё.
  const fit = state.lid.on ? lidFit(profile, state.heightMm, state.hollow, state.lid) : null;
  const hollow = buildHollowVessel(buildParams, state.hollow, fit ? lidSeat(fit) : undefined);
  const outer = buildVessel(buildParams);
  // Крышке булевы операции не нужны — она тело вращения, — поэтому и в
  // превью, и в экспорте её строит один и тот же параметрический код.
  // Надетой её показываем сразу, без ожидания воркера.
  // «Крышка рядом» — в печатном положении, юбкой вниз; иначе — надетой.
  const beside = Boolean(fit) && state.lidBeside && state.exportMode === 'vessel';
  if (fit) {
    const dome = lidDomeContext(fit, state.lid);
    attachRows.setLidBandNote((band) => describeBand(band, dome));
  }
  const lidMeshes = fit
    ? [buildLidMesh(fit, state.lid, PREVIEW_SEGMENTS, {
      relief: lidRelief(state),
      ...(beside ? {} : { liftMm: fit.liftMm }),
    })]
    : [];

  // Схему разъёма считаем по телу без ручки: ручка влияет на выбор самим
  // фактом своего существования (сквозное отверстие), а гонять ради этого
  // CSG на каждое движение ползунка незачем.
  const scheme = analyzeMold(outer, {
    hasHandle: state.handle.on,
    hasSpout: hasAppliedSpout(),
    angularRelief: hasAngularRelief(),
    // утопленной крышке форма добавляет пробку горловины (см. mold/block.ts)
    hasPlug: Boolean(fit && fit.recessMm > 0),
  });
  const press = isPressMode(state.exportMode);
  // Горб — чистая геометрия, строится здесь же, без воркера; заодно по его
  // внутренней поверхности меряются зацепы.
  const hump = state.exportMode === 'hump'
    ? buildHump(buildParams, state.hollow, state.mold.bathWallMm, state.mold.shrinkPct)
    : null;
  // обе отминочные формы — скорлупы без CSG: строятся сразу, без воркера
  const pressMesh = hump?.mesh
    ?? (state.exportMode === 'slump'
      ? buildSlumpShell(buildParams, state.mold.bathWallMm, state.mold.shrinkPct)
      : null);
  exportPanel.setSchemeNote(press ? PRESS_NOTES[state.exportMode === 'hump' ? 'hump' : 'slump'] : scheme.reason);

  if (press) {
    const undercut = hump
      ? pressWarning(humpSurface(buildParams, state.hollow), 'hump')
      : pressWarning(outer, 'slump');
    baseWarnings = undercut ? [undercut] : [];
    if (hump && hump.pinchedFraction > 0) {
      baseWarnings.push(
        `Рельеф уходит в горб глубже борта на ${(hump.pinchedFraction * 100).toFixed(1)} % поверхности — ` +
        'там рельеф поджат. Увеличьте борт или уменьшите глубину рельефа.',
      );
    }
  } else {
    baseWarnings = [...scheme.warnings];
  }
  if (hasAppliedSpout() && state.spout.tipAt < SPOUT_BELOW_RIM) {
    baseWarnings.push(
      'Кончик носика ниже венчика: наполнить изделие выше носика не выйдет.',
    );
  }
  if (hollow.pinchedFraction > 0 && !press) {
    baseWarnings.push(
      `Рельеф уходит внутрь глубже стенки на ${(hollow.pinchedFraction * 100).toFixed(1)} % поверхности — ` +
      'там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.',
    );
  }
  if (fit?.tooNarrow) {
    baseWarnings.push(
      `Горловина узка для крышки: посадка вышла ⌀${(fit.seatMm * 2).toFixed(0)} мм. ` +
      'Расширьте горло, уменьшите полочку или стенку.',
    );
  }
  warningsEl.textContent = baseWarnings.join('\n');

  const widthMm = outerWidth(outer.positions);
  // Глина считается по всему, что придётся напечатать: крышка — такая же
  // деталь изделия, как тело.
  const clayMl = [hollow.mesh, ...lidMeshes]
    .reduce((sum, mesh) => sum + signedVolume(mesh.positions, mesh.indices), 0) / 1000;
  statusEl.textContent = [
    `⌀${widthMm.toFixed(0)} × ${state.heightMm.toFixed(0)} мм`,
    `вместимость ${formatVolume(hollow.capacityMl)}`,
    `глины ${formatVolume(clayMl)}`,
  ].join(' · ');

  if (moldTimer) clearTimeout(moldTimer);
  if (auditTimer) clearTimeout(auditTimer);
  if (exactTimer) clearTimeout(exactTimer);

  if (state.exportMode === 'vessel') {
    // Пока ползунок в движении, ручку и носик рисуем отдельными мешами: CSG
    // на каждое движение стоил бы 300 мс вместо 10. Снаружи это выглядит
    // ровно как объединение — а вот внутри полости торчат утопленные торцы,
    // и носик стоит заглушенным. Поэтому по паузе картинку заменяет
    // настоящая сборка из воркера (showExactVessel).
    const surface = vesselSurface(buildParams);
    const tube = buildAppliedSpout(effectiveSpout(state), surface.profile, surface.heightMm);
    const body = [
      hollow.mesh,
      ...buildHandles(state.handle, surface.profile, surface.heightMm),
      ...(tube ? [tube] : []),
    ];
    // крышку ставим по габариту тела вместе с ручкой и носиком: точная
    // сборка потом подменит только тело, а крышка останется где стояла
    const lids = beside ? placeInRow([body, lidMeshes], BESIDE_GAP_MM)[1] : lidMeshes;
    scene.setMeshes([...body, ...lids]);
    const lidNote = fit
      ? `⌀${(fit.fieldMm * 2).toFixed(0)} × ${lidHeightMm(fit, state.lid).toFixed(0)} мм`
      : '';
    exportPanel.setParts(beside
      ? [{ label: 'Изделие + крышка', note: 'одним файлом' }]
      : [
        { label: 'Изделие', note: `${(clayMl / 1000).toFixed(2)} л глины` },
        ...(fit ? [{ label: 'Крышка', note: lidNote }] : []),
      ]);
    exportBtn.textContent = 'Экспорт STL';
    auditEl.textContent = 'проверка…';
    // Быстрый вердикт — по оболочке: он приходит через четверть секунды и
    // почти всегда окончательный. Если есть приставные детали, следом
    // подъезжает точная сборка из воркера и перепроверяет уже её — то самое,
    // что уйдёт в STL.
    auditTimer = setTimeout(() => audit([hollow.mesh, ...lids]), AUDIT_DELAY_MS);
    if (state.handle.on || hasAppliedSpout()) {
      exactTimer = setTimeout(() => void showExactVessel(stamp, lids), CSG_DELAY_MS);
    }
  } else if (pressMesh) {
    // отминочная форма готова сразу — ни задержки, ни воркера
    scene.setMeshes([pressMesh]);
    exportPanel.setParts([{ label: hump ? 'Горб' : 'Отминочная форма', note: sizeNote(pressMesh) }]);
    exportBtn.textContent = 'Экспорт формы';
    auditEl.textContent = 'проверка…';
    auditTimer = setTimeout(() => audit([pressMesh], false), AUDIT_DELAY_MS);
  } else {
    exportPanel.setParts(scheme.parts.map((part) => ({ label: part.label })));
    exportBtn.textContent = state.exportMode === 'master' ? 'Экспорт мастера' : 'Экспорт ванночек';
    auditEl.textContent = 'собираю оснастку…';
    moldTimer = setTimeout(() => void showMold(stamp), CSG_DELAY_MS);
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
    const parts = await progress.track(
      (onProgress) => csg.run({ kind: 'vessel-preview', state, segments: EXACT_SEGMENTS }, onProgress),
      { label: 'точная сборка изделия…', indeterminate: true },
    );
    if (!parts || stamp !== generation) return;
    const mesh = toMesh(parts[0]);
    scene.setMeshes([mesh, ...lidMeshes]);
    audit([mesh, ...lidMeshes]);
  } catch (error) {
    // Сборка не удалась — значит и экспорт не удастся: это тот же код.
    // Молчать об этом нельзя, на экране осталось бы приблизительное превью.
    if (stamp !== generation) return;
    auditEl.textContent = '';
    blockersEl.textContent = `Изделие собрать не удалось: ${message(error)}`;
    exportBtn.disabled = true;
  }
}

async function showMold(stamp: number): Promise<void> {
  try {
    // Ход сборки — и текстом рядом с проверкой меша, и полосой на канвасе.
    // Полоса появляется, только если сборка затянулась: на быстрой машине
    // она на полсекунды лишь мельтешила бы.
    const parts = await progress.track(
      (onProgress) => csg.run(
        { kind: 'mold-preview', state, segments: MOLD_PREVIEW_SEGMENTS },
        (step) => {
          onProgress(step);
          // «собираю» в строке остаётся всё время сборки: по нему и человек, и
          // смоук понимают, что ответа ещё нет.
          if (stamp === generation) {
            auditEl.textContent = `собираю: ${step.label} (${step.step + 1} из ${step.total})`;
          }
        },
      ),
      { label: 'сборка оснастки…' },
    );
    // null — задачу вытеснила более свежая; stamp — её обогнал ответ.
    if (!parts || stamp !== generation) return;

    scene.setMeshes(placeInRow(parts.map((part) => [toMesh(part)]), EXPLODE_GAP_MM).flat());
    exportPanel.setParts(parts.map((part) => ({ label: part.label, note: part.note })));
    const triangles = parts.reduce((sum, part) => sum + part.indices.length / 3, 0);
    auditEl.textContent = `${parts.length} дет. · ${Math.round(triangles / 1000)} тыс. треугольников`;
    blockersEl.textContent = '';
    exportBtn.disabled = false;
  } catch (error) {
    if (stamp !== generation) return;
    auditEl.textContent = '';
    blockersEl.textContent = `Оснастку собрать не удалось: ${message(error)}`;
    exportBtn.disabled = true;
  }
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
function audit(meshes: SurfaceMesh[], printedInClay = true): void {
  const reports = meshes.map((mesh) => validateMesh(mesh));
  const assessments = reports.map((report) => assessExport(report, true));
  const triangles = reports.reduce((sum, report) => sum + report.triangleCount, 0);
  const blocking = assessments.flatMap((assessment) => assessment.blocking);
  // свесы важны только тому, что печатают глиной; форму печатают пластиком
  const overhang = printedInClay ? overhangFraction(meshes[0], 60) : 0;

  auditEl.textContent = reports.every((report) => report.watertight)
    ? `замкнуто ✓ · ${Math.round(triangles / 1000)} тыс. треугольников`
    : 'меш не замкнут';

  const extra = assessments.flatMap((assessment) => assessment.warnings);
  if (printedInClay && overhang > 0.15) {
    extra.push(`Свесы круче 60° на ${(overhang * 100).toFixed(0)} % поверхности — печать глиной потребует опор.`);
  }
  warningsEl.textContent = [...baseWarnings, ...extra].join('\n');
  blockersEl.textContent = blocking.join('\n');
  exportBtn.disabled = blocking.length > 0;
}

/**
 * Есть ли приставная трубка носика. Оттянутый край не в счёт: он оставляет
 * изделие телом вращения, а вбок торчит только трубка.
 */
function hasAppliedSpout(): boolean {
  return state.spout.on && state.spout.kind === 'applied';
}

/**
 * Меняется ли рельеф по углу. Именно это — единственная причина, по которой
 * у тела вращения появляются зацепы при разъёме на половины, поэтому
 * анализатор с этим знанием даёт не число, а совет.
 */
function hasAngularRelief(): boolean {
  const angular = (axis: string): boolean => axis !== 'z';
  return (state.relief.wave.on && angular(state.relief.wave.axis))
    || (state.relief.wave2.on && angular(state.relief.wave2.axis))
    || state.roulette.bands.some((band) => band.on);
}

/** Подпись полосы накатки: сколько оттисков ляжет за оборот и с каким шагом. */
function describeBand(band: RouletteBand, ctx: RouletteContext): string {
  if (band.pattern === 'image' && !band.image) return 'Загрузите картинку: пока её нет, полоса не действует.';
  const layout = bandLayout(band, ctx);
  const head = `${layout.repeats} оттисков по ⌀${(layout.circumferenceMm / Math.PI).toFixed(0)} мм: `
    + `шаг ${layout.stepMm.toFixed(1)} мм`;
  return isContinuous(band.pattern) ? `${head}.` : `${head}, просвет ${layout.gapMm.toFixed(1)} мм.`;
}

/** Габарит меша, «Ш×Г×В мм». */
function sizeNote(mesh: SurfaceMesh): string {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < mesh.positions.length; i += 3) {
    for (let axis = 0; axis < 3; axis++) {
      min[axis] = Math.min(min[axis], mesh.positions[i + axis]);
      max[axis] = Math.max(max[axis], mesh.positions[i + axis]);
    }
  }
  return `${max.map((value, axis) => Math.round(value - min[axis])).join('×')} мм`;
}

function outerWidth(positions: Float32Array): number {
  let max = 0;
  for (let i = 0; i < positions.length; i += 3) {
    max = Math.max(max, Math.hypot(positions[i], positions[i + 1]));
  }
  return max * 2;
}

function formatVolume(millilitres: number): string {
  return millilitres >= 1000 ? `${(millilitres / 1000).toFixed(2)} л` : `${millilitres.toFixed(0)} мл`;
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

heightInput.addEventListener('input', () => {
  applyState({ ...state, heightMm: Number(heightInput.value) });
});

resolutionSel.textContent = '';
for (const value of RESOLUTIONS) {
  const option = document.createElement('option');
  option.value = String(value);
  option.textContent = `${value} × ${value}`;
  resolutionSel.append(option);
}
resolutionSel.addEventListener('change', () => {
  applyState({ ...state, resolution: Number(resolutionSel.value) });
});

exportBtn.addEventListener('click', () => {
  void runExport();
});

async function runExport(): Promise<void> {
  const label = exportBtn.textContent;
  exportBtn.disabled = true;
  exportBtn.textContent = 'Собираю…';
  try {
    // Экспортная детализация — до 384 сегментов; в главном потоке это
    // подвешивало вкладку на секунды, поэтому считает воркер, а полоса
    // показывает, что он не умер.
    const files = await progress.track(
      (onProgress) => csg.run({ kind: 'export', state }, onProgress),
      { label: 'сборка…', delayMs: 0 },
    );
    if (!files) return;

    const blocking = files.flatMap((file) => file.blocking);
    if (blocking.length > 0) {
      blockersEl.textContent = blocking.join('\n');
      return;
    }
    blockersEl.textContent = '';
    for (const file of files) {
      const name = `clayform-${state.family}-${file.id}.stl`;
      download(encodeSTL(toMesh(file), { name: file.id }), name);
      // браузер глотает пачку одновременных загрузок — разносим по времени
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  } catch (error) {
    blockersEl.textContent = `Сборка не удалась: ${message(error)}`;
  } finally {
    exportBtn.textContent = label;
    exportBtn.disabled = false;
  }
}

function download(data: BlobPart, filename: string, type = 'model/stl'): void {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// --- пресеты ---

let userPresets: UserPreset[] = loadUserPresets();
/** Имя последнего открытого пресета — подсказка имени при сохранении в файл. */
let presetName = '';

function fillPresetList(): void {
  presetSel.textContent = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Пресеты…';
  presetSel.append(placeholder);

  const builtin = document.createElement('optgroup');
  builtin.label = 'Готовые';
  for (const preset of PRESETS) {
    const option = document.createElement('option');
    option.value = `b:${preset.name}`;
    option.textContent = preset.name;
    option.title = preset.note;
    builtin.append(option);
  }
  presetSel.append(builtin);

  if (userPresets.length > 0) {
    const mine = document.createElement('optgroup');
    mine.label = 'Мои';
    for (const preset of userPresets) {
      const option = document.createElement('option');
      option.value = `u:${preset.name}`;
      option.textContent = preset.name;
      mine.append(option);
    }
    presetSel.append(mine);
  }
}

presetSel.addEventListener('change', () => {
  const value = presetSel.value;
  presetSel.value = '';
  if (value.startsWith('b:')) {
    const preset = presetByName(value.slice(2));
    if (preset) {
      applyState(preset.build());
      presetName = preset.name;
    }
  } else if (value.startsWith('u:')) {
    const preset = userPresets.find((item) => item.name === value.slice(2));
    if (preset) {
      applyState(preset.state);
      presetName = preset.name;
    }
  }
});

// --- пресет файлом ---

fileSaveBtn.addEventListener('click', () => {
  const suggested = presetName || `Моё ${nextPresetNumber(userPresets)}`;
  const name = prompt('Имя пресета', suggested)?.trim();
  if (!name) return;
  download(encodePresetFile(name, state), presetFileName(name), 'application/json');
  presetName = name;
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
  if (!decoded) {
    blockersEl.textContent = `Файл «${file.name}» — не пресет ClayForm.`;
    return;
  }
  applyState(decoded.state);
  presetName = decoded.name;
  flash(fileOpenBtn, '✓');
}

saveBtn.addEventListener('click', () => {
  const suggested = `Моё ${nextPresetNumber(userPresets)}`;
  const name = prompt('Имя пресета', suggested)?.trim();
  if (!name) return;
  userPresets = [...userPresets.filter((item) => item.name !== name), { name, state }];
  if (saveUserPresets(userPresets)) {
    fillPresetList();
    flash(saveBtn, '✓');
  } else {
    blockersEl.textContent = 'Не удалось сохранить пресет: браузер запретил доступ к хранилищу.';
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

undoBtn.addEventListener('click', () => stepHistory('undo'));
redoBtn.addEventListener('click', () => stepHistory('redo'));

function stepHistory(direction: 'undo' | 'redo'): void {
  // ждущая запись сначала фиксируется, иначе отмена вернула бы туда же
  if (historyTimer) {
    clearTimeout(historyTimer);
    historyTimer = null;
    history.push(state);
  }
  const restored = direction === 'undo' ? history.undo() : history.redo();
  if (restored) applyState(restored, false);
}

window.addEventListener('keydown', (event) => {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
  event.preventDefault();
  stepHistory(event.shiftKey ? 'redo' : 'undo');
});

// --- мобильная панель ---
//
// На узком экране панель — нижний лист поверх канваса (style.css, правила
// под max-width: 760px). При загрузке он поднят: без панели первый экран
// пуст и непонятен. На десктопе #panelBtn и подложка скрыты стилями, и всё
// это ни на что не влияет.

const panelBtn = el('panelBtn', HTMLButtonElement);
const panelBackdrop = el('panelBackdrop', HTMLDivElement);

function setPanelOpen(open: boolean): void {
  panel.classList.toggle('open', open);
  panelBackdrop.hidden = !open;
  // пока лист поднят, закрывает его подложка — кнопка не нужна
  panelBtn.hidden = open;
}

panelBtn.addEventListener('click', () => setPanelOpen(true));
panelBackdrop.addEventListener('click', () => setPanelOpen(false));
setPanelOpen(true);

fillPresetList();
applyState(state, false);
