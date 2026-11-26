// Карточки рельефа: волна (со второй волной подблоком и готовыми узорами)
// и накатка роликом.

import type { ReliefState } from '../geo/relief';
import { AMP_MAX_MM, FREQ_MAX, SPIRAL_K_MAX, WAVE_SHAPES } from '../geo/relief';
import type { WavePresetId } from '../geo/wavePresets';
import { WAVE_PRESETS, applyWavePreset, wavePresetOf } from '../geo/wavePresets';
import type { RouletteState, RouletteBand, RoulettePattern, MeanderKind } from '../geo/roulette';
import {
  BAND_MAX_MM,
  DEPTH_MAX_MM,
  GAP_MAX_MM,
  MAX_BANDS,
  ROULETTE_PATTERNS,
  MEANDER_KINDS,
  defaultBand,
  isContinuous,
} from '../geo/roulette';
import { createCard } from 'maker-kit/ui/card';
import { make } from 'maker-kit/ui/dom';
import { renderItemList } from 'maker-kit/ui/listCard';
import type { Change, Control, ControlsHandle, SelectOption } from './controls';
import { renderControls } from './controls';
import type { Key } from '../i18n';
import { t } from '../i18n';

const AXIS_OPTIONS: SelectOption[] = [
  { value: 'z', label: 'axis.z' },
  { value: 'theta', label: 'axis.theta' },
  { value: 'spiral', label: 'axis.spiral' },
];

const SHAPE_OPTIONS: SelectOption[] = [
  { value: 'sin', label: 'shape.sin' },
  { value: 'tri', label: 'shape.tri' },
  { value: 'square', label: 'shape.square' },
  { value: 'rounded', label: 'shape.rounded' },
  { value: 'thread', label: 'shape.thread' },
];

/**
 * Готовые узоры. «Своя» — не выбор, а подпись: так список выглядит, когда
 * числа волн ни с одним узором не совпадают; выбрать её нельзя.
 */
const PRESET_LABELS: Record<WavePresetId, Key> = {
  ripple: 'wavePreset.ripple',
  flow: 'wavePreset.flow',
  basket: 'wavePreset.basket',
  flame: 'wavePreset.flame',
  swirl: 'wavePreset.swirl',
};

const PRESET_OPTIONS: SelectOption[] = [
  { value: '', label: 'wavePreset.custom' },
  ...WAVE_PRESETS.map((preset): SelectOption => ({ value: preset.id, label: PRESET_LABELS[preset.id] })),
];

const WAVE_PRESET_ROW: Control<ReliefState>[] = [
  {
    kind: 'select',
    key: 'preset',
    label: 'wavePreset.label',
    hint: 'wavePreset.hint',
    options: PRESET_OPTIONS,
    optionDisabled: (_, value) => value === '',
    get: (s) => wavePresetOf(s),
    set: (s, v) => applyWavePreset(s, v),
  },
];

const PATTERN_OPTIONS: SelectOption[] = [
  { value: 'band', label: 'pattern.band' },
  { value: 'rope', label: 'pattern.rope' },
  { value: 'meander', label: 'pattern.meander' },
  { value: 'zigzag', label: 'pattern.zigzag' },
  { value: 'dots', label: 'pattern.dots' },
  { value: 'diamonds', label: 'pattern.diamonds' },
  { value: 'dashes', label: 'pattern.dashes' },
  { value: 'lattice', label: 'pattern.lattice' },
  { value: 'image', label: 'pattern.image' },
];

/** Виды меандра — с references/meander-variants.png. */
const MEANDER_OPTIONS: SelectOption[] = [
  { value: 'classic', label: 'meander.classic' },
  { value: 'framed', label: 'meander.framed' },
  { value: 'spiral', label: 'meander.spiral' },
  { value: 'hooks', label: 'meander.hooks' },
  { value: 'tee', label: 'meander.tee' },
  { value: 'wave', label: 'meander.wave' },
];

