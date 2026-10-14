// Язык интерфейса: словари, определение языка, шаблоны — и страж от
// непереведённого. Первая же подсказка, написанная мимо словаря, молча
// осталась бы русской в английском интерфейсе; ловим это здесь, а не глазами.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Key } from '../src/i18n';
import { DICTS, LANGS, detectLang, format, hasKey, placeholders } from '../src/i18n';
import { FAMILIES } from '../src/geo/profiles';
import { paramKey } from '../src/ui/params';
import { PRESETS } from '../src/state/presets';

const CYRILLIC = /[А-Яа-яЁё]/;
const KEYS = Object.keys(DICTS.ru).filter(hasKey);
/** Самоназвание языка на кнопке переключения — кириллица в английском законна. */
const ENDONYMS: readonly Key[] = ['lang.switch.title'];
const ENDONYM_TEXTS: readonly string[] = ENDONYMS.map((key) => DICTS.en[key]);

describe('словари', () => {
  it('у английского те же ключи, что у русского', () => {
    expect(Object.keys(DICTS.en).sort()).toEqual(Object.keys(DICTS.ru).sort());
  });

  it('ни одной пустой строки', () => {
    for (const lang of LANGS) {
      for (const key of KEYS) expect(DICTS[lang][key].trim().length, `${lang}:${key}`).toBeGreaterThan(0);
    }
  });

  it('в английском нет кириллицы', () => {
    for (const key of KEYS) {
      if (ENDONYMS.includes(key)) continue;
      expect(DICTS.en[key], key).not.toMatch(CYRILLIC);
    }
  });

  it('параметры шаблонов у обоих языков одни и те же', () => {
    for (const key of KEYS) {
      const ru = [...new Set(placeholders(DICTS.ru[key]))];
      const en = [...new Set(placeholders(DICTS.en[key]))];
      expect(en, key).toEqual(ru);
    }
  });

  it('у множественного числа столько форм, сколько категорий у языка', () => {
    const forms = (template: string): number[] =>
      [...template.matchAll(/\{\w+\|([^}]*)\}/g)].map((match) => match[1].split('|').length);
    for (const key of KEYS) {
      for (const count of forms(DICTS.ru[key])) expect(count, `ru:${key}`).toBe(3);
      for (const count of forms(DICTS.en[key])) expect(count, `en:${key}`).toBe(2);
    }
  });

  it('у каждого параметра каждого семейства есть подпись', () => {
    for (const family of FAMILIES) {
      expect(hasKey(`family.${family.id}`), family.id).toBe(true);
      expect(hasKey(`family.${family.id}.examples`), family.id).toBe(true);
      for (const spec of family.params) {
        expect(paramKey(family.id, spec.key), `${family.id}.${spec.key}`).not.toBeNull();
      }
    }
  });

  it('у каждого встроенного пресета есть имя и пояснение', () => {
    for (const preset of PRESETS) {
      expect(hasKey(`preset.${preset.id}`), preset.id).toBe(true);
      expect(hasKey(`preset.${preset.id}.note`), preset.id).toBe(true);
    }
  });

  it('детали оснастки называются по id', () => {
    for (const id of ['half-A', 'half-B', 'bottom', 'single', 'plug', 'master']) {
      expect(hasKey(`part.${id}`), id).toBe(true);
    }
  });
});

describe('detectLang', () => {
  it('русский — только для ru, остальное английский', () => {
    expect(detectLang(['ru-RU', 'en-US'], null)).toBe('ru');
    expect(detectLang(['ru'], null)).toBe('ru');
    expect(detectLang(['en-GB'], null)).toBe('en');
    expect(detectLang(['uk-UA'], null)).toBe('en');
    expect(detectLang(['be', 'kk'], null)).toBe('en');
    expect(detectLang([], null)).toBe('en');
  });

  it('берёт первый язык списка, для которого есть словарь', () => {
    expect(detectLang(['de-DE', 'ru-RU', 'en'], null)).toBe('ru');
    expect(detectLang(['de-DE', 'en', 'ru'], null)).toBe('en');
  });

  it('сохранённый выбор важнее браузера, мусор в хранилище — нет', () => {
    expect(detectLang(['ru-RU'], 'en')).toBe('en');
    expect(detectLang(['en-US'], 'ru')).toBe('ru');
    expect(detectLang(['ru-RU'], 'klingon')).toBe('ru');
    expect(detectLang(['en-US'], 42)).toBe('en');
  });
});

