// Раскладка готовых мешей на столе: детали оснастки в превью, крышка рядом
// с изделием. Чистая функция без Three.js — нужна и главному потоку, и
// воркеру, который склеивает изделие с крышкой в один STL.

import type { SurfaceMesh } from './surface';

/**
 * Зазор между изделием и крышкой, которые печатают за один заход. Хватает,
 * чтобы сопло не задевало соседа, и стол не тратится зря.
 */
export const LID_BESIDE_GAP_MM = 15;

/** Габарит группы по x. */
function spanX(group: readonly SurfaceMesh[]): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const mesh of group) {
    for (let i = 0; i < mesh.positions.length; i += 3) {
      if (mesh.positions[i] < min) min = mesh.positions[i];
      if (mesh.positions[i] > max) max = mesh.positions[i];
    }
  }
  return { min, max };
}

function shiftX(mesh: SurfaceMesh, dx: number): SurfaceMesh {
  if (dx === 0) return mesh;
  const positions = new Float32Array(mesh.positions);
  for (let i = 0; i < positions.length; i += 3) positions[i] += dx;
  return { ...mesh, positions };
}

/**
 * Ставит группы в ряд вдоль x с зазором `gapMm` между габаритами. Группа —
 * то, что двигается целиком: изделие с ручкой и носиком, пока они ещё
 * отдельные меши, — одна группа. Первая группа остаётся на месте.
 */
export function placeInRow(
  groups: readonly (readonly SurfaceMesh[])[],
  gapMm: number,
): SurfaceMesh[][] {
  const placed: SurfaceMesh[][] = [];
  let cursor = 0;
  groups.forEach((group, index) => {
    const { min, max } = spanX(group);
    if (!Number.isFinite(min)) {
      placed.push([...group]);
      return;
    }
    const dx = index === 0 ? 0 : cursor - min;
    placed.push(group.map((mesh) => shiftX(mesh, dx)));
    cursor = max + dx + gapMm;
  });
  return placed;
}
