// Отминка: углублённая форма скорлупой толщиной в борт — пласту нужна только
// поверхность, которой он касается, а не сплошной блок — и пуансон к ней.
//
// Отминка в «−»: углублённая форма, пласт вдавливают внутрь. Её рабочая
// поверхность — НАРУЖНАЯ поверхность изделия с рельефом, а снаружи скорлупы —
// гладкий силуэт, отодвинутый наружу на борт, с тремя ушками под кромкой. К
// ней — пуансон, садящийся лапками на эти ушки. Тоже без CSG.

import type { Grid, SurfaceMesh } from './surface';
import { assembleHollowMesh, mirrorZ, scaleMesh } from './surface';
import { meshNormals } from './normals';
import { profileRadius, MIN_RADIUS_MM } from './profiles';
import type { BuildParams } from './build';
import { vesselBottom, vesselGrid, vesselSurface } from './build';
import type { HollowState } from './hollow';
import { cavityPoint, WALL_MIN_MM, WALL_MAX_MM } from './hollow';
import type { LathePoint } from './lathe';
import { lathe } from './lathe';

/** Точек выборки офсета: столько же, сколько рядов у превью, с запасом. */
const INSET_SAMPLES = 256;

/** Лапок у пуансона и ушек у матрицы: три опоры не качаются и центрируют без переопределения. */
export const PUNCH_LEGS = 3;
/** Ширина лапки по дуге, мм; квантуется шагом сетки по углу. */
export const PUNCH_LEG_WIDTH_MM = 14;
/** Зазор между губой лапки и ушком, мм: скользящая посадка FDM. */
export const PUNCH_CLEARANCE_MM = 0.3;
/** На сколько верх ушка ниже кромки матрицы, мм. */
export const EAR_DROP_MM = 10;
/** Ширина площадки на ушке под лапку по умолчанию, радиально, мм (ползунок «Ушки»). */
export const EAR_SEAT_MM = 8;
/**
 * Между лапками фланец пуансона выходит за наружный край торца матрицы
 * только на столько, мм: ему там нужно лишь прижать глину на кромке.
 */
const FLANGE_OVER_RIM_MM = 2;
/** Радиальный шаг между точками фланца, сжатыми к кромке между лапками, мм. */
const FLANGE_PACK_MM = 0.2;
/**
 * Зазор между стенкой матрицы и лапкой сверх пласта, мм: свес глины за
 * кромку ложится между ними и не защемляется.
 */
const EAR_CLAY_GAP_MM = 1;
/**
 * Насколько губа лапки опускается ниже верха ушка, мм. Чем длиннее, тем
 * раньше она берётся за ушко и тем меньше пуансон перекашивает на ходу.
 */
export const PUNCH_LIP_MM = 10;
/** Радиальная толщина губы, мм. */
const PUNCH_LIP_T_MM = 4;
/** Отвесная наружная грань ушка длиннее губы на столько, мм; ниже — фаска 45°. */
const EAR_FACE_SPARE_MM = 3;
/** Ширина щеки паза по дуге, мм; не уже двух шагов сетки. */
const CHEEK_MM = 5;
/**
 * Щёки паза кончаются ниже кромки на столько, мм: свес глины ложится на них
 * свободно, фланец (он выше кромки на пласт) его не зажимает.
 */
const CHEEK_BELOW_RIM_MM = 1.5;
/**
 * Диаметр отдушин по умолчанию — в дне матрицы и по оси пуансона, мм
 * (ползунок «Отдушины»). PLA, в отличие от гипса, воду не пьёт: без отдушин
 * воздух запирается под пластом при вдавливании, а при выемке держит его
 * присосом — и к матрице, и к пуансону.
 */
export const VENT_MM = 2.5;
/**
 * Канавки на подошве матрицы: от отдушины к краю, посередине между ушками.
 * Стол закрывает отдушину снизу, и без них воздуху и лишней глине из-под
 * пласта некуда уйти. Профиль треугольный, скаты 45° — на столе принтера
 * печатается без поддержек. Ширина у стола — столько отдушин.
 */
