// Дно своей сеткой: замкнуто, ориентировано, при нулевом рельефе — то же
// тело, что и с веером, а рельеф и отверстие стоят там, где заказаны.

import { sampleGrid, assembleMesh, assembleHollowMesh } from '../src/geo/surface';
import type { ConcaveLayout } from '../src/geo/concave';
import { concaveFloor, concaveLayout, defaultConcave } from '../src/geo/concave';
import { validateMesh as validate } from 'maker-kit/3d/validate';
import { meshNormals } from 'maker-kit/3d/mesh';

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

  it('рельеф на наружном дне полого меша не трогает пол полости', () => {
    const outer = cylinder(R, 0, H);
    const inner = cylinder(R - 3, 3, H).positions;
    const mesh = assembleHollowMesh(outer, inner, [], {
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

function layoutOf(raw: Partial<ReturnType<typeof defaultConcave>>, flatMm: number, heightMm: number): ConcaveLayout {
  const layout = concaveLayout({ ...defaultConcave(), on: true, ...raw }, flatMm, heightMm);
  if (!layout) throw new Error('no layout');
  return layout;
}

describe('дно по сечению', () => {
  it('сфера: замкнутый меш, объём меньше ровно на сферический сегмент', () => {
    const grid = cylinder(R, 0, H);
    const layout = layoutOf({ kind: 'sphere', radiusMm: 100 }, R, H);
    const d = layout.depthMm;
    const mesh = validateMesh(assembleMesh(grid, 'both', { section: layout.section }));
    expect(mesh.watertight).toBe(true);
    const plain = validateMesh(assembleMesh(grid, 'both')).volume;
    const segment = (Math.PI * d * d * (3 * 100 - d)) / 3;
    expect(plain - mesh.volume).toBeGreaterThan(segment * 0.98);
    expect(plain - mesh.volume).toBeLessThan(segment * 1.02);
  });

  it('ступенька без скругления: отвесная стенка и оба угла на месте', () => {
    const grid = cylinder(R, 0, H);
    const layout = layoutOf({ kind: 'flat', depthMm: 4, ringMm: 6, filletMm: 0 }, R, H);
    const mesh = assembleMesh(grid, 'both', { section: layout.section });
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    const plain = validateMesh(assembleMesh(grid, 'both')).volume;
    // сетка круга вписана в окружность — отсюда допуск
    const recess = Math.PI * 24 * 24 * 4;
    expect(plain - report.volume).toBeGreaterThan(recess * 0.98);
    expect(plain - report.volume).toBeLessThan(recess * 1.01);
    // вершины в обоих углах ступеньки: на столе и на глубине, на радиусе стенки
    const at = (rr: number, zz: number): boolean => {
      for (let i = 0; i < mesh.positions.length; i += 3) {
        const r = Math.hypot(mesh.positions[i], mesh.positions[i + 1]);
        if (Math.abs(r - rr) < 0.05 && Math.abs(mesh.positions[i + 2] - zz) < 1e-5) return true;
      }
      return false;
    };
    expect(at(24, 0)).toBe(true);
    expect(at(24, 4)).toBe(true);
  });

  it('рельеф ложится поверх сечения', () => {
    const grid = cylinder(R, 0, H);
    const layout = layoutOf({ kind: 'flat', depthMm: 4, ringMm: 6, filletMm: 1 }, R, H);
    const bare = validateMesh(assembleMesh(grid, 'both', { section: layout.section })).volume;
    const mesh = validateMesh(
      assembleMesh(grid, 'both', {
        section: layout.section,
        dense: [{ from: 0, to: 10, stepMm: 0.5 }],
        heightAt: (x, y) => (Math.hypot(x, y) <= 10 ? 0.5 : 0),
      }),
    );
    expect(mesh.watertight).toBe(true);
    const disc = Math.PI * 10 * 10 * 0.5;
    expect(bare - mesh.volume).toBeGreaterThan(disc * 0.9);
    expect(bare - mesh.volume).toBeLessThan(disc * 1.1);
  });

  it('полый меш: наружное дно и пол полости по своим сечениям', () => {
    const outer = cylinder(R, 0, H);
    const layout = layoutOf({ kind: 'flat', depthMm: 5, ringMm: 8, filletMm: 2 }, R, H);
    const floor = concaveFloor(layout, 3);
    const edge = R - 3;
    const floorZ = floor.heightAt(edge);
    const inner = cylinder(edge, floorZ, H).positions;
    const section = floor.section(edge).map((p) => ({ r: p.r, z: p.z - floorZ }));
    const mesh = assembleHollowMesh(outer, inner, [], {
      outer: { section: layout.section },
      inner: { section, planeZ: floorZ },
    });
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0);
    // помост полости — на глубине плюс толщина
    let top = 0;
    for (let i = 0; i < mesh.positions.length; i += 3) {
      if (Math.hypot(mesh.positions[i], mesh.positions[i + 1]) < 5) top = Math.max(top, mesh.positions[i + 2]);
    }
    expect(top).toBeCloseTo(8, 4);
  });
});
