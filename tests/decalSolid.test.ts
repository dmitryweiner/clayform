// Надписи на боку булевыми операциями, на настоящем WASM manifold: текст
// призмой из контуров букв, картинка полем высот, обе изогнуты по стенке.
// Меш остаётся замкнутым, объём меняется ровно на тело надписи, выпуклое
// выступает на свою глубину, вдавленное до полости не доходит, а надпись у
// дна не вылезает ниже стола.

import { initCSG } from 'maker-kit/csg/manifold';
import type { CsgApi } from 'maker-kit/csg/manifold';
import type { TextRaster } from 'maker-kit/core/raster';
import { validateMesh } from 'maker-kit/3d/validate';
import { buildPrintableVessel } from '../src/geo/assemble';
import { buildHollowVessel } from '../src/geo/hollow';
import { defaultSpout } from '../src/geo/spout';
import { defaultHandle, sanitizeHandle } from '../src/geo/handle';
import type { AppState } from '../src/state/schema';
import { defaultState, sanitizeState, toBuildParams } from '../src/state/schema';
import { encodeBase64 } from '../src/geo/bytes';

let csg: CsgApi;
beforeAll(async () => {
  csg = await initCSG();
});

/** Брусок «I»: 4 × 10 мм по 10 px/мм, начало в середине. */
function bar(): TextRaster {
  const width = 40;
  const height = 100;
  return { width, height, data: new Uint8Array(width * height).fill(255), pxPerMm: 10, cap: 10, originX: 20, originY: 50 };
}

const cup = (over: Partial<AppState> = {}): AppState =>
  sanitizeState({ ...defaultState(), family: 'cup', heightMm: 95, resolution: 128, ...over });

function build(state: AppState, raster: TextRaster | null = bar(), segments = 96) {
  const params = toBuildParams(state, segments, { sideText: raster });
  const mesh = buildPrintableVessel(csg, params, state.hollow, state.handle, defaultSpout()).mesh;
  const plain = buildHollowVessel(
    toBuildParams({ ...state, sideText: { ...state.sideText, on: false }, sideImage: { ...state.sideImage, on: false } }, segments),
    state.hollow,
  ).mesh;
  return { mesh, report: validateMesh(mesh), plain: validateMesh(plain) };
}

/** Дальше всего от оси в узком секторе «лица» (модельная −y) на высоте надписи, мм. */
function reachAtFront(positions: Float32Array): number {
  let max = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    if (y < 0 && Math.abs(x) < 1 && Math.abs(z - 47.5) < 3) max = Math.max(max, Math.hypot(x, y));
  }
  return max;
}

const text = (over: Partial<AppState['sideText']>) => ({ ...defaultState().sideText, on: true, text: 'I', ...over });

describe('текст на боку', () => {
  it('выпуклый: меш замкнут, объём вырос на брусок, выступ — на глубину', () => {
    const { mesh, report, plain } = build(cup({ sideText: text({ depthMm: 1.5 }) }));
    expect(report.watertight).toBe(true);
    // 4 × 10 мм на 1,5 мм наружу: 60 мм³; на изогнутой стенке чуть больше
    expect(report.volume - plain.volume).toBeGreaterThan(50);
    expect(report.volume - plain.volume).toBeLessThan(75);
    expect(reachAtFront(mesh.positions) - reachAtFront(buildPlainFront())).toBeGreaterThan(1.3);
  });

  it('вдавленный: замкнут, объём меньше на брусок, полость цела', () => {
    const { report, plain } = build(cup({ sideText: text({ depthMm: -1 }) }));
    expect(report.watertight).toBe(true);
    expect(plain.volume - report.volume).toBeGreaterThan(33);
    expect(plain.volume - report.volume).toBeLessThan(45);
  });

  it('вдавленный глубже стенки — зажат: стенка остаётся, меш замкнут', () => {
    const { report, plain } = build(cup({ sideText: text({ depthMm: -5 }) }));
    expect(report.watertight).toBe(true);
    // стенка 3 мм, остаток 0,6: вдавлено на 2,4 мм — 96 мм³, а не 200
    expect(plain.volume - report.volume).toBeLessThan(110);
  });

  it('через шов u = 0 (носик, 90°) — замкнут', () => {
    const { report, plain } = build(cup({ sideText: text({ angleDeg: 90, depthMm: 1 }) }));
    expect(report.watertight).toBe(true);
    expect(report.volume).toBeGreaterThan(plain.volume);
  });

  it('у самого дна — обрезан и не уходит ниже стола', () => {
    const { report } = build(cup({ sideText: text({ heightAt: 0, depthMm: 1 }) }));
    expect(report.watertight).toBe(true);
    expect(report.bbox.min[2]).toBeGreaterThanOrEqual(-1e-4);
  });

  it('с ручкой — одна сборка на всё', () => {
    const handle = sanitizeHandle({ ...defaultHandle(), on: true });
    const state = cup({ handle, sideText: text({ depthMm: 1 }) });
    const params = toBuildParams(state, 96, { sideText: bar() });
    const report = validateMesh(buildPrintableVessel(csg, params, state.hollow, handle, defaultSpout()).mesh);
    expect(report.watertight).toBe(true);
  });
});

function buildPlainFront(): Float32Array {
  const state = cup();
  return buildHollowVessel(toBuildParams(state, 96), state.hollow).mesh.positions;
}

/** Картинка 8 × 8: левая половина чёрная, правая белая. */
function halves(invert = false): AppState['sideImage'] {
  const pixels = new Uint8Array(64);
  for (let j = 0; j < 8; j++) for (let i = 4; i < 8; i++) pixels[j * 8 + i] = 255;
  return { ...defaultState().sideImage, on: true, sizeMm: 20, image: { w: 8, h: 8, data: encodeBase64(pixels), invert } };
}

describe('картинка на боку', () => {
  it('выпуклая: замкнута, прибавилась белая половина на глубину', () => {
    const { report, plain } = build(cup({ sideImage: { ...halves(), depthMm: 1 } }), null);
    expect(report.watertight).toBe(true);
    // белая половина — 10 × 20 мм на 1 мм: около 200 мм³ (край между половинами — скат)
    const added = report.volume - plain.volume;
    expect(added).toBeGreaterThan(160);
    expect(added).toBeLessThan(240);
  });

  it('вдавленная и инвертированная: замкнута, убыло столько же', () => {
    const { report, plain } = build(cup({ sideImage: { ...halves(true), depthMm: -1 } }), null);
    expect(report.watertight).toBe(true);
    const removed = plain.volume - report.volume;
    expect(removed).toBeGreaterThan(160);
    expect(removed).toBeLessThan(240);
  });

  it('текст и картинка разом — замкнуто', () => {
    const { report } = build(
      cup({ sideText: text({ angleDeg: -60, depthMm: -0.8 }), sideImage: { ...halves(), angleDeg: 60, depthMm: 1 } }),
    );
    expect(report.watertight).toBe(true);
  });
});

describe('без надписей', () => {
  it('выключенные текст и картинка не трогают сборку: параметры те же, что без них', () => {
    const state = cup({ sideText: text({ on: false }), sideImage: { ...halves(), on: false } });
    expect(toBuildParams(state, 96, { sideText: bar() })).toEqual(toBuildParams(cup(), 96));
  });

  it('нулевая глубина — надписи нет', () => {
    expect(toBuildParams(cup({ sideText: text({ depthMm: 0 }) }), 96, { sideText: bar() }).decals).toBeUndefined();
  });
});
