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

import { decodeBase64 } from './bytes';

export const ROULETTE_PATTERNS = [
  'rope', 'zigzag', 'dots', 'diamonds', 'dashes', 'lattice', 'meander', 'band', 'image',
] as const;
export type RoulettePattern = (typeof ROULETTE_PATTERNS)[number];

/**
 * Непрерывные узоры — лента без разрывов: просвета у них нет, тайлы
 * стыкуются встык. Остальные — одиночные оттиски с гладкой стенкой между.
 */
export const CONTINUOUS: ReadonlySet<RoulettePattern> =
  new Set<RoulettePattern>(['band', 'rope', 'zigzag', 'lattice', 'meander']);
export const isContinuous = (p: RoulettePattern): boolean => CONTINUOUS.has(p);

export interface RouletteBand {
  on: boolean;
  pattern: RoulettePattern;
  /** середина пояска, доля высоты */
  bandCenter: number;
  /** ширина пояска, мм */
  bandWidthMm: number;
  /** глубина, мм; > 0 — выпуклый узор, < 0 — вдавленный */
  depthMm: number;
  /**
   * просвет между соседними оттисками, мм; только у одиночных узоров —
   * непрерывным он не нужен и ими игнорируется
   */
  gapMm: number;
  /** наклон узора: сдвиг вдоль окружности на всю ширину пояска */
  angle: number;
  /** орнамент-картинка для узора 'image'; пока её нет, полоса ничего не делает */
  image?: RouletteImage;
}

/**
 * Орнамент картинкой: оттенки серого, строка за строкой сверху вниз. Белое —
 * на всю глубину, чёрное — гладкая стенка; инверсия меняет их местами. Это
 * не знак глубины (его задаёт ползунок): знак решает, выпуклый узор или
 * вдавленный, а инверсия — рисунок или фон занимает глубину.
 */
export interface RouletteImage {
  w: number;
  h: number;
  /** base64, ровно w·h байт */
  data: string;
  invert: boolean;
}

export const IMAGE_MIN_PX = 4;
export const IMAGE_MAX_PX = 64;

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
  /** декодированная картинка — один раз на полосу, а не на каждый узел */
  image?: DecodedImage;
}

export interface DecodedImage {
  w: number;
  h: number;
  pixels: Uint8Array;
  invert: boolean;
}

/** Байты картинки или null, если данные не те (не base64, не та длина). */
export function decodeImage(image: RouletteImage): DecodedImage | null {
  const pixels = decodeBase64(image.data);
  if (!pixels || pixels.length !== image.w * image.h) return null;
  return { w: image.w, h: image.h, pixels, invert: image.invert };
}

/**
 * Билинейная выборка картинки на тайле: по s с заворотом (тайлы стыкуются),
 * по q с зажимом. Узлы — центры пикселей; q = 1 — верх пояска и верхняя
 * строка картинки.
 */
