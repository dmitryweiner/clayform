// Пресет файлом: то же состояние, что в ссылке и в localStorage, но в
// читаемом JSON — чтобы его можно было хранить рядом с STL, слать почтой и
// открыть на другой машине. Обёртка и разбор — файл проекта кита
// (`core/projectFile`): файл приходит снаружи, поэтому чтение идёт через
// sanitizeState, никогда не бросает, а чужой файл отвергается с причиной.

import type { DecodedProjectFile } from 'maker-kit/core/projectFile';
import { decodeProjectFile, encodeProjectFile, projectFileName } from 'maker-kit/core/projectFile';
import type { AppState } from './schema';
import { sanitizeState } from './schema';
import { isFamilyId } from '../geo/profiles';

export const PRESET_FILE_APP = 'clayform';
export const PRESET_FILE_VERSION = 1;

export function encodePresetFile(name: string, state: AppState, savedAt = new Date()): string {
  return encodeProjectFile({ app: PRESET_FILE_APP, version: PRESET_FILE_VERSION, name, state, savedAt });
}

/**
 * Обёртка `{ app, version, name, savedAt, state }` или голое состояние (его
 * можно выдрать из ссылки руками). Всё остальное — отказ с причиной, а не
 * состояние по умолчанию: иначе случайный JSON молча сбросил бы работу.
 */
export function decodePresetFile(text: string): DecodedProjectFile<AppState> {
  return decodeProjectFile(text, {
    app: PRESET_FILE_APP,
    version: PRESET_FILE_VERSION,
    sanitize: sanitizeState,
    legacy: (data) => {
      const family: unknown = typeof data === 'object' && data !== null ? Reflect.get(data, 'family') : null;
      return typeof family === 'string' && isFamilyId(family) ? sanitizeState(data) : null;
    },
  });
}

/** Имя файла: `clayform-<имя>.json`, слагом кита — строчными, без символов, запрещённых в путях. */
export function presetFileName(name: string): string {
  return `${PRESET_FILE_APP}-${projectFileName(name, 'json', 'preset')}`;
}
