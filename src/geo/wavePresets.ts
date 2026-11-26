// Готовые узоры волны: сочетания обеих волн, подобранные на глаз. Подобрать
// красивое сочетание руками трудно — у двух волн полтора десятка ручек, и
// большинство их сочетаний дают кашу. Пресет задаёт числа как есть, на
// любом размере изделия: «13 рядов» остаются 13 рядами и у чашки, и у вазы.
//
// Пресет — это только сами волны. Включение волны на крышке («И на
// крышке») и зона по высоте — про изделие, а не про узор: пресет их не
// трогает и при сравнении на них не смотрит.

import type { ReliefState, Wave2State, WaveState } from './relief';

export const WAVE_PRESET_IDS = ['ripple', 'flow', 'basket', 'flame', 'swirl'] as const;
export type WavePresetId = (typeof WAVE_PRESET_IDS)[number];

export interface WavePreset {
  /** подпись — `wavePreset.<id>` в словарях */
  id: WavePresetId;
  wave: Omit<WaveState, 'on' | 'onLid'>;
  wave2: Omit<Wave2State, 'onLid'>;
}

/** Ни на что не влияющие числа выключенной второй волны — как у волны по умолчанию. */
const QUIET = { phase: 0, fm: 0.2, am: 0.5, spiralK: 1 };

export const WAVE_PRESETS: readonly WavePreset[] = [
  {
    // ряды частого зигзага (первое фото): валики по высоте, которые гнёт по
    // кругу треугольная волна; гребни соседних рядов — друг под другом. Чаще
    // 30 зигзагов сетка в 192 узла по кругу рисует муаром
    id: 'ripple',
    wave: { axis: 'z', shape: 'rounded', freq: 13, ampMm: 1, phase: 0, spiralK: 1 },
    wave2: { on: true, mode: 'modulate', axis: 'theta', shape: 'tri', freq: 30, phase: 0, fm: 0.35, am: 0, spiralK: 1 },
  },
  {
    // редкие тонкие линии плавно гуляют (второе фото): нити по высоте, которые
    // четыре раза за оборот уходят вверх и вниз и то набирают, то теряют глубину
    id: 'flow',
    wave: { axis: 'z', shape: 'thread', freq: 12, ampMm: 1.2, phase: 0, spiralK: 1 },
    wave2: { on: true, mode: 'modulate', axis: 'theta', shape: 'sin', freq: 4, phase: 0, fm: 0.6, am: 0.3, spiralK: 1 },
  },
  {
    // корзинка: клетки, выпуклые и вдавленные вперемежку
    id: 'basket',
    wave: { axis: 'z', shape: 'square', freq: 8, ampMm: 1.5, phase: 0, spiralK: 1 },
    wave2: { on: true, mode: 'weave', axis: 'theta', shape: 'square', freq: 24, ...QUIET },
  },
  {
    // каннелюры, которые извиваются по высоте
    id: 'flame',
    wave: { axis: 'theta', shape: 'rounded', freq: 28, ampMm: 1.5, phase: 0, spiralK: 1 },
    wave2: { on: true, mode: 'modulate', axis: 'z', shape: 'sin', freq: 2, phase: 0, fm: 0.35, am: 0, spiralK: 1 },
  },
  {
    // закрученные бороздки, глубже к середине высоты
    id: 'swirl',
    wave: { axis: 'spiral', shape: 'rounded', freq: 12, ampMm: -1.2, phase: 0, spiralK: 2 },
    wave2: { on: true, mode: 'modulate', axis: 'z', shape: 'sin', freq: 1, phase: -0.25, fm: 0, am: 0.6, spiralK: 1 },
  },
];

/**
 * Узор пресета: обе волны его числами. Первая волна включается — выбрать
 * узор и не увидеть его было бы странно; «И на крышке» и зона — прежние.
 */
export function applyWavePreset(relief: ReliefState, id: string): ReliefState {
  const preset = WAVE_PRESETS.find((item) => item.id === id);
  if (!preset) return relief;
  return {
    ...relief,
    wave: { ...relief.wave, ...preset.wave, on: true },
    wave2: { ...relief.wave2, ...preset.wave2 },
  };
}

/**
 * Какой пресет сейчас на изделии: id или '' — «Своя». Сравниваются только
 * числа, которые действуют: у выключенной второй волны — ничего, у
 * плетения — без fm и am, у волны не по спирали — без шага спирали.
 */
export function wavePresetOf(relief: ReliefState): string {
  return WAVE_PRESETS.find((preset) => sameWaves(relief, preset))?.id ?? '';
}

function sameWaves(relief: ReliefState, preset: WavePreset): boolean {
  const { wave, wave2 } = relief;
  const a = preset.wave;
  const b = preset.wave2;
  const waveSame =
    wave.axis === a.axis &&
    wave.shape === a.shape &&
    wave.freq === a.freq &&
    wave.ampMm === a.ampMm &&
    wave.phase === a.phase &&
    (a.axis !== 'spiral' || wave.spiralK === a.spiralK);
  if (!waveSame || wave2.on !== b.on) return false;
  if (!b.on) return true;
  return (
    wave2.mode === b.mode &&
    wave2.axis === b.axis &&
    wave2.shape === b.shape &&
    wave2.freq === b.freq &&
    wave2.phase === b.phase &&
    (b.axis !== 'spiral' || wave2.spiralK === b.spiralK) &&
    (b.mode !== 'modulate' || (wave2.fm === b.fm && wave2.am === b.am))
  );
}