describe('format', () => {
  it('подставляет параметры, неизвестные оставляет как есть', () => {
    expect(format('⌀{d} × {h} мм', { d: 120, h: '90' }, 'ru')).toBe('⌀120 × 90 мм');
    expect(format('{a} и {b}', { a: 1 }, 'ru')).toBe('1 и {b}');
  });

  it('русское множественное число — три формы', () => {
    const word = (n: number): string => format('{n} {n|оттиск|оттиска|оттисков}', { n }, 'ru');
    expect(word(1)).toBe('1 оттиск');
    expect(word(3)).toBe('3 оттиска');
    expect(word(5)).toBe('5 оттисков');
    expect(word(11)).toBe('11 оттисков');
    expect(word(21)).toBe('21 оттиск');
    expect(word(24)).toBe('24 оттиска');
  });

  it('английское — две', () => {
    const word = (n: number): string => format('{n} {n|part|parts}', { n }, 'en');
    expect(word(1)).toBe('1 part');
    expect(word(2)).toBe('2 parts');
    expect(word(0)).toBe('0 parts');
  });

  it('шаблоны словарей с правдоподобными параметрами не оставляют дыр', () => {
    const params = {
      n: 3, i: 2, k: 74, d: '120', h: '90', v: '1.20', pct: '4.5', deg: '30', step: '12.5', gap: '1.5',
      dims: '120×120×90', error: 'boom', name: 'X', part: 'half A', count: 5,
    };
    for (const lang of LANGS) {
      for (const key of KEYS) {
        const text = format(DICTS[lang][key], params, lang);
        expect(text, `${lang}:${key}`).not.toMatch(/\{|\}|undefined|NaN/);
      }
    }
  });
});

/**
 * Содержимое строковых литералов, шаблонов и регулярок исходника — без
 * комментариев. Разбор грубый, но для нашего кода хватает: регулярка
 * узнаётся по тому, что `/` стоит там, где деление невозможно.
 */
function literals(source: string): string[] {
  const found: string[] = [];
  let prev = '';
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (c === '/' && source[i + 1] === '/') {
      const end = source.indexOf('\n', i);
      i = end < 0 ? source.length : end;
      continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      i = end < 0 ? source.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < source.length && source[j] !== c) j += source[j] === '\\' ? 2 : 1;
      found.push(source.slice(i + 1, j));
      i = j + 1;
      prev = c;
      continue;
    }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};'.includes(prev))) {
      let j = i + 1;
      let inClass = false;
      while (j < source.length && source[j] !== '\n') {
        const d = source[j];
        if (d === '\\') {
          j += 2;
          continue;
        }
        if (d === '[') inClass = true;
        else if (d === ']') inClass = false;
        else if (d === '/' && !inClass) break;
        j++;
      }
      found.push(source.slice(i + 1, j));
      i = j + 1;
      prev = '/';
      continue;
    }
    if (!/\s/.test(c)) prev = c;
    i++;
  }
  return found;
}

describe('страж непереведённого', () => {
  it('разбор литералов отличает строку от комментария', () => {
    expect(literals("// 'нет'\nconst a = 'да'; /* \"нет\" */ const r = /x\\/'y/;")).toEqual(['да', "x\\/'y"]);
  });

  it('в src/ кириллица в строках есть только в русском словаре', () => {
    const root = join(__dirname, '..', 'src');
    const files = readdirSync(root, { recursive: true, encoding: 'utf8' })
      .filter((file) => file.endsWith('.ts') && join('src', file) !== join('src', 'i18n', 'ru.ts'));
    expect(files.length).toBeGreaterThan(20);
    const offenders: string[] = [];
    for (const file of files) {
      for (const text of literals(readFileSync(join(root, file), 'utf8'))) {
        if (CYRILLIC.test(text) && !ENDONYM_TEXTS.includes(text)) offenders.push(`${file}: ${text.slice(0, 60)}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('статическая разметка — английская, перевод через data-i18n', () => {
    const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
    expect(html).not.toMatch(CYRILLIC);
    for (const match of html.matchAll(/data-i18n(?:-title|-aria)?="([^"]+)"/g)) {
      expect(hasKey(match[1]), match[1]).toBe(true);
    }
  });
});
