// Силуэт изделия: параметры семейства → r(t), t ∈ [0,1] снизу вверх.
// Радиус в миллиметрах, высота задаётся отдельно (heightMm) — так параметр
// «диаметр тулова 180 мм» означает ровно то, что написано.
//
// Интерполяция — кубический Эрмит с ограничением тангенсов по Фричу–Карлсону.
// Обычный сплайн с тангенсами конечных разностей перелетает контрольные точки
// на 5–10 %, и заявленный диаметр расходится с фактическим; ограничитель
// обнуляет тангенс в локальных экстремумах, поэтому максимум силуэта лежит
// ровно на контрольной точке «тулово», а минимум — на «горле».

export interface ProfilePoint {
  /** доля высоты, 0 — дно, 1 — устье */
  t: number;
  /** радиус, мм */
  r: number;
}

export interface ProfileDef {
  familyId: string;
  heightMm: number;
  points: ProfilePoint[];
}

export type Params = Record<string, number>;

/**
 * Параметр семейства. Подписи и подсказки — в словарях интерфейса
 * (`param.<семейство>.<key>`, src/i18n): ядро языка не знает.
 */
export interface ParamSpec {
  key: string;
  min: number;
  max: number;
  step: number;
  default: number;
  /** 'mm' — миллиметры, 'x' — доля/коэффициент (без единиц), 'deg' — градусы */
  unit: 'mm' | 'x' | 'deg';
}

export interface FamilyDef {
  /** название и примеры — в словаре: `family.<id>`, `family.<id>.examples` */
  id: string;
  defaultHeightMm: number;
  params: ParamSpec[];
  /** контрольные точки силуэта; параметры уже зажаты clampFamilyParams */
  points(p: Params, heightMm: number): ProfilePoint[];
  /**
   * Высота ножки в мм — ровно та, что заложена в points (после зажимов).
   * Нет у семейства ножки — нет и метода: скругление ножки ему не положено.
   */
  footZ?(p: Params, heightMm: number): number;
}

/**
 * Скругления — общие для семейств параметры, обрабатываются в buildProfile
 * поверх силуэта семейства. Кромка дна есть у всех, переход ножки к телу —
 * только у тех, у кого есть ножка.
 */
const BASE_FILLET: ParamSpec = {
  key: 'baseFillet', min: 0, max: 15, step: 0.5, default: 0, unit: 'mm',
};
const FOOT_FILLET: ParamSpec = {
  key: 'footFillet', min: 0, max: 20, step: 0.5, default: 0, unit: 'mm',
};

/** Тоньше глина всё равно не держится; страхует и от нулевого радиуса. */
export const MIN_RADIUS_MM = 1.5;

// --- вспомогательное ---

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Плавная ступенька 0→1 на [0,1]; вне отрезка — константы. */
function smoothstep(x: number): number {
  const q = clamp(x, 0, 1);
  return q * q * (3 - 2 * q);
}

/**
 * Отгиб венчика: множитель радиуса, нарастающий в последних RIM_BAND высоты
 * так, что r(1) = r·(1 + flare). Локальный отгиб, а не общее раздутие —
 * иначе параметр дублировал бы диаметр устья.
 */
const RIM_BAND = 0.14;

function rimFactor(flare: number, t: number): number {
  return 1 + flare * smoothstep((t - (1 - RIM_BAND)) / RIM_BAND);
}

/** Равномерная выборка аналитического силуэта в контрольные точки. */
function sampled(count: number, radius: (t: number) => number): ProfilePoint[] {
  const points: ProfilePoint[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    points.push({ t, r: Math.max(MIN_RADIUS_MM, radius(t)) });
  }
  return points;
}

const SAMPLES = 25; // нечётное: t = 0.5 попадает в узел
/** Узлов на стенку миски с заданным углом у дна — излом у ножки должен читаться. */
const WALL_SAMPLES = 128;

// --- семейства ---

