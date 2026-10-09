// Раскладка на столе и склейка в один файл: «крышка рядом» и разнесённые
// детали оснастки.

import { mergeMeshes } from '../src/geo/surface';
import { placeInRow } from '../src/geo/layout';
import { validateMesh, signedVolume } from '../src/geo/validate';
import { revolveMesh } from './helpers';

const pot = revolveMesh(() => 40, { height: 80 });
const lid = revolveMesh((t) => 30 - 10 * t, { height: 20 });

function spanX(mesh: { positions: Float32Array }): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < mesh.positions.length; i += 3) {
    min = Math.min(min, mesh.positions[i]);
    max = Math.max(max, mesh.positions[i]);
  }
  return [min, max];
}

describe('placeInRow', () => {
  it('габариты не пересекаются, зазор ровно заданный, первая группа на месте', () => {
    const [[a], [b], [c]] = placeInRow([[pot], [lid], [pot]], 15);
    expect(a).toBe(pot);
    const [, aMax] = spanX(a);
    const [bMin, bMax] = spanX(b);
    const [cMin] = spanX(c);
    expect(bMin - aMax).toBeCloseTo(15, 4);
    expect(cMin - bMax).toBeCloseTo(15, 4);
  });

  it('группа двигается целиком', () => {
    const [, [x, y]] = placeInRow([[pot], [lid, pot]], 10);
    // одинаковый сдвиг у обоих мешей группы
    expect(spanX(x)[0] - spanX(lid)[0]).toBeCloseTo(spanX(y)[0] - spanX(pot)[0], 4);
  });
});

describe('mergeMeshes', () => {
  it('две замкнутые компоненты — замкнутый меш, объём — сумма', () => {
    const [[a], [b]] = placeInRow([[pot], [lid]], 15);
    const merged = mergeMeshes([a, b]);
    const report = validateMesh(merged);
    expect(report.watertight).toBe(true);
    expect(report.triangleCount).toBe((a.indices.length + b.indices.length) / 3);
    expect(signedVolume(merged.positions, merged.indices)).toBeCloseTo(
      signedVolume(a.positions, a.indices) + signedVolume(b.positions, b.indices), 0,
    );
  });
});
