// Анализатор поднутрений: по геометрии изделия выбирает схему разъёма
// гипсовой формы.
//
// Ключевой факт, на который всё опирается: у тела вращения при разъёме на две
// вертикальные половины поднутрений не бывает в принципе. Нормаль такой
// поверхности лежит в осевой плоскости, поэтому её проекция на направление
// вытяжки ±y равна n_r·sin θ и в своей половине всегда положительна. Ломает
// это только рельеф, меняющийся по углу, — накатка и волна вокруг оси.

import { analyzeMold, pullUndercut } from '../src/geo/mold/analyze';
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { buildSolidVessel } from '../src/geo/assemble';
import { initCSG } from '../src/geo/csg';
import type { CsgApi } from '../src/geo/csg';
import { defaultFamilyParams, familyById } from '../src/geo/profiles';
import { sanitizeHandle } from '../src/geo/handle';
import { sanitizeRelief } from '../src/geo/relief';
import { sanitizeRoulette, defaultRoulette } from '../src/geo/roulette';
import { revolveMesh } from './helpers';

let csg: CsgApi;
beforeAll(async () => {
  csg = await initCSG();
});

const params = (family: string, over: Record<string, unknown> = {}) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 96,
  nv: 96,
  ...over,
});

describe('pullUndercut', () => {
  it('конус, расширяющийся кверху, вынимается вверх без зацепов', () => {
    const cone = revolveMesh((t) => 20 + 60 * t, { nu: 64, nv: 32, height: 80 });
    expect(pullUndercut(cone, 'up').fraction).toBeLessThan(1e-6);
  });

  it('конус, сужающийся кверху, вверх не вынимается', () => {
    const cone = revolveMesh((t) => 80 - 60 * t, { nu: 64, nv: 32, height: 80 });
    expect(pullUndercut(cone, 'up').fraction).toBeGreaterThan(0.5);
  });

  it('плоское дно не считается поднутрением — это пол формы', () => {
    const cylinder = revolveMesh(() => 40, { nu: 64, nv: 16, height: 60 });
    // дно смотрит строго вниз, но изделие с него просто снимается
    expect(pullUndercut(cylinder, 'up').fraction).toBeLessThan(1e-6);
  });

  it('любое тело вращения разнимается на две половины без зацепов', () => {
    for (const radius of [
      (t: number) => 20 + 60 * t,
      (t: number) => 80 - 60 * t,
      (t: number) => 40 + 30 * Math.sin(Math.PI * t),
      (t: number) => 60 - 40 * Math.sin(Math.PI * t),
    ]) {
      const mesh = revolveMesh(radius, { nu: 128, nv: 64, height: 120 });
      expect(pullUndercut(mesh, 'sides').fraction).toBeLessThan(1e-3);
    }
  });
});

