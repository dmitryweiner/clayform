// Растр строки клейма: строка шрифтом в <canvas> прямой полосой. По кругу её
// раскладывает ядро (geo/mark.ts) — так сохраняются кернинг и лигатуры, а
// буквы на дне выходят чуть клиновидными, как на монете.

import type { MarkRaster, MarkState } from '../geo/mark';
import { markText } from '../geo/mark';
import { MARK_FONT_FILES, fontReady, loadFont } from './fonts';

/** Пикселей на миллиметр дна: штрих в 0,8 мм — восемь пикселей. */
const PX_PER_MM = 10;
/** Поле вокруг строки, px: края глифов не должны упираться в край растра. */
const PAD_PX = 2;

let cache: { key: string; raster: MarkRaster | null } | null = null;
/** шрифты, по загрузке которых уже обещана пересборка */
const waiting = new Set<string>();

/**
 * Растр строки для текущего клейма или null: строки нет, клеймо выключено
 * либо шрифт ещё грузится. В последнем случае по загрузке зовётся `onReady`
 * — пересобрать изделие уже с буквами. Чужим шрифтом не рисуем: превью
 * «прыгнуло» бы, когда подъедет настоящий.
 */
export function markStrip(mark: MarkState, onReady: () => void): MarkRaster | null {
  const text = mark.on ? markText(mark) : '';
  if (!text) return null;
  if (!fontReady(mark.font)) {
    if (!waiting.has(mark.font)) {
      waiting.add(mark.font);
      const done = (): void => {
        waiting.delete(mark.font);
      };
      void loadFont(mark.font).then(() => {
        done();
        onReady();
      }, done);
    }
    return null;
  }
  const key = `${mark.font}|${mark.sizeMm}|${text}`;
  if (cache?.key !== key) cache = { key, raster: render(text, mark) };
  return cache.raster;
}

function render(text: string, mark: MarkState): MarkRaster | null {
  const spec = MARK_FONT_FILES[mark.font];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  // Кегль — высота прописной: меряем её у самого шрифта, кегль в пунктах у
  // разных гарнитур даёт очень разные буквы.
  const probe = 100;
  ctx.font = `${spec.weight} ${probe}px "${spec.family}"`;
  const cap = ctx.measureText('H').actualBoundingBoxAscent / probe;
  const px = (mark.sizeMm * PX_PER_MM) / Math.max(cap, 0.3);
  ctx.font = `${spec.weight} ${px}px "${spec.family}"`;
  const metrics = ctx.measureText(text);
  const ascent = Math.ceil(metrics.actualBoundingBoxAscent);
  const descent = Math.ceil(metrics.actualBoundingBoxDescent);
  const left = Math.ceil(metrics.actualBoundingBoxLeft);
  const width = Math.ceil(Math.max(metrics.width, left + metrics.actualBoundingBoxRight)) + 2 * PAD_PX;
  const height = ascent + descent + 2 * PAD_PX;
  if (width < 1 || height < 1) return null;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  ctx.font = `${spec.weight} ${px}px "${spec.family}"`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, PAD_PX + left, PAD_PX + ascent);
  const rgba = ctx.getImageData(0, 0, width, height).data;
  const pixels = new Uint8Array(width * height);
  for (let i = 0; i < pixels.length; i++) pixels[i] = rgba[i * 4];
  return { w: width, h: height, pixels, mmPerPx: 1 / PX_PER_MM };
}
