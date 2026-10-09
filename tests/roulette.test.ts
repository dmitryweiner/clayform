// Ролик: узоры, накатываемые колесом по вращающемуся изделию.
//
// Физика накатки задаёт главный инвариант: колесо катится по замкнутой
// окружности, поэтому за оборот должно уложиться целое число оттисков.
// Дробное число даёт видимый стык — «недокат», который на реальном изделии
// приходится замазывать вручную.

import {
  ROULETTE_PATTERNS, patternValue, bandRepeats, bandLayout, makeRoulette,
  defaultRoulette, defaultBand, sanitizeRoulette, sanitizeBand, MAX_BANDS,
  MEANDER_CLASSIC, gridPattern, isContinuous, decodeImage, tileAspect,
} from '../src/geo/roulette';
import type { RouletteBand, RouletteImage, TileContext } from '../src/geo/roulette';
import { encodeBase64 } from '../src/geo/bytes';

/** Шахматка: белая клетка — полная глубина. Строки сверху вниз. */
function checker(w: number, h: number, invert = false): RouletteImage {
  const bytes = Uint8Array.from({ length: w * h }, (_, k) => ((k % w) + Math.floor(k / w)) % 2 ? 255 : 0);
  return { w, h, data: encodeBase64(bytes), invert };
}
const CHECKER = checker(8, 8);

const TAU = Math.PI * 2;
const CTX = { heightMm: 150, radiusAt: () => 80 };

const tile = (over: Partial<TileContext> = {}): TileContext =>
  ({ elementMm: 20, bandMm: 20, depthMm: 1.5, image: decodeImage(CHECKER) ?? undefined, ...over });

const band = (over: Partial<RouletteBand> = {}): RouletteBand =>
  ({ ...defaultBand(), on: true, image: CHECKER, ...over });

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
  const W = MEANDER_CLASSIC[0].length;
  const H = MEANDER_CLASSIC.length;
  // квадратный тайл и квадратные клетки: 7 мм на клетку
  const square = tile({ elementMm: W * 7, bandMm: H * 7 });
  /** центр клетки (ряд r сверху, столбец c) в координатах тайла */
  const centre = (r: number, c: number): [number, number] => [(c + 0.5) / W, 1 - (r + 0.5) / H];

  it('линия поднята в каждой #-клетке и опущена в каждой .-клетке', () => {
    // обходим сетку, а не перечисляем точки: тест переживёт смену рисунка
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        const value = patternValue('meander', ...centre(r, c), square);
        if (MEANDER_CLASSIC[r][c] === '#') expect(value, `#(${r},${c})`).toBeGreaterThan(0.99);
        else expect(value, `.(${r},${c})`).toBeLessThan(1e-9);
      }
    }
  });

  it('рельс непрерывен — и внутри тайла, и через стык соседних', () => {
    const rail = 1 - (H - 0.5) / H;
    for (let i = 0; i <= 100; i++) {
      expect(patternValue('meander', i / 100, rail, square), `s=${i / 100}`).toBeGreaterThan(0.99);
    }
  });

  it('соседние звенья разделены пустым столбцом над рельсом', () => {
    for (let r = 0; r < H - 1; r++) {
      expect(patternValue('meander', ...centre(r, W - 1), square), `r=${r}`).toBeLessThan(1e-9);
    }
  });

  it('прогоны склеены: отрезков столько, сколько прямых участков линии', () => {
    // рельс, левый стояк, верх, правый стояк, низ спирали, её стояк и верх
    expect(gridPattern(MEANDER_CLASSIC).segments).toHaveLength(7);
  });

  it('тайл меандра квадратный в клетках — сетка задаёт пропорции', () => {
    const one = bandLayout(band({ pattern: 'meander', bandWidthMm: 20 }), CTX);
    expect(one.stepMm).toBeCloseTo(20 * W / H, 0);
  });

  it('толщина линии одинакова по обеим осям, даже если тайл не квадратный', () => {
    const wide = tile({ elementMm: 3 * W * 7, bandMm: H * 7 });
    const [sx] = centre(2, 2);
    const [, qy] = centre(0, 2);
    // отходим на 1 мм поперёк стояка спирали и на тот же 1 мм поперёк верха
    const acrossS = patternValue('meander', sx + 1 / wide.elementMm, centre(3, 2)[1], wide);
    const acrossQ = patternValue('meander', centre(0, 3)[0], qy - 1 / wide.bandMm, wide);
    expect(acrossS).toBeGreaterThan(0.2);
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
        const n = bandRepeats(band({ bandWidthMm }), { ...CTX, radiusAt: () => radius });
        expect(Number.isInteger(n), `w=${bandWidthMm} r=${radius}`).toBe(true);
        expect(n).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('узкий поясок — больше мелких оттисков, широкий — меньше крупных', () => {
    expect(bandRepeats(band({ bandWidthMm: 6 }), CTX))
      .toBeGreaterThan(bandRepeats(band({ bandWidthMm: 30 }), CTX));
  });

  it('на изделии вдвое толще укладывается примерно вдвое больше оттисков', () => {
    const thin = bandRepeats(band({ bandWidthMm: 10 }), { ...CTX, radiusAt: () => 40 });
    const thick = bandRepeats(band({ bandWidthMm: 10 }), { ...CTX, radiusAt: () => 80 });
    expect(thick / thin).toBeCloseTo(2, 0);
  });
});

