// Ручка: протяжка овального сечения по дуге Безье.
//
// Ручка обязана лежать в плоскости разъёма формы (y = 0) — иначе двухчастная
// гипсовая форма не снимется с изделия. Одна ручка ставится со стороны x < 0
// (напротив носика), две — зеркально, как у амфоры.
//
// Касательные на концах дуги горизонтальны: ручка отходит от стенки под 90°.
// Это и самый прочный стык, и самый чистый разъём — плоскость формы проходит
// ровно вдоль дуги.

import type { SurfaceMesh } from './surface';
import type { Vec3 } from './sweep';
import { bezier, bezierTangent, sweepTube, mirrorX } from './sweep';
import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';
import type { AxialTangent } from './attach';
import { embedDepth } from './attach';

export interface HandleState {
  on: boolean;
  /** 1 — кружка, 2 — амфора (зеркально) */
  count: number;
  /** верхнее крепление, доля высоты */
  topAt: number;
  /** нижнее крепление, доля высоты */
  bottomAt: number;
  /** насколько ручка выступает за стенку, мм */
  reachMm: number;
  /** толщина сечения в плоскости разъёма, мм */
  thicknessMm: number;
  /** ширина сечения поперёк плоскости, в долях толщины */
  widthRatio: number;
  /**
   * Под каким углом дуга отходит от стенки вверху, градусы от горизонтали;
   * положительный — вверх. Ноль означает выход под прямым углом к оси: это и
   * самый прочный стык, и самый чистый разъём формы. Отклонения дают ухо,
   * лебединую шею и прочие живые формы.
   */
  topAngleDeg: number;
  /** то же для нижнего крепления */
  bottomAngleDeg: number;
}

export const REACH_MAX_MM = 120;
export const THICKNESS_MAX_MM = 40;
export const ANGLE_MAX_DEG = 75;

/**
 * Насколько концы дуги утоплены в стенку СВЕРХ того, что нужно, чтобы кромка
 * торца ушла внутрь тела: припуск на прижим.
 */
const EMBED_MM = 2.5;
/** Глубже этой доли радиуса стенки конец не топим: продавит насквозь. */
const MAX_EMBED_FRACTION = 0.6;
const SEGMENTS = 64;
const RING = 24;

export function defaultHandle(): HandleState {
  return {
    on: false,
    count: 1,
    topAt: 0.82,
    bottomAt: 0.3,
    reachMm: 28,
    thicknessMm: 11,
    widthRatio: 0.7,
    topAngleDeg: 0,
    bottomAngleDeg: 0,
  };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

export function sanitizeHandle(raw: unknown): HandleState {
  const fallback = defaultHandle();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;

  const topAt = clamp(num(source.topAt, fallback.topAt), 0.15, 0.98);
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    count: num(source.count, fallback.count) >= 2 ? 2 : 1,
    topAt,
    // ручка не может начинаться выше, чем кончается: оставляем зазор
    bottomAt: clamp(num(source.bottomAt, fallback.bottomAt), 0.02, topAt - 0.1),
    reachMm: clamp(num(source.reachMm, fallback.reachMm), 3, REACH_MAX_MM),
    thicknessMm: clamp(num(source.thicknessMm, fallback.thicknessMm), 3, THICKNESS_MAX_MM),
    widthRatio: clamp(num(source.widthRatio, fallback.widthRatio), 0.25, 3),
    topAngleDeg: clamp(num(source.topAngleDeg, fallback.topAngleDeg), -ANGLE_MAX_DEG, ANGLE_MAX_DEG),
    bottomAngleDeg: clamp(num(source.bottomAngleDeg, fallback.bottomAngleDeg), -ANGLE_MAX_DEG, ANGLE_MAX_DEG),
  };
}

/**
 * Меши ручек (одна или две). Пустой массив, если ручка выключена.
 * Каждый меш — замкнутая труба с торцами внутри тела.
 */
