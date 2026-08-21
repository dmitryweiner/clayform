// Ролик (накатка): узоры, которые колесо-штамп оставляет на вращающемся
// изделии. Гончар прикладывает колесо к пояску и прокатывает его за один
// оборот, поэтому за оборот обязано уложиться ЦЕЛОЕ число оттисков —
// иначе на стыке остаётся «недокат». Отсюда округление числа повторов и
// проверка шва в тестах.
//
// Полос может быть несколько: на настоящей посуде поясков обычно два-три,
// разного рисунка и на разной высоте.
//
// Узор живёт на тайле (s, q) ∈ [0,1]²: s — вдоль окружности, q — поперёк
// пояска. Значение 0…1 — доля полной глубины. Тайлу передаются и его
// размеры в миллиметрах: без них точка получилась бы не оттиском шара, а
// растянутым по тайлу эллипсоидом, а линия меандра — разной толщины вдоль
// и поперёк.

export const ROULETTE_PATTERNS = [
  'rope', 'zigzag', 'dots', 'diamonds', 'dashes', 'lattice', 'meander', 'band',
] as const;
export type RoulettePattern = (typeof ROULETTE_PATTERNS)[number];

export interface RouletteBand {
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
  /** просвет между соседними оттисками, мм */
  gapMm: number;
  /** наклон узора: сдвиг вдоль окружности на всю ширину пояска */
  angle: number;
}

export interface RouletteState {
  bands: RouletteBand[];
}

/** Что ролику нужно знать об изделии. */
export interface RouletteContext {
  heightMm: number;
  /** радиус изделия на заданной доле высоты — по нему считается шаг накатки */
  radiusAt(v: number): number;
}

/** Размеры тайла в миллиметрах: от них зависит форма самих элементов. */
export interface TileContext {
  /** ширина самого элемента вдоль окружности (шаг минус просвет), мм */
  elementMm: number;
  /** ширина пояска, мм */
  bandMm: number;
  /** глубина накатки по модулю, мм */
  depthMm: number;
}

const TAU = Math.PI * 2;
/** доля пояска, на которой глубина набирается: колесо въезжает плавно */
const EDGE = 0.12;
/** толщина линии меандра в долях меньшей стороны тайла */
const MEANDER_STROKE = 0.075;

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

/**
 * Классический греческий ключ одной ломаной: рельс по низу, стояк, и от него
 * спираль в полтора оборота. Рельс проходит через весь тайл — им звенья и
 * связываются в непрерывную ленту, как на античных фризах.
 *
 * Ключ занимает почти всю ширину тайла: иначе между звеньями зияет пустое
 * поле, и лента читается как редкие штампики, а не как меандр.
 */
export const MEANDER_PATH: readonly [number, number, number, number][] = [
  [0, 0.15, 1, 0.15],
  [0.95, 0.15, 0.95, 0.85],
  [0.95, 0.85, 0.15, 0.85],
  [0.15, 0.85, 0.15, 0.45],
  [0.15, 0.45, 0.55, 0.45],
];

/** Расстояние в миллиметрах от точки тайла до отрезка тайла. */
function segmentDistanceMm(
  s: number, q: number,
  x0: number, y0: number, x1: number, y1: number,
  tile: TileContext,
): number {
  const ax = (s - x0) * tile.elementMm;
  const ay = (q - y0) * tile.bandMm;
  const bx = (x1 - x0) * tile.elementMm;
  const by = (y1 - y0) * tile.bandMm;
  const lengthSq = bx * bx + by * by;
  const t = lengthSq > 1e-12 ? clamp((ax * bx + ay * by) / lengthSq, 0, 1) : 0;
  return Math.hypot(ax - t * bx, ay - t * by);
}

/** Значение узора на тайле; периодично по s, значения 0…1. */
export function patternValue(
  pattern: RoulettePattern,
  s: number,
  q: number,
  tile: TileContext,
): number {
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
    case 'dots':
      return sphereImprint(s, q, tile);
    case 'diamonds': {
      const m = (Math.abs(frac(s) - 0.5) + Math.abs(q - 0.5)) * 2;
      return smoothstep(1 - m);
    }
    case 'dashes':
      // короткие насечки: окно и вдоль окружности, и поперёк пояска
      return bump(frac(s) - 0.5, 0.22) * bump(q - 0.5, 0.35);
    case 'lattice':
      // две встречные диагонали — классическая сетчатая накатка
      return Math.max(ridge(s - q, 0.22), ridge(s + q, 0.22));
    case 'meander': {
      // Толщину линии меряем в миллиметрах, а не в долях тайла: иначе на
      // вытянутом тайле вертикальные штрихи вышли бы тоньше горизонтальных.
      const half = MEANDER_STROKE * Math.min(tile.elementMm, tile.bandMm);
      let nearest = Infinity;
      const x = frac(s);
      for (const [x0, y0, x1, y1] of MEANDER_PATH) {
        nearest = Math.min(nearest, segmentDistanceMm(x, q, x0, y0, x1, y1, tile));
      }
      return bump(nearest, half);
    }
    case 'band':
      // сплошной полукруглый валик по всей окружности
      return Math.sqrt(Math.max(0, 1 - (2 * q - 1) * (2 * q - 1)));
  }
}

