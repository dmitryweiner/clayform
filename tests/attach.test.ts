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
import { defaultSpout, sanitizeSpout, makeSpout } from '../src/geo/spout';
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

  it('нижнее крепление не может оказаться выше верхнего', () => {
    const state = sanitizeHandle({ on: true, topAt: 0.4, bottomAt: 0.9 });
    expect(state.bottomAt).toBeLessThan(state.topAt);
  });
});

describe('изделие с ручкой', () => {
  it('одна ручка делает в теле сквозное отверстие: род 1', () => {
    const mesh = buildSolidVessel(csg, cup(), handleOn());
    expect(validateMesh(mesh).watertight).toBe(true);
    expect(genusOf(mesh)).toBe(1);
  });

  it('две ручки — род 2', () => {
    expect(genusOf(buildSolidVessel(csg, cup(), handleOn({ count: 2 })))).toBe(2);
  });

  it('без ручки род нулевой и CSG не запускается', () => {
    const plain = buildSolidVessel(csg, cup(), sanitizeHandle({ on: false }));
    expect(genusOf(plain)).toBe(0);
    expect(plain.positions.length).toBe(buildVessel(cup()).positions.length);
  });

  it('прирост объёма равен ручке за вычетом утопленных торцов', () => {
    const profile = buildProfile('cup', defaultFamilyParams('cup'), 95);
    const handleVolume = validateMesh(buildHandles(handleOn(), profile, 95)[0]).volume;
    const plain = validateMesh(buildVessel(cup())).volume;
    const withHandle = validateMesh(buildSolidVessel(csg, cup(), handleOn())).volume;
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
      const mesh = buildSolidVessel(csg, params, handleOn({ topAt: 0.8, bottomAt: 0.35 }));
      expect(validateMesh(mesh).watertight, family).toBe(true);
      expect(genusOf(mesh), family).toBe(1);
    }
  });
});

describe('полая кружка с ручкой', () => {
  it('замкнута, с отверстием ручки, и полость на месте', () => {
    const result = buildPrintableVessel(
      csg, cup(), sanitizeHollow({ wallMm: 3, baseMm: 4 }), handleOn(),
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
    const withHandle = buildPrintableVessel(csg, params, hollow, handleOn());
    const plain = buildPrintableVessel(csg, params, hollow, sanitizeHandle({ on: false }));
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
});
