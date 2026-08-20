// Протяжка сечения по кривой: из этого сделаны ручки.
//
// Кривая ручки лежит в плоскости разъёма формы (y = 0), поэтому локальный
// репер строится тривиально: ось y всегда перпендикулярна касательной, и
// параллельный перенос с его накоплением ошибки не нужен.

import type { SurfaceMesh } from './surface';
import { meshNormals } from './normals';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Точка кубической кривой Безье. */
export function bezier(p0: Vec3, c0: Vec3, c1: Vec3, p1: Vec3, t: number): Vec3 {
  const s = 1 - t;
  const a = s * s * s;
  const b = 3 * s * s * t;
  const c = 3 * s * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * c0.x + c * c1.x + d * p1.x,
    y: a * p0.y + b * c0.y + c * c1.y + d * p1.y,
    z: a * p0.z + b * c0.z + c * c1.z + d * p1.z,
  };
}

/** Касательная кубической кривой Безье (не нормирована). */
export function bezierTangent(p0: Vec3, c0: Vec3, c1: Vec3, p1: Vec3, t: number): Vec3 {
  const s = 1 - t;
  const a = 3 * s * s;
  const b = 6 * s * t;
  const c = 3 * t * t;
  return {
    x: a * (c0.x - p0.x) + b * (c1.x - c0.x) + c * (p1.x - c1.x),
    y: a * (c0.y - p0.y) + b * (c1.y - c0.y) + c * (p1.y - c1.y),
    z: a * (c0.z - p0.z) + b * (c1.z - c0.z) + c * (p1.z - c1.z),
  };
}

export interface SweepSection {
  /** полуось в плоскости кривой, мм */
  halfDepth: number;
  /** полуось поперёк плоскости кривой, мм */
  halfWidth: number;
}

/**
 * Замкнутая труба эллиптического сечения вдоль кривой, с плоскими торцами.
 * Торцы прячутся внутрь тела при объединении, поэтому им достаточно быть
 * плоскими веерами.
 */
export function sweepTube(
  path: (t: number) => Vec3,
  tangent: (t: number) => Vec3,
  section: (t: number) => SweepSection,
  segments: number,
  ringSize: number,
): SurfaceMesh {
  const rows = segments + 1;
  const vertexCount = rows * ringSize + 2; // + два центра торцов
  const positions = new Float32Array(vertexCount * 3);

  for (let j = 0; j < rows; j++) {
    const t = j / segments;
    const point = path(t);
    const tan = normalize(tangent(t));
    // ось y перпендикулярна касательной, потому что кривая плоская
    const across: Vec3 = { x: 0, y: 1, z: 0 };
    const inPlane = normalize(cross(tan, across));
    const { halfDepth, halfWidth } = section(t);

    for (let i = 0; i < ringSize; i++) {
      const angle = (2 * Math.PI * i) / ringSize;
      const ca = Math.cos(angle) * halfDepth;
      const sa = Math.sin(angle) * halfWidth;
      const k = (j * ringSize + i) * 3;
      positions[k] = point.x + inPlane.x * ca + across.x * sa;
      positions[k + 1] = point.y + inPlane.y * ca + across.y * sa;
      positions[k + 2] = point.z + inPlane.z * ca + across.z * sa;
    }
  }

  const startCap = rows * ringSize;
  const endCap = startCap + 1;
  writeCentroid(positions, 0, ringSize, startCap);
  writeCentroid(positions, (rows - 1) * ringSize, ringSize, endCap);

  const sideTris = segments * ringSize * 2;
  const indices = new Uint32Array((sideTris + ringSize * 2) * 3);
  let k = 0;
  for (let j = 0; j < segments; j++) {
    for (let i = 0; i < ringSize; i++) {
      const i1 = (i + 1) % ringSize;
      const a = j * ringSize + i;
      const b = j * ringSize + i1;
      const c = (j + 1) * ringSize + i1;
      const d = (j + 1) * ringSize + i;
      indices[k++] = a; indices[k++] = c; indices[k++] = b;
      indices[k++] = a; indices[k++] = d; indices[k++] = c;
    }
  }
  // торец в начале смотрит против касательной, в конце — по ней
  for (let i = 0; i < ringSize; i++) {
    const i1 = (i + 1) % ringSize;
    indices[k++] = startCap; indices[k++] = i; indices[k++] = i1;
  }
  const last = (rows - 1) * ringSize;
  for (let i = 0; i < ringSize; i++) {
    const i1 = (i + 1) % ringSize;
    indices[k++] = endCap; indices[k++] = last + i1; indices[k++] = last + i;
  }

  return { positions, indices, normals: meshNormals(positions, indices) };
}

/** Отражение меша по оси y → x: ручка на противоположной стороне. */
export function mirrorX(mesh: SurfaceMesh): SurfaceMesh {
  const positions = new Float32Array(mesh.positions);
  for (let i = 0; i < positions.length; i += 3) positions[i] = -positions[i];
  // зеркалирование выворачивает ориентацию — возвращаем обход обратно
  const indices = new Uint32Array(mesh.indices.length);
  for (let t = 0; t < mesh.indices.length; t += 3) {
    indices[t] = mesh.indices[t];
    indices[t + 1] = mesh.indices[t + 2];
    indices[t + 2] = mesh.indices[t + 1];
  }
  return { positions, indices, normals: meshNormals(positions, indices) };
}

function writeCentroid(positions: Float32Array, start: number, count: number, target: number): void {
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < count; i++) {
    const k = (start + i) * 3;
    x += positions[k];
    y += positions[k + 1];
    z += positions[k + 2];
  }
  positions[target * 3] = x / count;
  positions[target * 3 + 1] = y / count;
  positions[target * 3 + 2] = z / count;
}

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v.x, v.y, v.z);
  if (length < 1e-12) return { x: 0, y: 0, z: 1 };
  return { x: v.x / length, y: v.y / length, z: v.z / length };
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}
