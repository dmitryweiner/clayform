// Клеймо на донышке: строка по кругу и лого по центру, вдавленные в дно.
//
// Строку ядро получает готовым растром — полосой, нарисованной шрифтом в
// главном потоке (`ui/markRaster.ts`): шрифтов и canvas ядро не знает.
// Полоса сэмплируется в полярных координатах дна, как тайл накатки: столбец —
// длина дуги, строка — радиус, верх букв к краю дна. Лого — картинка из
// состояния, как орнамент накатки: белое — на всю глубину.
//
// Читается клеймо на перевёрнутом изделии, то есть снизу. Снизу ось x
// зеркальна: точка, которую смотрящий видит в (X, Y), лежит в (−X, Y).
// Строка идёт по часовой стрелке от угла начала, отсчитанного по часовой от
// «двенадцати» — всё как видно снизу.

import type { CapSpec } from './bottom';
import type { Message } from './message';
import type { DecodedImage, RouletteImage } from './roulette';
import { decodeImage, sanitizeImage } from './roulette';

export const MARK_FONTS = ['rubik', 'ptSerif', 'comfortaa', 'oswald'] as const;
export type MarkFont = (typeof MARK_FONTS)[number];

export const MARK_TEXT_MAX = 60;
export const MARK_SIZE_MIN_MM = 2;
export const MARK_SIZE_MAX_MM = 15;
export const MARK_MARGIN_MAX_MM = 30;
export const MARK_DEPTH_MIN_MM = 0.1;
export const MARK_DEPTH_MAX_MM = 1.5;
export const LOGO_MIN_MM = 5;
export const LOGO_MAX_MM = 120;
/** Лого крупнее орнамента накатки: на ⌀30 мм это 0,23 мм на пиксель. */
export const LOGO_MAX_PX = 128;

export interface MarkLogo {
  image: RouletteImage;
  /** поворот по часовой, как видно снизу, ° */
  angleDeg: number;
  /** длинная сторона картинки на дне, мм */
  sizeMm: number;
}

export interface MarkState {
  on: boolean;
  text: string;
  font: MarkFont;
  /** 'YYYY-MM-DD' — запомнена, когда ставили галочку; null — без даты */
  date: string | null;
  /** угол начала строки по часовой от «двенадцати», как видно снизу, ° */
  startDeg: number;
  /** кегль — высота прописной, мм */
  sizeMm: number;
  /** от края плоского дна до верха букв, мм */
  marginMm: number;
  /** глубина оттиска, мм; клеймо всегда вдавлено */
  depthMm: number;
  logo: MarkLogo | null;
}

/** Полоса строки: оттенки серого, ряд 0 — верх букв, белое — на всю глубину. */
export interface MarkRaster {
  w: number;
  h: number;
  pixels: Uint8Array;
  /** размер пикселя на дне, мм — один по обеим осям */
  mmPerPx: number;
}

/** Предел растра строки по стороне, px — с запасом на 60 знаков по 10 px/мм. */
export const MARK_RASTER_MAX_PX = 16384;

/** Растр строки из-за границы (сообщение воркеру) или null, если с ним что-то не так. */
export function sanitizeMarkRaster(raw: unknown): MarkRaster | null {
  const source = asRecord(raw);
  const { w, h, pixels, mmPerPx } = source;
  if (typeof w !== 'number' || typeof h !== 'number' || typeof mmPerPx !== 'number') return null;
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1) return null;
  if (w > MARK_RASTER_MAX_PX || h > MARK_RASTER_MAX_PX) return null;
  if (!Number.isFinite(mmPerPx) || mmPerPx <= 0 || mmPerPx > 1) return null;
  if (!(pixels instanceof Uint8Array) || pixels.length !== w * h) return null;
  return { w, h, pixels, mmPerPx };
}

/** Что сборке изделия нужно от клейма. */
export interface MarkInput {
  state: MarkState;
  /** растр строки; null — строки нет или шрифт ещё не загрузился */
  strip: MarkRaster | null;
}

