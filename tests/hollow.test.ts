// Полое изделие для прямой печати из глины.
//
// Толщина стенки меряется ПО НОРМАЛИ к поверхности, а не по горизонтали:
// у миски стенка идёт под 30–40° к столу, и радиальный сдвиг на 3 мм дал бы
// реальную толщину около 1,5 мм. Печатать такое нельзя.

import { buildHollowVessel, defaultHollow, sanitizeHollow } from '../src/geo/hollow';
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import {
  FAMILY_IDS, defaultFamilyParams, familyById, buildProfile, profileRadius,
} from '../src/geo/profiles';
import { sanitizeRelief } from '../src/geo/relief';

const params = (family: string, over: Record<string, unknown> = {}) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 96,
  nv: 96,
  ...over,
});

describe('buildHollowVessel', () => {
  it('каждое семейство даёт замкнутый солид с полостью внутри', () => {
    for (const family of FAMILY_IDS) {
      const hollow = buildHollowVessel(params(family), sanitizeHollow({ wallMm: 3, baseMm: 4 }));
      const report = validateMesh(hollow.mesh);
      expect(report.watertight, family).toBe(true);
      expect(report.finite, family).toBe(true);
      expect(report.volume, family).toBeGreaterThan(0);

      const solid = validateMesh(buildVessel(params(family))).volume;
      expect(report.volume, family).toBeLessThan(solid);
      expect(hollow.capacityMl, family).toBeGreaterThan(0);
    }
  });

  it('материал плюс полость даёт ровно сплошное тело', () => {
    // тождество держится только если венчик полости лежит в той же
    // плоскости, что и венчик изделия, — это и защищаем
    const p = params('cup');
    const hollow = buildHollowVessel(p, sanitizeHollow({ wallMm: 3, baseMm: 4 }));
    const solid = validateMesh(buildVessel(p)).volume;
    const material = validateMesh(hollow.mesh).volume;
    expect(material + hollow.capacityMl * 1000).toBeCloseTo(solid, 0);
    expect(hollow.capacityMl).toBeGreaterThan(0.2);
  });

  it('у цилиндра стенка ровно заданной толщины', () => {
    const p = params('cup', {
      shape: { ...defaultFamilyParams('cup'), dRim: 80, dFoot: 80, barrel: 0, rimFlare: 0 },
      heightMm: 100,
    });
    const hollow = buildHollowVessel(p, sanitizeHollow({ wallMm: 3.5, baseMm: 5 }));
    const inner = hollow.innerGrid;
    // середина по высоте — вдали от пола и венчика
    const j = Math.round(inner.nv * 0.5);
    for (let i = 0; i < inner.nu; i += 11) {
      const rIn = Math.hypot(
        inner.positions[(j * inner.nu + i) * 3],
        inner.positions[(j * inner.nu + i) * 3 + 1],
      );
      expect(40 - rIn).toBeCloseTo(3.5, 2);
    }
  });

  it('у наклонной стенки миски толщина меряется по нормали, а не по радиусу', () => {
    // прямой конус: дно ⌀80, верх ⌀240, высота 80 → стенка под 45°
    const p = params('bowl', {
      shape: { ...defaultFamilyParams('bowl'), dRim: 240, dFoot: 80, curvature: 0, footH: 0, rimFlare: 0 },
      heightMm: 80,
    });
    const wallMm = 4;
    const hollow = buildHollowVessel(p, sanitizeHollow({ wallMm, baseMm: 5 }));
    const inner = hollow.innerGrid;

    // образующая конуса: r = 40 + k·z, k = (120 − 40)/80 = 1
    const k = 1;
    const norm = Math.hypot(1, k);
    for (let j = Math.round(inner.nv * 0.3); j < inner.nv * 0.9; j += 7) {
      const base = j * inner.nu * 3;
      const rIn = Math.hypot(inner.positions[base], inner.positions[base + 1]);
      const zIn = inner.positions[base + 2];
      // расстояние от точки до образующей = |r − 40 − k·z| / √(1+k²)
      const distance = Math.abs(rIn - 40 - k * zIn) / norm;
      expect(distance, `j=${j}`).toBeCloseTo(wallMm, 1);
      // радиальный зазор заметно больше толщины — ровно та ошибка, которой
      // мы избегаем, отказавшись от радиального сдвига
      expect(40 + k * zIn - rIn).toBeGreaterThan(wallMm * 1.3);
    }
  });

  it('дно полости плоское и лежит на заданной высоте', () => {
    const baseMm = 6;
    const hollow = buildHollowVessel(params('pot'), sanitizeHollow({ wallMm: 3, baseMm }));
    const inner = hollow.innerGrid;
    for (let i = 0; i < inner.nu; i += 5) {
      expect(inner.positions[i * 3 + 2]).toBeCloseTo(baseMm, 4);
    }
  });

  it('внешнее дно остаётся на столе — печатать можно без плота', () => {
    const hollow = buildHollowVessel(params('bowl'), sanitizeHollow({ wallMm: 3, baseMm: 4 }));
    const { min } = validateMesh(hollow.mesh).bbox;
    expect(min[2]).toBeCloseTo(0, 6);
  });

  it('габариты снаружи не меняются от того, что изделие полое', () => {
    const p = params('vase');
    const solid = validateMesh(buildVessel(p)).extents;
    const hollow = validateMesh(buildHollowVessel(p, sanitizeHollow({ wallMm: 3, baseMm: 5 })).mesh).extents;
    for (let i = 0; i < 3; i++) expect(hollow[i]).toBeCloseTo(solid[i], 4);
  });

  it('полость целиком лежит внутри силуэта — на своей высоте, а не на чужой', () => {
    // Ряды полости и внешней сетки соответствуют РАЗНЫМ высотам: полость
    // начинается от пола. Сравнивать радиусы по одинаковому j бессмысленно,
    // поэтому проверяем каждую точку против силуэта на её собственном z.
    for (const family of FAMILY_IDS) {
      const p = params(family);
      const profile = buildProfile(family, defaultFamilyParams(family), p.heightMm);
      const inner = buildHollowVessel(p, sanitizeHollow({ wallMm: 3, baseMm: 5 })).innerGrid;
      for (let j = 0; j <= inner.nv; j++) {
        const base = (j * inner.nu) * 3;
        const rIn = Math.hypot(inner.positions[base], inner.positions[base + 1]);
        const z = inner.positions[base + 2];
        expect(rIn, `${family} j=${j}`).toBeLessThan(profileRadius(profile, z / p.heightMm));
      }
    }
  });

  it('рельеф внутрь глубже стенки не протыкает её, а зажимается с предупреждением', () => {
    const p = params('pot', {
      relief: sanitizeRelief({
        wave: { on: true, axis: 'z', shape: 'sin', freq: 12, ampMm: -8, phase: 0, spiralK: 0 },
        zone: { from: 0.1, to: 0.9, fade: 0.05 },
      }),
    });
    const hollow = buildHollowVessel(p, sanitizeHollow({ wallMm: 6, baseMm: 5 }));
    expect(validateMesh(hollow.mesh).watertight).toBe(true);
    expect(hollow.pinchedFraction).toBeGreaterThan(0);
  });

  it('гладкое изделие не сообщает о зажатой стенке', () => {
    const hollow = buildHollowVessel(params('cup'), sanitizeHollow({ wallMm: 3, baseMm: 4 }));
    expect(hollow.pinchedFraction).toBe(0);
  });

  it('нелепо толстая стенка не ломает меш', () => {
    for (const wallMm of [20, 60]) {
      const hollow = buildHollowVessel(params('cup'), sanitizeHollow({ wallMm, baseMm: 60 }));
      const report = validateMesh(hollow.mesh);
      expect(report.watertight, `wall=${wallMm}`).toBe(true);
      expect(report.volume, `wall=${wallMm}`).toBeGreaterThan(0);
    }
  });
});

describe('sanitizeHollow', () => {
  it('зажимает в печатный диапазон и не бросает на мусоре', () => {
    expect(sanitizeHollow({ wallMm: 0 }).wallMm).toBeGreaterThanOrEqual(0.8);
    expect(sanitizeHollow({ wallMm: 1e6 }).wallMm).toBeLessThanOrEqual(60);
    expect(sanitizeHollow(null)).toEqual(defaultHollow());
    expect(sanitizeHollow({ baseMm: NaN }).baseMm).toBe(defaultHollow().baseMm);
  });

  it('идемпотентен', () => {
    const once = sanitizeHollow({ wallMm: 2.7, baseMm: 3.4 });
    expect(sanitizeHollow(once)).toEqual(once);
  });
});
