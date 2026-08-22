// Валидатор: watertight-детектор ловит дырки, overhangFraction — свесы.
import { sampleGrid, assembleMesh } from '../src/geo/surface';
import { meshNormals } from '../src/geo/normals';
import { validateMesh, overhangFraction, assessExport } from '../src/geo/validate';

const revolve = (rOfT: (t: number) => number, nu = 24, nv = 12) =>
  sampleGrid(nu, nv, (u, v, out) => {
    const r = rOfT(v);
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = v;
  });

const withNormals = (m: { positions: Float32Array; indices: Uint32Array }) => ({
  ...m,
  normals: meshNormals(m.positions, m.indices),
});

describe('watertight-детектор', () => {
  it('ловит удалённый треугольник', () => {
    const mesh = withNormals(assembleMesh(revolve(() => 1), 'both'));
    const broken = {
      ...mesh,
      indices: mesh.indices.slice(0, mesh.indices.length - 3),
    };
    expect(validateMesh(mesh).watertight).toBe(true);
    expect(validateMesh(broken).watertight).toBe(false);
  });

  it('ловит перевёрнутый треугольник (ориентация)', () => {
    const mesh = withNormals(assembleMesh(revolve(() => 1), 'both'));
    const flipped = { ...mesh, indices: mesh.indices.slice() };
    const t = flipped.indices[0];
    flipped.indices[0] = flipped.indices[1];
    flipped.indices[1] = t;
    expect(validateMesh(flipped).watertight).toBe(false);
  });
});

describe('overhangFraction', () => {
  it('цилиндр: свесов нет (дно исключено, верхняя крышка смотрит вверх)', () => {
    const mesh = withNormals(assembleMesh(revolve(() => 1), 'both'));
    expect(overhangFraction(mesh)).toBe(0);
  });

  it('гриб (резкое расширение вверх круче 60°) — свес заметен', () => {
    // r растёт со скоростью dr/dz = 3 > tan(60°): боковая стенка нависает
    const mesh = withNormals(assembleMesh(revolve((t) => 0.2 + 3 * t), 'both'));
    expect(overhangFraction(mesh)).toBeGreaterThan(0.3);
  });

  it('сужение кверху — свесов нет', () => {
    const mesh = withNormals(assembleMesh(revolve((t) => 1 - 0.5 * t), 'both'));
    expect(overhangFraction(mesh)).toBe(0);
  });
});

describe('export assessment', () => {
  it('allows a valid closed mesh', () => {
    const report = validateMesh(withNormals(assembleMesh(revolve(() => 1), 'both')));
    expect(assessExport(report, true).blocking).toEqual([]);
    expect(report.indicesValid).toBe(true);
    expect(report.extents).toEqual([2, 2, 1]);
  });

  it('blocks an invalid index instead of reading outside the buffers', () => {
    const mesh = withNormals(assembleMesh(revolve(() => 1), 'both'));
    mesh.indices[0] = mesh.positions.length;
    const report = validateMesh(mesh);
    expect(report.indicesValid).toBe(false);
    expect(report.watertight).toBe(false);
    expect(assessExport(report, true).blocking.some((s) => s.includes('indices'))).toBe(true);
  });

  it('молчит про единичные слив-треугольники, но блокирует их россыпь', () => {
    // Пара вырожденных треугольников — обычный след булевой операции там, где
    // поверхности сошлись по касательной; сотни — это уже сломанный меш.
    const base = validateMesh(withNormals(assembleMesh(revolve(() => 1), 'both')));
    const withSlivers = (count: number, triangleCount = base.triangleCount) =>
      ({ ...base, degenerateTriangles: count, triangleCount });
    // пара штук на большом меше — молчим
    expect(assessExport(withSlivers(2, 80000), true).warnings).toEqual([]);
    expect(assessExport(withSlivers(2, 80000), true).blocking).toEqual([]);
    // десятки — уже стоит сказать
    expect(assessExport(withSlivers(40, 80000), true).warnings.some((s) => s.includes('degenerate')))
      .toBe(true);
    // проценты — меш сломан, выпускать нельзя, и на мелком меше это те же
    // единицы штук
    expect(assessExport(withSlivers(10), true).blocking
      .some((s) => s.includes('degenerate'))).toBe(true);
  });

  it('checks normals for non-finite values', () => {
    const mesh = withNormals(assembleMesh(revolve(() => 1), 'both'));
    mesh.normals[0] = NaN;
    expect(validateMesh(mesh).finite).toBe(false);
  });
});
