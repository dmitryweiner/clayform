// Свесы для FDM-печати глиной: доля площади, нависающей круче предела.
// Остальная проверка меша — замкнутость, объём, вырожденные треугольники,
// сито экспорта — китовая (`maker-kit/3d/validate`); свесы нужны одному
// приложению.

import type { SurfaceMesh } from 'maker-kit/3d/mesh';

/** Цилиндр у дна вокруг оси, грани в котором не считаются. */
export interface OverhangSkip {
  radiusMm: number;
  heightMm: number;
}

/**
 * Доля площади, нависающей круче limitDeg от вертикали (плохо для FDM).
 * Грани у самого дна (первые слои на столе) не считаются, как и грани с
 * центром в цилиндре `skip`: вогнутое дно нависает нарочно, и о нём не
 * предупреждают.
 */
export function overhangFraction(mesh: Pick<SurfaceMesh, 'positions' | 'indices'>, limitDeg = 60, skip?: OverhangSkip): number {
  const { positions, indices } = mesh;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (let i = 2; i < positions.length; i += 3) {
    if (positions[i] < zMin) zMin = positions[i];
    if (positions[i] > zMax) zMax = positions[i];
  }
  const bedZ = zMin + 0.02 * (zMax - zMin);
  const sinLimit = Math.sin((limitDeg * Math.PI) / 180);
  let total = 0;
  let bad = 0;
  for (let t = 0; t < indices.length; t += 3) {
    const a = indices[t] * 3;
    const b = indices[t + 1] * 3;
    const c = indices[t + 2] * 3;
    if (positions[a + 2] < bedZ && positions[b + 2] < bedZ && positions[c + 2] < bedZ) continue;
    if (skip) {
      const x = (positions[a] + positions[b] + positions[c]) / 3;
      const y = (positions[a + 1] + positions[b + 1] + positions[c + 1]) / 3;
      const z = (positions[a + 2] + positions[b + 2] + positions[c + 2]) / 3;
      if (z < skip.heightMm && Math.hypot(x, y) < skip.radiusMm) continue;
    }
    const abx = positions[b] - positions[a];
    const aby = positions[b + 1] - positions[a + 1];
    const abz = positions[b + 2] - positions[a + 2];
    const acx = positions[c] - positions[a];
    const acy = positions[c + 1] - positions[a + 1];
    const acz = positions[c + 2] - positions[a + 2];
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-30) continue;
    total += len;
    if (nz / len < -sinLimit) bad += len;
  }
  return total > 0 ? bad / total : 0;
}