const MODE_OPTIONS: SelectOption[] = [
  { value: 'weave', label: 'mode.weave' },
  { value: 'modulate', label: 'mode.modulate' },
];

const WAVE_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.wave.on,
    set: (s, v) => ({ ...s, wave: { ...s.wave, on: v } }),
  },
  {
    kind: 'check',
    key: 'onLid',
    label: 'ctl.onLid',
    hint: 'wave.onLid.hint',
    get: (s) => s.wave.onLid,
    set: (s, v) => ({ ...s, wave: { ...s.wave, onLid: v } }),
  },
  {
    kind: 'select',
    key: 'axis',
    label: 'ctl.axis',
    options: AXIS_OPTIONS,
    get: (s) => s.wave.axis,
    set: (s, v) => ({ ...s, wave: { ...s.wave, axis: axis(v) } }),
  },
  {
    kind: 'select',
    key: 'shape',
    label: 'ctl.shape',
    options: SHAPE_OPTIONS,
    get: (s) => s.wave.shape,
    set: (s, v) => ({ ...s, wave: { ...s.wave, shape: shape(v) } }),
  },
  {
    kind: 'range',
    key: 'freq',
    label: 'ctl.freq',
    min: 0,
    max: FREQ_MAX,
    step: 1,
    get: (s) => s.wave.freq,
    set: (s, v) => ({ ...s, wave: { ...s.wave, freq: v } }),
  },
  {
    kind: 'range',
    key: 'amp',
    label: 'ctl.depth',
    min: -AMP_MAX_MM,
    max: AMP_MAX_MM,
    step: 0.1,
    get: (s) => s.wave.ampMm,
    set: (s, v) => ({ ...s, wave: { ...s.wave, ampMm: v } }),
  },
  {
    kind: 'range',
    key: 'phase',
    label: 'ctl.phase',
    min: -1,
    max: 1,
    step: 0.01,
    get: (s) => s.wave.phase,
    set: (s, v) => ({ ...s, wave: { ...s.wave, phase: v } }),
  },
  {
    kind: 'range',
    key: 'spiralK',
    label: 'ctl.spiralK',
    min: -SPIRAL_K_MAX,
    max: SPIRAL_K_MAX,
    step: 0.05,
    hint: 'ctl.spiralK.hint',
    get: (s) => s.wave.spiralK,
    set: (s, v) => ({ ...s, wave: { ...s.wave, spiralK: v } }),
  },
  {
    kind: 'range',
    key: 'zoneFrom',
    label: 'wave.zoneFrom',
    min: 0,
    max: 1,
    step: 0.01,
    hint: 'wave.zoneFrom.hint',
    get: (s) => s.zone.from,
    set: (s, v) => ({ ...s, zone: { ...s.zone, from: v } }),
  },
  {
    kind: 'range',
    key: 'zoneTo',
    label: 'wave.zoneTo',
    min: 0,
    max: 1,
    step: 0.01,
    get: (s) => s.zone.to,
    set: (s, v) => ({ ...s, zone: { ...s.zone, to: v } }),
  },
  {
    kind: 'range',
    key: 'zoneFade',
    label: 'wave.zoneFade',
    min: 0,
    max: 0.5,
    step: 0.01,
    get: (s) => s.zone.fade,
    set: (s, v) => ({ ...s, zone: { ...s.zone, fade: v } }),
  },
];

