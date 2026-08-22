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
import type { SurfaceMesh } from './geo/surface';
import { buildVessel, vesselSurface } from './geo/build';
import { buildHandles } from './geo/handle';
import { buildAppliedSpout } from './geo/spout';
// Прямо из подмодулей, минуя фасад geo/mold: тот тянет за собой csg.ts, а с
// ним и WASM-обвязку manifold. Здесь она не нужна ни строчкой — весь CSG
// живёт в воркере, и путь импорта это подтверждает.
import { analyzeMold } from './geo/mold/analyze';
import { buildHollowVessel } from './geo/hollow';
import { buildProfile, familyById, profileRadius } from './geo/profiles';
import { bandRepeats } from './geo/roulette';
import { encodeSTL } from './geo/stl';
import { validateMesh, assessExport, overhangFraction, signedVolume } from './geo/validate';
import type { AppState } from './state/schema';
import { defaultState, stateForFamily, sanitizeState, toBuildParams, RESOLUTIONS } from './state/schema';
import { PRESETS, presetByName } from './state/presets';
import { encodeStateToken, decodeStateToken, tokenFromHash } from './state/share';
import type { UserPreset } from './state/userPresets';
import { loadUserPresets, saveUserPresets, nextPresetNumber } from './state/userPresets';
import { History } from './state/history';
import type { JobPart, JobProgress } from './worker/protocol';
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
/** Зазор между деталями в «разнесённом» превью, мм. */
const EXPLODE_GAP_MM = 20;
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
const shareBtn = el('shareBtn', HTMLButtonElement);
const undoBtn = el('undoBtn', HTMLButtonElement);
const redoBtn = el('redoBtn', HTMLButtonElement);
const progressWrap = el('progressWrap', HTMLDivElement);
const progressFill = el('progressFill', HTMLDivElement);
const progressLabel = el('progressLabel', HTMLSpanElement);

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
  () => state.handle,
  () => state.spout,
  (handle) => applyState({ ...state, handle }),
  (spout) => applyState({ ...state, spout }),
);

