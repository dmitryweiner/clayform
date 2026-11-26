// Тела надписей на боку — для булевых операций воркера (`geo/assemble.ts`).
// Строятся в плоском кадре надписи (`geo/decal.ts`: x — по дуге, y — вдоль
// силуэта, z — по нормали) и изгибаются по стенке `warp` manifold'а; длинные
// рёбра перед этим дробятся (`refineToLength`), иначе изогнутая грань шла бы
// хордой сквозь стенку.
//
// Текст — контуры букв, выдавленные призмой: отвесные края, как у
// plate-builder. Картинка — поле высот (`3d/heightfield` кита): белое — на
// всю глубину.
//
// Выпуклое тело уходит основанием в стенку и прибавляется к оболочке;
// вдавленное — резец от дна оттиска до воздуха снаружи, его вычитают.
// Нулевой уровень поля высот (там, где картинка чёрная) отодвинут от стенки
// на ε внутрь у выпуклого и наружу у вдавленного: две почти совпавшие
// поверхности в булевой операции — источник мусорных треугольников. ε больше
// провиса граней сетки тела между узлами, поэтому сетка стенки его не
// пересекает. Под надписью рельеф ровный (`DecalField.calm`): стенка там —
// гладкий силуэт.

import type { CrossSection, Manifold } from 'manifold-3d';
import type { CsgApi, CsgScope } from 'maker-kit/csg/manifold';
import { toManifold } from 'maker-kit/csg/manifold';
import { traceContours } from 'maker-kit/core/raster';
import { heightfieldMesh } from 'maker-kit/3d/heightfield';
import type { Decal, DecalLayout, Rect } from './decal';
import { decalLayout } from './decal';
import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';

/** Сколько выпуклое тело уходит в стенку, мм (не больше половины стенки). */
const EMBED_MM = 1.5;
/** Насколько резец вдавленного выходит наружу из стенки, мм. */
const CLEAR_MM = 1;

export interface DecalSolidOptions {
  /** толщина стенки, мм: выпуклое уходит в неё не глубже половины */
  wallMm: number;
  /** сетка тела: по ней меряется провис граней */
  nu: number;
  nv: number;
  /** доля высоты, где кончается сетка стенки (под заглаженную кромку) */
  vMax: number;
  /** экспорт: мельче шаг поля высот и дробление рёбер */
  fine: boolean;
}

export interface DecalSolids {
  raised: Manifold[];
  engraved: Manifold[];
}

export function decalSolids(
  csg: CsgApi,
  scope: CsgScope,
  decals: readonly Decal[],
  profile: ProfileDef,
  heightMm: number,
  o: DecalSolidOptions,
): DecalSolids {
  const out: DecalSolids = { raised: [], engraved: [] };
  const refine = o.fine ? 0.5 : 1;
  for (const decal of decals) {
    const layout = decalLayout(decal, profile, heightMm);
    const solid =
      decal.art.kind === 'text' ? textSolid(csg, scope, decal, layout) : pictureSolid(csg, scope, decal, layout, profile, heightMm, o);
    if (!solid) continue;
    const bent = scope.keep(
      scope.keep(solid.refineToLength(refine)).warp((vertex) => {
        const [x, y, z] = layout.frame.toModel(vertex[0], vertex[1], vertex[2]);
        vertex[0] = x;
        vertex[1] = y;
        vertex[2] = z;
      }),
    );
    (decal.depthMm > 0 ? out.raised : out.engraved).push(bent);
  }

  // глубина вдавленного уже зажата стенкой (`stateDecals`); основание выпуклого — не глубже половины стенки
  function textSolid(api: CsgApi, keep: CsgScope, item: Decal, layout: DecalLayout): Manifold | null {
    if (item.art.kind !== 'text') return null;
    const { raster } = item.art;
    const ppm = raster.pxPerMm;
    const up = raster.height - raster.originY;
    const rings = traceContours(raster).map((ring) => ring.map(([x, y]): [number, number] => [(x - raster.originX) / ppm, (y - up) / ppm]));
    if (rings.length === 0) return null;
    const letters = keep.keep(new api.CrossSection(rings, 'Positive'));
    const inside = keep.keep(letters.intersect(rectSection(api, keep, layout.room)));
    if (inside.isEmpty()) return null;
    const [z0, z1] = item.depthMm > 0 ? [-embed(o.wallMm), item.depthMm] : [item.depthMm, CLEAR_MM];
    return keep.keep(keep.keep(inside.extrude(z1 - z0)).translate([0, 0, z0]));
  }

  return out;
}