const WAVE2_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.wave2.on,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, on: v } }),
  },
  {
    kind: 'check',
    key: 'onLid',
    label: 'ctl.onLid',
    hint: 'wave2.onLid.hint',
    get: (s) => s.wave2.onLid,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, onLid: v } }),
  },
  {
    kind: 'select',
    key: 'mode',
    label: 'wave2.mode',
    options: MODE_OPTIONS,
    hint: 'wave2.mode.hint',
    get: (s) => s.wave2.mode,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, mode: v === 'modulate' ? 'modulate' : 'weave' } }),
  },
  {
    kind: 'select',
    key: 'axis2',
    label: 'ctl.axis',
    options: AXIS_OPTIONS,
    get: (s) => s.wave2.axis,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, axis: axis(v) } }),
  },
  {
    kind: 'select',
    key: 'shape2',
    label: 'ctl.shape',
    options: SHAPE_OPTIONS,
    get: (s) => s.wave2.shape,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, shape: shape(v) } }),
  },
  {
    kind: 'range',
    key: 'freq2',
    label: 'ctl.freq',
    min: 0,
    max: FREQ_MAX,
    step: 1,
    get: (s) => s.wave2.freq,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, freq: v } }),
  },
  {
    kind: 'range',
    key: 'phase2',
    label: 'ctl.phase',
    min: -1,
    max: 1,
    step: 0.01,
    get: (s) => s.wave2.phase,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, phase: v } }),
  },
  {
    kind: 'range',
    key: 'spiralK2',
    label: 'ctl.spiralK',
    min: -SPIRAL_K_MAX,
    max: SPIRAL_K_MAX,
    step: 0.05,
    hint: 'ctl.spiralK.hint',
    get: (s) => s.wave2.spiralK,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, spiralK: v } }),
  },
];

/**
 * «Включено» у накатки — общий выключатель: полосы остаются на месте со
 * своими настройками, но перестают действовать.
 */
const ROULETTE_ON: Control<RouletteState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.bands.some((band) => band.on),
    set: (s, v) => ({ bands: s.bands.map((band) => ({ ...band, on: v })) }),
  },
];

