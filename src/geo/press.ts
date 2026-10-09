// Отминочные формы — обе печатаются скорлупой толщиной в борт: пласту
// нужна только поверхность, которой он касается, а не сплошной блок.
//
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
// Отминка в «−»: углублённая форма, пласт вдавливают внутрь. Её рабочая
// поверхность — НАРУЖНАЯ поверхность изделия с рельефом, а снаружи скорлупы —
// гладкий силуэт, отодвинутый наружу на борт. Тоже без CSG.

import type { Grid, SurfaceMesh } from './surface';
import { assembleHollowMesh, mirrorZ, scaleMesh } from './surface';
import { meshNormals } from './normals';
import type { ProfileDef, ProfilePoint } from './profiles';
import { buildProfile, profileRadius, MIN_RADIUS_MM } from './profiles';
import type { BuildParams } from './build';
import { buildVessel, vesselGrid, vesselSurface } from './build';
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

/**
 * Углублённая форма скорлупой. Внутри — наружная поверхность изделия с
 * рельефом (её и касается пласт), снаружи — гладкий силуэт, отодвинутый по
 * нормали на борт плюс самый высокий выступ рельефа: выпуклый узор не должен
 * протыкать скорлупу. Снизу — плоское дно толщиной в борт, на нём форма и
 * стоит; сверху — плоский торец по венчику. Увеличена на усадку.
 */
export function buildSlumpShell(params: BuildParams, shellMm: number, shrinkPct: number): SurfaceMesh {
  const surface = vesselSurface(params);
  const { nu, nv, profile, heightMm } = surface;
  const inner = vesselGrid(params);

  // самый высокий выступ рельефа наружу — на столько толще скорлупа
  let outward = 0;
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i < nu; i++) {
      outward = Math.max(outward, surface.depthAt((2 * Math.PI * i) / nu, j / nv));
    }
  }
  const offset = shellMm + outward;
  const radiusAt = (v: number): number => profileRadius(profile, v);

  const positions = new Float32Array(inner.positions.length);
  let previous = -shellMm;
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    // cavityPoint с отрицательной стенкой — офсет наружу по той же нормали
    const point = cavityPoint(radiusAt, heightMm, -offset, v);
    // Дно скорлупы плоское на −борт, верх — ровно по венчику; между ними
    // высота не убывает: офсет резкого перегиба шагал бы вниз и складывал
    // поверхность саму на себя.
    const z = j === 0 ? -shellMm : j === nv ? heightMm : clamp(Math.max(point.z, previous), -shellMm, heightMm);
    previous = z;
    const r = Math.max(point.r, radiusAt(v) + offset * 0.5);
    for (let i = 0; i < nu; i++) {
      const u = (2 * Math.PI * i) / nu;
      const k = (j * nu + i) * 3;
      positions[k] = r * Math.cos(u);
      positions[k + 1] = r * Math.sin(u);
      positions[k + 2] = z;
    }
  }
  const outer: Grid = { nu, nv, positions };
  const shell = assembleHollowMesh(outer, inner.positions);
  // дно — на стол
  for (let i = 2; i < shell.positions.length; i += 3) shell.positions[i] += shellMm;
  const mesh = { ...shell, normals: meshNormals(shell.positions, shell.indices) };
  return scaleMesh(mesh, 1 + shrinkPct / 100);
}
