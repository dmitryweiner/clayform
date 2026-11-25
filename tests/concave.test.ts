// Вогнутое дно: санатор, сечение наружного дна двух видов, пределы и пол
// полости ровной толщины над ним.

import type { ConcaveLayout, ConcaveState, SectionPoint } from '../src/geo/concave';
import { concaveFloor, concaveLayout, concaveWarnings, defaultConcave, sanitizeConcave } from '../src/geo/concave';

const sphere = (radiusMm: number): ConcaveState => ({ ...defaultConcave(), on: true, kind: 'sphere', radiusMm });
const flat = (depthMm: number, ringMm: number, filletMm: number): ConcaveState => ({
  ...defaultConcave(),
  on: true,
  kind: 'flat',
  depthMm,
  ringMm,
  filletMm,
});

function layoutOf(state: ConcaveState, flatMm = 50, heightMm = 150): ConcaveLayout {
  const layout = concaveLayout(state, flatMm, heightMm);
  if (!layout) throw new Error('no layout');
  return layout;
}

/** Высота ломаной на радиусе r (ломаная идёт от оси наружу, r не убывает). */
function zAt(section: readonly SectionPoint[], r: number): number {
  for (let i = 1; i < section.length; i++) {
    const a = section[i - 1];
    const b = section[i];
    if (r <= b.r && b.r > a.r) return a.z + ((r - a.r) / (b.r - a.r)) * (b.z - a.z);
  }
  return section[section.length - 1].z;
}

/** Расстояние от точки до ломаной. */
function distance(section: readonly SectionPoint[], p: SectionPoint): number {
  let best = Infinity;
  for (let i = 1; i < section.length; i++) {
    const a = section[i - 1];
    const b = section[i];
    const dr = b.r - a.r;
    const dz = b.z - a.z;
    const len2 = dr * dr + dz * dz;
    const t = len2 > 0 ? Math.min(1, Math.max(0, ((p.r - a.r) * dr + (p.z - a.z) * dz) / len2)) : 0;
    best = Math.min(best, Math.hypot(p.r - (a.r + t * dr), p.z - (a.z + t * dz)));
  }
  return best;
}

describe('sanitizeConcave', () => {
  it('выключено по умолчанию; мусор и чужие виды дают значения по умолчанию', () => {
    expect(sanitizeConcave(undefined)).toEqual(defaultConcave());
    expect(defaultConcave().on).toBe(false);
    const odd = sanitizeConcave({ on: 'yes', kind: 'cone', radiusMm: NaN, depthMm: -5, ringMm: 1e9, filletMm: '3' });
    expect(odd.on).toBe(false);
    expect(odd.kind).toBe('sphere');
    expect(odd.radiusMm).toBe(defaultConcave().radiusMm);
    expect(odd.depthMm).toBe(0.5);
    expect(odd.ringMm).toBe(60);
    expect(odd.filletMm).toBe(defaultConcave().filletMm);
  });

  it('идемпотентен', () => {
    for (const raw of [null, { on: true, kind: 'flat', depthMm: 7.25 }, { radiusMm: 5 }, flat(3, 8, 1.5)]) {
      const once = sanitizeConcave(raw);
      expect(sanitizeConcave(once)).toEqual(once);
    }
  });
});

describe('concaveLayout: сфера', () => {
  it('сфера проходит через край дна и ось на глубине R − √(R² − a²)', () => {
    const layout = layoutOf(sphere(300), 50);
    const d = 300 - Math.sqrt(300 * 300 - 50 * 50);
    expect(layout.depthMm).toBeCloseTo(d, 9);
    const first = layout.section[0];
    const last = layout.section[layout.section.length - 1];
    expect(first.r).toBe(0);
    expect(first.z).toBeCloseTo(d, 9);
    expect(last.r).toBeCloseTo(50, 9);
    expect(last.z).toBeCloseTo(0, 9);
    for (const p of layout.section) expect(Math.hypot(p.r, p.z - (d - 300))).toBeCloseTo(300, 6);
    // клеймо — на всём дне
    expect(layout.markMm).toBe(50);
    expect(layout.footprintMm).toBe(50);
  });

  it('слишком малая сфера ужимается до четверти высоты и предупреждает', () => {
    const state = sphere(60);
    const layout = layoutOf(state, 50, 80);
    expect(layout.depthMm).toBeCloseTo(20, 6);
    expect(concaveWarnings(state, 50, 80)).toEqual([{ code: 'concave.tooDeep', params: { d: '20.0' } }]);
    expect(concaveWarnings(sphere(300), 50, 80)).toEqual([]);
  });

  it('сфера не меньше дна: при высоком узком изделии — полусфера', () => {
    const layout = layoutOf(sphere(20), 30, 400);
    expect(layout.depthMm).toBeCloseTo(30, 6);
  });
});

