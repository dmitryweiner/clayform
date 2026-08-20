// Точка входа: состояние → ядро геометрии → рендер и UI.
// Растёт по вехам плана; сейчас (M2) — выбор семейства, параметры силуэта,
// живое превью и экспорт сплошного тела.

import './style.css';
import { el } from './ui/dom';
import { createScene } from './render/scene';
import { renderFamilyPicker } from './ui/family';
import { renderParams } from './ui/params';
import { setupAdjustmentButtons } from './ui/adjust';
import { drawProfileGraph } from './ui/graph';
import { buildVessel } from './geo/build';
import { buildProfile, familyById } from './geo/profiles';
import { encodeSTL } from './geo/stl';
import { validateMesh, assessExport, overhangFraction } from './geo/validate';
import type { AppState } from './state/schema';
import { defaultState, stateForFamily, sanitizeState, toBuildParams, RESOLUTIONS } from './state/schema';

const PREVIEW_SEGMENTS = 96;

const view = el('view', HTMLCanvasElement);
const panel = el('panel', HTMLElement);
const familyGrid = el('familyGrid', HTMLDivElement);
const shapeParams = el('shapeParams', HTMLDivElement);
const profileGraph = el('profileGraph', HTMLCanvasElement);
const heightInput = el('heightMm', HTMLInputElement);
const resolutionSel = el('resolution', HTMLSelectElement);
const exportBtn = el('exportBtn', HTMLButtonElement);
const statusEl = el('status', HTMLParagraphElement);
const warningsEl = el('warnings', HTMLParagraphElement);
const blockersEl = el('blockers', HTMLParagraphElement);

const scene = createScene(view);
let state: AppState = defaultState();

const picker = renderFamilyPicker(familyGrid, state.family, (id) => {
  applyState(stateForFamily(id, state));
});
setupAdjustmentButtons(panel);

let paramRows = renderShapeParams();

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
  heightInput.value = String(Math.round(state.heightMm));
  resolutionSel.value = String(state.resolution);
  refresh();
}

function refresh(): void {
  drawProfileGraph(profileGraph, buildProfile(state.family, state.shape, state.heightMm));

  const mesh = buildVessel(toBuildParams(state, PREVIEW_SEGMENTS));
  scene.setMesh(mesh);

  const report = validateMesh(mesh);
  const assessment = assessExport(report, true);
  const width = Math.max(report.extents[0], report.extents[1]);
  const litres = report.volume / 1e6;
  statusEl.textContent = [
    `⌀${width.toFixed(0)} × ${report.extents[2].toFixed(0)} мм`,
    `объём тела ${litres.toFixed(2)} л`,
    report.watertight ? 'замкнуто ✓' : 'не замкнуто',
  ].join(' · ');

  const warnings = [...assessment.warnings];
  const overhang = overhangFraction(mesh, 60);
  if (overhang > 0.15) {
    warnings.push(`Свесы круче 60°: ${(overhang * 100).toFixed(0)} % поверхности — печать глиной потребует опор.`);
  }
  warningsEl.textContent = warnings.join('\n');
  blockersEl.textContent = assessment.blocking.join('\n');
  exportBtn.disabled = assessment.blocking.length > 0;
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
  const mesh = buildVessel(toBuildParams(state, state.resolution));
  const assessment = assessExport(validateMesh(mesh), true);
  if (assessment.blocking.length > 0) {
    blockersEl.textContent = assessment.blocking.join('\n');
    return;
  }
  download(encodeSTL(mesh, { name: state.family }), `clayform-${state.family}.stl`);
});

function download(buffer: ArrayBuffer, filename: string): void {
  const url = URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

applyState(state);
