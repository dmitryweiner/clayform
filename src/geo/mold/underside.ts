// Пустота под позитивом ванночки.
//
// Позитив блока внутри ванночки — это весь гипсовый блок, и печатать его
// сплошным незачем: силикону нужна только рабочая поверхность. Снизу под
// ней оставляем пустоту, открытую на стол, а от позитива — оболочку
// постоянной толщины. Слайсер поставит в пустоту поддержки, и всё равно
// пластика уйдёт в разы меньше.
//
// Позитив лежит рабочей гранью кверху, и его верх — однозначная функция
// h(x, y): силикон снимается вертикально, значит, сверху поднутрений нет.
// Потолок пустоты — эквидистанта этого графика на толщину оболочки ПО
// НОРМАЛИ, а не по вертикали: у половинки стенки полости у шва отвесные, и
// вертикальный сдвиг свёл бы оболочку там на нет. Эквидистанта графика —
// это эрозия шаром:
//
//     c(p) = min_{|q−p| ≤ t} ( h(q) − √(t² − |q−p|²) )
//
// Там, где позитива нет (вокруг блока, литник пробки), h = −∞, и эрозия
// сама отодвигает пустоту от боковых стенок на ту же толщину.

import type { Manifold } from 'manifold-3d';
import type { CsgApi, CsgScope } from '../csg';
import { toManifold } from '../csg';

/** Шаг сетки карты высот, мм: тоньше оболочка не нужна, мельче — дороже. */
const CELL_MM = 1;
/** Ниже этого над столом пустоту не режем: щель в пол ванночки ни к чему. */
const MIN_VOID_MM = 1;
/** Насколько пустота выходит ниже дна ванночки — чтобы срез был чистым. */
const BREAKTHROUGH_MM = 1;

/**
 * Пустота под позитивом, стоящим низом на z = 0. Снизу она проходит сквозь
 * пол ванночки (`floorMm` под нулём) насквозь. null — пустоты нет: позитив
 * слишком мал или тонок для оболочки.
 */
export function undersideVoid(
  csg: CsgApi,
  scope: CsgScope,
  positive: Manifold,
  shellMm: number,
  floorMm: number,
): Manifold | null {
  const box = positive.boundingBox();
  const field = topHeights(positive, box.min[0], box.min[1], box.max[0], box.max[1]);
  // Запас на шаг сетки. Карта знает поверхность только в узлах: узел ровно
  // на кромке отвесной стенки уже «верхний», и ближайший нижний узел может
  // оказаться на целую диагональ ячейки дальше настоящей стенки.
  const ceiling = erode(field, shellMm + CELL_MM * Math.SQRT2);
  const mesh = voidMesh(ceiling, -floorMm - BREAKTHROUGH_MM);
  return mesh ? scope.keep(toManifold(csg, mesh)) : null;
}

/** Значения в узлах сетки; NaN — узел вне позитива. */
interface HeightField {
  nx: number;
  ny: number;
  x0: number;
  y0: number;
  cell: number;
  /** (nx+1)·(ny+1), индекс j·(nx+1) + i */
  z: Float64Array;
}

/**
 * Верх позитива в узлах сетки: растеризация треугольников в z-буфер, по
 * узлу — наибольшая z. Отвесные грани в плане вырождены и ничего не
 * добавляют — их высоту дают соседние наклонные.
 */
function topHeights(solid: Manifold, xMin: number, yMin: number, xMax: number, yMax: number): HeightField {
  const cell = CELL_MM;
  const nx = Math.max(1, Math.ceil((xMax - xMin) / cell));
  const ny = Math.max(1, Math.ceil((yMax - yMin) / cell));
  // сетку центрируем на позитиве: края ложатся симметрично
  const x0 = (xMin + xMax - nx * cell) / 2;
  const y0 = (yMin + yMax - ny * cell) / 2;
  const stride = nx + 1;
  const z = new Float64Array(stride * (ny + 1)).fill(NaN);

  const { numProp, vertProperties, triVerts } = solid.getMesh();
  const px = (v: number): number => (vertProperties[v * numProp] - x0) / cell;
  const py = (v: number): number => (vertProperties[v * numProp + 1] - y0) / cell;
  const pz = (v: number): number => vertProperties[v * numProp + 2];
  for (let t = 0; t < triVerts.length; t += 3) {
    const a = triVerts[t], b = triVerts[t + 1], c = triVerts[t + 2];
    const ax = px(a), ay = py(a), bx = px(b), by = py(b), cx = px(c), cy = py(c);
    const area = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
    if (Math.abs(area) < 1e-12) continue;
    const az = pz(a), bz = pz(b), cz = pz(c);
    const i0 = Math.max(0, Math.ceil(Math.min(ax, bx, cx) - 1e-9));
    const i1 = Math.min(nx, Math.floor(Math.max(ax, bx, cx) + 1e-9));
    const j0 = Math.max(0, Math.ceil(Math.min(ay, by, cy) - 1e-9));
    const j1 = Math.min(ny, Math.floor(Math.max(ay, by, cy) + 1e-9));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        // барицентрические координаты; узел на ребре тоже считается внутри
        const wa = ((bx - i) * (cy - j) - (cx - i) * (by - j)) / area;
        const wb = ((cx - i) * (ay - j) - (ax - i) * (cy - j)) / area;
        const wc = 1 - wa - wb;
        if (wa < -1e-9 || wb < -1e-9 || wc < -1e-9) continue;
        const height = wa * az + wb * bz + wc * cz;
        const k = j * stride + i;
        if (!(z[k] >= height)) z[k] = height;
      }
    }
  }
  return { nx, ny, x0, y0, cell, z };
}

