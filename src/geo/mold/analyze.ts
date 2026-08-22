// Анализ поднутрений и выбор схемы разъёма гипсовой формы.
//
// Форма разнимается, если каждая её часть снимается с изделия по своему
// направлению без зацепов. Проверяем это по нормалям треугольников: грань
// мешает вытяжке, если смотрит навстречу направлению снятия.
//
// Опорный факт: у тела вращения при разъёме на две вертикальные половины
// поднутрений не бывает вовсе. Нормаль такой поверхности лежит в осевой
// плоскости, её проекция на направление вытяжки равна n_r·sin θ и в своей
// половине всегда положительна. Поэтому две половины подходят всегда, а
// выбор сводится к вопросу «а нельзя ли обойтись одной частью». Ломает
// картину только рельеф, меняющийся по углу: накатка и волна вокруг оси.

import type { SurfaceMesh } from '../surface';

export type MoldScheme = 'dropout' | 'halves' | 'halves-bottom';

export type PullMode = 'up' | 'sides';

export interface MoldPart {
  id: string;
  label: string;
}

export interface MoldReport {
  scheme: MoldScheme;
  parts: MoldPart[];
  /** почему выбрана эта схема — показывается пользователю */
  reason: string;
  /** доля площади с зацепами при вытяжке вверх */
  dropoutUndercut: number;
  /** доля площади с зацепами при разъёме на половины */
  halvesUndercut: number;
  warnings: string[];
}

export interface AnalyzeOptions {
  /** ручка делает сквозное отверстие — одночастная форма исключена */
  hasHandle: boolean;
  /**
   * Приставная трубка носика (не оттянутый край: тот остаётся телом
   * вращения). Как и ручка, действует самим фактом своего существования,
   * поэтому передаётся флагом: по превью-мешу, где трубки нет, анализатор
   * её не увидел бы.
   */
  hasSpout?: boolean;
  /**
   * Рельеф меняется по углу (волна вокруг оси или по спирали, накатка).
   * Такой узор пересекает плоскость разъёма под углом, и это единственная
   * причина, по которой у тела вращения вообще появляются зацепы при
   * разъёме на половины. Знание причины превращает число в совет.
   */
  angularRelief?: boolean;
}

export interface UndercutResult {
  /** доля площади поверхности, мешающая снятию */
  fraction: number;
  /** самый глубокий зацеп: −cos угла между нормалью и вытяжкой, 0…1 */
  worst: number;
}

/** Косинус, выше которого грань считаем мешающей (запас на шум нормалей). */
const BLOCK_EPS = 1e-3;
/** Полоса под самым верхом, где горизонтальная грань — это устье, а не стенка. */
const OPENING_BAND = 0.02;
/** Полоса вдоль плоскости разъёма, где грани идут по касательной. */
const SEAM_BAND = 0.02;

/**
 * Доля площади, мешающей снятию формы.
 *
 * `up` — одночастная форма, изделие вынимается вверх. Мешает грань, которая
 * смотрит НАВЕРХ (n_z > 0): над ней лежит гипс, и он её не отпустит. Грани,
 * смотрящие вниз и наружу, наоборот, свободны — так устроена любая миска.
 * Крышка устья не в счёт: над ней формы нет, туда льют шликер.
 *
 * `sides` — две половины, каждая уходит в свою сторону по ±y. Мешает грань,
 * смотрящая от своего направления вытяжки (n·d < 0). У чистого тела вращения
 * таких не бывает; они появляются, только когда рельеф заворачивается по
 * радиусу или меняется по углу. Грани у самой плоскости разъёма исключены:
 * там нормаль почти перпендикулярна вытяжке и знак определяется шумом.
 */
export function pullUndercut(
  mesh: Pick<SurfaceMesh, 'positions' | 'indices'>,
  mode: PullMode,
): UndercutResult {
  const { positions, indices } = mesh;
  let zMin = Infinity;
  let zMax = -Infinity;
  let extent = 0;
  for (let i = 0; i < positions.length; i += 3) {
    if (positions[i + 2] < zMin) zMin = positions[i + 2];
    if (positions[i + 2] > zMax) zMax = positions[i + 2];
    extent = Math.max(extent, Math.abs(positions[i]), Math.abs(positions[i + 1]));
  }
  const openingZ = zMax - OPENING_BAND * (zMax - zMin);
  const seamY = SEAM_BAND * extent;

  let total = 0;
  let blocked = 0;
  let worst = 0;

  for (let t = 0; t < indices.length; t += 3) {
    const a = indices[t] * 3;
    const b = indices[t + 1] * 3;
    const c = indices[t + 2] * 3;
    const abx = positions[b] - positions[a];
    const aby = positions[b + 1] - positions[a + 1];
    const abz = positions[b + 2] - positions[a + 2];
    const acx = positions[c] - positions[a];
    const acy = positions[c + 1] - positions[a + 1];
    const acz = positions[c + 2] - positions[a + 2];
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;
    const area2 = Math.hypot(nx, ny, nz);
    if (area2 < 1e-18) continue;

    /** > 0 — грань мешает снятию, < 0 — свободна */
    let blocking: number;
    if (mode === 'up') {
      const up = nz / area2;
      const centroidZ = (positions[a + 2] + positions[b + 2] + positions[c + 2]) / 3;
      if (up > 0.99 && centroidZ > openingZ) continue;
      blocking = up;
    } else {
      const centroidY = (positions[a + 1] + positions[b + 1] + positions[c + 1]) / 3;
      if (Math.abs(centroidY) < seamY) continue;
      blocking = -(centroidY > 0 ? ny : -ny) / area2;
    }

    total += area2;
    if (blocking > BLOCK_EPS) {
      blocked += area2;
      worst = Math.max(worst, blocking);
    }
  }

  return { fraction: total > 0 ? blocked / total : 0, worst };
}

