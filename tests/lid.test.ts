// Крышка и ответная посадка в горловине.
//
// Главное, что здесь проверяется, — крышка ВХОДИТ: её юбка уже посадочного
// цилиндра ровно на зазор, а сам цилиндр не шире самого узкого места
// горловины. Подгонять диаметры руками пользователь не должен, поэтому вся
// цепочка выводится от полости тела и обязана сходиться на любом силуэте.

import {
  defaultLid, sanitizeLid, lidFit, lidSeat, lidHeightMm,
  buildLidMesh, buildLidSolid, LID_LIMITS,
} from '../src/geo/lid';
import type { LidState } from '../src/geo/lid';
import { buildHollowVessel, sanitizeHollow } from '../src/geo/hollow';
import { defaultBuildParams } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import { FAMILY_IDS, defaultFamilyParams, familyById, buildProfile } from '../src/geo/profiles';
import { sanitizeState } from '../src/state/schema';

const params = (family: string, over: Record<string, unknown> = {}) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 96,
  nv: 96,
  ...over,
});

const hollowState = sanitizeHollow({ wallMm: 3, baseMm: 4 });

/** Посадка для семейства по умолчанию. */
function fitFor(family: string, lid: Partial<LidState> = {}, hollow = hollowState) {
  const p = params(family);
  const profile = buildProfile(family, p.shape, p.heightMm);
  return {
    p,
    fit: lidFit(profile, p.heightMm, hollow, sanitizeLid({ on: true, ...lid })),
    lid: sanitizeLid({ on: true, ...lid }),
  };
}

describe('sanitizeLid', () => {
  it('зажимает в диапазон и не бросает на мусоре', () => {
    expect(sanitizeLid(null)).toEqual(defaultLid());
    expect(sanitizeLid({ domeMm: NaN }).domeMm).toBe(defaultLid().domeMm);
    expect(sanitizeLid({ recessMm: -50 }).recessMm).toBe(LID_LIMITS.recessMm.min);
    expect(sanitizeLid({ depthMm: 1e6 }).depthMm).toBe(LID_LIMITS.depthMm.max);
    expect(sanitizeLid({ knobKind: 'нечто' }).knobKind).toBe('ball');
    expect(sanitizeLid('строка')).toEqual(defaultLid());
  });

  it('ножка не толще шляпки', () => {
    expect(sanitizeLid({ knobDMm: 10, stemDMm: 30 }).stemDMm).toBe(10);
  });

  it('идемпотентен', () => {
    const once = sanitizeLid({ on: true, recessMm: 4.3, knobKind: 'tee', stemDMm: 26, knobDMm: 12 });
    expect(sanitizeLid(once)).toEqual(once);
  });

  it('старое состояние без крышки открывается с выключенной', () => {
    expect(sanitizeState({ family: 'pot' }).lid.on).toBe(false);
  });
});

