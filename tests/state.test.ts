// sanitizeState — единственный шлюз для чисел извне (UI, ссылки, пресеты).
// Он обязан переваривать любой мусор, не бросая: ссылку мог править человек.

import {
  defaultState, sanitizeState, stateForFamily, toBuildParams,
  HEIGHT_MIN_MM, HEIGHT_MAX_MM, STATE_VERSION, pressAllowed,
} from '../src/state/schema';
import { defaultFamilyParams, familyById } from '../src/geo/profiles';
import { buildVessel } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';

describe('defaultState', () => {
  it('горшок со своими дефолтами', () => {
    const state = defaultState();
    expect(state.version).toBe(STATE_VERSION);
    expect(state.family).toBe('pot');
    expect(state.shape).toEqual(defaultFamilyParams('pot'));
  });
});

describe('sanitizeState', () => {
  it('не бросает ни на чём: null, строка, массив, вложенный мусор', () => {
    for (const raw of [null, undefined, 'ваза', 42, [], { shape: 'нет' }, { family: {} }]) {
      expect(() => sanitizeState(raw)).not.toThrow();
      expect(sanitizeState(raw).family).toBe('pot');
    }
  });

  it('неизвестное семейство откатывается к дефолтному', () => {
    expect(sanitizeState({ family: 'teapot' }).family).toBe('pot');
    expect(sanitizeState({ family: 'bowl' }).family).toBe('bowl');
  });

  it('параметры чужого семейства отбрасываются, свои сохраняются', () => {
    const state = sanitizeState({ family: 'cup', shape: { dRim: 100, dBelly: 999 } });
    expect(state.shape.dRim).toBe(100);
    expect(state.shape).not.toHaveProperty('dBelly');
  });

  it('высота зажимается в печатный диапазон', () => {
    expect(sanitizeState({ heightMm: -5 }).heightMm).toBe(HEIGHT_MIN_MM);
    expect(sanitizeState({ heightMm: 10000 }).heightMm).toBe(HEIGHT_MAX_MM);
    expect(sanitizeState({ heightMm: 123 }).heightMm).toBe(123);
  });

  it('нечисловая высота берётся из семейства, а не из другого семейства', () => {
    expect(sanitizeState({ family: 'vase', heightMm: 'высокая' }).heightMm)
      .toBe(familyById('vase').defaultHeightMm);
  });

  it('нестандартная детализация откатывается к дефолтной', () => {
    expect(sanitizeState({ resolution: 777 }).resolution).toBe(defaultState().resolution);
    expect(sanitizeState({ resolution: 384 }).resolution).toBe(384);
  });

  it('идемпотентен: повторная санация ничего не меняет', () => {
    const once = sanitizeState({ family: 'vase', shape: { dNeck: 40 }, heightMm: 300 });
    expect(sanitizeState(once)).toEqual(once);
  });
});

describe('stateForFamily', () => {
  it('переключает семейство вместе с его параметрами и высотой', () => {
    const next = stateForFamily('bowl', defaultState());
    expect(next.family).toBe('bowl');
    expect(next.shape).toEqual(defaultFamilyParams('bowl'));
    expect(next.heightMm).toBe(familyById('bowl').defaultHeightMm);
  });

  it('на неизвестном id оставляет состояние нетронутым', () => {
    const before = defaultState();
    expect(stateForFamily('teapot', before)).toBe(before);
  });
});

describe('toBuildParams', () => {
  it('любое санированное состояние строится в замкнутый солид', () => {
    for (const family of ['pot', 'bowl', 'cup', 'vase']) {
      const state = sanitizeState({ family });
      const mesh = buildVessel(toBuildParams(state, 64));
      expect(validateMesh(mesh).watertight, family).toBe(true);
    }
  });

  it('детализация прокидывается в обе оси сетки', () => {
    expect(toBuildParams(defaultState(), 128)).toMatchObject({ nu: 128, nv: 128 });
  });
});

describe('отминка', () => {
  it('доступна только телу без ручки, носика и крышки', () => {
    const plain = sanitizeState({ ...defaultState(), exportMode: 'hump' });
    expect(plain.exportMode).toBe('hump');
    expect(pressAllowed(plain)).toBe(true);
    for (const extra of [
      { handle: { on: true } },
      { spout: { on: true, kind: 'lip' } },
      { spout: { on: true, kind: 'applied' } },
      { lid: { on: true } },
    ]) {
      for (const exportMode of ['slump', 'hump']) {
        const state = sanitizeState({ ...defaultState(), ...extra, exportMode });
        expect(state.exportMode, JSON.stringify(extra)).toBe('vessel');
        expect(sanitizeState(state)).toEqual(state);
      }
    }
  });

  it('прочие режимы приставные детали не трогают', () => {
    expect(sanitizeState({ ...defaultState(), handle: { on: true }, exportMode: 'bath' }).exportMode).toBe('bath');
  });
});

describe('крышка рядом', () => {
  it('булев флаг, по умолчанию выключен, мусор — false', () => {
    expect(defaultState().lidBeside).toBe(false);
    expect(sanitizeState({ lidBeside: true }).lidBeside).toBe(true);
    expect(sanitizeState({ lidBeside: 'да' }).lidBeside).toBe(false);
  });
});
