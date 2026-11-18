// Свои пресеты в localStorage: запись кита (`core/storage`) поверх старого
// формата. До кита пресеты лежали голым списком `{ name, state }` и
// узнавались по имени; теперь у каждого id `u<n>`, и старый список обязан
// открыться с ними, ничего не потеряв.

import type { KeyValueStorage } from 'maker-kit/core/storage';
import { loadRecord, saveRecord } from 'maker-kit/core/storage';
import { USER_PRESETS_KEY, savePresetAs, userPresetsRecord } from '../src/state/userPresets';
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

describe('свои пресеты в хранилище', () => {
  it('ключ прежний: старые пресеты не теряются', () => {
    expect(userPresetsRecord.key).toBe('clayform_user_presets_v1');
    expect(USER_PRESETS_KEY).toBe(userPresetsRecord.key);
  });

  it('голый список старых версий получает id по порядку, имена и состояния остаются', () => {
    const vase = { ...defaultState(), family: 'vase', heightMm: 210 };
    const storage = memory({
      [USER_PRESETS_KEY]: JSON.stringify([
        { name: 'Ваза', state: vase },
        { name: 'Моё 3', state: defaultState() },
      ]),
    });
    const presets = loadRecord(storage, userPresetsRecord);
    expect(presets?.map((preset) => [preset.id, preset.name])).toEqual([
      ['u1', 'Ваза'],
      ['u2', 'Моё 3'],
    ]);
    expect(presets?.[0].state).toEqual(sanitizeState(vase));
  });

  it('пишется версией 1 и читается обратно теми же id', () => {
    const storage = memory();
    const presets = [
      { id: 'u4', name: 'Крынка', state: defaultState() },
      { id: 'u9', name: 'Piece 2', state: defaultState() },
    ];
    expect(saveRecord(storage, userPresetsRecord, presets)).toBe('ok');
    const stored: unknown = JSON.parse(storage.map.get(USER_PRESETS_KEY) ?? 'null');
    expect(stored).toMatchObject({ version: 1, presets: [{ id: 'u4' }, { id: 'u9' }] });
    expect(loadRecord(storage, userPresetsRecord)).toEqual(presets);
  });

  it('мусор в хранилище — пустой список или ничего, а не бросок', () => {
    for (const raw of ['не json', '{"a":1}', '42', '{"version":1,"presets":"x"}', '[{"name":"без состояния"}]']) {
      const presets = loadRecord(memory({ [USER_PRESETS_KEY]: raw }), userPresetsRecord) ?? [];
      expect(presets, raw).toEqual([]);
    }
    // записанное более новой версией приложения не читается вовсе
    expect(loadRecord(memory({ [USER_PRESETS_KEY]: '{"version":2,"presets":[]}' }), userPresetsRecord)).toBeNull();
  });
});

describe('💾 под именем', () => {
  it('новое имя — новый пресет в конце списка со свободным id', () => {
    const list = [{ id: 'u2', name: 'Ваза', state: defaultState() }];
    const { list: next, id } = savePresetAs(list, 'Крынка', defaultState());
    expect(id).toBe('u3');
    expect(next.map((preset) => preset.name)).toEqual(['Ваза', 'Крынка']);
  });

  it('уже занятое имя заменяет тот пресет: id и место остаются', () => {
    const tall = { ...defaultState(), heightMm: 300 };
    const list = [
      { id: 'u1', name: 'Ваза', state: defaultState() },
      { id: 'u2', name: 'Крынка', state: defaultState() },
    ];
    const { list: next, id } = savePresetAs(list, 'Ваза', tall);
    expect(id).toBe('u1');
    expect(next.map((preset) => preset.id)).toEqual(['u1', 'u2']);
    expect(next[0].state.heightMm).toBe(300);
  });
});
