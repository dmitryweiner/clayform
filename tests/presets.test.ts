// Пресеты и ссылки. Пресет — это обещание: нажал и получил рабочее изделие,
// а не просто «оно не упало».

import { PRESETS, presetByName } from '../src/state/presets';
import { encodeStateToken, decodeStateToken, tokenFromHash } from '../src/state/share';
import { defaultState, sanitizeState, toBuildParams } from '../src/state/schema';
import { buildHollowVessel } from '../src/geo/hollow';
import { buildVessel } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import { analyzeMold } from '../src/geo/mold';

describe('встроенные пресеты', () => {
  it('имена уникальны и у каждого есть пояснение', () => {
    const names = PRESETS.map((preset) => preset.name);
    expect(new Set(names).size).toBe(names.length);
    for (const preset of PRESETS) {
      expect(preset.note.length, preset.name).toBeGreaterThan(3);
    }
  });

  it('покрывают все четыре семейства', () => {
    const families = new Set(PRESETS.map((preset) => preset.build().family));
    expect([...families].sort()).toEqual(['bowl', 'cup', 'pot', 'vase']);
  });

  it('каждый строится в замкнутое полое изделие с осмысленной вместимостью', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      const hollow = buildHollowVessel(toBuildParams(state, 96), state.hollow);
      const report = validateMesh(hollow.mesh);
      expect(report.watertight, preset.name).toBe(true);
      expect(report.volume, preset.name).toBeGreaterThan(0);
      expect(hollow.capacityMl, preset.name).toBeGreaterThan(10);
      expect(hollow.pinchedFraction, preset.name).toBe(0);
    }
  });

  it('ни один не требует опор при печати сверх разумного', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      const scheme = analyzeMold(buildVessel(toBuildParams(state, 96)), { hasHandle: state.handle.on });
      expect(scheme.warnings, preset.name).toHaveLength(0);
    }
  });

  it('состояние пресета уже санировано — повторная санация ничего не меняет', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      expect(sanitizeState(state), preset.name).toEqual(state);
    }
  });

  it('заявленные особенности действительно включены', () => {
    expect(presetByName('Амфора')?.build().handle.count).toBe(2);
    expect(presetByName('Кувшин')?.build().spout.on).toBe(true);
    expect(presetByName('Кувшин')?.build().spout.kind).toBe('lip');
    expect(presetByName('Чайник')?.build().spout.kind).toBe('applied');
    expect(presetByName('Скифос')?.build().handle.count).toBe(2);
    expect(presetByName('Горшок с накаткой')?.build().roulette.bands.some((b) => b.on)).toBe(true);
    expect(presetByName('Ваза с валиками')?.build().relief.wave.on).toBe(true);
    expect(presetByName('Стакан')?.build().handle.on).toBe(false);
  });

  it('неизвестное имя даёт null, а не бросок', () => {
    expect(presetByName('Самовар')).toBeNull();
  });
});

describe('ссылки на состояние', () => {
  it('состояние переживает круг «закодировать → раскодировать»', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      expect(decodeStateToken(encodeStateToken(state)), preset.name).toEqual(state);
    }
  });

  it('токен содержит только безопасные для URL символы', () => {
    expect(encodeStateToken(defaultState())).toMatch(/^[A-Za-z0-9\-_]+$/);
  });

  it('испорченный токен не роняет приложение', () => {
    for (const token of ['', 'не-base64!!', 'YWJj', 'e30', 'AAAA']) {
      expect(() => decodeStateToken(token)).not.toThrow();
    }
    expect(decodeStateToken('не-base64!!')).toBeNull();
  });

  it('подделанные значения зажимаются, а не проходят насквозь', () => {
    const token = encodeStateToken(defaultState());
    const tampered = JSON.parse(atob(token.replace(/-/g, '+').replace(/_/g, '/')));
    tampered.heightMm = 99999;
    tampered.family = 'самовар';
    const restored = decodeStateToken(encodeStateToken(tampered));
    expect(restored?.heightMm).toBeLessThanOrEqual(400);
    expect(restored?.family).toBe('pot');
  });

  it('tokenFromHash достаёт токен и отсеивает мусор', () => {
    expect(tokenFromHash('#s=abcDEF-_123')).toBe('abcDEF-_123');
    expect(tokenFromHash('#other=1')).toBeNull();
    expect(tokenFromHash('')).toBeNull();
  });
});
