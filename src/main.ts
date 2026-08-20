// Точка входа: состояние → ядро геометрии → рендер и UI.
// Растёт по вехам плана; сейчас (M5) — форма, рельеф, накатка, ручка с
// носиком и экспорт полого изделия для прямой печати глиной.

import './style.css';
import { el } from './ui/dom';
import { createScene } from './render/scene';
import { renderFamilyPicker } from './ui/family';
import { renderParams } from './ui/params';
import { renderReliefCards } from './ui/reliefCards';
import { renderAttachCards } from './ui/attachCards';
import { renderControls } from './ui/controls';
import type { Control } from './ui/controls';
import { setupAdjustmentButtons } from './ui/adjust';
import { drawProfileGraph } from './ui/graph';
import { buildVessel, vesselSurface } from './geo/build';
import { buildHandles } from './geo/handle';
import { buildPrintableVessel } from './geo/assemble';
import { initCSG } from './geo/csg';
import { analyzeMold } from './geo/mold/analyze';
import type { HollowState } from './geo/hollow';
import {
  buildHollowVessel, WALL_MIN_MM, WALL_MAX_MM, BASE_MIN_MM, BASE_MAX_MM,
} from './geo/hollow';
import { buildProfile, familyById, profileRadius } from './geo/profiles';
import { rouletteRepeats } from './geo/roulette';
import { encodeSTL } from './geo/stl';
import { validateMesh, assessExport, overhangFraction, signedVolume } from './geo/validate';
import type { AppState } from './state/schema';
import { defaultState, stateForFamily, sanitizeState, toBuildParams, RESOLUTIONS } from './state/schema';

// Превью строится на главном потоке: 192×192 — это ~10 мс, незаметно даже при
// перетаскивании ползунка, и ровно та детализация, что уходит в STL по
// умолчанию. Более высокие значения из «Детализации» применяются к экспорту.
const PREVIEW_SEGMENTS = 192;
/**
 * Полная проверка меша (манифолдность, свесы) стоит ~70 мс — на каждое
 * движение ползунка это заметная задержка. Меши у нас замкнуты по построению,
 * поэтому проверка нужна как страховка, а не покадрово: гоняем её, когда
 * пользователь остановился.
 */
const AUDIT_DELAY_MS = 220;

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
const schemeNote = el('schemeNote', HTMLParagraphElement);
const partList = el('partList', HTMLUListElement);

const scene = createScene(view);
let state: AppState = defaultState();

const HOLLOW_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range', key: 'wall', label: 'Стенка', min: WALL_MIN_MM, max: WALL_MAX_MM, step: 0.1, unit: 'мм',
    hint: 'толщина меряется по нормали к поверхности',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
  {
    kind: 'range', key: 'base', label: 'Дно', min: BASE_MIN_MM, max: BASE_MAX_MM, step: 0.5, unit: 'мм',
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
];

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

const hollowRows = renderControls(
  exportParams,
  HOLLOW_CONTROLS,
  () => state.hollow,
  (hollow) => applyState({ ...state, hollow }),
  'print',
);

function renderShapeParams(): ReturnType<typeof renderParams> {
  return renderParams(shapeParams, familyById(state.family).params, state.shape, (key, value) => {
    applyState({ ...state, shape: { ...state.shape, [key]: value } });
  });
}

function applyState(next: AppState): void {
  // у каждого семейства свой набор параметров, поэтому смена семейства
  // требует пересоздать строки, а не просто обновить значения
  const familyChanged = next.family !== state.family;
  state = sanitizeState(next);
  if (familyChanged) {
    picker.setActive(state.family);
    paramRows = renderShapeParams();
  } else {
    paramRows.setValues(state.shape);
  }
  reliefRows.sync(state.relief, state.roulette);
  attachRows.sync(state.handle, state.spout);
  hollowRows.sync(state.hollow);
  heightInput.value = String(Math.round(state.heightMm));
  resolutionSel.value = String(state.resolution);
  refresh();
}

let auditTimer: ReturnType<typeof setTimeout> | null = null;

