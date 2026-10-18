// Дно своей сеткой: замкнуто, ориентировано, при нулевом рельефе — то же
// тело, что и с веером, а рельеф и отверстие стоят там, где заказаны.

import { sampleGrid, assembleMesh, assembleHollowMesh } from '../src/geo/surface';
import { validateMesh as validate } from '../src/geo/validate';
import { meshNormals } from '../src/geo/normals';

const validateMesh = (mesh: { positions: Float32Array; indices: Uint32Array }) =>
  validate({ ...mesh, normals: meshNormals(mesh.positions, mesh.indices) });

const R = 30;
const H = 40;
const cylinder = (radius: number, z0: number, z1: number) =>
  sampleGrid(64, 8, (u, v, out) => {
    out[0] = radius * Math.cos(u);
    out[1] = radius * Math.sin(u);
    out[2] = z0 + (z1 - z0) * v;
  });

describe('дно своей сеткой', () => {
  it('гладкое дно — то же тело, что и веер', () => {
    const grid = cylinder(R, 0, H);
    const fan = validateMesh(assembleMesh(grid, 'both'));
    const own = validateMesh(assembleMesh(grid, 'both', {}));
    expect(own.watertight).toBe(true);
    expect(own.volume).toBeGreaterThan(0);
    expect(own.volume).toBeCloseTo(fan.volume, 0);
  });

  it('рельеф ложится в заказанную полосу и уменьшает объём на свой', () => {
    const grid = cylinder(R, 0, H);
    const depth = 0.5;
    // кольцо [10, 20] мм вдавлено в тело на полмиллиметра
    const mesh = assembleMesh(grid, 'both', {
      dense: [{ from: 10, to: 20, stepMm: 0.5 }],
      heightAt: (x, y) => {
        const r = Math.hypot(x, y);
        return r >= 10 && r <= 20 ? depth : 0;
      },
    });
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    const plain = validateMesh(assembleMesh(grid, 'both')).volume;
    const ring = Math.PI * (20 * 20 - 10 * 10) * depth;
    // края полосы — скаты в одну ячейку, отсюда допуск
    expect(plain - report.volume).toBeGreaterThan(ring * 0.85);
    expect(plain - report.volume).toBeLessThan(ring * 1.15);
  });

  it('полое дно с отверстием: сквозное, замкнутое, объём как у старого', () => {
    const outer = cylinder(R, 0, H);
    const inner = cylinder(R - 3, 3, H).positions;
    const vent = 4;
    const old = validateMesh(assembleHollowMesh(outer, inner, [], vent));
    const own = assembleHollowMesh(outer, inner, [], vent, {});
    const report = validateMesh(own);
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeCloseTo(old.volume, -1);
    // у оси нет ни одной вершины: отверстие сквозное
    let nearest = Infinity;
    for (let i = 0; i < own.positions.length; i += 3) {
      nearest = Math.min(nearest, Math.hypot(own.positions[i], own.positions[i + 1]));
    }
    expect(nearest).toBeCloseTo(vent / 2, 3);
  });

  it('рельеф на наружном дне полого меша не трогает пол полости', () => {
    const outer = cylinder(R, 0, H);
    const inner = cylinder(R - 3, 3, H).positions;
    const mesh = assembleHollowMesh(outer, inner, [], 0, {
      outer: { heightAt: (x) => (Math.abs(x) < 2 ? 1 : 0) },
    });
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    let floor = Infinity;
    for (let i = 2; i < mesh.positions.length; i += 3) {
      if (mesh.positions[i] > 2) floor = Math.min(floor, mesh.positions[i]);
    }
    expect(floor).toBeCloseTo(3, 5);
  });
});
