// Крышка: отдельная деталь и ответная посадка в горловине изделия.
//
// Крышка целиком — тело вращения, поэтому CSG ей не нужен ни в каком виде:
// и купол, и юбка, и ручка (шар или буква Т в разрезе) — всё это один
// замкнутый контур в осевом сечении, прокрученный вокруг оси (см. lathe.ts).
// Считается за миллисекунды и в главном потоке, в отличие от ручки и носика
// изделия, которые без булевых операций к телу не приклеить.
//
// Все диаметры посадки выводятся ОТ ГОРЛОВИНЫ, а не задаются пользователем:
//
//     полость тела  ⌀cavity          (самое узкое место в полосе посадки)
//        − полочка  ⌀seat            (цилиндр, в который входит юбка)
//        − зазор    ⌀plug            (наружный диаметр юбки крышки)
//        + поле     ⌀field           (край крышки, лежащий на опоре)
//
// Пользователь крутит полочку, зазор и поле, а подгонять диаметры под
// конкретный горшок ему не приходится: крышка подходит всегда.
//
// Утопление (recessMm) задаёт, на сколько крышка садится ниже венчика.
// Ноль — поле лежит прямо на венчике, как у обычного чайника; больше нуля —
// крышка утоплена и опирается на полочку внутри горловины. Это одна и та же
// геометрия с разным значением одного параметра, а не два режима.

import type { SurfaceMesh } from './surface';
import { meshNormals } from './normals';
import type { LathePoint } from './lathe';
import { lathe } from './lathe';
import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';
import type { HollowState, SeatFit } from './hollow';
import { cavityPoint, WALL_MIN_MM, WALL_MAX_MM } from './hollow';

export type LidKnob = 'ball' | 'tee';

export interface LidState {
  on: boolean;
  /** насколько крышка утоплена ниже венчика, мм; 0 — лежит на нём */
  recessMm: number;
  /** глубина юбки, входящей в горловину, мм */
  depthMm: number;
  /** зазор посадки на сторону, мм */
  clearanceMm: number;
  /** ширина полочки: на столько посадка уже полости, мм */
  ledgeMm: number;
  /** вынос поля за посадку, мм */
  fieldMm: number;
  /** высота купола, мм */
  domeMm: number;
  /** 0 — конус, 1 — сферический сегмент */
  curvature: number;
  /** 'ball' — шар на ножке, 'tee' — плоский диск (буква Т в разрезе) */
  knobKind: LidKnob;
  /** наружный диаметр шара или диска, мм */
  knobDMm: number;
  /** диаметр ножки, мм */
  stemDMm: number;
  /** высота ножки, мм */
  stemHMm: number;
  /** толщина диска у ручки-Т, мм */
  capHMm: number;
}

interface Limit {
  min: number;
  max: number;
}

/** Пределы ползунков: одни и те же для UI и для санатора. */
export const LID_LIMITS: Record<
  'recessMm' | 'depthMm' | 'clearanceMm' | 'ledgeMm' | 'fieldMm' | 'domeMm'
  | 'curvature' | 'knobDMm' | 'stemDMm' | 'stemHMm' | 'capHMm',
  Limit
> = {
  recessMm: { min: 0, max: 20 },
  depthMm: { min: 3, max: 30 },
  clearanceMm: { min: 0.2, max: 2 },
  ledgeMm: { min: 0, max: 10 },
  fieldMm: { min: 0, max: 30 },
  domeMm: { min: 1, max: 80 },
  curvature: { min: 0, max: 1 },
  knobDMm: { min: 6, max: 50 },
  stemDMm: { min: 3, max: 30 },
  stemHMm: { min: 0, max: 30 },
  capHMm: { min: 1.5, max: 15 },
};

/** Уже этого посадка вырождается в затычку — крышка выйдет игрушечной. */
const MIN_SEAT_MM = 6;
/** Меньшим полем крышке не на что опереться. */
const MIN_FIELD_MM = 1.5;
/** Тоньше этого полость крышки не строится — крышка выходит сплошной. */
const MIN_CAVITY_MM = 0.5;
/** Глубже этой доли высоты изделия юбку не пускаем. */
const MAX_DEPTH_FRACTION = 0.5;
/** Ниже этой доли высоты крышку не утапливаем. */
const MAX_RECESS_FRACTION = 0.25;
/** Точек на купол и на дугу шара. */
const DOME_STEPS = 28;
const BALL_STEPS = 14;
/** По скольким высотам ищется самое узкое место горловины. */
const CAVITY_SAMPLES = 96;

