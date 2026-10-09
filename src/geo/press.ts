// Отминка в «+»: горб — выпуклая форма, на которую кладут пласт глины.
//
// Поверхность горба — ВНУТРЕННЯЯ поверхность изделия: силуэт, отодвинутый
// внутрь по нормали на толщину стенки (она же толщина пласта). Тогда пласт,
// облёгший горб, даёт изделие ровно заданных наружных размеров, а не на две
// стенки больше. Рельеф ложится на горб и оказывается внутри изделия — с
// обратным знаком: валик на горбе — канавка в изделии.
//
// Горб полый, скорлупой толщиной в борт печатной детали: экономим пластик.
// Скорлупа — ровно полое изделие, построенное по внутреннему силуэту, —
// перевёрнутое венчиком на стол. Чистая геометрия без CSG: ~10 мс, строится
// и в главном потоке, и в воркере.
//
// Отминка в «−» (углублённая форма, пласт вдавливают внутрь) — блок с
// полостью по наружной поверхности, ей нужны булевы операции: geo/mold/press.ts.

import type { SurfaceMesh } from './surface';
import { mirrorZ, scaleMesh } from './surface';
import type { ProfileDef, ProfilePoint } from './profiles';
import { buildProfile, profileRadius, MIN_RADIUS_MM } from './profiles';
import type { BuildParams } from './build';
import { buildVessel } from './build';
import type { HollowState } from './hollow';
import { buildHollowVessel, cavityPoint, WALL_MIN_MM, WALL_MAX_MM } from './hollow';

/** Точек выборки офсета: столько же, сколько рядов у превью, с запасом. */
const INSET_SAMPLES = 256;
/** Точек готового силуэта: сплайн по ним неотличим от выборки. */
const INSET_POINTS = 96;

export interface InsetProfile {
  profile: ProfileDef;
  /** высота внутренней поверхности: от пола до венчика */
  heightMm: number;
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

/**
 * Силуэт, отодвинутый внутрь по нормали на `wallMm`, — поверхность полости
 * изделия с полом на высоте стенки (пласт одинаковой толщины везде, и на
 * дне тоже). Офсет считает та же `cavityPoint`, что строит полость, и с теми
 * же ограничениями: не ниже пола, не ниже предыдущей точки (офсет резкого
 * плеча шагает вниз) и не выше венчика. После них высота монотонна, и r(z)
 * пересэмплируется по равномерной сетке высот.
 */
export function insetProfile(profile: ProfileDef, heightMm: number, wallMm: number): InsetProfile {
  const wall = clamp(wallMm, WALL_MIN_MM, Math.min(WALL_MAX_MM, heightMm * 0.4));
  const radiusAt = (v: number): number => profileRadius(profile, v);
  const floorZ = wall;
  const samples: { r: number; z: number }[] = [];
  let previous = floorZ;
  for (let i = 0; i <= INSET_SAMPLES; i++) {
    const point = cavityPoint(radiusAt, heightMm, wall, i / INSET_SAMPLES);
    const z = Math.min(Math.max(point.z, floorZ, previous), heightMm);
    previous = z;
    // ниже пола точка офсета лежит под ним — её место занимает пол
    if (point.z < floorZ) continue;
    samples.push({ r: Math.max(MIN_RADIUS_MM, point.r), z });
  }

  const innerHeight = heightMm - floorZ;
  /** r на высоте z: линейно между соседними выборками, первая — у пола. */
  const rAt = (z: number): number => {
    if (samples.length === 0) return MIN_RADIUS_MM;
    if (z <= samples[0].z) return samples[0].r;
    for (let k = 1; k < samples.length; k++) {
      const a = samples[k - 1];
      const b = samples[k];
      if (z > b.z) continue;
      const t = b.z > a.z ? (z - a.z) / (b.z - a.z) : 1;
      return a.r + (b.r - a.r) * t;
    }
    return samples[samples.length - 1].r;
  };

  const points: ProfilePoint[] = [];
  for (let k = 0; k <= INSET_POINTS; k++) {
    const t = k / INSET_POINTS;
    points.push({ t, r: rAt(floorZ + t * innerHeight) });
  }
  return { profile: { familyId: profile.familyId, heightMm: innerHeight, points }, heightMm: innerHeight };
}

/** Параметры сборки внутренней поверхности изделия — с рельефом изделия. */
function insetParams(params: BuildParams, wallMm: number): BuildParams {
  const profile = params.profile ?? buildProfile(params.family, params.shape, params.heightMm);
  const inset = insetProfile(profile, params.heightMm, wallMm);
  return { ...params, profile: inset.profile, heightMm: inset.heightMm };
}

/**
 * Сплошная внутренняя поверхность изделия в модельной ориентации (пол
 * внизу, устье вверху). По ней меряются зацепы горба: изделие уходит с горба
 * в модельном −z, и мешает ровно та грань, что смотрит вверх, — тот же
 * критерий, что у одночастной формы (`pullUndercut(…, 'up')`).
 */
export function humpSurface(params: BuildParams, hollow: HollowState): SurfaceMesh {
  return buildVessel(insetParams(params, hollow.wallMm));
}

export interface HumpResult {
  /** горб в печатном положении: венчиком на столе, z ≥ 0 */
  mesh: SurfaceMesh;
  /** доля узлов, где рельеф пришлось поджать: глубже борта скорлупы */
  pinchedFraction: number;
}

/**
 * Горб: полая скорлупа по внутренней поверхности изделия, увеличенная на
 * усадку и перевёрнутая венчиком на стол. Кромку не скругляем: иначе горб
 * стал бы ниже на её радиус, а венчик лёг бы на стол не всей плоскостью.
 */
export function buildHump(
  params: BuildParams,
  hollow: HollowState,
  shellMm: number,
  shrinkPct: number,
): HumpResult {
  const shell = buildHollowVessel(
    insetParams(params, hollow.wallMm),
    { wallMm: shellMm, baseMm: shellMm, rimRadiusMm: 0 },
  );
  return {
    mesh: mirrorZ(scaleMesh(shell.mesh, 1 + shrinkPct / 100)),
    pinchedFraction: shell.pinchedFraction,
  };
}
