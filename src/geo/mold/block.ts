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
/**
 * Зазор между фланцем пробки и гнездом в половинках. Нужен и физически
 * (пробку вынимают из гипса), и для булевой операции: совпадающие цилиндры —
 * худший её вход.
 */
const PLUG_GAP_MM = 0.5;
/** Тоньше этого фланец пробки ломается в руках. */
const PLUG_FLANGE_MIN_MM = 8;
/** Насколько фланец шире венчика — опора, чтобы пробка не провалилась в устье. */
const PLUG_FLANGE_OVER_MM = 10;
/** Уже этого кольцо пробки не отлить: гипс крошится. */
const PLUG_RING_MIN_MM = 1;
/** Не ближе этого фланец подходит к наружной грани блока. */
const PLUG_EDGE_MM = 3;
/** Сегментов на окружность у тел вращения оснастки. */
const SEGMENTS = 96;

/**
 * Пробка горловины — отдельная деталь формы для утопленной крышки. Кольцо
 * входит в устье до полочки, фланец сидит в гнезде половинок, сквозное
 * отверстие — литник. Гипс половинок внутрь устья не пролезает, а пробка
 * пролезает и выходит вертикально: только так и отливается полочка.
 */
export interface PlugInfo {
  /** пробка вместе с ключами-выступами */
  solid: Manifold;
  /** впадины под её ключи — вычитаются из блока */
  keys: Manifold | null;
  /** радиус гнезда в половинках (фланец плюс зазор) */
  socketMm: number;
}

export interface CavityInfo {
  solid: Manifold;
  /** пробка горловины, если крышка утоплена; литник тогда в ней */
  plug?: PlugInfo;
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
  /** радиус литника */
  radiusMm: number;
  /** утопленная крышка: горловину заменяет пробка (см. PlugInfo) */
  plug?: PlugSpec;
}

/** Что пробке нужно знать об устье, в миллиметрах ДО усадки. */
export interface PlugSpec {
  /** на сколько полочка ниже венчика — до неё входит кольцо */
  recessMm: number;
  /** радиус полости над полочкой: по нему идёт наружная стенка кольца */
  galleryMm: number;
  /** наружный радиус венчика: фланец шире него */
  rimMm: number;
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

  // Без подсказки устье считаем по самому верху меша: для тела вращения это
  // ровно венчик и есть.
  const rimZ = Math.min(mouth ? mouth.zMm * shrink : box.max[2], box.max[2]);
  const rimRadius = mouth ? mouth.radiusMm * shrink : topRadius(scaled, box.max[2]);
  const plugSpec = mouth?.plug ? plugGeometry(mouth.plug, rimRadius, shrink, maxRadius, mold) : null;

  // блок обязан накрыть изделие целиком — в том числе носик, если его кончик
  // торчит выше венчика; у пробки к тому же фланец не тоньше минимума
  const topZ = plugSpec
    ? Math.max(box.max[2] + spareMm, rimZ + PLUG_FLANGE_MIN_MM)
    : box.max[2] + spareMm;

