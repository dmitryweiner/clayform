// Примитив тела вращения по замкнутому контуру. Проверяется главное: меш
// замкнут, нормали наружу, а объём совпадает с посчитанным по Паппу — то
// есть контур крутится вокруг оси ровно так, как задумано.

import { lathe } from '../src/geo/lathe';
import { meshNormals } from '../src/geo/normals';
import { validateMesh } from '../src/geo/validate';
import type { LathePoint } from '../src/geo/lathe';

const withNormals = (mesh: ReturnType<typeof lathe>) => ({
  ...mesh,
  normals: meshNormals(mesh.positions, mesh.indices),
});

/**
 * Точный объём тела вращения многоугольного контура. Вписанный в круг
 * многогранник считает меньше — во столько раз, во сколько площадь вписанного
 * nu-угольника меньше площади круга.
 */
function exactVolume(contour: LathePoint[]): number {
  let sum = 0;
  for (let m = 0; m < contour.length; m++) {
    const a = contour[m];
    const b = contour[(m + 1) % contour.length];
    // ∮ r² dz / 2 по замкнутому контуру, умноженное на π
    sum += ((a.r * a.r + a.r * b.r + b.r * b.r) / 3) * (b.z - a.z);
  }
  return Math.PI * sum;
}

const inscribed = (nu: number): number => (nu / (2 * Math.PI)) * Math.sin((2 * Math.PI) / nu);

describe('lathe', () => {
  it('цилиндр: замкнут, нормали наружу, объём как у цилиндра', () => {
    const nu = 96;
    const contour: LathePoint[] = [
      { r: 0, z: 0 }, { r: 20, z: 0 }, { r: 20, z: 50 }, { r: 0, z: 50 },
    ];
    const report = validateMesh(withNormals(lathe(contour, nu)));
    expect(report.watertight).toBe(true);
    expect(report.degenerateTriangles).toBe(0);
    expect(report.volume).toBeGreaterThan(0);
    expect(report.volume).toBeCloseTo(exactVolume(contour) * inscribed(nu), 0);
  });

  it('кольцо без точек на оси остаётся замкнутым', () => {
    // Труба: наружная стенка вверх, внутренняя вниз. Полюсов нет вовсе —
    // ни одного веера, только полосы квадов.
    const contour: LathePoint[] = [
      { r: 10, z: 0 }, { r: 20, z: 0 }, { r: 20, z: 30 }, { r: 10, z: 30 },
    ];
    const report = validateMesh(withNormals(lathe(contour, 64)));
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeCloseTo(exactVolume(contour) * inscribed(64), 0);
  });

  it('два полюса подряд: контур уходит на ось и возвращается', () => {
    // Так устроена полая крышка: наружная поверхность сходится в вершину,
    // контур спускается по оси и идёт обратно уже изнанкой.
    const contour: LathePoint[] = [
      { r: 8, z: 0 }, { r: 12, z: 0 }, { r: 12, z: 4 }, { r: 0, z: 20 },
      { r: 0, z: 16 }, { r: 8, z: 4 },
    ];
    const mesh = lathe(contour, 48);
    const report = validateMesh(withNormals(mesh));
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(0);
    expect(report.volume).toBeCloseTo(exactVolume(contour) * inscribed(48), 0);
    // отрезок оси не породил ни одного треугольника
    expect(report.degenerateTriangles).toBe(0);
  });

  it('полюс схлопнут в одну вершину, а не в кольцо совпадающих', () => {
    const nu = 32;
    const mesh = lathe([{ r: 0, z: 0 }, { r: 10, z: 0 }, { r: 10, z: 10 }, { r: 0, z: 10 }], nu);
    // 2 полюса + 2 кольца
    expect(mesh.positions.length / 3).toBe(2 + 2 * nu);
  });

  it('повторы точек и замыкающий дубль не рвут меш', () => {
    const contour: LathePoint[] = [
      { r: 0, z: 0 }, { r: 0, z: 0 }, { r: 15, z: 0 }, { r: 15, z: 0 },
      { r: 15, z: 20 }, { r: 0, z: 20 }, { r: 0, z: 0 },
    ];
    const report = validateMesh(withNormals(lathe(contour, 40)));
    expect(report.watertight).toBe(true);
    expect(report.degenerateTriangles).toBe(0);
  });

  it('обход по часовой даёт вывернутый меш — это ошибка вызывающего', () => {
    const forward: LathePoint[] = [
      { r: 0, z: 0 }, { r: 10, z: 0 }, { r: 10, z: 10 }, { r: 0, z: 10 },
    ];
    const volume = (points: LathePoint[]) => validateMesh(withNormals(lathe(points, 32))).volume;
    expect(volume(forward)).toBeGreaterThan(0);
    expect(volume([...forward].reverse())).toBeLessThan(0);
  });

  it('не бросает на разумном мусоре, но отказывается от бессмысленного', () => {
    expect(() => lathe([{ r: 5, z: 0 }, { r: 5, z: 1 }], 32)).toThrow();
    expect(() => lathe([{ r: 0, z: 0 }, { r: 5, z: 0 }, { r: 5, z: 1 }], 2)).toThrow();
    // отрицательный радиус подтягивается к оси, а не выворачивает меш
    const report = validateMesh(withNormals(
      lathe([{ r: -3, z: 0 }, { r: 10, z: 0 }, { r: 10, z: 8 }, { r: -1, z: 8 }], 32),
    ));
    expect(report.watertight).toBe(true);
  });
});
