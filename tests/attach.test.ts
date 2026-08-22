// Ручка и носик.
//
// Главная проверка ручки — топологическая. Ручка, приклеенная обоими концами,
// делает в теле сквозное отверстие, то есть род поверхности становится 1.
// Если бы она отвалилась, повисла в воздухе или прилипла только одним концом,
// род остался бы нулевым, а объём — прежним. Никакая проверка «меш замкнут»
// этого не поймает.

import { initCSG } from '../src/geo/csg';
import type { CsgApi } from '../src/geo/csg';
import { CsgScope, toManifold } from '../src/geo/csg';
import { buildSolidVessel, buildPrintableVessel, unionAll } from '../src/geo/assemble';
import { buildHandles, defaultHandle, sanitizeHandle } from '../src/geo/handle';
import {
  defaultSpout, sanitizeSpout, makeSpout, buildAppliedSpout, appliedSpoutChannel, SPOUT_LIMITS,
} from '../src/geo/spout';
import { analyzeMold } from '../src/geo/mold';
import { buildVessel, defaultBuildParams, vesselGrid, gridRadiusAt } from '../src/geo/build';
import { sanitizeHollow } from '../src/geo/hollow';
import { validateMesh } from '../src/geo/validate';
import { buildProfile, profileRadius, defaultFamilyParams, familyById } from '../src/geo/profiles';

let csg: CsgApi;
beforeAll(async () => {
  csg = await initCSG();
});

const cup = (over: Record<string, unknown> = {}) => ({
  ...defaultBuildParams(),
  family: 'cup',
  shape: defaultFamilyParams('cup'),
  heightMm: familyById('cup').defaultHeightMm,
  nu: 96,
  nv: 96,
  ...over,
});

const handleOn = (over: Record<string, unknown> = {}) =>
  sanitizeHandle({ ...defaultHandle(), on: true, ...over });

/** Род поверхности: 0 — шар, 1 — кружка с ручкой, 2 — амфора с двумя. */
function genusOf(mesh: { positions: Float32Array; indices: Uint32Array }): number {
  const scope = new CsgScope();
  try {
    return scope.keep(toManifold(csg, mesh)).genus();
  } finally {
    scope.dispose();
  }
}

