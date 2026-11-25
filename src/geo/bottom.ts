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
//
// Вогнутое дно (`section`) — осевое сечение, ломаная от оси к стенке: кольца
// тогда идут по длине сечения, а не по радиусу, и у отвесной стенки
// ступеньки стоят друг над другом на одном радиусе. Рельеф ложится поверх.

/** Густая полоса по радиусу: в ней шаг сетки — `stepMm`. */
export interface CapBand {
  from: number;
  to: number;
  stepMm: number;
}

/** Точка осевого сечения дна: радиус и подъём над плоскостью дна, мм. */
export interface CapSectionPoint {
  r: number;
  z: number;
}

export interface CapSpec {
  /** полосы мелкой сетки; вне их шаг — как у кольца стенки */
  dense?: readonly CapBand[];
  /**
   * Высота плоскости дна. По умолчанию — средняя по кольцу стенки; задавать,
   * когда само кольцо уже поднято рельефом (иначе дно уйдёт вслед за ним).
   */
  planeZ?: number;
  /** смещение по z, мм, в точке (x, y) */
  heightAt?: (x: number, y: number) => number;
  /**
   * Сечение дна от оси (r = 0) к кольцу стенки; r не убывает, z — подъём
   * над плоскостью. Нет — дно плоское, кольца идут по радиусу.
   */
  section?: readonly CapSectionPoint[];
}

export interface Cap {
  /** новые вершины, xyz подряд; их индексы — с `firstVertex` */
  positions: Float32Array;
  /** треугольники в абсолютных индексах меша */
  indices: Uint32Array;
}

/** Не ближе этого к стенке внутреннее кольцо: «молния» до неё — одна полоса. */
const EDGE_GAP = 0.6;
/** Поворот касательной сечения, после которого нужно новое кольцо (≈ 11°). */
const TURN_RAD = 0.2;

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
  z0 = spec.planeZ ?? z0 / nu;
  const wallStep = (2 * Math.PI * edge) / nu;
  const bands = spec.dense ?? [];
  const stepAt = (r: number): number => {
    let step = wallStep;
    for (const band of bands) if (r >= band.from - step && r <= band.to + step) step = Math.min(step, band.stepMm);
    return Math.max(step, 0.05);
  };
  const heightAt = spec.heightAt ?? (() => 0);

  // кольца от центра к стенке: радиус и подъём
  const last = edge - Math.min(EDGE_GAP * wallStep + 0.05, edge * 0.1);
  const stations = spec.section ? sectionStations(spec.section, last, stepAt) : flatStations(last, stepAt);

  const coords: number[] = [];
  const tris: number[] = [];
  let next = firstVertex;
  const vertex = (x: number, y: number, lift: number): number => {
    coords.push(x, y, z0 + lift + heightAt(x, y));
    return next++;
  };

  /** кольцо радиуса r: индексы и углы вершин, первая — на угле 0 */
  const ring = (radius: number, lift: number, count: number): number[] => {
    const out: number[] = [];
    for (let k = 0; k < count; k++) {
      const a = (2 * Math.PI * k) / count;
      out.push(vertex(radius * Math.cos(a), radius * Math.sin(a), lift));
    }
    return out;
  };
  const countAt = (radius: number): number => Math.max(6, Math.ceil((2 * Math.PI * radius) / stepAt(radius)));

  // треугольник с нормалью вверх; для 'down' обход разворачиваем
  const tri = (a: number, b: number, c: number): void => {
    if (facing === 'up') tris.push(a, b, c);
    else tris.push(a, c, b);
  };

  const rings: number[][] = stations.map(({ r, z }) => ring(r, z, countAt(r)));
  const centre = vertex(0, 0, spec.section?.[0]?.z ?? 0);
  const first = rings[0];
  for (let k = 0; k < first.length; k++) tri(centre, first[k], first[(k + 1) % first.length]);
  for (let k = 0; k + 1 < rings.length; k++) zip(rings[k], rings[k + 1], tri);
  const boundary: number[] = [];
  for (let i = 0; i < nu; i++) boundary.push(ringStart + i);
  zip(rings[rings.length - 1], boundary, tri);

  return {
    positions: new Float32Array(coords),
    indices: new Uint32Array(tris),
  };
}

