// Сериализуемое состояние приложения и единственный шлюз, через который в
// ядро попадают числа извне: UI, share-ссылки, localStorage-пресеты. Всё,
// что приходит снаружи, проходит sanitizeState — ядро вправе считать, что
// параметры уже валидны.

import type { Params } from '../geo/profiles';
import { familyById, isFamilyId, clampFamilyParams } from '../geo/profiles';
import type { BuildParams } from '../geo/build';
import type { ReliefState } from '../geo/relief';
import { defaultRelief, sanitizeRelief } from '../geo/relief';
import type { RouletteState } from '../geo/roulette';
import { defaultRoulette, sanitizeRoulette } from '../geo/roulette';
import type { HollowState } from '../geo/hollow';
import { defaultHollow, sanitizeHollow } from '../geo/hollow';
import type { HandleState } from '../geo/handle';
import { defaultHandle, sanitizeHandle } from '../geo/handle';
import type { SpoutState } from '../geo/spout';
import { defaultSpout, sanitizeSpout } from '../geo/spout';
import type { MoldState } from '../geo/mold';
import { defaultMold, sanitizeMold } from '../geo/mold';

export const STATE_VERSION = 1;

/**
 * Что уходит в STL:
 *  vessel — само изделие, полое, как его печатают глиной;
 *  master — мастер-позитив под ручную силиконовую форму;
 *  bath   — ванночки-опалубки под заливку силикона (по одной на часть).
 */
export const EXPORT_MODES = ['vessel', 'master', 'bath'] as const;
export type ExportMode = (typeof EXPORT_MODES)[number];

export interface AppState {
  version: number;
  /** pot | bowl | cup | vase */
  family: string;
  /** параметры выбранного семейства */
  shape: Params;
  heightMm: number;
  relief: ReliefState;
  roulette: RouletteState;
  handle: HandleState;
  spout: SpoutState;
  hollow: HollowState;
  mold: MoldState;
  exportMode: ExportMode;
  /** сегментов сетки для экспортной сборки */
  resolution: number;
}

export const RESOLUTIONS = [128, 192, 256, 384];
export const HEIGHT_MIN_MM = 20;
export const HEIGHT_MAX_MM = 400;

export function defaultState(): AppState {
  const family = familyById('pot');
  return {
    version: STATE_VERSION,
    family: family.id,
    shape: clampFamilyParams(family.id, {}),
    heightMm: family.defaultHeightMm,
    relief: defaultRelief(),
    roulette: defaultRoulette(),
    handle: defaultHandle(),
    spout: defaultSpout(),
    hollow: defaultHollow(),
    mold: defaultMold(),
    exportMode: 'vessel',
    resolution: 192,
  };
}

/** Состояние по умолчанию для семейства: свои параметры и своя высота. */
export function stateForFamily(id: string, previous: AppState): AppState {
  if (!isFamilyId(id)) return previous;
  const family = familyById(id);
  return {
    ...previous,
    family: family.id,
    shape: clampFamilyParams(family.id, {}),
    heightMm: family.defaultHeightMm,
  };
}

function asRecord(x: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (typeof x === 'object' && x !== null) {
    for (const [key, value] of Object.entries(x)) out[key] = value;
  }
  return out;
}

function num(x: unknown, fallback: number): number {
  return typeof x === 'number' && Number.isFinite(x) ? x : fallback;
}

function numericRecord(x: unknown): Partial<Params> {
  const out: Partial<Params> = {};
  for (const [key, value] of Object.entries(asRecord(x))) {
    if (typeof value === 'number' && Number.isFinite(value)) out[key] = value;
  }
  return out;
}

/** Приводит что угодно к валидному состоянию; никогда не бросает. */
export function sanitizeState(raw: unknown): AppState {
  const source = asRecord(raw);
  const fallback = defaultState();
  const family = typeof source.family === 'string' && isFamilyId(source.family)
    ? source.family
    : fallback.family;
  const heightMm = Math.min(
    HEIGHT_MAX_MM,
    Math.max(HEIGHT_MIN_MM, num(source.heightMm, familyById(family).defaultHeightMm)),
  );
  const wanted = num(source.resolution, fallback.resolution);
  const resolution = RESOLUTIONS.includes(wanted) ? wanted : fallback.resolution;
  return {
    version: STATE_VERSION,
    family,
    shape: clampFamilyParams(family, numericRecord(source.shape)),
    heightMm,
    relief: sanitizeRelief(source.relief),
    roulette: sanitizeRoulette(source.roulette),
    handle: sanitizeHandle(source.handle),
    spout: sanitizeSpout(source.spout),
    hollow: sanitizeHollow(source.hollow),
    mold: sanitizeMold(source.mold),
    exportMode: exportModeOf(source.exportMode),
    resolution,
  };
}

function exportModeOf(raw: unknown): ExportMode {
  for (const mode of EXPORT_MODES) if (raw === mode) return mode;
  return 'vessel';
}

/** Состояние + детализация → параметры сборки геометрии. */
export function toBuildParams(state: AppState, segments: number): BuildParams {
  return {
    family: state.family,
    shape: state.shape,
    heightMm: state.heightMm,
    nu: segments,
    nv: segments,
    relief: state.relief,
    roulette: state.roulette,
    spout: state.spout,
  };
}