describe('buildHandles', () => {
  const profile = buildProfile('cup', defaultFamilyParams('cup'), 95);

  it('выключенная ручка не строит ничего', () => {
    expect(buildHandles(sanitizeHandle({ on: false }), profile, 95)).toHaveLength(0);
  });

  it('одна ручка — со стороны x < 0, напротив носика', () => {
    const [handle] = buildHandles(handleOn(), profile, 95);
    const { bbox } = validateMesh(handle);
    expect(bbox.max[0]).toBeLessThan(0);
  });

  it('две ручки зеркальны относительно плоскости разъёма', () => {
    const [left, right] = buildHandles(handleOn({ count: 2 }), profile, 95);
    const a = validateMesh(left).bbox;
    const b = validateMesh(right).bbox;
    expect(b.min[0]).toBeCloseTo(-a.max[0], 3);
    expect(b.max[0]).toBeCloseTo(-a.min[0], 3);
  });

  it('ручка лежит в плоскости разъёма — иначе форма не разнимется', () => {
    const state = handleOn({ thicknessMm: 12, widthRatio: 0.8 });
    const [handle] = buildHandles(state, profile, 95);
    const { bbox } = validateMesh(handle);
    const halfWidth = (state.thicknessMm * state.widthRatio) / 2;
    expect(Math.abs(bbox.max[1])).toBeCloseTo(halfWidth, 3);
    expect(Math.abs(bbox.min[1])).toBeCloseTo(halfWidth, 3);
  });

  it('слайдер «вынос» показывает фактический выступ за стенку', () => {
    for (const reachMm of [10, 30, 60]) {
      const state = handleOn({ reachMm });
      const [handle] = buildHandles(state, profile, 95);
      const farthest = -validateMesh(handle).bbox.min[0];
      const wall = Math.max(
        profileRadius(profile, state.topAt),
        profileRadius(profile, state.bottomAt),
      );
      // слайдер задаёт вынос осевой линии, поэтому вычитаем половину сечения
      expect(farthest - state.thicknessMm / 2 - wall, `reach=${reachMm}`)
        .toBeCloseTo(reachMm, 0);
    }
  });

  it('углы задают наклон, под которым дуга отходит от стенки', () => {
    // Касательная в начале смотрит на первую управляющую точку, поэтому угол
    // читается прямо по началу дуги: берём точку чуть дальше крепления.
    for (const topAngleDeg of [-45, 0, 45]) {
      const [handle] = buildHandles(handleOn({ topAngleDeg, bottomAngleDeg: 0 }), profile, 95);
      const top = validateMesh(handle).bbox.max[2];
      const flat = validateMesh(buildHandles(handleOn(), profile, 95)[0]).bbox.max[2];
      if (topAngleDeg > 0) expect(top, `${topAngleDeg}°`).toBeGreaterThan(flat + 3);
      if (topAngleDeg < 0) expect(top, `${topAngleDeg}°`).toBeLessThanOrEqual(flat + 0.5);
    }
  });

  it('угол нижнего крепления опускает низ дуги, не трогая верх', () => {
    const flat = validateMesh(buildHandles(handleOn(), profile, 95)[0]).bbox;
    const dropped = validateMesh(
      buildHandles(handleOn({ bottomAngleDeg: -50 }), profile, 95)[0],
    ).bbox;
    expect(dropped.min[2]).toBeLessThan(flat.min[2] - 3);
    expect(dropped.max[2]).toBeCloseTo(flat.max[2], 0);
  });

  it('при любых углах ручка остаётся в плоскости разъёма', () => {
    for (const topAngleDeg of [-70, 0, 70]) {
      for (const bottomAngleDeg of [-70, 0, 70]) {
        const state = handleOn({ topAngleDeg, bottomAngleDeg });
        const [handle] = buildHandles(state, profile, 95);
        const { bbox } = validateMesh(handle);
        const halfWidth = (state.thicknessMm * state.widthRatio) / 2;
        expect(Math.abs(bbox.max[1]), `${topAngleDeg}/${bottomAngleDeg}`).toBeCloseTo(halfWidth, 3);
      }
    }
  });

  it('нижнее крепление не может оказаться выше верхнего', () => {
    const state = sanitizeHandle({ on: true, topAt: 0.4, bottomAt: 0.9 });
    expect(state.bottomAt).toBeLessThan(state.topAt);
  });
});

describe('изделие с ручкой', () => {
  it('одна ручка делает в теле сквозное отверстие: род 1', () => {
    const mesh = buildSolidVessel(csg, cup(), handleOn(), defaultSpout());
    expect(validateMesh(mesh).watertight).toBe(true);
    expect(genusOf(mesh)).toBe(1);
  });

  it('две ручки — род 2', () => {
    expect(genusOf(buildSolidVessel(csg, cup(), handleOn({ count: 2 }), defaultSpout()))).toBe(2);
  });

  it('без ручки род нулевой и CSG не запускается', () => {
    const plain = buildSolidVessel(csg, cup(), sanitizeHandle({ on: false }), defaultSpout());
    expect(genusOf(plain)).toBe(0);
    expect(plain.positions.length).toBe(buildVessel(cup()).positions.length);
  });

  it('прирост объёма равен ручке за вычетом утопленных торцов', () => {
    const profile = buildProfile('cup', defaultFamilyParams('cup'), 95);
    const handleVolume = validateMesh(buildHandles(handleOn(), profile, 95)[0]).volume;
    const plain = validateMesh(buildVessel(cup())).volume;
    const withHandle = validateMesh(buildSolidVessel(csg, cup(), handleOn(), defaultSpout())).volume;
    const grew = withHandle - plain;
    expect(grew).toBeGreaterThan(handleVolume * 0.6);
    expect(grew).toBeLessThan(handleVolume);
  });

  it('приклеивается к любому семейству', () => {
    for (const family of ['pot', 'bowl', 'cup', 'vase']) {
      const params = cup({
        family,
        shape: defaultFamilyParams(family),
        heightMm: familyById(family).defaultHeightMm,
      });
      const mesh = buildSolidVessel(csg, params, handleOn({ topAt: 0.8, bottomAt: 0.35 }), defaultSpout());
      expect(validateMesh(mesh).watertight, family).toBe(true);
      expect(genusOf(mesh), family).toBe(1);
    }
  });
});