/** Ползунки, которые работают только в режиме модуляции. */
const MODULATE_CONTROLS: Control<ReliefState>[] = [
  {
    kind: 'range',
    key: 'fm',
    label: 'wave2.fm',
    min: -1,
    max: 1,
    step: 0.01,
    hint: 'wave2.fm.hint',
    get: (s) => s.wave2.fm,
    set: (s, v) => ({ ...s, wave2: { ...s.wave2, fm: v } }),
  },
  {
    kind: 'range',
    key: 'am',
    label: 'wave2.am',
    min: 0,
    max: 1,
    step: 0.01,
    hint: 'wave2.am.hint',
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
  const put = (s: RouletteState, band: RouletteBand): RouletteState => ({ bands: s.bands.map((item, i) => (i === index ? band : item)) });

  return [
    {
      kind: 'select',
      key: 'pattern',
      label: 'band.pattern',
      options: PATTERN_OPTIONS,
      get: (s) => at(s).pattern,
      set: (s, v) => put(s, { ...at(s), pattern: pattern(v) }),
    },
    {
      kind: 'select',
      key: 'meander',
      label: 'band.meander',
      options: MEANDER_OPTIONS,
      hint: 'band.meander.hint',
      when: (s) => at(s).pattern === 'meander',
      get: (s) => at(s).meander,
      set: (s, v) => put(s, { ...at(s), meander: meanderKind(v) }),
    },
    {
      kind: 'range',
      key: 'bandCenter',
      label: 'band.center',
      min: 0,
      max: 1,
      step: 0.01,
      get: (s) => at(s).bandCenter,
      set: (s, v) => put(s, { ...at(s), bandCenter: v }),
    },
    {
      kind: 'range',
      key: 'bandWidth',
      label: 'ctl.width',
      min: 1,
      max: BAND_MAX_MM,
      step: 1,
      get: (s) => at(s).bandWidthMm,
      set: (s, v) => put(s, { ...at(s), bandWidthMm: v }),
    },
    {
      kind: 'range',
      key: 'depth',
      label: 'ctl.depth',
      min: -DEPTH_MAX_MM,
      max: DEPTH_MAX_MM,
      step: 0.1,
      hint: 'band.depth.hint',
      get: (s) => at(s).depthMm,
      set: (s, v) => put(s, { ...at(s), depthMm: v }),
    },
    {
      kind: 'range',
      key: 'gap',
      label: 'band.gap',
      min: 0,
      max: GAP_MAX_MM,
      step: 0.5,
      hint: 'band.gap.hint',
      // у непрерывной ленты оттисков нет — и просвета между ними тоже
      when: (s) => !isContinuous(at(s).pattern),
      get: (s) => at(s).gapMm,
      set: (s, v) => put(s, { ...at(s), gapMm: v }),
    },
    {
      kind: 'range',
      key: 'angle',
      label: 'band.angle',
      min: -2,
      max: 2,
      step: 0.05,
      get: (s) => at(s).angle,
      set: (s, v) => put(s, { ...at(s), angle: v }),
    },
    {
      kind: 'image',
      key: 'image',
      label: 'band.image',
      hint: 'band.image.hint',
      when: (s) => at(s).pattern === 'image',
      get: (s) => at(s).image,
      // инверсия переживает смену картинки
      set: (s, image) => put(s, { ...at(s), image: { ...image, invert: at(s).image?.invert ?? false } }),
    },
    {
      kind: 'check',
      key: 'invert',
      label: 'band.invert',
      hint: 'band.invert.hint',
      when: (s) => at(s).pattern === 'image' && Boolean(at(s).image),
      get: (s) => at(s).image?.invert ?? false,
      set: (s, v) => {
        const image = at(s).image;
        return image ? put(s, { ...at(s), image: { ...image, invert: v } }) : s;
      },
    },
  ];
}

// Значения приходят из <select> строками; сужаем их к типам ядра, не
// доверяя DOM. Незнакомое значение — прежнее.
function axis(value: string): ReliefState['wave']['axis'] {
  return value === 'theta' || value === 'spiral' ? value : 'z';
}

function shape(value: string): ReliefState['wave']['shape'] {
  return WAVE_SHAPES.find((item) => item === value) ?? 'sin';
}

function meanderKind(value: string): MeanderKind {
  return MEANDER_KINDS.find((kind) => kind === value) ?? 'classic';
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
 * Список полос накатки — список кита (`ui/listCard`): у каждой полосы своя
 * строка с ✕ и всегда открытыми ползунками. Полос бывает несколько: на
 * настоящей посуде поясков обычно два-три, разного рисунка и на разной
 * высоте. Тело полосы (ползунки и подпись) живёт, пока жива её строка, и
 * строится заново, когда меняется число полос: индекс захвачен в её
 * ползунках.
 */
export function renderBandList(
  host: HTMLElement,
  read: () => RouletteState,
  onChange: Change<RouletteState>,
  idPrefix = 'roul',
): { sync(state: RouletteState, describe: (band: RouletteBand) => string): void } {
  let bodies: { body: HTMLElement; rows: ControlsHandle<RouletteState>; note: HTMLElement }[] = [];

  const list = make('ul', 'item-list');
  const addBtn = make('button', 'btn add-button', t('band.add'));
  addBtn.type = 'button';
  addBtn.addEventListener('click', () => {
    const bands = read().bands;
    if (bands.length >= MAX_BANDS) return;
    onChange({ bands: [...bands, { ...defaultBand(), on: true, bandCenter: nextCentre(bands) }] }, true);
  });
  host.replaceChildren(list, addBtn);

  /** Новую полосу ставим туда, где ещё нет соседей. */
  function nextCentre(bands: RouletteBand[]): number {
    for (const candidate of [0.62, 0.3, 0.85, 0.46]) {
      if (bands.every((band) => Math.abs(band.bandCenter - candidate) > 0.08)) return candidate;
    }
    return 0.5;
  }

  function build(count: number): void {
    bodies = [];
    for (let index = 0; index < count; index++) {
      const body = make('div', 'band-body');
      const controls = make('div');
      const note = make('p', 'row-note band-note');
      body.append(controls, note);
      // ползунки полосы — `#roul0_pattern`, `#lidroul1_depth`: индекс в приставке
      bodies.push({ body, rows: renderControls(controls, bandControls(index), read, onChange, `${idPrefix}${index}`), note });
    }
  }

  return {
    sync(state, describe): void {
      if (state.bands.length !== bodies.length) build(state.bands.length);
      renderItemList(list, {
        items: state.bands.map((_, index) => ({ id: String(index), title: t('band.title', { n: index + 1 }) })),
        body: (id) => bodies[Number(id)]?.body ?? null,
        t,
        idPrefix,
        remove: (id) => onChange({ bands: read().bands.filter((_, index) => index !== Number(id)) }, true),
      });
      addBtn.hidden = state.bands.length >= MAX_BANDS;
      state.bands.forEach((band, index) => {
        bodies[index].rows.sync(state);
        bodies[index].note.textContent = describe(band);
      });
    },
  };
}

export function renderReliefCards(
  container: HTMLElement,
  readRelief: () => ReliefState,
  readRoulette: () => RouletteState,
  onRelief: Change<ReliefState>,
  onRoulette: Change<RouletteState>,
): ReliefCardsHandle {
  container.textContent = '';

  // Одна карточка на обе волны: сверху готовый узор, внизу — «Волна волны»
  // подблоком (складная карточка кита внутри карточки).
  const waveCard = createCard(container, {
    id: 'wave',
    title: 'wave.title',
    desc: 'wave.desc',
    enabled: readRelief().wave.on,
    t,
  });
  const presetHost = make('div');
  const waveHost = make('div');
  waveCard.body.append(presetHost, waveHost);
  const presetRows = renderControls(presetHost, WAVE_PRESET_ROW, readRelief, onRelief, 'wave');
  const waveRows = renderControls(waveHost, WAVE_CONTROLS, readRelief, onRelief, 'wave');

  const wave2Card = createCard(waveCard.body, {
    id: 'wave2',
    title: 'wave2.title',
    desc: 'wave2.desc',
    enabled: readRelief().wave2.on,
    t,
  });
  const wave2Rows = renderControls(wave2Card.body, WAVE2_CONTROLS, readRelief, onRelief, 'wave2');
  const modulateHost = make('div');
  wave2Card.body.append(modulateHost);
  const modulateRows = renderControls(modulateHost, MODULATE_CONTROLS, readRelief, onRelief, 'wave2');

  const rouletteCard = createCard(container, {
    id: 'roulette',
    title: 'roulette.title',
    desc: 'roulette.desc',
    enabled: readRoulette().bands.some((band) => band.on),
    t,
  });
  const rouletteOnHost = make('div');
  const bandsHost = make('div');
  rouletteCard.body.append(rouletteOnHost, bandsHost);
  const rouletteOnRows = renderControls(rouletteOnHost, ROULETTE_ON, readRoulette, onRoulette, 'roulette');
  const bandList = renderBandList(bandsHost, readRoulette, onRoulette);
  let describeBand: (band: RouletteBand) => string = () => '';

  return {
    sync(relief, roulette): void {
      waveCard.setEnabled(relief.wave.on);
      wave2Card.setEnabled(relief.wave2.on);
      rouletteCard.setEnabled(roulette.bands.some((band) => band.on));
      presetRows.sync(relief);
      waveRows.sync(relief);
      wave2Rows.sync(relief);
      // в режиме плетения эти два ползунка ни на что не влияют — прячем,
      // чтобы не гадать, почему они не работают
      modulateHost.hidden = relief.wave2.mode !== 'modulate';
      modulateRows.sync(relief);
      rouletteOnRows.sync(roulette);
      bandList.sync(roulette, describeBand);
    },
    setBandNote(describe): void {
      describeBand = describe;
    },
  };
}
