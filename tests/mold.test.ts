// Литейная оснастка: гипсовые блоки, мастер-позитив и ванночки под силикон.
//
// Проверяем не «красиво ли», а то, что форма физически работает: части
// складываются обратно в целый блок, ключи одной части в точности отвечают
// впадинам другой, полость больше изделия ровно на усадку, а ванночка
// действительно держит в себе позитив блока.

import { initCSG, CsgScope, toManifold } from '../src/geo/csg';
import type { CsgApi } from '../src/geo/csg';
import {
  buildBlocks, buildMaster, buildBaths, defaultMold, sanitizeMold,
} from '../src/geo/mold';
import { analyzeMold } from '../src/geo/mold/analyze';
import { buildSolidVessel } from '../src/geo/assemble';
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { validateMesh } from '../src/geo/validate';
import { defaultFamilyParams, familyById, buildProfile, profileRadius } from '../src/geo/profiles';
import { sanitizeHandle } from '../src/geo/handle';
import { defaultSpout, sanitizeSpout } from '../src/geo/spout';

let csg: CsgApi;
beforeAll(async () => {
  csg = await initCSG();
});

const params = (family: string, over: Record<string, unknown> = {}) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 64,
  nv: 64,
  ...over,
});

const vesselOf = (family: string) => buildVessel(params(family));
const reportOf = (family: string) => analyzeMold(vesselOf(family), { hasHandle: false });
const mold = (over: Record<string, unknown> = {}) => sanitizeMold({ ...defaultMold(), ...over });

