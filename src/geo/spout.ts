// Носик. Два разных по природе способа налить из посуды:
//
//  'lip'     — оттянутый край, как у крынки или кувшина. Это деформация
//              стенки, а не приставная деталь: гончар оттягивает край
//              пальцем, и глина уходит наружу без шва. CSG здесь не нужен, а
//              форма остаётся телом вращения с локальным вытягом —
//              двухчастная гипсовая форма снимается с неё так же легко, как
//              с гладкой.
//  'applied' — трубка, приставленная к тулову, как у чайника. Тут без
//              булевых операций не обойтись: снаружи трубку приклеивают
//              объединением, а проход сквозь стенку прорезают вычитанием
//              внутреннего канала.
//
// Носик всегда смотрит в +x, то есть лежит в плоскости разъёма напротив
// ручки. У оттянутого края смещение идёт только наружу: так стенка полого
// изделия в месте слива может стать толще, но никогда — тоньше.

import type { SurfaceMesh } from './surface';
import type { Vec3 } from './sweep';
import { bezier, bezierTangent, sweepTube } from './sweep';
import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';
import { embedDepth } from './attach';

export type SpoutKind = 'lip' | 'applied';

export interface SpoutState {
  on: boolean;
  /** 'lip' — оттянутый край; 'applied' — приставная трубка */
  kind: SpoutKind;

  // --- оттянутый край ---
  /** насколько край вытянут наружу, мм */
  pullMm: number;
  /** угловая ширина слива, градусы */
  widthDeg: number;
  /** по какой доле высоты сверху идёт вытяг */
  zone: number;

  // --- приставная трубка ---
  /** высота крепления оси носика к стенке, доля высоты */
  attachAt: number;
  /** горизонтальный вынос кончика от стенки, мм */
  lengthMm: number;
  /** высота кончика, доля высоты изделия; > 1 — выше венчика */
  tipAt: number;
  /** наружный диаметр у основания, мм */
  baseMm: number;
  /** наружный диаметр у кончика, мм */
  tipMm: number;
  /** наклон кончика к горизонтали, градусы */
  tipAngleDeg: number;
}

export const PULL_MAX_MM = 60;

interface Limit {
  min: number;
  max: number;
}

/** Пределы ползунков приставного носика: одни и те же для UI и для санатора. */
export const SPOUT_LIMITS: Record<
  'attachAt' | 'lengthMm' | 'tipAt' | 'baseMm' | 'tipMm' | 'tipAngleDeg',
  Limit
> = {
  attachAt: { min: 0.2, max: 0.85 },
  lengthMm: { min: 15, max: 150 },
  tipAt: { min: 0.5, max: 1.3 },
  baseMm: { min: 12, max: 80 },
  tipMm: { min: 6, max: 40 },
  tipAngleDeg: { min: 20, max: 85 },
};

/** Носик не должен смотреть вниз: из него бы выливалось. */
const TIP_ABOVE_ATTACH = 0.1;

export function defaultSpout(): SpoutState {
  return {
    on: false,
    kind: 'lip',
    pullMm: 14,
    widthDeg: 60,
    zone: 0.18,
    attachAt: 0.45,
    lengthMm: 70,
    tipAt: 1,
    baseMm: 34,
    tipMm: 16,
    tipAngleDeg: 55,
  };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function sanitizeSpout(raw: unknown): SpoutState {
  const fallback = defaultSpout();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;
  const within = (key: keyof typeof SPOUT_LIMITS, value: unknown): number => {
    const limit = SPOUT_LIMITS[key];
    return clamp(num(value, fallback[key]), limit.min, limit.max);
  };

  const attachAt = within('attachAt', source.attachAt);
  const baseMm = within('baseMm', source.baseMm);
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    // Старые ссылки и пресеты поля kind не знают — и означают оттянутый край.
    kind: source.kind === 'applied' ? 'applied' : 'lip',
    pullMm: clamp(num(source.pullMm, fallback.pullMm), 0, PULL_MAX_MM),
    widthDeg: clamp(num(source.widthDeg, fallback.widthDeg), 15, 180),
    zone: clamp(num(source.zone, fallback.zone), 0.03, 0.6),
    attachAt,
    lengthMm: within('lengthMm', source.lengthMm),
    tipAt: clamp(
      num(source.tipAt, fallback.tipAt),
      Math.max(SPOUT_LIMITS.tipAt.min, attachAt + TIP_ABOVE_ATTACH),
      SPOUT_LIMITS.tipAt.max,
    ),
    baseMm,
    // трубка сужается к устью, а не раздувается
    tipMm: Math.min(within('tipMm', source.tipMm), baseMm),
    tipAngleDeg: within('tipAngleDeg', source.tipAngleDeg),
  };
}