describe('lidFit', () => {
  it('цепочка диаметров сходится: поле > посадка > юбка', () => {
    for (const family of FAMILY_IDS) {
      const { fit } = fitFor(family, { ledgeMm: 3, clearanceMm: 0.6, fieldMm: 8 });
      expect(fit.seatMm, family).toBeLessThanOrEqual(fit.cavityMm);
      expect(fit.plugMm, family).toBeLessThan(fit.seatMm);
      expect(fit.fieldMm, family).toBeGreaterThan(fit.seatMm);
      expect(fit.seatMm - fit.plugMm, family).toBeCloseTo(0.6, 6);
      expect(fit.cavityMm - fit.seatMm, family).toBeCloseTo(3, 6);
    }
  });

  it('нулевая полочка оставляет посадку по самой полости', () => {
    const { fit } = fitFor('pot', { ledgeMm: 0 });
    expect(fit.seatMm).toBeCloseTo(fit.cavityMm, 6);
  });

  it('утопленной крышке полочка назначается сама — иначе ей не на что лечь', () => {
    const flat = fitFor('pot', { ledgeMm: 0, recessMm: 0 }).fit;
    const sunk = fitFor('pot', { ledgeMm: 0, recessMm: 6 }).fit;
    expect(sunk.seatMm).toBeLessThan(flat.seatMm);
    // поле шире посадки, но пролезает в устье
    expect(sunk.fieldMm).toBeGreaterThan(sunk.seatMm);
    expect(sunk.fieldMm).toBeLessThanOrEqual(sunk.cavityMm);
  });

  it('утопление опускает опору ровно на заданное, пока не упрётся в предел', () => {
    const p = params('pot');
    const profile = buildProfile('pot', p.shape, p.heightMm);
    const at = (recessMm: number) =>
      lidFit(profile, p.heightMm, hollowState, sanitizeLid({ on: true, recessMm }));
    expect(at(0).restZMm).toBeCloseTo(p.heightMm, 6);
    expect(at(8).restZMm).toBeCloseTo(p.heightMm - 8, 6);
    // четверть высоты — предел: ниже крышка утонула бы в изделии
    expect(at(20).restZMm).toBeGreaterThanOrEqual(p.heightMm * 0.75);
  });

  it('посадка меряется по самому узкому месту горловины, а не по венчику', () => {
    // Крынка: горло сужается, а венчик отогнут наружу — по нему юбка вышла
    // бы шире горла и не пролезла.
    const p = params('pot', {
      shape: { ...defaultFamilyParams('pot'), dNeck: 74, rimFlare: 0.35, neckH: 0.28 },
      heightMm: 195,
    });
    const profile = buildProfile('pot', p.shape, p.heightMm);
    const lid = sanitizeLid({ on: true, depthMm: 12, ledgeMm: 0 });
    const fit = lidFit(profile, p.heightMm, hollowState, lid);
    const inner = buildHollowVessel(p, hollowState).innerGrid;

    const seat = lidSeat(fit);
    for (let j = 0; j <= inner.nv; j++) {
      const k = j * inner.nu * 3;
      const z = inner.positions[k + 2];
      if (z < seat.bottomZMm || z > seat.topZMm) continue;
      const r = Math.hypot(inner.positions[k], inner.positions[k + 1]);
      // юбка проходит: ни на одной высоте полосы полость не уже посадки
      expect(fit.plugMm, `z=${z.toFixed(1)}`).toBeLessThan(r);
    }
  });

  it('узкую горловину отмечает, но крышку всё равно строит', () => {
    // Устье ⌀14: посадка выходит меньше разумного минимума, а полость крышки
    // не помещается в собственную стенку — крышка получается сплошной.
    const p = params('vase', {
      shape: { ...defaultFamilyParams('vase'), dNeck: 12, dRim: 14 },
      heightMm: 210,
    });
    const profile = buildProfile('vase', p.shape, p.heightMm);
    const lid = sanitizeLid({ on: true, ledgeMm: 8 });
    const fit = lidFit(profile, p.heightMm, hollowState, lid);
    expect(fit.tooNarrow).toBe(true);
    expect(fit.plugMm).toBeGreaterThan(0);
    expect(validateMesh(buildLidMesh(fit, lid, 64)).watertight).toBe(true);
  });
});

