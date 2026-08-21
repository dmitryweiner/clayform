// Карточки рельефа: волна, волна волны и накатка роликом.

import type { ReliefState } from '../geo/relief';
import { AMP_MAX_MM, FREQ_MAX, SPIRAL_K_MAX } from '../geo/relief';
import type { RouletteState } from '../geo/roulette';
import { BAND_MAX_MM, DEPTH_MAX_MM, REPEATS_MAX } from '../geo/roulette';
import type { Control } from './controls';
import { renderControls } from './controls';
import { createCard } from './card';
import { make } from './dom';

const AXIS_OPTIONS = [
  { value: 'z', label: 'по высоте' },
  { value: 'theta', label: 'вокруг оси' },
  { value: 'spiral', label: 'по спирали' },
];

const SHAPE_OPTIONS = [
  { value: 'sin', label: 'синус' },
  { value: 'tri', label: 'треугольник' },
  { value: 'square', label: 'меандр' },
  { value: 'rounded', label: 'валики' },
];

const PATTERN_OPTIONS = [
  { value: 'rope', label: 'верёвочка' },
  { value: 'zigzag', label: 'зигзаг' },
  { value: 'dots', label: 'точки' },
  { value: 'diamonds', label: 'ромбы' },
  { value: 'dashes', label: 'насечки' },
  { value: 'lattice', label: 'сетка' },
];

const MODE_OPTIONS = [
  { value: 'weave', label: 'плетение (w₁ × w₂)' },
  { value: 'modulate', label: 'модуляция (w₂ гнёт w₁)' },
];

const SPIRAL_HINT = 'работает при оси «по спирали»';

const WAVE_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'select', key: 'axis', label: 'Куда бежит', options: AXIS_OPTIONS,
    get: (s) => s.wave.axis,
    set: (s, v) => ({ ...s, wave: { ...s.wave, axis: axis(v) } }),
  },
  {
    kind: 'select', key: 'shape', label: 'Форма', options: SHAPE_OPTIONS,
    get: (s) => s.wave.shape,
    set: (s, v) => ({ ...s, wave: { ...s.wave, shape: shape(v) } }),
  },
  {
    kind: 'range', key: 'freq', label: 'Гребней', min: 0, max: FREQ_MAX, step: 1,
    get: (s) => s.wave.freq,
    set: (s, v) => ({ ...s, wave: { ...s.wave, freq: v } }),
  },
  {
    kind: 'range', key: 'amp', label: 'Глубина', min: -AMP_MAX_MM, max: AMP_MAX_MM, step: 0.1, unit: 'мм',
    get: (s) => s.wave.ampMm,
    set: (s, v) => ({ ...s, wave: { ...s.wave, ampMm: v } }),
  },
  {
    kind: 'range', key: 'phase', label: 'Фаза', min: -1, max: 1, step: 0.01,
    get: (s) => s.wave.phase,
    set: (s, v) => ({ ...s, wave: { ...s.wave, phase: v } }),
  },
  {
    kind: 'range', key: 'spiralK', label: 'Шаг спирали', min: -SPIRAL_K_MAX, max: SPIRAL_K_MAX, step: 0.05,
    hint: SPIRAL_HINT,
    get: (s) => s.wave.spiralK,
    set: (s, v) => ({ ...s, wave: { ...s.wave, spiralK: v } }),
  },
  {
    kind: 'range', key: 'zoneFrom', label: 'Зона снизу', min: 0, max: 1, step: 0.01,
    hint: 'ниже этой доли высоты рельефа нет',
    get: (s) => s.zone.from,
    set: (s, v) => ({ ...s, zone: { ...s.zone, from: v } }),
  },
  {
    kind: 'range', key: 'zoneTo', label: 'Зона сверху', min: 0, max: 1, step: 0.01,
    get: (s) => s.zone.to,
    set: (s, v) => ({ ...s, zone: { ...s.zone, to: v } }),
  },
  {
    kind: 'range', key: 'zoneFade', label: 'Растушёвка', min: 0, max: 0.5, step: 0.01,
    get: (s) => s.zone.fade,
    set: (s, v) => ({ ...s, zone: { ...s.zone, fade: v } }),
  },
];

const WAVE2_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'select', key: 'mode', label: 'Как связаны', options: MODE_OPTIONS,
    hint: 'плетение — простое произведение волн: корзинка, вафля',
    get: (s) => s.wave2.mode,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, mode: v === 'modulate' ? 'modulate' : 'weave' } }),
  },
  {
    kind: 'select', key: 'axis2', label: 'Куда бежит', options: AXIS_OPTIONS,
    get: (s) => s.wave2.axis,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, axis: axis(v) } }),
  },
  {
    kind: 'select', key: 'shape2', label: 'Форма', options: SHAPE_OPTIONS,
    get: (s) => s.wave2.shape,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, shape: shape(v) } }),
  },
  {
    kind: 'range', key: 'freq2', label: 'Гребней', min: 0, max: FREQ_MAX, step: 1,
    get: (s) => s.wave2.freq,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, freq: v } }),
  },
  {
    kind: 'range', key: 'phase2', label: 'Фаза', min: -1, max: 1, step: 0.01,
    get: (s) => s.wave2.phase,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, phase: v } }),
  },
  {
    kind: 'range', key: 'spiralK2', label: 'Шаг спирали', min: -SPIRAL_K_MAX, max: SPIRAL_K_MAX, step: 0.05,
    hint: SPIRAL_HINT,
    get: (s) => s.wave2.spiralK,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, spiralK: v } }),
  },
];

