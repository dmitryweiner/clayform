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

export interface ParamSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  /** 'mm' — миллиметры, 'x' — доля/коэффициент (показываем без единиц) */
  unit: 'mm' | 'x';
  hint?: string;
}

export interface FamilyDef {
  id: string;
  label: string;
  /** что попадает в это семейство — подсказка в UI */
  examples: string;
  defaultHeightMm: number;
  params: ParamSpec[];
  /** контрольные точки силуэта; параметры уже зажаты clampFamilyParams */
  points(p: Params, heightMm: number): ProfilePoint[];
}

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

// --- семейства ---

const POT: FamilyDef = {
  id: 'pot',
  label: 'Горшок',
  examples: 'горшок, крынка, корчага, канопка',
  defaultHeightMm: 150,
  params: [
    { key: 'dBelly', label: 'Тулово', min: 40, max: 320, step: 1, default: 170, unit: 'mm' },
    { key: 'dNeck', label: 'Горло', min: 20, max: 300, step: 1, default: 108, unit: 'mm' },
    { key: 'dFoot', label: 'Дно', min: 20, max: 300, step: 1, default: 104, unit: 'mm' },
    { key: 'bellyAt', label: 'Высота тулова', min: 0.25, max: 0.8, step: 0.01, default: 0.52, unit: 'x' },
    { key: 'shoulder', label: 'Плечо', min: 0, max: 1, step: 0.01, default: 0.45, unit: 'x',
      hint: 'резкость перехода тулово → горло' },
    { key: 'neckH', label: 'Высота горла', min: 0, max: 0.4, step: 0.01, default: 0.16, unit: 'x' },
    { key: 'rimFlare', label: 'Отгиб венчика', min: -0.1, max: 0.6, step: 0.01, default: 0.18, unit: 'x' },
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
  label: 'Миска',
  examples: 'миска, тарелка, пиала, килик',
  defaultHeightMm: 80,
  params: [
    { key: 'dRim', label: 'Верх', min: 60, max: 400, step: 1, default: 210, unit: 'mm' },
    { key: 'dFoot', label: 'Дно', min: 20, max: 300, step: 1, default: 92, unit: 'mm' },
    { key: 'curvature', label: 'Округлость', min: 0, max: 1, step: 0.01, default: 0.6, unit: 'x',
      hint: '0 — прямой конус, 1 — полусфера' },
    { key: 'footH', label: 'Ножка', min: 0, max: 60, step: 1, default: 8, unit: 'mm' },
    { key: 'rimFlare', label: 'Отгиб края', min: -0.08, max: 0.4, step: 0.01, default: 0, unit: 'x' },
  ],
  points(p, heightMm) {
    const rFoot = p.dFoot / 2;
    const rRim = p.dRim / 2;
    const tFoot = clamp(p.footH / Math.max(1, heightMm), 0, 0.45);
    const c = p.curvature;
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

const CUP: FamilyDef = {
  id: 'cup',
  label: 'Чашка',
  examples: 'чашка, стакан, кружка, скифос',
  defaultHeightMm: 95,
  params: [
    { key: 'dRim', label: 'Верх', min: 30, max: 220, step: 1, default: 84, unit: 'mm' },
    { key: 'dFoot', label: 'Дно', min: 25, max: 200, step: 1, default: 66, unit: 'mm' },
    { key: 'barrel', label: 'Бочка', min: -0.25, max: 0.35, step: 0.01, default: 0.06, unit: 'x',
      hint: '>0 — выпуклые бока, <0 — талия' },
    { key: 'rimFlare', label: 'Отгиб края', min: -0.08, max: 0.4, step: 0.01, default: 0, unit: 'x' },
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
  label: 'Ваза',
  examples: 'ваза, амфора, кувшин, бутылка, лекиф',
  defaultHeightMm: 260,
  params: [
    { key: 'dBelly', label: 'Тулово', min: 40, max: 320, step: 1, default: 156, unit: 'mm' },
    { key: 'dNeck', label: 'Горло', min: 12, max: 200, step: 1, default: 54, unit: 'mm' },
    { key: 'dRim', label: 'Устье', min: 14, max: 260, step: 1, default: 76, unit: 'mm' },
    { key: 'dFoot', label: 'Дно', min: 18, max: 260, step: 1, default: 78, unit: 'mm' },
    { key: 'bellyAt', label: 'Высота тулова', min: 0.2, max: 0.7, step: 0.01, default: 0.4, unit: 'x' },
    { key: 'neckAt', label: 'Высота горла', min: 0.5, max: 0.95, step: 0.01, default: 0.79, unit: 'x' },
    { key: 'footH', label: 'Ножка', min: 0, max: 90, step: 1, default: 12, unit: 'mm' },
    { key: 'rimFlare', label: 'Отгиб венчика', min: -0.2, max: 0.8, step: 0.01, default: 0, unit: 'x',
      hint: 'раструб сверх диаметра устья' },
  ],
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
  return { familyId: id, heightMm, points };
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