describe('concaveLayout: утопленное плоское дно', () => {
  it('пояс касания ровно заданной ширины, утопленный круг на глубине', () => {
    const layout = layoutOf(flat(5, 8, 1.5), 50);
    expect(layout.depthMm).toBe(5);
    // от a − w до a — на столе
    for (let r = 42; r <= 50; r += 0.5) expect(zAt(layout.section, r)).toBeCloseTo(0, 9);
    expect(zAt(layout.section, 41.9)).toBeGreaterThan(0);
    // утопленный круг радиуса ρ = a − w − 2f
    expect(layout.markMm).toBeCloseTo(50 - 8 - 3, 9);
    for (let r = 0; r <= 39; r += 0.5) expect(zAt(layout.section, r)).toBeCloseTo(5, 9);
    expect(zAt(layout.section, 39.1)).toBeLessThan(5);
    // отвесная стенка на r_s = a − w − f от f до d − f
    const wall = layout.section.filter((p) => Math.abs(p.r - 40.5) < 1e-9);
    expect(Math.min(...wall.map((p) => p.z))).toBeCloseTo(1.5, 9);
    expect(Math.max(...wall.map((p) => p.z))).toBeCloseTo(3.5, 9);
  });

  it('мелкое дно с большим радиусом — две дуги без отвесного куска, сечение гладкое', () => {
    const layout = layoutOf(flat(1, 8, 4), 50);
    const theta = Math.acos(1 - 1 / 8);
    expect(layout.markMm).toBeCloseTo(42 - 8 * Math.sin(theta), 9);
    // глубина только убывает к краю, и излома круче пары градусов нигде нет
    for (let i = 2; i < layout.section.length; i++) {
      const [a, b, c] = [layout.section[i - 2], layout.section[i - 1], layout.section[i]];
      expect(c.z).toBeLessThanOrEqual(b.z);
      const turn = Math.abs(Math.atan2(c.z - b.z, c.r - b.r) - Math.atan2(b.z - a.z, b.r - a.r));
      expect(turn).toBeLessThan(0.05);
    }
  });

  it('без скругления — острые углы ступеньки', () => {
    const layout = layoutOf(flat(4, 10, 0), 50);
    expect(layout.markMm).toBeCloseTo(40, 9);
    expect(layout.section).toEqual([
      { r: 0, z: 4 },
      { r: 40, z: 4 },
      { r: 40, z: 0 },
      { r: 50, z: 0 },
    ]);
  });

  it('пределы: глубина — четверть высоты, скругление ужимается под утопленный круг', () => {
    expect(layoutOf(flat(40, 8, 1), 50, 100).depthMm).toBe(25);
    expect(concaveWarnings(flat(40, 8, 1), 50, 100)).toEqual([{ code: 'concave.tooDeep', params: { d: '25.0' } }]);
    // a − w = 6: скругление не больше (6 − 2)/2
    const tight = layoutOf(flat(10, 44, 10), 50);
    expect(tight.markMm).toBeCloseTo(2, 9);
  });

  it('край шире дна — углубления нет, но есть предупреждение', () => {
    expect(concaveLayout(flat(5, 49, 0), 50, 150)).toBeNull();
    expect(concaveWarnings(flat(5, 49, 0), 50, 150)).toEqual([{ code: 'concave.noRoom' }]);
  });

  it('выключенная вогнутость — ни сечения, ни предупреждений', () => {
    expect(concaveLayout({ ...flat(5, 49, 0), on: false }, 50, 150)).toBeNull();
    expect(concaveLayout(undefined, 50, 150)).toBeNull();
    expect(concaveWarnings({ ...flat(5, 49, 0), on: false }, 50, 150)).toEqual([]);
  });
});

describe('concaveFloor: пол ровной толщины', () => {
  it('над сферой — концентрическая сфера R + b', () => {
    const layout = layoutOf(sphere(200), 50);
    const floor = concaveFloor(layout, 4);
    const centre = layout.depthMm - 200;
    for (let r = 0; r <= 50; r += 2.5) {
      expect(floor.heightAt(r) - centre).toBeCloseTo(Math.sqrt(204 * 204 - r * r), 2);
    }
    // за краем дна — плоский пол на толщине дна
    expect(floor.heightAt(60)).toBeCloseTo(4, 9);
  });

  it('над ступенькой — помост на d + b, стенка на r_s + b, низ на b', () => {
    // f > b: у нижнего угла дуга f − b; f < b: угол острый
    for (const [f, b] of [
      [3, 2],
      [1, 4],
    ]) {
      const layout = layoutOf(flat(8, 8, f), 50);
      const floor = concaveFloor(layout, b);
      const rs = 50 - 8 - f;
      expect(floor.heightAt(0)).toBeCloseTo(8 + b, 6);
      expect(floor.heightAt(rs - f - 0.01)).toBeCloseTo(8 + b, 6);
      // отвесная стенка пола: слева — верх, справа — низ
      expect(floor.heightAt(rs + b - 0.05)).toBeGreaterThan(8 - f - 0.1);
      expect(floor.heightAt(rs + b + 0.05)).toBeLessThan(Math.max(f, b) + 0.1);
      expect(floor.heightAt(rs + Math.max(f, b) + 0.5)).toBeCloseTo(b, 6);
      expect(floor.heightAt(49)).toBeCloseTo(b, 6);
    }
  });

  it('любая точка пола отстоит от наружного дна не меньше чем на толщину', () => {
    for (const state of [sphere(120), flat(6, 8, 2), flat(1, 6, 4), flat(5, 10, 0)]) {
      const layout = layoutOf(state, 50);
      const floor = concaveFloor(layout, 3);
      const section = floor.section(48);
      expect(section[section.length - 1]).toEqual({ r: 48, z: floor.heightAt(48) });
      // наружное дно за краем продолжается столом
      const outer = [...layout.section, { r: 200, z: 0 }];
      for (const p of section) {
        expect(distance(outer, p)).toBeGreaterThan(3 - 0.01);
        expect(distance(outer, p)).toBeLessThan(3 + 0.06);
      }
    }
  });

  it('сечение пола: от оси до края, без лишних точек на ровном', () => {
    const layout = layoutOf(flat(5, 8, 1.5), 50);
    const floor = concaveFloor(layout, 4);
    const section = floor.section(47);
    expect(section[0].r).toBe(0);
    expect(section[0].z).toBeCloseTo(9, 6);
    expect(section[section.length - 1].r).toBe(47);
    expect(section[section.length - 1].z).toBeCloseTo(4, 6);
    for (let i = 1; i < section.length; i++) expect(section[i].r).toBeGreaterThanOrEqual(section[i - 1].r);
    expect(section.length).toBeLessThan(200);
  });
});