/** Полоса у самого дна, в пределах которой точка считается лежащей на нём. */
const FLOOR_BAND = 0.005;

/** Доля диаметра дна от наибольшего диаметра изделия. */
function baseShare(mesh: Pick<SurfaceMesh, 'positions'>): number {
  const { positions } = mesh;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (let i = 2; i < positions.length; i += 3) {
    if (positions[i] < zMin) zMin = positions[i];
    if (positions[i] > zMax) zMax = positions[i];
  }
  const floorZ = zMin + FLOOR_BAND * (zMax - zMin);
  let baseRadius = 0;
  let maxRadius = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const r = Math.hypot(positions[i], positions[i + 1]);
    if (r > maxRadius) maxRadius = r;
    if (positions[i + 2] <= floorZ && r > baseRadius) baseRadius = r;
  }
  return maxRadius > 0 ? baseRadius / maxRadius : 0;
}

/**
 * Пороги, ниже которых зацепы несущественны.
 *
 * Мелкий рельеф форма отпускает: гипс чуть подаётся, а глина при сушке
 * садится и сама отходит от стенок. Накатка глубиной 1,5 мм даёт около
 * 0,7 % площади с зацепами и отливается без хлопот. Реально запирают форму
 * либо большая площадь (глубокие кольцевые валики — 11 %), либо крутой
 * подрез (вдавленные точки на 6 мм — 3,5 % площади под 34°). Порог в 2 %
 * лежит в разрыве между этими случаями.
 */
const DROPOUT_TOLERANCE = 0.002;
const HALVES_TOLERANCE = 0.02;
/**
 * Доля диаметра дна, начиная с которой шов через дно становится проблемой:
 * широкую плоскую площадку зачищать труднее всего, и её отливают отдельно.
 */
const WIDE_BASE_SHARE = 0.55;

const HALF_A: MoldPart = { id: 'half-A', label: 'Половина A' };
const HALF_B: MoldPart = { id: 'half-B', label: 'Половина B' };
const BOTTOM: MoldPart = { id: 'bottom', label: 'Донная плита' };
const SINGLE: MoldPart = { id: 'single', label: 'Форма целиком' };

/**
 * Почему форму придётся разнимать вдоль оси. Причин три, и пользователю
 * важна именно та, которая сработала: у ручки и носика это их собственная
 * геометрия, а у голого силуэта — поднутрения, которые можно и убрать.
 */
function whyAlongAxis(options: AnalyzeOptions, dropoutFraction: number): string {
  if (options.hasHandle) {
    return 'Ручка делает в теле сквозное отверстие — вверх изделие не вынуть, нужен разъём вдоль оси.';
  }
  if (options.hasSpout) {
    return 'Приставной носик торчит вбок — вверх изделие не вынуть, нужен разъём вдоль оси.';
  }
  return `Изделие где-то шире, чем выше (${(dropoutFraction * 100).toFixed(0)} % поверхности с зацепами) — `
    + 'вверх не вынуть, нужен разъём вдоль оси.';
}

export function analyzeMold(
  mesh: Pick<SurfaceMesh, 'positions' | 'indices'>,
  options: AnalyzeOptions,
): MoldReport {
  const dropout = pullUndercut(mesh, 'up');
  const halves = pullUndercut(mesh, 'sides');
  const warnings: string[] = [];

  if (halves.fraction > HALVES_TOLERANCE) {
    const worstDeg = (Math.asin(Math.min(1, halves.worst)) * 180) / Math.PI;
    const advice = options.angularRelief
      ? 'Рельеф идёт под углом к плоскости разъёма — такую форму пришлось бы вывинчивать. ' +
        'Разверните волну по высоте (кольцевые валики форма отпускает свободно) или уменьшите глубину.'
      : 'Уменьшите глубину рельефа: при таком шаге валики заворачиваются по радиусу.';
    warnings.push(
      `Поднутрения: ${(halves.fraction * 100).toFixed(1)} % поверхности, самый крутой подрез ` +
      `${worstDeg.toFixed(0)}°. ${advice}`,
    );
  }

  if (!options.hasHandle && !options.hasSpout && dropout.fraction <= DROPOUT_TOLERANCE) {
    return {
      scheme: 'dropout',
      parts: [SINGLE],
      reason: 'Изделие нигде не шире, чем выше: вынимается вверх, форма нужна из одной части.',
      dropoutUndercut: dropout.fraction,
      halvesUndercut: halves.fraction,
      warnings,
    };
  }

  const reason = whyAlongAxis(options, dropout.fraction);

  if (baseShare(mesh) >= WIDE_BASE_SHARE) {
    return {
      scheme: 'halves-bottom',
      parts: [HALF_A, HALF_B, BOTTOM],
      reason: `${reason} Дно широкое и плоское: шов через него зачищать труднее всего, поэтому дно отливается отдельной плитой.`,
      dropoutUndercut: dropout.fraction,
      halvesUndercut: halves.fraction,
      warnings,
    };
  }

  return {
    scheme: 'halves',
    parts: [HALF_A, HALF_B],
    reason: `${reason} Дно узкое, отдельная плита не нужна.`,
    dropoutUndercut: dropout.fraction,
    halvesUndercut: halves.fraction,
    warnings,
  };
}
