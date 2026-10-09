// Пресет файлом: то же состояние, что в ссылке и в localStorage, но в
// читаемом JSON — чтобы его можно было хранить рядом с STL, слать почтой и
// открыть на другой машине. Файл приходит снаружи, поэтому чтение идёт через
// sanitizeState и никогда не бросает.

import type { AppState } from './schema';
import { sanitizeState } from './schema';
import { isFamilyId } from '../geo/profiles';

export const PRESET_FILE_APP = 'clayform';
export const PRESET_FILE_VERSION = 1;

export function encodePresetFile(name: string, state: AppState, savedAt = new Date()): string {
  return JSON.stringify({
    app: PRESET_FILE_APP,
    version: PRESET_FILE_VERSION,
    name,
    savedAt: savedAt.toISOString(),
    state,
  }, null, 2);
}

/**
 * Обёртка `{ app, version, name, savedAt, state }` или голое состояние
 * (его можно выдрать из ссылки руками). Всё остальное — чужой файл: null,
 * а не состояние по умолчанию, иначе случайный JSON молча сбросил бы работу.
 */
export function decodePresetFile(text: string): { name: string; state: AppState } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;

  if (Reflect.get(parsed, 'app') === PRESET_FILE_APP) {
    const state: unknown = Reflect.get(parsed, 'state');
    if (typeof state !== 'object' || state === null) return null;
    const name: unknown = Reflect.get(parsed, 'name');
    return { name: typeof name === 'string' ? name.trim() : '', state: sanitizeState(state) };
  }
  const family: unknown = Reflect.get(parsed, 'family');
  if (typeof family === 'string' && isFamilyId(family)) return { name: '', state: sanitizeState(parsed) };
  return null;
}

/** Имя файла: `clayform-<имя>.json`, без символов, запрещённых в путях. */
export function presetFileName(name: string): string {
  const slug = name.trim().replace(/[\\/:*?"<>|\s]+/g, '-').replace(/^-+|-+$/g, '');
  return `clayform-${slug || 'preset'}.json`;
}
