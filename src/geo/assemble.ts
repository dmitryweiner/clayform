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
import type { SpoutState } from './spout';
import { buildAppliedSpout, appliedSpoutChannel } from './spout';
import type { HollowState, SeatFit } from './hollow';
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
  spout: SpoutState,
): SurfaceMesh {
  const body = buildVessel(p);
  const surface = vesselSurface(p);
  // Носик приклеивается сплошным: мастер и оснастка работают с позитивом, а
  // в шликерном литье носик и так отливается полым — проход через стенку
  // прорезают по сырому.
  const parts = [
    ...buildHandles(handle, surface.profile, surface.heightMm),
    ...maybe(buildAppliedSpout(spout, surface.profile, surface.heightMm)),
  ];
  return parts.length === 0 ? body : unionAll(csg, [body, ...parts]);
}

/**
 * Полое изделие для прямой печати: с ручками и с настоящим, сквозным носиком.
 *
 *     (оболочка ∪ ручки ∪ трубка) − (полость ∪ канал)
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
  if (handles.length === 0 && !tube) return result;
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
    const outside = scope.keep(csg.Manifold.union([
      shell,
      ...[...handles, ...maybe(tube)].map((mesh) => scope.keep(toManifold(csg, mesh))),
    ]));
    // Утопленные в стенку торцы ручки торчат внутрь полости — срезаем их,
    // чтобы внутри кружки не осталось бугра. Тем же вычитанием канал носика
    // пробивает стенку и вскрывает устье трубки.
    const cavity = scope.keep(toManifold(csg, assembleMesh(result.innerGrid, 'both')));
    const inside = channel
      ? scope.keep(csg.Manifold.union([cavity, scope.keep(toManifold(csg, channel))]))
      : cavity;
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
