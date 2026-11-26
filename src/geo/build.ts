// Конвейер геометрии изделия: силуэт → сетка вращения → (M3) рельеф →
// крышки → нормали. Чистая функция параметров: тот же код крутится в главном
// потоке для превью и в воркере для экспортной детализации.

import type { SurfaceMesh } from 'maker-kit/3d/mesh';
import type { Grid } from './surface';
import type { CapSpec } from './bottom';
import { sampleGrid, assembleMesh } from './surface';
import { meshNormals } from 'maker-kit/3d/mesh';
import { gridNormals } from './normals';
import type { Params, ProfileDef } from './profiles';
import { buildProfile, profileRadius, familyById, clampFamilyParams, MIN_RADIUS_MM } from './profiles';
import type { ReliefState } from './relief';
import { defaultRelief, reliefDepth } from './relief';
import type { RouletteState } from './roulette';
import { defaultRoulette, makeRoulette } from './roulette';
import type { MarkInput } from './mark';
import { markCap, markStepMm } from './mark';
import type { SpoutState } from './spout';
import { defaultSpout, makeSpout } from './spout';
import type { ConcaveLayout, ConcaveState } from './concave';
import { concaveLayout } from './concave';
import type { Decal } from './decal';
import { decalField } from './decal';

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
  spout: SpoutState;
  /** вогнутое дно; нет поля — дно плоское */
  concave?: ConcaveState;
  /** клеймо на донышке; растр строки приходит из главного потока */
  mark?: MarkInput;
  /**
   * Надписи на боку. Тела их строит воркер (`geo/decalSolid.ts`); сетка
   * тела под ними держит рельеф ровным, а с `decalProxy` ещё и рисует их
   * грубым оттиском.
   */
  decals?: Decal[];
  /** главный поток: показать надписи оттиском по сетке, пока воркер считает тела */
  decalProxy?: boolean;
  /** экспорт: тела надписей мелким шагом */
  decalFine?: boolean;
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
    spout: defaultSpout(),
  };
}

const clampInt = (x: number, lo: number, hi: number): number => (Number.isFinite(x) ? Math.min(hi, Math.max(lo, Math.round(x))) : lo);

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
  /** вытяг носика наружу по радиусу, мм — поверх смещения по нормали */
  pullAt(u: number, v: number): number;
}

/** Высота изделия, как её понимает сборка. */
function heightOf(p: BuildParams): number {
  return Number.isFinite(p.heightMm) ? Math.max(1, p.heightMm) : 100;
}

export function vesselSurface(p: BuildParams): VesselSurface {
  const nu = clampInt(p.nu, NU_MIN, NU_MAX);
  const nv = clampInt(p.nv, NV_MIN, NV_MAX);
  const heightMm = heightOf(p);
  const profile = buildProfile(p.family, p.shape, heightMm);

  const relief = p.relief ?? defaultRelief();
  const roulette = p.roulette ?? defaultRoulette();
  const roll = makeRoulette(roulette, {
    heightMm,
    // шаг накатки колесо «видит» на той окружности, по которой катится,
    // и у каждой полосы она своя
    radiusAt: (v) => profileRadius(profile, v),
  });
  const flat = !relief.wave.on && !roulette.bands.some((band) => band.on);
  const pull = makeSpout(p.spout ?? defaultSpout());
  const decals = p.decals && p.decals.length > 0 ? decalField(p.decals, profile, heightMm) : null;
  const proxy = decals && p.decalProxy ? decals.proxy : null;

  const reliefAt = (u: number, v: number): number => {
    if (flat) return 0;
    const depth = (reliefDepth(relief, u, v) + roll(u, v)) * smoothstep(v / BASE_GUARD);
    // под надписью рельеф ровный: множитель — только когда надписи есть
    return decals ? depth * decals.calm(u, v) : depth;
  };

  return {
    profile,
    heightMm,
    nu,
    nv,
    depthAt: proxy ? (u, v) => reliefAt(u, v) + proxy(u, v) : reliefAt,
    pullAt: pull,
  };
}

export interface GridOptions {
  /**
   * Нижняя граница смещения внутрь. Полому изделию этого хватает, чтобы
   * гарантировать стенку: полость — эквидистанта силуэта на wallMm, а рельеф
   * уводит поверхность внутрь ровно на |depth|, поэтому остаток стенки равен
   * wallMm + depth и не зависит от того, как соотносятся ряды сеток.
   */
  minDepthMm?: number;
  /**
   * Доля высоты, на которой сетка обрывается. Нужна скруглённой кромке: под
   * неё стенку обрезают чуть ниже венчика, а остаток добирает дуга. Силуэт и
   * рельеф считаются по НАСТОЯЩЕЙ доле высоты, поэтому узор не съезжает —
   * изделие просто короче на радиус кромки.
   */
  vMax?: number;
}