export function defaultLid(): LidState {
  return {
    on: false,
    recessMm: 0,
    depthMm: 8,
    clearanceMm: 0.6,
    // Ноль по умолчанию — та самая простая ответная часть: горловина изнутри
    // просто цилиндризуется, и отливка выходит из формы готовой, без доводки
    // полочки по сырому. Полочка нужна утопленной крышке, и там она
    // назначается сама (см. lidFit).
    ledgeMm: 0,
    fieldMm: 6,
    domeMm: 16,
    curvature: 0.55,
    knobKind: 'ball',
    knobDMm: 18,
    stemDMm: 8,
    stemHMm: 6,
    capHMm: 4,
  };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function sanitizeLid(raw: unknown): LidState {
  const fallback = defaultLid();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;
  const within = (key: keyof typeof LID_LIMITS, value: unknown): number => {
    const limit = LID_LIMITS[key];
    return clamp(num(value, fallback[key]), limit.min, limit.max);
  };

  const knobDMm = within('knobDMm', source.knobDMm);
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    recessMm: within('recessMm', source.recessMm),
    depthMm: within('depthMm', source.depthMm),
    clearanceMm: within('clearanceMm', source.clearanceMm),
    ledgeMm: within('ledgeMm', source.ledgeMm),
    fieldMm: within('fieldMm', source.fieldMm),
    domeMm: within('domeMm', source.domeMm),
    curvature: within('curvature', source.curvature),
    knobKind: source.knobKind === 'tee' ? 'tee' : 'ball',
    knobDMm,
    // ножка толще шляпки — это уже не ручка, а обрубок
    stemDMm: Math.min(within('stemDMm', source.stemDMm), knobDMm),
    stemHMm: within('stemHMm', source.stemHMm),
    capHMm: within('capHMm', source.capHMm),
  };
}

/** Размеры посадки, выведенные от горловины изделия. Всё в мм. */
export interface LidFit {
  /** самое узкое место полости в полосе посадки */
  cavityMm: number;
  /** радиус посадочного цилиндра в теле */
  seatMm: number;
  /** наружный радиус юбки крышки */
  plugMm: number;
  /** радиус поля крышки */
  fieldMm: number;
  /** глубина юбки (может быть зажата высотой изделия) */
  depthMm: number;
  /** высота опоры: на этом уровне лежит поле крышки */
  restZMm: number;
  /** на столько поднимают крышку, чтобы надеть на изделие */
  liftMm: number;
  /** толщина стенки крышки — та же, что у тела: печатают одним соплом */
  wallMm: number;
  /** горловина слишком узка: посадка вышла меньше разумного минимума */
  tooNarrow: boolean;
}

/**
 * Самое узкое место полости в полосе посадки. Именно минимум, а не радиус у
 * венчика: у горшка горло сужается кверху не всегда монотонно, а отогнутый
 * венчик и вовсе задирает радиус у самого края — юбка, подогнанная по нему,
 * упёрлась бы в горло чуть ниже.
 */
function narrowestCavity(
  profile: ProfileDef,
  heightMm: number,
  wallMm: number,
  fromZ: number,
  toZ: number,
): number {
  const radiusAt = (v: number): number => profileRadius(profile, v);
  // Выборку сгущаем к горловине: у высокой вазы равномерная по всей высоте
  // дала бы на узкую полосу считаные точки.
  const vFrom = clamp(fromZ / heightMm - 0.15, 0, 1);
  let narrowest = Infinity;
  for (let i = 0; i <= CAVITY_SAMPLES; i++) {
    const point = cavityPoint(radiusAt, heightMm, wallMm, lerp(vFrom, 1, i / CAVITY_SAMPLES));
    if (point.z < fromZ || point.z > toZ) continue;
    narrowest = Math.min(narrowest, point.r);
  }
  // Полоса могла оказаться короче шага выборки — тогда меряем по её верху.
  return Number.isFinite(narrowest)
    ? narrowest
    : cavityPoint(radiusAt, heightMm, wallMm, toZ / heightMm).r;
}

