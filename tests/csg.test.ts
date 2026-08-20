// M1-спайк: адаптер SurfaceMesh ⇄ manifold-3d. Проверяем, что булевы операции
// возвращают watertight-меши в нашем формате и что объёмы сходятся с
// аналитическими — это фундамент для ручек (union) и оснастки (difference).

import { initCSG, toManifold, fromManifold, CsgScope } from '../src/geo/csg';
import type { CsgApi } from '../src/geo/csg';
import { validateMesh } from '../src/geo/validate';
import { revolveMesh } from './helpers';

let csg: CsgApi;

beforeAll(async () => {
  csg = await initCSG();
});

describe('initCSG', () => {
  it('загружает WASM один раз и отдаёт тот же экземпляр', async () => {
    const again = await initCSG();
    expect(again).toBe(csg);
    expect(typeof csg.Manifold.cube).toBe('function');
  });
});

describe('round-trip SurfaceMesh ⇄ Manifold', () => {
  it('цилиндр переживает конвертацию: объём и watertight сохраняются', () => {
    const scope = new CsgScope();
    const source = revolveMesh(() => 20, { nu: 64, nv: 8, height: 50 });
    const solid = scope.keep(toManifold(csg, source));

    // π·20²·50 = 62832 мм³; 64-гранник вписан, поэтому чуть меньше
    expect(solid.volume()).toBeGreaterThan(Math.PI * 400 * 50 * 0.995);
    expect(solid.volume()).toBeLessThan(Math.PI * 400 * 50);
    expect(solid.status()).toBe('NoError');

    const back = fromManifold(solid);
    const report = validateMesh(back);
    expect(report.watertight).toBe(true);
    expect(report.finite).toBe(true);
    expect(report.volume).toBeCloseTo(solid.volume(), 1);
    scope.dispose();
  });

  it('открытый меш (не солид) отвергается с внятной ошибкой', () => {
    const open = revolveMesh(() => 20, { nu: 32, nv: 4, height: 50, caps: 'none' });
    expect(() => toManifold(csg, open)).toThrow(/not a closed solid|NotManifold/i);
  });
});

describe('булевы операции', () => {
  it('union куба и сферы: watertight, объём больше каждого из операндов', () => {
    const scope = new CsgScope();
    const cube = scope.keep(csg.Manifold.cube([20, 20, 20], true));
    const sphere = scope.keep(csg.Manifold.sphere(12, 64));
    const union = scope.keep(cube.add(sphere));

    expect(union.volume()).toBeGreaterThan(cube.volume());
    expect(union.volume()).toBeGreaterThan(sphere.volume());
    expect(union.genus()).toBe(0);

    const report = validateMesh(fromManifold(union));
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0); // нормали наружу
    scope.dispose();
  });

  it('difference: из блока вычитается цилиндр — объём равен разнице', () => {
    const scope = new CsgScope();
    const block = scope.keep(csg.Manifold.cube([60, 60, 40], true));
    const bore = scope.keep(csg.Manifold.cylinder(60, 10, 10, 128, true));
    const drilled = scope.keep(block.subtract(bore));

    const boreVolume = Math.PI * 100 * 40;
    expect(drilled.volume()).toBeCloseTo(60 * 60 * 40 - boreVolume, -2);
    expect(validateMesh(fromManifold(drilled)).watertight).toBe(true);
    scope.dispose();
  });
});

describe('splitByPlane — основа разъёмной формы', () => {
  it('симметричное тело делится плоскостью y=0 на две равные watertight-половины', () => {
    const scope = new CsgScope();
    const pot = scope.keep(toManifold(csg, revolveMesh((t) => 20 + 12 * Math.sin(Math.PI * t), {
      nu: 64, nv: 32, height: 80,
    })));
    const total = pot.volume();

    const [front, back] = pot.splitByPlane([0, 1, 0], 0);
    scope.keep(front);
    scope.keep(back);

    expect(front.volume()).toBeCloseTo(back.volume(), 1);
    expect(front.volume() + back.volume()).toBeCloseTo(total, 1);
    for (const half of [front, back]) {
      const report = validateMesh(fromManifold(half));
      expect(report.watertight).toBe(true);
      expect(report.volume).toBeGreaterThan(0);
    }
    scope.dispose();
  });
});

describe('CsgScope', () => {
  it('освобождает WASM-память всех удержанных объектов', () => {
    const scope = new CsgScope();
    const cube = scope.keep(csg.Manifold.cube([5, 5, 5]));
    expect(cube.volume()).toBe(125);
    expect(scope.size).toBe(1);
    scope.dispose();
    expect(scope.size).toBe(0);
    // повторный dispose безопасен
    expect(() => scope.dispose()).not.toThrow();
  });
});
