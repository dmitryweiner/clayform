// Ролик: узоры, накатываемые колесом по вращающемуся изделию.
//
// Физика накатки задаёт главный инвариант: колесо катится по замкнутой
// окружности, поэтому за оборот должно уложиться целое число оттисков.
// Дробное число даёт видимый стык — «недокат», который на реальном изделии
// приходится замазывать вручную.

import {
  ROULETTE_PATTERNS, patternValue, bandRepeats, makeRoulette,
  defaultRoulette, defaultBand, sanitizeRoulette, MAX_BANDS,
} from '../src/geo/roulette';
import type { RouletteBand, TileContext } from '../src/geo/roulette';
import { MEANDER_PATH } from '../src/geo/roulette';

const TAU = Math.PI * 2;
const CTX = { heightMm: 150, radiusAt: () => 80 };

const tile = (over: Partial<TileContext> = {}): TileContext =>
  ({ elementMm: 20, bandMm: 20, depthMm: 1.5, ...over });

const band = (over: Partial<RouletteBand> = {}): RouletteBand =>
  ({ ...defaultBand(), on: true, ...over });

const one = (over: Partial<RouletteBand> = {}) =>
  sanitizeRoulette({ bands: [band(over)] });

describe('patternValue', () => {
  it('все узоры лежат в [0, 1] и заметно меняются по тайлу', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < 48; i++) {
        for (let j = 0; j < 48; j++) {
          const value = patternValue(pattern, i / 48, j / 48, tile());
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
        expect(patternValue(pattern, 0, q, tile()), pattern)
          .toBeCloseTo(patternValue(pattern, 1, q, tile()), 9);
      }
    }
  });
});

describe('полоса', () => {
  it('не зависит от положения по окружности — это сплошной валик', () => {
    for (const s of [0, 0.17, 0.5, 0.93]) {
      expect(patternValue('band', s, 0.5, tile())).toBeCloseTo(1, 9);
    }
  });

  it('поперёк пояска профиль полукруглый', () => {
    // полуокружность: на четверти ширины высота = √(1 − ½²) = 0.866
    expect(patternValue('band', 0.4, 0.25, tile())).toBeCloseTo(Math.sqrt(3) / 2, 6);
    expect(patternValue('band', 0.4, 0, tile())).toBeCloseTo(0, 6);
    expect(patternValue('band', 0.4, 1, tile())).toBeCloseTo(0, 6);
  });
});

describe('греческий меандр', () => {
  const rail = MEANDER_PATH[0];
  const riser = MEANDER_PATH[1];
  const top = MEANDER_PATH[2];

  it('идёт непрерывной линией по низу пояска — соседние звенья связаны', () => {
    for (const s of [0, 0.2, 0.5, 0.8, 0.99]) {
      expect(patternValue('meander', s, rail[1], tile()), `s=${s}`).toBeGreaterThan(0.9);
    }
  });

  it('линия проходит и вертикально, и горизонтально — это ключ, а не волна', () => {
    // на стояке и на верхней перекладине узор поднят
    expect(patternValue('meander', riser[0], 0.5, tile())).toBeGreaterThan(0.9);
    expect(patternValue('meander', 0.5, top[1], tile())).toBeGreaterThan(0.9);
  });

  it('в поле между линиями пусто', () => {
    // карман между верхней перекладиной и внутренним завитком
    expect(patternValue('meander', 0.5, 0.65, tile())).toBeLessThan(0.2);
  });

  it('ключ занимает почти весь тайл — иначе лента распадается на штампики', () => {
    const xs = MEANDER_PATH.flatMap(([x0, , x1]) => [x0, x1]);
    const ys = MEANDER_PATH.flatMap(([, y0, , y1]) => [y0, y1]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.9);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(0.65);
  });

  it('толщина линии одинакова по обеим осям, даже если тайл не квадратный', () => {
    const wide = tile({ elementMm: 60, bandMm: 20 });
    // отходим на 1 мм поперёк стояка и на тот же 1 мм поперёк перекладины
    const acrossS = patternValue('meander', riser[0] + 1 / 60, 0.5, wide);
    const acrossQ = patternValue('meander', 0.5, top[1] - 1 / 20, wide);
    expect(acrossS).toBeGreaterThan(0.2);
    expect(acrossQ).toBeGreaterThan(0.2);
    // главное здесь — равенство: считай мы расстояние в долях тайла, а не в
    // миллиметрах, стояки на растянутом тайле вышли бы втрое тоньше перекладин
    expect(acrossS).toBeCloseTo(acrossQ, 6);
  });
});

