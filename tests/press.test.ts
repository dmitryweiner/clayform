// Отминка: горб по внутренней поверхности изделия и углублённая форма по
// наружной. Проверяем то, от чего зависит, снимется ли пласт и выйдет ли
// изделие заданного размера.

import {
  insetProfile, buildHump, humpSurface, buildSlumpShell, buildPunch, punchLayout, slabThickness, legDistance,
  PUNCH_LEG_WIDTH_MM, PUNCH_VENT_MM,
} from '../src/geo/press';
import { cavityPoint, defaultHollow } from '../src/geo/hollow';
import { buildProfile, defaultFamilyParams, familyById, profileRadius } from '../src/geo/profiles';
import { defaultBuildParams, buildVessel, vesselSurface } from '../src/geo/build';
import { validateMesh, signedVolume } from '../src/geo/validate';
import { pullUndercut } from '../src/geo/mold/analyze';

const params = (family: string) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 96,
  nv: 96,
});

describe('insetProfile', () => {
  it('внутренняя поверхность: пол на высоте стенки, венчик на месте', () => {
    const p = params('cup');
    const profile = buildProfile('cup', p.shape, p.heightMm);
    const inset = insetProfile(profile, p.heightMm, 4);
    expect(inset.heightMm).toBeCloseTo(p.heightMm - 4, 6);
  });

  it('радиус меньше исходного ровно на стенку по нормали', () => {
    for (const family of ['cup', 'bowl', 'pot']) {
      const p = params(family);
      const profile = buildProfile(family, p.shape, p.heightMm);
      const wall = 3;
      const inset = insetProfile(profile, p.heightMm, wall);
      for (const v of [0.35, 0.5, 0.65]) {
        const point = cavityPoint((t) => profileRadius(profile, t), p.heightMm, wall, v);
        const t = (point.z - wall) / inset.heightMm;
        expect(profileRadius(inset.profile, t), `${family} v=${v}`).toBeCloseTo(point.r, 0);
      }
    }
  });
});

describe('горб', () => {
  const hollow = { ...defaultHollow(), wallMm: 5 };

  it('замкнут, снаружи нормали, стоит венчиком на столе', () => {
    for (const family of ['bowl', 'cup', 'pot', 'vase']) {
      const { mesh } = buildHump(params(family), hollow, 2, 0);
      const report = validateMesh(mesh);
      expect(report.watertight, family).toBe(true);
      expect(signedVolume(mesh.positions, mesh.indices), family).toBeGreaterThan(0);
      expect(report.bbox.min[2], family).toBeCloseTo(0, 4);
    }
  });

  it('наибольший радиус — венчик внутренней поверхности, увеличенный на усадку', () => {
    const p = params('bowl');
    const profile = buildProfile('bowl', p.shape, p.heightMm);
    const inset = insetProfile(profile, p.heightMm, hollow.wallMm);
    const { mesh } = buildHump(p, hollow, 2, 10);
    const report = validateMesh(mesh);
    expect(report.extents[0] / 2).toBeCloseTo(profileRadius(inset.profile, 1) * 1.1, 0);
    expect(report.extents[2]).toBeCloseTo(inset.heightMm * 1.1, 0);
  });

  it('скорлупа, а не сплошной: объём ≈ площадь × борт, и снизу открыт', () => {
    const p = params('bowl');
    const shell = 2;
    const { mesh } = buildHump(p, hollow, shell, 0);
    const solid = humpSurface(p, hollow);
    const solidVolume = signedVolume(solid.positions, solid.indices);
    const volume = signedVolume(mesh.positions, mesh.indices);
    expect(volume).toBeLessThan(solidVolume * 0.3);

    // площадь наружной поверхности горба ≈ площадь сплошного тела без крышки
    // устья; объём скорлупы должен быть около неё × борт
    let area = 0;
    let rim = 0;
    const pos = solid.positions;
    for (let i = 0; i < pos.length; i += 3) rim = Math.max(rim, Math.hypot(pos[i], pos[i + 1]));
    for (let t = 0; t < solid.indices.length; t += 3) {
      const [a, b, c] = [solid.indices[t] * 3, solid.indices[t + 1] * 3, solid.indices[t + 2] * 3];
      const ab = [pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]];
      const ac = [pos[c] - pos[a], pos[c + 1] - pos[a + 1], pos[c + 2] - pos[a + 2]];
      area += 0.5 * Math.hypot(
        ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0],
      );
    }
    area -= Math.PI * rim * rim;
    expect(volume / (area * shell)).toBeGreaterThan(0.7);
    expect(volume / (area * shell)).toBeLessThan(1.1);

    // открыт снизу: у стола внутри кольца венчика нет ни одной грани
    const { positions, indices } = mesh;
    for (let t = 0; t < indices.length; t += 3) {
      let z = 0;
      let r = 0;
      for (let k = 0; k < 3; k++) {
        const v = indices[t + k] * 3;
        z += positions[v + 2] / 3;
        r += Math.hypot(positions[v], positions[v + 1]) / 3;
      }
      if (z < shell * 0.5) expect(r).toBeGreaterThan(rim - shell - 0.5);
    }
  });

  it('с миски пласт снимается, с горшка с узким горлом — нет', () => {
    const bowl = pullUndercut(humpSurface(params('bowl'), hollow), 'up').fraction;
    const pot = pullUndercut(humpSurface(params('pot'), hollow), 'up').fraction;
    expect(bowl).toBeLessThan(0.002);
    expect(pot).toBeGreaterThan(0.05);
  });

  it('рельеф глубже борта поджимается и об этом сообщается', () => {
    const p = {
      ...params('bowl'),
      relief: { ...params('bowl').relief, wave: { ...params('bowl').relief.wave, on: true, ampMm: 4 } },
    };
    // волна уходит внутрь на 4 мм, а скорлупе в 1,2 мм позволено лишь 0,6
    expect(buildHump(p, hollow, 1.2, 0).pinchedFraction).toBeGreaterThan(0.1);
    expect(buildHump(p, hollow, 8, 0).pinchedFraction).toBe(0);
  });
});

