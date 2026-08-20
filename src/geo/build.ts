// Конвейер геометрии изделия: силуэт → сетка вращения → (M3) рельеф →
// крышки → нормали. Чистая функция параметров: тот же код крутится в главном
// потоке для превью и в воркере для экспортной детализации.

import type { Grid, SurfaceMesh } from './surface';
import { sampleGrid, assembleMesh } from './surface';
import { meshNormals } from './normals';
import type { Params } from './profiles';
import { buildProfile, profileRadius, familyById, clampFamilyParams, MIN_RADIUS_MM } from './profiles';

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
}

const NU_MIN = 8;
const NU_MAX = 1024;
const NV_MIN = 4;
const NV_MAX = 1024;

export function defaultBuildParams(): BuildParams {
  const family = familyById('pot');
  return {
    family: family.id,
    shape: clampFamilyParams(family.id, {}),
    heightMm: family.defaultHeightMm,
    nu: 192,
    nv: 192,
  };
}

const clampInt = (x: number, lo: number, hi: number): number =>
  Number.isFinite(x) ? Math.min(hi, Math.max(lo, Math.round(x))) : lo;

/**
 * Сетка тела вращения. Ось — z, дно в z = 0, обход u против часовой стрелки
 * (нормали наружу). Рельеф M3 встроится здесь, между силуэтом и сборкой.
 */
export function vesselGrid(p: BuildParams): Grid {
  const nu = clampInt(p.nu, NU_MIN, NU_MAX);
  const nv = clampInt(p.nv, NV_MIN, NV_MAX);
  const heightMm = Number.isFinite(p.heightMm) ? Math.max(1, p.heightMm) : 100;
  const profile = buildProfile(p.family, p.shape, heightMm);

  return sampleGrid(nu, nv, (u, v, out) => {
    const r = Math.max(MIN_RADIUS_MM, profileRadius(profile, v));
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = v * heightMm;
  });
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
