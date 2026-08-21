// Полое изделие для прямой печати глиной: внешняя поверхность с рельефом,
// внутри — гладкая полость с плоским полом.
//
// Полость строится офсетом ГЛАДКОГО силуэта по нормали, а не офсетом уже
// смещённой рельефом поверхности. Две причины:
//
//  1. Нормаль, а не радиус. У миски стенка идёт под 30–40° к столу; сдвиг
//     внутрь по радиусу на 3 мм дал бы реальную толщину около 1,5 мм.
//  2. Гладкий силуэт, а не рельефный. Изнутри посуда всегда гладкая — и у
//     гончара, и при шликерном литье. Заодно офсет вогнутых канавок рельефа
//     сам себя не заворачивает.

import type { Grid, SurfaceMesh } from './surface';
import { assembleHollowMesh, assembleMesh } from './surface';
import { meshNormals } from './normals';
import { signedVolume } from './validate';
import type { BuildParams } from './build';
import { vesselGrid, vesselSurface } from './build';
import { profileRadius } from './profiles';

export interface HollowState {
  /** толщина стенки по нормали, мм */
  wallMm: number;
  /** толщина дна, мм */
  baseMm: number;
  /**
   * Радиус заглаженного венчика, мм. Сырой край получается плоским срезом,
   * а гончар его заглаживает: стенку обрезают на радиус ниже, а верх
   * добирает дуга. Больше половины стенки радиус быть не может — это уже
   * было бы поднутрение.
   */
  rimRadiusMm: number;
}

export interface HollowResult {
  mesh: SurfaceMesh;
  /** поверхность полости той же раскладки, что и внешняя сетка */
  innerGrid: Grid;
  /** вместимость полости, мл */
  capacityMl: number;
  /**
   * Доля узлов, где стенку пришлось поджать: рельеф ушёл внутрь глубже, чем
   * позволяет заданная толщина. Больше нуля — повод уменьшить глубину волны.
   */
  pinchedFraction: number;
}

export const WALL_MIN_MM = 0.8;
export const WALL_MAX_MM = 60;
export const BASE_MIN_MM = 1;
export const BASE_MAX_MM = 60;

/** Минимальный остаток стенки: тоньше глина не держится вовсе. */
const MIN_WALL_MM = 0.6;
/** Ниже этого радиуса полость считается схлопнувшейся. */
const MIN_CAVITY_MM = 0.3;
/** Дно не может съесть всё изделие. */
const MAX_BASE_FRACTION = 0.7;

export const RIM_MAX_MM = 8;
/** Колец в дуге кромки: на глаз достаточно, чтобы край читался круглым. */
const RIM_STEPS = 8;

export function defaultHollow(): HollowState {
  return { wallMm: 3, baseMm: 4, rimRadiusMm: 1.5 };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

export function sanitizeHollow(raw: unknown): HollowState {
  const fallback = defaultHollow();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;
  return {
    wallMm: clamp(num(source.wallMm, fallback.wallMm), WALL_MIN_MM, WALL_MAX_MM),
    baseMm: clamp(num(source.baseMm, fallback.baseMm), BASE_MIN_MM, BASE_MAX_MM),
    rimRadiusMm: clamp(num(source.rimRadiusMm, fallback.rimRadiusMm), 0, RIM_MAX_MM),
  };
}

/**
 * Кольца заглаженного венчика. В осевом сечении путь идёт от внешней стенки
 * четвертью круга наверх, коротким плоским участком поперёк торца и такой же
 * четвертью вниз к стенке полости. При радиусе, равном половине стенки,
 * плоский участок исчезает и край становится полукруглым; при нуле колец нет
 * вовсе и остаётся плоский срез.
 *
 * Радиус берётся по каждому углу отдельно: у наклонной стенки радиальный
 * зазор между поверхностями больше толщины, и общий радиус загнал бы дугу
 * в стенку.
 */
function rimRings(
  outer: Grid,
  inner: Float32Array,
  nu: number,
  nv: number,
  rimR: number,
): Float32Array[] {
  if (rimR < 1e-6) return [];
  const rings: Float32Array[] = [];
  for (let m = 1; m < RIM_STEPS; m++) rings.push(new Float32Array(nu * 3));

  const top = nv * nu;
  for (let i = 0; i < nu; i++) {
    const k = (top + i) * 3;
    const ro = Math.hypot(outer.positions[k], outer.positions[k + 1]);
    const zo = outer.positions[k + 2];
    const ri = Math.hypot(inner[k], inner[k + 1]);
    const zi = inner[k + 2];
    const cos = ro > 1e-9 ? outer.positions[k] / ro : 1;
    const sin = ro > 1e-9 ? outer.positions[k + 1] / ro : 0;

    const gap = ro - ri;
    const radius = Math.min(rimR, gap / 2);
    const arc = (radius * Math.PI) / 2;
    const flat = Math.hypot(gap - 2 * radius, zo - zi);
    const total = 2 * arc + flat;

    for (let m = 1; m < RIM_STEPS; m++) {
      const s = (total * m) / RIM_STEPS;
      let r: number;
      let z: number;
      if (s < arc) {
        const a = s / Math.max(radius, 1e-9);
        r = ro - radius + radius * Math.cos(a);
        z = zo + radius * Math.sin(a);
      } else if (s < arc + flat) {
        const t = flat > 1e-9 ? (s - arc) / flat : 0;
        r = (ro - radius) + t * ((ri + radius) - (ro - radius));
        z = (zo + radius) + t * ((zi + radius) - (zo + radius));
      } else {
        const a = Math.PI / 2 + (s - arc - flat) / Math.max(radius, 1e-9);
        r = ri + radius + radius * Math.cos(a);
        z = zi + radius * Math.sin(a);
      }
      const ring = rings[m - 1];
      ring[i * 3] = r * cos;
      ring[i * 3 + 1] = r * sin;
      ring[i * 3 + 2] = z;
    }
  }
  return rings;
}

/** Точка гладкого силуэта, отодвинутая внутрь на wallMm по нормали. */
function offsetPoint(
  radiusAt: (v: number) => number,
  heightMm: number,
  wallMm: number,
  v: number,
): { r: number; z: number } {
  const h = 1e-4;
  const lo = Math.max(0, v - h);
  const hi = Math.min(1, v + h);
  const drdv = (radiusAt(hi) - radiusAt(lo)) / Math.max(1e-9, hi - lo);
  const dzdv = heightMm;
  const len = Math.hypot(drdv, dzdv);
  // внешняя нормаль в осевом сечении: (dz, −dr) / |…|
  const nr = dzdv / len;
  const nz = -drdv / len;
  return { r: radiusAt(v) - wallMm * nr, z: v * heightMm - wallMm * nz };
}

/** Доля высоты, на которой офсет силуэта поднимается до уровня пола. */
function floorParam(
  radiusAt: (v: number) => number,
  heightMm: number,
  wallMm: number,
  floorZ: number,
): number {
  if (offsetPoint(radiusAt, heightMm, wallMm, 0).z >= floorZ) return 0;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 48; i++) {
    const mid = (lo + hi) / 2;
    if (offsetPoint(radiusAt, heightMm, wallMm, mid).z < floorZ) lo = mid;
    else hi = mid;
  }
  return hi;
}

