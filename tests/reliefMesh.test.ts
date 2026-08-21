// Рельеф на реальной сетке: смещение вдоль нормали не должно ломать ни
// печатопригодность (плоское дно), ни замкнутость меша, ни шов.

import { buildVessel, vesselGrid, defaultBuildParams, gridRadiusAt } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import { defaultRelief, sanitizeRelief } from '../src/geo/relief';
import { defaultRoulette, defaultBand, sanitizeRoulette } from '../src/geo/roulette';
import { ROULETTE_PATTERNS } from '../src/geo/roulette';
import { WAVE_SHAPES, WAVE_AXES } from '../src/geo/relief';

const base = () => ({ ...defaultBuildParams(), nu: 96, nv: 96 });

const withWave = (over: Record<string, unknown> = {}) => ({
  ...base(),
  relief: sanitizeRelief({
    wave: { on: true, axis: 'z', shape: 'rounded', freq: 10, ampMm: 3, phase: 0, spiralK: 1, ...over },
    zone: { from: 0, to: 1, fade: 0.05 },
  }),
});

const withRoulette = (over: Record<string, unknown> = {}) => ({
  ...base(),
  roulette: sanitizeRoulette({ bands: [{ ...defaultBand(), on: true, ...over }] }),
});

describe('рельеф на сетке', () => {
  it('меш остаётся замкнутым при любой форме и оси волны', () => {
    for (const shape of WAVE_SHAPES) {
      for (const axis of WAVE_AXES) {
        const mesh = buildVessel(withWave({ shape, axis, freq: 8, spiralK: 2 }));
        const report = validateMesh(mesh);
        expect(report.watertight, `${shape}/${axis}`).toBe(true);
        expect(report.finite, `${shape}/${axis}`).toBe(true);
        expect(report.volume, `${shape}/${axis}`).toBeGreaterThan(0);
      }
    }
  });

  it('меш остаётся замкнутым при любом узоре ролика', () => {
    for (const pattern of ROULETTE_PATTERNS) {
      const mesh = buildVessel(withRoulette({ pattern, depthMm: 2, bandWidthMm: 40 }));
      const report = validateMesh(mesh);
      expect(report.watertight, pattern).toBe(true);
      expect(report.volume, pattern).toBeGreaterThan(0);
    }
  });

  it('дно остаётся плоским: рельеф гасится у стола', () => {
    const grid = vesselGrid(withWave({ freq: 20, ampMm: 6 }));
    const flat = vesselGrid(base());
    for (let i = 0; i < grid.nu; i++) {
      expect(grid.positions[i * 3 + 2]).toBeCloseTo(0, 6);
      expect(gridRadiusAt(grid, i, 0)).toBeCloseTo(gridRadiusAt(flat, i, 0), 4);
    }
  });

  it('рельеф реально меняет форму — амплитуда доходит до поверхности', () => {
    const relief = vesselGrid(withWave({ freq: 10, ampMm: 3 }));
    const flat = vesselGrid(base());
    let peak = 0;
    for (let j = 0; j <= relief.nv; j++) {
      peak = Math.max(peak, Math.abs(gridRadiusAt(relief, 0, j) - gridRadiusAt(flat, 0, j)));
    }
    // смещение идёт по нормали, поэтому в радиус попадает не вся амплитуда
    expect(peak).toBeGreaterThan(1.5);
    expect(peak).toBeLessThan(3.2);
  });

  it('глубокая волна внутрь не протыкает ось вращения', () => {
    const grid = vesselGrid({
      ...base(),
      family: 'vase',
      relief: sanitizeRelief({
        wave: { on: true, axis: 'z', shape: 'sin', freq: 14, ampMm: -20, phase: 0, spiralK: 0 },
        zone: { from: 0, to: 1, fade: 0.02 },
      }),
    });
    for (let j = 0; j <= grid.nv; j++) {
      for (let i = 0; i < grid.nu; i++) {
        expect(gridRadiusAt(grid, i, j)).toBeGreaterThan(0);
      }
    }
    expect(validateMesh(buildVessel({
      ...base(),
      family: 'vase',
      relief: sanitizeRelief({
        wave: { on: true, axis: 'z', shape: 'sin', freq: 14, ampMm: -20, phase: 0, spiralK: 0 },
        zone: { from: 0, to: 1, fade: 0.02 },
      }),
    })).watertight).toBe(true);
  });

  it('накатка живёт только в своём пояске', () => {
    const params = withRoulette({ bandCenter: 0.6, bandWidthMm: 15, depthMm: 2 });
    const marked = vesselGrid(params);
    const flat = vesselGrid(base());
    const bandH = 15 / params.heightMm;
    for (let j = 0; j <= marked.nv; j++) {
      const v = j / marked.nv;
      const outside = Math.abs(v - 0.6) > bandH / 2 + 1e-6;
      if (!outside) continue;
      for (let i = 0; i < marked.nu; i += 7) {
        expect(gridRadiusAt(marked, i, j), `v=${v}`).toBeCloseTo(gridRadiusAt(flat, i, j), 4);
      }
    }
  });

  it('узор ролика замыкается по окружности без стыка', () => {
    const grid = vesselGrid(withRoulette({ pattern: 'lattice', depthMm: 2.5, bandWidthMm: 40, repeats: 0 }));
    const j = Math.round(grid.nv * 0.62);
    // шаг между соседними столбцами внутри пояска однороден: если бы узор
    // не сходился, на шве i = nu−1 → 0 был бы выброс
    const steps: number[] = [];
    for (let i = 0; i < grid.nu; i++) {
      const a = gridRadiusAt(grid, i, j);
      const b = gridRadiusAt(grid, (i + 1) % grid.nu, j);
      steps.push(Math.abs(a - b));
    }
    const seam = steps[grid.nu - 1];
    const typical = [...steps].sort((x, y) => x - y)[Math.floor(grid.nu / 2)];
    expect(seam).toBeLessThan(typical * 3 + 1e-6);
  });

  it('рельеф и накатка складываются, а не подменяют друг друга', () => {
    const both = vesselGrid({
      ...withWave({ freq: 6, ampMm: 2 }),
      roulette: sanitizeRoulette({ bands: [{ ...defaultBand(), on: true, depthMm: 2, bandWidthMm: 30 }] }),
    });
    const waveOnly = vesselGrid(withWave({ freq: 6, ampMm: 2 }));
    let differs = 0;
    const j = Math.round(both.nv * 0.62);
    for (let i = 0; i < both.nu; i++) {
      if (Math.abs(gridRadiusAt(both, i, j) - gridRadiusAt(waveOnly, i, j)) > 0.2) differs++;
    }
    expect(differs).toBeGreaterThan(10);
  });

  it('без рельефа и накатки сетка не отличается от гладкой', () => {
    const plain = vesselGrid(base());
    const explicit = vesselGrid({ ...base(), relief: defaultRelief(), roulette: defaultRoulette() });
    expect(Array.from(explicit.positions)).toEqual(Array.from(plain.positions));
  });
});