describe('точки — оттиск шара', () => {
  it('след круглый в миллиметрах, а не растянут по тайлу', () => {
    const wide = tile({ elementMm: 40, bandMm: 20, depthMm: 5 });
    // диаметр следа — по меньшей стороне тайла, то есть 20 мм
    const acrossS = patternValue('dots', 0.5 + 9 / 40, 0.5, wide);
    const acrossQ = patternValue('dots', 0.5, 0.5 + 9 / 20, wide);
    expect(acrossS).toBeGreaterThan(0);
    expect(acrossQ).toBeGreaterThan(0);
    expect(acrossS).toBeCloseTo(acrossQ, 6);
    // а на 11 мм от центра следа уже нет
    expect(patternValue('dots', 0.5 + 11 / 40, 0.5, wide)).toBe(0);
  });

  it('глубокий оттиск — полусфера с крутым бортиком, мелкий сходит на нет полого', () => {
    // след радиусом 10 мм; вдавили шар на всю глубину — это полусфера,
    // на половине радиуса высота √(1 − ½²) = 0.866
    expect(patternValue('dots', 0.5 + 5 / 20, 0.5, tile({ depthMm: 10 })))
      .toBeCloseTo(Math.sqrt(3) / 2, 4);

    // У самого края следа видна разница: полусфера обрывается почти отвесно,
    // а мелко вдавленный шар выходит к поверхности полого — без кратерного
    // бортика. Ровно этого и не хватало прежней сплющенной полусфере.
    const atEdge = (depthMm: number) => patternValue('dots', 0.5 + 9.8 / 20, 0.5, tile({ depthMm }));
    expect(atEdge(10)).toBeGreaterThan(atEdge(1) * 3);
    expect(atEdge(1)).toBeLessThan(0.06);
  });

  it('в центре — полная глубина, за краем следа — ноль', () => {
    expect(patternValue('dots', 0.5, 0.5, tile())).toBeCloseTo(1, 9);
    expect(patternValue('dots', 0, 0, tile())).toBe(0);
  });
});

