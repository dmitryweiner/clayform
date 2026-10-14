// Встроенные пресеты по референсам: русская гончарная посуда и античные
// формы. Каждый — частичное состояние, которое накладывается на дефолт и
// проходит через sanitizeState, поэтому здесь можно писать только то, что
// отличает форму от базовой.
//
// Пресет узнаётся по `id`: имя и подсказка — в словарях интерфейса
// (`preset.<id>`, `preset.<id>.note`), на каждом языке свои.

import type { AppState } from './schema';
import { defaultState, sanitizeState } from './schema';
import { defaultFamilyParams } from '../geo/profiles';

export interface Preset {
  id: string;
  build(): AppState;
}

function make(
  id: string,
  family: string,
  shape: Record<string, number>,
  extra: Record<string, unknown> = {},
): Preset {
  return {
    id,
    build: () => sanitizeState({
      ...defaultState(),
      family,
      shape: { ...defaultFamilyParams(family), ...shape },
      ...extra,
    }),
  };
}

export const PRESETS: Preset[] = [
  make('pot', 'pot',
    { dBelly: 170, dNeck: 108, dFoot: 104, bellyAt: 0.52, shoulder: 0.45, neckH: 0.16, rimFlare: 0.18 },
    { heightMm: 150 }),

  make('krynka', 'pot',
    { dBelly: 150, dNeck: 74, dFoot: 92, bellyAt: 0.42, shoulder: 0.7, neckH: 0.28, rimFlare: 0.35 },
    { heightMm: 195, spout: { on: true, pullMm: 12, widthDeg: 55, zone: 0.14 } }),

  // Трубчатый носик, ручка напротив него и крышка: витрина всех приставных
  // деталей разом. Крышка лежит полем на венчике, как у обычного чайника;
  // полочки нет, поэтому горловина изнутри просто цилиндризуется, и отливка
  // выходит из формы готовой.
  make('teapot', 'pot',
    { dBelly: 150, dNeck: 90, dFoot: 90, bellyAt: 0.5, shoulder: 0.5, neckH: 0.12, rimFlare: 0.1 },
    {
      heightMm: 120,
      handle: {
        on: true, count: 1, topAt: 0.77, bottomAt: 0.28, reachMm: 30,
        thicknessMm: 12, widthRatio: 0.7, topAngleDeg: 26, bottomAngleDeg: 0,
      },
      spout: {
        on: true, kind: 'applied', attachAt: 0.4, lengthMm: 43,
        tipAt: 0.91, baseMm: 32, tipMm: 15, tipAngleDeg: 20,
      },
      lid: {
        on: true, recessMm: 0, depthMm: 8, clearanceMm: 0.6, ledgeMm: 0, fieldMm: 8,
        domeMm: 15, curvature: 0.6, knobKind: 'ball', knobDMm: 16, stemDMm: 7, stemHMm: 6,
      },
    }),

  make('korchaga', 'pot',
    { dBelly: 300, dNeck: 200, dFoot: 160, bellyAt: 0.48, shoulder: 0.3, neckH: 0.1, rimFlare: 0.12 },
    { heightMm: 340 }),

  make('rouletted-pot', 'pot',
    { dBelly: 178, dNeck: 112, dFoot: 100, bellyAt: 0.5, shoulder: 0.5, neckH: 0.15, rimFlare: 0.2 },
    {
      heightMm: 160,
      roulette: {
        bands: [
          { on: true, pattern: 'lattice', bandCenter: 0.66, bandWidthMm: 26, depthMm: 1.5, gapMm: 0, angle: 0 },
        ],
      },
    }),

  make('jug', 'vase',
    { dBelly: 150, dNeck: 76, dRim: 96, dFoot: 96, bellyAt: 0.4, neckAt: 0.74, footH: 6 },
    {
      heightMm: 230,
      handle: { on: true, count: 1, topAt: 0.88, bottomAt: 0.42, reachMm: 34, thicknessMm: 13, widthRatio: 0.65 },
      spout: { on: true, pullMm: 20, widthDeg: 55, zone: 0.16 },
    }),

  make('amphora', 'vase',
    { dBelly: 168, dNeck: 62, dRim: 88, dFoot: 62, bellyAt: 0.42, neckAt: 0.78, footH: 26 },
    {
      heightMm: 300,
      handle: { on: true, count: 2, topAt: 0.86, bottomAt: 0.54, reachMm: 30, thicknessMm: 14, widthRatio: 0.8 },
    }),

  make('lekythos', 'vase',
    { dBelly: 84, dNeck: 26, dRim: 48, dFoot: 60, bellyAt: 0.34, neckAt: 0.8, footH: 14 },
    { heightMm: 210 }),

  // Валики идут строго по высоте, а не по спирали: спиральный рельеф
  // пересекает плоскость разъёма под углом, и гипсовую форму пришлось бы
  // вывинчивать. Кольцевые валики она отпускает свободно.
  make('ridged-vase', 'vase',
    { dBelly: 160, dNeck: 58, dRim: 84, dFoot: 80, bellyAt: 0.4, neckAt: 0.78, footH: 12 },
    {
      heightMm: 265,
      relief: {
        wave: { on: true, axis: 'z', shape: 'rounded', freq: 18, ampMm: 1.4, phase: 0, spiralK: 0 },
        wave2: { on: false, axis: 'theta', shape: 'sin', freq: 6, fm: 0.2, am: 0.5, spiralK: 1 },
        zone: { from: 0.12, to: 0.72, fade: 0.08 },
      },
    }),

  // Два пояска разом: греческий ключ по тулову и простой валик под ним.
  make('meander-krater', 'vase',
    { dBelly: 190, dNeck: 150, dRim: 168, dFoot: 92, bellyAt: 0.55, neckAt: 0.82, footH: 22, rimFlare: 0.12 },
    {
      heightMm: 240,
      roulette: {
        bands: [
          { on: true, pattern: 'meander', bandCenter: 0.6, bandWidthMm: 30, depthMm: 1.3, gapMm: 0, angle: 0 },
          { on: true, pattern: 'band', bandCenter: 0.36, bandWidthMm: 7, depthMm: 1.1, gapMm: 0, angle: 0 },
        ],
      },
    }),

  make('bowl', 'bowl',
    { dRim: 210, dFoot: 92, curvature: 0.6, footH: 8, rimFlare: 0 },
    { heightMm: 80 }),

  make('plate', 'bowl',
    { dRim: 260, dFoot: 120, curvature: 0.25, footH: 6, rimFlare: 0.06 },
    { heightMm: 42 }),

  make('piala', 'bowl',
    { dRim: 130, dFoot: 52, curvature: 1, footH: 4, rimFlare: 0 },
    { heightMm: 62 }),

  make('kylix', 'bowl',
    { dRim: 200, dFoot: 74, curvature: 0.45, footH: 42, rimFlare: 0.1 },
    { heightMm: 110 }),

  make('mug', 'cup',
    { dRim: 88, dFoot: 70, barrel: 0.08, rimFlare: 0 },
    {
      heightMm: 100,
      handle: { on: true, count: 1, topAt: 0.84, bottomAt: 0.28, reachMm: 30, thicknessMm: 11, widthRatio: 0.7 },
    }),

  make('tumbler', 'cup',
    { dRim: 78, dFoot: 58, barrel: 0, rimFlare: 0 },
    { heightMm: 110 }),

  // У настоящего скифоса ручки горизонтальные; наши лежат в плоскости
  // разъёма, иначе форма не разнялась бы. Осознанная стилизация.
  make('skyphos', 'cup',
    { dRim: 120, dFoot: 60, barrel: 0.12, rimFlare: 0.08 },
    {
      heightMm: 90,
      handle: {
        on: true, count: 2, topAt: 0.8, bottomAt: 0.55,
        reachMm: 26, thicknessMm: 10, widthRatio: 1.2,
      },
    }),

  make('kanopka', 'cup',
    { dRim: 92, dFoot: 78, barrel: 0.28, rimFlare: 0.05 },
    {
      heightMm: 115,
      handle: { on: true, count: 1, topAt: 0.8, bottomAt: 0.24, reachMm: 32, thicknessMm: 12, widthRatio: 0.6 },
    }),
];

export function presetById(id: string): Preset | null {
  return PRESETS.find((preset) => preset.id === id) ?? null;
}
