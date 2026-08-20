// Параметры литейной оснастки.

export interface MoldState {
  /** усадка шликера от заливки до обжига, % — на неё увеличивают модель */
  shrinkPct: number;
  /** толщина гипса вокруг полости, мм */
  plasterMm: number;
  /** высота литейной горловины над венчиком, мм */
  spareMm: number;
  /** радиус полусферических регистрационных ключей, мм; 0 — без ключей */
  keyMm: number;
  /** толщина стенки печатной ванночки, мм */
  bathWallMm: number;
  /** слой силикона над блоком, мм */
  bathClearMm: number;
}

export const SHRINK_MAX_PCT = 30;
export const PLASTER_MAX_MM = 80;
export const SPARE_MAX_MM = 120;

export function defaultMold(): MoldState {
  return {
    shrinkPct: 12,
    plasterMm: 28,
    spareMm: 25,
    keyMm: 7,
    bathWallMm: 3,
    bathClearMm: 12,
  };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

export function sanitizeMold(raw: unknown): MoldState {
  const fallback = defaultMold();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const num = (x: unknown, d: number): number =>
    typeof x === 'number' && Number.isFinite(x) ? x : d;

  const plasterMm = clamp(num(source.plasterMm, fallback.plasterMm), 5, PLASTER_MAX_MM);
  return {
    shrinkPct: clamp(num(source.shrinkPct, fallback.shrinkPct), 0, SHRINK_MAX_PCT),
    plasterMm,
    spareMm: clamp(num(source.spareMm, fallback.spareMm), 0, SPARE_MAX_MM),
    // Ключ глубиной больше трети стенки продавил бы её насквозь: между
    // впадиной ключа и полостью изделия должен остаться живой гипс.
    keyMm: clamp(num(source.keyMm, fallback.keyMm), 0, plasterMm / 3),
    bathWallMm: clamp(num(source.bathWallMm, fallback.bathWallMm), 1.2, 12),
    bathClearMm: clamp(num(source.bathClearMm, fallback.bathClearMm), 3, 60),
  };
}