function imageValue(image: DecodedImage, s: number, q: number): number {
  const { w, h, pixels } = image;
  const x = frac(s) * w - 0.5;
  const y = clamp((1 - q) * h - 0.5, 0, h - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const y1 = Math.min(y0 + 1, h - 1);
  const px = (i: number, j: number): number => pixels[j * w + (((i % w) + w) % w)];
  const top = px(x0, y0) * (1 - tx) + px(x0 + 1, y0) * tx;
  const bottom = px(x0, y1) * (1 - tx) + px(x0 + 1, y1) * tx;
  const value = (top * (1 - ty) + bottom * ty) / 255;
  return image.invert ? 1 - value : value;
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

/**
 * Меандр — линия шириной в клетку, идущая по сетке и повторяющаяся по
 * горизонтали. Поэтому он задан не координатами отрезков, а ASCII-сеткой
 * тайла: строка — ряд клеток сверху вниз, `#` — линия, `.` — пусто, ширина
 * строки — период. Любой вариант с `references/meander-variants.png`
 * добавляется ещё одной такой константой.
 *
 * Классический ключ: рельс, стояк, перекладина и спираль в полтора оборота.
 * Соседние звенья разделены ровно одной пустой клеткой (правый столбец), а
 * рельс идёт через весь тайл и связывает звенья в непрерывную ленту.
 */
export const MEANDER_CLASSIC: readonly string[] = [
  '######.',
  '#....#.',
  '#.##.#.',
  '#.#..#.',
  '#.####.',
  '#......',
  '#######',
];

/** Отрезок в долях тайла: (x0, y0) → (x1, y1); y — доля пояска снизу вверх. */
export type Segment = readonly [number, number, number, number];

export interface GridPattern {
  /** клеток по горизонтали и по вертикали */
  width: number;
  height: number;
  /** осевые линии подряд идущих `#` по рядам и столбцам */
  segments: readonly Segment[];
}

/**
 * Сетка → отрезки по осевым линиям клеток. Отрезки строятся по ПРОГОНАМ
 * подряд идущих `#`, а не по одиночным клеткам: иначе в каждом стыке
 * сходились бы концы соседних отрезков, и всё равно бралось бы одно
 * ближайшее расстояние — но прогон короче и честнее.
 *
 * Ряды периодичны: прогон, упёршийся в правый край, продолжается с левого
 * (координаты тогда выходят за 1 — расстояние всё равно меряется со
 * сдвигом на период). Столбцы — нет: поперёк пояска узор не повторяется.
 */
export function gridPattern(rows: readonly string[]): GridPattern {
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  const cx = (k: number): number => (k + 0.5) / width;
  // ряд 0 — верхний, а q растёт снизу вверх
  const cy = (r: number): number => 1 - (r + 0.5) / height;
  const filled = (r: number, c: number): boolean =>
    rows[r]?.[((c % width) + width) % width] === '#';
  const segments: Segment[] = [];
  // клетки, которые ни в один прогон длиннее одной клетки не попали
  const covered = new Set<string>();

  for (let r = 0; r < height; r++) {
    const y = cy(r);
    if (width > 0 && rows[r].split('').every((ch) => ch === '#')) {
      segments.push([0, y, 1, y]);
      for (let c = 0; c < width; c++) covered.add(`${r},${c}`);
      continue;
    }
    // начинаем обход с пустой клетки, чтобы прогон через шов не разрезать
    const start = rows[r].indexOf('.');
    for (let i = 0; i < width; i++) {
      const c = start + i;
      if (!filled(r, c) || filled(r, c - 1)) continue;
      let end = c;
      while (end + 1 < start + width && filled(r, end + 1)) end++;
      if (end > c) {
        segments.push([cx(c), y, cx(end), y]);
        for (let k = c; k <= end; k++) covered.add(`${r},${k % width}`);
      }
    }
  }
  for (let c = 0; c < width; c++) {
    for (let r = 0; r < height; r++) {
      if (!filled(r, c) || filled(r - 1, c)) continue;
      let end = r;
      while (filled(end + 1, c)) end++;
      if (end > r) {
        segments.push([cx(c), cy(r), cx(c), cy(end)]);
        for (let k = r; k <= end; k++) covered.add(`${k},${c}`);
      }
    }
  }
  // одиночная клетка — точка, отрезок нулевой длины
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (filled(r, c) && !covered.has(`${r},${c}`)) segments.push([cx(c), cy(r), cx(c), cy(r)]);
    }
  }
  return { width, height, segments };
}

const MEANDER = gridPattern(MEANDER_CLASSIC);

/**
 * Отношение ширины тайла к ширине пояска. Тайл перестаёт быть квадратным,
 * если сетка узора не квадратная: клетки должны остаться квадратными.
 */
export function tileAspect(band: Pick<RouletteBand, 'pattern' | 'image'>): number {
  if (band.pattern === 'meander') return MEANDER.width / MEANDER.height;
  // пропорции картинки сохраняются: ширина пояска задаёт её высоту
  if (band.pattern === 'image' && band.image) return band.image.w / band.image.h;
  return 1;
}

/** Расстояние в мм до линии сеточного узора с учётом соседних периодов. */
function gridValue(grid: GridPattern, s: number, q: number, tile: TileContext): number {
  // линия ровно в клетку: половина толщины — полклетки по меньшей стороне
  const half = 0.5 * Math.min(tile.elementMm / grid.width, tile.bandMm / grid.height);
  const x = frac(s);
  let nearest = Infinity;
  for (const [x0, y0, x1, y1] of grid.segments) {
    for (const shift of [-1, 0, 1]) {
      nearest = Math.min(nearest, segmentDistanceMm(x + shift, q, x0, y0, x1, y1, tile));
    }
  }
  return bump(nearest, half);
}

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
    case 'meander':
      // Толщину линии меряем в миллиметрах, а не в долях тайла: иначе на
      // вытянутом тайле вертикальные штрихи вышли бы тоньше горизонтальных.
      return gridValue(MEANDER, s, q, tile);
    case 'band':
      // сплошной полукруглый валик по всей окружности
      return Math.sqrt(Math.max(0, 1 - (2 * q - 1) * (2 * q - 1)));
    case 'image':
      return tile.image ? imageValue(tile.image, s, q) : 0;
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