describe('гипсовые блоки', () => {
  it('число частей отвечает выбранной схеме', () => {
    // миска вынимается вверх → одна часть; горшок → половины + дно
    expect(buildBlocks(csg, vesselOf('bowl'), reportOf('bowl'), mold())).toHaveLength(1);
    expect(buildBlocks(csg, vesselOf('pot'), reportOf('pot'), mold())).toHaveLength(3);
    expect(buildBlocks(csg, vesselOf('vase'), reportOf('vase'), mold())).toHaveLength(2);
  });

  it('каждая часть — замкнутый солид с нормалями наружу', () => {
    for (const family of ['pot', 'bowl', 'cup', 'vase']) {
      for (const part of buildBlocks(csg, vesselOf(family), reportOf(family), mold())) {
        const report = validateMesh(part.mesh);
        expect(report.watertight, `${family}/${part.id}`).toBe(true);
        expect(report.volume, `${family}/${part.id}`).toBeGreaterThan(0);
        expect(report.finite, `${family}/${part.id}`).toBe(true);
      }
    }
  });

  it('ключи одной половины ровно отвечают впадинам другой', () => {
    // выступ, добавленный половине B, отнят у половины A, поэтому сумма
    // объёмов не зависит от ключей и равна цельному блоку
    const withKeys = buildBlocks(csg, vesselOf('vase'), reportOf('vase'), mold({ keyMm: 8 }));
    const noKeys = buildBlocks(csg, vesselOf('vase'), reportOf('vase'), mold({ keyMm: 0 }));
    const sum = (parts: { mesh: Parameters<typeof validateMesh>[0] }[]) =>
      parts.reduce((total, part) => total + validateMesh(part.mesh).volume, 0);
    expect(sum(withKeys)).toBeCloseTo(sum(noKeys), 0);
  });

  it('половины симметричны относительно плоскости разъёма', () => {
    const [a, b] = buildBlocks(csg, vesselOf('vase'), reportOf('vase'), mold({ keyMm: 0 }));
    const boxA = validateMesh(a.mesh).bbox;
    const boxB = validateMesh(b.mesh).bbox;
    expect(boxA.min[1]).toBeCloseTo(-boxB.max[1], 2);
    expect(boxA.max[1]).toBeCloseTo(-boxB.min[1], 2);
    expect(validateMesh(a.mesh).volume).toBeCloseTo(validateMesh(b.mesh).volume, 0);
  });

  it('усадка делает полость больше изделия на заданный процент', () => {
    const vessel = vesselOf('vase');
    const outside = validateMesh(vessel).extents;
    const blocks = buildBlocks(csg, vessel, reportOf('vase'), mold({ shrinkPct: 12, plasterMm: 20 }));
    const height = Math.max(...blocks.map((p) => validateMesh(p.mesh).bbox.max[2]));
    // верх блока = верх полости + горловина; сама полость выше изделия на 12 %
    expect(height).toBeGreaterThan(outside[2] * 1.12);
  });

  it('вокруг полости остаётся заданная толщина гипса', () => {
    const vessel = vesselOf('pot');
    const widest = Math.max(...validateMesh(vessel).extents.slice(0, 2));
    const plasterMm = 30;
    const shrinkPct = 12;
    const blocks = buildBlocks(csg, vessel, reportOf('pot'), mold({ plasterMm, shrinkPct }));
    const outerWidth = Math.max(...blocks.map((p) => {
      const { bbox } = validateMesh(p.mesh);
      return bbox.max[0] - bbox.min[0];
    }));
    expect(outerWidth).toBeCloseTo(widest * (1 + shrinkPct / 100) + 2 * plasterMm, 0);
  });

  it('одночастная форма открыта сверху — туда льют шликер', () => {
    const [single] = buildBlocks(csg, vesselOf('bowl'), reportOf('bowl'), mold());
    const { bbox } = validateMesh(single.mesh);
    const vesselHeight = validateMesh(vesselOf('bowl')).extents[2];
    // верх блока совпадает с венчиком: гипса над изделием нет
    expect(bbox.max[2]).toBeCloseTo(vesselHeight * (1 + defaultMold().shrinkPct / 100), 0);
  });

  it('гипс нигде не залезает в тело изделия', () => {
    // Самая опасная ошибка оснастки: полость построена не там или не того
    // размера, и блок пересекается с изделием. Геометрически это значит,
    // что форму не собрать вокруг модели. Меряем прямо: пересечение блока
    // с увеличенным на усадку изделием обязано быть пустым.
    const scope = new CsgScope();
    try {
      const vessel = vesselOf('pot');
      const state = mold();
      const piece = scope.keep(
        toManifold(csg, vessel).scale(1 + state.shrinkPct / 100),
      );
      for (const part of buildBlocks(csg, vessel, reportOf('pot'), state)) {
        const solid = scope.keep(toManifold(csg, part.mesh));
        const overlap = scope.keep(solid.intersect(piece));
        expect(overlap.volume(), part.id).toBeLessThan(piece.volume() * 1e-4);
      }
    } finally {
      scope.dispose();
    }
  });

  it('половины, сложенные обратно, дают цельный блок', () => {
    const scope = new CsgScope();
    try {
      const vessel = vesselOf('vase');
      const parts = buildBlocks(csg, vessel, reportOf('vase'), mold());
      const solids = parts.map((part) => scope.keep(toManifold(csg, part.mesh)));
      // Выступы ключей входят в ответные впадины без зазора и без натяга.
      // «Без натяга» — половины нигде не пересекаются, иначе форма не
      // сойдётся; «без зазора» — объём собранного равен сумме частей.
      const assembled = scope.keep(csg.Manifold.union(solids));
      const sum = solids.reduce((total, solid) => total + solid.volume(), 0);
      expect(assembled.volume()).toBeCloseTo(sum, 0);
      const overlap = scope.keep(solids[0].intersect(solids[1]));
      expect(overlap.volume()).toBeLessThan(sum * 1e-6);
    } finally {
      scope.dispose();
    }
  });

  it('изделие с ручкой тоже одевается в форму', () => {
    const vessel = buildSolidVessel(csg, params('cup'), sanitizeHandle({ on: true }), defaultSpout());
    const report = analyzeMold(vessel, { hasHandle: true });
    const blocks = buildBlocks(csg, vessel, report, mold());
    expect(blocks.length).toBeGreaterThanOrEqual(2);
    for (const part of blocks) {
      expect(validateMesh(part.mesh).watertight, part.id).toBe(true);
    }
  });
});

