// Рельеф: волна, волна волны и зона действия по высоте.
//
// Сквозная тема тестов — шов. Поверхность замкнута по θ, и любая волна,
// бегущая вокруг изделия, обязана попасть сама в себя при u = 2π. Дробное
// число гребней даёт ступеньку по шву, которую видно и на печати, и в форме.

import {
  waveform, axisCoord, zoneWeight, reliefDepth, defaultRelief, sanitizeRelief,
  WAVE_SHAPES, WAVE_AXES,
} from '../src/geo/relief';

const TAU = Math.PI * 2;

describe('waveform', () => {
  it('все формы периодичны с периодом 1 и лежат в [-1, 1]', () => {
    for (const shape of WAVE_SHAPES) {
      for (let i = 0; i <= 40; i++) {
        const p = i / 40;
        const value = waveform(shape, p);
        expect(Math.abs(value), `${shape} @${p}`).toBeLessThanOrEqual(1.0001);
        expect(waveform(shape, p + 3), `${shape} период @${p}`).toBeCloseTo(value, 9);
      }
    }
  });

  it('все формы нечётны относительно нуля и проходят через ноль в 0 и 0.5', () => {
    for (const shape of WAVE_SHAPES) {
      expect(waveform(shape, 0), shape).toBeCloseTo(0, 9);
      expect(waveform(shape, 0.5), shape).toBeCloseTo(0, 9);
      expect(waveform(shape, 0.25), shape).toBeGreaterThan(0.5);
      expect(waveform(shape, 0.75), shape).toBeLessThan(-0.5);
    }
  });

  it('sin — это ровно синус', () => {
    for (let i = 0; i <= 20; i++) {
      const p = i / 20;
      expect(waveform('sin', p)).toBeCloseTo(Math.sin(TAU * p), 9);
    }
  });

  it('tri — кусочно-линейный треугольник с вершинами ±1', () => {
    expect(waveform('tri', 0.25)).toBeCloseTo(1, 9);
    expect(waveform('tri', 0.75)).toBeCloseTo(-1, 9);
    expect(waveform('tri', 0.125)).toBeCloseTo(0.5, 9);
    expect(waveform('tri', 0.375)).toBeCloseTo(0.5, 9);
  });

  it('square — сглаженный меандр: полка почти плоская, но без разрыва', () => {
    expect(waveform('square', 0.25)).toBeCloseTo(1, 6);
    expect(waveform('square', 0.35)).toBeGreaterThan(0.9);
    // непрерывность на фронте: соседние отсчёты не прыгают
    let previous = waveform('square', 0.49);
    for (let i = 0; i <= 40; i++) {
      const value = waveform('square', 0.49 + i / 4000);
      expect(Math.abs(value - previous)).toBeLessThan(0.2);
      previous = value;
    }
  });

  it('rounded — полукруглые валики: круче синуса у гребня', () => {
    expect(waveform('rounded', 0.25)).toBeCloseTo(1, 9);
    expect(waveform('rounded', 0.1)).toBeGreaterThan(Math.sin(TAU * 0.1));
  });
});

describe('axisCoord — куда бежит волна', () => {
  it('z: зависит от высоты и не зависит от угла', () => {
    expect(axisCoord('z', 0, 0.3, 0)).toBe(0.3);
    expect(axisCoord('z', 2, 0.3, 0)).toBe(0.3);
  });

  it('theta: один оборот по окружности = одна единица координаты', () => {
    expect(axisCoord('theta', 0, 0.4, 0)).toBeCloseTo(0, 9);
    expect(axisCoord('theta', TAU, 0.4, 0)).toBeCloseTo(1, 9);
  });

  it('spiral: подъём на k единиц за оборот', () => {
    expect(axisCoord('spiral', TAU, 0.2, 3) - axisCoord('spiral', 0, 0.2, 3)).toBeCloseTo(3, 9);
  });
});