const POT: FamilyDef = {
  id: 'pot',
  defaultHeightMm: 150,
  params: [
    { key: 'dBelly', min: 40, max: 320, step: 1, default: 170, unit: 'mm' },
    { key: 'dNeck', min: 20, max: 300, step: 1, default: 108, unit: 'mm' },
    { key: 'dFoot', min: 20, max: 300, step: 1, default: 104, unit: 'mm' },
    { key: 'bellyAt', min: 0.25, max: 0.8, step: 0.01, default: 0.52, unit: 'x' },
    { key: 'shoulder', min: 0, max: 1, step: 0.01, default: 0.45, unit: 'x' },
    { key: 'neckH', min: 0, max: 0.4, step: 0.01, default: 0.16, unit: 'x' },
    { key: 'rimFlare', min: -0.1, max: 0.6, step: 0.01, default: 0.18, unit: 'x' },
    BASE_FILLET,
  ],
  points(p, _heightMm) {
    const rFoot = p.dFoot / 2;
    const rBelly = p.dBelly / 2;
    const rNeck = p.dNeck / 2;
    const rRim = rNeck * (1 + p.rimFlare);
    const bellyAt = clamp(p.bellyAt, 0.15, 0.82);
    // горло не может начинаться ниже тулова — иначе плечо вырождается
    const neckStart = Math.max(bellyAt + 0.1, 1 - p.neckH);

    const points: ProfilePoint[] = [{ t: 0, r: rFoot }, { t: bellyAt, r: rBelly }];
    if (neckStart < 0.995) {
      points.push({
        t: lerp(bellyAt, neckStart, lerp(0.45, 0.72, p.shoulder)),
        r: lerp(rNeck, rBelly, lerp(0.42, 0.78, p.shoulder)),
      });
      points.push({ t: neckStart, r: rNeck });
    }
    points.push({ t: 1, r: rRim });
    return points.map((q) => ({ t: q.t, r: Math.max(MIN_RADIUS_MM, q.r) }));
  },
};

const BOWL: FamilyDef = {
  id: 'bowl',
  defaultHeightMm: 80,
  params: [
    { key: 'dRim', min: 60, max: 400, step: 1, default: 210, unit: 'mm' },
    { key: 'dFoot', min: 20, max: 300, step: 1, default: 92, unit: 'mm' },
    { key: 'curvature', min: 0, max: 1, step: 0.01, default: 0.6, unit: 'x' },
    { key: 'baseAngle', min: 0, max: 90, step: 1, default: 0, unit: 'deg' },
    { key: 'footH', min: 0, max: 60, step: 1, default: 8, unit: 'mm' },
    FOOT_FILLET,
    BASE_FILLET,
    { key: 'rimFlare', min: -0.08, max: 0.4, step: 0.01, default: 0, unit: 'x' },
  ],
  footZ: (p, heightMm) => clamp(p.footH / Math.max(1, heightMm), 0, 0.45) * heightMm,
  points(p, heightMm) {
    const rFoot = p.dFoot / 2;
    const rRim = p.dRim / 2;
    const tFoot = clamp(p.footH / Math.max(1, heightMm), 0, 0.45);
    const c = p.curvature;
    // Угол у дна не задан — прежняя стенка: смесь прямой и дуги окружности.
    // У дуги касательная у дна горизонтальна, поэтому от ножки такая стенка
    // всегда уходит полкой; заданный угол переводит стенку на кривую Безье.
    if (p.baseAngle > 0) {
      // Узел ровно на кромке ножки и густая выборка стенки: иначе сплайн
      // профиля сгладил бы излом у дна, и угла там было бы не видно.
      const wall = bowlWall(rFoot, rRim, tFoot * heightMm, heightMm, c, p.baseAngle);
      const points: ProfilePoint[] = [{ t: 0, r: rFoot }];
      if (tFoot > 0) points.push({ t: tFoot, r: rFoot });
      for (let k = 1; k <= WALL_SAMPLES; k++) {
        const t = lerp(tFoot, 1, k / WALL_SAMPLES);
        points.push({ t, r: Math.max(MIN_RADIUS_MM, wall(t * heightMm) * rimFactor(p.rimFlare, t)) });
      }
      return points;
    }
    return sampled(SAMPLES, (t) => {
      if (t <= tFoot) return rFoot;
      const s = (t - tFoot) / (1 - tFoot);
      // c=0 — прямая, c=1 — дуга окружности r = √(1−(1−s)²): стенка круто
      // уходит от дна и приходит к краю вертикально, как у пиалы
      const shape = lerp(s, Math.sqrt(Math.max(0, 1 - (1 - s) * (1 - s))), c);
      return lerp(rFoot, rRim, shape) * rimFactor(p.rimFlare, t);
    });
  },
};