describe('buildLidMesh', () => {
  it('крышка каждого семейства — замкнутый солид', () => {
    for (const family of FAMILY_IDS) {
      const { fit, lid } = fitFor(family);
      const report = validateMesh(buildLidMesh(fit, lid, 96));
      expect(report.watertight, family).toBe(true);
      expect(report.finite, family).toBe(true);
      expect(report.volume, family).toBeGreaterThan(0);
      expect(report.degenerateTriangles, family).toBe(0);
    }
  });

  it('обе ручки строятся и различаются', () => {
    const ball = fitFor('pot', { knobKind: 'ball' });
    const tee = fitFor('pot', { knobKind: 'tee' });
    for (const { fit, lid } of [ball, tee]) {
      const report = validateMesh(buildLidMesh(fit, lid, 96));
      expect(report.watertight, lid.knobKind).toBe(true);
      expect(report.degenerateTriangles, lid.knobKind).toBe(0);
    }
    expect(lidHeightMm(ball.fit, ball.lid)).not.toBeCloseTo(lidHeightMm(tee.fit, tee.lid), 1);
  });

  it('полая крышка легче сплошной, но снаружи та же', () => {
    const { fit, lid } = fitFor('pot');
    const hollow = validateMesh(buildLidMesh(fit, lid, 96));
    const solid = validateMesh(buildLidSolid(fit, lid, 96));
    expect(hollow.volume).toBeLessThan(solid.volume);
    expect(hollow.volume).toBeGreaterThan(solid.volume * 0.15);
    for (let i = 0; i < 3; i++) {
      expect(hollow.bbox.max[i]).toBeCloseTo(solid.bbox.max[i], 3);
      expect(hollow.bbox.min[i]).toBeCloseTo(solid.bbox.min[i], 3);
    }
  });

  it('низ юбки лежит в z = 0 — крышку печатают как есть', () => {
    const { fit, lid } = fitFor('pot');
    const report = validateMesh(buildLidMesh(fit, lid, 64));
    expect(report.bbox.min[2]).toBeCloseTo(0, 6);
    expect(report.bbox.max[2]).toBeCloseTo(lidHeightMm(fit, lid), 3);
    expect(report.extents[0] / 2).toBeCloseTo(fit.fieldMm, 0);
  });

  it('надетая крышка садится полем на опору', () => {
    const { fit, lid } = fitFor('pot', { recessMm: 5 });
    const worn = validateMesh(buildLidMesh(fit, lid, 64, { liftMm: fit.liftMm }));
    // низ юбки — на глубину ниже опоры, верх — над изделием
    expect(worn.bbox.min[2]).toBeCloseTo(fit.restZMm - fit.depthMm, 3);
    expect(worn.bbox.max[2]).toBeCloseTo(fit.restZMm - fit.depthMm + lidHeightMm(fit, lid), 3);
  });

  it('перевёрнутая крышка стоит на столе и не вывернута наизнанку', () => {
    const { fit, lid } = fitFor('pot');
    const upright = validateMesh(buildLidSolid(fit, lid, 96));
    const flipped = validateMesh(buildLidSolid(fit, lid, 96, { upsideDown: true }));
    expect(flipped.watertight).toBe(true);
    expect(flipped.volume).toBeGreaterThan(0);
    expect(flipped.volume / upright.volume).toBeCloseTo(1, 5);
    expect(flipped.bbox.min[2]).toBeCloseTo(0, 6);
    expect(flipped.bbox.max[2]).toBeCloseTo(upright.bbox.max[2], 6);
  });

  it('крайние параметры не рвут меш', () => {
    const extremes: Partial<LidState>[] = [
      { domeMm: LID_LIMITS.domeMm.min, curvature: 0 },
      { domeMm: LID_LIMITS.domeMm.max, curvature: 1 },
      { curvature: 0, knobKind: 'tee', capHMm: LID_LIMITS.capHMm.min },
      { curvature: 1, knobKind: 'tee', capHMm: LID_LIMITS.capHMm.max, stemHMm: 0 },
      { knobDMm: LID_LIMITS.knobDMm.min, stemDMm: LID_LIMITS.stemDMm.max },
      { knobDMm: LID_LIMITS.knobDMm.max, stemDMm: LID_LIMITS.stemDMm.min, stemHMm: 0 },
      { fieldMm: 0, ledgeMm: LID_LIMITS.ledgeMm.max },
      { fieldMm: LID_LIMITS.fieldMm.max, depthMm: LID_LIMITS.depthMm.max },
      { recessMm: LID_LIMITS.recessMm.max, depthMm: LID_LIMITS.depthMm.max },
      { clearanceMm: LID_LIMITS.clearanceMm.max, ledgeMm: LID_LIMITS.ledgeMm.max },
    ];
    for (const family of FAMILY_IDS) {
      for (const over of extremes) {
        const { fit, lid } = fitFor(family, over);
        const tag = `${family} ${JSON.stringify(over)}`;
        const report = validateMesh(buildLidMesh(fit, lid, 64));
        expect(report.watertight, tag).toBe(true);
        expect(report.volume, tag).toBeGreaterThan(0);
        expect(report.degenerateTriangles, tag).toBe(0);
        expect(validateMesh(buildLidSolid(fit, lid, 64)).watertight, tag).toBe(true);
      }
    }
  });

  it('нелепо толстая стенка даёт сплошную крышку, а не разорванную', () => {
    const { fit, lid } = fitFor('cup', {}, sanitizeHollow({ wallMm: 60, baseMm: 4 }));
    const report = validateMesh(buildLidMesh(fit, lid, 64));
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0);
    // полости не осталось — меш совпал со сплошным
    expect(report.volume).toBeCloseTo(validateMesh(buildLidSolid(fit, lid, 64)).volume, 3);
  });
});

