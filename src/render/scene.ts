// Three.js-слой: сцена, свет, orbit-камера, материал. Принимает готовые
// буферы из ядра и ничего не знает о формулах. Модель в ядре z-up (печатная
// конвенция) — группа повёрнута в y-up для показа. Держать тонким: в vitest
// не грузится, проверяется смоуком.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { SurfaceMesh } from '../geo/surface';

export interface SceneHandle {
  setMesh(mesh: SurfaceMesh): void;
  /** несколько деталей разом — «взрыв»-превью разъёмной формы */
  setMeshes(meshes: SurfaceMesh[]): void;
  dispose(): void;
}

const CLEAR_COLOR = 0x17130f;
const MATERIAL_COLOR = 0xc98b62; // терракота

export function createScene(canvas: HTMLCanvasElement): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(CLEAR_COLOR);

  const scene = new THREE.Scene();
  // Модель в миллиметрах (сосуд ~100–300 мм), отсюда near/far в мм.
  const camera = new THREE.PerspectiveCamera(45, 1, 1, 8000);
  // Смотрим почти вдоль плоскости разъёма (модельная ось y): ручка слева,
  // носик справа — обе приставные детали видно сразу, без вращения мышью.
  camera.position.set(50, 120, 240);

  scene.add(new THREE.HemisphereLight(0xf0e2d4, 0x3a2e24, 0.9));
  const key = new THREE.DirectionalLight(0xfff4e8, 1.6);
  key.position.set(2, 3, 2);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xc0a894, 0.5);
  fill.position.set(-2, 1, -1.5);
  scene.add(fill);

  // z-up (модель) → y-up (экран)
  const group = new THREE.Group();
  group.rotation.x = -Math.PI / 2;
  scene.add(group);

  const material = new THREE.MeshStandardMaterial({
    color: MATERIAL_COLOR,
    metalness: 0.05,
    roughness: 0.55,
  });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  const objects: THREE.Mesh[] = [];
  let disposed = false;
  /** радиус модели на прошлой посадке камеры — чтобы не сбивать зум мышью */
  let fittedRadius = 0;

  function resize(): void {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }

  function frame(): void {
    if (disposed) return;
    resize();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /** Дистанция, с которой габаритная сфера целиком попадает в кадр. */
  function fitDistance(radius: number): number {
    const vFov = (camera.fov * Math.PI) / 180;
    const aspect = camera.aspect > 0 ? camera.aspect : 1;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    return (radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.12;
  }

  function clearObjects(): void {
    for (const obj of objects) {
      group.remove(obj);
      obj.geometry.dispose();
    }
    objects.length = 0;
  }

  return {
    setMesh(mesh: SurfaceMesh): void {
      this.setMeshes([mesh]);
    },

    setMeshes(meshes: SurfaceMesh[]): void {
      clearObjects();
      const bounds = new THREE.Box3();
      for (const mesh of meshes) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(mesh.positions, 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(mesh.normals, 3));
        geometry.setIndex(new THREE.BufferAttribute(mesh.indices, 1));
        geometry.computeBoundingBox();
        if (geometry.boundingBox) bounds.union(geometry.boundingBox);
        const obj = new THREE.Mesh(geometry, material);
        group.add(obj);
        objects.push(obj);
      }
      if (bounds.isEmpty()) return;

      // центр композиции в начало координат (в z-up координатах ядра)
      const center = new THREE.Vector3();
      bounds.getCenter(center);
      for (const obj of objects) obj.position.set(-center.x, -center.y, -center.z);
      controls.target.set(0, 0, 0);

      const size = new THREE.Vector3();
      bounds.getSize(size);
      const radius = size.length() / 2;
      const distance = fitDistance(radius);
      camera.near = Math.max(0.1, distance / 500);
      camera.far = distance * 20;
      camera.updateProjectionMatrix();
      // Зум, выставленный мышью, не трогаем, пока модель прежнего размера;
      // смена семейства или высоты меняет радиус — тогда сажаем заново.
      if (Math.abs(radius - fittedRadius) > fittedRadius * 0.08) {
        camera.position.setLength(distance);
        fittedRadius = radius;
      }
    },

    dispose(): void {
      disposed = true;
      controls.dispose();
      clearObjects();
      material.dispose();
      renderer.dispose();
    },
  };
}