function smoothstep(x: number): number {
  const q = clamp(x, 0, 1);
  return q * q * (3 - 2 * q);
}

/**
 * Радиальное смещение наружу в точке (u, v), мм — только для оттянутого края.
 *
 * Центр слива приходится ровно на шов u = 0 / 2π, поэтому окно считается от
 * ЗАМКНУТОГО углового расстояния: у косинусного горба в вершине нулевая
 * производная, и через шов носик проходит гладко.
 *
 * У приставной трубки вытяга нет вовсе: две механики не складываются.
 */
export function makeSpout(state: SpoutState): (u: number, v: number) => number {
  if (!state.on || state.kind !== 'lip' || state.pullMm === 0) return () => 0;
  const halfWidth = (state.widthDeg * Math.PI) / 360;
  const zoneStart = 1 - state.zone;

  return (u, v) => {
    if (v <= zoneStart) return 0;
    const angle = Math.abs(((u + Math.PI) % (2 * Math.PI)) - Math.PI);
    if (angle >= halfWidth) return 0;
    const across = 0.5 * (1 + Math.cos((Math.PI * angle) / halfWidth));
    return state.pullMm * across * smoothstep((v - zoneStart) / state.zone);
  };
}

// --- приставная трубка ---

/**
 * Насколько основание утоплено в стенку СВЕРХ того, что нужно, чтобы кромка
 * торца ушла внутрь тела. Это и есть та самая «вдавленность»: трубку
 * приставляют к стенке и прижимают, а не приклеивают встык.
 */
const EMBED_MM = 2.5;
/** Глубже этой доли радиуса стенки трубку не топим: продавит насквозь. */
const MAX_EMBED_FRACTION = 0.6;
/** Запас, на который канал уходит внутрь полости за стенку изделия, мм. */
const PIERCE_MM = 3;
/** Насколько канал выходит за кончик трубки, вскрывая устье, мм. */
const MOUTH_MM = 4;
/** Тоньше канал вырождается, и никакой посуде такой проход не нужен. */
const MIN_CHANNEL_MM = 1.2;
/** Вынос управляющих точек в долях расстояния между креплением и кончиком. */
const BOW = 0.35;
const SEGMENTS = 64;
const RING = 24;

interface SpoutCurve {
  p0: Vec3;
  c0: Vec3;
  c1: Vec3;
  p1: Vec3;
  /** касательные на концах, единичные */
  tan0: Vec3;
  tan1: Vec3;
  /**
   * Вынос управляющих точек. |dB/dt| на обоих концах равен ровно 3·d — этим
   * пересчитываются миллиметры продления в параметр кривой.
   */
  d: number;
  baseR: number;
  tipR: number;
}

/**
 * Дуга носика в плоскости разъёма. Проще ручки: точность выноса тут не
 * обещана ползунком («длина» меряется до кончика, а не по дуге), поэтому
 * подбирать вынос управляющих точек не нужно.
 *
 * Касательная у стенки горизонтальна — стык под 90°, как у ручки: и прочнее,
 * и разъём формы проходит ровно вдоль дуги. У кончика касательная задана
 * ползунком наклона: это и есть та самая чайниковая дуга.
 */
function spoutCurve(state: SpoutState, profile: ProfileDef, heightMm: number): SpoutCurve {
  const attachR = profileRadius(profile, state.attachAt);
  // Трубка выходит из стенки по горизонтали, сечение круглое.
  const embed = embedDepth({
    profile,
    heightMm,
    at: state.attachAt,
    tangent: { radial: 1, up: 0 },
    halfDepth: state.baseMm / 2,
    halfWidth: state.baseMm / 2,
    marginMm: EMBED_MM,
    maxFraction: MAX_EMBED_FRACTION,
  });
  const angle = (state.tipAngleDeg * Math.PI) / 180;

  const p0: Vec3 = { x: attachR - embed, y: 0, z: state.attachAt * heightMm };
  const p1: Vec3 = { x: attachR + state.lengthMm, y: 0, z: state.tipAt * heightMm };
  const tan0: Vec3 = { x: 1, y: 0, z: 0 };
  const tan1: Vec3 = { x: Math.cos(angle), y: 0, z: Math.sin(angle) };
  const d = BOW * Math.hypot(p1.x - p0.x, p1.z - p0.z);

  return {
    p0,
    p1,
    c0: { x: p0.x + tan0.x * d, y: 0, z: p0.z + tan0.z * d },
    c1: { x: p1.x - tan1.x * d, y: 0, z: p1.z - tan1.z * d },
    tan0,
    tan1,
    d,
    baseR: state.baseMm / 2,
    tipR: state.tipMm / 2,
  };
}

