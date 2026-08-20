// Тело вращения: силуэт → замкнутый солид в миллиметрах.
// Проверяем габариты (то, что человек мерит линейкой) и пригодность к печати.

import { buildVessel, vesselGrid, defaultBuildParams, gridRadiusAt } from '../src/geo/build';
import { validateMesh, overhangFraction } from '../src/geo/validate';
import { defaultFamilyParams, FAMILY_IDS } from '../src/geo/profiles';

describe('buildVessel', () => {
  it('каждое семейство даёт watertight-солид с нормалями наружу', () => {
    for (const family of FAMILY_IDS) {
      const mesh = buildVessel({ ...defaultBuildParams(), family, shape: defaultFamilyParams(family) });
      const report = validateMesh(mesh);
      expect(report.watertight, family).toBe(true);
      expect(report.finite, family).toBe(true);
      expect(report.volume, family).toBeGreaterThan(0);
      expect(report.degenerateTriangles, family).toBe(0);
    }
  });

  it('габариты совпадают с заданными в миллиметрах', () => {
    const heightMm = 150;
    const mesh = buildVessel({
      ...defaultBuildParams(),
      family: 'cup',
      shape: { ...defaultFamilyParams('cup'), dRim: 90, dFoot: 70, barrel: 0, rimFlare: 0 },
      heightMm,
      nu: 256,
    });
    const { min, max } = validateMesh(mesh).bbox;
    expect(min[2]).toBeCloseTo(0, 6);
    expect(max[2]).toBeCloseTo(heightMm, 6);
    // 256-гранник вписан в окружность: замер по граням чуть меньше диаметра
    expect(max[0] - min[0]).toBeGreaterThan(90 * 0.999);
    expect(max[0] - min[0]).toBeLessThanOrEqual(90);
  });

  it('дно плоское и лежит на столе — печатать можно без плота', () => {
    const mesh = buildVessel({ ...defaultBuildParams(), family: 'bowl', shape: defaultFamilyParams('bowl') });
    let onBed = 0;
    for (let i = 2; i < mesh.positions.length; i += 3) {
      if (Math.abs(mesh.positions[i]) < 1e-6) onBed++;
    }
    expect(onBed).toBeGreaterThan(10);
  });

  it('объём чашки-цилиндра сходится с аналитическим', () => {
    const mesh = buildVessel({
      ...defaultBuildParams(),
      family: 'cup',
      shape: { ...defaultFamilyParams('cup'), dRim: 80, dFoot: 80, barrel: 0, rimFlare: 0 },
      heightMm: 100,
      nu: 512,
    });
    const analytic = Math.PI * 40 * 40 * 100;
    expect(validateMesh(mesh).volume).toBeCloseTo(analytic, -2);
  });

  it('миска по умолчанию печатается без критических свесов', () => {
    const mesh = buildVessel({ ...defaultBuildParams(), family: 'bowl', shape: defaultFamilyParams('bowl') });
    expect(overhangFraction(mesh, 60)).toBeLessThan(0.35);
  });
});

describe('vesselGrid', () => {
  it('сетка замкнута по u и покрывает высоту от 0 до heightMm', () => {
    const p = { ...defaultBuildParams(), nu: 32, nv: 16, heightMm: 120 };
    const grid = vesselGrid(p);
    expect(grid.nu).toBe(32);
    expect(grid.nv).toBe(16);
    expect(grid.positions.length).toBe(32 * 17 * 3);
    expect(grid.positions[2]).toBeCloseTo(0, 6);
    expect(grid.positions[(16 * 32) * 3 + 2]).toBeCloseTo(120, 6);
  });

  it('в каждом кольце радиус одинаков — тело вращения без рельефа', () => {
    const grid = vesselGrid({ ...defaultBuildParams(), family: 'vase', nu: 24, nv: 8 });
    for (let j = 0; j <= 8; j++) {
      const first = gridRadiusAt(grid, 0, j);
      for (let i = 1; i < 24; i++) {
        // допуск относительный: позиции хранятся во Float32, и на r ≈ 80 мм
        // единица младшего разряда сама по себе даёт ~6·10⁻⁶ мм
        expect(Math.abs(gridRadiusAt(grid, i, j) - first) / first).toBeLessThan(1e-6);
      }
    }
  });

  it('вырожденную детализацию зажимает, а не падает', () => {
    expect(() => vesselGrid({ ...defaultBuildParams(), nu: 2, nv: 0 })).not.toThrow();
    const grid = vesselGrid({ ...defaultBuildParams(), nu: 2, nv: 0 });
    expect(grid.nu).toBeGreaterThanOrEqual(8);
    expect(grid.nv).toBeGreaterThanOrEqual(4);
  });
});

describe('defaultBuildParams', () => {
  it('это горшок с параметрами и высотой своего семейства', () => {
    const p = defaultBuildParams();
    expect(p.family).toBe('pot');
    expect(p.shape).toEqual(defaultFamilyParams('pot'));
    expect(p.heightMm).toBe(150);
  });
});
