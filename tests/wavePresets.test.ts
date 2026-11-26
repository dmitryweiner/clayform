// Готовые узоры волны: числа пресета — уже чистые (санация их не трогает),
// выбор пресета узнаётся списком, правка руками превращает его в «Свою».

import { WAVE_PRESETS, applyWavePreset, wavePresetOf } from '../src/geo/wavePresets';
import { defaultRelief, sanitizeRelief } from '../src/geo/relief';
import type { ReliefState } from '../src/geo/relief';

const custom = (): ReliefState => {
  const relief = defaultRelief();
  return { ...relief, wave: { ...relief.wave, onLid: true }, zone: { from: 0.2, to: 0.7, fade: 0.1 } };
};

describe('пресеты волн', () => {
  it('пять, id уникальны', () => {
    expect(WAVE_PRESETS).toHaveLength(5);
    expect(new Set(WAVE_PRESETS.map((preset) => preset.id)).size).toBe(5);
  });

  it('числа пресета уже чистые: санация их не меняет', () => {
    for (const preset of WAVE_PRESETS) {
      const relief = applyWavePreset(defaultRelief(), preset.id);
      expect(sanitizeRelief(relief), preset.id).toEqual(relief);
    }
  });

  it('выбор включает первую волну и задаёт обе, «И на крышке» и зону не трогает', () => {
    const before = custom();
    const relief = applyWavePreset(before, 'ripple');
    expect(relief.wave.on).toBe(true);
    expect(relief.wave.onLid).toBe(true);
    expect(relief.wave2.onLid).toBe(false);
    expect(relief.zone).toEqual(before.zone);
    expect(relief.wave).toMatchObject(WAVE_PRESETS[0].wave);
    expect(relief.wave2).toMatchObject(WAVE_PRESETS[0].wave2);
  });

  it('выбранный пресет узнаётся, у каждого — свой', () => {
    for (const preset of WAVE_PRESETS) expect(wavePresetOf(applyWavePreset(custom(), preset.id))).toBe(preset.id);
  });

  it('волна по умолчанию — «Своя»; незнакомый id ничего не меняет', () => {
    expect(wavePresetOf(defaultRelief())).toBe('');
    expect(applyWavePreset(custom(), 'samovar')).toEqual(custom());
  });

  it('правка числа, которое действует, превращает пресет в «Свою»', () => {
    const relief = applyWavePreset(defaultRelief(), 'ripple');
    expect(wavePresetOf({ ...relief, wave: { ...relief.wave, freq: 15 } })).toBe('');
    expect(wavePresetOf({ ...relief, wave2: { ...relief.wave2, fm: 0.31 } })).toBe('');
    expect(wavePresetOf({ ...relief, wave2: { ...relief.wave2, on: false } })).toBe('');
  });

  it('числа, которые не действуют, пресета не ломают', () => {
    const ripple = applyWavePreset(defaultRelief(), 'ripple');
    // первая волна не по спирали: её шаг спирали ни на что не влияет
    expect(wavePresetOf({ ...ripple, wave: { ...ripple.wave, spiralK: 3 } })).toBe('ripple');
    // плетение не смотрит на fm и am
    const basket = applyWavePreset(defaultRelief(), 'basket');
    expect(wavePresetOf({ ...basket, wave2: { ...basket.wave2, fm: 0.9, am: 0 } })).toBe('basket');
    // как и выключение волны: узор остаётся тем же, его просто не видно
    expect(wavePresetOf({ ...basket, wave: { ...basket.wave, on: false } })).toBe('basket');
  });
});