const exportPanel = renderExportPanel(
  {
    vessel: el('tabVessel', HTMLButtonElement),
    master: el('tabMaster', HTMLButtonElement),
    bath: el('tabBath', HTMLButtonElement),
  },
  exportParams,
  el('schemeNote', HTMLParagraphElement),
  el('partList', HTMLUListElement),
  () => state.hollow,
  () => state.mold,
  (exportMode) => applyState({ ...state, exportMode }),
  (hollow) => applyState({ ...state, hollow }),
  (mold) => applyState({ ...state, mold }),
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
  attachRows.sync(state.handle, state.spout);
  exportPanel.sync(state.exportMode, state.hollow, state.mold);
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

  reliefRows.setBandNote((band) => {
    const radiusMm = profileRadius(profile, band.bandCenter);
    const repeats = bandRepeats(band, {
      heightMm: state.heightMm,
      radiusAt: (v) => profileRadius(profile, v),
    });
    const step = (2 * Math.PI * radiusMm) / repeats;
    const element = Math.max(0, step - band.gapMm);
    return `${repeats} оттисков за оборот по ⌀${(radiusMm * 2).toFixed(0)} мм: `
      + `шаг ${step.toFixed(1)} мм, элемент ${element.toFixed(1)} мм.`;
  });

  const buildParams = toBuildParams(state, PREVIEW_SEGMENTS);
  const hollow = buildHollowVessel(buildParams, state.hollow);
  const outer = buildVessel(buildParams);

  // Схему разъёма считаем по телу без ручки: ручка влияет на выбор самим
  // фактом своего существования (сквозное отверстие), а гонять ради этого
  // CSG на каждое движение ползунка незачем.
  const scheme = analyzeMold(outer, {
    hasHandle: state.handle.on,
    hasSpout: hasAppliedSpout(),
    angularRelief: hasAngularRelief(),
  });
  exportPanel.setSchemeNote(scheme.reason);

  baseWarnings = [...scheme.warnings];
  if (hasAppliedSpout() && state.spout.tipAt < SPOUT_BELOW_RIM) {
    baseWarnings.push(
      'Кончик носика ниже венчика: наполнить изделие выше носика не выйдет.',
    );
  }
  if (hollow.pinchedFraction > 0) {
    baseWarnings.push(
      `Рельеф уходит внутрь глубже стенки на ${(hollow.pinchedFraction * 100).toFixed(1)} % поверхности — ` +
      'там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.',
    );
  }
  warningsEl.textContent = baseWarnings.join('\n');

  const widthMm = outerWidth(outer.positions);
  const clayMl = signedVolume(hollow.mesh.positions, hollow.mesh.indices) / 1000;
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
    const tube = buildAppliedSpout(state.spout, surface.profile, surface.heightMm);
    scene.setMeshes([
      hollow.mesh,
      ...buildHandles(state.handle, surface.profile, surface.heightMm),
      ...(tube ? [tube] : []),
    ]);
    exportPanel.setParts([{ label: 'Изделие', note: `${(clayMl / 1000).toFixed(2)} л глины` }]);
    exportBtn.textContent = 'Экспорт STL';
    auditEl.textContent = 'проверка…';
    // Быстрый вердикт — по оболочке: он приходит через четверть секунды и
    // почти всегда окончательный. Если есть приставные детали, следом
    // подъезжает точная сборка из воркера и перепроверяет уже её — то самое,
    // что уйдёт в STL.
    auditTimer = setTimeout(() => audit(hollow.mesh), AUDIT_DELAY_MS);
    if (state.handle.on || hasAppliedSpout()) {
      exactTimer = setTimeout(() => void showExactVessel(stamp), CSG_DELAY_MS);
    }
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
async function showExactVessel(stamp: number): Promise<void> {
  try {
    const parts = await csg.run({ kind: 'vessel-preview', state, segments: EXACT_SEGMENTS });
    if (!parts || stamp !== generation) return;
    const mesh = toMesh(parts[0]);
    scene.setMeshes([mesh]);
    audit(mesh);
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
    // Ход сборки — текстом рядом с проверкой меша: полоса на полсекунды
    // только мельтешила бы. Полоса — для экспорта, там счёт на секунды.
    const parts = await csg.run(
      { kind: 'mold-preview', state, segments: MOLD_PREVIEW_SEGMENTS },
      ({ step, total, label }) => {
        // «собираю» в строке остаётся всё время сборки: по нему и человек, и
        // смоук понимают, что ответа ещё нет.
        if (stamp === generation) {
          auditEl.textContent = `собираю: ${label} (${step + 1} из ${total})`;
        }
      },
    );
    // null — задачу вытеснила более свежая; stamp — её обогнал ответ.
    if (!parts || stamp !== generation) return;

    scene.setMeshes(explode(parts.map(toMesh)));
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

/** Расставляет детали в ряд, чтобы их было видно по отдельности. */
function explode(meshes: SurfaceMesh[]): SurfaceMesh[] {
  let cursor = 0;
  const placed: SurfaceMesh[] = [];
  for (const mesh of meshes) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < mesh.positions.length; i += 3) {
      if (mesh.positions[i] < min) min = mesh.positions[i];
      if (mesh.positions[i] > max) max = mesh.positions[i];
    }
    const shift = cursor - min;
    const positions = new Float32Array(mesh.positions);
    for (let i = 0; i < positions.length; i += 3) positions[i] += shift;
    placed.push({ ...mesh, positions });
    cursor += max - min + EXPLODE_GAP_MM;
  }
  return placed;
}

function audit(mesh: SurfaceMesh): void {
  const report = validateMesh(mesh);
  const assessment = assessExport(report, true);
  const overhang = overhangFraction(mesh, 60);

  auditEl.textContent = report.watertight
    ? `замкнуто ✓ · ${Math.round(report.triangleCount / 1000)} тыс. треугольников`
    : 'меш не замкнут';

  const extra = [...assessment.warnings];
  if (overhang > 0.15) {
    extra.push(`Свесы круче 60° на ${(overhang * 100).toFixed(0)} % поверхности — печать глиной потребует опор.`);
  }
  warningsEl.textContent = [...baseWarnings, ...extra].join('\n');
  blockersEl.textContent = assessment.blocking.join('\n');
  exportBtn.disabled = assessment.blocking.length > 0;
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
    const files = await csg.run({ kind: 'export', state }, showProgress);
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
    hideProgress();
    exportBtn.textContent = label;
    exportBtn.disabled = false;
  }
}

function showProgress({ step, total, label }: JobProgress): void {
  progressWrap.hidden = false;
  progressFill.style.width = `${Math.round((step / Math.max(1, total)) * 100)}%`;
  progressLabel.textContent = label;
}

function hideProgress(): void {
  progressWrap.hidden = true;
  progressFill.style.width = '0%';
  progressLabel.textContent = '';
}

function download(buffer: ArrayBuffer, filename: string): void {
  const url = URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// --- пресеты ---

let userPresets: UserPreset[] = loadUserPresets();

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
    if (preset) applyState(preset.build());
  } else if (value.startsWith('u:')) {
    const preset = userPresets.find((item) => item.name === value.slice(2));
    if (preset) applyState(preset.state);
  }
});

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

fillPresetList();
applyState(state, false);