/**
 * Точка дуги, честно продолженной за оба конца по касательной. Прямое
 * продолжение, а не экстраполяция Безье: кривая и так выходит из концов по
 * этим касательным, так что стык гладкий, а прямая не завернётся при большом
 * продлении (стенка бывает и в 60 мм).
 */
function curvePoint(curve: SpoutCurve, t: number): Vec3 {
  if (t < 0 || t > 1) {
    const past = t < 0 ? t : t - 1;
    const from = t < 0 ? curve.p0 : curve.p1;
    const dir = t < 0 ? curve.tan0 : curve.tan1;
    return { x: from.x + dir.x * past * 3 * curve.d, y: 0, z: from.z + dir.z * past * 3 * curve.d };
  }
  return bezier(curve.p0, curve.c0, curve.c1, curve.p1, t);
}

function curveTangent(curve: SpoutCurve, t: number): Vec3 {
  if (t < 0) return curve.tan0;
  if (t > 1) return curve.tan1;
  return bezierTangent(curve.p0, curve.c0, curve.c1, curve.p1, t);
}

/** Есть ли что строить: трубка бывает только у включённого applied-носика. */
function applies(state: SpoutState): boolean {
  return state.on && state.kind === 'applied';
}

/**
 * Наружная трубка носика; null, если носик выключен или это оттянутый край.
 * Замкнутая труба с плоскими торцами: основание прячется в стенке при
 * объединении, а торец у кончика вскрывает канал.
 */
export function buildAppliedSpout(
  state: SpoutState,
  profile: ProfileDef,
  heightMm: number,
): SurfaceMesh | null {
  if (!applies(state)) return null;
  const curve = spoutCurve(state, profile, heightMm);
  return sweepTube(
    (t) => bezier(curve.p0, curve.c0, curve.c1, curve.p1, t),
    (t) => bezierTangent(curve.p0, curve.c0, curve.c1, curve.p1, t),
    (t) => {
      const r = lerp(curve.baseR, curve.tipR, t);
      return { halfDepth: r, halfWidth: r };
    },
    SEGMENTS,
    RING,
  );
}

/**
 * Внутренний канал носика под вычитание: та же дуга, радиусы меньше на
 * стенку. Продлён за оба конца — назад настолько, чтобы наверняка пробить
 * стенку изделия и войти в полость, вперёд на несколько миллиметров, чтобы
 * вскрыть торец трубки. Плоские веерные торцы у канала законны: он
 * существует только как вычитаемое и наружу не выходит.
 *
 * Стенку канала диктует вызывающий — у носика она та же, что у тела.
 */
export function appliedSpoutChannel(
  state: SpoutState,
  profile: ProfileDef,
  heightMm: number,
  wallMm: number,
): SurfaceMesh | null {
  if (!applies(state)) return null;
  const curve = spoutCurve(state, profile, heightMm);

  // Назад — до полости, но не дальше оси: за осью канал вышел бы в
  // противоположную стенку и просверлил в ней дыру.
  const back = Math.max(0, Math.min(wallMm + PIERCE_MM, curve.p0.x));
  const from = -back / (3 * curve.d);
  const to = 1 + MOUTH_MM / (3 * curve.d);
  const at = (s: number): number => lerp(from, to, s);

  return sweepTube(
    (s) => curvePoint(curve, at(s)),
    (s) => curveTangent(curve, at(s)),
    (s) => {
      const r = Math.max(
        MIN_CHANNEL_MM,
        lerp(curve.baseR, curve.tipR, clamp(at(s), 0, 1)) - wallMm,
      );
      return { halfDepth: r, halfWidth: r };
    },
    SEGMENTS,
    RING,
  );
}