  if (plugSpec) {
    // Гнездо вместо горловины: цилиндр от венчика вверх и насквозь. Литника в
    // половинках больше нет — он живёт в пробке.
    const socketMm = plugSpec.flangeMm + PLUG_GAP_MM;
    const socket = scope.keep(
      csg.Manifold.cylinder(topZ + BREAKTHROUGH_MM - rimZ, socketMm, socketMm, SEGMENTS, false)
        .translate([0, 0, rimZ]),
    );
    return {
      solid: scope.keep(csg.Manifold.union([scaled, socket])),
      plug: buildPlug(csg, scope, plugSpec, rimZ, topZ, mold.keyMm, socketMm),
      topZ,
      maxRadius,
      bottomZ: box.min[2],
    };
  }

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

/** Пробка в координатах формы (после усадки). */
interface PlugGeometry {
  /** радиус литника */
  holeMm: number;
  /** наружный радиус кольца */
  galleryMm: number;
  /** низ кольца — полочка */
  ringBottomMm: number;
  /** наружный радиус венчика */
  rimMm: number;
  /** наружный радиус фланца */
  flangeMm: number;
}

/**
 * Размеры пробки после усадки. null — пробку не сделать: кольцо выходит
 * тоньше минимума (галерея почти совпала с посадкой) или фланцу некуда
 * лечь внутри блока. Тогда форма остаётся прежней, с горловиной.
 */
function plugGeometry(
  spec: PlugSpec,
  holeMm: number,
  shrink: number,
  maxRadius: number,
  mold: MoldState,
): PlugGeometry | null {
  if (spec.recessMm <= 0) return null;
  const galleryMm = spec.galleryMm * shrink;
  const rimMm = spec.rimMm * shrink;
  if (galleryMm - holeMm < PLUG_RING_MIN_MM || rimMm <= galleryMm) return null;
  const edge = maxRadius + mold.plasterMm - PLUG_EDGE_MM - PLUG_GAP_MM;
  const flangeMm = Math.min(rimMm + Math.max(PLUG_FLANGE_OVER_MM, 3 * mold.keyMm), edge);
  if (flangeMm <= rimMm + 1) return null;
  return { holeMm, galleryMm, ringBottomMm: spec.recessMm * shrink, rimMm, flangeMm };
}

/**
 * Пробка — тело вращения с отверстием: контур в осевом сечении
 *
 *     кольцо    r ∈ [hole, gallery]   z ∈ [rimZ − recess, rimZ]
 *     фланец    r ∈ [hole, flange]    z ∈ [rimZ, topZ]
 *
 * Ключи — полусферы на нижней плоскости фланца, по паре на половинку и ни
 * одной на шве y = 0: выступы на пробке, впадины в половинках.
 */
function buildPlug(
  csg: CsgApi,
  scope: CsgScope,
  plug: PlugGeometry,
  rimZ: number,
  topZ: number,
  keyMm: number,
  socketMm: number,
): PlugInfo {
  const low = rimZ - plug.ringBottomMm;
  const body = scope.keep(csg.Manifold.revolve([[
    [plug.holeMm, low],
    [plug.galleryMm, low],
    [plug.galleryMm, rimZ],
    [plug.flangeMm, rimZ],
    [plug.flangeMm, topZ],
    [plug.holeMm, topZ],
  ]], SEGMENTS));
  // ключи считаем от фланца, а не от гнезда: гнездо — это фланец плюс зазор
  const keyRadius = Math.min(keyMm, (plug.flangeMm - plug.rimMm) / 2 - 0.5);
  const ring = (plug.rimMm + plug.flangeMm) / 2;
  const keys = sphereKeys(csg, scope, keyRadius, [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return [ring * Math.cos(a), ring * Math.sin(a), rimZ];
  }));
  return {
    solid: keys ? scope.keep(csg.Manifold.union([body, keys])) : body,
    keys,
    socketMm,
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
  const hollowed = scope.keep(box.subtract(cavity.solid));
  const block = cavity.plug?.keys ? scope.keep(hollowed.subtract(cavity.plug.keys)) : hollowed;
  // Пробка снимается первой и вверх; изделие уходит от неё вниз — так её
  // и кладёт ванночка: кольцом кверху.
  const plugParts: BlockPart[] = cavity.plug
    ? [{ id: 'plug', label: 'Пробка горловины', solid: cavity.plug.solid, pull: 'down' }]
    : [];

  if (scheme === 'dropout') {
    return [{ id: 'single', label: 'Форма целиком', solid: block, pull: 'up' }, ...plugParts];
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
  // Верхние ключи шва не должны попасть в гнездо пробки: ставим их между
  // гнездом и краем блока, а если места там нет — обходимся нижними.
  const topInset = cavity.plug ? (cavity.plug.socketMm + half) / 2 : inset;
  const topFits = !cavity.plug || half - cavity.plug.socketMm > 2 * mold.keyMm + 2;
  const keys = sphereKeys(csg, scope, mold.keyMm, [
    [inset, 0, upperBottom + margin],
    [-inset, 0, upperBottom + margin],
    ...(topFits ? [
      [topInset, 0, cavity.topZ - margin],
      [-topInset, 0, cavity.topZ - margin],
    ] satisfies [number, number, number][] : []),
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
  return [...parts, ...plugParts];
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