describe('шов θ = 0 / 2π', () => {
  it('волна вокруг изделия смыкается сама с собой при любой частоте', () => {
    for (const axis of WAVE_AXES) {
      for (const freq of [1, 2.5, 7, 13.4]) {
        for (const spiralK of [0, 1, 2.7]) {
          const relief = sanitizeRelief({
            wave: { on: true, axis, shape: 'sin', freq, ampMm: 4, phase: 0, spiralK },
          });
          for (const v of [0.2, 0.5, 0.9]) {
            const start = reliefDepth(relief, 0, v);
            const end = reliefDepth(relief, TAU, v);
            expect(Math.abs(end - start), `${axis} freq=${freq} k=${spiralK} v=${v}`)
              .toBeLessThan(1e-6);
          }
        }
      }
    }
  });

  it('дробную частоту вокруг оси округляет до целого числа гребней', () => {
    const relief = sanitizeRelief({
      wave: { on: true, axis: 'theta', shape: 'sin', freq: 6.4, ampMm: 3, phase: 0, spiralK: 0 },
    });
    expect(relief.wave.freq).toBe(6);
  });

  it('волна волны тоже смыкается по шву, в обоих режимах', () => {
    for (const mode of ['weave', 'modulate']) {
      const relief = sanitizeRelief({
        wave: { on: true, axis: 'z', shape: 'sin', freq: 8, ampMm: 4, phase: 0, spiralK: 0 },
        wave2: { on: true, mode, axis: 'theta', shape: 'tri', freq: 5.3, phase: 0.3, fm: 0.4, am: 0.6, spiralK: 0 },
      });
      for (const v of [0.1, 0.55, 0.95]) {
        expect(Math.abs(reliefDepth(relief, TAU, v) - reliefDepth(relief, 0, v)), mode).toBeLessThan(1e-6);
      }
    }
  });

  it('дробный шаг спирали разрешён — округляется произведение, а не сам шаг', () => {
    const relief = sanitizeRelief({
      wave: { on: true, axis: 'spiral', shape: 'sin', freq: 16, ampMm: 3, phase: 0, spiralK: 0.7 },
    });
    // при 16 гребнях допустимы шаги кратные 1/16
    expect(relief.wave.spiralK).toBeCloseTo(11 / 16, 9);
    expect(Number.isInteger(relief.wave.spiralK)).toBe(false);
    expect(Number.isInteger(relief.wave.freq * relief.wave.spiralK)).toBe(true);
  });

  it('дробный шаг спирали смыкается по шву при любой частоте', () => {
    for (const freq of [3, 7, 16, 41]) {
      for (const spiralK of [0.2, 0.7, 1.35, 3.9, -2.4]) {
        const relief = sanitizeRelief({
          wave: { on: true, axis: 'spiral', shape: 'rounded', freq, ampMm: 3, phase: 0, spiralK },
        });
        for (const v of [0.15, 0.6, 0.9]) {
          expect(
            Math.abs(reliefDepth(relief, TAU, v) - reliefDepth(relief, 0, v)),
            `freq=${freq} k=${spiralK} v=${v}`,
          ).toBeLessThan(1e-6);
        }
      }
    }
  });
});

describe('волна волны: режим «плетение»', () => {
  const weave = (over: Record<string, unknown> = {}) => sanitizeRelief({
    wave: { on: true, axis: 'theta', shape: 'sin', freq: 12, ampMm: 4, phase: 0, spiralK: 0 },
    wave2: { on: true, mode: 'weave', axis: 'z', shape: 'sin', freq: 6, phase: 0, spiralK: 0, ...over },
    zone: { from: 0, to: 1, fade: 0 },
  });

  it('это произведение двух волн: обнуляется там, где обнуляется любая из них', () => {
    const relief = weave();
    // вторая волна по высоте, freq 6 → нули в v = k/6
    expect(reliefDepth(relief, 0.3, 1 / 6)).toBeCloseTo(0, 6);
    expect(reliefDepth(relief, 0.3, 2 / 6)).toBeCloseTo(0, 6);
    // первая волна вокруг оси, freq 12 → нули в u = 2πk/12
    expect(reliefDepth(relief, (2 * Math.PI) / 12, 0.42)).toBeCloseTo(0, 6);
  });

  it('в пучности достигает полной амплитуды', () => {
    const relief = weave();
    // обе волны в максимуме: u = 2π/48, v = 1/24
    expect(reliefDepth(relief, (2 * Math.PI) / 48, 1 / 24)).toBeCloseTo(4, 4);
  });

  it('даёт клетчатый рисунок: знак меняется и по кругу, и по высоте', () => {
    const relief = weave();
    const at = (u: number, v: number) => Math.sign(reliefDepth(relief, u, v));
    // соседняя клетка — это ПОЛпериода: у 12 гребней вокруг это 2π/24,
    // у 6 по высоте — 1/12
    const uLow = (2 * Math.PI) / 48;
    const uHigh = uLow + (2 * Math.PI) / 24;
    const vLow = 1 / 24;
    const vHigh = vLow + 1 / 12;
    expect(at(uLow, vLow)).toBe(1);
    expect(at(uHigh, vLow)).toBe(-1);
    expect(at(uLow, vHigh)).toBe(-1);
    expect(at(uHigh, vHigh)).toBe(1);
  });

  it('плетение и модуляция дают разный рельеф при одних параметрах', () => {
    const woven = weave();
    const modulated = sanitizeRelief({ ...woven, wave2: { ...woven.wave2, mode: 'modulate' } });
    let differs = 0;
    for (let i = 0; i <= 40; i++) {
      if (Math.abs(reliefDepth(woven, 1.1, i / 40) - reliefDepth(modulated, 1.1, i / 40)) > 0.2) differs++;
    }
    expect(differs).toBeGreaterThan(10);
  });

  it('фаза второй волны сдвигает рисунок по её оси', () => {
    const plain = weave();
    const shifted = weave({ phase: 0.25 });
    expect(reliefDepth(plain, 0.3, 1 / 6)).toBeCloseTo(0, 6);
    expect(Math.abs(reliefDepth(shifted, 0.3, 1 / 6))).toBeGreaterThan(1);
  });

  it('по умолчанию режим — плетение: оно проще и предсказуемее', () => {
    expect(defaultRelief().wave2.mode).toBe('weave');
  });
});