describe('полая кружка с ручкой', () => {
  it('замкнута, с отверстием ручки, и полость на месте', () => {
    const result = buildPrintableVessel(
      csg, cup(), sanitizeHollow({ wallMm: 3, baseMm: 4 }), handleOn(), defaultSpout(),
    );
    const report = validateMesh(result.mesh);
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0);
    // ручка + открытый верх: полость сама по себе рода не добавляет,
    // а вот сквозное отверстие под пальцы — да
    expect(genusOf(result.mesh)).toBe(1);
    expect(result.capacityMl).toBeGreaterThan(100);
  });

  it('торец ручки срезан полостью — внутри кружки нет бугра', () => {
    const params = cup();
    const hollow = sanitizeHollow({ wallMm: 3, baseMm: 4 });
    const withHandle = buildPrintableVessel(csg, params, hollow, handleOn(), defaultSpout());
    const plain = buildPrintableVessel(csg, params, hollow, sanitizeHandle({ on: false }), defaultSpout());
    // объём материала вырос ровно на ручку снаружи; если бы утопленные
    // торцы остались внутри полости, прирост был бы заметно больше
    const handleVolume = validateMesh(buildHandles(
      handleOn(), buildProfile('cup', defaultFamilyParams('cup'), 95), 95,
    )[0]).volume;
    const grew = validateMesh(withHandle.mesh).volume - validateMesh(plain.mesh).volume;
    expect(grew).toBeGreaterThan(handleVolume * 0.5);
    expect(grew).toBeLessThan(handleVolume);
  });
});

describe('unionAll', () => {
  it('объединение одного меша возвращает его же, без прогона через WASM', () => {
    const mesh = buildVessel(cup());
    expect(unionAll(csg, [mesh])).toBe(mesh);
  });

  it('пустой список — ошибка, а не молча пустой меш', () => {
    expect(() => unionAll(csg, [])).toThrow(/нечего объединять/);
  });
});