describe('углублённая форма', () => {
  it('замкнутая скорлупа на столе, а не сплошной блок', () => {
    for (const family of ['bowl', 'cup', 'pot', 'vase']) {
      const { mesh } = buildSlumpShell(params(family), 3, 0);
      const report = validateMesh(mesh);
      expect(report.watertight, family).toBe(true);
      expect(signedVolume(mesh.positions, mesh.indices), family).toBeGreaterThan(0);
      expect(report.bbox.min[2], family).toBeCloseTo(0, 4);
      expect(report.degenerateTriangles, family).toBe(0);
    }
  });

  it('полость — ровно изделие с усадкой, дно и стенка толщиной в борт', () => {
    const p = params('bowl');
    const shell = 3;
    const vessel = validateMesh(buildVessel(p));
    const { mesh } = buildSlumpShell(p, shell, 10);
    const report = validateMesh(mesh);
    // высота — изделие плюс дно, всё с усадкой
    expect(report.extents[2]).toBeCloseTo((vessel.extents[2] + shell) * 1.1, 1);
    // по венчику снаружи — изделие плюс борт с каждой стороны
    expect(report.extents[0]).toBeGreaterThan(vessel.extents[0] * 1.1);
    expect(report.extents[0]).toBeLessThan((vessel.extents[0] + 4 * shell) * 1.1);
    // скорлупа, а не блок: материала куда меньше, чем в полости
    expect(report.volume).toBeLessThan(vessel.volume * 1.331 * 0.3);
  });

  it('снаружи нет цоколя под ножку: стенка идёт к основанию без перехвата', () => {
    const p = params('bowl');
    expect(p.shape.footH).toBeGreaterThan(0);
    const { mesh } = buildSlumpShell(p, 3, 0);
    // наружная сетка — первые nu·(nv+1) вершин, ряд j начинается с j·nu
    let previous = 0;
    for (let j = 0; j <= p.nv; j++) {
      const k = j * p.nu * 3;
      const r = Math.hypot(mesh.positions[k], mesh.positions[k + 1]);
      expect(r, `ряд ${j}`).toBeGreaterThanOrEqual(previous - 1e-4);
      previous = r;
    }
    expect(validateMesh(mesh).degenerateTriangles).toBe(0);
  });

  it('выпуклый рельеф не протыкает скорлупу', () => {
    const base = params('cup');
    const p = { ...base, relief: { ...base.relief, wave: { ...base.relief.wave, on: true, ampMm: 6 } } };
    const { mesh } = buildSlumpShell(p, 1.2, 0);
    expect(validateMesh(mesh).watertight).toBe(true);
    // Вершины: сначала наружная сетка, затем внутренняя той же раскладки.
    // В каждом узле боковой стенки наружная поверхность дальше от оси.
    const grid = p.nu * (p.nv + 1);
    let thinnest = Infinity;
    for (let n = p.nu; n < grid; n++) {
      const o = n * 3;
      const i = (grid + n) * 3;
      const gap = Math.hypot(mesh.positions[o], mesh.positions[o + 1])
        - Math.hypot(mesh.positions[i], mesh.positions[i + 1]);
      thinnest = Math.min(thinnest, gap);
    }
    expect(thinnest).toBeGreaterThan(0.5);
  });
});

