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
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';

/** Радиусы профиля в n точках по высоте. */
function samples(id: string, params: Record<string, number>, heightMm = 140, n = 201): number[] {
  const def = buildProfile(id, params, heightMm);
  return Array.from({ length: n }, (_, i) => profileRadius(def, i / (n - 1)));
}

const maxOf = (xs: number[]): number => xs.reduce((a, b) => Math.max(a, b), -Infinity);

describe('реестр семейств', () => {
  it('ровно четыре семейства из плана', () => {
    expect(FAMILY_IDS).toEqual(['pot', 'bowl', 'cup', 'vase']);
    for (const family of FAMILIES) {
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

  it('угол у дна: стенка отходит от ножки под заданным углом, края на месте', () => {
    const params = { ...base, dRim: 200, dFoot: 80, footH: 6, rimFlare: 0, curvature: 0.8 };
    const heightMm = 90;
    for (const angle of [10, 35, 60, 85]) {
      const def = buildProfile('bowl', { ...params, baseAngle: angle }, heightMm);
      // наклон сразу над ножкой — по первому миллиметру стенки
      const t0 = 6 / heightMm;
      const dt = 1 / heightMm;
      const dr = profileRadius(def, t0 + dt) - profileRadius(def, t0);
      const measured = (Math.atan2(dt * heightMm, dr) * 180) / Math.PI;
      expect(measured, `угол ${angle}`).toBeCloseTo(angle, -1);
      expect(profileRadius(def, 0) * 2).toBeCloseTo(80, 6);
      expect(profileRadius(def, 1) * 2).toBeCloseTo(200, 3);
    }
    // 0 — авто: ровно прежний силуэт
    const auto = buildProfile('bowl', { ...params, baseAngle: 0 }, heightMm);
    const legacy = buildProfile('bowl', params, heightMm);
    expect(auto.points).toEqual(legacy.points);
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

  it('bulgeMm=0 — прямой усечённый конус между заявленными диаметрами', () => {
    const def = buildProfile('cup', { ...base, dRim: 84, dFoot: 62, bulgeMm: 0, rimFlare: 0 }, 95);
    expect(profileRadius(def, 0) * 2).toBeCloseTo(62, 6);
    expect(profileRadius(def, 1) * 2).toBeCloseTo(84, 6);
    expect(profileRadius(def, 0.5) * 2).toBeCloseTo(73, 1);
  });

  it('выпуклость — миллиметры над прямой стенкой на высоте выпуклости; <0 — талия', () => {
    const params = { ...base, dRim: 84, dFoot: 62, rimFlare: 0 };
    for (const bulgeAt of [0.3, 0.5, 0.7]) {
      const straight = (62 + (84 - 62) * bulgeAt) / 2;
      const fat = buildProfile('cup', { ...params, bulgeAt, bulgeMm: 8 }, 95);
      const waisted = buildProfile('cup', { ...params, bulgeAt, bulgeMm: -6 }, 95);
      expect(profileRadius(fat, bulgeAt), `at ${bulgeAt}`).toBeCloseTo(straight + 8, 6);
      expect(profileRadius(waisted, bulgeAt), `at ${bulgeAt}`).toBeCloseTo(straight - 6, 6);
    }
  });

  it('при цилиндре пик выпуклости стоит на заданной высоте', () => {
    const params = { ...base, dRim: 80, dFoot: 80, bulgeMm: 10, rimFlare: 0 };
    for (const bulgeAt of [0.25, 0.65]) {
      const rs = samples('cup', { ...params, bulgeAt }, 100, 401);
      expect(rs.indexOf(maxOf(rs)) / 400).toBeCloseTo(bulgeAt, 2);
    }
  });

  it('старая «бочка» переводится в мм от среднего радиуса, и перевод идемпотентен', () => {
    const once = clampFamilyParams('cup', { dRim: 88, dFoot: 70, barrel: 0.08 });
    expect(once.bulgeMm).toBeCloseTo(0.08 * (88 + 70) / 4, 9);
    expect(once).not.toHaveProperty('barrel');
    expect(clampFamilyParams('cup', once)).toEqual(once);
    // нынешний ключ главнее старого
    expect(clampFamilyParams('cup', { barrel: 0.3, bulgeMm: 1 }).bulgeMm).toBe(1);
    // дефолт — прежняя дефолтная бочка 0.06
    expect(clampFamilyParams('cup', { barrel: 0.06 }).bulgeMm).toBeCloseTo(base.bulgeMm, 9);
  });
});

/** Наклон силуэта dr/dt по обе стороны от t: излом — разные знаки и крутизна. */
function slopes(def: ReturnType<typeof buildProfile>, t: number, h = 1e-3): [number, number] {
  return [
    (profileRadius(def, t) - profileRadius(def, t - h)) / h,
    (profileRadius(def, t + h) - profileRadius(def, t)) / h,
  ];
}

describe('острота горба — горшок, ваза, чашка', () => {
  const cases: [string, Record<string, number>, number][] = [
    ['pot', { ...defaultFamilyParams('pot'), bellyAt: 0.5 }, 0.5],
    ['vase', { ...defaultFamilyParams('vase'), bellyAt: 0.4 }, 0.4],
    ['cup', { ...defaultFamilyParams('cup'), dRim: 80, dFoot: 80, bulgeMm: 10, bulgeAt: 0.5 }, 0.5],
  ];

  it.each(cases)('%s: ноль — ровно прежний силуэт', (id, params) => {
    const neutral = buildProfile(id, { ...params, sharpness: 0 }, 150);
    const legacy = buildProfile(id, Object.fromEntries(Object.entries(params).filter(([k]) => k !== 'sharpness')), 150);
    expect(neutral.points).toEqual(legacy.points);
  });

  it.each(cases)('%s: ширина и её высота не меняются', (id, params, peak) => {
    const r0 = maxOf(samples(id, { ...params, sharpness: 0 }, 150, 801));
    for (const sharpness of [-1, -0.5, 0.5, 1]) {
      const rs = samples(id, { ...params, sharpness }, 150, 801);
      expect(maxOf(rs), `${sharpness}`).toBeCloseTo(r0, 4);
      if (id !== 'cup') expect(rs.indexOf(maxOf(rs)) / 800, `${sharpness}`).toBeCloseTo(peak, 2);
    }
  });

  it.each(cases)('%s: +1 — ребро у пуза, −1 — полнее', (id, params, peak) => {
    const sharp = buildProfile(id, { ...params, sharpness: 1 }, 150);
    const round = buildProfile(id, { ...params, sharpness: 0 }, 150);
    const full = buildProfile(id, { ...params, sharpness: -1 }, 150);
    const [left, right] = slopes(sharp, peak);
    expect(left).toBeGreaterThan(20);
    expect(right).toBeLessThan(-20);
    const [l0, r0] = slopes(round, peak);
    expect(Math.abs(l0) + Math.abs(r0)).toBeLessThan((left - right) / 4);
    // на десятой доле высоты от пуза полный горб шире круглого, острый — уже
    for (const t of [peak - 0.1, peak + 0.1]) {
      expect(profileRadius(full, t)).toBeGreaterThan(profileRadius(round, t));
      expect(profileRadius(sharp, t)).toBeLessThan(profileRadius(round, t));
    }
  });

  it('у горла излома нет ни при какой остроте', () => {
    const params = { ...defaultFamilyParams('vase'), footH: 0 };
    const neck = defaultFamilyParams('vase').neckAt;
    for (const sharpness of [-1, 0, 1]) {
      const [l, r] = slopes(buildProfile('vase', { ...params, sharpness }, 260), neck, 1e-4);
      expect(Math.abs(l - r), `${sharpness}`).toBeLessThan(1);
    }
  });
});

describe('высота округлости миски — колено', () => {
  const base = { ...defaultFamilyParams('bowl'), dRim: 200, dFoot: 80, footH: 0, rimFlare: 0, curvature: 0.8 };

  it('нейтраль — прежний силуэт в обеих ветках', () => {
    for (const baseAngle of [0, 40]) {
      const neutral = { ...base, baseAngle, kneeAt: 0.29 };
      const legacy = Object.fromEntries(Object.entries(neutral).filter(([k]) => k !== 'kneeAt'));
      expect(buildProfile('bowl', neutral, 80).points).toEqual(buildProfile('bowl', legacy, 80).points);
    }
  });

  it('колено выше — стенка у дна круче и уже, края на месте', () => {
    for (const baseAngle of [0, 40]) {
      const low = buildProfile('bowl', { ...base, baseAngle, kneeAt: 0.15 }, 80);
      const high = buildProfile('bowl', { ...base, baseAngle, kneeAt: 0.6 }, 80);
      expect(profileRadius(high, 0.3), `угол ${baseAngle}`).toBeLessThan(profileRadius(low, 0.3) - 5);
      for (const def of [low, high]) {
        expect(profileRadius(def, 0) * 2).toBeCloseTo(80, 3);
        expect(profileRadius(def, 1) * 2).toBeCloseTo(200, 3);
      }
    }
  });

  it('колено не трогает угол у дна', () => {
    const heightMm = 90;
    for (const kneeAt of [0.15, 0.6]) {
      const def = buildProfile('bowl', { ...base, baseAngle: 35, kneeAt }, heightMm);
      const dt = 1 / heightMm;
      const dr = profileRadius(def, dt) - profileRadius(def, 0);
      expect((Math.atan2(dt * heightMm, dr) * 180) / Math.PI, `колено ${kneeAt}`).toBeCloseTo(35, -1);
    }
  });

  it('стенка монотонна при любом колене', () => {
    for (const kneeAt of [0.1, 0.29, 0.7]) {
      for (const curvature of [0, 1]) {
        const rs = samples('bowl', { ...base, curvature, kneeAt });
        for (let i = 1; i < rs.length; i++) expect(rs[i]).toBeGreaterThanOrEqual(rs[i - 1] - 1e-6);
      }
    }
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

  it('отгиб венчика раскрывает устье сверх заданного диаметра', () => {
    const params = { ...base, dBelly: 160, dNeck: 50, dRim: 74 };
    expect(profileRadius(buildProfile('vase', { ...params, rimFlare: 0 }, 260), 1) * 2)
      .toBeCloseTo(74, 6);
    expect(profileRadius(buildProfile('vase', { ...params, rimFlare: 0.5 }, 260), 1) * 2)
      .toBeCloseTo(111, 6);
    // отрицательный подбирает край внутрь
    expect(profileRadius(buildProfile('vase', { ...params, rimFlare: -0.2 }, 260), 1) * 2)
      .toBeCloseTo(59.2, 6);
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

describe('скругления у дна и у ножки', () => {
  const at = (def: ReturnType<typeof buildProfile>, z: number) => profileRadius(def, z / def.heightMm);

  it('кромка дна цилиндра — четверть окружности радиуса R', () => {
    const shape = { ...defaultFamilyParams('cup'), dRim: 80, dFoot: 80, bulgeMm: 0, rimFlare: 0 };
    const R = 6;
    const sharp = buildProfile('cup', shape, 100);
    const round = buildProfile('cup', { ...shape, baseFillet: R }, 100);
    expect(at(round, 0)).toBeCloseTo(40 - R, 1);
    // на высоте R(1 − cos45°) дуга отходит от оси на R·sin45°
    expect(at(round, R * (1 - Math.SQRT1_2))).toBeCloseTo(40 - R + R * Math.SQRT1_2, 1);
    for (const z of [R + 1, 30, 70]) expect(at(round, z), `z=${z}`).toBeCloseTo(at(sharp, z), 1);
  });

  it('скругление ножки добавляет материал во внутренний угол и только там', () => {
    const shape = { ...defaultFamilyParams('bowl'), footH: 8, curvature: 0.86 };
    const sharp = buildProfile('bowl', shape, 80);
    const round = buildProfile('bowl', { ...shape, footFillet: 5 }, 80);
    let added = 0;
    for (let z = 0; z <= 80; z += 0.25) {
      const diff = at(round, z) - at(sharp, z);
      expect(diff, `z=${z}`).toBeGreaterThan(-0.3);
      if (diff > 0.5) added++;
      if (z < 2 || z > 30) expect(Math.abs(diff), `z=${z}`).toBeLessThan(0.3);
    }
    expect(added).toBeGreaterThan(4);
  });

  it('без радиусов силуэт ровно прежний, у горшка и чашки скругления ножки нет', () => {
    for (const family of FAMILY_IDS) {
      const plain = buildProfile(family, defaultFamilyParams(family), 120);
      const zero = buildProfile(family, { ...defaultFamilyParams(family), baseFillet: 0, footFillet: 0 }, 120);
      expect(zero.points).toEqual(plain.points);
      expect(familyById(family).params.some((spec) => spec.key === 'baseFillet'), family).toBe(true);
    }
    expect(familyById('pot').params.some((spec) => spec.key === 'footFillet')).toBe(false);
    expect(familyById('cup').params.some((spec) => spec.key === 'footFillet')).toBe(false);
  });

  it('на пределах ползунков изделие строится замкнутым', () => {
    for (const family of FAMILY_IDS) {
      const shape = { ...defaultFamilyParams(family), baseFillet: 15, footFillet: 20 };
      const mesh = buildVessel({ ...defaultBuildParams(), family, shape, heightMm: familyById(family).defaultHeightMm, nu: 64, nv: 96 });
      expect(validateMesh(mesh).watertight, family).toBe(true);
    }
  });
});
