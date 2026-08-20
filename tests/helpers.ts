// Общие сборщики мешей для тестов: тело вращения из r(t) и декодер STL.

import { sampleGrid, assembleMesh } from '../src/geo/surface';
import type { CapMode, SurfaceMesh } from '../src/geo/surface';
import { meshNormals } from '../src/geo/normals';

/** Тело вращения r(v), v ∈ [0,1] — низ→верх, высота 1 (или heightScale). */
export function revolveMesh(
  rOfT: (t: number) => number,
  opts: { nu?: number; nv?: number; height?: number; caps?: CapMode } = {},
): SurfaceMesh {
  const { nu = 32, nv = 16, height = 1, caps = 'both' } = opts;
  const grid = sampleGrid(nu, nv, (u, v, out) => {
    const r = rOfT(v);
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = v * height;
  });
  const mesh = assembleMesh(grid, caps);
  return { ...mesh, normals: meshNormals(mesh.positions, mesh.indices) };
}

export interface ParsedStl {
  header: string;
  triCount: number;
  normals: number[][];
  vertices: number[][][];
}

export function decodeSTL(buf: ArrayBuffer): ParsedStl {
  const dv = new DataView(buf);
  const header = new TextDecoder().decode(new Uint8Array(buf, 0, 80)).replace(/\0+$/, '');
  const triCount = dv.getUint32(80, true);
  const normals: number[][] = [];
  const vertices: number[][][] = [];
  let off = 84;
  for (let t = 0; t < triCount; t++) {
    normals.push([dv.getFloat32(off, true), dv.getFloat32(off + 4, true), dv.getFloat32(off + 8, true)]);
    off += 12;
    const tri: number[][] = [];
    for (let v = 0; v < 3; v++) {
      tri.push([dv.getFloat32(off, true), dv.getFloat32(off + 4, true), dv.getFloat32(off + 8, true)]);
      off += 12;
    }
    vertices.push(tri);
    off += 2; // attribute byte count
  }
  return { header, triCount, normals, vertices };
}
