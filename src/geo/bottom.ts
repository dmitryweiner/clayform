// Дно с собственной сеткой.
//
// Обычное дно меша — веер из центроида граничного кольца: одно кольцо и
// центр. Для гладкого дна это ровно то, что нужно, а нарисовать на нём
// нечего — ни канавку, ни букву. Здесь дно строится полярными кольцами:
// густыми там, где на нём рельеф, и с шагом стенки в остальном; кольца
// разной густоты сшиваются «молнией» по углу. Внешнее кольцо — само кольцо
// сетки стенки, его вершины не трогаем: что делать с краем, решает
// вызывающий.
//
// Рельеф задаётся смещением по z (`heightAt`) в плоскости дна. Знак —
// забота вызывающего: дну изделия «внутрь» — это +z, полу полости — −z.

/** Густая полоса по радиусу: в ней шаг сетки — `stepMm`. */
export interface CapBand {
  from: number;
  to: number;
  stepMm: number;
}

export interface CapSpec {
  /** полосы мелкой сетки; вне их шаг — как у кольца стенки */
  dense?: readonly CapBand[];
  /** радиус сквозного отверстия по оси, мм; 0 или нет — сплошное дно */
  holeMm?: number;
  /** смещение по z, мм, в точке (x, y) */
  heightAt?(x: number, y: number): number;
}

export interface Cap {
  /** новые вершины, xyz подряд; их индексы — с `firstVertex` */
  positions: Float32Array;
  /** треугольники в абсолютных индексах меша */
  indices: Uint32Array;
  /** кольцо отверстия (nu вершин, абсолютные индексы) или null */
  hole: Uint32Array | null;
}

/** Не ближе этого к стенке внутреннее кольцо: «молния» до неё — одна полоса. */
const EDGE_GAP = 0.6;

/**
 * Дно внутри граничного кольца из `nu` вершин, лежащих в `positions` с
 * индекса `ringStart`. Вершина i кольца — на угле 2π·i/nu (так строит любая
 * сетка тела вращения). `facing` — куда смотрит нормаль: 'down' у наружного
 * дна, 'up' у пола полости. Новые вершины нумеруются с `firstVertex`.
 */
export function buildCap(
  positions: ArrayLike<number>,
  ringStart: number,
  nu: number,
  firstVertex: number,
  spec: CapSpec,
  facing: 'up' | 'down',
): Cap {
  let z0 = 0;
  let edge = Infinity;
  for (let i = 0; i < nu; i++) {
    const p = (ringStart + i) * 3;
    z0 += positions[p + 2];
    edge = Math.min(edge, Math.hypot(positions[p], positions[p + 1]));
  }
  z0 /= nu;
  const wallStep = (2 * Math.PI * edge) / nu;
  const hole = Math.max(0, spec.holeMm ?? 0);
  const bands = spec.dense ?? [];
  const stepAt = (r: number): number => {
    let step = wallStep;
    for (const band of bands) if (r >= band.from - step && r <= band.to + step) step = Math.min(step, band.stepMm);
    return Math.max(step, 0.05);
  };
  const heightAt = spec.heightAt ?? (() => 0);

  // радиусы колец: от отверстия (или от центра) к стенке
  const last = edge - Math.min(EDGE_GAP * wallStep + 0.05, edge * 0.1);
  const radii: number[] = [];
  let r = hole > 0 ? hole : stepAt(0);
  while (r < last) {
    radii.push(r);
    r += stepAt(r);
  }
  if (radii.length === 0 || last - radii[radii.length - 1] > stepAt(last) * 0.3) radii.push(last);
  else radii[radii.length - 1] = last;
  if (hole > 0 && radii[0] !== hole) radii.unshift(hole);

  const coords: number[] = [];
  const tris: number[] = [];
  let next = firstVertex;
  const vertex = (x: number, y: number): number => {
    coords.push(x, y, z0 + heightAt(x, y));
    return next++;
  };

  /** кольцо радиуса r: индексы и углы вершин, первая — на угле 0 */
  const ring = (radius: number, count: number): number[] => {
    const out: number[] = [];
    for (let k = 0; k < count; k++) {
      const a = (2 * Math.PI * k) / count;
      out.push(vertex(radius * Math.cos(a), radius * Math.sin(a)));
    }
    return out;
  };
  const countAt = (radius: number, forceNu: boolean): number =>
    forceNu ? nu : Math.max(6, Math.ceil((2 * Math.PI * radius) / stepAt(radius)));

  // треугольник с нормалью вверх; для 'down' обход разворачиваем
  const tri = (a: number, b: number, c: number): void => {
    if (facing === 'up') tris.push(a, b, c);
    else tris.push(a, c, b);
  };

  const rings: number[][] = radii.map((radius, k) => ring(radius, countAt(radius, hole > 0 && k === 0)));
  if (hole === 0) {
    const centre = vertex(0, 0);
    const first = rings[0];
    for (let k = 0; k < first.length; k++) tri(centre, first[k], first[(k + 1) % first.length]);
  }
  for (let k = 0; k + 1 < rings.length; k++) zip(rings[k], rings[k + 1], tri);
  const boundary: number[] = [];
  for (let i = 0; i < nu; i++) boundary.push(ringStart + i);
  zip(rings[rings.length - 1], boundary, tri);

  return {
    positions: new Float32Array(coords),
    indices: new Uint32Array(tris),
    hole: hole > 0 ? new Uint32Array(rings[0]) : null,
  };
}

/**
 * «Молния» между внутренним и внешним кольцом с равномерными углами, оба
 * начинаются с угла 0: на каждом шаге продвигается то кольцо, чья следующая
 * вершина раньше по углу. Треугольники — с нормалью вверх.
 */
function zip(inner: readonly number[], outer: readonly number[], tri: (a: number, b: number, c: number) => void): void {
  const n = inner.length;
  const m = outer.length;
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    const nextInner = (i + 1) / n;
    const nextOuter = (j + 1) / m;
    if (j < m && (i >= n || nextOuter <= nextInner)) {
      tri(inner[i % n], outer[j], outer[(j + 1) % m]);
      j++;
    } else {
      tri(inner[i], outer[j % m], inner[(i + 1) % n]);
      i++;
    }
  }
}
