// Ролик (накатка): узор, который колесо-штамп оставляет на вращающемся
// изделии. Гончар прикладывает колесо к пояску и прокатывает его за один
// оборот, поэтому за оборот обязано уложиться ЦЕЛОЕ число оттисков —
// иначе на стыке остаётся «недокат». Отсюда округление числа повторов и
// проверка шва в тестах.
//
// Узор живёт на единичном тайле (s, q) ∈ [0,1]²: s — вдоль окружности,
// q — поперёк пояска. Значение 0…1 — доля полной глубины.

export const ROULETTE_PATTERNS = ['rope', 'zigzag', 'dots', 'diamonds', 'dashes', 'lattice'] as const;
export type RoulettePattern = (typeof ROULETTE_PATTERNS)[number];

export interface RouletteState {
  on: boolean;
  pattern: RoulettePattern;
  /** середина пояска, доля высоты */
  bandCenter: number;
  /** ширина пояска, мм */
  bandWidthMm: number;
  /** глубина, мм; > 0 — выпуклый узор, < 0 — вдавленный */
  depthMm: number;
  /** число оттисков за оборот; 0 — подобрать автоматически */
  repeats: number;
  /** наклон узора: сдвиг вдоль окружности на всю ширину пояска */
  angle: number;
}

/** Что ролику нужно знать об изделии. */
export interface RouletteContext {
  heightMm: number;
  /** радиус изделия на середине пояска — от него считается шаг накатки */
  bandRadiusMm: number;
}

const TAU = Math.PI * 2;
/** доля пояска, на которой глубина набирается: колесо въезжает плавно */
const EDGE = 0.12;

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const frac = (x: number): number => x - Math.floor(x);

function smoothstep(x: number): number {
  const q = clamp(x, 0, 1);
  return q * q * (3 - 2 * q);
}

/** Валик с косинусным профилем: 1 в гребне x ≡ 0, 0 на расстоянии half. */
function bump(x: number, half: number): number {
  const d = Math.abs(x);
  return d < half ? 0.5 * (1 + Math.cos((Math.PI * d) / half)) : 0;
}

/** Гребень, повторяющийся с периодом 1 по x. */
function ridge(x: number, half = 0.5): number {
  return bump(frac(x + 0.5) - 0.5, half);
}

/** Значение узора на тайле; периодично по s, значения 0…1. */
export function patternValue(pattern: RoulettePattern, s: number, q: number): number {
  switch (pattern) {
    case 'rope':
      // косые валики: за высоту пояска гребень уходит ровно на один шаг
      return ridge(s - q);
    case 'zigzag': {
      // гребень качается вдоль окружности по треугольнику — сходится и
      // сверху, и снизу, поэтому пояски можно ставить встык
      const sway = 0.5 * Math.abs(2 * q - 1);
      return ridge(s - sway, 0.4);
    }
    case 'dots': {
      const ds = (frac(s) - 0.5) * 2;
      const dq = (q - 0.5) * 2;
      const d = Math.hypot(ds, dq);
      return d < 1 ? Math.sqrt(1 - d * d) : 0;
    }
    case 'diamonds': {
      const m = (Math.abs(frac(s) - 0.5) + Math.abs(q - 0.5)) * 2;
      return smoothstep(1 - m);
    }
    case 'dashes': {
      // короткие насечки: окно и вдоль окружности, и поперёк пояска
      return bump(frac(s) - 0.5, 0.22) * bump(q - 0.5, 0.35);
    }
    case 'lattice':
      // две встречные диагонали — классическая сетчатая накатка
      return Math.max(ridge(s - q, 0.22), ridge(s + q, 0.22));
  }
}

/** Число оттисков за оборот: заданное вручную либо подобранное под квадратный тайл. */
export function rouletteRepeats(state: RouletteState, ctx: RouletteContext): number {
  if (state.repeats >= 3) return Math.round(state.repeats);
  const circumference = TAU * Math.max(1, ctx.bandRadiusMm);
  // тайл делаем примерно квадратным: шаг по окружности ≈ ширина пояска
  return clamp(Math.round(circumference / Math.max(1, state.bandWidthMm)), 3, REPEATS_MAX);
}

/**
 * Готовая функция смещения (u, v) → мм. Число повторов считается один раз:
 * оно одно на всё изделие, иначе узор поехал бы по высоте.
 */
export function makeRoulette(
  state: RouletteState,
  ctx: RouletteContext,
): (u: number, v: number) => number {
  if (!state.on || state.depthMm === 0) return () => 0;
  const repeats = rouletteRepeats(state, ctx);
  const bandH = clamp(state.bandWidthMm / Math.max(1, ctx.heightMm), 1e-4, 1);
  const bottom = state.bandCenter - bandH / 2;

  return (u, v) => {
    const q = (v - bottom) / bandH;
    if (q < 0 || q > 1) return 0;
    // repeats целое, поэтому при u = 2π сдвиг s кратен периоду тайла и
    // рисунок смыкается сам с собой; наклон зависит только от q и шов не рвёт
    const s = repeats * (u / TAU) + state.angle * q;
    const edge = smoothstep(q / EDGE) * smoothstep((1 - q) / EDGE);
    return patternValue(state.pattern, s, q) * edge * state.depthMm;
  };
}

// --- дефолты и санация ---

export const REPEATS_MAX = 400;
export const DEPTH_MAX_MM = 8;
export const BAND_MAX_MM = 200;

export function defaultRoulette(): RouletteState {
  return {
    on: false,
    pattern: 'rope',
    bandCenter: 0.62,
    bandWidthMm: 14,
    depthMm: 1.2,
    repeats: 0,
    angle: 0,
  };
}

function asRecord(x: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (typeof x === 'object' && x !== null) {
    for (const [key, value] of Object.entries(x)) out[key] = value;
  }
  return out;
}

const num = (x: unknown, fallback: number): number =>
  typeof x === 'number' && Number.isFinite(x) ? x : fallback;

export function sanitizeRoulette(raw: unknown): RouletteState {
  const source = asRecord(raw);
  const fallback = defaultRoulette();
  let pattern = fallback.pattern;
  for (const candidate of ROULETTE_PATTERNS) if (source.pattern === candidate) pattern = candidate;

  const repeats = num(source.repeats, fallback.repeats);
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    pattern,
    bandCenter: clamp(num(source.bandCenter, fallback.bandCenter), 0, 1),
    bandWidthMm: clamp(num(source.bandWidthMm, fallback.bandWidthMm), 1, BAND_MAX_MM),
    depthMm: clamp(num(source.depthMm, fallback.depthMm), -DEPTH_MAX_MM, DEPTH_MAX_MM),
    // < 3 означает «подбирай сам»; иначе целое число оттисков
    repeats: repeats < 3 ? 0 : clamp(Math.round(repeats), 3, REPEATS_MAX),
    angle: clamp(num(source.angle, fallback.angle), -2, 2),
  };
}