export function lidFit(
  profile: ProfileDef,
  heightMm: number,
  hollow: HollowState,
  lid: LidState,
): LidFit {
  const wallMm = clamp(hollow.wallMm, WALL_MIN_MM, WALL_MAX_MM);
  const recessMm = Math.min(lid.recessMm, heightMm * MAX_RECESS_FRACTION);
  const restZMm = heightMm - recessMm;
  const depthMm = Math.min(lid.depthMm, restZMm * MAX_DEPTH_FRACTION);

  // Верх полосы — там, где полость обрывается под заглаженный венчик: выше
  // неё стенки уже нет, и мерить там нечего.
  const rimR = Math.min(hollow.rimRadiusMm, wallMm / 2);
  const cavityMm = narrowestCavity(
    profile, heightMm, wallMm, restZMm - depthMm, Math.min(restZMm, heightMm - rimR),
  );

  // Утопленной крышке полочка нужна обязательно — на неё она и опирается.
  // Поэтому при утоплении назначаем минимальную сами: иначе ползунок
  // «утопление» молча не делал бы ничего.
  const ledgeMm = recessMm > 0
    ? Math.max(lid.ledgeMm, lid.clearanceMm + MIN_FIELD_MM)
    : lid.ledgeMm;
  const seatMm = Math.max(cavityMm - ledgeMm, Math.min(cavityMm, MIN_SEAT_MM));
  const plugMm = Math.max(seatMm - lid.clearanceMm, MIN_CAVITY_MM);

  // Куда позволено вынести поле. Утопленное — не шире устья, иначе крышку
  // не опустить; лежащее на венчике — не шире наружной стенки, иначе оно
  // свисало бы над изделием козырьком.
  const fieldMax = recessMm > 0 ? cavityMm - lid.clearanceMm : profileRadius(profile, 1);
  const fieldMm = Math.min(seatMm + lid.fieldMm, Math.max(fieldMax, seatMm + MIN_FIELD_MM));

  return {
    cavityMm,
    seatMm,
    plugMm,
    fieldMm,
    depthMm,
    restZMm,
    liftMm: restZMm - depthMm,
    wallMm,
    tooNarrow: seatMm < MIN_SEAT_MM,
  };
}

/** Посадочный цилиндр для полости тела — то, во что войдёт юбка. */
export function lidSeat(fit: LidFit): SeatFit {
  return { radiusMm: fit.seatMm, topZMm: fit.restZMm, bottomZMm: fit.restZMm - fit.depthMm };
}

// --- контур ---

/**
 * Доля радиуса купола на доле высоты s: 1 у поля, 0 в зените. Та же кривая,
 * что у миски (см. BOWL в profiles.ts), только развёрнутая: при curvature = 0
 * купол — прямой конус, при 1 — сферический сегмент, встающий у поля
 * вертикально.
 */
function domeShape(s: number, curvature: number): number {
  const cone = 1 - s;
  const sphere = Math.sqrt(Math.max(0, 1 - s * s));
  return lerp(cone, sphere, curvature);
}

/** Точка наружной поверхности купола на доле высоты s. */
function domePoint(fit: LidFit, lid: LidState, s: number): LathePoint {
  return {
    r: fit.fieldMm * domeShape(s, lid.curvature),
    z: fit.depthMm + fit.wallMm + lid.domeMm * s,
  };
}

/** Доля высоты купола, на которой его радиус равен заданному. */
function domeAt(radius: number, fieldMm: number, curvature: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (fieldMm * domeShape(mid, curvature) > radius) lo = mid;
    else hi = mid;
  }
  return hi;
}

/**
 * Доли параметра купола, разложенные равномерно ПО ДЛИНЕ ДУГИ. Равномерный
 * шаг по самому параметру не годится: у сферического сегмента радиус у
 * зенита меняется как √Δs, и последний сегмент вышел бы в несколько
 * миллиметров — купол выглядел бы конусом с плоской нашлёпкой сверху.
 */
function domeParams(fit: LidFit, lid: LidState, sTop: number): number[] {
  const dense = DOME_STEPS * 8;
  const sAt = (i: number): number => (sTop * i) / dense;
  const lengths = [0];
  let previous = domePoint(fit, lid, 0);
  for (let i = 1; i <= dense; i++) {
    const point = domePoint(fit, lid, sAt(i));
    lengths.push(lengths[i - 1] + Math.hypot(point.r - previous.r, point.z - previous.z));
    previous = point;
  }

  const params = [0];
  let cursor = 1;
  for (let m = 1; m < DOME_STEPS; m++) {
    const target = (lengths[dense] * m) / DOME_STEPS;
    while (cursor < dense && lengths[cursor] < target) cursor++;
    const span = lengths[cursor] - lengths[cursor - 1];
    const t = span > 1e-12 ? (target - lengths[cursor - 1]) / span : 0;
    params.push(lerp(sAt(cursor - 1), sAt(cursor), t));
  }
  params.push(sTop);
  return params;
}

