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
import type { LathePoint } from './lathe';
import { lathe } from './lathe';

/** Точек выборки офсета: столько же, сколько рядов у превью, с запасом. */
const INSET_SAMPLES = 256;
/** Точек готового силуэта: сплайн по ним неотличим от выборки. */
const INSET_POINTS = 96;

export interface InsetProfile {
  profile: ProfileDef;
  /** высота внутренней поверхности: от пола до венчика */
  heightMm: number;
}

/** Лапок у пуансона: три точки опоры не качаются и центрируют без переопределения. */
export const PUNCH_LEGS = 3;
/** Радиальная толщина лапки, мм. */
export const PUNCH_LEG_MM = 8;
/** Ширина лапки по дуге, мм; квантуется шагом сетки по углу. */
export const PUNCH_LEG_WIDTH_MM = 14;
/** Зазор между лапками и матрицей, мм: скользящая посадка FDM. */
export const PUNCH_CLEARANCE_MM = 0.3;
/** Диаметр отдушины по оси пуансона, мм. */
export const PUNCH_VENT_MM = 3;
/** Тоньше фланец не делаем: лапки на нём гуляют. */
const PUNCH_FLANGE_MIN_MM = 3;
/**
 * Радиальный шажок между точкой фланца без рельефа и первой точкой лапки.
 * При нулевом lathe схлопнул бы их в одну (compact сравнивает только r и z),
 * а вне секторов грань сложилась бы в полосу нулевой ширины.
 */
const PUNCH_STEP_MM = 0.3;
/** Сегментов дуги, огибающей кромку матрицы. */
const PUNCH_ARC_STEPS = 6;

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

/**
 * Толщина пласта — она же стенка изделия — с тем зажимом, который держат обе
 * детали отминки: горб и пуансон. Один на двоих, иначе лапки пуансона
 * встанут на одну глубину, а рабочая поверхность отодвинется на другую.
 */
export function slabThickness(wallMm: number, heightMm: number): number {
  return clamp(wallMm, WALL_MIN_MM, Math.min(WALL_MAX_MM, heightMm * 0.4));
}

interface Offset {
  /** точки офсета снизу вверх; первая — уже на полу или выше */
  samples: { r: number; z: number }[];
  /** радиус, на котором офсет пересекает пол (линейно между выборками) */
  floorR: number;
}

/**
 * Офсет силуэта внутрь по нормали на `wall` — та же `cavityPoint`, что строит
 * полость, и с теми же ограничениями: не ниже пола, не ниже предыдущей точки
 * (офсет резкого плеча шагает вниз) и не выше `zMax`.
 */
function offsetSamples(
  radiusAt: (v: number) => number,
  heightMm: number,
  wall: number,
  floorZ: number,
  zMax: number,
): Offset {
  const samples: { r: number; z: number }[] = [];
  let previous = floorZ;
  let below: { r: number; z: number } | null = null;
  let floorR = NaN;
  for (let i = 0; i <= INSET_SAMPLES; i++) {
    const point = cavityPoint(radiusAt, heightMm, wall, i / INSET_SAMPLES);
    const z = Math.min(Math.max(point.z, floorZ, previous), zMax);
    previous = z;
    // ниже пола точка офсета лежит под ним — её место занимает пол
    if (point.z < floorZ) {
      below = point;
      continue;
    }
    if (samples.length === 0) {
      const t = below && point.z > below.z ? (floorZ - below.z) / (point.z - below.z) : 1;
      floorR = below ? below.r + (point.r - below.r) * t : point.r;
    }
    samples.push({ r: Math.max(MIN_RADIUS_MM, point.r), z });
  }
  return { samples, floorR: Math.max(MIN_RADIUS_MM, Number.isFinite(floorR) ? floorR : MIN_RADIUS_MM) };
}

/**
 * Силуэт, отодвинутый внутрь по нормали на `wallMm`, — поверхность полости
 * изделия с полом на высоте стенки (пласт одинаковой толщины везде, и на
 * дне тоже). Офсет — `offsetSamples` с потолком по венчику. После
 * ограничений высота монотонна, и r(z) пересэмплируется по равномерной сетке
 * высот.
 */
