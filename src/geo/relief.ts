// Рельеф поверхности: волна и волна волны, смещающие точку вдоль нормали.
// Глубина — в миллиметрах: «валики 3 мм» означают ровно 3 мм.
//
// Ключевое ограничение — шов. Поверхность замкнута по θ, поэтому волна,
// бегущая вокруг изделия, обязана попасть сама в себя при u = 2π. Дробное
// число гребней даёт ступеньку по шву, которую видно и на печати, и в
// гипсовой форме, — поэтому частота вокруг оси округляется до целого.

export const WAVE_SHAPES = ['sin', 'tri', 'square', 'rounded'] as const;
export type WaveShape = (typeof WAVE_SHAPES)[number];

export const WAVE_AXES = ['z', 'theta', 'spiral'] as const;
export type WaveAxis = (typeof WAVE_AXES)[number];

export interface WaveState {
  on: boolean;
  axis: WaveAxis;
  shape: WaveShape;
  /** число периодов на единицу координаты оси */
  freq: number;
  /** амплитуда вдоль нормали, мм */
  ampMm: number;
  /** сдвиг в долях периода */
  phase: number;
  /** для оси spiral: подъём в единицах координаты за оборот */
  spiralK: number;
}

export interface Wave2State {
  on: boolean;
  axis: WaveAxis;
  shape: WaveShape;
  freq: number;
  /** модуляция фазы несущей, в долях периода */
  fm: number;
  /** модуляция амплитуды несущей, 0…1 */
  am: number;
  spiralK: number;
}

export interface ZoneState {
  /** нижняя граница действия рельефа, доля высоты */
  from: number;
  to: number;
  /** ширина размытия границ, доля высоты */
  fade: number;
}

export interface ReliefState {
  wave: WaveState;
  wave2: Wave2State;
  zone: ZoneState;
}

const TAU = Math.PI * 2;
const SQUARE_SOFT = 4; // крутизна сглаженного меандра
const SQUARE_NORM = Math.tanh(SQUARE_SOFT);

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const frac = (x: number): number => x - Math.floor(x);

/**
 * Периодическая форма волны, период 1, значения в [-1, 1].
 * Все формы нечётные: 0 в начале периода, +1 на четверти, −1 на трёх
 * четвертях — так переключение формы не сдвигает рисунок.
 */
export function waveform(shape: WaveShape, turns: number): number {
  const q = frac(turns);
  switch (shape) {
    case 'sin':
      return Math.sin(TAU * q);
    case 'tri':
      if (q < 0.25) return 4 * q;
      if (q < 0.75) return 2 - 4 * q;
      return 4 * q - 4;
    case 'square':
      // меандр со сглаженным фронтом: печатать вертикальную стенку всё
      // равно нельзя, а разрыв производной ломает нормали
      return Math.tanh(SQUARE_SOFT * Math.sin(TAU * q)) / SQUARE_NORM;
    case 'rounded': {
      // полукруглые валики: выпуклый и вогнутый полуцилиндры за период
      const half = q < 0.5 ? q : q - 0.5;
      const arc = Math.sqrt(Math.max(0, 1 - (4 * half - 1) * (4 * half - 1)));
      return q < 0.5 ? arc : -arc;
    }
  }
}

/** Координата, вдоль которой бежит волна: высота, угол или спираль. */
export function axisCoord(axis: WaveAxis, u: number, v: number, spiralK: number): number {
  switch (axis) {
    case 'z':
      return v;
    case 'theta':
      return u / TAU;
    case 'spiral':
      return v + (spiralK * u) / TAU;
  }
}

function smoothstep(x: number): number {
  const q = clamp(x, 0, 1);
  return q * q * (3 - 2 * q);
}

/** Вес рельефа на высоте v: 1 внутри зоны, 0 снаружи, плавные края. */
export function zoneWeight(zone: ZoneState, v: number): number {
  const fade = Math.max(zone.fade, 1e-6);
  return smoothstep((v - zone.from) / fade) * smoothstep((zone.to - v) / fade);
}

/** Смещение вдоль нормали в точке (u, v), мм. */
export function reliefDepth(relief: ReliefState, u: number, v: number): number {
  const { wave, wave2 } = relief;
  if (!wave.on || wave.ampMm === 0) return 0;

  let phase = wave.phase;
  let amp = wave.ampMm;
  if (wave2.on) {
    const inner = waveform(wave2.shape, wave2.freq * axisCoord(wave2.axis, u, v, wave2.spiralK));
    phase += wave2.fm * inner;
    // множитель не уходит в минус: иначе валики местами выворачивались бы
    // в канавки, а рисунок рвался бы на границе смены знака
    amp *= Math.max(0, 1 + wave2.am * inner);
  }
  const carrier = waveform(wave.shape, wave.freq * axisCoord(wave.axis, u, v, wave.spiralK) + phase);
  return amp * carrier * zoneWeight(relief.zone, v);
}

