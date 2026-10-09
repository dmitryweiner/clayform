// Пресет файлом: читаемый JSON, который открывается и через год.

import { encodePresetFile, decodePresetFile, presetFileName, PRESET_FILE_VERSION } from '../src/state/presetFile';
import { defaultState, sanitizeState } from '../src/state/schema';
import { PRESETS } from '../src/state/presets';

describe('файл пресета', () => {
  it('раунд-трип сохраняет имя и состояние', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      const decoded = decodePresetFile(encodePresetFile(preset.name, state));
      expect(decoded?.name).toBe(preset.name);
      expect(decoded?.state).toEqual(state);
    }
  });

  it('файл читаем человеком: обёртка с версией и отступы', () => {
    const text = encodePresetFile('Ваза', defaultState(), new Date('2026-10-09T12:00:00Z'));
    const parsed: unknown = JSON.parse(text);
    expect(parsed).toMatchObject({ app: 'clayform', version: PRESET_FILE_VERSION, name: 'Ваза', savedAt: '2026-10-09T12:00:00.000Z' });
    expect(text).toContain('\n  "state": {');
  });

  it('голое состояние тоже открывается', () => {
    const state = { ...defaultState(), heightMm: 222 };
    const decoded = decodePresetFile(JSON.stringify(state));
    expect(decoded?.state.heightMm).toBe(222);
    expect(decoded?.name).toBe('');
  });

  it('мусор и чужой JSON — null, а не сброс к умолчанию', () => {
    for (const text of ['', 'не json', '[]', 'null', '42', '{"a":1}', '{"app":"other","state":{}}',
                        '{"app":"clayform"}', '{"family":"teapot-ish"}']) {
      expect(decodePresetFile(text), text).toBeNull();
    }
  });

  it('старая или кривая версия даёт санированное состояние', () => {
    const decoded = decodePresetFile(JSON.stringify({
      app: 'clayform', version: 0, name: 7,
      state: { family: 'vase', heightMm: 99999, roulette: { bands: [{ repeats: 12, pattern: 'dots' }] } },
    }));
    expect(decoded).not.toBeNull();
    expect(decoded?.name).toBe('');
    expect(decoded?.state).toEqual(sanitizeState(decoded?.state));
    expect(decoded?.state.heightMm).toBeLessThan(1000);
  });

  it('имя файла без запрещённых символов', () => {
    expect(presetFileName('Кратер с меандром')).toBe('clayform-Кратер-с-меандром.json');
    expect(presetFileName('a/b:c?')).toBe('clayform-a-b-c.json');
    expect(presetFileName('   ')).toBe('clayform-preset.json');
  });
});
