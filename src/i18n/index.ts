// Язык интерфейса. Своя крошечная обвязка вместо библиотеки: словарей два,
// ключи проверяет tsc (`Key` выведен из русского словаря-эталона, английский
// обязан иметь те же), а шаблоны разбирает `format` кита.
//
// Шаблон: `{name}` — подстановка параметра; `{n|оттиск|оттиска|оттисков}` —
// слово по числу n: формы идут в порядке категорий Intl.PluralRules языка
// (у русского one/few/many, у английского one/other).
//
// Язык держится здесь, а не в AppState: в ссылку и в файл пресета он не
// попадает — открывший чужую ссылку видит её на своём языке.

import { format } from 'maker-kit/core/format';
import type { Message, Params } from 'maker-kit/core/message';
import { ru, LEGACY_PRESET_PREFIX } from './ru';
import { en } from './en';

export { format, placeholders } from 'maker-kit/core/format';
export type { Params };

export type Lang = 'ru' | 'en';
export const LANGS: readonly Lang[] = ['ru', 'en'];
export type Key = keyof typeof ru;

export const DICTS: Readonly<Record<Lang, Readonly<Record<Key, string>>>> = { ru, en };

/** Ключ localStorage: ручной выбор языка, важнее настроек браузера. */
export const LANG_KEY = 'clayform_lang';

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
export function tm(message: Message<Key>): string {
  return t(message.code, message.params);
}

/**
 * Приставки автоимён пресетов на всех языках и старая «Моё»: нумерация
 * автоимён общая, какой бы язык ни был включён, когда их сохраняли.
 */
export function autoPresetPrefixes(): string[] {
  return [...LANGS.map((language) => DICTS[language]['presets.auto']), LEGACY_PRESET_PREFIX];
}
