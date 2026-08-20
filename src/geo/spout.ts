// Носик-слив: вытянутый наружу венчик, как у крынки или кувшина.
//
// Это деформация стенки, а не приставная деталь: гончар оттягивает край
// пальцем, и глина уходит наружу без шва. CSG здесь не нужен, а форма
// остаётся телом вращения с локальным вытягом — двухчастная гипсовая форма
// снимается с неё так же легко, как с гладкой.
//
// Носик всегда смотрит в +x, то есть лежит в плоскости разъёма напротив
// ручки. Смещение идёт только наружу: так стенка полого изделия в месте
// слива может стать толще, но никогда — тоньше.

export interface SpoutState {
  on: boolean;
  /** насколько край вытянут наружу, мм */
  pullMm: number;
  /** угловая ширина слива, градусы */
  widthDeg: number;
  /** по какой доле высоты сверху идёт вытяг */
  zone: number;
}

export const PULL_MAX_MM = 60;

export function defaultSpout(): SpoutState {
  return { on: false, pullMm: 14, widthDeg: 60, zone: 0.18 };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

export function sanitizeSpout(raw: unknown): SpoutState {
  const fallback = defaultSpout();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    pullMm: clamp(num(source.pullMm, fallback.pullMm), 0, PULL_MAX_MM),
    widthDeg: clamp(num(source.widthDeg, fallback.widthDeg), 15, 180),
    zone: clamp(num(source.zone, fallback.zone), 0.03, 0.6),
  };
}

function smoothstep(x: number): number {
  const q = clamp(x, 0, 1);
  return q * q * (3 - 2 * q);
}

/**
 * Радиальное смещение наружу в точке (u, v), мм.
 *
 * Центр слива приходится ровно на шов u = 0 / 2π, поэтому окно считается от
 * ЗАМКНУТОГО углового расстояния: у косинусного горба в вершине нулевая
 * производная, и через шов носик проходит гладко.
 */
export function makeSpout(state: SpoutState): (u: number, v: number) => number {
  if (!state.on || state.pullMm === 0) return () => 0;
  const halfWidth = (state.widthDeg * Math.PI) / 360;
  const zoneStart = 1 - state.zone;

  return (u, v) => {
    if (v <= zoneStart) return 0;
    const angle = Math.abs(((u + Math.PI) % (2 * Math.PI)) - Math.PI);
    if (angle >= halfWidth) return 0;
    const across = 0.5 * (1 + Math.cos((Math.PI * angle) / halfWidth));
    return state.pullMm * across * smoothstep((v - zoneStart) / state.zone);
  };
}
