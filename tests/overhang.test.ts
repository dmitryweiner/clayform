// Свесы для печати глиной: overhangFraction. Замкнутость и сито экспорта —
// китовые (`maker-kit/3d/validate`), их тесты — в ките.
import { sampleGrid, assembleMesh } from '../src/geo/surface';
import { meshNormals } from 'maker-kit/3d/mesh';
import { overhangFraction } from '../src/geo/overhang';
import { concaveLayout, defaultConcave } from '../src/geo/concave';

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

describe('overhangFraction', () => {
  it('цилиндр: свесов нет (дно исключено, верхняя крышка смотрит вверх)', () => {
    const mesh = withNormals(
      assembleMesh(
        revolve(() => 1),
        'both',
      ),
    );
    expect(overhangFraction(mesh)).toBe(0);
  });

  it('гриб (резкое расширение вверх круче 60°) — свес заметен', () => {
    // r растёт со скоростью dr/dz = 3 > tan(60°): боковая стенка нависает
    const mesh = withNormals(
      assembleMesh(
        revolve((t) => 0.2 + 3 * t),
        'both',
      ),
    );
    expect(overhangFraction(mesh)).toBeGreaterThan(0.3);
  });

  it('сужение кверху — свесов нет', () => {
    const mesh = withNormals(
      assembleMesh(
        revolve((t) => 1 - 0.5 * t),
        'both',
      ),
    );
    expect(overhangFraction(mesh)).toBe(0);
  });

  it('вогнутое дно нависает нарочно: в цилиндре дна оно не считается, гриб — по-прежнему', () => {
    // цилиндр ⌀20 высотой 1: дно утоплено на 0,2 — далеко выше первых слоёв
    const layout = concaveLayout({ ...defaultConcave(), on: true, kind: 'flat', depthMm: 0.2, ringMm: 1, filletMm: 0 }, 10, 1);
    if (!layout) throw new Error('no layout');
    const skip = { radiusMm: layout.footprintMm, heightMm: layout.depthMm + 0.01 };
    const cylinder = withNormals(
      assembleMesh(
        revolve(() => 10),
        'both',
        { section: layout.section },
      ),
    );
    expect(overhangFraction(cylinder)).toBeGreaterThan(0.1);
    expect(overhangFraction(cylinder, 60, skip)).toBe(0);
    const mushroom = withNormals(
      assembleMesh(
        revolve((t) => 0.2 + 3 * t),
        'both',
      ),
    );
    expect(overhangFraction(mushroom, 60, skip)).toBeGreaterThan(0.3);
  });
});
