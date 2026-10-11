// Пользовательские пресеты в localStorage. Всё чтение защищено: хранилище
// может быть недоступно (приватный режим) или содержать мусор от прошлых
// версий — приложение обязано открыться в любом случае.

import type { AppState } from './schema';
import { sanitizeState } from './schema';

export const USER_PRESETS_KEY = 'clayform_user_presets_v1';

export interface UserPreset {
  name: string;
  state: AppState;
}

export function loadUserPresets(): UserPreset[] {
  try {
    const raw = localStorage.getItem(USER_PRESETS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const presets: UserPreset[] = [];
    for (const item of parsed) {
      if (typeof item !== 'object' || item === null) continue;
      const name = Reflect.get(item, 'name');
      if (typeof name !== 'string' || name.length === 0) continue;
      presets.push({ name, state: sanitizeState(Reflect.get(item, 'state')) });
    }
    return presets;
  } catch {
    return [];
  }
}

export function saveUserPresets(presets: UserPreset[]): boolean {
  try {
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(presets));
    return true;
  } catch {
    return false;
  }
}

/** Автоимя сохранённого пресета: «Изделие N». */
export const PRESET_NAME_PREFIX = 'Изделие';

/**
 * Следующий свободный номер для автоимени. Старые «Моё N» тоже в счёт: иначе
 * после них нумерация «Изделий» пошла бы с единицы и запутала бы список.
 */
export function nextPresetNumber(presets: UserPreset[]): number {
  let highest = 0;
  for (const preset of presets) {
    const match = preset.name.match(/^(?:Изделие|Моё) (\d+)$/);
    if (match) highest = Math.max(highest, Number(match[1]));
  }
  return highest + 1;
}
