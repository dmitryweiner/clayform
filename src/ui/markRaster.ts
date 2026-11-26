// Растр строки клейма: строка шрифтом в <canvas> прямой полосой (растр
// текста кита, `maker-kit/ui/textRaster`). По кругу её раскладывает ядро
// (geo/mark.ts) — так сохраняются кернинг и лигатуры, а буквы на дне выходят
// чуть клиновидными, как на монете.

import { rasterizeText } from 'maker-kit/ui/textRaster';
import type { MarkRaster, MarkState } from '../geo/mark';
import { markText } from '../geo/mark';
import { MARK_FONT_FILES, fonts } from './fonts';

/** Поле вокруг строки, px: края глифов не должны упираться в край растра. */
const PAD_PX = 2;

let cache: { key: string; raster: MarkRaster | null } | null = null;

/**
 * Растр строки для текущего клейма или null: строки нет, клеймо выключено
 * либо шрифт ещё грузится. В последнем случае по загрузке зовётся `onReady`
 * — пересобрать изделие уже с буквами. Чужим шрифтом не рисуем: превью
 * «прыгнуло» бы, когда подъедет настоящий.
 */
export function markStrip(mark: MarkState, onReady: () => void): MarkRaster | null {
  const text = mark.on ? markText(mark) : '';
  if (!text) return null;
  if (!fonts.ensure(mark.font, onReady)) return null;
  const key = `${mark.font}|${mark.sizeMm}|${text}`;
  if (cache?.key !== key) cache = { key, raster: render(text, mark) };
  return cache.raster;
}

/**
 * Кегль — высота прописной: её кит меряет у самого шрифта, кегль в пунктах у
 * разных гарнитур даёт очень разные буквы. Верх полосы — верх прописных
 * (или выносных, если они выше): строчные «мама» садятся на ту же линию,
 * что и «МАМА».
 */
function render(text: string, mark: MarkState): MarkRaster | null {
  const raster = rasterizeText({ lines: [text], capMm: mark.sizeMm, font: MARK_FONT_FILES[mark.font], padPx: PAD_PX });
  return raster ? { w: raster.width, h: raster.height, pixels: raster.data, mmPerPx: 1 / raster.pxPerMm } : null;
}