const GROOVE_WIDTH_VENTS = 2;
/** Над вершиной канавки до пола полости — не меньше: иначе продавит. */
const GROOVE_ROOF_MM = 1.2;
/** Мельче этого канавка не канавка — тогда её нет вовсе. */
const GROOVE_MIN_MM = 0.4;
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
 * Толщина пласта — она же стенка изделия: не тоньше допустимой стенки и не
 * толще 0,4 высоты. Одна на матрицу (ушки) и пуансон, иначе лапки встанут
 * на одну глубину, а рабочая поверхность отодвинется на другую.
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
 * Мера матрицы, от которой строится пуансон, — до усадки, в координатах
 * матрицы (дно на столе, z = 0). Пуансон её не пересчитывает по силуэту:
 * иначе лапки рано или поздно разъехались бы с матрицей.
 */
export interface SlumpFit {
  /** радиус кромки матрицы = наружный радиус изделия у венчика, мм */
  rimMm: number;
  /** высота кромки над столом = высота изделия + борт, мм */
  rimZ: number;
  /** самое широкое наружное кольцо матрицы без ушек (после fillWaists), мм */
  outerMaxMm: number;
  /** наружный край торца матрицы — её верхнее наружное кольцо, мм */
  topOuterMm: number;
  /** диаметр отдушины в дне матрицы; у пуансона — такая же, мм */
  ventMm: number;
  ear: EarFit;
}

/**
 * Ушко матрицы — выступ на наружной стенке под кромкой, на него садится
 * лапка пуансона. Верх ушка — грань сетки между кольцом, вытянутым до
 * наружной грани ушка, и следующим кольцом стенки: прямая в осевом сечении,
 * чуть наклонённая наружу-вниз. Подошва лапки повторяет её, и контакт —
 * плоскость, а не ребро.
 */
export interface EarFit {
  /** наружная грань ушка и высота его верха у неё */
  outerMm: number;
  topZ: number;
  /** верх ушка у стенки: следующее кольцо матрицы */
  wallMm: number;
  wallZ: number;
  /** откуда начинается площадка лапки: стенка + пласт + зазор */
  seatInMm: number;
  /** охват лапки: у пуансона опущены вершины с legDistance ≤ legReach */
  legReach: number;
  /**
   * Охват паза: вершины в (legReach, slotReach] свободны — пустая ячейка
   * сетки между гранью лапки и гранью щеки, обе наклонены на шаг по углу.
   */
  slotReach: number;
  /** охват ушка вместе со щеками: щёки — в (slotReach, reach] */
  reach: number;
  /** верх щёк паза */
  cheekZ: number;
}

