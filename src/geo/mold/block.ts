// Гипсовые блоки рабочей формы.
//
// Блок — это параллелепипед гипса, из которого вычтена полость: изделие,
// увеличенное на усадку, плюс литейная горловина над венчиком. Дальше блок
// рассекается по схеме, которую выбрал анализатор, и на плоскостях разъёма
// расставляются полусферические ключи: у одной части выступы, у другой —
// отвечающие им впадины.

import type { Manifold } from 'manifold-3d';
import type { CsgApi } from '../csg';
import type { CsgScope } from '../csg';
import type { MoldScheme } from './analyze';
import type { MoldState } from './state';

export interface BlockPart {
  id: string;
  label: string;
  solid: Manifold;
  /**
   * Направление, в котором эта часть снимается с изделия. По нему ванночка
   * кладёт блок рабочей поверхностью кверху.
   */
  pull: 'up' | '+y' | '-y' | 'down';
}

/** Насколько горловина и пробойник выходят за габарит блока, чтобы срез был чистым. */
const BREAKTHROUGH_MM = 2;
/** Сегментов на окружность у тел вращения оснастки. */
const SEGMENTS = 96;

export interface CavityInfo {
  solid: Manifold;
  /** верх полости вместе с горловиной (без пробойника) */
  topZ: number;
  /** наибольший радиус полости */
  maxRadius: number;
  /** низ полости */
  bottomZ: number;
}

/**
 * Устье изделия: где у тела вращения венчик и какого он радиуса, в
 * миллиметрах ДО усадки. На него ставится литейная горловина.
 *
 * Мешем это не измеряется. У чайника выше всего кончик носика, и горловина,
 * поставленная «по самой верхней точке», накрыла бы изделие шляпкой во весь
 * вынос носика — а при кончике выше венчика ещё и повисла бы над изделием
 * отдельным куском. Знает ответ только тот, кто строил силуэт.
 */
export interface Mouth {
  zMm: number;
  radiusMm: number;
}

/**
 * Полость формы: изделие, увеличенное на усадку, плюс литейная горловина.
 *
 * Горловина нужна только разъёмной форме: в одночастную шликер льют прямо в
 * открытую чашу, и лишний воротник там только мешал бы вынимать изделие.
 * Пробойник поверх горловины выводит полость за верхнюю грань блока — без
 * него срез пришёлся бы на совпадающие плоскости, а это худший вход для
 * булевой операции.
 */
export function buildCavity(
  csg: CsgApi,
  scope: CsgScope,
  vessel: Manifold,
  scheme: MoldScheme,
  mold: MoldState,
  mouth?: Mouth,
): CavityInfo {
  const shrink = 1 + mold.shrinkPct / 100;
  const scaled = scope.keep(vessel.scale(shrink));
  const box = scaled.boundingBox();
  const maxRadius = Math.max(
    Math.abs(box.min[0]), Math.abs(box.max[0]),
    Math.abs(box.min[1]), Math.abs(box.max[1]),
  );
  const spareMm = scheme === 'dropout' ? 0 : mold.spareMm;
  // блок обязан накрыть изделие целиком — в том числе носик, если его кончик
  // торчит выше венчика
  const topZ = box.max[2] + spareMm;

  // Без подсказки устье считаем по самому верху меша: для тела вращения это
  // ровно венчик и есть.
  const rimZ = Math.min(mouth ? mouth.zMm * shrink : box.max[2], box.max[2]);
  const rimRadius = mouth ? mouth.radiusMm * shrink : topRadius(scaled, box.max[2]);

  // цилиндр от венчика вверх: горловина плюс выход за грань блока
  const collarBottom = rimZ - 1;
  const collar = scope.keep(
    csg.Manifold.cylinder(topZ + BREAKTHROUGH_MM - collarBottom, rimRadius, rimRadius, SEGMENTS, false)
      .translate([0, 0, collarBottom]),
  );
  return {
    solid: scope.keep(csg.Manifold.union([scaled, collar])),
    topZ,
    maxRadius,
    bottomZ: box.min[2],
  };
}

/** Радиус изделия у самого венчика — по нему делается горловина. */
function topRadius(solid: Manifold, topZ: number): number {
  const mesh = solid.getMesh();
  const { numProp, vertProperties } = mesh;
  const count = vertProperties.length / numProp;
  const band = 2;
  let radius = 0;
  for (let v = 0; v < count; v++) {
    const z = vertProperties[v * numProp + 2];
    if (z < topZ - band) continue;
    const r = Math.hypot(vertProperties[v * numProp], vertProperties[v * numProp + 1]);
    if (r > radius) radius = r;
  }
  return Math.max(radius, 1);
}