/** Длина ручки Безье, дающая четверть эллипса. */
const QUARTER_ELLIPSE = 0.5523;

/**
 * Стенка миски — кубическая кривая Безье в осевом сечении от кромки ножки
 * (rFoot, zFoot) до края (rRim, H). Угол у дна задаёт направление первой
 * ручки: под ним стенка отходит от дна. Округлость — вторую: 0 — край
 * продолжает хорду (почти конус), 1 — стенка приходит к краю отвесно, как у
 * пиалы. Длины ручек — те же, что у прямой (c = 0) и четверти эллипса
 * (c = 1), между ними линейно.
 *
 * Высоты управляющих точек не убывают, поэтому и высота по кривой монотонна:
 * радиус на заданной высоте находится бисекцией по параметру кривой.
 */
function bowlWall(
  rFoot: number, rRim: number, zFoot: number, heightMm: number, curvature: number, baseAngleDeg: number,
): (z: number) => number {
  const c = clamp(curvature, 0, 1);
  const w = rRim - rFoot;
  const h = Math.max(1e-6, heightMm - zFoot);
  const p1x = lerp(1 / 3, QUARTER_ELLIPSE, c);
  const p1y = lerp(1 / 3, 0, c);
  const p2x = lerp(2 / 3, 1, c);
  const p2y = lerp(2 / 3, 1 - QUARTER_ELLIPSE, c);
  // первая ручка: длина как у формы без угла, направление — по углу
  const angle = (clamp(baseAngleDeg, 0, 90) * Math.PI) / 180;
  const handle = Math.hypot(p1x * w, p1y * h);
  // не выше второй ручки — иначе высота по кривой перестала бы быть монотонной
  const lift = Math.min(handle * Math.sin(angle), p2y * h * 0.95);
  const reach = Math.sign(w || 1) * handle * Math.cos(angle);
  const x = [rFoot, rFoot + reach, rFoot + p2x * w, rRim];
  const y = [zFoot, zFoot + lift, zFoot + p2y * h, heightMm];
  const bezier = (v: number[], u: number): number => {
    const m = 1 - u;
    return m * m * m * v[0] + 3 * m * m * u * v[1] + 3 * m * u * u * v[2] + u * u * u * v[3];
  };
  return (z) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (bezier(y, mid) < z) lo = mid;
      else hi = mid;
    }
    return bezier(x, (lo + hi) / 2);
  };
}

const CUP: FamilyDef = {
  id: 'cup',
  defaultHeightMm: 95,
  params: [
    { key: 'dRim', min: 30, max: 220, step: 1, default: 84, unit: 'mm' },
    { key: 'dFoot', min: 25, max: 200, step: 1, default: 66, unit: 'mm' },
    { key: 'barrel', min: -0.25, max: 0.35, step: 0.01, default: 0.06, unit: 'x' },
    { key: 'rimFlare', min: -0.08, max: 0.4, step: 0.01, default: 0, unit: 'x' },
    BASE_FILLET,
  ],
  points(p, _heightMm) {
    const rFoot = p.dFoot / 2;
    const rRim = p.dRim / 2;
    const rMean = (rFoot + rRim) / 2;
    return sampled(SAMPLES, (t) => {
      const straight = lerp(rFoot, rRim, t);
      return (straight + p.barrel * rMean * Math.sin(Math.PI * t)) * rimFactor(p.rimFlare, t);
    });
  },
};

