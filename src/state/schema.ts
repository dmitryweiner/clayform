// Сериализуемое состояние приложения и единственный шлюз, через который в
// ядро попадают числа извне: UI, файлы и localStorage-пресеты. Всё,
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
import type { MarkRaster, MarkState } from '../geo/mark';
import { defaultMark, sanitizeMark } from '../geo/mark';
import type { LidState } from '../geo/lid';
import { defaultLid, sanitizeLid } from '../geo/lid';
import type { ConcaveState } from '../geo/concave';
import { defaultConcave, sanitizeConcave } from '../geo/concave';
import type { SideTextState } from '../geo/sideText';
import { defaultSideText, sanitizeSideText } from '../geo/sideText';
import type { SideImageState } from '../geo/sideImage';
import { defaultSideImage, sanitizeSideImage } from '../geo/sideImage';
import type { Decal } from '../geo/decal';
import type { DecodedImage } from '../geo/roulette';
import { decodeImage } from '../geo/roulette';
import { MIN_WALL_MM } from '../geo/hollow';
import type { TextRaster } from 'maker-kit/core/raster';

export const STATE_VERSION = 1;

export interface AppState {
  version: number;
  /** pot | bowl | cup | vase */
  family: string;
  /** параметры выбранного семейства */
  shape: Params;
  heightMm: number;
  /** вогнутое дно; старые пресеты поля не знают — выключено */
  concave: ConcaveState;
  relief: ReliefState;
  roulette: RouletteState;
  handle: HandleState;
  spout: SpoutState;
  lid: LidState;
  /** клеймо на донышке */
  mark: MarkState;
  /** текст на боку; старые пресеты поля не знают — выключен */
  sideText: SideTextState;
  /** картинка на боку */
  sideImage: SideImageState;
  hollow: HollowState;
  /**
   * Крышка рядом с изделием, юбкой вниз, — и в превью, и одним STL на двоих:
   * печатать за один заход. Только с крышкой.
   */
  lidBeside: boolean;
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
    concave: defaultConcave(),
    relief: defaultRelief(),
    roulette: defaultRoulette(),
    handle: defaultHandle(),
    spout: defaultSpout(),
    lid: defaultLid(),
    mark: defaultMark(),
    sideText: defaultSideText(),
    sideImage: defaultSideImage(),
    hollow: defaultHollow(),
    lidBeside: false,
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
  const family = typeof source.family === 'string' && isFamilyId(source.family) ? source.family : fallback.family;
  const heightMm = Math.min(HEIGHT_MAX_MM, Math.max(HEIGHT_MIN_MM, num(source.heightMm, familyById(family).defaultHeightMm)));
  const wanted = num(source.resolution, fallback.resolution);
  const resolution = RESOLUTIONS.includes(wanted) ? wanted : fallback.resolution;
  return {
    version: STATE_VERSION,
    family,
    shape: clampFamilyParams(family, numericRecord(source.shape)),
    heightMm,
    concave: sanitizeConcave(source.concave),
    relief: sanitizeRelief(source.relief),
    roulette: sanitizeRoulette(source.roulette),
    handle: sanitizeHandle(source.handle),
    spout: sanitizeSpout(source.spout),
    lid: sanitizeLid(source.lid),
    mark: sanitizeMark(source.mark),
    sideText: sanitizeSideText(source.sideText),
    sideImage: sanitizeSideImage(source.sideImage),
    hollow: sanitizeHollow(source.hollow),
    lidBeside: typeof source.lidBeside === 'boolean' ? source.lidBeside : false,
    resolution,
  };
}

/**
 * Носик с учётом крышки. Оттянутый край ломает круглый венчик, а крышке
 * нужен именно круглый: садиться на волну слива ей не на что. Совместить их
 * нельзя, поэтому при включённой крышке край молча гаснет — состояние при
 * этом не меняется, и снятая крышка возвращает носик как был.
 *
 * Приставная трубка с крышкой уживается прекрасно: это и есть чайник.
 */
