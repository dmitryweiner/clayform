// Шрифты надписей: клеймо на дне и текст на боку. Лежат в public/fonts
// (woff2, подмножества latin и cyrillic, лицензия OFL рядом) и грузятся
// только когда надпись включена: интерфейсу они не нужны. С внешнего CDN не
// тянем — шрифт обязан быть ровно тем же при каждой сборке меша, иначе
// буквы «поплывут». Загрузчик — китовый (`maker-kit/ui/fonts`).

import type { FontFile } from 'maker-kit/ui/fonts';
import { createFontLoader } from 'maker-kit/ui/fonts';
import type { MarkFont } from '../geo/mark';

export const MARK_FONT_FILES: Record<MarkFont, FontFile> = {
  rubik: { family: 'clayform-rubik', label: 'Rubik', file: 'rubik', weight: '700', subsets: ['latin', 'cyrillic'] },
  ptSerif: { family: 'clayform-pt-serif', label: 'PT Serif', file: 'pt-serif', weight: '700', subsets: ['latin', 'cyrillic'] },
  comfortaa: { family: 'clayform-comfortaa', label: 'Comfortaa', file: 'comfortaa', weight: '700', subsets: ['latin', 'cyrillic'] },
  oswald: { family: 'clayform-oswald', label: 'Oswald', file: 'oswald', weight: '600', subsets: ['latin', 'cyrillic'] },
};

export const fonts = createFontLoader(MARK_FONT_FILES, `${import.meta.env.BASE_URL}fonts/`);
