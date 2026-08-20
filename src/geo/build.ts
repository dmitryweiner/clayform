// Конвейер геометрии изделия: силуэт → сетка вращения → (M3) рельеф →
// крышки → нормали. Чистая функция параметров: тот же код крутится в главном
// потоке для превью и в воркере для экспортной детализации.

import type { Grid, SurfaceMesh } from './surface';
import { sampleGrid, assembleMesh } from './surface';
import { meshNormals, gridNormals } from './normals';
import type { Params, ProfileDef } from './profiles';
import { buildProfile, profileRadius, familyById, clampFamilyParams, MIN_RADIUS_MM } from './profiles';
import type { ReliefState } from './relief';
import { defaultRelief, reliefDepth } from './relief';
import type { RouletteState } from './roulette';
import { defaultRoulette, makeRoulette } from './roulette';

export interface BuildParams {
  /** идентификатор семейства: pot | bowl | cup | vase */
  family: string;
  /** параметры семейства, в миллиметрах и долях */
  shape: Params;
  heightMm: number;
  /** сегментов по окружности */
  nu: number;
  /** сегментов по высоте */
  nv: number;
  relief: ReliefState;
  roulette: RouletteState;
}

const NU_MIN = 8;
const NU_MAX = 1024;
const NV_MIN = 4;
const NV_MAX = 1024;
const TAU = Math.PI * 2;

/**
 * Доля высоты, на которой рельеф набирает силу от дна. Кольцо j = 0 обязано
 * остаться нетронутым: из него строится плоская крышка дна, и смещённое
 * кольцо означало бы, что изделие не встаёт на стол принтера.
 */
const BASE_GUARD = 0.03;

export function defaultBuildParams(): BuildParams {
  const family = familyById('pot');
  return {
    family: family.id,
    shape: clampFamilyParams(family.id, {}),
    heightMm: family.defaultHeightMm,
    nu: 192,
    nv: 192,
    relief: defaultRelief(),
    roulette: defaultRoulette(),
  };
}

const clampInt = (x: number, lo: number, hi: number): number =>
  Number.isFinite(x) ? Math.min(hi, Math.max(lo, Math.round(x))) : lo;

/** Разобранное на части описание поверхности изделия. */
export interface VesselSurface {
  profile: ProfileDef;
  heightMm: number;
  nu: number;
  nv: number;
  /**
   * Суммарное смещение рельефа и накатки вдоль нормали, мм, уже с гашением
   * у дна. Отдаётся наружу, потому что построению полости нужно знать, на
   * сколько рельеф уходит внутрь: глубже стенки его пускать нельзя.
   */
  depthAt(u: number, v: number): number;
}

export function vesselSurface(p: BuildParams): VesselSurface {
  const nu = clampInt(p.nu, NU_MIN, NU_MAX);
  const nv = clampInt(p.nv, NV_MIN, NV_MAX);
  const heightMm = Number.isFinite(p.heightMm) ? Math.max(1, p.heightMm) : 100;
  const profile = buildProfile(p.family, p.shape, heightMm);

  const relief = p.relief ?? defaultRelief();
  const roulette = p.roulette ?? defaultRoulette();
  const roll = makeRoulette(roulette, {
    heightMm,
    // шаг накатки колесо «видит» на той окружности, по которой катится
    bandRadiusMm: profileRadius(profile, roulette.bandCenter),
  });
  const flat = !relief.wave.on && !roulette.on;

  return {
    profile,
    heightMm,
    nu,
    nv,
    depthAt(u, v) {
      if (flat) return 0;
      return (reliefDepth(relief, u, v) + roll(u, v)) * smoothstep(v / BASE_GUARD);
    },
  };
}

/**
 * Сетка тела вращения. Ось — z, дно в z = 0, обход u против часовой стрелки
 * (нормали наружу). Рельеф и накатка смещают узлы вдоль нормали силуэта.
 *
 * `minDepthMm` ограничивает смещение внутрь. Полому изделию этого хватает,
 * чтобы гарантировать стенку: полость — эквидистанта силуэта на wallMm, а
 * рельеф уводит поверхность внутрь ровно на |depth|, поэтому остаток стенки
 * равен wallMm + depth и не зависит от того, как соотносятся ряды сеток.
 */
export function vesselGrid(p: BuildParams, minDepthMm = -Infinity): Grid {
  const surface = vesselSurface(p);
  const { nu, nv, profile, heightMm } = surface;

  const grid = sampleGrid(nu, nv, (u, v, out) => {
    const r = Math.max(MIN_RADIUS_MM, profileRadius(profile, v));
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = v * heightMm;
  });

  // Смещаем по нормалям исходного силуэта, а не пересчитываем их по ходу:
  // иначе рельеф съезжал бы сам от себя и волна переставала быть волной.
  const normals = gridNormals(grid);
  const positions = grid.positions;
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i < nu; i++) {
      const u = (TAU * i) / nu;
      const depth = Math.max(surface.depthAt(u, v), minDepthMm);
      if (depth === 0) continue;
      const k = (j * nu + i) * 3;
      let x = positions[k] + normals[k] * depth;
      let y = positions[k + 1] + normals[k + 1] * depth;
      const z = positions[k + 2] + normals[k + 2] * depth;
      // глубокая волна внутрь не должна проткнуть ось: за ней поверхность
      // вывернулась бы наизнанку и меш перестал быть манифолдом
      const r = Math.hypot(x, y);
      if (r < MIN_RADIUS_MM) {
        const scale = r > 1e-9 ? MIN_RADIUS_MM / r : 0;
        x = r > 1e-9 ? x * scale : MIN_RADIUS_MM * Math.cos(u);
        y = r > 1e-9 ? y * scale : MIN_RADIUS_MM * Math.sin(u);
      }
      positions[k] = x;
      positions[k + 1] = y;
      positions[k + 2] = z;
    }
  }
  return grid;
}

function smoothstep(x: number): number {
  const q = Math.min(1, Math.max(0, x));
  return q * q * (3 - 2 * q);
}

/** Замкнутый солид изделия: боковая поверхность + дно + верх. */
export function buildVessel(p: BuildParams): SurfaceMesh {
  const mesh = assembleMesh(vesselGrid(p), 'both');
  return { ...mesh, normals: meshNormals(mesh.positions, mesh.indices) };
}

/** Радиус узла сетки (i, j) — удобно тестам и анализатору поднутрений. */
export function gridRadiusAt(grid: Grid, i: number, j: number): number {
  const k = (j * grid.nu + i) * 3;
  return Math.hypot(grid.positions[k], grid.positions[k + 1]);
}