describe('bandRepeats', () => {
  it('всегда целое и не меньше трёх', () => {
    for (const bandWidthMm of [2, 8, 25, 90]) {
      for (const radius of [8, 40, 160]) {
        const n = bandRepeats(band({ bandWidthMm, repeats: 0 }), { ...CTX, radiusAt: () => radius });
        expect(Number.isInteger(n), `w=${bandWidthMm} r=${radius}`).toBe(true);
        expect(n).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('авто: узкий поясок — больше мелких оттисков, широкий — меньше крупных', () => {
    expect(bandRepeats(band({ bandWidthMm: 6, repeats: 0 }), CTX))
      .toBeGreaterThan(bandRepeats(band({ bandWidthMm: 30, repeats: 0 }), CTX));
  });

  it('авто: на изделии вдвое толще укладывается примерно вдвое больше оттисков', () => {
    const thin = bandRepeats(band({ bandWidthMm: 10, repeats: 0 }), { ...CTX, radiusAt: () => 40 });
    const thick = bandRepeats(band({ bandWidthMm: 10, repeats: 0 }), { ...CTX, radiusAt: () => 80 });
    expect(thick / thin).toBeCloseTo(2, 0);
  });

  it('заданное вручную дробное число округляется до целого', () => {
    expect(bandRepeats(band({ repeats: 17.6 }), CTX)).toBe(18);
  });
});

describe('просвет между элементами', () => {
  it('без просвета элемент занимает весь шаг', () => {
    const solid = makeRoulette(one({ pattern: 'band', gapMm: 0, bandWidthMm: 30, depthMm: 2 }), CTX);
    for (const u of [0, 0.4, 1.7, 3.9]) {
      expect(Math.abs(solid(u, 0.62)), `u=${u}`).toBeGreaterThan(1.9);
    }
  });

  it('просвет разрывает узор на отдельные оттиски', () => {
    const dashed = makeRoulette(
      one({ pattern: 'band', gapMm: 12, bandWidthMm: 30, depthMm: 2, repeats: 16 }),
      CTX,
    );
    let touched = 0;
    let clear = 0;
    for (let i = 0; i < 400; i++) {
      const value = Math.abs(dashed((i / 400) * TAU, 0.62));
      if (value > 1.9) touched++;
      if (value < 1e-9) clear++;
    }
    expect(touched).toBeGreaterThan(20);
    expect(clear).toBeGreaterThan(20);
  });

  it('просвет шире шага не съедает узор полностью', () => {
    const squeezed = makeRoulette(
      one({ pattern: 'dots', gapMm: 500, bandWidthMm: 20, depthMm: 2 }),
      CTX,
    );
    let peak = 0;
    for (let i = 0; i < 2000; i++) {
      peak = Math.max(peak, Math.abs(squeezed((i / 2000) * TAU, 0.62)));
    }
    expect(peak).toBeGreaterThan(0.5);
  });
});

describe('шов θ = 0 / 2π', () => {
  it('узор смыкается для всех рисунков, наклонов и способов задать шаг', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      for (const repeats of [0, 12, 31]) {
        for (const angle of [0, 0.4, -0.9]) {
          for (const gapMm of [0, 5]) {
            const roll = makeRoulette(
              one({ pattern, repeats, angle, gapMm, bandWidthMm: 30 }), CTX,
            );
            for (const v of [0.35, 0.5, 0.62]) {
              expect(
                Math.abs(roll(TAU, v) - roll(0, v)),
                `${pattern} n=${repeats} angle=${angle} gap=${gapMm} v=${v}`,
              ).toBeLessThan(1e-6);
            }
          }
        }
      }
    }
  });
});

describe('пояс накатки', () => {
  it('за пределами пояса поверхность не тронута', () => {
    const roll = makeRoulette(one({ bandCenter: 0.5, bandWidthMm: 15 }), CTX);
    for (const v of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      expect(Math.abs(roll(1.0, v)), `v=${v}`).toBeLessThan(1e-9);
    }
    let inside = 0;
    for (let i = 0; i <= 200; i++) {
      if (Math.abs(roll(1.0, 0.45 + (i / 200) * 0.1)) > 1e-6) inside++;
    }
    expect(inside).toBeGreaterThan(50);
  });

  it('края пояса плавные — колесо не рубит ступеньку', () => {
    const roll = makeRoulette(one({ pattern: 'dots', bandCenter: 0.5, bandWidthMm: 30 }), CTX);
    let previous = roll(0.7, 0.39);
    for (let i = 1; i <= 60; i++) {
      const value = roll(0.7, 0.39 + (i / 60) * 0.04);
      expect(Math.abs(value - previous)).toBeLessThan(0.35);
      previous = value;
    }
  });

  it('глубина задаётся в миллиметрах и достигается', () => {
    for (const depthMm of [1.5, -2.5]) {
      const roll = makeRoulette(one({ pattern: 'rope', depthMm, bandWidthMm: 30 }), CTX);
      let peak = 0;
      for (let i = 0; i <= 400; i++) {
        for (let j = 0; j <= 60; j++) {
          const value = roll((i / 400) * TAU, 0.4 + (j / 60) * 0.2);
          if (Math.abs(value) > Math.abs(peak)) peak = value;
        }
      }
      expect(peak).toBeCloseTo(depthMm, 1);
      expect(Math.sign(peak)).toBe(Math.sign(depthMm));
    }
  });

  it('выключенный ролик ничего не делает', () => {
    expect(makeRoulette(sanitizeRoulette({ bands: [band({ on: false })] }), CTX)(1, 0.5)).toBe(0);
    expect(makeRoulette(sanitizeRoulette({ bands: [] }), CTX)(1, 0.5)).toBe(0);
  });
});

describe('несколько полос', () => {
  it('каждая живёт на своей высоте и не мешает соседям', () => {
    const state = sanitizeRoulette({
      bands: [
        band({ pattern: 'band', bandCenter: 0.3, bandWidthMm: 12, depthMm: 2 }),
        band({ pattern: 'meander', bandCenter: 0.7, bandWidthMm: 24, depthMm: 1.5 }),
      ],
    });
    const roll = makeRoulette(state, CTX);
    expect(Math.abs(roll(0.5, 0.3))).toBeGreaterThan(1);
    expect(Math.abs(roll(0.5, 0.5))).toBeLessThan(1e-9);
    let meanderPeak = 0;
    for (let i = 0; i < 200; i++) {
      meanderPeak = Math.max(meanderPeak, Math.abs(roll((i / 200) * TAU, 0.7)));
    }
    expect(meanderPeak).toBeGreaterThan(1);
  });

  it('перекрывающиеся полосы складываются, а не подменяют друг друга', () => {
    const alone = makeRoulette(one({ pattern: 'band', bandCenter: 0.5, bandWidthMm: 30, depthMm: 1 }), CTX);
    const doubled = makeRoulette(sanitizeRoulette({
      bands: [
        band({ pattern: 'band', bandCenter: 0.5, bandWidthMm: 30, depthMm: 1 }),
        band({ pattern: 'band', bandCenter: 0.5, bandWidthMm: 30, depthMm: 1 }),
      ],
    }), CTX);
    expect(doubled(0.4, 0.5)).toBeCloseTo(2 * alone(0.4, 0.5), 6);
  });

  it('у каждой полосы свой шаг: он считается по её собственному радиусу', () => {
    const ctx = { heightMm: 150, radiusAt: (v: number) => (v < 0.5 ? 40 : 80) };
    const low = bandRepeats(band({ bandCenter: 0.25, bandWidthMm: 10, repeats: 0 }), ctx);
    const high = bandRepeats(band({ bandCenter: 0.75, bandWidthMm: 10, repeats: 0 }), ctx);
    expect(high / low).toBeCloseTo(2, 0);
  });
});

describe('sanitizeRoulette', () => {
  it('не бросает на мусоре и отдаёт рабочие дефолты', () => {
    for (const raw of [null, 'узор', 3, { bands: 'нет' }, { bands: [null, 7] }]) {
      const state = sanitizeRoulette(raw);
      expect(Array.isArray(state.bands)).toBe(true);
      for (const item of state.bands) {
        expect(ROULETTE_PATTERNS).toContain(item.pattern);
        expect(Number.isFinite(item.bandCenter)).toBe(true);
      }
    }
  });

  it('старое состояние с одной полосой без обёртки тоже читается', () => {
    // ссылки, сохранённые до появления нескольких полос, не должны ломаться
    const legacy = sanitizeRoulette({ on: true, pattern: 'dots', bandCenter: 0.4, depthMm: 2 });
    expect(legacy.bands).toHaveLength(1);
    expect(legacy.bands[0].pattern).toBe('dots');
    expect(legacy.bands[0].bandCenter).toBe(0.4);
    expect(legacy.bands[0].on).toBe(true);
  });

  it('число полос ограничено сверху', () => {
    const many = sanitizeRoulette({ bands: Array.from({ length: 20 }, () => band()) });
    expect(many.bands).toHaveLength(MAX_BANDS);
  });

  it('идемпотентен, и по умолчанию узора нет', () => {
    const once = sanitizeRoulette({ bands: [band({ repeats: 9.4 })] });
    expect(sanitizeRoulette(once)).toEqual(once);
    expect(defaultRoulette().bands.every((b) => !b.on)).toBe(true);
  });
});