const embed = (wallMm: number): number => Math.min(EMBED_MM, wallMm / 2);

function rectSection(csg: CsgApi, scope: CsgScope, rect: Rect): CrossSection {
  return scope.keep(scope.keep(csg.CrossSection.square([rect.x1 - rect.x0, rect.y1 - rect.y0])).translate([rect.x0, rect.y0]));
}

/** Пересечение прямоугольников; null — пусто. */
function overlap(a: Rect, b: Rect): Rect | null {
  const rect = { x0: Math.max(a.x0, b.x0), x1: Math.min(a.x1, b.x1), y0: Math.max(a.y0, b.y0), y1: Math.min(a.y1, b.y1) };
  return rect.x1 - rect.x0 > 1e-3 && rect.y1 - rect.y0 > 1e-3 ? rect : null;
}

/**
 * Картинка полем высот над её частью, которой есть место на стенке. Шаг —
 * пиксель картинки, но не мельче 0,25 мм на экспорте и 0,6 мм в превью.
 * Вдавленное строится как выпуклое и зеркалится по z: дно оттиска — поле
 * высот, верх резца — плоский, снаружи стенки.
 */
function pictureSolid(
  csg: CsgApi,
  scope: CsgScope,
  decal: Decal,
  layout: DecalLayout,
  profile: ProfileDef,
  heightMm: number,
  o: DecalSolidOptions,
): Manifold | null {
  if (decal.art.kind !== 'image') return null;
  const rect = overlap(layout.art, layout.room);
  if (!rect) return null;
  const pixelMm = (layout.art.x1 - layout.art.x0) / decal.art.picture.w;
  const step = Math.max(pixelMm, o.fine ? 0.25 : 0.6);
  const cx = (rect.x0 + rect.x1) / 2;
  const cy = (rect.y0 + rect.y1) / 2;
  const depth = Math.abs(decal.depthMm);
  const gap = facetGapMm(profile, heightMm, layout, o) + 0.02;
  const mesh = heightfieldMesh((x, y) => depth * layout.sample(x + cx, y + cy), {
    width: rect.x1 - rect.x0,
    height: rect.y1 - rect.y0,
    step,
    zero: -gap,
    // дно тела — всегда ниже нулевого уровня, даже у очень крупного провиса
    bottom: Math.min(decal.depthMm > 0 ? -embed(o.wallMm) : -CLEAR_MM, -gap - 0.2),
  });
  for (let i = 0; i < mesh.positions.length; i += 3) {
    mesh.positions[i] += cx;
    mesh.positions[i + 1] += cy;
  }
  const solid = scope.keep(toManifold(csg, mesh));
  return decal.depthMm > 0 ? solid : scope.keep(solid.mirror([0, 0, 1]));
}

/**
 * Насколько грани сетки стенки отходят от гладкого силуэта под надписью,
 * мм: хорда по кругу (между столбцами сетки) и по силуэту (между рядами).
 * Нулевой уровень поля высот отодвигается от стенки на это и ещё чуть-чуть.
 */
export function facetGapMm(
  profile: ProfileDef,
  heightMm: number,
  layout: DecalLayout,
  o: Pick<DecalSolidOptions, 'nu' | 'nv' | 'vMax'>,
): number {
  const { frame, art } = layout;
  const rows = 48;
  const dv = o.vMax / Math.max(o.nv, 1);
  const point = (v: number): [number, number] => [profileRadius(profile, v), v * heightMm];
  let gap = 0;
  for (let k = 0; k <= rows; k++) {
    const y = art.y0 + ((art.y1 - art.y0) * k) / rows;
    const [px, py, pz] = frame.toModel(0, y, 0);
    const v = pz / heightMm;
    const r = Math.hypot(px, py);
    const around = r * (1 - Math.cos(Math.PI / Math.max(o.nu, 3)));
    // провис хорды между рядами сетки: середина хорды против точки силуэта
    const [ra, za] = point(Math.max(0, v - dv / 2));
    const [rb, zb] = point(Math.min(1, v + dv / 2));
    const [rm, zm] = point(v);
    const along = Math.hypot((ra + rb) / 2 - rm, (za + zb) / 2 - zm);
    gap = Math.max(gap, around + along);
  }
  return gap;
}