/**
 * Эрозия графика шаром радиуса `radius`. Узел, у которого в шаре есть пустой
 * сосед (вне позитива или вне сетки), сам становится пустым — так пустота
 * отходит от боковых стенок позитива на ту же толщину, что и от верха.
 * Узлы ниже MIN_VOID_MM над столом тоже пустые.
 */
function erode(field: HeightField, radius: number): HeightField {
  const { nx, ny, cell, z } = field;
  const stride = nx + 1;
  const reach = Math.ceil(radius / cell);
  const ball: { di: number; dj: number; drop: number }[] = [];
  for (let dj = -reach; dj <= reach; dj++) {
    for (let di = -reach; di <= reach; di++) {
      const d2 = (di * di + dj * dj) * cell * cell;
      if (d2 <= radius * radius) ball.push({ di, dj, drop: Math.sqrt(radius * radius - d2) });
    }
  }
  const out = new Float64Array(z.length).fill(NaN);
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      let lowest = Infinity;
      for (const { di, dj, drop } of ball) {
        const qi = i + di, qj = j + dj;
        const h = qi < 0 || qj < 0 || qi > nx || qj > ny ? NaN : z[qj * stride + qi];
        if (Number.isNaN(h)) {
          lowest = NaN;
          break;
        }
        lowest = Math.min(lowest, h - drop);
      }
      if (lowest > MIN_VOID_MM) out[j * stride + i] = lowest;
    }
  }
  return { ...field, z: out };
}

/**
 * Замкнутый меш пустоты: сверху потолок по узлам, снизу плоскость `bottomZ`,
 * по краю — отвесные стенки. Ячейка входит, если все четыре её узла живы.
 * Ячейки, касающиеся только углом, дали бы вершину-«бабочку», которую CSG не
 * примет; такие пары разбиваем, выбрасывая одну из ячеек.
 */
function voidMesh(field: HeightField, bottomZ: number): { positions: Float32Array; indices: Uint32Array } | null {
  const { nx, ny, x0, y0, cell, z } = field;
  const stride = nx + 1;
  const alive = (i: number, j: number): boolean => !Number.isNaN(z[j * stride + i]);
  const inside = new Uint8Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      inside[j * nx + i] = alive(i, j) && alive(i + 1, j) && alive(i, j + 1) && alive(i + 1, j + 1) ? 1 : 0;
    }
  }
  const at = (i: number, j: number): boolean =>
    i >= 0 && j >= 0 && i < nx && j < ny && inside[j * nx + i] === 1;
  for (let changed = true; changed;) {
    changed = false;
    for (let j = 0; j + 1 < ny; j++) {
      for (let i = 0; i + 1 < nx; i++) {
        const a = at(i, j), b = at(i + 1, j), c = at(i, j + 1), d = at(i + 1, j + 1);
        if (a && d && !b && !c) { inside[j * nx + i] = 0; changed = true; }
        else if (b && c && !a && !d) { inside[j * nx + i + 1] = 0; changed = true; }
      }
    }
  }

  // вершины — только у узлов, которых касается хоть одна ячейка
  const top = new Int32Array(stride * (ny + 1)).fill(-1);
  const coords: number[] = [];
  const vertex = (i: number, j: number): number => {
    const k = j * stride + i;
    if (top[k] < 0) {
      top[k] = coords.length / 3;
      const x = x0 + i * cell, y = y0 + j * cell;
      coords.push(x, y, z[k], x, y, bottomZ);
    }
    return top[k];
  };
  const tris: number[] = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      if (!at(i, j)) continue;
      // обход ячейки против часовой, если смотреть сверху
      const ring = [vertex(i, j), vertex(i + 1, j), vertex(i + 1, j + 1), vertex(i, j + 1)];
      const [p00, p10, p11, p01] = ring;
      tris.push(p00, p10, p11, p00, p11, p01); // потолок, нормаль вверх
      // дно — нижняя вершина идёт следом за верхней (индекс + 1), нормаль вниз
      tris.push(p00 + 1, p11 + 1, p10 + 1, p00 + 1, p01 + 1, p11 + 1);
      const neighbours = [at(i, j - 1), at(i + 1, j), at(i, j + 1), at(i - 1, j)];
      for (let e = 0; e < 4; e++) {
        if (neighbours[e]) continue;
        // снаружи — справа от направления обхода
        const a = ring[e], b = ring[(e + 1) % 4];
        tris.push(a + 1, b + 1, b, a + 1, b, a);
      }
    }
  }
  if (tris.length === 0) return null;
  return { positions: new Float32Array(coords), indices: new Uint32Array(tris) };
}