export function insetProfile(profile: ProfileDef, heightMm: number, wallMm: number): InsetProfile {
  const wall = slabThickness(wallMm, heightMm);
  const radiusAt = (v: number): number => profileRadius(profile, v);
  const floorZ = wall;
  const { samples } = offsetSamples(radiusAt, heightMm, wall, floorZ, heightMm);

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
 * Мера матрицы, от которой строится пуансон, — до усадки, в координатах
 * матрицы (дно на столе, z = 0). Пуансон её не пересчитывает по силуэту:
 * иначе лапки рано или поздно разъехались бы с матрицей.
 */
export interface SlumpFit {
  /** радиус кромки матрицы = наружный радиус изделия у венчика, мм */
  rimMm: number;
  /** высота кромки над столом = высота изделия + борт, мм */
  rimZ: number;
  /** самое широкое наружное кольцо матрицы (после fillWaists), мм */
  outerMaxMm: number;
}

export interface SlumpShell {
  /** матрица в печатном положении, увеличенная на усадку */
  mesh: SurfaceMesh;
  fit: SlumpFit;
}

/**
 * Углублённая форма скорлупой. Внутри — наружная поверхность изделия с
 * рельефом (её и касается пласт), снаружи — гладкий силуэт, отодвинутый по
 * нормали на борт плюс самый высокий выступ рельефа: выпуклый узор не должен
 * протыкать скорлупу. Снизу — плоское дно толщиной в борт, на нём форма и
 * стоит; сверху — плоский торец по венчику. Увеличена на усадку.
 */
export function buildSlumpShell(params: BuildParams, shellMm: number, shrinkPct: number): SlumpShell {
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
  const rings: { r: number; z: number }[] = [];
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
    rings.push({ z, r: Math.max(point.r, radiusAt(v) + offset * 0.5) });
  }
  // Снаружи перехваты силуэта снизу не повторяем: ножка миски дала бы форме
  // цоколь с выемкой, и форма стояла бы на нём, а не на своей стенке. Ниже
  // самого широкого места наружный силуэт заменяем вогнутой огибающей —
  // впадины перекрываются прямой стенкой от тулова к основанию, а выпуклые
  // бока остаются как есть. Внутри ничего не меняется: там изделие.
  fillWaists(rings);
  spreadDuplicates(rings);
  for (let j = 0; j <= nv; j++) {
    const { r, z } = rings[j];
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
  return {
    mesh: scaleMesh(mesh, 1 + shrinkPct / 100),
    fit: {
      rimMm: radiusAt(1),
      rimZ: heightMm + shellMm,
      outerMaxMm: rings.reduce((max, ring) => Math.max(max, ring.r), 0),
    },
  };
}

/**
 * Наименьшая вогнутая мажоранта r(z) ниже самого широкого кольца: верхняя
 * оболочка точек (z, r) методом монотонной цепи, кольца поднимаются до неё.
 */
function fillWaists(rings: { r: number; z: number }[]): void {
  let widest = 0;
  for (let j = 1; j < rings.length; j++) if (rings[j].r >= rings[widest].r) widest = j;
  const hull: { r: number; z: number }[] = [];
  for (let j = 0; j <= widest; j++) {
    const p = rings[j];
    while (hull.length >= 2) {
      const a = hull[hull.length - 2];
      const b = hull[hull.length - 1];
      // b лежит не выше хорды a→p — для верхней оболочки он лишний
      const cross = (b.z - a.z) * (p.r - a.r) - (b.r - a.r) * (p.z - a.z);
      if (cross >= 0) hull.pop();
      else break;
    }
    hull.push(p);
  }
  for (let j = 0; j <= widest; j++) {
    const { z } = rings[j];
    let k = 0;
    while (k < hull.length - 2 && hull[k + 1].z < z) k++;
    const a = hull[k];
    const b = hull[Math.min(k + 1, hull.length - 1)];
    const t = b.z > a.z ? clamp((z - a.z) / (b.z - a.z), 0, 1) : 1;
    rings[j] = { z, r: Math.max(rings[j].r, a.r + (b.r - a.r) * t) };
  }
}

/**
 * Кольца, совпавшие после подъёма (те же r и z), разносятся по отрезку до
 * следующего отличного кольца — иначе между ними легли бы вырожденные грани.
 */
function spreadDuplicates(rings: { r: number; z: number }[]): void {
  const same = (p: { r: number; z: number }, q: { r: number; z: number }): boolean =>
    Math.abs(p.r - q.r) < 1e-6 && Math.abs(p.z - q.z) < 1e-6;
  for (let a = 0; a < rings.length - 1; a++) {
    let b = a + 1;
    while (b < rings.length && same(rings[a], rings[b])) b++;
    if (b === a + 1 || b >= rings.length) continue;
    const from = rings[a];
    const to = rings[b];
    for (let k = a + 1; k < b; k++) {
      const t = (k - a) / (b - a);
      rings[k] = { r: from.r + (to.r - from.r) * t, z: from.z + (to.z - from.z) * t };
    }
    a = b - 1;
  }
}

/**
 * Внутренняя геометрия пуансона — то, что нужно и сборке, и тестам: радиусы
 * лапок и фланца, толщины, секторы лапок. Всё до усадки, в координатах
 * матрицы.
 */
export interface PunchLayout {
  /** толщина пласта: зазор между пуансоном и матрицей */
  slabMm: number;
  /** внутренняя (центрирующая) грань лапок */
  legInnerMm: number;
  /** наружный радиус фланца и лапок */
  flangeMm: number;
  /** толщина фланца */
  flangeT: number;
  /** низ фланца над столом = кромка матрицы + пласт; это и длина лапки */
  flangeZ: number;
  /** полуширина лапки по углу, рад */
  legHalfAngle: number;
}

export function punchLayout(params: BuildParams, hollow: HollowState, shellMm: number, fit: SlumpFit): PunchLayout {
  const { heightMm } = vesselSurface(params);
  const legInnerMm = fit.outerMaxMm + PUNCH_CLEARANCE_MM;
  return {
    slabMm: slabThickness(hollow.wallMm, heightMm),
    legInnerMm,
    flangeMm: legInnerMm + PUNCH_LEG_MM,
    flangeT: Math.max(shellMm, PUNCH_FLANGE_MIN_MM),
    flangeZ: fit.rimZ + slabThickness(hollow.wallMm, heightMm),
    legHalfAngle: PUNCH_LEG_WIDTH_MM / 2 / legInnerMm,
  };
}

/** Угловое расстояние до центра ближайшей лапки; лапка 0 — на −y. */
export function legDistance(u: number): number {
  const pitch = (2 * Math.PI) / PUNCH_LEGS;
  const t = (((u + Math.PI / 2) % pitch) + pitch) % pitch;
  return Math.min(t, pitch - t);
}

/**
 * Офсет ломаной внутрь материала (влево по ходу снизу вверх) на `d`, с теми
 * же ограничениями, что у полости: не ниже пола (под ним точка отбрасывается,
 * а пересечение с полом интерполируется), не ниже предыдущей и не выше
 * `zMax` (на нём ломаная обрывается).
 */
function offsetPolyline(
  points: readonly { r: number; z: number }[],
  d: number,
  floorZ: number,
  zMax: number,
): { r: number; z: number }[] {
  const out: { r: number; z: number }[] = [];
  let previous = floorZ;
  let below: { r: number; z: number } | null = null;
  for (let k = 0; k < points.length; k++) {
    const a = points[Math.max(0, k - 1)];
    const b = points[Math.min(points.length - 1, k + 1)];
    const dr = b.r - a.r;
    const dz = b.z - a.z;
    const len = Math.hypot(dr, dz) || 1;
    // наружная нормаль ломаной, идущей вверх с материалом слева: (dz, −dr)
    const raw = { r: points[k].r - (d * dz) / len, z: points[k].z + (d * dr) / len };
    if (raw.z < floorZ) {
      below = raw;
      continue;
    }
    if (out.length === 0 && below) {
      const t = (floorZ - below.z) / (raw.z - below.z);
      out.push({ r: below.r + (raw.r - below.r) * t, z: floorZ });
    }
    const z = Math.max(raw.z, previous);
    if (z >= zMax) {
      const last = out[out.length - 1] ?? raw;
      const t = z > last.z ? (zMax - last.z) / (z - last.z) : 1;
      out.push({ r: last.r + (raw.r - last.r) * t, z: zMax });
      return out;
    }
    previous = z;
    out.push({ r: raw.r, z });
  }
  return out;
}

/**
 * Пуансон к углублённой отминке: входит в матрицу сверху и прижимает пласт к
 * её рабочей поверхности так, что между ними везде ровно толщина пласта.
 *
 * Рабочая поверхность — внутренняя поверхность изделия (силуэт, отодвинутый
 * внутрь на пласт), гладкая: рельеф в этом режиме лежит на матрице. Над
 * кромкой матрицы — плоский фланец, висящий над ней на пласт; с фланца
 * снаружи матрицы спускаются три лапки до стола. Внутренние грани лапок
 * обнимают самое широкое кольцо матрицы с зазором — центрируют; длина лапок
 * задаёт глубину — толщину пласта.
 *
 * Всё — одно тело вращения (lathe), и лапки тоже: точки низа фланца на их
 * радиусах несут «рельеф» вниз, и depthAt в секторах лапок опускает их до
 * стола — тем же механизмом, что кладёт рельеф на купол крышки. Пуансон полый,
 * скорлупой в борт, и с отдушиной по оси — контур оси не касается, тело —
 * тор. Печатается фланцем на стол; увеличен на усадку, как и матрица.
 */
export function buildPunch(
  params: BuildParams,
  hollow: HollowState,
  shellMm: number,
  shrinkPct: number,
  fit: SlumpFit,
): SurfaceMesh {
  const { profile, heightMm, nu } = vesselSurface(params);
  const layout = punchLayout(params, hollow, shellMm, fit);
  const { slabMm, legInnerMm, flangeMm, flangeZ, legHalfAngle } = layout;
  const flangeTop = flangeZ + layout.flangeT;
  const radiusAt = (v: number): number => profileRadius(profile, v);
  const vent = PUNCH_VENT_MM / 2;

  // Рабочая поверхность в координатах изделия, без потолка по венчику: у
  // отогнутого края её конец выше кромки, и оттуда идёт дуга вокруг кромки.
  const work = offsetSamples(radiusAt, heightMm, slabMm, slabMm, Infinity);
  const lift = (p: { r: number; z: number }): { r: number; z: number } => ({ r: p.r, z: p.z + shellMm });
  const surface = [{ r: work.floorR, z: slabMm }, ...work.samples].map(lift);
  const floorZ = shellMm + slabMm;

  // Дуга радиусом в пласт вокруг кромки матрицы: честный офсет угла
  // «стенка–венчик», глина в углу той же толщины, что везде.
  const top = surface[surface.length - 1];
  const from = Math.atan2(top.z - fit.rimZ, top.r - fit.rimMm);
  const arc: { r: number; z: number }[] = [];
  const to = Math.PI / 2;
  for (let k = 1; k <= PUNCH_ARC_STEPS; k++) {
    const a = from + ((to - from) * k) / PUNCH_ARC_STEPS;
    arc.push({ r: fit.rimMm + slabMm * Math.cos(a), z: fit.rimZ + slabMm * Math.sin(a) });
  }
  arc[arc.length - 1] = { r: fit.rimMm, z: flangeZ };

  // Внутренняя скорлупа — офсет рабочей поверхности ещё на борт, до кромки;
  // выше неё — вертикаль до верха фланца.
  const inner = offsetPolyline(surface, shellMm, floorZ + shellMm, fit.rimZ);
  const shellTop = inner[inner.length - 1];

  const leg = { v: 0, nr: 0, nz: -1 };
  const contour: LathePoint[] = [
    // отдушина снизу и пол рабочей поверхности
    { r: vent, z: floorZ },
    ...surface,
    ...arc,
    // низ фланца; на радиусах лапок он опускается в секторах до стола
    { r: legInnerMm - PUNCH_STEP_MM, z: flangeZ },
    { r: legInnerMm, z: flangeZ, relief: leg },
    { r: flangeMm, z: flangeZ, relief: leg },
    // торец фланца — он же наружная грань лапки
    { r: flangeMm, z: flangeTop },
    { r: shellTop.r, z: flangeTop },
    // внутренняя скорлупа сверху вниз, пол скорлупы и отдушина
    ...[...inner].reverse(),
    { r: vent, z: floorZ + shellMm },
  ];
  // Лапка опускает те вершины кольца, чья ячейка сетки по углу задевает её
  // сектор, но не меньше одного шага с каждой стороны от центра: одна
  // опущенная вершина дала бы иглу с подошвой в линию.
  const step = (2 * Math.PI) / nu;
  const reach = Math.max(legHalfAngle + step / 2, step * 1.01);
  const depthAt = (u: number): number => (legDistance(u) <= reach ? flangeZ : 0);
  const raw = lathe(contour, nu, depthAt);
  const mesh = { ...raw, normals: meshNormals(raw.positions, raw.indices) };
  return mirrorZ(scaleMesh(mesh, 1 + shrinkPct / 100));
}