/** Радиус ножки — не толще четырёх пятых поля, иначе купола не останется. */
function stemRadius(fit: LidFit, lid: LidState): number {
  return clamp(lid.stemDMm / 2, 1, fit.fieldMm * 0.8);
}

/**
 * Ручка от верха ножки до вершины на оси. Обе формы осесимметричны, поэтому
 * обе — просто продолжение того же контура.
 */
function knobPoints(lid: LidState, stemR: number, topZ: number): LathePoint[] {
  const knobR = Math.max(lid.knobDMm / 2, stemR + 0.5);
  if (lid.knobKind === 'tee') {
    // Плоский диск: снизу полка буквы Т, сверху фаска — чтобы кромка не
    // сходилась в лезвие, которого печать всё равно не удержит.
    const chamfer = Math.min(lid.capHMm * 0.35, (knobR - stemR) * 0.35);
    return [
      { r: knobR, z: topZ },
      { r: knobR, z: topZ + lid.capHMm - chamfer },
      { r: knobR - chamfer, z: topZ + lid.capHMm },
      { r: 0, z: topZ + lid.capHMm },
    ];
  }
  // Шар садится на ножку так, чтобы дуга прошла ровно через её верхнюю
  // кромку: стык получается без ступеньки при любом соотношении диаметров.
  const centerZ = topZ + Math.sqrt(Math.max(0, knobR * knobR - stemR * stemR));
  const from = Math.atan2(topZ - centerZ, stemR);
  const points: LathePoint[] = [];
  for (let m = 1; m <= BALL_STEPS; m++) {
    const angle = lerp(from, Math.PI / 2, m / BALL_STEPS);
    points.push({ r: knobR * Math.cos(angle), z: centerZ + knobR * Math.sin(angle) });
  }
  return points;
}

/**
 * Наружная поверхность крышки: от низа юбки вверх и до вершины ручки.
 * Начинается с юбки, потому что она у крышки снаружи и есть, а вот низ
 * контура у полой и сплошной крышки разный — его дописывает вызывающий.
 */
function outerPoints(fit: LidFit, lid: LidState): LathePoint[] {
  const domeBaseZ = fit.depthMm + fit.wallMm;
  const stemR = stemRadius(fit, lid);
  const points: LathePoint[] = [
    { r: fit.plugMm, z: 0 },
    { r: fit.plugMm, z: fit.depthMm },
    // низ поля: им крышка и ложится на венчик или на полочку
    { r: fit.fieldMm, z: fit.depthMm },
    { r: fit.fieldMm, z: domeBaseZ },
  ];

  const sTop = domeAt(stemR, fit.fieldMm, lid.curvature);
  for (const s of domeParams(fit, lid, sTop).slice(1)) points.push(domePoint(fit, lid, s));

  const stemTopZ = domeBaseZ + lid.domeMm * sTop + lid.stemHMm;
  points.push({ r: stemR, z: stemTopZ });
  points.push(...knobPoints(lid, stemR, stemTopZ));
  return points;
}

/**
 * Точка внутренней поверхности купола: наружная, сдвинутая внутрь ПО
 * НОРМАЛИ. По нормали, а не по вертикали, — по той же причине, что и у тела
 * изделия: у крутого купола вертикальный сдвиг оставил бы стенку вдвое
 * тоньше заданной.
 */
function domeInnerPoint(fit: LidFit, lid: LidState, s: number): LathePoint {
  const h = 1e-4;
  const s0 = Math.max(0, s - h);
  const s1 = Math.min(1, s + h);
  const outer = domePoint(fit, lid, s);
  const dr = fit.fieldMm * (domeShape(s1, lid.curvature) - domeShape(s0, lid.curvature));
  const dz = lid.domeMm * (s1 - s0);
  const len = Math.hypot(dr, dz) || 1;
  // наружная нормаль в осевом сечении: (dz, −dr)/|…|
  return {
    r: outer.r - (fit.wallMm * dz) / len,
    z: outer.z + (fit.wallMm * dr) / len,
  };
}

/** Высота, на которой сдвинутая внутрь образующая пересекает ось. */
function axisCrossing(raw: LathePoint[], start: number): number {
  if (start === 0) return raw[0].z;
  const before = raw[start - 1];
  const after = raw[start];
  const span = after.r - before.r;
  return lerp(before.z, after.z, span > 1e-9 ? -before.r / span : 0);
}