/**
 * Сетка тела вращения. Ось — z, дно в z = 0, обход u против часовой стрелки
 * (нормали наружу). Рельеф и накатка смещают узлы вдоль нормали силуэта.
 */
export function vesselGrid(p: BuildParams, options: GridOptions = {}): Grid {
  const surface = vesselSurface(p);
  const { nu, nv, profile, heightMm } = surface;
  const minDepthMm = options.minDepthMm ?? -Infinity;
  const vMax = clampUnit(options.vMax ?? 1);
  const vAt = (j: number): number => (j / nv) * vMax;

  const grid = sampleGrid(nu, nv, (u, v, out) => {
    const height = v * vMax;
    const r = Math.max(MIN_RADIUS_MM, profileRadius(profile, height));
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = height * heightMm;
  });

  // Смещаем по нормалям исходного силуэта, а не пересчитываем их по ходу:
  // иначе рельеф съезжал бы сам от себя и волна переставала быть волной.
  const normals = gridNormals(grid);
  const positions = grid.positions;
  for (let j = 0; j <= nv; j++) {
    const v = vAt(j);
    for (let i = 0; i < nu; i++) {
      const u = (TAU * i) / nu;
      const depth = Math.max(surface.depthAt(u, v), minDepthMm);
      const pull = surface.pullAt(u, v);
      if (depth === 0 && pull === 0) continue;
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
      // Носик добавляет материал наружу по радиусу — уже после рельефа,
      // потому что это оттяжка края, а не узор на нём.
      if (pull !== 0) {
        const radius = Math.hypot(x, y);
        const scale = (radius + pull) / Math.max(radius, 1e-9);
        x *= scale;
        y *= scale;
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

function clampUnit(x: number): number {
  return Number.isFinite(x) ? Math.min(1, Math.max(0.05, x)) : 1;
}

/** Замкнутый солид изделия: боковая поверхность + дно + верх. */
export function buildVessel(p: BuildParams): SurfaceMesh {
  const grid = vesselGrid(p);
  const mesh = assembleMesh(grid, 'both', vesselBottom(p, grid));
  return { ...mesh, normals: meshNormals(mesh.positions, mesh.indices) };
}

/**
 * Радиус плоского дна — по нижнему кольцу сетки: рельеф у дна гаснет
 * (BASE_GUARD), и кольцо — это ровно край плоского дна.
 */
function bottomRadius(grid: Grid): number {
  let flat = Infinity;
  for (let i = 0; i < grid.nu; i++) flat = Math.min(flat, gridRadiusAt(grid, i, 0));
  return flat;
}

/** Вогнутое дно изделия на его сетке; null — дно плоское. */
export function vesselConcave(p: BuildParams, grid: Grid): ConcaveLayout | null {
  return p.concave ? concaveLayout(p.concave, bottomRadius(grid), heightOf(p)) : null;
}

/**
 * Наружное дно изделия своей сеткой, если на нём клеймо или вогнутость;
 * иначе undefined — веер. Клеймо на вогнутом дне — только в утопленном
 * круге (у сферы это всё дно): на ступеньке и поясе его нет.
 * `maxDepthMm` — сколько дно может отдать оттиску (у полого — толщина дна
 * минус минимальная стенка).
 */
export function vesselBottom(p: BuildParams, grid: Grid, maxDepthMm = Infinity): CapSpec | undefined {
  const flat = bottomRadius(grid);
  const concave = vesselConcave(p, grid);
  const mark = markCap(p.mark, concave ? concave.markMm : flat, markStepMm(grid.nu), maxDepthMm);
  if (!concave) return mark;
  const depth = mark?.heightAt;
  if (!mark || !depth) return { ...mark, section: concave.section };
  const edge = concave.markMm;
  return { ...mark, section: concave.section, heightAt: (x, y) => (Math.hypot(x, y) <= edge ? depth(x, y) : 0) };
}

/** Радиус узла сетки (i, j) — удобно тестам и анализатору поднутрений. */
export function gridRadiusAt(grid: Grid, i: number, j: number): number {
  const k = (j * grid.nu + i) * 3;
  return Math.hypot(grid.positions[k], grid.positions[k + 1]);
}
