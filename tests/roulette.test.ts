// Ролик: узор, накатываемый колесом по вращающемуся изделию.
//
// Физика накатки задаёт главный инвариант: колесо катится по замкнутой
// окружности, поэтому за оборот должно уложиться целое число оттисков.
// Дробное число даёт видимый стык — «недокат», который на реальном изделии
// приходится замазывать вручную.

import {
  ROULETTE_PATTERNS, patternValue, rouletteRepeats, makeRoulette,
  defaultRoulette, sanitizeRoulette,
} from '../src/geo/roulette';

const TAU = Math.PI * 2;
const CTX = { heightMm: 150, bandRadiusMm: 80 };

const on = (over: Record<string, unknown> = {}) =>
  sanitizeRoulette({ ...defaultRoulette(), on: true, ...over });

describe('patternValue', () => {
  it('все узоры лежат в [0, 1] и заметно меняются по тайлу', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
          const value = patternValue(pattern, i / 32, j / 32);
          expect(Number.isFinite(value), pattern).toBe(true);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
      expect(min, pattern).toBeGreaterThanOrEqual(0);
      expect(max, pattern).toBeLessThanOrEqual(1);
      expect(max - min, `${pattern} должен быть рельефным`).toBeGreaterThan(0.5);
    }
  });

  it('каждый узор периодичен по горизонтали — тайлы стыкуются', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      for (const q of [0.15, 0.5, 0.85]) {
        expect(patternValue(pattern, 0, q), pattern).toBeCloseTo(patternValue(pattern, 1, q), 9);
      }
    }
  });
});

describe('rouletteRepeats', () => {
  it('всегда целое и не меньше трёх', () => {
    for (const bandWidthMm of [2, 8, 25, 90]) {
      for (const bandRadiusMm of [8, 40, 160]) {
        const n = rouletteRepeats(on({ bandWidthMm, repeats: 0 }), { ...CTX, bandRadiusMm });
        expect(Number.isInteger(n), `w=${bandWidthMm} r=${bandRadiusMm}`).toBe(true);
        expect(n).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('авто: узкий поясок — больше мелких оттисков, широкий — меньше крупных', () => {
    const narrow = rouletteRepeats(on({ bandWidthMm: 6, repeats: 0 }), CTX);
    const wide = rouletteRepeats(on({ bandWidthMm: 30, repeats: 0 }), CTX);
    expect(narrow).toBeGreaterThan(wide);
  });

  it('авто: на изделии вдвое толще укладывается примерно вдвое больше оттисков', () => {
    const thin = rouletteRepeats(on({ bandWidthMm: 10, repeats: 0 }), { ...CTX, bandRadiusMm: 40 });
    const thick = rouletteRepeats(on({ bandWidthMm: 10, repeats: 0 }), { ...CTX, bandRadiusMm: 80 });
    expect(thick / thin).toBeCloseTo(2, 0);
  });

  it('заданное вручную дробное число округляется до целого', () => {
    expect(rouletteRepeats(on({ repeats: 17.6 }), CTX)).toBe(18);
  });
});

describe('шов θ = 0 / 2π', () => {
  it('узор смыкается для всех рисунков, наклонов и способов задать шаг', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      for (const repeats of [0, 12, 31]) {
        for (const angle of [0, 0.4, -0.9]) {
          const roulette = makeRoulette(on({ pattern, repeats, angle, bandWidthMm: 30 }), CTX);
          for (const v of [0.35, 0.5, 0.62]) {
            expect(
              Math.abs(roulette(TAU, v) - roulette(0, v)),
              `${pattern} n=${repeats} angle=${angle} v=${v}`,
            ).toBeLessThan(1e-6);
          }
        }
      }
    }
  });
});

describe('пояс накатки', () => {
  it('за пределами пояса поверхность не тронута', () => {
    const roulette = makeRoulette(on({ bandCenter: 0.5, bandWidthMm: 15 }), CTX);
    // пояс 15 мм на высоте 150 мм — это 0.45…0.55 по доле высоты
    for (const v of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      expect(Math.abs(roulette(1.0, v)), `v=${v}`).toBeLessThan(1e-9);
    }
    let inside = 0;
    for (let i = 0; i <= 200; i++) {
      if (Math.abs(roulette(1.0, 0.45 + (i / 200) * 0.1)) > 1e-6) inside++;
    }
    expect(inside).toBeGreaterThan(50);
  });

  it('края пояса плавные — колесо не рубит ступеньку', () => {
    const roulette = makeRoulette(on({ pattern: 'dots', bandCenter: 0.5, bandWidthMm: 30 }), CTX);
    let previous = roulette(0.7, 0.39);
    for (let i = 1; i <= 60; i++) {
      const value = roulette(0.7, 0.39 + (i / 60) * 0.04);
      expect(Math.abs(value - previous)).toBeLessThan(0.35);
      previous = value;
    }
  });

  it('глубина задаётся в миллиметрах и достигается', () => {
    for (const depthMm of [1.5, -2.5]) {
      const roulette = makeRoulette(on({ pattern: 'rope', depthMm, bandWidthMm: 30 }), CTX);
      let peak = 0;
      for (let i = 0; i <= 400; i++) {
        for (let j = 0; j <= 60; j++) {
          const value = roulette((i / 400) * TAU, 0.4 + (j / 60) * 0.2);
          if (Math.abs(value) > Math.abs(peak)) peak = value;
        }
      }
      expect(peak).toBeCloseTo(depthMm, 1);
      expect(Math.sign(peak)).toBe(Math.sign(depthMm));
    }
  });

  it('выключенный ролик ничего не делает', () => {
    const roulette = makeRoulette(sanitizeRoulette({ on: false }), CTX);
    expect(roulette(1, 0.5)).toBe(0);
  });
});

describe('sanitizeRoulette', () => {
  it('не бросает на мусоре и отдаёт рабочие дефолты', () => {
    for (const raw of [null, 'узор', 3, { pattern: 'ёлочка', bandCenter: NaN }]) {
      const state = sanitizeRoulette(raw);
      expect(ROULETTE_PATTERNS).toContain(state.pattern);
      expect(Number.isFinite(state.bandCenter)).toBe(true);
    }
  });

  it('идемпотентен, и по умолчанию узора нет', () => {
    const once = sanitizeRoulette({ on: true, repeats: 9.4 });
    expect(sanitizeRoulette(once)).toEqual(once);
    expect(defaultRoulette().on).toBe(false);
  });
});
