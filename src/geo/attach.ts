// Общее у приставных деталей: как глубоко утопить торец в стенку.
//
// И ручка, и носик — это протяжка сечения по дуге, и оба упираются в тело
// плоским срезом поперёк своей оси. Стенка под срезом искривлена в обе
// стороны: по окружности тела и по силуэту. Поэтому фиксированного припуска
// не хватает — кромка среза вылезает наружу тонким серпом, и стык читается
// трещиной, а не вдавленным контуром.
//
// Считаем честно: обходим кромку по кольцу и топим на столько, чтобы каждая
// её точка ушла внутрь тела.

import type { ProfileDef } from './profiles';
import { profileRadius } from './profiles';

/**
 * Касательная детали в осевом сечении, единичная: наружу по радиусу и вверх
 * по высоте. Знак радиальной составляющей не важен — кромка симметрична,
 * и обход кольца всё равно проходит обе стороны.
 */
export interface AxialTangent {
  radial: number;
  up: number;
}

export interface EmbedRequest {
  profile: ProfileDef;
  heightMm: number;
  /** доля высоты, на которой деталь примыкает к стенке */
  at: number;
  tangent: AxialTangent;
  /** полуось среза в плоскости дуги, мм */
  halfDepth: number;
  /** полуось среза поперёк плоскости дуги, мм */
  halfWidth: number;
  /** припуск сверх «впритык» — на прижим, мм */
  marginMm: number;
  /** глубже этой доли радиуса стенки не топим: продавит насквозь */
  maxFraction: number;
}

/** По скольким точкам обходится кромка среза. */
const SAMPLES = 24;

/**
 * Глубина утапливания торца, мм.
 *
 * Кромка среза лежит в плоскости, перпендикулярной оси детали: точка кромки
 * смещена от центра на `cos θ` по полуоси в плоскости дуги и на `sin θ`
 * поперёк неё. Первое смещение раскладывается по радиусу и по высоте (отсюда
 * наклонная касательная), второе уходит целиком в y. Точка внутри тела, пока
 * её расстояние до оси меньше радиуса силуэта на её же высоте.
 */
export function embedDepth(request: EmbedRequest): number {
  const { profile, heightMm, at, tangent, halfDepth, halfWidth } = request;
  const wallR = profileRadius(profile, at);
  let deepest = 0;

  for (let i = 0; i < SAMPLES; i++) {
    const around = (2 * Math.PI * i) / SAMPLES;
    const alongCap = Math.cos(around) * halfDepth;
    const y = Math.sin(around) * halfWidth;
    // срез наклонён вместе с осью детали: часть смещения уходит по высоте,
    // часть — по радиусу
    const z = at * heightMm + tangent.radial * alongCap;
    const radial = -tangent.up * alongCap;
    const room = profileRadius(profile, z / heightMm);
    deepest = Math.max(deepest, wallR + radial - Math.sqrt(Math.max(0, room * room - y * y)));
  }

  const margin = request.marginMm;
  return Math.min(Math.max(deepest + margin, margin), wallR * request.maxFraction);
}