/** Части гипсовой формы в собранном положении. */
export function buildBlockParts(
  csg: CsgApi,
  scope: CsgScope,
  cavity: CavityInfo,
  scheme: MoldScheme,
  mold: MoldState,
): BlockPart[] {
  const half = cavity.maxRadius + mold.plasterMm;
  const bottom = cavity.bottomZ - mold.plasterMm;
  const height = cavity.topZ - bottom;
  const box = scope.keep(
    csg.Manifold.cube([half * 2, half * 2, height], true)
      .translate([0, 0, bottom + height / 2]),
  );
  const block = scope.keep(box.subtract(cavity.solid));

  if (scheme === 'dropout') {
    return [{ id: 'single', label: 'Форма целиком', solid: block, pull: 'up' }];
  }

  let upper = block;
  let upperBottom = bottom;
  const parts: BlockPart[] = [];

  if (scheme === 'halves-bottom') {
    // горизонтальный рез на уровне дна изделия: ниже — отдельная плита
    const cut = splitAt(scope, block, [0, 0, 1], cavity.bottomZ);
    const inset = half * 0.72;
    const keys = sphereKeys(csg, scope, mold.keyMm, [
      [inset, inset, cavity.bottomZ],
      [-inset, inset, cavity.bottomZ],
      [inset, -inset, cavity.bottomZ],
      [-inset, -inset, cavity.bottomZ],
    ]);
    parts.push({
      id: 'bottom',
      label: 'Донная плита',
      solid: keys ? scope.keep(csg.Manifold.union([cut.negative, keys])) : cut.negative,
      pull: 'up',
    });
    upper = keys ? scope.keep(cut.positive.subtract(keys)) : cut.positive;
    upperBottom = cavity.bottomZ;
  }

  const split = splitAt(scope, upper, [0, 1, 0], 0);
  const margin = Math.max(mold.keyMm * 3, mold.plasterMm * 0.5);
  const inset = half * 0.78;
  const keys = sphereKeys(csg, scope, mold.keyMm, [
    [inset, 0, upperBottom + margin],
    [-inset, 0, upperBottom + margin],
    [inset, 0, cavity.topZ - margin],
    [-inset, 0, cavity.topZ - margin],
  ]);

  parts.unshift(
    {
      id: 'half-A',
      label: 'Половина A',
      solid: keys ? scope.keep(split.positive.subtract(keys)) : split.positive,
      pull: '+y',
    },
    {
      id: 'half-B',
      label: 'Половина B',
      solid: keys ? scope.keep(csg.Manifold.union([split.negative, keys])) : split.negative,
      pull: '-y',
    },
  );
  return parts;
}

/**
 * Полусферы, сидящие ровно на плоскости разъёма. Одной части их прибавляют,
 * у другой отнимают — выступ и впадина получаются одной и той же
 * поверхностью, поэтому совпадают точно, без подгонки допусков.
 * null означает «ключей нет»: вызывающий пропускает обе операции.
 */
function sphereKeys(
  csg: CsgApi,
  scope: CsgScope,
  radiusMm: number,
  centres: [number, number, number][],
): Manifold | null {
  if (radiusMm <= 0 || centres.length === 0) return null;
  return scope.keep(csg.Manifold.union(
    centres.map((c) => scope.keep(csg.Manifold.sphere(radiusMm, 32).translate(c))),
  ));
}

/**
 * Рассечение плоскостью с явным разбором, где какая половина: порядок,
 * в котором splitByPlane возвращает куски, — деталь реализации библиотеки,
 * а нам нужно знать сторону наверняка.
 */
export function splitAt(
  scope: CsgScope,
  solid: Manifold,
  normal: [number, number, number],
  offset: number,
): { positive: Manifold; negative: Manifold } {
  const [first, second] = solid.splitByPlane(normal, offset);
  scope.keep(first);
  scope.keep(second);
  const axis = normal[0] !== 0 ? 0 : normal[1] !== 0 ? 1 : 2;
  const sign = normal[axis] > 0 ? 1 : -1;
  const box = first.boundingBox();
  const centre = ((box.min[axis] + box.max[axis]) / 2) * sign;
  return centre > offset * sign
    ? { positive: first, negative: second }
    : { positive: second, negative: first };
}