export function buildHollowVessel(p: BuildParams, hollow: HollowState): HollowResult {
  const wallMm = clamp(hollow.wallMm, WALL_MIN_MM, WALL_MAX_MM);
  // Рельефу внутрь оставляем ровно столько, чтобы стенка не истончилась
  // ниже MIN_WALL_MM: остаток стенки = wallMm + depth, потому что полость —
  // эквидистанта того же силуэта.
  const depthFloorMm = -(wallMm - MIN_WALL_MM);

  const surface = vesselSurface(p);
  const { nu, nv, profile, heightMm } = surface;
  const radiusAt = (v: number): number => profileRadius(profile, v);

  // Под заглаженный венчик стенку обрезаем на радиус кромки ниже: остаток
  // добирает дуга, и полная высота изделия остаётся ровно заданной.
  const rimR = Math.min(hollow.rimRadiusMm, wallMm / 2);
  const zTop = heightMm - rimR;
  const vTop = zTop / heightMm;
  const outer = vesselGrid(p, { minDepthMm: depthFloorMm, vMax: vTop });

  const floorZ = Math.min(hollow.baseMm, zTop * MAX_BASE_FRACTION);
  const vFloor = floorParam(radiusAt, heightMm, wallMm, floorZ);

  const inner = new Float32Array(outer.positions.length);
  let pinched = 0;
  let previousZ = floorZ;

  for (let j = 0; j <= nv; j++) {
    // Полость параметризуется по-своему: её j = 0 — это край пола, а не низ
    // изделия. Иначе нижние ряды схлопывались бы на уровень пола в стопку
    // вырожденных треугольников.
    const v = vFloor + (vTop - vFloor) * (j / nv);
    const point = offsetPoint(radiusAt, heightMm, wallMm, v);
    // Три ограничения на высоту точки полости:
    //  — не ниже пола;
    //  — не ниже предыдущего ряда: офсет резкого плеча даёт локальный шаг
    //    вниз, и поверхность полости складывалась бы сама на себя;
    //  — не выше среза стенки: у отогнутого края внешняя нормаль смотрит
    //    вниз-наружу, офсет внутрь уводит вверх, и изделие оказывалось бы
    //    выше заданной высоты.
    const z = Math.min(Math.max(point.z, floorZ, previousZ), zTop);
    previousZ = z;

    // Офсет внутрь на wallMm всегда меньше исходного радиуса (нормаль
    // силуэта смотрит наружу), так что полость не может вылезти наружу.
    // Уйти в минус она может только при нелепо толстой стенке.
    let r = point.r;
    if (r < MIN_CAVITY_MM) r = Math.min(MIN_CAVITY_MM, radiusAt(v) * 0.5);

    for (let i = 0; i < nu; i++) {
      const k = (j * nu + i) * 3;
      const u = (2 * Math.PI * i) / nu;
      // Носик оттягивает наружу и внешнюю стенку, и полость: иначе слив
      // получался бы налитым материалом, а не желобом. Смещение одинаковое,
      // поэтому толщина стенки в носике не меняется.
      const radius = r + surface.pullAt(u, z / heightMm);
      inner[k] = radius * Math.cos(u);
      inner[k + 1] = radius * Math.sin(u);
      inner[k + 2] = z;
      if (surface.depthAt(u, v) < depthFloorMm) pinched++;
    }
  }

  const shell = assembleHollowMesh(outer, inner, rimRings(outer, inner, nu, nv, rimR));
  const cavity = assembleMesh({ nu, nv, positions: inner }, 'both');
  return {
    mesh: { ...shell, normals: meshNormals(shell.positions, shell.indices) },
    innerGrid: { nu, nv, positions: inner },
    capacityMl: signedVolume(cavity.positions, cavity.indices) / 1000,
    pinchedFraction: pinched / (nu * (nv + 1)),
  };
}
