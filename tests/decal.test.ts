// Надпись на боку: кадр на стенке (дуга, длина вдоль силуэта, нормаль),
// рисунок текста и картинки, обрезка по стенке, гладкое поле и грубый оттиск.

import { buildProfile } from '../src/geo/profiles';
import type { Decal, DecalArt } from '../src/geo/decal';
import { artRect, artSampler, decalField, decalFrame, decalLayout, CALM_FADE_MM, CALM_MARGIN_MM, DECAL_BOTTOM_MM } from '../src/geo/decal';
import { familyById, defaultFamilyParams } from '../src/geo/profiles';
import { defaultBuildParams, vesselSurface } from '../src/geo/build';
import { defaultRelief } from '../src/geo/relief';

const bowl = (() => {
  const family = familyById('bowl');
  return { profile: buildProfile('bowl', {}, family.defaultHeightMm), heightMm: family.defaultHeightMm };
})();

/** Текст 4 × 2 px по 10 px/мм с началом в середине: 0,4 × 0,2 мм, всё залито. */
const TEXT: DecalArt = {
  kind: 'text',
  raster: { width: 40, height: 20, data: new Uint8Array(800).fill(255), pxPerMm: 10, cap: 1.5, originX: 20, originY: 10 },
};

const picture = (pixels: number[], w: number, h: number, invert = false, sizeMm = 40): DecalArt => ({
  kind: 'image',
  picture: { w, h, pixels: Uint8Array.from(pixels), invert },
  sizeMm,
});

const decal = (art: DecalArt, over: Partial<Decal> = {}): Decal => ({ art, angleDeg: 0, heightAt: 0.5, depthMm: 1, topMm: 70, ...over });

const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

describe('кадр надписи на стенке', () => {
  const frame = decalFrame(bowl.profile, bowl.heightMm, 0, 0.5);

  it('центр — на стенке «лицом» к камере (модельная −y), на высоте центра', () => {
    const [x, y, z] = frame.toModel(0, 0, 0);
    expect(x).toBeCloseTo(0, 6);
    expect(y).toBeCloseTo(-frame.r0, 6);
    expect(z).toBeCloseTo(0.5 * bowl.heightMm, 6);
  });

  it('плюс по углу — к носику (x > 0), 90° — ровно на нём', () => {
    expect(decalFrame(bowl.profile, bowl.heightMm, 30, 0.5).toModel(0, 0, 0)[0]).toBeGreaterThan(0);
    const [x, y] = decalFrame(bowl.profile, bowl.heightMm, 90, 0.5).toModel(0, 0, 0);
    expect(y).toBeCloseTo(0, 6);
    expect(x).toBeGreaterThan(0);
  });

  it('x — длина дуги на высоте центра, вправо, если смотреть снаружи', () => {
    const [x, y] = frame.toModel(10, 0, 0);
    // снаружи «лица» правая сторона — модельная +x
    expect(x).toBeGreaterThan(0);
    expect(Math.atan2(y, x) - Math.atan2(-1, 0)).toBeCloseTo(10 / frame.r0, 6);
  });

  it('y — длина вдоль силуэта, а не высота: на наклонной стенке миски шаг больше подъёма', () => {
    let length = 0;
    let previous = frame.toModel(0, 0, 0);
    for (let k = 1; k <= 100; k++) {
      const point = frame.toModel(0, (k * 20) / 100, 0);
      length += dist(point, previous);
      previous = point;
    }
    expect(length).toBeCloseTo(20, 1);
    const rise = frame.toModel(0, 20, 0)[2] - frame.toModel(0, 0, 0)[2];
    expect(rise).toBeLessThan(19);
  });

  it('z — по внешней нормали: от стенки ровно на |z|, наружу — дальше от оси', () => {
    const on = frame.toModel(5, 3, 0);
    const out = frame.toModel(5, 3, 2);
    const inside = frame.toModel(5, 3, -2);
    expect(dist(on, out)).toBeCloseTo(2, 6);
    expect(dist(on, inside)).toBeCloseTo(2, 6);
    expect(Math.hypot(out[0], out[1])).toBeGreaterThan(Math.hypot(on[0], on[1]));
  });

  it('local — обратное к toModel на стенке, и через шов u = 0 тоже', () => {
    const side = decalFrame(bowl.profile, bowl.heightMm, 90, 0.4);
    for (const [x, y] of [
      [0, 0],
      [12, -7],
      [-25, 9],
    ]) {
      const [px, py, pz] = side.toModel(x, y, 0);
      const [lx, ly] = side.local(Math.atan2(py, px), pz / bowl.heightMm);
      expect(lx).toBeCloseTo(x, 2);
      expect(ly).toBeCloseTo(y, 2);
    }
  });
});

