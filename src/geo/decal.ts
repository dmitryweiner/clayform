// Надпись на боку: текст или картинка, лежащие на стенке изделия. Своё
// ядро у неё одно на оба вида — раскладка по стенке, поле, гладкое поле
// под ней, — а тела строит воркер булевыми операциями (`geo/decalSolid.ts`).
//
// Кадр надписи: x — длина дуги по окружности на высоте центра надписи
// (вправо, если смотреть снаружи), y — длина вдоль силуэта (вверх), z — по
// внешней нормали силуэта. Длина вдоль силуэта, а не высота: на миске, чья
// стенка лежит под 30–40° к столу, буквы иначе сплющились бы. По кругу —
// угол, отсчитанный на радиусе центра: вертикальные штрихи идут по
// меридианам, а на пузатом изделии буквы у пуза чуть шире, чем у горла, —
// как у надписи, оттиснутой на круге.
//
// Положение: угол — от стороны, которая смотрит в камеру при открытии
// (модельная −y, между ручкой при x < 0 и носиком при x > 0), плюс — к
// носику; высота — доля высоты центра надписи.

import type { TextRaster } from 'maker-kit/core/raster';
import { sampleField } from 'maker-kit/core/raster';
import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';
import type { DecodedImage } from './roulette';
import type { Message } from './message';

/** Что лежит на стенке: текст главного потока или картинка из состояния. */
export type DecalArt = { kind: 'text'; raster: TextRaster } | { kind: 'image'; picture: DecodedImage; sizeMm: number };

/** Надпись, как её видит сборка: всё уже чистое и зажатое. */
export interface Decal {
  art: DecalArt;
  /** по кругу от «лица», °, плюс — к носику */
  angleDeg: number;
  /** доля высоты центра надписи */
  heightAt: number;
  /** + выпуклое, − вдавленное, мм; вдавленное уже не глубже, чем позволяет стенка */
  depthMm: number;
  /** выше этого, мм от дна, надпись срезается: там начинается заглаженная кромка */
  topMm: number;
}

/** Ниже этого, мм от дна, надписи нет: там дно и его скругление. */
export const DECAL_BOTTOM_MM = 2;
/** Зазор до кромки и до самой себя по кругу, мм. */
const DECAL_GAP_MM = 1;
/** Под надписью и столько вокруг неё рельеф стоит ровным, мм. */
export const CALM_MARGIN_MM = 2;
/** За полем рельеф набирает силу на такой длине, мм. */
export const CALM_FADE_MM = 3;
/** Светлее этого картинка не трогает стенку: шум JPEG и серый фон не в счёт. */
const IMAGE_FLOOR = 0.03;

const TAU = Math.PI * 2;
/** «Лицо» — модельная −y. */
const FRONT = (3 * Math.PI) / 2;

// --- силуэт по длине ---

/** Силуэт таблицей: радиус и длина от дна в узлах v = k / n. */
interface Meridian {
  n: number;
  heightMm: number;
  r: Float64Array;
  s: Float64Array;
}

const MERIDIAN_STEPS = 2048;
const meridians = new WeakMap<ProfileDef, Meridian>();

function meridian(profile: ProfileDef, heightMm: number): Meridian {
  const known = meridians.get(profile);
  if (known && known.heightMm === heightMm) return known;
  const n = MERIDIAN_STEPS;
  const r = new Float64Array(n + 1);
  const s = new Float64Array(n + 1);
  for (let k = 0; k <= n; k++) {
    r[k] = profileRadius(profile, k / n);
    if (k > 0) s[k] = s[k - 1] + Math.hypot(r[k] - r[k - 1], heightMm / n);
  }
  const table = { n, heightMm, r, s };
  meridians.set(profile, table);
  return table;
}

/** Линейно по таблице: значение в доле высоты v. */
function along(table: Meridian, values: Float64Array, v: number): number {
  const x = Math.min(1, Math.max(0, v)) * table.n;
  const k = Math.min(table.n - 1, Math.floor(x));
  const t = x - k;
  return values[k] * (1 - t) + values[k + 1] * t;
}