export function effectiveSpout(state: AppState): SpoutState {
  return state.lid.on && state.spout.kind === 'lip' ? { ...state.spout, on: false } : state.spout;
}

/**
 * Волны для купола крышки: только те, у которых стоит «И на крышке тоже».
 * Вторая волна без первой ничего не делает и на крышке тоже.
 */
export function lidRelief(state: AppState): ReliefState {
  const { relief } = state;
  return {
    ...relief,
    wave: { ...relief.wave, on: relief.wave.on && relief.wave.onLid },
    wave2: { ...relief.wave2, on: relief.wave2.on && relief.wave2.onLid },
  };
}

/**
 * Растры надписей. Шрифтами их рисует главный поток, в состоянии их нет:
 * строка клейма и текст на боку.
 */
export interface Rasters {
  markStrip?: MarkRaster | null;
  sideText?: TextRaster | null;
}

/** Последняя декодированная картинка на боку: не декодировать её на каждом кадре. */
let pictureCache: { data: string; decoded: DecodedImage | null } | null = null;

/**
 * Надписи на боку для сборки: включённые, с рисунком и не нулевой
 * глубины. Вдавленное — не глубже, чем оставит стенку MIN_WALL_MM
 * (`decalDepthFloor`); срез сверху — там, где начинается заглаженная кромка.
 */
export function stateDecals(state: AppState, sideText: TextRaster | null): Decal[] {
  const floor = decalDepthFloor(state);
  const topMm = state.heightMm - Math.min(state.hollow.rimRadiusMm, state.hollow.wallMm / 2);
  const decals: Decal[] = [];
  const text = state.sideText;
  if (text.on && sideText && text.depthMm !== 0) {
    decals.push({
      art: { kind: 'text', raster: sideText },
      angleDeg: text.angleDeg,
      heightAt: text.heightAt,
      depthMm: Math.max(text.depthMm, floor),
      topMm,
    });
  }
  const image = state.sideImage;
  if (image.on && image.image && image.depthMm !== 0) {
    if (pictureCache?.data !== image.image.data) pictureCache = { data: image.image.data, decoded: decodeImage(image.image) };
    const picture = pictureCache.decoded;
    if (picture) {
      // инверсия живёт в картинке состояния, а не в кэше: её переключают, не меняя файла
      decals.push({
        art: { kind: 'image', picture: { ...picture, invert: image.image.invert }, sizeMm: image.sizeMm },
        angleDeg: image.angleDeg,
        heightAt: image.heightAt,
        depthMm: Math.max(image.depthMm, floor),
        topMm,
      });
    }
  }
  return decals;
}

/** Глубже этого, мм (со знаком), вдавленная надпись не идёт: стенка остаётся не тоньше MIN_WALL_MM. */
export function decalDepthFloor(state: AppState): number {
  return -Math.max(0, state.hollow.wallMm - MIN_WALL_MM);
}

/**
 * Состояние + детализация → параметры сборки геометрии. Растры надписей
 * рисует главный поток (`Rasters`). Без надписей и клейма поля не
 * передаются вовсе: меш байт в байт прежний.
 */
export function toBuildParams(state: AppState, segments: number, rasters: Rasters = {}): BuildParams {
  const decals = stateDecals(state, rasters.sideText ?? null);
  return {
    family: state.family,
    shape: state.shape,
    heightMm: state.heightMm,
    nu: segments,
    nv: segments,
    relief: state.relief,
    roulette: state.roulette,
    spout: effectiveSpout(state),
    // выключенная вогнутость идёт прежним путём, меш байт в байт прежний
    ...(state.concave.on ? { concave: state.concave } : {}),
    ...(state.mark.on ? { mark: { state: state.mark, strip: rasters.markStrip ?? null } } : {}),
    ...(decals.length > 0 ? { decals } : {}),
  };
}
