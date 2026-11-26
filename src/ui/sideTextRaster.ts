// Растр текста на боку: строки шрифтом в <canvas> (растр текста кита,
// `maker-kit/ui/textRaster`), по центру, кегль — высота прописной. Как он
// ложится на стенку, решает ядро (`geo/decal.ts`); воркер получает его в
// задаче и обводит контуры букв.

import type { TextRaster } from 'maker-kit/core/raster';
import { rasterizeText } from 'maker-kit/ui/textRaster';
import type { SideTextState } from '../geo/sideText';
import { SIDE_TEXT_SPACING, sideTextLines } from '../geo/sideText';
import { MARK_FONT_FILES, fonts } from './fonts';

/** Поле вокруг строк, px: края глифов не должны упираться в край растра. */
const PAD_PX = 4;

let cache: { key: string; raster: TextRaster | null } | null = null;

/**
 * Растр текста или null: текст выключен, пуст или шрифт ещё грузится — тогда
 * по загрузке зовётся `onReady`, пересобрать уже с буквами. Чужим шрифтом
 * не рисуем: превью «прыгнуло» бы, когда подъедет настоящий.
 */
export function sideTextRaster(text: SideTextState, onReady: () => void): TextRaster | null {
  const lines = text.on ? sideTextLines(text) : [];
  if (lines.length === 0) return null;
  if (!fonts.ensure(text.font, onReady)) return null;
  const key = `${text.font}|${text.sizeMm}|${lines.join('\n')}`;
  if (cache?.key !== key) {
    const raster = rasterizeText({
      lines,
      capMm: text.sizeMm,
      font: MARK_FONT_FILES[text.font],
      lineSpacing: SIDE_TEXT_SPACING,
      align: 'center',
      origin: 'middle',
      padPx: PAD_PX,
    });
    cache = { key, raster };
  }
  return cache.raster;
}