const VASE: FamilyDef = {
  id: 'vase',
  defaultHeightMm: 260,
  params: [
    { key: 'dBelly', min: 40, max: 320, step: 1, default: 156, unit: 'mm' },
    { key: 'dNeck', min: 12, max: 200, step: 1, default: 54, unit: 'mm' },
    { key: 'dRim', min: 14, max: 260, step: 1, default: 76, unit: 'mm' },
    { key: 'dFoot', min: 18, max: 260, step: 1, default: 78, unit: 'mm' },
    { key: 'bellyAt', min: 0.2, max: 0.7, step: 0.01, default: 0.4, unit: 'x' },
    { key: 'neckAt', min: 0.5, max: 0.95, step: 0.01, default: 0.79, unit: 'x' },
    { key: 'footH', min: 0, max: 90, step: 1, default: 12, unit: 'mm' },
    FOOT_FILLET,
    BASE_FILLET,
    { key: 'rimFlare', min: -0.2, max: 0.8, step: 0.01, default: 0, unit: 'x' },
  ],
  footZ: (p, heightMm) => {
    const bellyAt = clamp(p.bellyAt, 0.12, 0.72);
    const tFoot = clamp(p.footH / Math.max(1, heightMm), 0, bellyAt - 0.06);
    return tFoot > 0.015 ? tFoot * heightMm : 0;
  },
  points(p, heightMm) {
    const rFoot = p.dFoot / 2;
    const rBelly = p.dBelly / 2;
    const rNeck = p.dNeck / 2;
    // Устье задаётся диаметром, отгиб добавляется поверх — так же, как у
    // горшка, где венчик отгибают от горла.
    const rRim = (p.dRim / 2) * (1 + p.rimFlare);
    const bellyAt = clamp(p.bellyAt, 0.12, 0.72);
    const neckAt = clamp(p.neckAt, bellyAt + 0.12, 0.96);
    const tFoot = clamp(p.footH / Math.max(1, heightMm), 0, bellyAt - 0.06);

    const points: ProfilePoint[] = [{ t: 0, r: rFoot }];
    if (tFoot > 0.015) points.push({ t: tFoot, r: rFoot });
    points.push({ t: bellyAt, r: rBelly });
    points.push({ t: neckAt, r: rNeck });
    points.push({ t: 1, r: rRim });
    return points.map((q) => ({ t: q.t, r: Math.max(MIN_RADIUS_MM, q.r) }));
  },
};

export const FAMILIES: FamilyDef[] = [POT, BOWL, CUP, VASE];
export const FAMILY_IDS: string[] = FAMILIES.map((f) => f.id);

export function isFamilyId(id: string): boolean {
  return FAMILIES.some((f) => f.id === id);
}

export function familyById(id: string): FamilyDef {
  const family = FAMILIES.find((f) => f.id === id);
  if (!family) throw new Error(`unknown vessel family: ${id}`);
  return family;
}

export function defaultFamilyParams(id: string): Params {
  const out: Params = {};
  for (const spec of familyById(id).params) out[spec.key] = spec.default;
  return out;
}

/**
 * Приводит произвольный объект к валидному набору параметров семейства:
 * лишние ключи отбрасываются, отсутствующие и нечисловые заменяются
 * дефолтом, остальные зажимаются в диапазон. Единственная точка, через
 * которую в ядро попадают числа из UI и share-ссылок.
 */
export function clampFamilyParams(id: string, raw: Partial<Params>): Params {
  const out: Params = {};
  for (const spec of familyById(id).params) {
    const value = raw[spec.key];
    out[spec.key] = typeof value === 'number' && Number.isFinite(value)
      ? clamp(value, spec.min, spec.max)
      : spec.default;
  }
  return out;
}