describe('фланец в горловине', () => {
  it('полость в полосе посадки становится цилиндром заданного радиуса', () => {
    const { p, fit } = fitFor('pot', { ledgeMm: 3, depthMm: 10 });
    const seat = lidSeat(fit);
    const inner = buildHollowVessel(p, hollowState, seat).innerGrid;
    let rows = 0;
    for (let j = 0; j <= inner.nv; j++) {
      const k = j * inner.nu * 3;
      const z = inner.positions[k + 2];
      if (z < seat.bottomZMm || z > seat.topZMm) continue;
      rows++;
      for (let i = 0; i < inner.nu; i += 13) {
        const base = (j * inner.nu + i) * 3;
        const r = Math.hypot(inner.positions[base], inner.positions[base + 1]);
        expect(r, `j=${j} i=${i}`).toBeCloseTo(fit.seatMm, 3);
      }
    }
    expect(rows).toBeGreaterThan(3);
  });

  it('фланец добавляет материал внутрь, но не трогает наружную стенку', () => {
    const { p, fit } = fitFor('pot', { ledgeMm: 4 });
    const plain = buildHollowVessel(p, hollowState);
    const flanged = buildHollowVessel(p, hollowState, lidSeat(fit));
    const before = validateMesh(plain.mesh);
    const after = validateMesh(flanged.mesh);

    expect(after.watertight).toBe(true);
    expect(after.volume).toBeGreaterThan(before.volume);
    expect(flanged.capacityMl).toBeLessThan(plain.capacityMl);
    // Наружная стенка не сдвинулась ни на микрон — фланец растёт только
    // внутрь. Высоту не сверяем: заглаженный венчик берёт радиус дуги по
    // зазору между стенками, а фланец этот зазор расширяет, и край
    // скругляется полнее — но не выше заданной высоты.
    expect(after.extents[0]).toBeCloseTo(before.extents[0], 6);
    expect(after.extents[1]).toBeCloseTo(before.extents[1], 6);
    expect(after.bbox.max[2]).toBeLessThanOrEqual(params('pot').heightMm + 1e-3);
  });

  it('ниже посадки полость расходится обратно и не съедает изделие', () => {
    const { p, fit } = fitFor('pot', { ledgeMm: 4, depthMm: 8 });
    const seat = lidSeat(fit);
    const inner = buildHollowVessel(p, hollowState, seat).innerGrid;
    const plain = buildHollowVessel(p, hollowState).innerGrid;
    // на полторы глубины ниже посадки конус уже разошёлся до обычной полости
    const deepZ = seat.bottomZMm - fit.depthMm * 1.5;
    let checked = 0;
    for (let j = 0; j <= inner.nv; j++) {
      const k = j * inner.nu * 3;
      if (Math.abs(inner.positions[k + 2] - deepZ) > 1) continue;
      const r = Math.hypot(inner.positions[k], inner.positions[k + 1]);
      const plainR = Math.hypot(plain.positions[k], plain.positions[k + 1]);
      expect(r).toBeCloseTo(plainR, 3);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });

  it('каждое семейство остаётся замкнутым с фланцем', () => {
    for (const family of FAMILY_IDS) {
      const { p, fit } = fitFor(family, { ledgeMm: 3, depthMm: 12 });
      const report = validateMesh(buildHollowVessel(p, hollowState, lidSeat(fit)).mesh);
      expect(report.watertight, family).toBe(true);
      expect(report.volume, family).toBeGreaterThan(0);
    }
  });
});