/** Высота верха ушка на радиусе r — по прямой его верхней грани. */
export function earTopAt(ear: EarFit, r: number): number {
  return ear.topZ + ((r - ear.outerMm) * (ear.wallZ - ear.topZ)) / (ear.wallMm - ear.outerMm);
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
 * стоит; сверху — плоский торец по венчику. Под кромкой снаружи — три ушка
 * под лапки пуансона (`slumpEars`); их размер зависит от пласта: между
 * стенкой и лапкой оставлено место под свес глины. Увеличена на усадку.
 */
export function buildSlumpShell(
  params: BuildParams,
  hollow: HollowState,
  shellMm: number,
  shrinkPct: number,
  seatMm = EAR_SEAT_MM,
  ventMm = VENT_MM,
): SlumpShell {
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
  const outerMaxMm = rings.reduce((max, ring) => Math.max(max, ring.r), 0);
  const ears = slumpEars(rings, nu, slabThickness(hollow.wallMm, heightMm), heightMm, seatMm);
  for (let j = 0; j <= nv; j++) {
    const { r, z } = rings[j];
    for (let i = 0; i < nu; i++) {
      const u = (2 * Math.PI * i) / nu;
      const k = (j * nu + i) * 3;
      const radius = Math.max(r, ears.radiusAt(j, z, legDistance(u)));
      positions[k] = radius * Math.cos(u);
      positions[k + 1] = radius * Math.sin(u);
      positions[k + 2] = z;
    }
  }
  // отдушина не шире трети донышка: дно должно остаться дном
  const vent = clamp(ventMm, 0.5, profileRadius(profile, 0) * 0.66);
  const grooves = ventGrooves(vent, shellMm);
  if (grooves) liftGrooveExits(positions, nu, nv, grooves);
  const outer: Grid = { nu, nv, positions };
  const shell = assembleHollowMesh(outer, inner.positions, [], vent, {
    outer: grooves ? {
      planeZ: -shellMm,
      dense: [{ from: 0, to: Infinity, stepMm: grooves.widthMm / 4 }],
      heightAt: grooves.heightAt,
    } : {},
    // пол полости — это дно изделия: клеймо на нём выпуклое, и пласт его
    // отпечатает вдавленным
    inner: vesselBottom(params, inner) ?? {},
  });
  // дно — на стол
  for (let i = 2; i < shell.positions.length; i += 3) shell.positions[i] += shellMm;
  const mesh = { ...shell, normals: meshNormals(shell.positions, shell.indices) };
  return {
    mesh: scaleMesh(mesh, 1 + shrinkPct / 100),
    fit: {
      rimMm: radiusAt(1),
      rimZ: heightMm + shellMm,
      outerMaxMm,
      topOuterMm: rings[nv].r,
      ventMm: vent,
      ear: {
        ...ears.fit,
        topZ: ears.fit.topZ + shellMm,
        wallZ: ears.fit.wallZ + shellMm,
        cheekZ: ears.fit.cheekZ + shellMm,
      },
    },
  };
}

/** Канавки подошвы: подъём подошвы над столом в точке (x, y). */
interface VentGrooves {
  widthMm: number;
  depthMm: number;
  heightAt(x: number, y: number): number;
}

/**
 * Три канавки от оси на углах посередине между ушками. Подъём — расстояние
 * до края канавки (скат 45°), не выше глубины; у оси лучи сходятся, и
 * вокруг отдушины сама собой выходит общая лунка. null — дно матрицы
 * слишком тонко для канавки.
 */
function ventGrooves(ventMm: number, shellMm: number): VentGrooves | null {
  const widthMm = GROOVE_WIDTH_VENTS * ventMm;
  const depthMm = Math.min(widthMm / 2, shellMm - GROOVE_ROOF_MM);
  if (depthMm < GROOVE_MIN_MM) return null;
  const pitch = (2 * Math.PI) / PUNCH_LEGS;
  // ушки — на −90° + k·pitch (legDistance), канавки — на полшага от них
  const rays = Array.from({ length: PUNCH_LEGS }, (_, k) => {
    const a = Math.PI / 2 + k * pitch;
    return [Math.cos(a), Math.sin(a)] as const;
  });
  return {
    widthMm,
    depthMm,
    heightAt: (x, y) => {
      let lift = 0;
      for (const [cx, cy] of rays) {
        const along = x * cx + y * cy;
        // до луча: поперёк, а позади оси — до самой оси
        const off = along > 0 ? Math.abs(x * cy - y * cx) : Math.hypot(x, y);
        lift = Math.max(lift, widthMm / 2 - off);
      }
      return clamp(lift, 0, depthMm);
    },
  };
}

/**
 * Выход канавок наружу: низ стенки в их секторах поднимается вместе с краем
 * подошвы и плавно сходит на нет к двойной глубине канавки. Подъём убывает
 * с высотой медленнее, чем она растёт, поэтому ряды стенки не меняются
 * местами и поверхность не складывается.
 */
function liftGrooveExits(positions: Float32Array, nu: number, nv: number, grooves: VentGrooves): void {
  const z0 = positions[2];
  const band = 2 * grooves.depthMm;
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i < nu; i++) {
      const k = (j * nu + i) * 3;
      const above = positions[k + 2] - z0;
      if (above >= band) continue;
      const lift = grooves.heightAt(positions[k], positions[k + 1]);
      positions[k + 2] += lift * (1 - above / band);
    }
  }
}