describe('пуансон', () => {
  const hollow = { ...defaultHollow(), wallMm: 5 };
  const shell = 3;
  const families = ['bowl', 'cup', 'pot', 'vase'];

  /** Пуансон в рабочем положении (до переворота), без усадки. */
  const working = (family: string) => {
    const p = params(family);
    const { fit } = buildSlumpShell(p, shell, 0);
    const layout = punchLayout(p, hollow, shell, fit);
    const mesh = buildPunch(p, hollow, shell, 0, fit);
    const top = layout.flangeZ + layout.flangeT;
    const positions = new Float32Array(mesh.positions);
    for (let i = 2; i < positions.length; i += 3) positions[i] = top - positions[i];
    return { p, fit, layout, mesh, positions };
  };

  /** Вершины сечения u = 0: тело вращения, остальные углы повторяют его. */
  const section = (positions: Float32Array): { r: number; z: number }[] => {
    const out: { r: number; z: number }[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      if (Math.abs(positions[i + 1]) < 1e-6 && positions[i] > 0) out.push({ r: positions[i], z: positions[i + 2] });
    }
    return out;
  };

  it('замкнут, снаружи нормали, фланцем на столе, размеры от посадки', () => {
    for (const family of families) {
      const p = params(family);
      const { fit } = buildSlumpShell(p, shell, 10);
      const layout = punchLayout(p, hollow, shell, fit);
      const mesh = buildPunch(p, hollow, shell, 10, fit);
      const report = validateMesh(mesh);
      expect(report.watertight, family).toBe(true);
      expect(report.degenerateTriangles, family).toBe(0);
      expect(signedVolume(mesh.positions, mesh.indices), family).toBeGreaterThan(0);
      expect(report.bbox.min[2], family).toBeCloseTo(0, 4);
      let rMax = 0;
      for (let i = 0; i < mesh.positions.length; i += 3) {
        rMax = Math.max(rMax, Math.hypot(mesh.positions[i], mesh.positions[i + 1]));
      }
      expect(rMax, family).toBeCloseTo(layout.flangeMm * 1.1, 3);
      expect(report.extents[2], family).toBeCloseTo((layout.flangeZ + layout.flangeT) * 1.1, 3);
    }
  });

  it('зазор до матрицы везде ровно в пласт: на стенке и на дне', () => {
    for (const family of families) {
      const { p, layout, positions } = working(family);
      const { profile, heightMm } = vesselSurface(p);
      const points = section(positions);
      for (const v of [0.1, 0.3, 0.5, 0.7, 0.9]) {
        const r = profileRadius(profile, v);
        const z = v * heightMm + shell;
        const gap = Math.min(...points.map((q) => Math.hypot(q.r - r, q.z - z)));
        expect(gap, `${family} v=${v}`).toBeCloseTo(layout.slabMm, 1);
        expect(Math.abs(gap - layout.slabMm), `${family} v=${v}`).toBeLessThan(0.05);
      }
      const workFloor = Math.min(...points.filter((q) => q.r < profileRadius(profile, 0) * 0.5).map((q) => q.z));
      expect(workFloor, family).toBeCloseTo(shell + layout.slabMm, 4);
    }
  });

  it('три лапки на столе, обнимают матрицу с зазором', () => {
    for (const family of families) {
      const { p, layout, positions } = working(family);
      const step = (2 * Math.PI) / p.nu;
      const feet: { u: number; r: number }[] = [];
      let flangeLow = Infinity;
      for (let i = 0; i < positions.length; i += 3) {
        const r = Math.hypot(positions[i], positions[i + 1]);
        const u = Math.atan2(positions[i + 1], positions[i]);
        if (positions[i + 2] < 1) feet.push({ u, r });
        else if (r > layout.legInnerMm - 0.01) flangeLow = Math.min(flangeLow, positions[i + 2]);
      }
      // кластеры по углу: между лапками дыры больше шага сетки
      const angles = [...new Set(feet.map((f) => f.u.toFixed(6)))].map(Number).sort((a, b) => a - b);
      const clusters: number[][] = [];
      for (const a of angles) {
        const last = clusters[clusters.length - 1];
        if (last && a - last[last.length - 1] < step * 1.5) last.push(a);
        else clusters.push([a]);
      }
      // кластер через ±π сшиваем
      if (clusters.length > 1 && angles[0] + 2 * Math.PI - angles[angles.length - 1] < step * 1.5) {
        clusters[0].push(...clusters.pop()!.map((a) => a - 2 * Math.PI));
      }
      expect(clusters.length, family).toBe(3);
      for (const cluster of clusters) {
        const width = Math.max(...cluster) - Math.min(...cluster);
        expect(Math.abs(width - PUNCH_LEG_WIDTH_MM / layout.legInnerMm), family).toBeLessThanOrEqual(step * 1.01);
      }
      expect(Math.min(...feet.map((f) => f.r)), family).toBeCloseTo(layout.legInnerMm, 3);
      for (const f of feet) expect(legDistance(f.u), family).toBeLessThan(layout.legHalfAngle + step);
      expect(Math.min(...clusters.map((c) => c.length)), `${family}: подошва в линию`).toBeGreaterThan(1);
      // вне секторов низ фланца висит над кромкой на пласт
      expect(flangeLow, family).toBeGreaterThan(-1);
      const below = section(positions).filter((q) => q.r > layout.legInnerMm - 0.01 && q.z > 1);
      if (legDistance(0) > layout.legHalfAngle + step) {
        expect(Math.min(...below.map((q) => q.z)), family).toBeCloseTo(layout.flangeZ, 3);
      }
    }
  });

  it('матрицы не касается: внутри — с запасом в пласт, снаружи — дальше её края', () => {
    for (const family of families) {
      const { p, fit, layout, positions } = working(family);
      const { profile, heightMm } = vesselSurface(p);
      // рабочая поверхность матрицы — силуэт изделия, поднятый на борт, и пол
      const matrix: { r: number; z: number }[] = [];
      for (let k = 0; k <= 400; k++) {
        matrix.push({ r: profileRadius(profile, k / 400), z: (k / 400) * heightMm + shell });
      }
      const r0 = profileRadius(profile, 0);
      for (let k = 0; k <= 100; k++) matrix.push({ r: (r0 * k) / 100, z: shell });
      for (let i = 0; i < positions.length; i += 3) {
        const r = Math.hypot(positions[i], positions[i + 1]);
        const z = positions[i + 2];
        if (r > fit.outerMaxMm) continue; // лапки и фланец снаружи матрицы
        if (z > fit.rimZ + layout.slabMm * 0.9) continue; // над кромкой
        const gap = Math.min(...matrix.map((q) => Math.hypot(q.r - r, q.z - z)));
        expect(gap, `${family} r=${r.toFixed(1)} z=${z.toFixed(1)}`).toBeGreaterThan(0.9 * layout.slabMm);
      }
    }
  });

  it('отдушина сквозная', () => {
    const p = params('bowl');
    const { fit } = buildSlumpShell(p, shell, 10);
    const mesh = buildPunch(p, hollow, shell, 10, fit);
    const { positions, indices } = mesh;
    for (let t = 0; t < indices.length; t += 3) {
      let x = 0;
      let y = 0;
      for (let k = 0; k < 3; k++) {
        x += positions[indices[t + k] * 3] / 3;
        y += positions[indices[t + k] * 3 + 1] / 3;
      }
      expect(Math.hypot(x, y)).toBeGreaterThan((PUNCH_VENT_MM / 2) * 1.1 * 0.95);
    }
  });

  it('гладкий: рельеф изделия на пуансон не попадает', () => {
    const base = params('bowl');
    const fancy = {
      ...base,
      relief: { ...base.relief, wave: { ...base.relief.wave, on: true, ampMm: 3 } },
    };
    const plain = buildPunch(base, hollow, shell, 0, buildSlumpShell(base, shell, 0).fit);
    // матрица с волной шире, и лапки за ней уходят; рабочая поверхность — та же
    const wavy = buildPunch(fancy, hollow, shell, 0, buildSlumpShell(base, shell, 0).fit);
    expect(Array.from(wavy.positions)).toEqual(Array.from(plain.positions));
    expect(Array.from(wavy.indices)).toEqual(Array.from(plain.indices));
  });

  it('один зажим пласта на горб и пуансон', () => {
    expect(slabThickness(60, 50)).toBe(20);
    const profile = buildProfile('cup', params('cup').shape, 50);
    expect(insetProfile(profile, 50, 60).heightMm).toBeCloseTo(50 - 20, 6);
  });
});