// --- дефолты и санация ---

export function defaultRelief(): ReliefState {
  return {
    wave: { on: false, axis: 'z', shape: 'rounded', freq: 12, ampMm: 2, phase: 0, spiralK: 1 },
    wave2: { on: false, axis: 'theta', shape: 'sin', freq: 6, fm: 0.2, am: 0.5, spiralK: 1 },
    zone: { from: 0.08, to: 0.95, fade: 0.06 },
  };
}

function asRecord(x: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (typeof x === 'object' && x !== null) {
    for (const [key, value] of Object.entries(x)) out[key] = value;
  }
  return out;
}

const num = (x: unknown, fallback: number): number =>
  typeof x === 'number' && Number.isFinite(x) ? x : fallback;

const bool = (x: unknown, fallback: boolean): boolean => (typeof x === 'boolean' ? x : fallback);

function shapeOf(x: unknown, fallback: WaveShape): WaveShape {
  for (const shape of WAVE_SHAPES) if (x === shape) return shape;
  return fallback;
}

function axisOf(x: unknown, fallback: WaveAxis): WaveAxis {
  for (const axis of WAVE_AXES) if (x === axis) return axis;
  return fallback;
}

export const FREQ_MAX = 64;
export const AMP_MAX_MM = 20;
export const SPIRAL_K_MAX = 12;

/**
 * Частота вдоль оси, замкнутой по θ, обязана быть целой — иначе рисунок не
 * сходится по шву. Для оси z ограничения нет.
 */
function wrapSafeFreq(axis: WaveAxis, freq: number): number {
  const bounded = clamp(freq, 0, FREQ_MAX);
  return axis === 'z' ? bounded : Math.round(bounded);
}

export function sanitizeRelief(raw: unknown): ReliefState {
  const source = asRecord(raw);
  const fallback = defaultRelief();

  const waveSrc = asRecord(source.wave);
  const waveAxis = axisOf(waveSrc.axis, fallback.wave.axis);
  const waveSpiralK = Math.round(clamp(num(waveSrc.spiralK, fallback.wave.spiralK), -SPIRAL_K_MAX, SPIRAL_K_MAX));
  const wave: WaveState = {
    on: bool(waveSrc.on, fallback.wave.on),
    axis: waveAxis,
    shape: shapeOf(waveSrc.shape, fallback.wave.shape),
    freq: wrapSafeFreq(waveAxis, num(waveSrc.freq, fallback.wave.freq)),
    ampMm: clamp(num(waveSrc.ampMm, fallback.wave.ampMm), -AMP_MAX_MM, AMP_MAX_MM),
    phase: clamp(num(waveSrc.phase, fallback.wave.phase), -1, 1),
    spiralK: waveSpiralK,
  };

  const wave2Src = asRecord(source.wave2);
  const wave2Axis = axisOf(wave2Src.axis, fallback.wave2.axis);
  const wave2SpiralK = Math.round(clamp(num(wave2Src.spiralK, fallback.wave2.spiralK), -SPIRAL_K_MAX, SPIRAL_K_MAX));
  const wave2: Wave2State = {
    on: bool(wave2Src.on, fallback.wave2.on),
    axis: wave2Axis,
    shape: shapeOf(wave2Src.shape, fallback.wave2.shape),
    freq: wrapSafeFreq(wave2Axis, num(wave2Src.freq, fallback.wave2.freq)),
    fm: clamp(num(wave2Src.fm, fallback.wave2.fm), -1, 1),
    am: clamp(num(wave2Src.am, fallback.wave2.am), 0, 1),
    spiralK: wave2SpiralK,
  };

  const zoneSrc = asRecord(source.zone);
  const from = clamp(num(zoneSrc.from, fallback.zone.from), 0, 1);
  const to = clamp(num(zoneSrc.to, fallback.zone.to), 0, 1);
  const zone: ZoneState = {
    from: Math.min(from, to),
    to: Math.max(from, to),
    fade: clamp(num(zoneSrc.fade, fallback.zone.fade), 0, 0.5),
  };

  return { wave, wave2, zone };
}