export function defaultMark(): MarkState {
  return {
    on: false,
    text: '',
    font: 'rubik',
    date: null,
    startDeg: 0,
    sizeMm: 5,
    marginMm: 1.5,
    depthMm: 0.5,
    logo: null,
  };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const num = (x: unknown, fallback: number): number =>
  typeof x === 'number' && Number.isFinite(x) ? x : fallback;

function asRecord(x: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (typeof x === 'object' && x !== null) {
    for (const [key, value] of Object.entries(x)) out[key] = value;
  }
  return out;
}

/** Угол в [0, 360). */
const turn = (deg: number): number => ((deg % 360) + 360) % 360;

/** Строка без управляющих символов, не длиннее предела в символах. */
export function sanitizeMarkText(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  const clean = raw.replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ');
  return [...clean].slice(0, MARK_TEXT_MAX).join('');
}

/** Дата 'YYYY-MM-DD', которая действительно существует; иначе null. */
function sanitizeDate(raw: unknown): string | null {
  if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const [y, m, d] = raw.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? raw : null;
}

function sanitizeLogo(raw: unknown): MarkLogo | null {
  if (raw === null || raw === undefined) return null;
  const source = asRecord(raw);
  const image = sanitizeImage(source.image, LOGO_MAX_PX);
  if (!image) return null;
  return {
    image,
    angleDeg: turn(num(source.angleDeg, 0)),
    sizeMm: clamp(num(source.sizeMm, 25), LOGO_MIN_MM, LOGO_MAX_MM),
  };
}

export function sanitizeMark(raw: unknown): MarkState {
  const source = asRecord(raw);
  const fallback = defaultMark();
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    text: sanitizeMarkText(source.text),
    font: MARK_FONTS.find((font) => font === source.font) ?? fallback.font,
    date: sanitizeDate(source.date),
    startDeg: turn(num(source.startDeg, fallback.startDeg)),
    sizeMm: clamp(num(source.sizeMm, fallback.sizeMm), MARK_SIZE_MIN_MM, MARK_SIZE_MAX_MM),
    marginMm: clamp(num(source.marginMm, fallback.marginMm), 0, MARK_MARGIN_MAX_MM),
    depthMm: clamp(num(source.depthMm, fallback.depthMm), MARK_DEPTH_MIN_MM, MARK_DEPTH_MAX_MM),
    logo: sanitizeLogo(source.logo),
  };
}