/** Доля высоты, на которой длина силуэта от дна равна `s`. */
function vAtLength(table: Meridian, s: number): number {
  const { n } = table;
  if (s <= 0) return 0;
  if (s >= table.s[n]) return 1;
  let lo = 0;
  let hi = n;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (table.s[mid] <= s) lo = mid;
    else hi = mid;
  }
  const span = table.s[hi] - table.s[lo];
  return (lo + (span > 0 ? (s - table.s[lo]) / span : 0)) / n;
}

/** Внешняя нормаль силуэта в осевом сечении: (по радиусу, по высоте). */
function normalAt(table: Meridian, v: number): [number, number] {
  const { n } = table;
  const k = Math.min(n - 1, Math.floor(Math.min(1, Math.max(0, v)) * n));
  const dr = table.r[k + 1] - table.r[k];
  const dz = table.heightMm / n;
  const len = Math.hypot(dr, dz);
  return [dz / len, -dr / len];
}

// --- кадр ---

export interface DecalFrame {
  /** угол центра, рад */
  u0: number;
  /** доля высоты центра */
  v0: number;
  /** радиус силуэта на высоте центра, мм */
  r0: number;
  /** точка кадра (мм) → модель */
  toModel(x: number, y: number, z: number): [number, number, number];
  /** точка стенки (u, v) → кадр (x, y) */
  local(u: number, v: number): [number, number];
  /** длина силуэта от центра до доли высоты v, мм */
  lengthTo(v: number): number;
}

export function decalFrame(profile: ProfileDef, heightMm: number, angleDeg: number, heightAt: number): DecalFrame {
  const table = meridian(profile, heightMm);
  const u0 = FRONT + (angleDeg * Math.PI) / 180;
  const v0 = Math.min(1, Math.max(0, heightAt));
  const r0 = Math.max(along(table, table.r, v0), 1e-3);
  const s0 = along(table, table.s, v0);
  return {
    u0,
    v0,
    r0,
    toModel(x, y, z) {
      const v = vAtLength(table, s0 + y);
      const u = u0 + x / r0;
      const [nr, nz] = normalAt(table, v);
      const radius = along(table, table.r, v) + z * nr;
      return [radius * Math.cos(u), radius * Math.sin(u), v * heightMm + z * nz];
    },
    local(u, v) {
      const du = ((((u - u0) % TAU) + TAU + Math.PI) % TAU) - Math.PI;
      return [du * r0, along(table, table.s, v) - s0];
    },
    lengthTo: (v) => along(table, table.s, v) - s0,
  };
}

// --- что и где лежит ---

