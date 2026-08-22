// Тело вращения по замкнутому контуру: ломаная в осевом сечении (r, z),
// прокрученная вокруг оси z.
//
// Чем это отличается от vesselGrid. Тот строит r(v) — функцию, у которой на
// каждой высоте ровно один радиус. Силуэту посуды этого хватает, а крышке
// нет: у неё под полем идёт горизонтальная полка, где одной высоте отвечает
// целый отрезок радиусов, а под куполом контур разворачивается и идёт
// обратно вниз. Замкнутая ломаная описывает и то и другое, а заодно — ручку
// крышки, которая тоже тело вращения и потому не требует ни CSG, ни
// протяжки.
//
// Обход контура — против часовой стрелки в плоскости (r вправо, z вверх):
// материал остаётся слева по ходу. При этом обходе нормали получаются
// наружу; пущенный по часовой контур дал бы вывернутый наизнанку меш.
//
// Точки на оси (r = 0) схлопываются в ОДНУ вершину, а не в кольцо из nu
// совпадающих: кольцо дало бы nu вырожденных треугольников на каждый полюс,
// и проверка меша (assessExport) заблокировала бы экспорт из-за их доли.
// Сегмент между двумя точками на оси не даёт ничего: это отрезок самой оси,
// каким контур возвращается от вершины наружной поверхности к вершине
// внутренней.

import type { SurfaceMesh } from './surface';

export interface LathePoint {
  /** радиус, мм; отрицательный подтягивается к нулю */
  r: number;
  /** высота, мм */
  z: number;
}

/** Ниже этого радиуса точка контура считается лежащей на оси. */
const AXIS_EPS = 1e-6;
/** Короче этого сегмент контура вырожден: две точки в одном месте. */
const STEP_EPS = 1e-7;

/**
 * Выбрасывает повторы подряд идущих точек, в том числе на стыке конца с
 * началом: контур замкнут по построению, и дублировать первую точку в конце
 * не нужно. Две подряд идущие точки на оси с РАЗНОЙ высотой — не повтор:
 * это два полюса, и обе нужны.
 */
function compact(contour: readonly LathePoint[]): LathePoint[] {
  const points: LathePoint[] = [];
  const same = (a: LathePoint, b: LathePoint): boolean =>
    Math.abs(a.r - b.r) < STEP_EPS && Math.abs(a.z - b.z) < STEP_EPS;

  for (const point of contour) {
    const next = { r: Math.max(0, point.r), z: point.z };
    if (points.length > 0 && same(points[points.length - 1], next)) continue;
    points.push(next);
  }
  while (points.length > 1 && same(points[0], points[points.length - 1])) points.pop();
  return points;
}

/**
 * Меш тела вращения. Контур замыкается сам: последняя точка соединяется с
 * первой. Нормали не считает — как и assembleMesh, см. normals.ts.
 */
export function lathe(contour: readonly LathePoint[], nu: number): Omit<SurfaceMesh, 'normals'> {
  if (!Number.isFinite(nu) || nu < 3) throw new Error(`lathe: мало сегментов по кругу: ${nu}`);
  const points = compact(contour);
  if (points.length < 3) throw new Error(`lathe: в контуре ${points.length} точек, нужно хотя бы 3`);

  const axis = points.map((point) => point.r <= AXIS_EPS);
  const base: number[] = [];
  let vertexCount = 0;
  for (let m = 0; m < points.length; m++) {
    base.push(vertexCount);
    vertexCount += axis[m] ? 1 : nu;
  }

  const positions = new Float32Array(vertexCount * 3);
  for (let m = 0; m < points.length; m++) {
    const { r, z } = points[m];
    if (axis[m]) {
      positions[base[m] * 3 + 2] = z;
      continue;
    }
    for (let i = 0; i < nu; i++) {
      const u = (2 * Math.PI * i) / nu;
      const k = (base[m] + i) * 3;
      positions[k] = r * Math.cos(u);
      positions[k + 1] = r * Math.sin(u);
      positions[k + 2] = z;
    }
  }

  let triangles = 0;
  for (let m = 0; m < points.length; m++) {
    const m1 = (m + 1) % points.length;
    if (axis[m] && axis[m1]) continue;
    triangles += axis[m] || axis[m1] ? nu : 2 * nu;
  }

  const indices = new Uint32Array(triangles * 3);
  let k = 0;
  for (let m = 0; m < points.length; m++) {
    const m1 = (m + 1) % points.length;
    if (axis[m] && axis[m1]) continue;
    const from = base[m];
    const to = base[m1];
    for (let i = 0; i < nu; i++) {
      const i1 = (i + 1) % nu;
      if (axis[m]) {
        // веер от полюса к кольцу: обход тот же, что у нижней крышки сетки
        indices[k++] = from; indices[k++] = to + i1; indices[k++] = to + i;
      } else if (axis[m1]) {
        indices[k++] = from + i; indices[k++] = from + i1; indices[k++] = to;
      } else {
        indices[k++] = from + i; indices[k++] = from + i1; indices[k++] = to + i1;
        indices[k++] = from + i; indices[k++] = to + i1; indices[k++] = to + i;
      }
    }
  }
  return { positions, indices };
}