export function buildProfile(id: string, raw: Partial<Params>, heightMm: number): ProfileDef {
  const family = familyById(id);
  const params = clampFamilyParams(id, raw);
  const points = family.points(params, heightMm);
  points.sort((a, b) => a.t - b.t);
  const def: ProfileDef = { familyId: id, heightMm, points };
  const baseR = params.baseFillet ?? 0;
  const footR = params.footFillet ?? 0;
  const footZ = family.footZ?.(params, heightMm) ?? 0;
  // без скруглений силуэт остаётся ровно тем, что дало семейство
  if (baseR <= 0 && (footR <= 0 || footZ <= 0)) return def;
  return filleted(def, footZ, footZ > 0 ? footR : 0, baseR);
}

/** Точек на силуэт со скруглениями — плюс сгущение в самих скруглениях. */
const FILLET_PROFILE_POINTS = 160;
const FILLET_ARC_POINTS = 32;
/** Точек кривой, по которым ищется касание окружности. */
const FILLET_PROBE = 400;

interface Point2 {
  r: number;
  z: number;
}

/** Ближайшее расстояние от точки до набора точек и сама ближайшая точка. */
function nearest(c: Point2, points: Point2[]): { d: number; at: Point2 } {
  let best = Infinity;
  let at = points[0];
  for (const p of points) {
    const d = Math.hypot(p.r - c.r, p.z - c.z);
    if (d < best) {
      best = d;
      at = p;
    }
  }
  return { d: best, at };
}

/** Точки кривой r(z) на отрезке высот — густо, для поиска касания. */
function probe(radius: (z: number) => number, from: number, to: number): Point2[] {
  const out: Point2[] = [];
  for (let k = 0; k <= FILLET_PROBE; k++) {
    const z = lerp(from, to, k / FILLET_PROBE);
    out.push({ r: radius(z), z });
  }
  return out;
}

/**
 * Силуэт со скруглениями — катящейся окружностью, как их и делает гончар:
 *
 *  • ножка → тело (вогнутый угол): окружность СНАРУЖИ материала касается
 *    стенки ножки и тела; центр (r_ножки + R, z_c), z_c ищется бисекцией так,
 *    чтобы расстояние до тела стало ровно R;
 *  • кромка дна (выпуклый угол): окружность ВНУТРИ материала касается
 *    основания и стенки; центр (c, R), c — бисекцией по тому же правилу.
 *
 * Дуга заменяет силуэт между точками касания. Высота по дуге монотонна,
 * поэтому силуэт остаётся функцией r(z) и дальше живёт как любой другой:
 * его пересэмплируют густо, со сгущением в скруглениях.
 */
function filleted(def: ProfileDef, footZ: number, footFillet: number, baseFillet: number): ProfileDef {
  const H = def.heightMm;
  const original = (z: number): number => profileRadius(def, z / H);
  const zones: [number, number][] = [];

  // 1. ножка → тело
  let afterFoot = original;
  let footArcFrom = footZ;
  if (footFillet > 0 && footZ > 0) {
    const rFoot = original(0);
    const R = Math.min(footFillet, footZ * 0.9);
    const body = probe(original, footZ, Math.min(H, footZ + 6 * R + 1));
    const cx = rFoot + R;
    let lo = footZ - R;
    let hi = footZ;
    for (let i = 0; i < 48; i++) {
      const mid = (lo + hi) / 2;
      if (nearest({ r: cx, z: mid }, body).d > R) lo = mid;
      else hi = mid;
    }
    const zc = (lo + hi) / 2;
    const touch = nearest({ r: cx, z: zc }, body).at;
    footArcFrom = zc;
    afterFoot = (z) => {
      if (z <= zc) return rFoot;
      if (z <= touch.z) return cx - Math.sqrt(Math.max(0, R * R - (z - zc) * (z - zc)));
      return original(z);
    };
    zones.push([zc, touch.z]);
  }

  // 2. кромка дна
  let final = afterFoot;
  if (baseFillet > 0) {
    const r0 = afterFoot(0);
    // на ножке скругление дна не заходит в скругление ножки
    const room = footFillet > 0 && footZ > 0 ? footArcFrom * 0.95 : H * 0.3;
    const R = Math.min(baseFillet, r0 * 0.45, room);
    const wall = probe(afterFoot, 0, Math.min(H, 4 * R + 1));
    let lo = 0;
    let hi = r0;
    if (R > 0 && nearest({ r: 0, z: R }, wall).d > R) {
      for (let i = 0; i < 48; i++) {
        const mid = (lo + hi) / 2;
        if (nearest({ r: mid, z: R }, wall).d > R) lo = mid;
        else hi = mid;
      }
      const cx = (lo + hi) / 2;
      const touch = nearest({ r: cx, z: R }, wall).at;
      final = (z) => (z < touch.z ? cx + Math.sqrt(Math.max(0, R * R - (R - z) * (R - z))) : afterFoot(z));
      zones.push([0, touch.z]);
    }
  }

  const ts = new Set<number>();
  for (let k = 0; k <= FILLET_PROFILE_POINTS; k++) ts.add(k / FILLET_PROFILE_POINTS);
  for (const [from, to] of zones) {
    for (let k = 0; k <= FILLET_ARC_POINTS; k++) ts.add(clamp(lerp(from, to, k / FILLET_ARC_POINTS) / H, 0, 1));
  }
  const points = [...ts].sort((a, b) => a - b)
    .filter((t, i, all) => i === 0 || t - all[i - 1] > 1e-7)
    .map((t) => ({ t, r: Math.max(MIN_RADIUS_MM, final(t * H)) }));
  return { familyId: def.familyId, heightMm: H, points };
}