describe('носик-слив', () => {
  const withSpout = (over: Record<string, unknown> = {}) =>
    cup({ spout: sanitizeSpout({ ...defaultSpout(), on: true, ...over }) });

  it('вытягивает край только в свою сторону', () => {
    const plain = vesselGrid(cup());
    const spouted = vesselGrid(withSpout({ pullMm: 20, widthDeg: 60 }));
    const j = spouted.nv; // самый верхний ряд
    // i = 0 — это u = 0, то есть +x: середина слива
    expect(gridRadiusAt(spouted, 0, j) - gridRadiusAt(plain, 0, j)).toBeCloseTo(20, 1);
    // противоположная сторона не тронута
    const opposite = Math.round(spouted.nu / 2);
    expect(gridRadiusAt(spouted, opposite, j)).toBeCloseTo(gridRadiusAt(plain, opposite, j), 4);
  });

  it('не меняет высоту изделия и не трогает дно', () => {
    const plain = validateMesh(buildVessel(cup()));
    const spouted = validateMesh(buildVessel(withSpout({ pullMm: 25 })));
    expect(spouted.extents[2]).toBeCloseTo(plain.extents[2], 4);
    expect(spouted.bbox.min[2]).toBeCloseTo(0, 6);
    expect(spouted.watertight).toBe(true);
  });

  it('проходит через шов θ = 0 гладко — центр слива лежит ровно на нём', () => {
    const grid = vesselGrid(withSpout({ pullMm: 25, widthDeg: 70 }));
    const j = grid.nv;
    const steps: number[] = [];
    for (let i = 0; i < grid.nu; i++) {
      steps.push(Math.abs(gridRadiusAt(grid, i, j) - gridRadiusAt(grid, (i + 1) % grid.nu, j)));
    }
    // У косинусного горба в вершине нулевая производная, а вершина лежит
    // ровно на шве. Значит шаг через шов обязан быть в разы меньше типичного
    // шага на склоне слива — иначе носик рассечён.
    const seam = steps[grid.nu - 1];
    const biggest = Math.max(...steps);
    expect(seam).toBeLessThan(biggest * 0.3);
  });

  it('носик только добавляет материал наружу — стенка не может истончиться', () => {
    const pull = makeSpout(sanitizeSpout({ on: true, pullMm: 30, widthDeg: 90, zone: 0.3 }));
    for (let i = 0; i <= 50; i++) {
      for (let j = 0; j <= 50; j++) {
        expect(pull((i / 50) * Math.PI * 2, j / 50)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('выключенный носик не меняет ничего', () => {
    const plain = vesselGrid(cup());
    const off = vesselGrid(cup({ spout: sanitizeSpout({ on: false, pullMm: 30 }) }));
    expect(Array.from(off.positions)).toEqual(Array.from(plain.positions));
  });
});

/** Направление среза кончика носика — оно же касательная в конце дуги. */
function tipDirection(tipAngleDeg: number): { x: number; z: number } {
  const angle = (tipAngleDeg * Math.PI) / 180;
  return { x: Math.cos(angle), z: Math.sin(angle) };
}

/**
 * Насколько далеко меш заходит в заданном направлении. Торцевое кольцо трубы
 * перпендикулярно своей касательной, поэтому вдоль неё все его точки лежат
 * ровно на одной отметке — по ней и меряется кончик.
 */
function farthestAlong(mesh: { positions: Float32Array }, dir: { x: number; z: number }): number {
  let far = -Infinity;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    far = Math.max(far, mesh.positions[i] * dir.x + mesh.positions[i + 2] * dir.z);
  }
  return far;
}

describe('приставной носик', () => {
  const HEIGHT_MM = 140;
  const profile = buildProfile('pot', defaultFamilyParams('pot'), HEIGHT_MM);

  const teapotSpout = (over: Record<string, unknown> = {}) =>
    sanitizeSpout({ ...defaultSpout(), on: true, kind: 'applied', ...over });

  const teapot = (over: Record<string, unknown> = {}) =>
    cup({
      family: 'pot',
      shape: defaultFamilyParams('pot'),
      heightMm: HEIGHT_MM,
      spout: teapotSpout(),
      ...over,
    });

  const tubeOf = (state = teapotSpout()) => {
    const mesh = buildAppliedSpout(state, profile, HEIGHT_MM);
    if (!mesh) throw new Error('трубка не построилась');
    return mesh;
  };

  const channelOf = (state = teapotSpout(), wallMm = 3) => {
    const mesh = appliedSpoutChannel(state, profile, HEIGHT_MM, wallMm);
    if (!mesh) throw new Error('канал не построился');
    return mesh;
  };

  it('строится только у включённого носика вида applied', () => {
    expect(buildAppliedSpout(sanitizeSpout({ on: false, kind: 'applied' }), profile, HEIGHT_MM)).toBeNull();
    expect(buildAppliedSpout(sanitizeSpout({ on: true, kind: 'lip' }), profile, HEIGHT_MM)).toBeNull();
    expect(appliedSpoutChannel(sanitizeSpout({ on: true, kind: 'lip' }), profile, HEIGHT_MM, 3)).toBeNull();
  });

  it('две механики не складываются: у трубки вытяга края нет', () => {
    const pull = makeSpout(teapotSpout({ pullMm: 40 }));
    expect(pull(0, 1)).toBe(0);
  });

  it('трубка и канал — замкнутые меши', () => {
    for (const mesh of [tubeOf(), channelOf()]) {
      const report = validateMesh(mesh);
      expect(report.watertight).toBe(true);
      expect(report.volume).toBeGreaterThan(0);
      expect(report.degenerateTriangles).toBe(0);
    }
  });

  it('носик лежит в плоскости разъёма при x > 0 — напротив ручки', () => {
    for (const mesh of [tubeOf(), channelOf()]) {
      const { bbox } = validateMesh(mesh);
      expect(bbox.min[0]).toBeGreaterThan(0);
      // круглое сечение в плоскости y = 0: габарит по y симметричен
      expect(bbox.min[1]).toBeCloseTo(-bbox.max[1], 6);
    }
  });

  it('канал уже трубки ровно на стенку', () => {
    const wallMm = 3;
    const tube = validateMesh(tubeOf()).bbox;
    const channel = validateMesh(channelOf(teapotSpout(), wallMm)).bbox;
    expect(channel.max[1]).toBeCloseTo(tube.max[1] - wallMm, 1);
  });

  it('канал вскрывает устье и уходит внутрь полости', () => {
    const wallMm = 3;
    const state = teapotSpout();
    const along = tipDirection(state.tipAngleDeg);
    // вперёд канал выходит за торец трубки — иначе устье осталось бы глухим
    expect(farthestAlong(channelOf(state, wallMm), along))
      .toBeGreaterThan(farthestAlong(tubeOf(state), along) + 1);
    // назад — за внутреннюю поверхность стенки, то есть в саму полость
    const attachR = profileRadius(profile, state.attachAt);
    expect(validateMesh(channelOf(state, wallMm)).bbox.min[0]).toBeLessThan(attachR - wallMm);
  });

  it('длина ползунка — это вынос кончика от стенки', () => {
    // Дуга по пути наружу выпирает за кончик (у короткого носика заметно), и
    // габарит про длину поэтому не спросишь. Меряем именно кончик: дальше всех
    // по направлению его среза лежит ровно торцевое кольцо трубки.
    for (const lengthMm of [20, 70, 140]) {
      const state = teapotSpout({ lengthMm });
      const along = tipDirection(state.tipAngleDeg);
      const wall = profileRadius(profile, state.attachAt);
      const expected = (wall + lengthMm) * along.x + state.tipAt * HEIGHT_MM * along.z;
      expect(farthestAlong(tubeOf(state), along), `length=${lengthMm}`).toBeCloseTo(expected, 0);
    }
  });

  it('сплошной позитив с носиком собирается и остаётся замкнутым', () => {
    const mesh = buildSolidVessel(csg, teapot(), sanitizeHandle({ on: false }), teapotSpout());
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    // трубка приклеена, а не висит рядом: сплошное тело осталось односвязным
    expect(genusOf(mesh)).toBe(0);
    expect(report.volume).toBeGreaterThan(validateMesh(buildVessel(teapot())).volume);
  });

  it('канал действительно пробивает стенку: материала стало меньше на него', () => {
    const params = teapot();
    const hollow = sanitizeHollow({ wallMm: 3, baseMm: 4 });
    const spout = teapotSpout();
    const printable = buildPrintableVessel(csg, params, hollow, sanitizeHandle({ on: false }), spout);
    const report = validateMesh(printable.mesh);
    expect(report.watertight).toBe(true);

    // то же изделие с заглушенным каналом — просто оболочка плюс трубка
    const plugged = unionAll(csg, [
      buildPrintableVessel(csg, params, hollow, sanitizeHandle({ on: false }), defaultSpout()).mesh,
      tubeOf(spout),
    ]);
    const removed = validateMesh(plugged).volume - report.volume;
    const channelVolume = validateMesh(channelOf(spout, hollow.wallMm)).volume;
    // вычлось не больше самого канала (часть его идёт по уже пустой полости
    // и за кончиком трубки), но и не символические крохи
    expect(removed).toBeGreaterThan(channelVolume * 0.5);
    expect(removed).toBeLessThan(channelVolume);
  });

  it('носик и ручка уживаются на одном изделии', () => {
    const mesh = buildPrintableVessel(
      csg, teapot(), sanitizeHollow({ wallMm: 3, baseMm: 4 }), handleOn(), teapotSpout(),
    ).mesh;
    expect(validateMesh(mesh).watertight).toBe(true);
  });

  it('крайние значения ползунков не вырождают меш', () => {
    const limits = SPOUT_LIMITS;
    const corners = [
      // тонкий носик при толстой стенке: канал упирается в свой минимум
      { spout: { baseMm: limits.baseMm.min, tipMm: limits.tipMm.min }, wallMm: 12 },
      { spout: { lengthMm: limits.lengthMm.min, tipAngleDeg: limits.tipAngleDeg.max }, wallMm: 0.8 },
      { spout: { lengthMm: limits.lengthMm.max, tipAngleDeg: limits.tipAngleDeg.min }, wallMm: 3 },
      { spout: { attachAt: limits.attachAt.min, tipAt: limits.tipAt.max }, wallMm: 3 },
      { spout: { attachAt: limits.attachAt.max }, wallMm: 3 },
      { spout: { baseMm: limits.baseMm.max, tipMm: limits.tipMm.max }, wallMm: 60 },
    ];
    for (const corner of corners) {
      const spout = teapotSpout(corner.spout);
      const tag = JSON.stringify(corner.spout);
      expect(validateMesh(tubeOf(spout)).watertight, tag).toBe(true);
      expect(validateMesh(channelOf(spout, corner.wallMm)).watertight, tag).toBe(true);
      const mesh = buildPrintableVessel(
        csg,
        teapot({ spout }),
        sanitizeHollow({ wallMm: corner.wallMm, baseMm: 4 }),
        sanitizeHandle({ on: false }),
        spout,
      ).mesh;
      const report = validateMesh(mesh);
      expect(report.watertight, tag).toBe(true);
      expect(report.volume, tag).toBeGreaterThan(0);
    }
  });

  it('форма с носиком не бывает одночастной', () => {
    // миска сама по себе вынимается вверх — а с носиком уже нет
    const bowl = buildVessel(cup({ family: 'bowl', shape: defaultFamilyParams('bowl') }));
    expect(analyzeMold(bowl, { hasHandle: false }).scheme).toBe('dropout');
    const report = analyzeMold(bowl, { hasHandle: false, hasSpout: true });
    expect(report.scheme).not.toBe('dropout');
    expect(report.reason).toMatch(/носик/i);
  });
});

describe('санация ручки и носика', () => {
  it('не бросает на мусоре и идемпотентна', () => {
    for (const raw of [null, 'ручка', 5, { count: 'две', reachMm: NaN }]) {
      const handle = sanitizeHandle(raw);
      expect(sanitizeHandle(handle)).toEqual(handle);
      const spout = sanitizeSpout(raw);
      expect(sanitizeSpout(spout)).toEqual(spout);
    }
  });

  it('по умолчанию ни ручки, ни носика нет', () => {
    expect(defaultHandle().on).toBe(false);
    expect(defaultSpout().on).toBe(false);
  });

  it('старое состояние без вида носика — это оттянутый край', () => {
    // ссылки и пресеты, сохранённые до появления трубки, не должны менять смысл
    expect(sanitizeSpout({ on: true, pullMm: 20, widthDeg: 55, zone: 0.14 }).kind).toBe('lip');
    expect(sanitizeSpout({ kind: 'самовар' }).kind).toBe('lip');
    expect(sanitizeSpout({ kind: 'applied' }).kind).toBe('applied');
  });

  it('параметры трубки зажимаются в свои пределы', () => {
    const huge = sanitizeSpout({
      kind: 'applied', attachAt: 9, lengthMm: 1e6, tipAt: -3,
      baseMm: 1e6, tipMm: 1e6, tipAngleDeg: 1e6,
    });
    const keys: (keyof typeof SPOUT_LIMITS)[] =
      ['attachAt', 'lengthMm', 'tipAt', 'baseMm', 'tipMm', 'tipAngleDeg'];
    for (const key of keys) {
      expect(huge[key], key).toBeGreaterThanOrEqual(SPOUT_LIMITS[key].min);
      expect(huge[key], key).toBeLessThanOrEqual(SPOUT_LIMITS[key].max);
    }
  });

  it('трубка сужается к устью: кончик не толще основания', () => {
    const state = sanitizeSpout({ kind: 'applied', baseMm: 14, tipMm: 40 });
    expect(state.tipMm).toBeLessThanOrEqual(state.baseMm);
  });

  it('кончик не смотрит вниз: он всегда выше крепления', () => {
    for (const attachAt of [0.2, 0.5, 0.85]) {
      const state = sanitizeSpout({ kind: 'applied', attachAt, tipAt: 0 });
      expect(state.tipAt, `attachAt=${attachAt}`).toBeGreaterThanOrEqual(state.attachAt + 0.1);
    }
  });

  it('санация трубки идемпотентна на крайних значениях', () => {
    for (const raw of [
      { kind: 'applied', attachAt: 0.85, tipAt: 0.5, baseMm: 12, tipMm: 40 },
      { kind: 'applied', attachAt: -1, lengthMm: NaN, tipAngleDeg: 'вбок' },
    ]) {
      const once = sanitizeSpout(raw);
      expect(sanitizeSpout(once)).toEqual(once);
    }
  });
});