describe('analyzeMold — выбор схемы', () => {
  it('миска вынимается вверх: форма из одной части', () => {
    const report = analyzeMold(buildVessel(params('bowl')), { hasHandle: false });
    expect(report.scheme).toBe('dropout');
    expect(report.parts).toHaveLength(1);
    expect(report.reason).toMatch(/вверх/i);
  });

  it('прямая чашка, расширяющаяся кверху, тоже вынимается вверх', () => {
    const mesh = buildVessel(params('cup', {
      shape: { ...defaultFamilyParams('cup'), dRim: 90, dFoot: 60, barrel: 0, rimFlare: 0 },
    }));
    expect(analyzeMold(mesh, { hasHandle: false }).scheme).toBe('dropout');
  });

  it('горшок с горлом уже тулова требует разъёма на половины', () => {
    const report = analyzeMold(buildVessel(params('pot')), { hasHandle: false });
    expect(report.scheme).not.toBe('dropout');
    expect(report.dropoutUndercut).toBeGreaterThan(0.01);
  });

  it('бочкообразная чашка: пузо шире венчика — вверх уже не вынуть', () => {
    const straight = buildVessel(params('cup', {
      shape: { ...defaultFamilyParams('cup'), dRim: 90, dFoot: 60, barrel: 0, rimFlare: 0 },
    }));
    const barrelled = buildVessel(params('cup', {
      shape: { ...defaultFamilyParams('cup'), dRim: 90, dFoot: 60, barrel: 0.35, rimFlare: 0 },
    }));
    expect(analyzeMold(straight, { hasHandle: false }).scheme).toBe('dropout');
    expect(analyzeMold(barrelled, { hasHandle: false }).scheme).not.toBe('dropout');
  });

  it('ручка отменяет одночастную форму, даже если силуэт позволяет', () => {
    const mesh = buildSolidVessel(csg, params('cup'), sanitizeHandle({ on: true }));
    const report = analyzeMold(mesh, { hasHandle: true });
    expect(report.scheme).not.toBe('dropout');
    expect(report.reason).toMatch(/ручк/i);
  });

  it('широкое плоское дно уводит в схему с отдельной донной плитой', () => {
    const report = analyzeMold(buildVessel(params('pot')), { hasHandle: false });
    expect(report.scheme).toBe('halves-bottom');
    expect(report.parts).toHaveLength(3);
    expect(report.parts.map((p) => p.id)).toEqual(['half-A', 'half-B', 'bottom']);
  });

  it('ваза на узкой ножке обходится двумя половинами', () => {
    const report = analyzeMold(buildVessel(params('vase')), { hasHandle: false });
    expect(report.scheme).toBe('halves');
    expect(report.parts.map((p) => p.id)).toEqual(['half-A', 'half-B']);
  });

  it('у каждой части есть человекочитаемое имя', () => {
    for (const family of ['pot', 'bowl', 'cup', 'vase']) {
      for (const part of analyzeMold(buildVessel(params(family)), { hasHandle: false }).parts) {
        expect(part.label.length, `${family}/${part.id}`).toBeGreaterThan(2);
      }
    }
  });
});

describe('рельеф и поднутрения разъёма', () => {
  const ringWave = (ampMm: number) => buildVessel(params('pot', {
    relief: sanitizeRelief({
      wave: { on: true, axis: 'z', shape: 'rounded', freq: 14, ampMm, phase: 0, spiralK: 0 },
      zone: { from: 0.05, to: 0.95, fade: 0.05 },
    }),
  }));

  it('умеренные кольцевые валики половинам не мешают', () => {
    expect(analyzeMold(ringWave(1.5), { hasHandle: false }).halvesUndercut).toBeLessThan(0.001);
  });

  it('слишком глубокие валики заворачиваются по радиусу и запирают форму', () => {
    // 14 валиков на 150 мм — это шаг 10,7 мм. Валик глубиной 3 мм при таком
    // шаге почти так же глубок, как широк: его исподняя сторона уходит под
    // себя, и половина формы за неё цепляется.
    const report = analyzeMold(ringWave(3), { hasHandle: false });
    expect(report.halvesUndercut).toBeGreaterThan(0.05);
    expect(report.warnings.join(' ')).toMatch(/поднутрен/i);
  });

  it('глубокая накатка режет по углу — у плоскости разъёма появляются зацепы', () => {
    const mesh = buildVessel(params('pot', {
      roulette: sanitizeRoulette({
        ...defaultRoulette(), on: true, pattern: 'dots', depthMm: -6, bandWidthMm: 40, repeats: 24,
      }),
    }));
    const report = analyzeMold(mesh, { hasHandle: false });
    expect(report.halvesUndercut).toBeGreaterThan(0.005);
    expect(report.warnings.join(' ')).toMatch(/поднутрен/i);
  });

  it('мелкий узор проходит без предупреждений', () => {
    const mesh = buildVessel(params('pot', {
      roulette: sanitizeRoulette({
        ...defaultRoulette(), on: true, pattern: 'rope', depthMm: 0.8, bandWidthMm: 14,
      }),
    }));
    expect(analyzeMold(mesh, { hasHandle: false }).warnings).toHaveLength(0);
  });
});
