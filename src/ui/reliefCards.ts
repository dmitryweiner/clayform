// Карточки рельефа: волна, волна волны и накатка роликом.

import type { ReliefState } from '../geo/relief';
import { AMP_MAX_MM, FREQ_MAX, SPIRAL_K_MAX } from '../geo/relief';
import type { RouletteState, RouletteBand, RoulettePattern } from '../geo/roulette';
import {
  BAND_MAX_MM, DEPTH_MAX_MM, REPEATS_MAX, GAP_MAX_MM, MAX_BANDS,
  ROULETTE_PATTERNS, defaultBand,
} from '../geo/roulette';
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
  { value: 'band', label: 'полоса' },
  { value: 'rope', label: 'верёвочка' },
  { value: 'meander', label: 'греческий меандр' },
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

/**
 * Ползунки одной полосы. Индекс захвачен в замыкании: массив полос живёт в
 * состоянии целиком, и каждая правка возвращает новый массив.
 */
function bandControls(index: number): Control<RouletteState>[] {
  const at = (s: RouletteState): RouletteBand => s.bands[index];
  const put = (s: RouletteState, band: RouletteBand): RouletteState =>
    ({ bands: s.bands.map((item, i) => (i === index ? band : item)) });

  return [
    {
      kind: 'select', key: 'pattern', label: 'Узор', options: PATTERN_OPTIONS,
      get: (s) => at(s).pattern,
      set: (s, v) => put(s, { ...at(s), pattern: pattern(v) }),
    },
    {
      kind: 'range', key: 'bandCenter', label: 'Высота пояса', min: 0, max: 1, step: 0.01,
      get: (s) => at(s).bandCenter,
      set: (s, v) => put(s, { ...at(s), bandCenter: v }),
    },
    {
      kind: 'range', key: 'bandWidth', label: 'Ширина', min: 1, max: BAND_MAX_MM, step: 1, unit: 'мм',
      get: (s) => at(s).bandWidthMm,
      set: (s, v) => put(s, { ...at(s), bandWidthMm: v }),
    },
    {
      kind: 'range', key: 'depth', label: 'Глубина', min: -DEPTH_MAX_MM, max: DEPTH_MAX_MM, step: 0.1, unit: 'мм',
      hint: '> 0 — выпуклый узор, < 0 — вдавленный',
      get: (s) => at(s).depthMm,
      set: (s, v) => put(s, { ...at(s), depthMm: v }),
    },
    {
      kind: 'range', key: 'repeats', label: 'Оттисков', min: 0, max: REPEATS_MAX, step: 1,
      hint: '0 — подобрать по размеру изделия',
      get: (s) => at(s).repeats,
      set: (s, v) => put(s, { ...at(s), repeats: v }),
    },
    {
      kind: 'range', key: 'gap', label: 'Просвет', min: 0, max: GAP_MAX_MM, step: 0.5, unit: 'мм',
      hint: 'гладкая полоска между соседними оттисками',
      get: (s) => at(s).gapMm,
      set: (s, v) => put(s, { ...at(s), gapMm: v }),
    },
    {
      kind: 'range', key: 'angle', label: 'Наклон', min: -2, max: 2, step: 0.05,
      get: (s) => at(s).angle,
      set: (s, v) => put(s, { ...at(s), angle: v }),
    },
  ];
}

// Значения приходят из <select> строками; сужаем их к типам ядра, не
// доверяя DOM. Незнакомое значение — прежнее.
function axis(value: string): ReliefState['wave']['axis'] {
  return value === 'theta' || value === 'spiral' ? value : 'z';
}

function shape(value: string): ReliefState['wave']['shape'] {
  return value === 'tri' || value === 'square' || value === 'rounded' ? value : 'sin';
}

function pattern(value: string): RoulettePattern {
  for (const candidate of ROULETTE_PATTERNS) if (value === candidate) return candidate;
  return 'rope';
}

