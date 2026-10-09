// Отминка в «−»: углублённая форма. Печатается сама форма — блок с полостью
// по наружной поверхности изделия (с усадкой). Пласт вдавливают внутрь,
// рельеф оказывается снаружи изделия, наружные размеры — ровно заданные.
//
// Это одночастный гипсовый блок без горловины (схема 'dropout' и так ставит
// её высоту в ноль), только напечатанный: «гипс» здесь — борт формы.
// Слайсер зальёт его заполнением.

import type { SurfaceMesh } from '../surface';
import type { CsgApi } from '../csg';
import { CsgScope, toManifold, fromManifold } from '../csg';
import { buildCavity, buildBlockParts } from './block';
import type { MoldState } from './state';
import type { MoldPartMesh } from './index';

export function buildSlump(csg: CsgApi, vessel: SurfaceMesh, mold: MoldState): MoldPartMesh {
  const scope = new CsgScope();
  try {
    const solid = scope.keep(toManifold(csg, vessel));
    const cavity = buildCavity(csg, scope, solid, 'dropout', mold);
    const [block] = buildBlockParts(csg, scope, cavity, 'dropout', mold);
    return { id: 'slump', label: 'Отминочная форма', mesh: fromManifold(block.solid) };
  } finally {
    scope.dispose();
  }
}