/** Сегодня по местному времени — 'YYYY-MM-DD'. */
export function todayIso(now = new Date()): string {
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/**
 * Текст клейма целиком: строка и дата через « · ». Дата — `18.10.2026` при
 * любом языке интерфейса: клеймо — это глина, а не интерфейс.
 */
export function markText(mark: MarkState): string {
  const text = mark.text.trim();
  if (!mark.date) return text;
  const [y, m, d] = mark.date.split('-');
  const date = `${d}.${m}.${y}`;
  return text ? `${text} · ${date}` : date;
}

/** Есть ли что оттискивать: строка, дата или лого. */
export function markActive(mark: MarkState | undefined): boolean {
  return !!mark && mark.on && (markText(mark) !== '' || mark.logo !== null);
}

/** Строка на дне: радиусы полосы и во сколько раз ужат растр. */
export interface MarkLayout {
  /** верх букв */
  rOut: number;
  /** низ полосы */
  rIn: number;
  /** множитель растра: < 1 — строка не влезла по кругу и ужата */
  scale: number;
  warnings: Message[];
}

/** Строка не смыкается сама с собой: между концом и началом — запас. */
const RING_FILL = 0.95;
/** Ближе этого к оси строку не ставим — там ей уже не по кругу. */
const TEXT_MIN_RADIUS_MM = 2;

/**
 * Раскладка строки на плоском дне радиуса `flatMm`. null — строки нет или ей
 * нет места (предупреждение тогда в `warnings` не попадёт — см. noRoom).
 */
export function markLayout(mark: MarkState, strip: MarkRaster | null, flatMm: number): MarkLayout | null {
  if (!strip || strip.w === 0 || strip.h === 0) return null;
  const rOut = flatMm - mark.marginMm;
  const height = strip.h * strip.mmPerPx;
  const length = strip.w * strip.mmPerPx;
  // по средней линии полосы строка обязана уложиться в долю окружности:
  // 2π(rOut − height·s/2)·fill ≥ length·s
  const fit = (2 * Math.PI * rOut * RING_FILL) / (length + Math.PI * RING_FILL * height);
  const scale = Math.min(1, fit);
  const rIn = rOut - height * scale;
  if (rIn < TEXT_MIN_RADIUS_MM) {
    return { rOut, rIn, scale: 0, warnings: [{ code: 'mark.noRoom' }] };
  }
  const warnings: Message[] = scale < 1
    ? [{ code: 'mark.tooLong', params: { pct: Math.round(scale * 100) } }]
    : [];
  return { rOut, rIn, scale, warnings };
}

/** Предупреждения клейма для панели — те же, что видит сборка. */
export function markWarnings(input: MarkInput | undefined, flatMm: number): Message[] {
  if (!input || !markActive(input.state)) return [];
  return markLayout(input.state, input.strip, flatMm)?.warnings ?? [];
}

/** Билинейная выборка по центрам пикселей; вне картинки — 0. */
function sample(pixels: Uint8Array, w: number, h: number, col: number, row: number): number {
  const x = col - 0.5;
  const y = row - 0.5;
  if (x < -0.5 || y < -0.5 || x > w - 0.5 || y > h - 0.5) return 0;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const at = (i: number, j: number): number =>
    i < 0 || j < 0 || i >= w || j >= h ? 0 : pixels[j * w + i] / 255;
  return (at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx) * (1 - fy)
    + (at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx) * fy;
}

let logoCache: { data: string; decoded: DecodedImage | null } | null = null;

/** Декодированное лого; одна картинка на сеанс — не декодировать на каждом кадре. */
function decodedLogo(logo: MarkLogo): DecodedImage | null {
  if (logoCache?.data !== logo.image.data) {
    logoCache = { data: logo.image.data, decoded: decodeImage(logo.image) };
  }
  return logoCache.decoded;
}

/**
 * Глубина оттиска в точке дна (x, y), мм, 0…depth. Положительная — внутрь
 * изделия, то есть по +z.
 */
export function markDepth(input: MarkInput, flatMm: number): ((x: number, y: number) => number) | null {
  const mark = input.state;
  if (!markActive(mark)) return null;
  const layout = markLayout(mark, input.strip, flatMm);
  const strip = layout && layout.scale > 0 ? input.strip : null;
  const logo = mark.logo ? decodedLogo(mark.logo) : null;
  if (!strip && !logo) return null;

  const start = (mark.startDeg * Math.PI) / 180;
  const rMid = layout ? (layout.rIn + layout.rOut) / 2 : 0;
  const stripPx = layout && strip ? strip.mmPerPx * layout.scale : 1;
  const tilt = ((mark.logo?.angleDeg ?? 0) * Math.PI) / 180;
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const logoPx = logo && mark.logo ? mark.logo.sizeMm / Math.max(logo.w, logo.h) : 1;

  return (x, y) => {
    // как видно снизу
    const X = -x;
    const Y = y;
    let value = 0;
    if (strip && layout) {
      const r = Math.hypot(X, Y);
      if (r >= layout.rIn && r <= layout.rOut) {
        const along = (((Math.atan2(X, Y) - start) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        value = sample(strip.pixels, strip.w, strip.h, (along * rMid) / stripPx, (layout.rOut - r) / stripPx);
      }
    }
    if (logo) {
      // лого повёрнуто по часовой: точку возвращаем против часовой
      const lx = X * cos - Y * sin;
      const ly = X * sin + Y * cos;
      const col = lx / logoPx + logo.w / 2;
      const row = logo.h / 2 - ly / logoPx;
      if (col >= 0 && row >= 0 && col <= logo.w && row <= logo.h) {
        const raw = sample(logo.pixels, logo.w, logo.h, col, row);
        value = Math.max(value, logo.invert ? 1 - raw : raw);
      }
    }
    return value * mark.depthMm;
  };
}

/**
 * Дно с клеймом для `geo/bottom.ts`: густая сетка под строкой и под лого,
 * смещение по +z (внутрь изделия). `stepMm` — шаг густой сетки,
 * `maxDepthMm` — сколько дно может отдать оттиску. undefined — клейма нет,
 * дно остаётся веером.
 */
export function markCap(
  input: MarkInput | undefined,
  flatMm: number,
  stepMm: number,
  maxDepthMm = Infinity,
): CapSpec | undefined {
  if (!input) return undefined;
  const depth = markDepth(input, flatMm);
  if (!depth) return undefined;
  const mark = input.state;
  const dense: { from: number; to: number; stepMm: number }[] = [];
  const layout = markLayout(mark, input.strip, flatMm);
  if (layout && layout.scale > 0) dense.push({ from: layout.rIn, to: layout.rOut, stepMm });
  if (mark.logo) dense.push({ from: 0, to: (mark.logo.sizeMm / 2) * Math.SQRT2, stepMm });
  const limit = Math.max(0, maxDepthMm);
  const scale = mark.depthMm > limit ? limit / mark.depthMm : 1;
  return { dense, heightAt: (x, y) => depth(x, y) * scale };
}

/** Шаг густой сетки клейма на сетке стенки из `nu` сегментов, мм. */
export function markStepMm(nu: number): number {
  return clamp(96 / Math.max(nu, 1), 0.2, 1);
}