/** Ползунки, которые работают только в режиме модуляции. */
const MODULATE_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'range', key: 'fm', label: 'Гнёт фазу', min: -1, max: 1, step: 0.01,
    hint: 'вторая волна сдвигает гребни первой',
    get: (s) => s.wave2.fm,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, fm: v } }),
  },
  {
    kind: 'range', key: 'am', label: 'Гнёт глубину', min: 0, max: 1, step: 0.01,
    hint: 'вторая волна то усиливает, то гасит первую',
    get: (s) => s.wave2.am,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, am: v } }),
  },
];

const ROULETTE_CONTROLS: Control<RouletteState>[] = [
  {
    kind: 'select', key: 'pattern', label: 'Узор', options: PATTERN_OPTIONS,
    get: (s) => s.pattern,
    set: (s, v) => ({ ...s, pattern: pattern(v) }),
  },
  {
    kind: 'range', key: 'bandCenter', label: 'Высота пояса', min: 0, max: 1, step: 0.01,
    get: (s) => s.bandCenter,
    set: (s, v) => ({ ...s, bandCenter: v }),
  },
  {
    kind: 'range', key: 'bandWidth', label: 'Ширина', min: 1, max: BAND_MAX_MM, step: 1, unit: 'мм',
    get: (s) => s.bandWidthMm,
    set: (s, v) => ({ ...s, bandWidthMm: v }),
  },
  {
    kind: 'range', key: 'depth', label: 'Глубина', min: -DEPTH_MAX_MM, max: DEPTH_MAX_MM, step: 0.1, unit: 'мм',
    hint: '> 0 — выпуклый узор, < 0 — вдавленный',
    get: (s) => s.depthMm,
    set: (s, v) => ({ ...s, depthMm: v }),
  },
  {
    kind: 'range', key: 'repeats', label: 'Оттисков', min: 0, max: REPEATS_MAX, step: 1,
    hint: '0 — подобрать по размеру изделия',
    get: (s) => s.repeats,
    set: (s, v) => ({ ...s, repeats: v }),
  },
  {
    kind: 'range', key: 'angle', label: 'Наклон', min: -2, max: 2, step: 0.05,
    get: (s) => s.angle,
    set: (s, v) => ({ ...s, angle: v }),
  },
];

// Значения приходят из <select> строками; сужаем их к типам ядра, не
// доверяя DOM. Незнакомое значение — прежнее.
function axis(value: string): ReliefState['wave']['axis'] {
  return value === 'theta' || value === 'spiral' ? value : 'z';
}

function shape(value: string): ReliefState['wave']['shape'] {
  return value === 'tri' || value === 'square' || value === 'rounded' ? value : 'sin';
}

function pattern(value: string): RouletteState['pattern'] {
  switch (value) {
    case 'zigzag':
    case 'dots':
    case 'diamonds':
    case 'dashes':
    case 'lattice':
      return value;
    default:
      return 'rope';
  }
}

export interface ReliefCardsHandle {
  sync(relief: ReliefState, roulette: RouletteState): void;
  /** подпись под накаткой: сколько оттисков реально ляжет за оборот */
  setRepeatsNote(text: string): void;
}

export function renderReliefCards(
  container: HTMLElement,
  readRelief: () => ReliefState,
  readRoulette: () => RouletteState,
  onRelief: (relief: ReliefState) => void,
  onRoulette: (roulette: RouletteState) => void,
): ReliefCardsHandle {
  container.textContent = '';

  const waveCard = createCard(container, {
    id: 'wave',
    title: 'Волна',
    desc: 'Смещает поверхность вдоль нормали. Глубина — в миллиметрах.',
    enabled: readRelief().wave.on,
    onToggle: (on) => onRelief({ ...readRelief(), wave: { ...readRelief().wave, on } }),
  });
  const waveRows = renderControls(waveCard.body, WAVE_CONTROLS, readRelief, onRelief, 'wave');

  const wave2Card = createCard(container, {
    id: 'wave2',
    title: 'Волна волны',
    tag: '2-й порядок',
    desc: 'Плетение — произведение двух волн: корзинка, вафля. Модуляция — вторая волна гнёт первую.',
    enabled: readRelief().wave2.on,
    onToggle: (on) => onRelief({ ...readRelief(), wave2: { ...readRelief().wave2, on } }),
  });
  const wave2Rows = renderControls(wave2Card.body, WAVE2_CONTROLS, readRelief, onRelief, 'wave2');
  const modulateHost = make('div');
  wave2Card.body.append(modulateHost);
  const modulateRows = renderControls(modulateHost, MODULATE_CONTROLS, readRelief, onRelief, 'wave2');

  const rouletteCard = createCard(container, {
    id: 'roulette',
    title: 'Накатка роликом',
    desc: 'Колесо-штамп прокатывается по пояску. За оборот всегда укладывается целое число оттисков.',
    enabled: readRoulette().on,
    onToggle: (on) => onRoulette({ ...readRoulette(), on }),
  });
  const rouletteRows = renderControls(rouletteCard.body, ROULETTE_CONTROLS, readRoulette, onRoulette, 'roul');
  const repeatsNote = make('p', 'fcard-desc');
  rouletteCard.body.append(repeatsNote);

  return {
    sync(relief, roulette): void {
      waveCard.setEnabled(relief.wave.on);
      wave2Card.setEnabled(relief.wave2.on);
      rouletteCard.setEnabled(roulette.on);
      waveRows.sync(relief);
      wave2Rows.sync(relief);
      // в режиме плетения эти два ползунка ни на что не влияют — прячем,
      // чтобы не гадать, почему они не работают
      modulateHost.hidden = relief.wave2.mode !== 'modulate';
      modulateRows.sync(relief);
      rouletteRows.sync(roulette);
    },
    setRepeatsNote(text: string): void {
      repeatsNote.textContent = text;
    },
  };
}
