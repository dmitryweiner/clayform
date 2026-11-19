// Пресет файлом: читаемый JSON, который открывается и через год.

import { encodePresetFile, decodePresetFile, presetFileName, PRESET_FILE_VERSION } from '../src/state/presetFile';
import { defaultState, sanitizeState } from '../src/state/schema';
import { PRESETS } from '../src/state/presets';

describe('файл пресета', () => {
  it('раунд-трип сохраняет имя и состояние', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      const name = `Пресет «${preset.id}»`;
      const decoded = decodePresetFile(encodePresetFile(name, state));
      expect(decoded).toEqual({ ok: true, name, state });
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
    expect(decoded.ok && decoded.state.heightMm).toBe(222);
    expect(decoded.ok && decoded.name).toBe('');
  });

  it('мусор и чужой JSON — отказ с причиной, а не сброс к умолчанию', () => {
    const cases: [string, string][] = [
      ['', 'broken'],
      ['не json', 'broken'],
      ['[]', 'foreign'],
      ['null', 'foreign'],
      ['42', 'foreign'],
      ['{"a":1}', 'foreign'],
      ['{"app":"other","state":{}}', 'foreign'],
      ['{"family":"teapot-ish"}', 'foreign'],
      ['{"app":"clayform"}', 'broken'],
      ['{"app":"clayform","version":1,"state":7}', 'broken'],
      ['{"app":"clayform","version":99,"state":{}}', 'newer'],
    ];
    for (const [text, reason] of cases) {
      expect(decodePresetFile(text), text).toEqual({ ok: false, reason });
    }
  });

  it('старая или кривая версия даёт санированное состояние', () => {
    const decoded = decodePresetFile(
      JSON.stringify({
        app: 'clayform',
        version: 0,
        name: 7,
        state: { family: 'vase', heightMm: 99999, roulette: { bands: [{ repeats: 12, pattern: 'dots' }] } },
      }),
    );
    if (!decoded.ok) throw new Error(`refused: ${decoded.reason}`);
    expect(decoded.name).toBe('');
    expect(decoded.state).toEqual(sanitizeState(decoded.state));
    expect(decoded.state.heightMm).toBeLessThan(1000);
  });

  it('имя файла без запрещённых символов, строчными (слаг кита)', () => {
    expect(presetFileName('Кратер с меандром')).toBe('clayform-кратер-с-меандром.json');
    expect(presetFileName('a/b:c?')).toBe('clayform-a-b-c.json');
    expect(presetFileName('   ')).toBe('clayform-preset.json');
  });
});
