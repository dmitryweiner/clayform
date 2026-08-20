// Точка входа: собирает UI, ядро геометрии и рендер. Растёт по вехам плана —
// сейчас (M0/M1) поднимает сцену и проверяет, что WASM-CSG доступен в браузере.

import './style.css';
import { el } from './ui/dom';
import { createScene } from './render/scene';
import { sampleGrid, assembleMesh } from './geo/surface';
import { meshNormals } from './geo/normals';
import { initCSG } from './geo/csg';

const view = el('view', HTMLCanvasElement);
const status = el('status', HTMLParagraphElement);
const scene = createScene(view);

function placeholderVessel(): void {
  const grid = sampleGrid(96, 96, (u, v, out) => {
    const r = 40 + 22 * Math.sin(Math.PI * v) - 10 * v;
    out[0] = r * Math.cos(u);
    out[1] = r * Math.sin(u);
    out[2] = v * 140;
  });
  const mesh = assembleMesh(grid, 'both');
  scene.setMesh({ ...mesh, normals: meshNormals(mesh.positions, mesh.indices) });
}

placeholderVessel();

initCSG().then(
  () => {
    status.textContent = 'Геометрическое ядро и CSG готовы.';
  },
  (error: unknown) => {
    status.textContent = `CSG недоступен: ${error instanceof Error ? error.message : String(error)}`;
  },
);