/**
 * Ушки матрицы: кольца до `ring` включительно в секторах ушек вытягиваются
 * до наружной грани — отвесной под верхом, ниже фаска 45° обратно к стенке
 * (форма печатается стоя, без поддержек). Верх — на кольце не выше
 * EAR_DROP_MM под кромкой; площадка лапки — дальше стенки над ушком на пласт
 * и зазор, чтобы свес глины ложился между ними. По бокам площадки над ушком
 * поднимаются щёки паза почти до кромки: лапка входит между ними задолго до
 * посадки, и пуансон не промахнётся мимо ушек и не перекосится на ходу.
 * Высоты — до подъёма на борт.
 */
function slumpEars(
  rings: readonly { r: number; z: number }[],
  nu: number,
  slabMm: number,
  heightMm: number,
  seatMm: number,
): { radiusAt: (j: number, z: number, angle: number) => number; fit: EarFit } {
  const nv = rings.length - 1;
  let ring = 1;
  for (let j = 1; j < nv; j++) if (rings[j].z <= heightMm - EAR_DROP_MM) ring = j;
  let cheekRing = ring;
  for (let j = ring + 1; j < nv; j++) if (rings[j].z <= heightMm - CHEEK_BELOW_RIM_MM) cheekRing = j;
  const topZ = rings[ring].z;
  const faceZ = topZ - PUNCH_LIP_MM - EAR_FACE_SPARE_MM;

  let above = 0;
  for (let j = ring + 1; j <= nv; j++) above = Math.max(above, rings[j].r);
  // губа опускается вдоль наружной грани: там стенка не должна торчать за неё
  let face = 0;
  for (const { r, z } of rings) if (z >= faceZ && z <= topZ) face = Math.max(face, r);
  const seatInMm = above + slabMm + EAR_CLAY_GAP_MM;
  const outerMm = Math.max(seatInMm, face) + seatMm;

  // Лапка, пустая ячейка, щека. Ушко идёт и под щёками: иначе их низ висел
  // бы над столом, а форма печатается стоя.
  const step = (2 * Math.PI) / nu;
  const legReach = legSpan(outerMm, nu);
  const slotReach = legReach + step;
  const reach = slotReach + Math.max(CHEEK_MM / outerMm, step * 2.01);
  // Выступ ушка от стенки на высоте низа отвесной грани: ниже он не растёт.
  let wallAtFace = rings[0].r;
  for (let j = 1; j <= ring; j++) {
    const a = rings[j - 1];
    const b = rings[j];
    if (b.z < faceZ) continue;
    const t = b.z > a.z ? clamp((faceZ - a.z) / (b.z - a.z), 0, 1) : 1;
    wallAtFace = a.r + (b.r - a.r) * t;
    break;
  }
  const depthMm = Math.max(0, outerMm - wallAtFace);
  return {
    radiusAt: (j, z, angle) => {
      if (angle > reach) return 0;
      if (j <= ring) {
        // Под отвесной гранью — фаска 45°, но не глубже, чем ушко выступало
        // у её низа: на крутой стенке (стакан) фаска сходит на стенку и ушко
        // кончается, на пологой (миска) идёт ребром до основания параллельно
        // стенке. Сузить или утончить его книзу нельзя: на стенке, которая
        // сама нависает за 45°, это дало бы грань, нависающую ещё сильнее, —
        // под неё слайсеру нужны поддержки (на ступенчатом сужении по дуге
        // так и вышло).
        return Math.min(outerMm - Math.max(0, faceZ - z), rings[j].r + depthMm);
      }
      return j <= cheekRing && angle > slotReach ? outerMm : 0;
    },
    fit: {
      outerMm, topZ, wallMm: rings[ring + 1].r, wallZ: rings[ring + 1].z, seatInMm,
      legReach, slotReach, reach, cheekZ: rings[cheekRing].z,
    },
  };
}

