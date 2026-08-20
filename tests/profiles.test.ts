// Профили семейств посуды: параметры → силуэт r(t) в миллиметрах.
//
// Главное свойство, которое здесь защищается: заявленный диаметр — это
// действительно диаметр готовой формы. Ради него интерполяция ограничена по
// Фричу–Карлсону, иначе кубический сплайн перелетает контрольные точки и
// «диаметр тулова 180 мм» превращается в 190.

import {
  FAMILIES, FAMILY_IDS, familyById, isFamilyId, defaultFamilyParams,
  clampFamilyParams, buildProfile, profileRadius, MIN_RADIUS_MM,
} from '../src/geo/profiles';

/** Радиусы профиля в n точках по высоте. */
function samples(id: string, params: Record<string, number>, heightMm = 140, n = 201): number[] {
  const def = buildProfile(id, params, heightMm);
  return Array.from({ length: n }, (_, i) => profileRadius(def, i / (n - 1)));
}

const maxOf = (xs: number[]): number => xs.reduce((a, b) => Math.max(a, b), -Infinity);

describe('реестр семейств', () => {
  it('ровно четыре семейства из плана, с русскими подписями', () => {
    expect(FAMILY_IDS).toEqual(['pot', 'bowl', 'cup', 'vase']);
    for (const family of FAMILIES) {
      expect(family.label.length).toBeGreaterThan(0);
      expect(family.params.length).toBeGreaterThan(2);
    }
  });

  it('isFamilyId отсеивает чужие строки', () => {
    expect(isFamilyId('pot')).toBe(true);
    expect(isFamilyId('teapot')).toBe(false);
  });

  it('у каждого параметра дефолт внутри своего диапазона', () => {
    for (const family of FAMILIES) {
      for (const spec of family.params) {
        expect(spec.default).toBeGreaterThanOrEqual(spec.min);
        expect(spec.default).toBeLessThanOrEqual(spec.max);
        expect(spec.label.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('дефолты каждого семейства', () => {
  for (const family of FAMILIES) {
    it(`${family.id}: силуэт конечен и всюду положителен`, () => {
      const rs = samples(family.id, defaultFamilyParams(family.id));
      for (const r of rs) {
        expect(Number.isFinite(r)).toBe(true);
        expect(r).toBeGreaterThanOrEqual(MIN_RADIUS_MM);
      }
      expect(maxOf(rs)).toBeGreaterThan(10);
    });
  }
});

describe('clampFamilyParams', () => {
  it('зажимает выход за диапазон и подставляет дефолт вместо мусора', () => {
    const spec = familyById('pot').params;
    const dBelly = spec.find((s) => s.key === 'dBelly');
    if (!dBelly) throw new Error('нет параметра dBelly');

    const clamped = clampFamilyParams('pot', { dBelly: 1e6, dNeck: NaN });
    expect(clamped.dBelly).toBe(dBelly.max);
    expect(clamped.dNeck).toBe(spec.find((s) => s.key === 'dNeck')?.default);
  });

  it('добирает отсутствующие ключи дефолтами и выкидывает чужие', () => {
    const clamped = clampFamilyParams('cup', { dRim: 80, ктулху: 1 });
    expect(clamped.dRim).toBe(80);
    expect(clamped).not.toHaveProperty('ктулху');
    for (const spec of familyById('cup').params) {
      expect(clamped).toHaveProperty(spec.key);
    }
  });
});

describe('pot — горшок/крынка/корчага', () => {
  const base = defaultFamilyParams('pot');

  it('максимальный диаметр равен заявленному dBelly (сплайн не перелетает)', () => {
    const rs = samples('pot', { ...base, dBelly: 180 });
    expect(maxOf(rs) * 2).toBeCloseTo(180, 6);
  });

  it('горло уже тулова — форма закрытая, поднутрение обязано появиться', () => {
    const params = { ...base, dBelly: 180, dNeck: 90, neckH: 0.15 };
    const def = buildProfile('pot', params, 140);
    const rNeck = profileRadius(def, 1 - params.neckH);
    expect(rNeck * 2).toBeCloseTo(90, 6);
    expect(maxOf(samples('pot', params))).toBeGreaterThan(rNeck);
  });

  it('rimFlare отгибает венчик наружу относительно горла', () => {
    const params = { ...base, dNeck: 90, neckH: 0.18 };
    const straight = buildProfile('pot', { ...params, rimFlare: 0 }, 140);
    const flared = buildProfile('pot', { ...params, rimFlare: 0.4 }, 140);
    expect(profileRadius(straight, 1) * 2).toBeCloseTo(90, 6);
    expect(profileRadius(flared, 1) * 2).toBeCloseTo(90 * 1.4, 6);
  });

  it('shoulder сдвигает перелом «тулово→горло» вверх, не меняя габаритов', () => {
    const params = { ...base, dBelly: 180, dNeck: 80, bellyAt: 0.45, neckH: 0.2 };
    const soft = buildProfile('pot', { ...params, shoulder: 0 }, 140);
    const hard = buildProfile('pot', { ...params, shoulder: 1 }, 140);
    // на полпути от тулова к горлу резкое плечо ещё держит широкий диаметр
    const t = (0.45 + 0.8) / 2;
    expect(profileRadius(hard, t)).toBeGreaterThan(profileRadius(soft, t));
    expect(maxOf(samples('pot', { ...params, shoulder: 1 })) * 2).toBeCloseTo(180, 6);
  });
});

describe('bowl — миска/тарелка/пиала', () => {
  const base = defaultFamilyParams('bowl');

  it('расширяется кверху монотонно: у открытой формы нет поднутрений', () => {
    for (const curvature of [0, 0.5, 1]) {
      const rs = samples('bowl', { ...base, curvature, rimFlare: 0 });
      for (let i = 1; i < rs.length; i++) {
        expect(rs[i]).toBeGreaterThanOrEqual(rs[i - 1] - 1e-6);
      }
    }
  });

  it('curvature=0 — прямой конус, curvature=1 — выпуклая пиала', () => {
    const params = { ...base, dRim: 200, dFoot: 80, footH: 0, rimFlare: 0 };
    const cone = buildProfile('bowl', { ...params, curvature: 0 }, 90);
    const round = buildProfile('bowl', { ...params, curvature: 1 }, 90);
    const middleOfCone = (40 + 100) / 2;
    expect(profileRadius(cone, 0.5)).toBeCloseTo(middleOfCone, 1);
    expect(profileRadius(round, 0.5)).toBeGreaterThan(middleOfCone + 5);
  });

  it('диаметры краёв равны заявленным', () => {
    const def = buildProfile('bowl', { ...base, dRim: 220, dFoot: 70, rimFlare: 0 }, 80);
    expect(profileRadius(def, 0) * 2).toBeCloseTo(70, 6);
    expect(profileRadius(def, 1) * 2).toBeCloseTo(220, 6);
  });

  it('footH поднимает изделие на ножку постоянного диаметра', () => {
    const def = buildProfile('bowl', { ...base, dFoot: 70, footH: 20 }, 100);
    expect(profileRadius(def, 0) * 2).toBeCloseTo(70, 6);
    expect(profileRadius(def, 0.1) * 2).toBeCloseTo(70, 6); // 10 мм — ещё ножка
  });
});

describe('cup — чашка/стакан/кружка', () => {
  const base = defaultFamilyParams('cup');

  it('barrel=0 — прямой усечённый конус между заявленными диаметрами', () => {
    const def = buildProfile('cup', { ...base, dRim: 84, dFoot: 62, barrel: 0, rimFlare: 0 }, 95);
    expect(profileRadius(def, 0) * 2).toBeCloseTo(62, 6);
    expect(profileRadius(def, 1) * 2).toBeCloseTo(84, 6);
    expect(profileRadius(def, 0.5) * 2).toBeCloseTo(73, 1);
  });

  it('barrel>0 раздувает середину, barrel<0 — втягивает', () => {
    const params = { ...base, dRim: 84, dFoot: 62, rimFlare: 0 };
    const straight = profileRadius(buildProfile('cup', { ...params, barrel: 0 }, 95), 0.5);
    const fat = profileRadius(buildProfile('cup', { ...params, barrel: 0.3 }, 95), 0.5);
    const waisted = profileRadius(buildProfile('cup', { ...params, barrel: -0.2 }, 95), 0.5);
    expect(fat).toBeGreaterThan(straight + 3);
    expect(waisted).toBeLessThan(straight - 2);
  });
});

describe('vase — ваза/амфора/бутылка', () => {
  const base = defaultFamilyParams('vase');

  it('горло — локальный минимум между туловом и устьем', () => {
    const params = { ...base, dBelly: 160, dNeck: 50, dRim: 74, bellyAt: 0.38, neckAt: 0.78 };
    const def = buildProfile('vase', params, 260);
    const rNeck = profileRadius(def, 0.78);
    expect(rNeck * 2).toBeCloseTo(50, 6);
    expect(profileRadius(def, 0.38)).toBeGreaterThan(rNeck);
    expect(profileRadius(def, 1)).toBeGreaterThan(rNeck);
  });

  it('максимум силуэта — ровно тулово', () => {
    const rs = samples('vase', { ...base, dBelly: 160, dNeck: 50, dRim: 74 }, 260);
    expect(maxOf(rs) * 2).toBeCloseTo(160, 6);
  });
});

describe('profileRadius', () => {
  it('вне [0,1] отдаёт крайние значения, а не экстраполяцию', () => {
    const def = buildProfile('cup', defaultFamilyParams('cup'), 95);
    expect(profileRadius(def, -1)).toBe(profileRadius(def, 0));
    expect(profileRadius(def, 2)).toBe(profileRadius(def, 1));
  });

  it('непрерывен: соседние отсчёты не прыгают', () => {
    const def = buildProfile('pot', defaultFamilyParams('pot'), 140);
    let previous = profileRadius(def, 0);
    for (let i = 1; i <= 1000; i++) {
      const r = profileRadius(def, i / 1000);
      expect(Math.abs(r - previous)).toBeLessThan(3);
      previous = r;
    }
  });
});