/** Как полоса ложится на окружность: всё, что из этого следует, — здесь. */
export interface BandLayout {
  /** оттисков за оборот — всегда целое */
  repeats: number;
  /** шаг по окружности, мм */
  stepMm: number;
  /** ширина самого элемента, мм */
  elementMm: number;
  /** фактический просвет, мм; у непрерывных — 0 */
  gapMm: number;
  /** окружность пояска, мм */
  circumferenceMm: number;
}

/**
 * Раскладка полосы по окружности. Размер элемента задаёт ширина пояска (с
 * пропорциями узора), а не просвет: у одиночных узоров шаг = элемент +
 * просвет, и округление числа оттисков достаётся просвету — элемент не
 * плющится в чёрточку оттого, что просвет вырос.
 */
export function bandLayout(band: RouletteBand, ctx: RouletteContext): BandLayout {
  const circumferenceMm = TAU * Math.max(1, ctx.radiusAt(band.bandCenter));
  const element = Math.max(1, band.bandWidthMm) * tileAspect(band);
  const continuous = isContinuous(band.pattern);
  const pitch = continuous ? element : element + band.gapMm;
  const repeats = clamp(Math.round(circumferenceMm / pitch), 3, REPEATS_MAX);
  const stepMm = circumferenceMm / repeats;
  // при упоре в REPEATS_MAX шаг может выйти меньше элемента — тогда
  // элемент занимает весь шаг
  const elementMm = continuous ? stepMm : Math.min(element, stepMm);
  return { repeats, stepMm, elementMm, gapMm: stepMm - elementMm, circumferenceMm };
}

/** Число оттисков за оборот. */
export function bandRepeats(band: RouletteBand, ctx: RouletteContext): number {
  return bandLayout(band, ctx).repeats;
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
    const image = band.pattern === 'image' && band.image ? decodeImage(band.image) : null;
    // узор-картинка без картинки — полоса выключена
    if (band.pattern === 'image' && !image) continue;
    const { repeats, stepMm, elementMm } = bandLayout(band, ctx);
    const fill = elementMm / stepMm;
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
        elementMm,
        bandMm: band.bandWidthMm,
        depthMm: Math.abs(band.depthMm),
        ...(image ? { image } : {}),
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
  const image = source.image === undefined ? undefined : sanitizeImage(source.image);
  // испорченная картинка — не орнамент: откатываемся к узору по умолчанию,
  // а не оставляем пустую полосу, о которой человек не просил
  if (image === null && pattern === 'image') pattern = fallback.pattern;

  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    pattern,
    bandCenter: clamp(num(source.bandCenter, fallback.bandCenter), 0, 1),
    bandWidthMm: clamp(num(source.bandWidthMm, fallback.bandWidthMm), 1, BAND_MAX_MM),
    depthMm: clamp(num(source.depthMm, fallback.depthMm), -DEPTH_MAX_MM, DEPTH_MAX_MM),
    // `repeats` из старых ссылок и пресетов молча отбрасывается: число
    // оттисков теперь всегда подбирается по размеру (bandLayout)
    gapMm: clamp(num(source.gapMm, fallback.gapMm), 0, GAP_MAX_MM),
    angle: clamp(num(source.angle, fallback.angle), -2, 2),
    ...(image ? { image } : {}),
  };
}

/** Картинка или null, если хоть что-то в ней не так. */
function sanitizeImage(raw: unknown): RouletteImage | null {
  const source = asRecord(raw);
  const { w, h, data } = source;
  if (typeof w !== 'number' || typeof h !== 'number' || typeof data !== 'string') return null;
  if (!Number.isInteger(w) || !Number.isInteger(h)) return null;
  if (w < IMAGE_MIN_PX || w > IMAGE_MAX_PX || h < IMAGE_MIN_PX || h > IMAGE_MAX_PX) return null;
  const image: RouletteImage = { w, h, data, invert: source.invert === true };
  return decodeImage(image) ? image : null;
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