describe('рисунок надписи', () => {
  it('текст лежит вокруг своего начала, по 1/pxPerMm мм на пиксель', () => {
    expect(artRect(TEXT)).toEqual({ x0: -2, x1: 2, y0: -1, y1: 1 });
    // начало в левом нижнем углу: рисунок правее и выше него
    const shifted: DecalArt = { kind: 'text', raster: { ...TEXT.raster, originX: 0, originY: 20 } };
    const rect = artRect(shifted);
    expect([rect.x0, rect.x1, rect.y0, rect.y1].map((value) => value + 0)).toEqual([0, 4, 0, 2]);
  });

  it('картинка — по центру, длинная сторона — размер', () => {
    expect(artRect(picture([0, 0], 2, 1))).toEqual({ x0: -20, x1: 20, y0: -10, y1: 10 });
  });

  it('у текста — покрытие, у картинки — яркость: белое на всю глубину, вне рисунка — 0', () => {
    expect(artSampler(TEXT)(0, 0)).toBeCloseTo(1);
    expect(artSampler(TEXT)(3, 0)).toBe(0);
    const art = picture([0, 255], 2, 1);
    expect(artSampler(art)(15, 0)).toBeCloseTo(1);
    expect(artSampler(art)(-15, 0)).toBe(0);
    expect(artSampler(art)(25, 0)).toBe(0);
  });

  it('инверсия меняет рисунок и фон местами, но вне картинки по-прежнему 0', () => {
    const art = picture([0, 255], 2, 1, true);
    expect(artSampler(art)(-15, 0)).toBeCloseTo(1);
    expect(artSampler(art)(15, 0)).toBe(0);
    expect(artSampler(art)(-25, 0)).toBe(0);
  });

  it('почти белый фон картинки стенку не трогает', () => {
    expect(artSampler(picture([5, 5], 2, 1))(0, 0)).toBe(0);
  });
});

describe('обрезка по стенке', () => {
  it('надпись посреди стенки не обрезана', () => {
    expect(decalLayout(decal(TEXT), bowl.profile, bowl.heightMm).clipped).toBe(false);
  });

  it('у самого дна, под кромкой и шире окружности — обрезана, и там её нет', () => {
    const low = decalLayout(decal(picture([255], 1, 1), { heightAt: 0.02 }), bowl.profile, bowl.heightMm);
    expect(low.clipped).toBe(true);
    expect(low.sample(0, low.room.y0 - 0.5)).toBe(0);
    expect(low.sample(0, low.room.y0 + 0.5)).toBeGreaterThan(0);
    const high = decalLayout(decal(picture([255], 1, 1), { heightAt: 0.97 }), bowl.profile, bowl.heightMm);
    expect(high.clipped).toBe(true);
    const wide = decalLayout(decal(picture([255, 255, 255, 255], 4, 1, false, 2000)), bowl.profile, bowl.heightMm);
    expect(wide.clipped).toBe(true);
    expect(wide.room.x1).toBeCloseTo(Math.PI * wide.frame.r0 - 1, 6);
  });

  it('низ надписи — не ниже двух миллиметров от дна', () => {
    const layout = decalLayout(decal(TEXT), bowl.profile, bowl.heightMm);
    expect(layout.frame.toModel(0, layout.room.y0, 0)[2]).toBeCloseTo(DECAL_BOTTOM_MM, 1);
  });
});

describe('гладкое поле и грубый оттиск', () => {
  const field = decalField([decal(TEXT, { depthMm: -0.8 })], bowl.profile, bowl.heightMm);
  const frame = decalFrame(bowl.profile, bowl.heightMm, 0, 0.5);
  const at = (x: number, y: number): [number, number] => {
    const [px, py, pz] = frame.toModel(x, y, 0);
    return [Math.atan2(py, px), pz / bowl.heightMm];
  };

  it('под надписью и в поле вокруг рельефа нет, дальше он набирает силу', () => {
    expect(field.calm(...at(0, 0))).toBe(0);
    expect(field.calm(...at(2 + CALM_MARGIN_MM - 0.1, 0))).toBe(0);
    const middle = field.calm(...at(2 + CALM_MARGIN_MM + CALM_FADE_MM / 2, 0));
    expect(middle).toBeGreaterThan(0.2);
    expect(middle).toBeLessThan(0.8);
    expect(field.calm(...at(2 + CALM_MARGIN_MM + CALM_FADE_MM + 1, 0))).toBe(1);
    expect(field.calm(...at(0, 30))).toBe(1);
  });

  it('оттиск — глубина надписи по её рисунку', () => {
    expect(field.proxy(...at(0, 0))).toBeCloseTo(-0.8, 3);
    expect(field.proxy(...at(10, 0))).toBe(0);
  });

  it('без надписей поле ничего не делает', () => {
    const none = decalField([], bowl.profile, bowl.heightMm);
    expect(none.calm(1, 0.5)).toBe(1);
    expect(none.proxy(1, 0.5)).toBe(0);
  });
});

describe('сетка тела с надписью', () => {
  const params = (proxy: boolean) => ({
    ...defaultBuildParams(),
    family: 'bowl',
    shape: defaultFamilyParams('bowl'),
    heightMm: bowl.heightMm,
    relief: { ...defaultRelief(), wave: { ...defaultRelief().wave, on: true, axis: 'theta' as const, freq: 40, ampMm: 1 } },
    decals: [decal(TEXT, { depthMm: -0.8 })],
    decalProxy: proxy,
  });
  const frame = decalFrame(bowl.profile, bowl.heightMm, 0, 0.5);
  const centre = (() => {
    const [px, py, pz] = frame.toModel(0, 0, 0);
    return [Math.atan2(py, px), pz / bowl.heightMm] as const;
  })();

  it('под надписью волна гаснет, в стороне — как была', () => {
    const surface = vesselSurface(params(false));
    expect(surface.depthAt(...centre) + 0).toBe(0);
    const far = Math.max(...Array.from({ length: 40 }, (_, k) => Math.abs(surface.depthAt(centre[0] + Math.PI / 2 + k / 400, 0.5))));
    expect(far).toBeGreaterThan(0.9);
  });

  it('оттиск — только у главного потока (decalProxy): воркер строит тела', () => {
    expect(vesselSurface(params(true)).depthAt(...centre)).toBeCloseTo(-0.8, 3);
    expect(vesselSurface(params(false)).depthAt(...centre) + 0).toBe(0);
  });
});
