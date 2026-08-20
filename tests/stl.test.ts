// STL: закодировать и разобрать буфер обратно — структура, масштаб, нормали.
import { encodeSTL } from '../src/geo/stl';
import { revolveMesh, decodeSTL } from './helpers';

describe('encodeSTL', () => {
  const mesh = revolveMesh((t) => 30 + 10 * Math.sin(Math.PI * t), { nu: 24, nv: 16, height: 100 });

  it('размер буфера = 84 + 50·triCount, заголовок и счётчик корректны', () => {
    const buf = encodeSTL(mesh, { name: 'pot' });
    const triCount = mesh.indices.length / 3;
    expect(buf.byteLength).toBe(84 + triCount * 50);
    const parsed = decodeSTL(buf);
    expect(parsed.triCount).toBe(triCount);
    expect(parsed.header).toContain('ClayForm');
    expect(parsed.header).toContain('pot');
  });

  it('по умолчанию scale = 1: ядро уже в миллиметрах', () => {
    const parsed = decodeSTL(encodeSTL(mesh));
    const src = mesh.indices[0] * 3;
    expect(parsed.vertices[0][0][0]).toBeCloseTo(mesh.positions[src], 3);
    expect(parsed.vertices[0][0][2]).toBeCloseTo(mesh.positions[src + 2], 3);
  });

  it('вершины = позиции × scale, треугольники в исходном порядке', () => {
    const scale = 0.5;
    const parsed = decodeSTL(encodeSTL(mesh, { scale }));
    for (let t = 0; t < 5; t++) {
      for (let v = 0; v < 3; v++) {
        const src = mesh.indices[t * 3 + v] * 3;
        for (let c = 0; c < 3; c++) {
          expect(parsed.vertices[t][v][c]).toBeCloseTo(mesh.positions[src + c] * scale, 3);
        }
      }
    }
  });

  it('нормали единичные и согласованы с обходом вершин', () => {
    const parsed = decodeSTL(encodeSTL(mesh));
    for (let t = 0; t < parsed.triCount; t += 17) {
      const [n, tri] = [parsed.normals[t], parsed.vertices[t]];
      expect(Math.hypot(n[0], n[1], n[2])).toBeCloseTo(1, 4);
      const ab = tri[1].map((x, c) => x - tri[0][c]);
      const ac = tri[2].map((x, c) => x - tri[0][c]);
      const cross = [
        ab[1] * ac[2] - ab[2] * ac[1],
        ab[2] * ac[0] - ab[0] * ac[2],
        ab[0] * ac[1] - ab[1] * ac[0],
      ];
      const len = Math.hypot(cross[0], cross[1], cross[2]);
      const dot = (n[0] * cross[0] + n[1] * cross[1] + n[2] * cross[2]) / len;
      expect(dot).toBeGreaterThan(0.999);
    }
  });
});
