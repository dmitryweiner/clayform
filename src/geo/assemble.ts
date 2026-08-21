// Сборка изделия целиком: тело вращения плюс приставные детали.
//
// Ручка приклеивается булевым объединением, поэтому без WASM-CSG здесь не
// обойтись. Зато полое изделие с ручкой получается «правильным» само собой:
//
//     (сплошное тело ∪ ручки) − полость
//
// Утопленные в стенку торцы ручки срезаются полостью, и внутри кружки не
// остаётся бугра — ровно так же, как если бы ручку прилепили снаружи готовой
// стенки. Без CSG пришлось бы либо оставлять бугор, либо подгонять торец
// ручки под форму стенки вручную.

import type { SurfaceMesh } from './surface';
import { assembleMesh } from './surface';
import type { CsgApi } from './csg';
import { CsgScope, toManifold, fromManifold } from './csg';
import type { BuildParams } from './build';
import { buildVessel, vesselSurface } from './build';
import type { HandleState } from './handle';
import { buildHandles } from './handle';
import type { HollowState } from './hollow';
import { buildHollowVessel } from './hollow';

/** Объединение нескольких замкнутых мешей в один. */
export function unionAll(csg: CsgApi, meshes: SurfaceMesh[]): SurfaceMesh {
  if (meshes.length === 0) throw new Error('unionAll: нечего объединять');
  if (meshes.length === 1) return meshes[0];
  const scope = new CsgScope();
  try {
    const solids = meshes.map((mesh) => scope.keep(toManifold(csg, mesh)));
    return fromManifold(scope.keep(csg.Manifold.union(solids)));
  } finally {
    scope.dispose();
  }
}

/**
 * Сплошной позитив изделия со всеми приставками. Это то, вокруг чего потом
 * строится литейная оснастка.
 */
export function buildSolidVessel(
  csg: CsgApi,
  p: BuildParams,
  handle: HandleState,
): SurfaceMesh {
  const body = buildVessel(p);
  const surface = vesselSurface(p);
  const handles = buildHandles(handle, surface.profile, surface.heightMm);
  return handles.length === 0 ? body : unionAll(csg, [body, ...handles]);
}

/** Полое изделие для прямой печати, с ручками. */
export function buildPrintableVessel(
  csg: CsgApi,
  p: BuildParams,
  hollow: HollowState,
  handle: HandleState,
): { mesh: SurfaceMesh; capacityMl: number; pinchedFraction: number } {
  const result = buildHollowVessel(p, hollow);
  const surface = vesselSurface(p);
  const handles = buildHandles(handle, surface.profile, surface.heightMm);
  if (handles.length === 0) return result;

  const scope = new CsgScope();
  try {
    // Объединяем с ГОТОВОЙ полой оболочкой, а не со сплошным телом: у неё уже
    // и полость на месте, и венчик заглажен. Сплошное тело пришлось бы потом
    // вскрывать полостью, а полость обрывается на радиус кромки ниже верха —
    // изделие оставалось бы запечатанным.
    const shell = scope.keep(toManifold(csg, result.mesh));
    const withHandles = scope.keep(csg.Manifold.union([
      shell,
      ...handles.map((mesh) => scope.keep(toManifold(csg, mesh))),
    ]));
    // Утопленные в стенку торцы ручки торчат внутрь полости — срезаем их,
    // чтобы внутри кружки не осталось бугра.
    const cavity = scope.keep(toManifold(csg, assembleMesh(result.innerGrid, 'both')));
    const mesh = fromManifold(scope.keep(withHandles.subtract(cavity)));
    return { mesh, capacityMl: result.capacityMl, pinchedFraction: result.pinchedFraction };
  } finally {
    scope.dispose();
  }
}