/** Кольца плоского дна: по радиусу, с шагом сетки в этом радиусе. */
function flatStations(last: number, stepAt: (r: number) => number): CapSectionPoint[] {
  const radii: number[] = [];
  let r = stepAt(0);
  while (r < last) {
    radii.push(r);
    r += stepAt(r);
  }
  if (radii.length === 0 || last - radii[radii.length - 1] > stepAt(last) * 0.3) radii.push(last);
  else radii[radii.length - 1] = last;
  return radii.map((radius) => ({ r: radius, z: 0 }));
}

/**
 * Кольца по сечению: по его длине, с шагом сетки в радиусе кольца, — и
 * чаще там, где сечение поворачивает: на дуге скругления кольцо ставится
 * через каждые `TURN_RAD` поворота касательной, острый угол получает своё
 * кольцо. Иначе крупный шаг сетки срезал бы ступеньку фаской. Последнее
 * кольцо — там, где сечение доходит до радиуса `last`; дальше «молния» к
 * стенке.
 */
function sectionStations(section: readonly CapSectionPoint[], last: number, stepAt: (r: number) => number): CapSectionPoint[] {
  const n = section.length;
  // длина сечения в каждой его точке и направление каждого куска
  const lengths = [0];
  const heading: number[] = [];
  for (let i = 1; i < n; i++) {
    const dr = section[i].r - section[i - 1].r;
    const dz = section[i].z - section[i - 1].z;
    lengths.push(lengths[i - 1] + Math.hypot(dr, dz));
    heading.push(Math.atan2(dz, dr));
  }
  /** кусок, в котором лежит длина s: точки seg − 1 … seg */
  const segmentAt = (s: number): number => {
    let seg = 1;
    while (seg < n - 1 && lengths[seg] <= s) seg++;
    return seg;
  };
  const at = (s: number): CapSectionPoint => {
    const seg = segmentAt(s);
    const p = section[seg - 1];
    const q = section[seg];
    const span = lengths[seg] - lengths[seg - 1];
    const t = span > 0 ? Math.min(1, Math.max(0, (s - lengths[seg - 1]) / span)) : 1;
    return { r: p.r + t * (q.r - p.r), z: p.z + t * (q.z - p.z) };
  };
  /** первая точка сечения дальше s, где касательная ушла от нынешней больше чем на TURN_RAD */
  const turnAfter = (s: number): number => {
    const seg = segmentAt(s);
    const from = heading[seg - 1];
    for (let i = seg; i < n - 1; i++) {
      let turn = Math.abs(heading[i] - from);
      if (turn > Math.PI) turn = 2 * Math.PI - turn;
      if (turn > TURN_RAD && lengths[i] > s + 1e-9) return lengths[i];
    }
    return Infinity;
  };
  // длина, на которой сечение последний раз ещё не дальше `last`
  let end = lengths[n - 1];
  for (let i = 1; i < n; i++) {
    if (section[i].r > last) {
      const p = section[i - 1];
      const q = section[i];
      const t = q.r > p.r ? (last - p.r) / (q.r - p.r) : 0;
      end = lengths[i - 1] + Math.max(0, t) * (lengths[i] - lengths[i - 1]);
      break;
    }
  }

  const out: CapSectionPoint[] = [];
  let s = 0;
  for (;;) {
    const next = Math.min(s + stepAt(at(s).r), turnAfter(s));
    if (next >= end) break;
    out.push(at(next));
    s = next;
  }
  if (out.length === 0 || end - s > stepAt(last) * 0.3) out.push(at(end));
  else out[out.length - 1] = at(end);
  return out;
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