/** Прямоугольник в кадре, мм. */
export interface Rect {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** Где в кадре лежит рисунок надписи. */
export function artRect(art: DecalArt): Rect {
  if (art.kind === 'text') {
    const { raster } = art;
    const ppm = raster.pxPerMm;
    return {
      x0: -raster.originX / ppm,
      x1: (raster.width - raster.originX) / ppm,
      y0: (raster.originY - raster.height) / ppm,
      y1: raster.originY / ppm,
    };
  }
  const [w, h] = pictureSize(art.picture, art.sizeMm);
  return { x0: -w / 2, x1: w / 2, y0: -h / 2, y1: h / 2 };
}

/** Картинка на стенке, мм: длинная сторона — `sizeMm`. */
export function pictureSize(picture: Pick<DecodedImage, 'w' | 'h'>, sizeMm: number): [number, number] {
  const long = Math.max(picture.w, picture.h, 1);
  return [(sizeMm * picture.w) / long, (sizeMm * picture.h) / long];
}

/**
 * Доля глубины в точке кадра, 0…1: покрытие буквы или яркость картинки
 * (белое — на всю глубину, с инверсией — чёрное). Вне рисунка — 0.
 */
export function artSampler(art: DecalArt): (x: number, y: number) => number {
  const rect = artRect(art);
  const cx = (rect.x0 + rect.x1) / 2;
  const cy = (rect.y0 + rect.y1) / 2;
  const w = rect.x1 - rect.x0;
  const h = rect.y1 - rect.y0;
  if (art.kind === 'text') {
    const { raster } = art;
    return (x, y) => sampleField(raster.data, raster.width, raster.height, w, h, x - cx, y - cy) / 255;
  }
  const { picture } = art;
  return (x, y) => {
    if (x < rect.x0 || x > rect.x1 || y < rect.y0 || y > rect.y1) return 0;
    const raw = sampleField(picture.pixels, picture.w, picture.h, w, h, x - cx, y - cy) / 255;
    const value = picture.invert ? 1 - raw : raw;
    return value < IMAGE_FLOOR ? 0 : value;
  };
}

/** Раскладка надписи на этом изделии. */
export interface DecalLayout {
  frame: DecalFrame;
  /** где лежит рисунок */
  art: Rect;
  /** где ему можно лежать: выше дна, ниже кромки, не внахлёст с собой по кругу */
  room: Rect;
  /** рисунок вылез за `room` и обрезан */
  clipped: boolean;
  /** доля глубины в точке кадра, уже обрезанная по `room` */
  sample(x: number, y: number): number;
}

export function decalLayout(decal: Decal, profile: ProfileDef, heightMm: number): DecalLayout {
  const frame = decalFrame(profile, heightMm, decal.angleDeg, decal.heightAt);
  const art = artRect(decal.art);
  const half = Math.PI * frame.r0 - DECAL_GAP_MM;
  const room: Rect = {
    x0: -half,
    x1: half,
    y0: frame.lengthTo(DECAL_BOTTOM_MM / heightMm),
    y1: frame.lengthTo((decal.topMm - DECAL_GAP_MM) / heightMm),
  };
  const clipped = art.x0 < room.x0 || art.x1 > room.x1 || art.y0 < room.y0 || art.y1 > room.y1;
  const raw = artSampler(decal.art);
  return {
    frame,
    art,
    room,
    clipped,
    sample: (x, y) => (x < room.x0 || x > room.x1 || y < room.y0 || y > room.y1 ? 0 : raw(x, y)),
  };
}

function smoothstep(x: number): number {
  const q = Math.min(1, Math.max(0, x));
  return q * q * (3 - 2 * q);
}

/** Насколько точка (x, y) кадра вне прямоугольника, мм; внутри — 0. */
function outside(rect: Rect, x: number, y: number): number {
  return Math.max(rect.x0 - x, x - rect.x1, rect.y0 - y, y - rect.y1, 0);
}

/** Что надписи делают со стенкой, пока её считает сетка тела. */
export interface DecalField {
  /**
   * Множитель рельефа (волн и накатки), 0…1: под надписью и в поле вокруг
   * неё — 0, дальше плавно до 1. Буквы на волнах не читаются, а булевы
   * операции на почти касающихся поверхностях ненадёжны.
   */
  calm: (u: number, v: number) => number;
  /**
   * Грубый оттиск надписей по сетке тела, мм: им главный поток показывает
   * надпись, пока точную сборку считает воркер.
   */
  proxy: (u: number, v: number) => number;
}

export function decalField(decals: readonly Decal[], profile: ProfileDef, heightMm: number): DecalField {
  const layouts = decals.map((decal) => ({ decal, layout: decalLayout(decal, profile, heightMm) }));
  return {
    calm(u, v) {
      let weight = 1;
      for (const { layout } of layouts) {
        const [x, y] = layout.frame.local(u, v);
        weight *= smoothstep((outside(layout.art, x, y) - CALM_MARGIN_MM) / CALM_FADE_MM);
      }
      return weight;
    },
    proxy(u, v) {
      let depth = 0;
      for (const { decal, layout } of layouts) {
        const [x, y] = layout.frame.local(u, v);
        depth += decal.depthMm * layout.sample(x, y);
      }
      return depth;
    },
  };
}

/**
 * Что сказать о надписи: её обрезала стенка; её вдавили глубже, чем
 * позволила стенка (`requestedDepthMm` — глубина из панели, у надписи —
 * уже зажатая).
 */
export function decalMessages(decal: Decal, requestedDepthMm: number, profile: ProfileDef, heightMm: number): Message[] {
  const text = decal.art.kind === 'text';
  const out: Message[] = [];
  if (decalLayout(decal, profile, heightMm).clipped) out.push({ code: text ? 'text.clipped' : 'image.clipped' });
  if (requestedDepthMm < decal.depthMm - 1e-9) {
    out.push({ code: text ? 'text.tooDeep' : 'image.tooDeep', params: { d: Math.abs(decal.depthMm).toFixed(1) } });
  }
  return out;
}