/**
 * Оттиск шара. След круглый в МИЛЛИМЕТРАХ (диаметр — по меньшей стороне
 * тайла), а профиль — настоящий шаровой сегмент: радиус шара подбирается по
 * следу и глубине. Полусферу получаем, когда глубина равна радиусу следа;
 * мелкий оттиск выходит пологим и у края почти касается поверхности, а не
 * обрывается кратером, как сплющенная полусфера.
 */
function sphereImprint(s: number, q: number, tile: TileContext): number {
  const radius = Math.min(tile.elementMm, tile.bandMm) / 2;
  if (radius <= 0) return 0;
  const dx = (frac(s) - 0.5) * tile.elementMm;
  const dy = (q - 0.5) * tile.bandMm;
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) return 0;

  const depth = Math.max(tile.depthMm, 1e-6);
  // шаровой сегмент высотой depth опирается на круг радиуса radius
  const sphere = (radius * radius + depth * depth) / (2 * depth);
  const height = Math.sqrt(Math.max(0, sphere * sphere - distance * distance)) - (sphere - depth);
  return clamp(height / depth, 0, 1);
}

/** Число оттисков за оборот: заданное вручную либо подобранное под квадратный тайл. */
export function bandRepeats(band: RouletteBand, ctx: RouletteContext): number {
  if (band.repeats >= 3) return Math.round(band.repeats);
  const circumference = TAU * Math.max(1, ctx.radiusAt(band.bandCenter));
  // тайл делаем примерно квадратным: шаг по окружности ≈ ширина пояска
  return clamp(Math.round(circumference / Math.max(1, band.bandWidthMm)), 3, REPEATS_MAX);
}

interface PreparedBand {
  pattern: RoulettePattern;
  bottom: number;
  bandH: number;
  repeats: number;
  /** доля шага, занятая самим элементом */
  fill: number;
  depthMm: number;
  angle: number;
  tile: TileContext;
}

/**
 * Готовая функция смещения (u, v) → мм по всем включённым полосам. Число
 * повторов у каждой считается один раз: оно одно на всю полосу, иначе узор
 * поехал бы по высоте.
 */
export function makeRoulette(
  state: RouletteState,
  ctx: RouletteContext,
): (u: number, v: number) => number {
  const prepared: PreparedBand[] = [];
  for (const band of state.bands) {
    if (!band.on || band.depthMm === 0) continue;
    const repeats = bandRepeats(band, ctx);
    const stepMm = (TAU * Math.max(1, ctx.radiusAt(band.bandCenter))) / repeats;
    // просвет шире шага съел бы узор совсем — оставляем элементу хотя бы
    // шестую часть шага
    const fill = clamp(1 - band.gapMm / stepMm, 0.15, 1);
    const bandH = clamp(band.bandWidthMm / Math.max(1, ctx.heightMm), 1e-4, 1);
    prepared.push({
      pattern: band.pattern,
      bottom: band.bandCenter - bandH / 2,
      bandH,
      repeats,
      fill,
      depthMm: band.depthMm,
      angle: band.angle,
      tile: {
        elementMm: stepMm * fill,
        bandMm: band.bandWidthMm,
        depthMm: Math.abs(band.depthMm),
      },
    });
  }
  if (prepared.length === 0) return () => 0;

  return (u, v) => {
    let total = 0;
    for (const band of prepared) {
      const q = (v - band.bottom) / band.bandH;
      if (q < 0 || q > 1) continue;
      // repeats целое, поэтому при u = 2π сдвиг s кратен периоду тайла и
      // рисунок смыкается сам с собой; наклон зависит только от q и шов не рвёт
      const s = band.repeats * (u / TAU) + band.angle * q;
      // просвет: элемент занимает середину шага, остальное — гладкая стенка
      const inside = (frac(s) - 0.5) / band.fill + 0.5;
      if (inside < 0 || inside > 1) continue;
      const edge = smoothstep(q / EDGE) * smoothstep((1 - q) / EDGE);
      total += patternValue(band.pattern, inside, q, band.tile) * edge * band.depthMm;
    }
    return total;
  };
}

// --- дефолты и санация ---

export const REPEATS_MAX = 400;
export const DEPTH_MAX_MM = 8;
export const BAND_MAX_MM = 200;
export const GAP_MAX_MM = 100;
export const MAX_BANDS = 4;

export function defaultBand(): RouletteBand {
  return {
    on: false,
    pattern: 'rope',
    bandCenter: 0.62,
    bandWidthMm: 14,
    depthMm: 1.2,
    repeats: 0,
    gapMm: 0,
    angle: 0,
  };
}

export function defaultRoulette(): RouletteState {
  return { bands: [defaultBand()] };
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

export function sanitizeBand(raw: unknown): RouletteBand {
  const source = asRecord(raw);
  const fallback = defaultBand();
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
    gapMm: clamp(num(source.gapMm, fallback.gapMm), 0, GAP_MAX_MM),
    angle: clamp(num(source.angle, fallback.angle), -2, 2),
  };
}

export function sanitizeRoulette(raw: unknown): RouletteState {
  const source = asRecord(raw);
  if (Array.isArray(source.bands)) {
    return { bands: source.bands.slice(0, MAX_BANDS).map(sanitizeBand) };
  }
  // Состояние до появления нескольких полос выглядело как одна полоса без
  // обёртки. Ссылки и пресеты с ним не должны ломаться.
  if (Object.keys(source).length > 0) return { bands: [sanitizeBand(source)] };
  return defaultRoulette();
}
