// Отминка: горб по внутренней поверхности изделия и углублённая форма по
// наружной. Проверяем то, от чего зависит, снимется ли пласт и выйдет ли
// изделие заданного размера.

import { insetProfile, buildHump, humpSurface, buildSlumpShell } from '../src/geo/press';
import { cavityPoint, defaultHollow } from '../src/geo/hollow';
import { buildProfile, defaultFamilyParams, familyById, profileRadius } from '../src/geo/profiles';
import { defaultBuildParams, buildVessel } from '../src/geo/build';
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
      const mesh = buildSlumpShell(params(family), 3, 0);
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
    const mesh = buildSlumpShell(p, shell, 10);
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
    const mesh = buildSlumpShell(p, 3, 0);
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
    const mesh = buildSlumpShell(p, 1.2, 0);
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