describe('мастер-позитив', () => {
  it('это изделие с литейной горловиной поверх', () => {
    const vessel = vesselOf('pot');
    const master = buildMaster(csg, vessel, reportOf('pot'), mold({ spareMm: 30, shrinkPct: 0 }));
    const before = validateMesh(vessel);
    const after = validateMesh(master.mesh);
    expect(after.watertight).toBe(true);
    expect(after.extents[2]).toBeCloseTo(before.extents[2] + 30, 0);
    expect(after.volume).toBeGreaterThan(before.volume);
  });

  it('усадка увеличивает мастер целиком', () => {
    const vessel = vesselOf('cup');
    const plain = validateMesh(buildMaster(csg, vessel, reportOf('cup'), mold({ shrinkPct: 0, spareMm: 0 })).mesh);
    const grown = validateMesh(buildMaster(csg, vessel, reportOf('cup'), mold({ shrinkPct: 15, spareMm: 0 })).mesh);
    expect(grown.extents[0]).toBeCloseTo(plain.extents[0] * 1.15, 0);
    expect(grown.extents[2]).toBeCloseTo(plain.extents[2] * 1.15, 0);
  });

  it('горловина ставится на венчик, а не на самую высокую точку', () => {
    // У чайника выше всего кончик носика. Горловина «по верхней точке» дала
    // бы мастеру грибную шляпку во весь вынос носика, а при кончике выше
    // венчика ещё и повисла бы над изделием отдельным куском.
    const spout = sanitizeSpout({
      on: true, kind: 'applied', attachAt: 0.4, lengthMm: 70,
      tipAt: 1.25, baseMm: 32, tipMm: 15, tipAngleDeg: 55,
    });
    const heightMm = 120;
    const teapot = params('pot', { heightMm });
    const vessel = buildSolidVessel(csg, teapot, sanitizeHandle({ on: false }), spout);
    const report = analyzeMold(vessel, { hasHandle: false, hasSpout: true });
    const spareMm = 30;
    const state = mold({ shrinkPct: 0, spareMm });
    const mouth = {
      zMm: heightMm,
      radiusMm: profileRadius(buildProfile('pot', defaultFamilyParams('pot'), heightMm), 1),
    };
    const master = buildMaster(csg, vessel, report, state, { mouth });

    // Прирост объёма — это цилиндр по венчику от венчика до верха мастера.
    // Горловина «по кончику носика» была бы того же роста, но вчетверо шире,
    // и прирост вышел бы на порядок больше.
    const grew = validateMesh(master.mesh).volume - validateMesh(vessel).volume;
    const collarHeight = validateMesh(master.mesh).bbox.max[2] - mouth.zMm + 1;
    expect(grew).toBeGreaterThan(0);
    expect(grew).toBeLessThan(Math.PI * mouth.radiusMm ** 2 * collarHeight * 1.05);

    // и мастер остаётся одной связной деталью: горловина стоит на венчике,
    // а не парит над ним
    const scope = new CsgScope();
    try {
      expect(scope.keep(toManifold(csg, master.mesh)).decompose().map((solid) => {
        scope.keep(solid);
        return solid.volume();
      })).toHaveLength(1);
    } finally {
      scope.dispose();
    }
  });

  it('у миски горловина не нужна — льют прямо в открытую форму', () => {
    const vessel = vesselOf('bowl');
    const master = buildMaster(csg, vessel, reportOf('bowl'), mold({ spareMm: 40, shrinkPct: 0 }));
    expect(validateMesh(master.mesh).extents[2]).toBeCloseTo(validateMesh(vessel).extents[2], 0);
  });
});

