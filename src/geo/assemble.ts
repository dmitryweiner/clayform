// Сборка изделия целиком: тело вращения плюс приставные детали и надписи
// на боку (`geo/decalSolid.ts`).
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

import type { SurfaceMesh } from 'maker-kit/3d/mesh';
import type { CsgApi } from 'maker-kit/csg/manifold';
import { CsgScope, toManifold, fromManifold } from 'maker-kit/csg/manifold';
import type { BuildParams } from './build';
import { vesselSurface } from './build';
import type { HandleState } from './handle';
import { buildHandles } from './handle';
import type { SpoutState } from './spout';
import { buildAppliedSpout, appliedSpoutChannel } from './spout';
import type { HollowState, SeatFit } from './hollow';
import { buildHollowVessel, WALL_MIN_MM, WALL_MAX_MM } from './hollow';
import { decalSolids } from './decalSolid';

/** Объединение нескольких замкнутых мешей в один. */
export function unionAll(csg: CsgApi, meshes: SurfaceMesh[]): SurfaceMesh {
  if (meshes.length === 0) throw new Error('unionAll: nothing to unite');
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
 * Полое изделие для прямой печати: с ручками, с настоящим, сквозным носиком
 * и с надписями на боку.
 *
 *     (оболочка ∪ ручки ∪ трубка ∪ выпуклое) − (полость ∪ канал ∪ вдавленное)
 */
export function buildPrintableVessel(
  csg: CsgApi,
  p: BuildParams,
  hollow: HollowState,
  handle: HandleState,
  spout: SpoutState,
  seat?: SeatFit,
): { mesh: SurfaceMesh; capacityMl: number; pinchedFraction: number } {
  const result = buildHollowVessel(p, hollow, seat);
  const surface = vesselSurface(p);
  const handles = buildHandles(handle, surface.profile, surface.heightMm);
  const tube = buildAppliedSpout(spout, surface.profile, surface.heightMm);
  const decals = p.decals ?? [];
  if (handles.length === 0 && !tube && decals.length === 0) return result;
  // Стенка носика равна стенке тела: отдельного ползунка не завели, потому
  // что печатают и то и другое одним и тем же соплом.
  const channel = appliedSpoutChannel(spout, surface.profile, surface.heightMm, hollow.wallMm);

  const scope = new CsgScope();
  try {
    // Объединяем с ГОТОВОЙ полой оболочкой, а не со сплошным телом: у неё уже
    // и полость на месте, и венчик заглажен. Сплошное тело пришлось бы потом
    // вскрывать полостью, а полость обрывается на радиус кромки ниже верха —
    // изделие оставалось бы запечатанным.
    const shell = scope.keep(toManifold(csg, result.mesh));
    // та же стенка и тот же срез под кромку, что у оболочки (`buildHollowVessel`)
    const wallMm = Math.min(WALL_MAX_MM, Math.max(WALL_MIN_MM, hollow.wallMm));
    const rimMm = Math.min(hollow.rimRadiusMm, wallMm / 2);
    const art = decalSolids(csg, scope, decals, surface.profile, surface.heightMm, {
      wallMm,
      nu: surface.nu,
      nv: surface.nv,
      vMax: (surface.heightMm - rimMm) / surface.heightMm,
      fine: p.decalFine === true,
    });
    const outside = scope.keep(
      csg.Manifold.union([shell, ...[...handles, ...maybe(tube)].map((mesh) => scope.keep(toManifold(csg, mesh))), ...art.raised]),
    );
    // Утопленные в стенку торцы ручки торчат внутрь полости — срезаем их,
    // чтобы внутри кружки не осталось бугра. Тем же вычитанием канал носика
    // пробивает стенку и вскрывает устье трубки.
    const cavity = scope.keep(toManifold(csg, result.cavity));
    // Вдавленные надписи — резцы от дна оттиска наружу; до полости они не
    // доходят: их глубина зажата стенкой.
    const cutters = [cavity, ...(channel ? [scope.keep(toManifold(csg, channel))] : []), ...art.engraved];
    const inside = cutters.length > 1 ? scope.keep(csg.Manifold.union(cutters)) : cavity;
    const mesh = fromManifold(scope.keep(outside.subtract(inside)));
    // Вместимость считаем по полости тела: вклад канала — единицы миллилитров,
    // и на выбор посуды он не влияет.
    return { mesh, capacityMl: result.capacityMl, pinchedFraction: result.pinchedFraction };
  } finally {
    scope.dispose();
  }
}

/** Необязательная деталь как список: удобно раскрывать в спред. */
function maybe(mesh: SurfaceMesh | null): SurfaceMesh[] {
  return mesh ? [mesh] : [];
}