export function buildHandles(
  state: HandleState,
  profile: ProfileDef,
  heightMm: number,
): SurfaceMesh[] {
  if (!state.on) return [];

  const rTop = profileRadius(profile, state.topAt);
  const rBottom = profileRadius(profile, state.bottomAt);
  const halfDepth = state.thicknessMm / 2;
  const halfWidth = (state.thicknessMm * state.widthRatio) / 2;

  // Каждый конец топим по своей стенке: наверху и внизу силуэт изогнут
  // по-разному, а торцы у ручки толстые — общей глубины на двоих не хватает.
  const embed = (at: number, angleDeg: number): number => embedDepth({
    profile,
    heightMm,
    at,
    tangent: tangentOf(angleDeg),
    halfDepth,
    halfWidth,
    marginMm: EMBED_MM,
    maxFraction: MAX_EMBED_FRACTION,
  });

  const p0: Vec3 = {
    x: -(rTop - embed(state.topAt, state.topAngleDeg)),
    y: 0,
    z: state.topAt * heightMm,
  };
  const p1: Vec3 = {
    x: -(rBottom - embed(state.bottomAt, state.bottomAngleDeg)),
    y: 0,
    z: state.bottomAt * heightMm,
  };
  const push = solvePush(state, p0, p1, rTop, rBottom);
  const [c0, c1] = controlPoints(state, p0, p1, rTop, rBottom, push);
  const handle = sweepTube(
    (t) => bezier(p0, c0, c1, p1, t),
    (t) => bezierTangent(p0, c0, c1, p1, t),
    () => ({ halfDepth, halfWidth }),
    SEGMENTS,
    RING,
  );

  return state.count >= 2 ? [handle, mirrorX(handle)] : [handle];
}

/**
 * Куда смотрит ось ручки в месте крепления. Угол задан от горизонтали, и на
 * столько же наклонён плоский торец: по нему и считается, насколько глубоко
 * его прятать в стенку.
 */
function tangentOf(angleDeg: number): AxialTangent {
  const angle = (angleDeg * Math.PI) / 180;
  return { radial: Math.cos(angle), up: Math.sin(angle) };
}

/**
 * Управляющие точки дуги. Обе отнесены от креплений на push и повёрнуты на
 * заданный угол от горизонтали: касательная в начале смотрит на c0, в конце —
 * приходит от c1, поэтому углы и задают, под каким наклоном ручка отходит от
 * стенки вверху и внизу.
 */
function controlPoints(
  state: HandleState,
  p0: Vec3,
  p1: Vec3,
  rTop: number,
  rBottom: number,
  push: number,
): [Vec3, Vec3] {
  const top = (state.topAngleDeg * Math.PI) / 180;
  const bottom = (state.bottomAngleDeg * Math.PI) / 180;
  return [
    {
      x: -(rTop + push * Math.cos(top)),
      y: 0,
      z: p0.z + push * Math.sin(top),
    },
    {
      x: -(rBottom + push * Math.cos(bottom)),
      y: 0,
      z: p1.z + push * Math.sin(bottom),
    },
  ];
}

/**
 * Подбирает вынос управляющих точек так, чтобы дуга отходила от стенки ровно
 * на reachMm. Кубическая кривая отстаёт от своих управляющих точек, и на
 * сколько именно — зависит от того, насколько разнесены крепления и как
 * отличаются радиусы вверху и внизу. Считать множитель «на глаз» нельзя:
 * слайдер «вынос» тогда врёт на десятки процентов. Зависимость монотонная,
 * поэтому хватает деления пополам.
 */
function solvePush(state: HandleState, p0: Vec3, p1: Vec3, rTop: number, rBottom: number): number {
  const wall = Math.max(rTop, rBottom);
  const bulgeFor = (push: number): number => {
    const [c0, c1] = controlPoints(state, p0, p1, rTop, rBottom, push);
    let farthest = 0;
    for (let i = 0; i <= 64; i++) {
      farthest = Math.max(farthest, -bezier(p0, c0, c1, p1, i / 64).x);
    }
    return farthest - wall;
  };

  let lo = 0;
  let hi = state.reachMm * 4 + 10;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (bulgeFor(mid) < state.reachMm) lo = mid;
    else hi = mid;
  }
  return hi;
}
