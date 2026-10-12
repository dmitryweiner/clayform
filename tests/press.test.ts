// Отминка: горб по внутренней поверхности изделия и углублённая форма по
// наружной. Проверяем то, от чего зависит, снимется ли пласт и выйдет ли
// изделие заданного размера.

import {
  insetProfile, buildHump, humpSurface, buildSlumpShell, buildPunch, punchLayout, slabThickness, legDistance,
  earTopAt, SLUMP_VENT_MM, PUNCH_LEG_WIDTH_MM, PUNCH_VENT_MM, PUNCH_CLEARANCE_MM, EAR_DROP_MM,
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
      const { mesh } = buildSlumpShell(params(family), defaultHollow(), 3, 0);
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
    const { mesh, fit } = buildSlumpShell(p, defaultHollow(), shell, 10);
    const report = validateMesh(mesh);
    // высота — изделие плюс дно, всё с усадкой
    expect(report.extents[2]).toBeCloseTo((vessel.extents[2] + shell) * 1.1, 1);
    // по венчику снаружи — изделие плюс борт с каждой стороны (ушки не в счёт)
    let radius = 0;
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const u = Math.atan2(mesh.positions[i + 1], mesh.positions[i]);
      if (legDistance(u) <= fit.ear.reach + 1e-6) continue;
      radius = Math.max(radius, Math.hypot(mesh.positions[i], mesh.positions[i + 1]));
    }
    expect(2 * radius).toBeGreaterThan(vessel.extents[0] * 1.1);
    expect(2 * radius).toBeLessThan((vessel.extents[0] + 4 * shell) * 1.1);
    // скорлупа, а не блок: материала куда меньше, чем в полости
    expect(report.volume).toBeLessThan(vessel.volume * 1.331 * 0.3);
  });

  it('снаружи нет цоколя под ножку: стенка идёт к основанию без перехвата', () => {
    const p = params('bowl');
    expect(p.shape.footH).toBeGreaterThan(0);
    const { mesh } = buildSlumpShell(p, defaultHollow(), 3, 0);
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
    const { mesh } = buildSlumpShell(p, defaultHollow(), 1.2, 0);
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
    const { fit } = buildSlumpShell(p, hollow, shell, 0);
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
      const { fit } = buildSlumpShell(p, hollow, shell, 10);
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
      // у горшка и вазы тулово пуансона шире фланца: ушки — на горле
      expect(rMax, family).toBeGreaterThanOrEqual(layout.flangeMm * 1.1 - 1e-3);
      // лапки короткие: ниже всего — пол рабочей поверхности или губа у ушка
      const low = Math.min(layout.lipZ, shell + layout.slabMm);
      expect(report.extents[2], family).toBeCloseTo((layout.flangeZ + layout.flangeT - low) * 1.1, 3);
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

  /** Кластеры углов: между лапками (ушками) дыры больше полутора шагов сетки. */
  const clustersOf = (us: number[], step: number): number[][] => {
    const angles = [...new Set(us.map((u) => u.toFixed(6)))].map(Number).sort((a, b) => a - b);
    const clusters: number[][] = [];
    for (const a of angles) {
      const last = clusters[clusters.length - 1];
      if (last && a - last[last.length - 1] < step * 1.5) last.push(a);
      else clusters.push([a]);
    }
    // кластер через ±π сшиваем
    const tail = clusters[clusters.length - 1];
    if (clusters.length > 1 && angles[0] + 2 * Math.PI - angles[angles.length - 1] < step * 1.5) {
      clusters.pop();
      clusters[0].push(...tail.map((a) => a - 2 * Math.PI));
    }
    return clusters;
  };

  it('у матрицы три ушка под кромкой, верх — на заявленной высоте', () => {
    for (const family of families) {
      const p = params(family);
      const { mesh, fit } = buildSlumpShell(p, hollow, shell, 0);
      const step = (2 * Math.PI) / p.nu;
      const us: number[] = [];
      let rMax = 0;
      let top = -Infinity;
      for (let i = 0; i < mesh.positions.length; i += 3) {
        const r = Math.hypot(mesh.positions[i], mesh.positions[i + 1]);
        // у горшка тулово шире ушек, но ниже их: смотрим только пояс ушка
        if (r < fit.ear.seatInMm || mesh.positions[i + 2] < fit.ear.topZ - EAR_DROP_MM) continue;
        const u = Math.atan2(mesh.positions[i + 1], mesh.positions[i]);
        us.push(u);
        // щёки паза выше ушка; само ушко — где идёт лапка
        if (legDistance(u) > fit.ear.slotReach) continue;
        rMax = Math.max(rMax, r);
        top = Math.max(top, mesh.positions[i + 2]);
      }
      expect(clustersOf(us, step).length, family).toBe(3);
      expect(rMax, family).toBeCloseTo(fit.ear.outerMm, 3);
      expect(top, family).toBeCloseTo(fit.ear.topZ, 3);
      expect(fit.rimZ - fit.ear.topZ, family).toBeGreaterThanOrEqual(EAR_DROP_MM - 1e-6);
      expect(validateMesh(mesh).watertight, family).toBe(true);
    }
  });

  it('над ушком — паз: две щеки почти до кромки, лапка проходит между ними', () => {
    for (const family of families) {
      const p = params(family);
      const { mesh, fit } = buildSlumpShell(p, hollow, shell, 0);
      const { ear } = fit;
      const step = (2 * Math.PI) / p.nu;
      const cheeks: number[] = [];
      for (let i = 0; i < mesh.positions.length; i += 3) {
        const r = Math.hypot(mesh.positions[i], mesh.positions[i + 1]);
        const z = mesh.positions[i + 2];
        if (r < ear.seatInMm || z < ear.topZ + 1 || z > fit.rimZ) continue;
        const u = Math.atan2(mesh.positions[i + 1], mesh.positions[i]);
        cheeks.push(u);
        // щека не заходит туда, где идёт лапка, и оставляет ей пустую ячейку
        expect(legDistance(u), family).toBeGreaterThan(ear.slotReach);
      }
      const clusters = clustersOf(cheeks, step);
      expect(clusters.length, family).toBe(6);
      for (const cluster of clusters) expect(cluster.length, `${family}: щека в линию`).toBeGreaterThan(1);
      // берутся за лапку задолго до посадки, но свес глины над ними не зажат
      expect(ear.cheekZ - ear.topZ, family).toBeGreaterThan(EAR_DROP_MM - 3);
      expect(fit.rimZ - ear.cheekZ, family).toBeGreaterThan(1);
    }
  });

  it('в дне матрицы — сквозная отдушина по оси', () => {
    for (const family of families) {
      const { mesh } = buildSlumpShell(params(family), hollow, shell, 10);
      const report = validateMesh(mesh);
      expect(report.watertight, family).toBe(true);
      expect(report.degenerateTriangles, family).toBe(0);
      const { positions, indices } = mesh;
      let wall = 0;
      for (let t = 0; t < indices.length; t += 3) {
        let x = 0;
        let y = 0;
        for (let k = 0; k < 3; k++) {
          x += positions[indices[t + k] * 3] / 3;
          y += positions[indices[t + k] * 3 + 1] / 3;
        }
        const r = Math.hypot(x, y);
        expect(r, family).toBeGreaterThan((SLUMP_VENT_MM / 2) * 1.1 * 0.95);
        if (r < (SLUMP_VENT_MM / 2) * 1.1) wall++;
      }
      expect(wall, family).toBe(2 * params(family).nu);
    }
  });

  it('три короткие лапки: подошва на ушке, губа обнимает его снаружи', () => {
    for (const family of families) {
      const { p, fit, layout, positions } = working(family);
      const { ear } = fit;
      const step = (2 * Math.PI) / p.nu;
      const legs: { u: number; r: number; z: number }[] = [];
      for (let i = 0; i < positions.length; i += 3) {
        const r = Math.hypot(positions[i], positions[i + 1]);
        const z = positions[i + 2];
        if (z < layout.flangeZ - 0.01 && z > layout.lipZ - 1e-3 && r > ear.seatInMm - 0.5) {
          legs.push({ u: Math.atan2(positions[i + 1], positions[i]), r, z });
        }
      }
      const clusters = clustersOf(legs.map((leg) => leg.u), step);
      expect(clusters.length, family).toBe(3);
      for (const cluster of clusters) {
        expect(cluster.length, `${family}: подошва в линию`).toBeGreaterThan(1);
        const width = Math.max(...cluster) - Math.min(...cluster);
        expect(Math.abs(width - PUNCH_LEG_WIDTH_MM / ear.outerMm), family).toBeLessThanOrEqual(step * 1.01);
      }
      // глубину держит ушко, а не стол
      expect(Math.min(...legs.map((leg) => leg.z)), family).toBeCloseTo(layout.lipZ, 3);
      expect(layout.lipZ, family).toBeGreaterThan(1);
      let contact = 0;
      for (const leg of legs) {
        // лапка целиком над ушком по углу — подошва не съезжает с площадки
        expect(legDistance(leg.u), family).toBeLessThan(ear.legReach + 1e-6);
        // от стенки — на пласт и зазор, под свес глины
        expect(leg.r, family).toBeGreaterThan(ear.seatInMm - 0.31);
        // в ушко не входит: либо снаружи его грани, либо не ниже его верха
        const outside = leg.r >= layout.lipInMm - 0.31 - 1e-3 && leg.r >= ear.outerMm + 1e-3;
        expect(outside || leg.z >= earTopAt(ear, leg.r) - 1e-3, `${family} r=${leg.r} z=${leg.z}`).toBe(true);
        if (Math.abs(leg.z - earTopAt(ear, leg.r)) < 1e-3 && leg.r <= ear.outerMm) contact++;
      }
      expect(contact, `${family}: подошва не легла на ушко`).toBeGreaterThan(0);
      // губа — на зазор от наружной грани ушка
      const lip = legs.filter((leg) => leg.z < ear.topZ - 1);
      expect(Math.min(...lip.map((leg) => leg.r)) - ear.outerMm, family).toBeGreaterThanOrEqual(PUNCH_CLEARANCE_MM - 1e-3);
    }
  });

  it('между лапками фланец узкий: чуть за торец матрицы и висит над ним на пласт', () => {
    for (const family of families) {
      const { fit, layout, positions } = working(family);
      // сечение u = 0 — между лапками (они на −90°, 30° и 150°)
      expect(legDistance(0), family).toBeGreaterThan(fit.ear.reach);
      const flange = section(positions).filter((q) => q.z > fit.rimZ);
      const edge = Math.max(...flange.map((q) => q.r));
      expect(edge, family).toBeGreaterThan(fit.topOuterMm);
      expect(edge, family).toBeLessThan(fit.topOuterMm + 3);
      const under = flange.filter((q) => q.r > fit.rimMm + 1e-3);
      expect(Math.min(...under.map((q) => q.z)), family).toBeCloseTo(layout.flangeZ, 3);
      // а у лапки — во всю ширину
      expect(layout.flangeMm, family).toBeGreaterThan(edge + 5);
    }
  });

  it('«Ушки» задают вынос ушек и лапок', () => {
    const p = params('bowl');
    const small = buildSlumpShell(p, hollow, shell, 0, 4);
    const large = buildSlumpShell(p, hollow, shell, 0, 12);
    expect(large.fit.ear.outerMm - small.fit.ear.outerMm).toBeCloseTo(8, 6);
    const punch = buildPunch(p, hollow, shell, 0, small.fit);
    expect(validateMesh(punch).watertight).toBe(true);
    expect(validateMesh(punch).degenerateTriangles).toBe(0);
    expect(punchLayout(p, hollow, shell, small.fit).flangeMm)
      .toBeLessThan(punchLayout(p, hollow, shell, large.fit).flangeMm - 7.9);
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
    const { fit } = buildSlumpShell(p, hollow, shell, 10);
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
    const plain = buildPunch(base, hollow, shell, 0, buildSlumpShell(base, hollow, shell, 0).fit);
    // матрица с волной шире, и лапки за ней уходят; рабочая поверхность — та же
    const wavy = buildPunch(fancy, hollow, shell, 0, buildSlumpShell(base, hollow, shell, 0).fit);
    expect(Array.from(wavy.positions)).toEqual(Array.from(plain.positions));
    expect(Array.from(wavy.indices)).toEqual(Array.from(plain.indices));
  });

  it('один зажим пласта на горб и пуансон', () => {
    expect(slabThickness(60, 50)).toBe(20);
    const profile = buildProfile('cup', params('cup').shape, 50);
    expect(insetProfile(profile, 50, 60).heightMm).toBeCloseTo(50 - 20, 6);
  });
});
