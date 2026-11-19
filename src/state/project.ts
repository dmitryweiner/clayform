// Текущее изделие в браузере — запись кита (`core/storage`). Пишется при
// каждой законченной правке и открывается при следующем запуске, так что
// перезагрузка — своя или та, что приносит новую версию приложения, —
// теряет только историю отмены. Ссылка `#s=` важнее: по ней открывают
// чужую работу.
//
// Рядом с изделием — открытый пресет и данное руками имя: кнопка имени в
// шапке после перезагрузки говорит то же, что до неё.

import type { StoredRecord } from 'maker-kit/core/storage';
import type { PresetRef } from 'maker-kit/core/presets';
import { isPresetRef } from 'maker-kit/core/presets';
import type { AppState } from './schema';
import { sanitizeState } from './schema';

export const PROJECT_KEY = 'clayform_project';

export interface StoredProject {
  state: AppState;
  /** открытый пресет: 'b:<id>', 'u:<id>' или пусто */
  ref: PresetRef;
  /** имя, данное файлу или пришедшее с ним; пусто — имя пресета */
  name: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

export const projectRecord: StoredRecord<StoredProject> = {
  key: PROJECT_KEY,
  version: 1,
  write: ({ state, ref, name }) => ({ state, ref, name }),
  read: (data) => {
    if (!isRecord(data) || !isRecord(data.state)) return null;
    return {
      state: sanitizeState(data.state),
      ref: isPresetRef(data.ref) ? data.ref : '',
      name: typeof data.name === 'string' ? data.name : '',
    };
  },
};