describe('просвет', () => {
  it('у одиночного узора размер оттиска от просвета не зависит, а число убывает', () => {
    const tight = bandLayout(band({ pattern: 'dots', bandWidthMm: 14, gapMm: 0 }), CTX);
    const loose = bandLayout(band({ pattern: 'dots', bandWidthMm: 14, gapMm: 8 }), CTX);
    expect(loose.elementMm).toBeCloseTo(14, 9);
    // без просвета округление число оттисков может только поджать элемент
    // до шага — на доли миллиметра
    expect(tight.elementMm).toBeCloseTo(14, 1);
    expect(loose.repeats).toBeLessThan(tight.repeats);
    // округление достаётся просвету: шаг сходится с окружностью ровно
    expect(loose.repeats * (loose.elementMm + loose.gapMm)).toBeCloseTo(TAU * 80, 6);
    expect(loose.gapMm).toBeGreaterThan(6);
  });

  it('непрерывному узору просвет безразличен — смещение то же, что без него', () => {
    for (const pattern of ROULETTE_PATTERNS.filter(isContinuous)) {
      const plain = makeRoulette(one({ pattern, gapMm: 0, bandWidthMm: 30 }), CTX);
      const gapped = makeRoulette(one({ pattern, gapMm: 12, bandWidthMm: 30 }), CTX);
      for (const u of [0, 0.4, 1.7, 3.9]) {
        for (const v of [0.55, 0.62, 0.7]) expect(gapped(u, v), pattern).toBe(plain(u, v));
      }
    }
  });

  it('без просвета полоса занимает весь шаг', () => {
    const solid = makeRoulette(one({ pattern: 'band', gapMm: 0, bandWidthMm: 30, depthMm: 2 }), CTX);
    for (const u of [0, 0.4, 1.7, 3.9]) {
      expect(Math.abs(solid(u, 0.62)), `u=${u}`).toBeGreaterThan(1.9);
    }
  });

  it('просвет разрывает одиночный узор на отдельные оттиски', () => {
    const dashed = makeRoulette(one({ pattern: 'dashes', gapMm: 12, bandWidthMm: 20, depthMm: 2 }), CTX);
    let touched = 0;
    let clear = 0;
    for (let i = 0; i < 400; i++) {
      const value = Math.abs(dashed((i / 400) * TAU, 0.62));
      if (value > 1.5) touched++;
      if (value < 1e-9) clear++;
    }
    expect(touched).toBeGreaterThan(5);
    expect(clear).toBeGreaterThan(100);
  });

  it('предельный просвет оставляет редкие оттиски, а не съедает узор', () => {
    const roll = one({ pattern: 'dots', gapMm: 500, bandWidthMm: 20, depthMm: 2 });
    expect(bandRepeats(roll.bands[0], CTX)).toBeLessThanOrEqual(5);
    const squeezed = makeRoulette(roll, CTX);
    let peak = 0;
    for (let i = 0; i < 2000; i++) {
      peak = Math.max(peak, Math.abs(squeezed((i / 2000) * TAU, 0.62)));
    }
    expect(peak).toBeGreaterThan(1.9);
  });
});