/**
 * Угловой охват лапки: вершины, чья ячейка сетки по углу задевает её сектор,
 * но не меньше шага с каждой стороны от центра — одна опущенная вершина дала
 * бы иглу с подошвой в линию.
 */
function legSpan(radiusMm: number, nu: number): number {
  const step = (2 * Math.PI) / nu;
  return Math.max(PUNCH_LEG_WIDTH_MM / 2 / radiusMm + step / 2, step * 1.01);
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
 * лапок и фланца, толщины, охват лапок. Всё до усадки, в координатах
 * матрицы.
 */
export interface PunchLayout {
  /** толщина пласта: зазор между пуансоном и матрицей */
  slabMm: number;
  /** внутренняя грань губы лапки: наружная грань ушка + зазор */
  lipInMm: number;
  /** низ губы: ниже верха ушка на PUNCH_LIP_MM */
  lipZ: number;
  /** наружный радиус фланца и лапок */
  flangeMm: number;
  /** толщина фланца */
  flangeT: number;
  /** низ фланца над столом = кромка матрицы + пласт */
  flangeZ: number;
  /** угловой охват лапки: опущены вершины с legDistance ≤ reach */
  legReach: number;
}

export function punchLayout(params: BuildParams, hollow: HollowState, shellMm: number, fit: SlumpFit): PunchLayout {
  const { heightMm } = vesselSurface(params);
  const lipInMm = fit.ear.outerMm + PUNCH_CLEARANCE_MM;
  return {
    slabMm: slabThickness(hollow.wallMm, heightMm),
    lipInMm,
    lipZ: fit.ear.topZ - PUNCH_LIP_MM,
    flangeMm: lipInMm + PUNCH_STEP_MM + PUNCH_LIP_T_MM,
    flangeT: Math.max(shellMm, PUNCH_FLANGE_MIN_MM),
    flangeZ: fit.rimZ + slabThickness(hollow.wallMm, heightMm),
    legReach: fit.ear.legReach,
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

type RZ = { r: number; z: number };

/** Расстояние от точки до ломаной в осевом сечении и ближайшая точка на ней. */
function nearestOn(points: readonly RZ[], p: RZ): { distance: number; point: RZ; segment: number } {
  let best = { distance: Infinity, point: points[0], segment: 0 };
  for (let k = 0; k + 1 < points.length; k++) {
    const a = points[k];
    const b = points[k + 1];
    const dr = b.r - a.r;
    const dz = b.z - a.z;
    const len2 = dr * dr + dz * dz;
    const t = len2 > 0 ? clamp(((p.r - a.r) * dr + (p.z - a.z) * dz) / len2, 0, 1) : 0;
    const q = { r: a.r + dr * t, z: a.z + dz * t };
    const distance = Math.hypot(p.r - q.r, p.z - q.z);
    if (distance < best.distance) best = { distance, point: q, segment: k };
  }
  return best;
}

/**
 * Скругление низа пуансона — катящейся окружностью, касающейся пола и
 * стенки рабочей поверхности. `fraction` — доля наибольшего радиуса, при
 * котором центр окружности выходит на ось: тогда пола не остаётся вовсе, и
 * низ — шапка, у миски почти полусфера. Пласт на дне в углу выходит толще
 * (как у пиал с массивной ножкой), но нигде не тоньше заданного: окружность
 * целиком внутри эквидистанты. `wall` начинается на полу, в `(floorR, floorZ)`;
 * результат — от точки касания пола (или от края отдушины, если шапка до
 * неё дотянулась) вверх по дуге и дальше по стенке.
 */
function roundBottom(wall: readonly RZ[], floorZ: number, fraction: number, ventMm: number): RZ[] {
  if (!(fraction > 0) || wall.length < 2) return [...wall];
  const gap = (r: number, radius: number): number =>
    nearestOn(wall, { r, z: floorZ + radius }).distance - radius;

  // наибольший радиус: окружность с центром на оси касается стенки
  // у конической стенки он больше высоты: ~ r·sin α / (1 − cos α)
  let lo = 0;
  let hi = 4 * wall.reduce((max, p) => Math.max(max, p.r, p.z - floorZ), 0);
  if (gap(0, hi) >= 0) lo = hi;
  for (let i = 0; i < 48 && hi - lo > 1e-6; i++) {
    const mid = (lo + hi) / 2;
    if (gap(0, mid) >= 0) lo = mid;
    else hi = mid;
  }
  const radius = lo * Math.min(1, fraction);
  if (radius < 0.05) return [...wall];

  // центр — самый дальний от оси, при котором окружность ещё не режет стенку
  let near = 0;
  let far = wall[0].r;
  for (let i = 0; i < 48 && far - near > 1e-6; i++) {
    const mid = (near + far) / 2;
    if (gap(mid, radius) >= 0) near = mid;
    else far = mid;
  }
  const center = { r: near, z: floorZ + radius };
  const touch = nearestOn(wall, center);
  // точка дуги: center + radius·(sin θ, −cos θ); θ = 0 — касание пола
  const end = Math.atan2(touch.point.r - center.r, center.z - touch.point.z);
  const start = center.r < ventMm ? Math.asin(Math.min(1, (ventMm - center.r) / radius)) : 0;
  const steps = Math.max(4, Math.ceil((end - start) / (Math.PI / 64)));
  const arc: RZ[] = [];
  for (let k = 0; k <= steps; k++) {
    const t = start + ((end - start) * k) / steps;
    arc.push({ r: center.r + radius * Math.sin(t), z: center.z - radius * Math.cos(t) });
  }
  return [...arc, ...wall.slice(touch.segment + 1)];
}

/**
 * Внутренняя скорлупа начинается от края отдушины: если офсет до неё не
 * дошёл — горизонтальный пол до неё, если зашёл за неё — обрезается по ней.
 */
function fromVent(points: RZ[], ventMm: number): RZ[] {
  if (points.length === 0 || points[0].r >= ventMm) {
    return points.length === 0 ? points : [{ r: ventMm, z: points[0].z }, ...points];
  }
  for (let k = 1; k < points.length; k++) {
    const a = points[k - 1];
    const b = points[k];
    if (b.r < ventMm) continue;
    const t = (ventMm - a.r) / (b.r - a.r);
    return [{ r: ventMm, z: a.z + (b.z - a.z) * t }, ...points.slice(k)];
  }
  return points;
}

/**
 * Пуансон к углублённой отминке: входит в матрицу сверху и прижимает пласт к
 * её рабочей поверхности так, что между ними везде ровно толщина пласта.
 *
 * Рабочая поверхность — внутренняя поверхность изделия (силуэт, отодвинутый
 * внутрь на пласт), гладкая: рельеф в этом режиме лежит на матрице. Над
 * кромкой матрицы — плоский фланец, висящий над ней на пласт; с фланца
 * снаружи матрицы спускаются три короткие лапки-крючка к ушкам матрицы.
 * Подошва лапки садится на верх ушка — это упор глубины, он и задаёт толщину
 * пласта; губа опускается ниже и обнимает ушко снаружи с зазором — три губы
 * центрируют пуансон. От стенки лапка отстоит на пласт и зазор: свес глины
 * за кромку ложится между ними.
 *
 * Всё — одно тело вращения (lathe), и лапки тоже: точки низа фланца несут
 * смещение по углу (`LathePoint.offset`) — в секторах лапок вниз до ушка,
 * между лапками внутрь, к торцу матрицы, так что широк фланец только над
 * лапками. Пуансон полый,
 * скорлупой в борт, и с отдушиной по оси — контур оси не касается, тело —
 * тор. Печатается фланцем на стол; увеличен на усадку, как и матрица.
 */
export function buildPunch(
  params: BuildParams,
  hollow: HollowState,
  shellMm: number,
  shrinkPct: number,
  fit: SlumpFit,
  roundPct = 0,
): SurfaceMesh {
  const { profile, heightMm, nu } = vesselSurface(params);
  const layout = punchLayout(params, hollow, shellMm, fit);
  const { slabMm, lipInMm, lipZ, flangeMm, flangeZ, legReach: reach } = layout;
  const { ear } = fit;
  const flangeTop = flangeZ + layout.flangeT;
  const radiusAt = (v: number): number => profileRadius(profile, v);
  const vent = fit.ventMm / 2;

  // Рабочая поверхность в координатах изделия, без потолка по венчику: у
  // отогнутого края её конец выше кромки, и оттуда идёт дуга вокруг кромки.
  const work = offsetSamples(radiusAt, heightMm, slabMm, slabMm, Infinity);
  const lift = (p: { r: number; z: number }): { r: number; z: number } => ({ r: p.r, z: p.z + shellMm });
  const wall = [{ r: work.floorR, z: slabMm }, ...work.samples].map(lift);
  const floorZ = shellMm + slabMm;
  const surface = roundBottom(wall, floorZ, roundPct / 100, vent);

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
  const inner = fromVent(offsetPolyline(surface, shellMm, floorZ + shellMm, fit.rimZ), vent);
  const shellTop = inner[inner.length - 1];

  // Фланец и лапки. В секторах лапок точки низа фланца опускаются: подошва —
  // на верх ушка (та же прямая, что у него, — контакт плоскостью), губа —
  // ниже, вдоль наружной грани ушка. Между лапками те же точки сжимаются к
  // кромке матрицы: там фланцу нужно лишь прижать глину на торце, и широкое
  // кольцо было бы пластиком впустую.
  const narrowMm = Math.min(fit.topOuterMm + FLANGE_OVER_RIM_MM, ear.seatInMm - PUNCH_STEP_MM);
  const flangePoint = (r: number, z: number, k: number, drop: number): LathePoint => ({
    r,
    z,
    offset: (u) => (legDistance(u) <= reach
      ? { dr: 0, dz: -drop }
      : { dr: narrowMm + k * FLANGE_PACK_MM - r, dz: 0 }),
  });
  const contour: LathePoint[] = [
    // отдушина снизу и пол рабочей поверхности
    // отдушина снизу; пол рабочей поверхности, если скругление его оставило
    ...(surface[0].r > vent ? [{ r: vent, z: floorZ }] : []),
    ...surface,
    ...arc,
    flangePoint(ear.seatInMm - PUNCH_STEP_MM, flangeZ, 0, 0),
    flangePoint(ear.seatInMm, flangeZ, 1, flangeZ - earTopAt(ear, ear.seatInMm)),
    flangePoint(lipInMm, flangeZ, 2, flangeZ - earTopAt(ear, lipInMm)),
    flangePoint(lipInMm + PUNCH_STEP_MM, flangeZ, 3, flangeZ - lipZ),
    flangePoint(flangeMm, flangeZ, 4, flangeZ - lipZ),
    // торец фланца — он же наружная грань лапки
    flangePoint(flangeMm, flangeTop, 4, 0),
    { r: shellTop.r, z: flangeTop },
    // внутренняя скорлупа сверху вниз до отдушины
    ...[...inner].reverse(),
  ];
  const raw = lathe(contour, nu);
  const mesh = { ...raw, normals: meshNormals(raw.positions, raw.indices) };
  return mirrorZ(scaleMesh(mesh, 1 + shrinkPct / 100));
}
