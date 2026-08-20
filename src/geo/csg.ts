// Мост между нашим SurfaceMesh и manifold-3d (WASM CSG).
//
// Параметрические тела вращения с рельефом мы строим сами — Manifold нужен
// там, где без булевых операций не обойтись: приклеить ручку/носик к телу,
// вырезать полость изделия из гипсового блока, рассечь блок плоскостью
// разъёма, собрать ванночку-опалубку.
//
// Особенность WASM: объекты Manifold не собираются GC, их надо явно
// удалять — для этого CsgScope.

import Module from 'manifold-3d';
import type { Manifold, Mesh, ManifoldToplevel } from 'manifold-3d';
import type { SurfaceMesh } from './surface';
import { meshNormals } from './normals';

/** Всё, что нам нужно от WASM-модуля: конструкторы примитивов и Mesh. */
export type CsgApi = ManifoldToplevel;

let pending: Promise<CsgApi> | null = null;

/**
 * Загружает WASM один раз на процесс/воркер. Повторные вызовы отдают тот же
 * промис — WASM-инстанс тяжёлый (~2 МБ) и глобален по своей природе.
 */
export function initCSG(): Promise<CsgApi> {
  if (!pending) {
    pending = Module().then((wasm) => {
      wasm.setup();
      return wasm;
    });
  }
  return pending;
}

/**
 * Собирает удерживаемые Manifold/CrossSection и освобождает их разом.
 * Любая цепочка булевых операций плодит промежуточные объекты; без scope
 * WASM-куча растёт до OOM на нескольких экспортах подряд.
 */
export class CsgScope {
  private items: { delete(): void }[] = [];

  /** Регистрирует объект к удалению и возвращает его же (удобно в выражениях). */
  keep<T extends { delete(): void }>(item: T): T {
    this.items.push(item);
    return item;
  }

  get size(): number {
    return this.items.length;
  }

  dispose(): void {
    for (const item of this.items) {
      item.delete();
    }
    this.items = [];
  }
}

/**
 * SurfaceMesh → Manifold. Наши сетки уже сшиты по шву индексной арифметикой,
 * поэтому дублирующихся вершин нет и merge-векторы не нужны.
 *
 * Бросает, если меш не замкнутый солид: Manifold в таком случае возвращает
 * объект со статусом NotManifold, который молча портит все дальнейшие
 * операции — лучше упасть здесь.
 */
export function toManifold(csg: CsgApi, mesh: Pick<SurfaceMesh, 'positions' | 'indices'>): Manifold {
  const input = new csg.Mesh({
    numProp: 3,
    vertProperties: new Float32Array(mesh.positions),
    triVerts: new Uint32Array(mesh.indices),
  });
  // ofMesh бросает голое «Not manifold» без указания, чей это меш; при
  // NonFiniteVertex и подобном оно, наоборот, возвращает объект со статусом.
  // Оба случая сводим к одному сообщению с контекстом.
  let solid: Manifold;
  try {
    solid = csg.Manifold.ofMesh(input);
  } catch (cause) {
    const reason = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`toManifold: mesh is not a closed solid (${reason})`, { cause });
  }
  const status = solid.status();
  if (status !== 'NoError') {
    solid.delete();
    throw new Error(`toManifold: mesh is not a closed solid (${status})`);
  }
  return solid;
}

/** Manifold → SurfaceMesh с пересчитанными вершинными нормалями. */
export function fromManifold(solid: Manifold): SurfaceMesh {
  const mesh: Mesh = solid.getMesh();
  const positions = extractPositions(mesh);
  const indices = new Uint32Array(mesh.triVerts);
  return { positions, indices, normals: meshNormals(positions, indices) };
}

/**
 * Первые три свойства каждой вершины — это x, y, z. Manifold может вернуть
 * numProp > 3 (нормали/UV), поэтому позиции вычёсываем из чересстрочного
 * буфера, а не копируем целиком.
 */
function extractPositions(mesh: Mesh): Float32Array {
  const { numProp, vertProperties } = mesh;
  if (numProp === 3) return new Float32Array(vertProperties);
  const count = vertProperties.length / numProp;
  const positions = new Float32Array(count * 3);
  for (let v = 0; v < count; v++) {
    positions[v * 3] = vertProperties[v * numProp];
    positions[v * 3 + 1] = vertProperties[v * numProp + 1];
    positions[v * 3 + 2] = vertProperties[v * numProp + 2];
  }
  return positions;
}
