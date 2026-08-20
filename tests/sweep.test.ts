// Протяжка сечения по кривой — заготовка ручки.

import { bezier, bezierTangent, sweepTube, mirrorX } from '../src/geo/sweep';
import type { Vec3 } from '../src/geo/sweep';
import { validateMesh } from '../src/geo/validate';

const P0: Vec3 = { x: 0, y: 0, z: 0 };
const C0: Vec3 = { x: -20, y: 0, z: 10 };
const C1: Vec3 = { x: -20, y: 0, z: 50 };
const P1: Vec3 = { x: 0, y: 0, z: 60 };

const straight = (length: number, radius: number) =>
  sweepTube(
    (t) => ({ x: 0, y: 0, z: t * length }),
    () => ({ x: 0, y: 0, z: 1 }),
    () => ({ halfDepth: radius, halfWidth: radius }),
    24,
    32,
  );

describe('кубическая кривая Безье', () => {
  it('проходит через концевые точки', () => {
    expect(bezier(P0, C0, C1, P1, 0)).toEqual(P0);
    expect(bezier(P0, C0, C1, P1, 1)).toEqual(P1);
  });

  it('касательная на концах направлена к управляющим точкам', () => {
    const start = bezierTangent(P0, C0, C1, P1, 0);
    expect(start.x).toBeCloseTo(3 * (C0.x - P0.x), 9);
    expect(start.z).toBeCloseTo(3 * (C0.z - P0.z), 9);
    const end = bezierTangent(P0, C0, C1, P1, 1);
    expect(end.x).toBeCloseTo(3 * (P1.x - C1.x), 9);
  });

  it('плоская кривая остаётся плоской', () => {
    for (let i = 0; i <= 20; i++) expect(bezier(P0, C0, C1, P1, i / 20).y).toBe(0);
  });
});

describe('sweepTube', () => {
  it('прямой цилиндр: замкнут, нормали наружу, объём как у аналитического', () => {
    const mesh = straight(60, 5);
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    expect(report.finite).toBe(true);
    // нормали наружу — иначе объединение с телом вывернуло бы результат
    expect(report.volume).toBeGreaterThan(0);
    expect(report.volume).toBeCloseTo(Math.PI * 25 * 60, -2);
    expect(report.extents[2]).toBeCloseTo(60, 6);
    expect(report.degenerateTriangles).toBe(0);
  });

  it('эллиптическое сечение даёт разные габариты поперёк и вдоль плоскости', () => {
    const mesh = sweepTube(
      (t) => ({ x: 0, y: 0, z: t * 40 }),
      () => ({ x: 0, y: 0, z: 1 }),
      () => ({ halfDepth: 6, halfWidth: 2 }),
      16,
      32,
    );
    const { extents } = validateMesh(mesh);
    expect(extents[0]).toBeCloseTo(12, 1);
    expect(extents[1]).toBeCloseTo(4, 1);
  });

  it('изогнутая ручка замкнута и лежит в своей плоскости', () => {
    const mesh = sweepTube(
      (t) => bezier(P0, C0, C1, P1, t),
      (t) => bezierTangent(P0, C0, C1, P1, t),
      () => ({ halfDepth: 5, halfWidth: 3 }),
      48,
      24,
    );
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0);
    // поперёк плоскости разъёма ручка не толще своего сечения
    expect(report.bbox.max[1]).toBeCloseTo(3, 4);
    expect(report.bbox.min[1]).toBeCloseTo(-3, 4);
  });

  it('переменное сечение сужает трубу к концам', () => {
    const mesh = sweepTube(
      (t) => ({ x: 0, y: 0, z: t * 50 }),
      () => ({ x: 0, y: 0, z: 1 }),
      (t) => ({ halfDepth: 2 + 4 * Math.sin(Math.PI * t), halfWidth: 2 + 4 * Math.sin(Math.PI * t) }),
      32,
      24,
    );
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    expect(report.extents[0]).toBeCloseTo(12, 0);
  });
});

describe('mirrorX', () => {
  it('переносит на другую сторону, сохраняя объём и ориентацию', () => {
    const mesh = sweepTube(
      (t) => bezier(P0, C0, C1, P1, t),
      (t) => bezierTangent(P0, C0, C1, P1, t),
      () => ({ halfDepth: 5, halfWidth: 3 }),
      32,
      24,
    );
    const mirrored = mirrorX(mesh);
    const before = validateMesh(mesh);
    const after = validateMesh(mirrored);
    expect(after.watertight).toBe(true);
    // без разворота обхода зеркало вывернуло бы меш наизнанку
    expect(after.volume).toBeCloseTo(before.volume, 3);
    expect(after.bbox.min[0]).toBeCloseTo(-before.bbox.max[0], 4);
    expect(after.bbox.max[0]).toBeCloseTo(-before.bbox.min[0], 4);
  });
});