describe('шов θ = 0 / 2π', () => {
  it('узор смыкается для всех рисунков, наклонов и способов задать шаг', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      for (const bandWidthMm of [9, 30, 47]) {
        for (const angle of [0, 0.4, -0.9]) {
          for (const gapMm of [0, 5]) {
            const roll = makeRoulette(
              one({ pattern, angle, gapMm, bandWidthMm }), CTX,
            );
            for (const v of [0.35, 0.5, 0.62]) {
              expect(
                Math.abs(roll(TAU, v) - roll(0, v)),
                `${pattern} w=${bandWidthMm} angle=${angle} gap=${gapMm} v=${v}`,
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
    const low = bandRepeats(band({ bandCenter: 0.25, bandWidthMm: 10 }), ctx);
    const high = bandRepeats(band({ bandCenter: 0.75, bandWidthMm: 10 }), ctx);
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

  it('старое поле repeats не бросает и отбрасывается', () => {
    const legacy = sanitizeBand({ ...band(), repeats: 17 });
    expect('repeats' in legacy).toBe(false);
    expect(sanitizeBand(legacy)).toEqual(legacy);
  });

  it('идемпотентен, и по умолчанию узора нет', () => {
    const once = sanitizeRoulette({ bands: [band({ gapMm: 9.4, depthMm: 99 })] });
    expect(sanitizeRoulette(once)).toEqual(once);
    expect(defaultRoulette().bands.every((b) => !b.on)).toBe(true);
  });
});

describe('орнамент картинкой', () => {
  const at = (s: number, q: number, image = CHECKER) =>
    patternValue('image', s, q, tile({ image: decodeImage(image) ?? undefined }));

  it('в центрах клеток — 0 или 1, на границе соседних — половина', () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const white = (row + col) % 2 === 1;
        // строка 0 — верх картинки, а q растёт снизу вверх
        expect(at((col + 0.5) / 8, 1 - (row + 0.5) / 8), `${row},${col}`).toBeCloseTo(white ? 1 : 0, 9);
      }
    }
    expect(at(1 / 8, 1 - 0.5 / 8)).toBeCloseTo(0.5, 9);
  });

  it('инверсия меняет рисунок и фон местами', () => {
    const inverted = checker(8, 8, true);
    for (const [s, q] of [[0.0625, 0.9375], [0.3, 0.41], [0.77, 0.2]]) {
      expect(at(s, q, inverted)).toBeCloseTo(1 - at(s, q), 9);
    }
  });

  it('периодична по окружности, зажата поперёк пояска', () => {
    for (const q of [0.1, 0.5, 0.93]) expect(at(0.999999, q)).toBeCloseTo(at(-0.000001, q), 4);
    expect(at(0.3, 1.2)).toBe(at(0.3, 1));
  });

  it('тайл держит пропорции картинки: ширина пояска — её высота', () => {
    expect(tileAspect({ pattern: 'image', image: checker(32, 8) })).toBe(4);
    const wide = bandLayout(band({ pattern: 'image', image: checker(32, 8), bandWidthMm: 10, gapMm: 10 }), CTX);
    expect(wide.elementMm).toBeCloseTo(40, 0);
    expect(isContinuous('image')).toBe(false);
  });

  it('испорченная картинка отбрасывается, и узор откатывается', () => {
    for (const image of [
      { ...CHECKER, data: 'не base64' },
      { ...CHECKER, data: encodeBase64(new Uint8Array(10)) },
      { ...CHECKER, w: 2 },
      { ...CHECKER, w: 65 },
      { ...CHECKER, h: 8.5 },
      'картинка',
    ]) {
      const sane = sanitizeBand({ ...band({ pattern: 'image' }), image });
      expect(sane.pattern).toBe('rope');
      expect(sane.image).toBeUndefined();
      expect(sanitizeBand(sane)).toEqual(sane);
    }
  });

  it('без картинки полоса-картинка ничего не делает, но узор не теряется', () => {
    const empty = sanitizeBand({ ...band({ pattern: 'image' }), image: undefined });
    expect(empty.pattern).toBe('image');
    expect(makeRoulette({ bands: [empty] }, CTX)(1, 0.62)).toBe(0);
  });

  it('целая картинка переживает санацию и ложится на изделие', () => {
    const sane = sanitizeBand(band({ pattern: 'image', depthMm: 2, bandWidthMm: 20 }));
    expect(sane.image).toEqual(CHECKER);
    expect(sanitizeBand(sane)).toEqual(sane);
    const roll = makeRoulette({ bands: [sane] }, CTX);
    let peak = 0;
    // середина пояска — граница строк шахматки; берём центр строки
    const v = 0.62 + (20 / 150) * (0.5 / 8);
    for (let i = 0; i < 2000; i++) peak = Math.max(peak, roll((i / 2000) * TAU, v));
    expect(peak).toBeGreaterThan(1.9);
  });
});