function refresh(): void {
  const profile = buildProfile(state.family, state.shape, state.heightMm);
  drawProfileGraph(profileGraph, profile);

  const bandRadiusMm = profileRadius(profile, state.roulette.bandCenter);
  const repeats = rouletteRepeats(state.roulette, { heightMm: state.heightMm, bandRadiusMm });
  const step = (2 * Math.PI * bandRadiusMm) / repeats;
  reliefRows.setRepeatsNote(
    `${repeats} оттисков за оборот, шаг ${step.toFixed(1)} мм по окружности ⌀${(bandRadiusMm * 2).toFixed(0)} мм.`,
  );

  const buildParams = toBuildParams(state, PREVIEW_SEGMENTS);
  const hollow = buildHollowVessel(buildParams, state.hollow);
  // Ручку в превью показываем отдельным мешем, а не результатом булевого
  // объединения: непрозрачные пересекающиеся тела выглядят ровно как их
  // union, а CSG на каждое движение ползунка стоил бы 300 мс вместо 10.
  // В STL уходит уже настоящее объединение — там оно обязательно.
  const surface = vesselSurface(buildParams);
  const handles = buildHandles(state.handle, surface.profile, surface.heightMm);
  scene.setMeshes([hollow.mesh, ...handles]);

  const outer = buildVessel(toBuildParams(state, PREVIEW_SEGMENTS));
  const widthMm = outerWidth(outer.positions);
  const clayMl = signedVolume(hollow.mesh.positions, hollow.mesh.indices) / 1000;
  statusEl.textContent = [
    `⌀${widthMm.toFixed(0)} × ${state.heightMm.toFixed(0)} мм`,
    `вместимость ${formatVolume(hollow.capacityMl)}`,
    `глины ${formatVolume(clayMl)}`,
  ].join(' · ');

  // Схему разъёма считаем по телу без ручки: ручка влияет на выбор фактом
  // своего существования (сквозное отверстие), а гонять ради этого CSG на
  // каждое движение ползунка незачем.
  const scheme = analyzeMold(outer, { hasHandle: state.handle.on });
  schemeNote.textContent = scheme.reason;
  partList.textContent = '';
  for (const part of scheme.parts) {
    const item = document.createElement('li');
    const name = document.createElement('span');
    name.className = 'part-name';
    name.textContent = part.label;
    item.append(name);
    partList.append(item);
  }

  const warnings: string[] = [...scheme.warnings];
  if (hollow.pinchedFraction > 0) {
    warnings.push(
      `Рельеф уходит внутрь глубже стенки на ${(hollow.pinchedFraction * 100).toFixed(1)} % поверхности — ` +
      'там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.',
    );
  }
  warningsEl.textContent = warnings.join('\n');

  auditEl.textContent = 'проверка…';
  if (auditTimer) clearTimeout(auditTimer);
  auditTimer = setTimeout(() => audit(hollow.mesh), AUDIT_DELAY_MS);
}

function audit(mesh: ReturnType<typeof buildHollowVessel>['mesh']): void {
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
  const existing = warningsEl.textContent ? [warningsEl.textContent] : [];
  warningsEl.textContent = [...existing, ...extra].join('\n');
  blockersEl.textContent = assessment.blocking.join('\n');
  exportBtn.disabled = assessment.blocking.length > 0;
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

const csgReady = initCSG();

exportBtn.addEventListener('click', () => {
  void exportVessel();
});

async function exportVessel(): Promise<void> {
  const label = exportBtn.textContent;
  exportBtn.disabled = true;
  exportBtn.textContent = 'Собираю…';
  try {
    const csg = await csgReady;
    const { mesh } = buildPrintableVessel(
      csg, toBuildParams(state, state.resolution), state.hollow, state.handle,
    );
    const assessment = assessExport(validateMesh(mesh), true);
    if (assessment.blocking.length > 0) {
      blockersEl.textContent = assessment.blocking.join('\n');
      return;
    }
    blockersEl.textContent = '';
    download(encodeSTL(mesh, { name: state.family }), `clayform-${state.family}.stl`);
  } catch (error) {
    blockersEl.textContent = `Сборка не удалась: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    exportBtn.textContent = label;
    exportBtn.disabled = false;
  }
}

function download(buffer: ArrayBuffer, filename: string): void {
  const url = URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

applyState(state);