/**
 * Радиус силуэта в доле высоты t. Вне [0,1] — крайние значения (не
 * экстраполяция: она уводила бы радиус в минус на крышках).
 */
export function profileRadius(def: ProfileDef, t: number): number {
  const points = def.points;
  if (points.length === 1) return points[0].r;
  if (t <= points[0].t) return points[0].r;
  const last = points[points.length - 1];
  if (t >= last.t) return last.r;

  let i = 0;
  while (i < points.length - 2 && points[i + 1].t <= t) i++;
  const p1 = points[i];
  const p2 = points[i + 1];
  const h = p2.t - p1.t;
  if (h <= 0) return p2.r;

  const [m1, m2] = limitedTangents(points, i);
  const x = (t - p1.t) / h;
  const x2 = x * x;
  const x3 = x2 * x;
  const r =
    (2 * x3 - 3 * x2 + 1) * p1.r +
    (x3 - 2 * x2 + x) * h * m1 +
    (-2 * x3 + 3 * x2) * p2.r +
    (x3 - x2) * h * m2;
  return Math.max(MIN_RADIUS_MM, r);
}

/** Наклон хорды сегмента i (между points[i] и points[i+1]). */
function slope(points: ProfilePoint[], i: number): number {
  const h = points[i + 1].t - points[i].t;
  return h > 0 ? (points[i + 1].r - points[i].r) / h : 0;
}

/**
 * Тангенсы на концах сегмента i, ограниченные по Фричу–Карлсону: на сегменте
 * интерполянт не выходит за [min, max] своих концов, а в локальном экстремуме
 * тангенс зануляется. Ровно это и держит обещание «максимум = dBelly».
 */
function limitedTangents(points: ProfilePoint[], i: number): [number, number] {
  const n = points.length;
  const raw = (k: number): number => {
    if (k === 0) return slope(points, 0);
    if (k === n - 1) return slope(points, n - 2);
    return (slope(points, k - 1) + slope(points, k)) / 2;
  };
  const delta = slope(points, i);
  if (delta === 0) return [0, 0];
  let m1 = raw(i);
  let m2 = raw(i + 1);
  // тангенс, направленный против хорды, породил бы «клюв» — обнуляем
  if (m1 * delta < 0) m1 = 0;
  if (m2 * delta < 0) m2 = 0;
  const a = m1 / delta;
  const b = m2 / delta;
  const norm = a * a + b * b;
  if (norm > 9) {
    const tau = 3 / Math.sqrt(norm);
    m1 = tau * a * delta;
    m2 = tau * b * delta;
  }
  return [m1, m2];
}
