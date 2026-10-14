// Пресеты и ссылки. Пресет — это обещание: нажал и получил рабочее изделие,
// а не просто «оно не упало».

import { PRESETS, presetById } from '../src/state/presets';
import { encodeStateToken, decodeStateToken, tokenFromHash } from '../src/state/share';
import { defaultState, sanitizeState, toBuildParams } from '../src/state/schema';
import { buildHollowVessel } from '../src/geo/hollow';
import { lidFit, lidSeat, buildLidMesh } from '../src/geo/lid';
import { buildProfile } from '../src/geo/profiles';
import { buildVessel } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import { analyzeMold } from '../src/geo/mold';
import { nextPresetNumber } from '../src/state/userPresets';
import { autoPresetPrefixes, DICTS, hasKey } from '../src/i18n';

describe('встроенные пресеты', () => {
  it('id уникальны, у каждого есть имя и пояснение в словаре', () => {
    const ids = PRESETS.map((preset) => preset.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const preset of PRESETS) {
      expect(hasKey(`preset.${preset.id}`), preset.id).toBe(true);
      expect(hasKey(`preset.${preset.id}.note`), preset.id).toBe(true);
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
      expect(report.watertight, preset.id).toBe(true);
      expect(report.volume, preset.id).toBeGreaterThan(0);
      expect(hollow.capacityMl, preset.id).toBeGreaterThan(10);
      expect(hollow.pinchedFraction, preset.id).toBe(0);
    }
  });

  it('где обещана крышка, она строится и входит в горловину', () => {
    const withLid = PRESETS.filter((preset) => preset.build().lid.on);
    expect(withLid.length, 'ни один пресет не показывает крышку').toBeGreaterThan(0);
    for (const preset of withLid) {
      const state = preset.build();
      const profile = buildProfile(state.family, state.shape, state.heightMm);
      const fit = lidFit(profile, state.heightMm, state.hollow, state.lid);
      // подогнанный пресет не должен упираться в предупреждение об узкой горловине
      expect(fit.tooNarrow, preset.id).toBe(false);

      const lid = validateMesh(buildLidMesh(fit, state.lid, 96));
      expect(lid.watertight, preset.id).toBe(true);
      expect(lid.volume, preset.id).toBeGreaterThan(0);

      // и тело с фланцем остаётся печатным
      const vessel = buildHollowVessel(toBuildParams(state, 96), state.hollow, lidSeat(fit));
      expect(validateMesh(vessel.mesh).watertight, preset.id).toBe(true);
      expect(vessel.capacityMl, preset.id).toBeGreaterThan(10);
    }
  });

  it('ни один не требует опор при печати сверх разумного', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      const scheme = analyzeMold(buildVessel(toBuildParams(state, 96)), { hasHandle: state.handle.on });
      expect(scheme.warnings, preset.id).toHaveLength(0);
    }
  });

  it('состояние пресета уже санировано — повторная санация ничего не меняет', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      expect(sanitizeState(state), preset.id).toEqual(state);
    }
  });

  it('заявленные особенности действительно включены', () => {
    expect(presetById('amphora')?.build().handle.count).toBe(2);
    expect(presetById('jug')?.build().spout.on).toBe(true);
    expect(presetById('jug')?.build().spout.kind).toBe('lip');
    expect(presetById('teapot')?.build().spout.kind).toBe('applied');
    expect(presetById('skyphos')?.build().handle.count).toBe(2);
    expect(presetById('rouletted-pot')?.build().roulette.bands.some((b) => b.on)).toBe(true);
    expect(presetById('ridged-vase')?.build().relief.wave.on).toBe(true);
    expect(presetById('tumbler')?.build().handle.on).toBe(false);
  });

  it('неизвестный id даёт null, а не бросок', () => {
    expect(presetById('samovar')).toBeNull();
  });
});

describe('ссылки на состояние', () => {
  it('состояние переживает круг «закодировать → раскодировать»', () => {
    for (const preset of PRESETS) {
      const state = preset.build();
      expect(decodeStateToken(encodeStateToken(state)), preset.id).toEqual(state);
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

describe('автоимя своего пресета', () => {
  it('«Изделие N» и «Piece N» нумеруются вместе, старые «Моё N» тоже в счёт', () => {
    const state = defaultState();
    const prefixes = autoPresetPrefixes();
    expect(prefixes).toEqual(['Изделие', 'Piece', 'Моё']);
    expect(nextPresetNumber([], prefixes)).toBe(1);
    expect(nextPresetNumber([{ name: 'Изделие 2', state }, { name: 'Моё 5', state }, { name: 'Ваза', state }], prefixes))
      .toBe(6);
    expect(nextPresetNumber([{ name: 'Изделие 2', state }, { name: 'Piece 7', state }], prefixes)).toBe(8);
    // приставка без номера или номер без пробела — не автоимя
    expect(nextPresetNumber([{ name: 'Piece', state }, { name: 'Piece7', state }], prefixes)).toBe(1);
    expect(DICTS.ru['presets.auto']).toBe('Изделие {n}');
  });
});
