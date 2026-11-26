// Картинка на боку изделия: файл в оттенках серого (до 256 px по длинной
// стороне), белое — на всю глубину, как у лого клейма. Хранится в
// состоянии, как орнамент накатки; как ложится на стенку — `geo/decal.ts`.

import type { RouletteImage } from './roulette';
import { sanitizeImage } from './roulette';
import { asRecord, sanitizePlacement } from './sideText';

export interface SideImageState {
  on: boolean;
  image: RouletteImage | null;
  /** длинная сторона картинки на стенке, мм */
  sizeMm: number;
  angleDeg: number;
  heightAt: number;
  depthMm: number;
}

/** На 60 мм это 0,23 мм на пиксель — мельче сопла любого принтера под мастер. */
export const SIDE_IMAGE_MAX_PX = 256;
export const SIDE_IMAGE_SIZE = { min: 10, max: 300 } as const;

export function defaultSideImage(): SideImageState {
  return { on: false, image: null, sizeMm: 50, angleDeg: 0, heightAt: 0.5, depthMm: 1 };
}

export function sanitizeSideImage(raw: unknown): SideImageState {
  const source = asRecord(raw);
  const fallback = defaultSideImage();
  const size = typeof source.sizeMm === 'number' && Number.isFinite(source.sizeMm) ? source.sizeMm : fallback.sizeMm;
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    image: source.image === null || source.image === undefined ? null : sanitizeImage(source.image, SIDE_IMAGE_MAX_PX),
    sizeMm: Math.min(SIDE_IMAGE_SIZE.max, Math.max(SIDE_IMAGE_SIZE.min, size)),
    ...sanitizePlacement(source, fallback),
  };
}