export interface ReliefCardsHandle {
  sync(relief: ReliefState, roulette: RouletteState): void;
  /** чем подписывать каждую полосу: сколько оттисков реально ляжет за оборот */
  setBandNote(describe: (band: RouletteBand) => string): void;
}

/**
 * Список полос накатки. Полос бывает несколько: на настоящей посуде поясков
 * обычно два-три, разного рисунка и на разной высоте. Добавление и удаление
 * меняют длину массива, поэтому список пересобирается целиком; правка
 * значений внутри полосы обходится синхронизацией.
 */
function renderBandList(
  host: HTMLElement,
  read: () => RouletteState,
  onChange: (state: RouletteState) => void,
): { sync(state: RouletteState, describe: (band: RouletteBand) => string): void } {
  let rows: ReturnType<typeof renderControls<RouletteState>>[] = [];
  let notes: HTMLElement[] = [];
  let built = -1;

  const addBtn = make('button', 'tb-btn', '+ Полоса');
  addBtn.type = 'button';
  addBtn.addEventListener('click', () => {
    const bands = read().bands;
    if (bands.length >= MAX_BANDS) return;
    onChange({ bands: [...bands, { ...defaultBand(), on: true, bandCenter: nextCentre(bands) }] });
  });

  /** Новую полосу ставим туда, где ещё нет соседей. */
  function nextCentre(bands: RouletteBand[]): number {
    for (const candidate of [0.62, 0.3, 0.85, 0.46]) {
      if (bands.every((band) => Math.abs(band.bandCenter - candidate) > 0.08)) return candidate;
    }
    return 0.5;
  }

  function build(count: number): void {
    host.textContent = '';
    rows = [];
    notes = [];
    for (let index = 0; index < count; index++) {
      const box = make('div', 'band-box');
      const head = make('div', 'band-head');
      head.append(make('span', undefined, `Полоса ${index + 1}`));
      const remove = make('button', 'adj-btn band-del', '✕');
      remove.type = 'button';
      remove.title = 'Убрать полосу';
      remove.addEventListener('click', () => {
        onChange({ bands: read().bands.filter((_, i) => i !== index) });
      });
      head.append(remove);
      box.append(head);

      const controls = make('div');
      box.append(controls);
      rows.push(renderControls(controls, bandControls(index), read, onChange, `roul${index}`));

      const note = make('p', 'fcard-desc');
      box.append(note);
      notes.push(note);
      host.append(box);
    }
    host.append(addBtn);
    built = count;
  }

  return {
    sync(state, describe): void {
      if (state.bands.length !== built) build(state.bands.length);
      addBtn.hidden = state.bands.length >= MAX_BANDS;
      for (let index = 0; index < state.bands.length; index++) {
        rows[index].sync(state);
        notes[index].textContent = describe(state.bands[index]);
      }
    },
  };
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
    enabled: readRoulette().bands.some((band) => band.on),
    // Тумблер карточки — общий выключатель: полосы остаются на месте со
    // своими настройками, но перестают действовать.
    onToggle: (on) => onRoulette({ bands: readRoulette().bands.map((band) => ({ ...band, on })) }),
  });
  const bandList = renderBandList(rouletteCard.body, readRoulette, onRoulette);
  let describeBand: (band: RouletteBand) => string = () => '';

  return {
    sync(relief, roulette): void {
      waveCard.setEnabled(relief.wave.on);
      wave2Card.setEnabled(relief.wave2.on);
      rouletteCard.setEnabled(roulette.bands.some((band) => band.on));
      waveRows.sync(relief);
      wave2Rows.sync(relief);
      // в режиме плетения эти два ползунка ни на что не влияют — прячем,
      // чтобы не гадать, почему они не работают
      modulateHost.hidden = relief.wave2.mode !== 'modulate';
      modulateRows.sync(relief);
      bandList.sync(roulette, describeBand);
    },
    setBandNote(describe): void {
      describeBand = describe;
    },
  };
}
