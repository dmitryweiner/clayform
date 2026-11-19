// Текущее изделие в браузере: переживает перезагрузку (в том числе ту, что
// приносит новую версию приложения). Запись кита — версия, каждое поле
// проверено, мусор не роняет приложение.

import type { KeyValueStorage } from 'maker-kit/core/storage';
import { loadRecord, saveRecord } from 'maker-kit/core/storage';
import { PROJECT_KEY, projectRecord } from '../src/state/project';
import { defaultState, sanitizeState } from '../src/state/schema';

function memory(entries: Record<string, string> = {}): KeyValueStorage & { map: Map<string, string> } {
  const map = new Map(Object.entries(entries));
  return {
    map,
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}

describe('изделие в браузере', () => {
  it('ключ свой, с именем приложения: у всех приложений на github.io одно хранилище', () => {
    expect(PROJECT_KEY).toBe('clayform_project');
    expect(projectRecord.key).toBe(PROJECT_KEY);
  });

  it('изделие, открытый пресет и данное имя переживают запись и чтение', () => {
    const storage = memory();
    const project = { state: { ...defaultState(), heightMm: 222 }, ref: 'b:teapot' as const, name: 'Мой чайник' };
    expect(saveRecord(storage, projectRecord, project)).toBe('ok');
    expect(JSON.parse(storage.map.get(PROJECT_KEY) ?? 'null')).toMatchObject({ version: 1, ref: 'b:teapot', name: 'Мой чайник' });
    expect(loadRecord(storage, projectRecord)).toEqual(project);
  });

  it('состояние санируется, кривые ссылка и имя становятся пустыми', () => {
    const raw = JSON.stringify({ version: 1, state: { family: 'vase', heightMm: 99999 }, ref: 'x:1', name: 7 });
    const project = loadRecord(memory({ [PROJECT_KEY]: raw }), projectRecord);
    expect(project?.ref).toBe('');
    expect(project?.name).toBe('');
    expect(project?.state).toEqual(sanitizeState(project?.state));
    expect(project?.state.heightMm).toBeLessThan(1000);
  });

  it('мусор и чужое — ничего, приложение откроется с изделием по умолчанию', () => {
    for (const raw of ['не json', '42', '[]', '{"version":1}', '{"version":1,"state":"x"}', '{"version":9,"state":{}}']) {
      expect(loadRecord(memory({ [PROJECT_KEY]: raw }), projectRecord), raw).toBeNull();
    }
  });
});
