// Оркестратор литейной оснастки: изделие → мастер-позитив, гипсовые блоки,
// ванночки под силикон.

import type { SurfaceMesh } from '../surface';
import type { CsgApi } from '../csg';
import { CsgScope, toManifold, fromManifold } from '../csg';
import type { MoldReport } from './analyze';
import { buildCavity, buildBlockParts } from './block';
import { buildBath } from './bath';
import type { MoldState } from './state';

export type { MoldState } from './state';
export { defaultMold, sanitizeMold, SHRINK_MAX_PCT, PLASTER_MAX_MM, SPARE_MAX_MM } from './state';
export type { MoldReport, MoldScheme, MoldPart } from './analyze';
export { analyzeMold, pullUndercut } from './analyze';

export interface MoldPartMesh {
  id: string;
  label: string;
  mesh: SurfaceMesh;
}

/**
 * Мастер-позитив: изделие с усадкой плюс литейная горловина. С него вручную
 * снимают силиконовую форму по классической схеме с пластилиновой постелью.
 */
export function buildMaster(
  csg: CsgApi,
  vessel: SurfaceMesh,
  report: MoldReport,
  mold: MoldState,
): MoldPartMesh {
  const scope = new CsgScope();
  try {
    const solid = scope.keep(toManifold(csg, vessel));
    const cavity = buildCavity(csg, scope, solid, report.scheme, mold);
    // у полости сверху есть пробойник — он нужен только блоку, мастер режем
    // по верху горловины
    const trimmed = scope.keep(cavity.solid.trimByPlane([0, 0, -1], -cavity.topZ));
    return { id: 'master', label: 'Мастер-позитив', mesh: fromManifold(trimmed) };
  } finally {
    scope.dispose();
  }
}

/** Части гипсовой формы в собранном положении. */
export function buildBlocks(
  csg: CsgApi,
  vessel: SurfaceMesh,
  report: MoldReport,
  mold: MoldState,
): MoldPartMesh[] {
  const scope = new CsgScope();
  try {
    const solid = scope.keep(toManifold(csg, vessel));
    const cavity = buildCavity(csg, scope, solid, report.scheme, mold);
    return buildBlockParts(csg, scope, cavity, report.scheme, mold).map((part) => ({
      id: part.id,
      label: part.label,
      mesh: fromManifold(part.solid),
    }));
  } finally {
    scope.dispose();
  }
}

/** Печатные ванночки — по одной на каждую часть гипсовой формы. */
export function buildBaths(
  csg: CsgApi,
  vessel: SurfaceMesh,
  report: MoldReport,
  mold: MoldState,
): MoldPartMesh[] {
  const scope = new CsgScope();
  try {
    const solid = scope.keep(toManifold(csg, vessel));
    const cavity = buildCavity(csg, scope, solid, report.scheme, mold);
    return buildBlockParts(csg, scope, cavity, report.scheme, mold).map((part) => ({
      id: `bath-${part.id}`,
      label: `Ванночка: ${part.label.toLowerCase()}`,
      mesh: fromManifold(buildBath(csg, scope, part, mold)),
    }));
  } finally {
    scope.dispose();
  }
}