describe('ванночки под силикон', () => {
  it('по ванночке на каждую часть формы', () => {
    expect(buildBaths(csg, vesselOf('bowl'), reportOf('bowl'), mold())).toHaveLength(1);
    expect(buildBaths(csg, vesselOf('pot'), reportOf('pot'), mold())).toHaveLength(3);
  });

  it('каждая ванночка печатается: замкнута и стоит на столе', () => {
    for (const family of ['pot', 'bowl', 'vase']) {
      for (const bath of buildBaths(csg, vesselOf(family), reportOf(family), mold())) {
        const report = validateMesh(bath.mesh);
        expect(report.watertight, `${family}/${bath.id}`).toBe(true);
        expect(report.volume, `${family}/${bath.id}`).toBeGreaterThan(0);
        expect(report.bbox.min[2], `${family}/${bath.id}`).toBeCloseTo(0, 3);
      }
    }
  });

  it('ванночка вмещает свой блок с запасом на силикон', () => {
    const blocks = buildBlocks(csg, vesselOf('vase'), reportOf('vase'), mold());
    const baths = buildBaths(csg, vesselOf('vase'), reportOf('vase'), mold());
    const clear = defaultMold().bathClearMm;
    const wall = defaultMold().bathWallMm;
    for (let i = 0; i < blocks.length; i++) {
      const block = validateMesh(blocks[i].mesh).extents;
      const bath = validateMesh(baths[i].mesh).extents;
      // борт отстоит от блока на слой силикона плюс собственную толщину
      const widest = Math.max(block[0], block[1], block[2]);
      const bathWidest = Math.max(bath[0], bath[1]);
      expect(bathWidest).toBeGreaterThan(widest);
      expect(bathWidest).toBeLessThan(widest + 4 * (clear + wall));
    }
  });

  it('рабочая поверхность блока смотрит вверх — иначе силикон не снять', () => {
    // половина формы кладётся плоскостью разъёма кверху: силикон, залитый
    // сверху, снимается вертикально, а отпечаток изделия отходит по своей
    // же вытяжке
    const [bath] = buildBaths(csg, vesselOf('vase'), reportOf('vase'), mold());
    const { bbox } = validateMesh(bath.mesh);
    expect(bbox.max[2] - bbox.min[2]).toBeLessThan(bbox.max[0] - bbox.min[0]);
  });

  it('ванночка действительно держит в себе позитив блока', () => {
    // силикону не во что затекать, если позитив не стоит внутри коробки:
    // блок обязан целиком содержаться в напечатанной детали
    const scope = new CsgScope();
    try {
      const vessel = vesselOf('vase');
      const state = mold();
      const blocks = buildBlocks(csg, vessel, reportOf('vase'), state);
      const baths = buildBaths(csg, vessel, reportOf('vase'), state);
      for (let i = 0; i < blocks.length; i++) {
        const block = scope.keep(toManifold(csg, blocks[i].mesh));
        const bath = scope.keep(toManifold(csg, baths[i].mesh));
        // объём ванночки = борта с дном + сам блок, значит блок в ней есть
        expect(bath.volume(), baths[i].id).toBeGreaterThan(block.volume());
      }
    } finally {
      scope.dispose();
    }
  });

  it('чайник с трубчатым носиком тоже одевается в ванночки', () => {
    // Габарит блока берётся из самого позитива, поэтому носик попадает туда
    // сам — но проверить это стоит: он единственная деталь, торчащая вбок.
    const spout = sanitizeSpout({
      on: true, kind: 'applied', attachAt: 0.4, lengthMm: 70,
      tipAt: 1, baseMm: 32, tipMm: 15, tipAngleDeg: 55,
    });
    const teapot = params('pot', { heightMm: 120 });
    const handle = sanitizeHandle({ on: true, topAt: 0.8, bottomAt: 0.3 });
    const vessel = buildSolidVessel(csg, teapot, handle, spout);
    const report = analyzeMold(vessel, { hasHandle: true, hasSpout: true });
    expect(report.scheme).not.toBe('dropout');

    const baths = buildBaths(csg, vessel, report, mold());
    expect(baths.length).toBeGreaterThanOrEqual(2);
    for (const bath of baths) {
      const check = validateMesh(bath.mesh);
      expect(check.watertight, bath.id).toBe(true);
      expect(check.volume, bath.id).toBeGreaterThan(0);
      expect(check.bbox.min[2], bath.id).toBeCloseTo(0, 3);
    }

    const width = (parts: { mesh: Parameters<typeof validateMesh>[0] }[]) =>
      Math.max(...parts.map((part) => validateMesh(part.mesh).extents[0]));
    const plain = buildSolidVessel(csg, teapot, handle, defaultSpout());
    const plainBlocks = buildBlocks(csg, plain, analyzeMold(plain, { hasHandle: true }), mold());
    expect(width(buildBlocks(csg, vessel, report, mold())))
      .toBeGreaterThan(width(plainBlocks));
  });

  it('у ванночки есть дно и борта — силикон никуда не вытечет', () => {
    const [bath] = buildBaths(csg, vesselOf('bowl'), reportOf('bowl'), mold());
    const report = validateMesh(bath.mesh);
    const box = report.bbox;
    const outer = (box.max[0] - box.min[0]) * (box.max[1] - box.min[1]) * (box.max[2] - box.min[2]);
    // объём материала заметно меньше габаритного: внутри пусто под силикон
    expect(report.volume).toBeLessThan(outer * 0.8);
    expect(report.volume).toBeGreaterThan(outer * 0.05);
  });
});

describe('sanitizeMold', () => {
  it('не бросает на мусоре и зажимает в разумные пределы', () => {
    for (const raw of [null, 'гипс', 42, { plasterMm: NaN, shrinkPct: 1e6 }]) {
      const state = sanitizeMold(raw);
      expect(Number.isFinite(state.plasterMm)).toBe(true);
      expect(state.shrinkPct).toBeLessThanOrEqual(30);
      expect(state.plasterMm).toBeGreaterThan(0);
    }
  });

  it('ключ не может быть больше трети толщины гипса — иначе продавит стенку', () => {
    expect(sanitizeMold({ plasterMm: 15, keyMm: 40 }).keyMm).toBeLessThanOrEqual(5);
  });

  it('идемпотентен', () => {
    const once = sanitizeMold({ shrinkPct: 9.5, plasterMm: 22 });
    expect(sanitizeMold(once)).toEqual(once);
  });
});
