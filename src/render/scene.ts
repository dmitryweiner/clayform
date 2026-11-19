// 3D-вид — вьюер кита (`maker-kit/3d/viewer`): рендер, свет, орбитальная
// камера, сетка стола, вписывание и кадры по запросу. Своё здесь — только
// терракота, ракурс, в котором изделие открывается, и камера на донышко.
// Держать тонким: в vitest не грузится, проверяется смоуком.

import * as THREE from 'three';
import type { SurfaceMesh } from 'maker-kit/3d/mesh';
import type { Direction } from 'maker-kit/3d/viewer';
import { createViewer } from 'maker-kit/3d/viewer';

export interface SceneHandle {
  /** несколько мешей разом: тело с ручкой и носиком, крышка рядом */
  setMeshes(meshes: SurfaceMesh[]): void;
  /**
   * Камера снизу, на донышко, — как смотрят на перевёрнутое изделие:
   * «двенадцать часов» клейма наверху кадра.
   */
  viewBottom(): void;
  /** сколько вида закрывает лист на телефоне: изделие вписывается выше него */
  setInset(px: number): void;
}

const MATERIAL_COLOR = 0xc98b62; // терракота
/** Стол глиняного принтера — сетка не меньше него. */
const BED_MM = 200;
/**
 * Откуда смотрим сначала: почти вдоль плоскости разъёма (модельная ось y) —
 * ручка слева, носик справа, обе приставные детали видно без вращения.
 */
const OPENING: Direction = [50, 120, 240];
/**
 * На дно: строго снизу орбита вырождается на полюсе; чуть сместившись к
 * модельной +y (экранной −z), получаем «верх» кадра там, где он у клейма.
 */
const BOTTOM: Direction = [0, -1, -0.02];

/** null — нет WebGL: приложение работает дальше без вида. */
export function createScene(canvas: HTMLCanvasElement): SceneHandle | null {
  const viewer = createViewer(canvas);
  if (!viewer) return null;
  viewer.fitBed(BED_MM, BED_MM);
  // спрошенный до первого меша ракурс — тот, с которого вписывается первый
  viewer.look(OPENING);
  const material = new THREE.MeshStandardMaterial({ color: MATERIAL_COLOR, metalness: 0.05, roughness: 0.55 });
  return {
    setMeshes: (meshes) => viewer.setMeshes(meshes.map((mesh) => ({ mesh, material }))),
    viewBottom: () => viewer.look(BOTTOM),
    setInset: (px) => viewer.setInset(px),
  };
}