describe('reliefDepth', () => {
  const wave = { on: true, axis: 'z', shape: 'sin', freq: 6, ampMm: 5, phase: 0, spiralK: 0 };

  it('выключенная волна не смещает ничего', () => {
    const relief = sanitizeRelief({ wave: { ...wave, on: false } });
    expect(reliefDepth(relief, 1, 0.5)).toBe(0);
  });

  it('амплитуда задаётся в миллиметрах и достигается', () => {
    const relief = sanitizeRelief({ wave, zone: { from: 0, to: 1, fade: 0 } });
    let peak = 0;
    for (let i = 0; i <= 2000; i++) {
      peak = Math.max(peak, Math.abs(reliefDepth(relief, 0, i / 2000)));
    }
    expect(peak).toBeCloseTo(5, 2);
  });

  it('волна по z одинакова по всей окружности', () => {
    const relief = sanitizeRelief({ wave });
    const reference = reliefDepth(relief, 0, 0.42);
    for (const u of [0.7, 2.1, 4.9]) {
      expect(reliefDepth(relief, u, 0.42)).toBeCloseTo(reference, 9);
    }
  });

  it('фаза сдвигает волну, не меняя размаха', () => {
    // freq = 6, v = 0.5 → ровно три периода: несдвинутая волна в нуле
    const plain = sanitizeRelief({ wave });
    const shifted = sanitizeRelief({ wave: { ...wave, phase: 0.25 } });
    expect(reliefDepth(plain, 0, 0.5)).toBeCloseTo(0, 6);
    expect(reliefDepth(shifted, 0, 0.5)).toBeCloseTo(5, 6);
  });

  it('волна волны меняет рельеф, но не вырождает его', () => {
    const plain = sanitizeRelief({ wave });
    const modulated = sanitizeRelief({
      wave,
      wave2: { on: true, axis: 'theta', shape: 'sin', freq: 3, fm: 0.3, am: 0.5, spiralK: 0 },
    });
    let differs = false;
    for (let i = 0; i <= 100; i++) {
      const v = i / 100;
      if (Math.abs(reliefDepth(modulated, 1.1, v) - reliefDepth(plain, 1.1, v)) > 0.05) differs = true;
      expect(Number.isFinite(reliefDepth(modulated, 1.1, v))).toBe(true);
    }
    expect(differs).toBe(true);
  });

  it('модуляция амплитуды не выворачивает рельеф наизнанку', () => {
    // am зажат единицей: множитель 1 + am·w₂ не уходит в минус, иначе
    // выпуклые валики местами становились бы вогнутыми канавками
    const relief = sanitizeRelief({
      wave: { ...wave, freq: 4 },
      wave2: { on: true, axis: 'z', shape: 'sin', freq: 1, fm: 0, am: 1.5, spiralK: 0 },
    });
    expect(relief.wave2.am).toBe(1);
    for (let i = 0; i <= 500; i++) {
      expect(Math.abs(reliefDepth(relief, 0, i / 500))).toBeLessThanOrEqual(10 + 1e-6);
    }
  });
});

describe('zoneWeight — рельеф на участке высоты', () => {
  it('внутри зоны 1, снаружи 0', () => {
    const zone = { from: 0.3, to: 0.8, fade: 0.05 };
    expect(zoneWeight(zone, 0.55)).toBeCloseTo(1, 6);
    expect(zoneWeight(zone, 0.1)).toBeCloseTo(0, 6);
    expect(zoneWeight(zone, 0.95)).toBeCloseTo(0, 6);
  });

  it('края плавные и монотонные', () => {
    const zone = { from: 0.3, to: 0.8, fade: 0.1 };
    let previous = zoneWeight(zone, 0.28);
    for (let i = 1; i <= 50; i++) {
      const value = zoneWeight(zone, 0.28 + (i / 50) * 0.12);
      expect(value).toBeGreaterThanOrEqual(previous - 1e-9);
      previous = value;
    }
  });

  it('перевёрнутая зона (from > to) не даёт отрицательного веса', () => {
    const zone = { from: 0.9, to: 0.2, fade: 0.05 };
    for (let i = 0; i <= 20; i++) {
      expect(zoneWeight(zone, i / 20)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('sanitizeRelief', () => {
  it('не бросает на мусоре и отдаёт рабочие дефолты', () => {
    for (const raw of [null, 'нет', 7, { wave: { shape: 'кубизм', axis: 'w' } }]) {
      const relief = sanitizeRelief(raw);
      expect(WAVE_SHAPES).toContain(relief.wave.shape);
      expect(WAVE_AXES).toContain(relief.wave.axis);
      expect(Number.isFinite(relief.wave.ampMm)).toBe(true);
    }
  });

  it('идемпотентен', () => {
    const once = sanitizeRelief({ wave: { on: true, freq: 9.7, ampMm: 3 } });
    expect(sanitizeRelief(once)).toEqual(once);
  });

  it('по умолчанию рельефа нет — изделие гладкое', () => {
    expect(defaultRelief().wave.on).toBe(false);
    expect(reliefDepth(defaultRelief(), 1, 0.5)).toBe(0);
  });
});
