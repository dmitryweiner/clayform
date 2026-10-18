// Шрифты клейма. Лежат в public/fonts (woff2, подмножества latin и
// cyrillic, лицензия OFL рядом) и грузятся только когда клеймо включено:
// интерфейсу они не нужны. С внешнего CDN не тянем — шрифт обязан быть ровно
// тем же при каждой сборке меша, иначе строка на дне «поплывёт».

import type { MarkFont } from '../geo/mark';

interface FontFile {
  /** имя семейства в document.fonts — своё, чтобы не спорить со страницей */
  family: string;
  /** имя на кнопке — латиницей, как называется сам шрифт */
  label: string;
  file: string;
  weight: string;
}

export const MARK_FONT_FILES: Record<MarkFont, FontFile> = {
  rubik: { family: 'clayform-rubik', label: 'Rubik', file: 'rubik', weight: '700' },
  ptSerif: { family: 'clayform-pt-serif', label: 'PT Serif', file: 'pt-serif', weight: '700' },
  comfortaa: { family: 'clayform-comfortaa', label: 'Comfortaa', file: 'comfortaa', weight: '700' },
  oswald: { family: 'clayform-oswald', label: 'Oswald', file: 'oswald', weight: '600' },
};

/** Диапазоны подмножеств — как у Google Fonts. */
const RANGES = {
  latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, '
    + 'U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  cyrillic: 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
};

const loading = new Map<MarkFont, Promise<void>>();
const ready = new Set<MarkFont>();

/** Загружен ли шрифт — рисовать им можно прямо сейчас. */
export function fontReady(font: MarkFont): boolean {
  return ready.has(font);
}

/**
 * Загрузка шрифта, один раз на сеанс. Оба подмножества грузим сразу:
 * браузер подтянул бы кириллицу лишь по первой русской букве на холсте, а
 * растр нужен готовым целиком.
 */
export function loadFont(font: MarkFont): Promise<void> {
  const known = loading.get(font);
  if (known) return known;
  const spec = MARK_FONT_FILES[font];
  const faces = (['latin', 'cyrillic'] as const).map((subset) => new FontFace(
    spec.family,
    `url(${import.meta.env.BASE_URL}fonts/${spec.file}-${subset}.woff2) format('woff2')`,
    { weight: spec.weight, unicodeRange: RANGES[subset] },
  ));
  const promise = Promise.all(faces.map((face) => face.load())).then((loaded) => {
    for (const face of loaded) document.fonts.add(face);
    ready.add(font);
  });
  loading.set(font, promise);
  // неудача не навсегда: следующий запрос попробует снова
  promise.catch(() => loading.delete(font));
  return promise;
}