/**
 * Полость крышки: от вершины под куполом наружу и вниз до внутренней стенки
 * юбки. Пустой массив — полость выродилась (юбка тоньше собственной стенки),
 * и крышку придётся печатать сплошной.
 */
function innerPoints(fit: LidFit, lid: LidState): LathePoint[] {
  const innerPlug = fit.plugMm - fit.wallMm;
  if (innerPlug < MIN_CAVITY_MM) return [];

  const sTop = domeAt(stemRadius(fit, lid), fit.fieldMm, lid.curvature);
  const params = domeParams(fit, lid, sTop);
  const raw: LathePoint[] = [];
  for (let m = params.length - 1; m >= 0; m--) raw.push(domeInnerPoint(fit, lid, params[m]));

  // У конуса офсет зенита уходит ЗА ось: внутренняя поверхность конуса —
  // такой же конус, но с вершиной ниже. Началом полости берём пересечение
  // сдвинутой образующей с осью.
  let start = 0;
  while (start < raw.length && raw[start].r < 0) start++;
  if (start >= raw.length) return [];

  const points: LathePoint[] = [{ r: 0, z: axisCrossing(raw, start) }];
  for (let m = start; m < raw.length; m++) {
    const previous = points[points.length - 1];
    // Офсет крутой дуги может завернуться сам на себя — держим ход наружу и
    // вниз, иначе поверхность полости сложилась бы складкой.
    const next = { r: Math.max(raw[m].r, previous.r), z: Math.min(raw[m].z, previous.z) };
    if (next.r >= innerPlug) {
      const span = next.r - previous.r;
      const t = span > 1e-9 ? (innerPlug - previous.r) / span : 0;
      points.push({ r: innerPlug, z: lerp(previous.z, next.z, t) });
      return points;
    }
    points.push(next);
  }
  // Купол уже юбки — полость доходит до её стенки прямым потолком.
  points.push({ r: innerPlug, z: points[points.length - 1].z });
  return points;
}

// --- сборка ---

/** Полная высота крышки, мм. */
export function lidHeightMm(fit: LidFit, lid: LidState): number {
  let top = 0;
  for (const point of outerPoints(fit, lid)) top = Math.max(top, point.z);
  return top;
}

export interface LidBuildOptions {
  /** сдвиг по z: 0 — как печатают, fit.liftMm — как надета на изделие */
  liftMm?: number;
  /** перевернуть юбкой вверх — так крышку кладут в литейную форму */
  upsideDown?: boolean;
}

function place(
  points: LathePoint[],
  fit: LidFit,
  lid: LidState,
  options: LidBuildOptions,
): LathePoint[] {
  if (options.upsideDown) {
    const height = lidHeightMm(fit, lid);
    // Зеркало по z пустило бы контур по часовой и вывернуло меш наизнанку —
    // разворачиваем заодно и порядок обхода.
    return points.map((point) => ({ r: point.r, z: height - point.z })).reverse();
  }
  const lift = options.liftMm ?? 0;
  return lift === 0 ? points : points.map((point) => ({ r: point.r, z: point.z + lift }));
}

function toMesh(points: LathePoint[], nu: number): SurfaceMesh {
  const mesh = lathe(points, nu);
  return { ...mesh, normals: meshNormals(mesh.positions, mesh.indices) };
}

/**
 * Печатная крышка: полая, стенкой в ту же толщину, что у тела. Ручка
 * остаётся сплошной — полость под ней закрывается, сверлить там нечего.
 */
export function buildLidMesh(
  fit: LidFit,
  lid: LidState,
  nu: number,
  options: LidBuildOptions = {},
): SurfaceMesh {
  const inner = innerPoints(fit, lid);
  if (inner.length === 0) return buildLidSolid(fit, lid, nu, options);
  const points: LathePoint[] = [
    { r: fit.plugMm - fit.wallMm, z: 0 },
    ...outerPoints(fit, lid),
    ...inner,
  ];
  return toMesh(place(points, fit, lid, options), nu);
}

/**
 * Сплошная крышка — позитив под литейную оснастку. Гипс формирует только
 * наружную поверхность, полость получается сливом шликера, поэтому форме
 * нужен именно сплошной объём под наружным контуром.
 */
export function buildLidSolid(
  fit: LidFit,
  lid: LidState,
  nu: number,
  options: LidBuildOptions = {},
): SurfaceMesh {
  const points: LathePoint[] = [{ r: 0, z: 0 }, ...outerPoints(fit, lid)];
  return toMesh(place(points, fit, lid, options), nu);
}
