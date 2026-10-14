// Язык интерфейса. Своя крошечная обвязка вместо библиотеки: словарей два,
// ключи проверяет tsc (`Key` выведен из русского словаря-эталона, английский
// обязан иметь те же), а подстановки и множественное число укладываются
// в одну регулярку.
//
// Шаблон: `{name}` — подстановка параметра; `{n|оттиск|оттиска|оттисков}` —
// слово по числу n: формы идут в порядке категорий Intl.PluralRules языка
// (у русского one/few/many, у английского one/other).
//
// Язык держится здесь, а не в AppState: в ссылку и в файл пресета он не
// попадает — открывший чужую ссылку видит её на своём языке.

import { ru, LEGACY_PRESET_PREFIX } from './ru';
import { en } from './en';
import type { Message } from '../geo/message';

export type Lang = 'ru' | 'en';
export const LANGS: readonly Lang[] = ['ru', 'en'];
export type Key = keyof typeof ru;
export type Params = Readonly<Record<string, string | number>>;

export const DICTS: Readonly<Record<Lang, Readonly<Record<Key, string>>>> = { ru, en };

/** Ключ localStorage: ручной выбор языка, важнее настроек браузера. */
export const LANG_KEY = 'clayform_lang';

/** Порядок форм в `{n|…}` — категории Intl.PluralRules этого языка. */
const PLURAL_ORDER: Record<Lang, readonly Intl.LDMLPluralRule[]> = {
  ru: ['one', 'few', 'many'],
  en: ['one', 'other'],
};

let current: Lang = 'en';
const listeners = new Set<(lang: Lang) => void>();

export function isLang(value: unknown): value is Lang {
  return value === 'ru' || value === 'en';
}

/**
 * Язык из сохранённого выбора, а без него — из настроек браузера: первый
 * язык списка, для которого есть словарь. Не нашли — английский.
 */
export function detectLang(languages: readonly string[], stored: unknown): Lang {
  if (isLang(stored)) return stored;
  for (const tag of languages) {
    const primary = tag.toLowerCase().split(/[-_]/)[0];
    if (isLang(primary)) return primary;
  }
  return 'en';
}

/** Определяет язык при старте. Хранилище может быть недоступно — тогда только браузер. */
export function initLang(): Lang {
  const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  current = detectLang(languages, storedLang());
  return current;
}

function storedLang(): string | null {
  try {
    return localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

export function lang(): Lang {
  return current;
}

/** Ставит язык, запоминает выбор и зовёт подписчиков. */
export function setLang(next: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {
    // приватный режим: выбор проживёт до перезагрузки
  }
  if (next === current) return;
  current = next;
  for (const listener of listeners) listener(next);
}

export function onLangChange(listener: (lang: Lang) => void): void {
  listeners.add(listener);
}

export function t(key: Key, params?: Params): string {
  return format(DICTS[current][key], params, current);
}

export function hasKey(key: string): key is Key {
  return Object.hasOwn(ru, key);
}

/** Ключ, собранный на лету (`param.pot.dBelly`): неизвестный показывается как есть. */
export function tDynamic(key: string, params?: Params): string {
  return hasKey(key) ? t(key, params) : key;
}

/** Сообщение ядра: код плюс параметры. */
export function tm(message: Message): string {
  return t(message.code, message.params);
}

/**
 * Приставки автоимён пресетов на всех языках и старая «Моё»: нумерация
 * автоимён общая, какой бы язык ни был включён, когда их сохраняли.
 */
export function autoPresetPrefixes(): string[] {
  return [...LANGS.map((language) => DICTS[language]['presets.auto'].replace(/\s*\{n\}\s*/, '')), LEGACY_PRESET_PREFIX];
}

/** Первая буква строчная: «Половина A» внутри «Ванночка: половина A». */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLocaleLowerCase(current) + text.slice(1);
}

const PLACEHOLDER = /\{(\w+)(?:\|([^}]*))?\}/g;

export function format(template: string, params: Params | undefined, language: Lang): string {
  return template.replace(PLACEHOLDER, (whole, name: string, forms: string | undefined) => {
    const value = params?.[name];
    if (value === undefined) return whole;
    if (forms === undefined) return String(value);
    const variants = forms.split('|');
    const category = new Intl.PluralRules(language).select(Number(value));
    const index = PLURAL_ORDER[language].indexOf(category);
    return variants[index >= 0 ? index : variants.length - 1] ?? whole;
  });
}

/** Имена параметров шаблона — для теста, что у обоих языков они одни и те же. */
export function placeholders(template: string): string[] {
  return [...template.matchAll(PLACEHOLDER)].map((match) => match[1]).sort();
}
