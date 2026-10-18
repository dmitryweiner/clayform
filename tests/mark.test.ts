// Клеймо на донышке: состояние, раскладка строки по кругу, чтение снизу,
// лого и то, как клеймо садится в изделие, полое изделие, форму и матрицу.

import {
  sanitizeMark, defaultMark, markText, markLayout, markDepth, markActive,
  sanitizeMarkRaster, MARK_TEXT_MAX,
} from '../src/geo/mark';
import type { MarkRaster, MarkState } from '../src/geo/mark';
import { encodeBase64 } from '../src/geo/bytes';
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { buildHollowVessel, defaultHollow } from '../src/geo/hollow';
import { buildSlumpShell } from '../src/geo/press';
import { analyzeMold } from '../src/geo/mold/analyze';
import { defaultFamilyParams, familyById } from '../src/geo/profiles';
import { validateMesh } from '../src/geo/validate';

const strip = (w: number, h: number, ink: (col: number, row: number) => boolean, mmPerPx = 0.1): MarkRaster => {
  const pixels = new Uint8Array(w * h);
  for (let row = 0; row < h; row++) for (let col = 0; col < w; col++) pixels[row * w + col] = ink(col, row) ? 255 : 0;
  return { w, h, pixels, mmPerPx };
};

const mark = (over: Partial<MarkState> = {}): MarkState => ({ ...defaultMark(), on: true, text: 'x', ...over });

const params = (family: string, input?: { state: MarkState; strip: MarkRaster | null }) => ({
  ...defaultBuildParams(),
  family,
  shape: defaultFamilyParams(family),
  heightMm: familyById(family).defaultHeightMm,
  nu: 96,
  nv: 96,
  ...(input ? { mark: input } : {}),
});

/** Лого 8×8: белая левая половина, как она видна снизу. */
const leftHalfLogo = () => {
  const bytes = new Uint8Array(64);
  for (let row = 0; row < 8; row++) for (let col = 0; col < 4; col++) bytes[row * 8 + col] = 255;
  return { image: { w: 8, h: 8, data: encodeBase64(bytes), invert: false }, angleDeg: 0, sizeMm: 20 };
};

describe('состояние клейма', () => {
  it('санатор не бросает на мусоре и идемпотентен', () => {
    for (const raw of [null, 7, 'клеймо', { text: 5, font: 'comic', date: '2026-02-30', logo: { image: 1 } }]) {
      const once = sanitizeMark(raw);
      expect(sanitizeMark(once)).toEqual(once);
      expect(once.font).toBe('rubik');
      expect(once.date).toBeNull();
      expect(once.logo).toBeNull();
    }
    const full = sanitizeMark({ ...mark({ date: '2026-10-18', logo: leftHalfLogo() }) });
    expect(sanitizeMark(full)).toEqual(full);
    expect(full.logo?.sizeMm).toBe(20);
  });

  it('строка без управляющих символов и не длиннее предела', () => {
    expect(sanitizeMark({ text: 'a\nb\tc' }).text).toBe('a b c');
    expect([...sanitizeMark({ text: 'я'.repeat(200) }).text]).toHaveLength(MARK_TEXT_MAX);
  });

  it('дата пишется по-русски при любом языке и встаёт через точку', () => {
    expect(markText(mark({ text: ' Гончар ', date: '2026-10-18' }))).toBe('Гончар · 18.10.2026');
    expect(markText(mark({ text: '', date: '2026-10-18' }))).toBe('18.10.2026');
    expect(markActive(mark({ text: ' ', date: null }))).toBe(false);
  });

  it('растр из сообщения: только целый и в пределах', () => {
    const good = strip(10, 4, () => true);
    expect(sanitizeMarkRaster(good)).toEqual(good);
    expect(sanitizeMarkRaster({ ...good, w: 11 })).toBeNull();
    expect(sanitizeMarkRaster({ ...good, mmPerPx: -1 })).toBeNull();
    expect(sanitizeMarkRaster(null)).toBeNull();
  });
});

describe('раскладка строки', () => {
  it('влезает — кегль как есть, верх букв на отступ от края', () => {
    const layout = markLayout(mark({ marginMm: 2 }), strip(200, 50, () => true), 40);
    expect(layout?.scale).toBe(1);
    expect(layout?.rOut).toBe(38);
    expect(layout?.rIn).toBeCloseTo(33, 6);
    expect(layout?.warnings).toEqual([]);
  });

  it('длиннее окружности — ужимается и предупреждает', () => {
    const layout = markLayout(mark(), strip(4000, 50, () => true), 30);
    expect(layout?.scale).toBeLessThan(1);
    expect(layout?.warnings[0]?.code).toBe('mark.tooLong');
    // ужатая строка укладывается в окружность по средней линии
    const length = 4000 * 0.1 * (layout?.scale ?? 0);
    const mid = ((layout?.rIn ?? 0) + (layout?.rOut ?? 0)) / 2;
    expect(length).toBeLessThanOrEqual(2 * Math.PI * mid);
  });

  it('на крошечном дне строке нет места', () => {
    expect(markLayout(mark({ marginMm: 2 }), strip(100, 50, () => true), 5)?.warnings[0]?.code).toBe('mark.noRoom');
  });
});

describe('оттиск на дне', () => {
  const flat = 40;
  const rMid = 40 - 1.5 - 2.5;

  it('строка читается снизу по часовой от «двенадцати»', () => {
    // чернила только в начале строки
    const input = { state: mark(), strip: strip(300, 50, (col) => col < 30) };
    const depth = markDepth(input, flat);
    expect(depth).not.toBeNull();
    if (!depth) return;
    // снизу ось x зеркальна: чуть по часовой от «двенадцати» — это x < 0
    expect(depth(-1, rMid)).toBeCloseTo(0.5, 3);
    expect(depth(1, rMid)).toBe(0);
  });

  it('угол начала поворачивает строку по часовой', () => {
    const input = { state: mark({ startDeg: 90 }), strip: strip(300, 50, (col) => col < 30) };
    const depth = markDepth(input, flat);
    if (!depth) throw new Error('no depth');
    // «три часа» снизу — это −x в мировых координатах; дальше по часовой — вниз
    expect(depth(-rMid, -1)).toBeCloseTo(0.5, 3);
    expect(depth(-rMid, 1)).toBe(0);
  });

  it('верх букв — к краю дна', () => {
    const input = { state: mark(), strip: strip(300, 50, (_, row) => row < 10) };
    const depth = markDepth(input, flat);
    if (!depth) throw new Error('no depth');
    expect(depth(-0.5, 38)).toBeCloseTo(0.5, 3);
    expect(depth(-0.5, 34)).toBe(0);
  });

  it('лого по центру, как видно снизу', () => {
    const depth = markDepth({ state: mark({ text: '', logo: leftHalfLogo() }), strip: null }, flat);
    if (!depth) throw new Error('no depth');
    // левая половина снизу — это +x
    expect(depth(5, 0)).toBeCloseTo(0.5, 3);
    expect(depth(-5, 0)).toBe(0);
    // за краем картинки — ничего
    expect(depth(15, 0)).toBe(0);
  });

  it('поворот лого — по часовой, как видно снизу', () => {
    const depth = markDepth({ state: mark({ text: '', logo: { ...leftHalfLogo(), angleDeg: 90 } }), strip: null }, flat);
    if (!depth) throw new Error('no depth');
    // левая половина, повёрнутая по часовой на 90°, смотрит вверх
    expect(depth(0, 5)).toBeCloseTo(0.5, 3);
    expect(depth(0, -5)).toBe(0);
  });
});

describe('клеймо в изделии', () => {
  const input = () => ({ state: mark({ depthMm: 1 }), strip: strip(400, 50, (col) => col % 40 < 20) });

  it('сплошное изделие: замкнуто, клеймо вдавлено', () => {
    const plain = validateMesh(buildVessel(params('pot')));
    const marked = validateMesh(buildVessel(params('pot', input())));
    expect(marked.watertight).toBe(true);
    expect(marked.volume).toBeLessThan(plain.volume);
    expect(marked.bbox.min[2]).toBeCloseTo(0, 6);
  });

  it('полое изделие: оттиск не проедает дно глубже минимальной стенки', () => {
    const hollow = { ...defaultHollow(), baseMm: 1.2 };
    const deep = { state: mark({ depthMm: 1.5 }), strip: strip(400, 50, () => true) };
    const { mesh } = buildHollowVessel(params('pot', deep), hollow);
    const report = validateMesh(mesh);
    expect(report.watertight).toBe(true);
    // вершины наружного дна (z < пола) не выше пола минус 0,6 мм
    let highest = 0;
    for (let i = 2; i < mesh.positions.length; i += 3) {
      const z = mesh.positions[i];
      if (z < 1.2 - 1e-6) highest = Math.max(highest, z);
    }
    expect(highest).toBeLessThanOrEqual(1.2 - 0.6 + 1e-6);
    expect(highest).toBeGreaterThan(0.5);
  });

  it('форма с клеймом — всегда с донной плитой', () => {
    const vessel = buildVessel(params('vase'));
    expect(analyzeMold(vessel, { hasHandle: false }).scheme).toBe('halves');
    const report = analyzeMold(vessel, { hasHandle: false, bottomMark: true });
    expect(report.scheme).toBe('halves-bottom');
    expect(report.reason.map((m) => m.code)).toContain('mold.markBase');
  });

  it('в матрице отминки клеймо выпуклое, отдушина сквозь лого', () => {
    const shell = 3;
    const withLogo = { state: mark({ text: '', logo: leftHalfLogo() }), strip: null };
    const { mesh } = buildSlumpShell(params('bowl', withLogo), defaultHollow(), shell, 0);
    expect(validateMesh(mesh).watertight).toBe(true);
    // пол полости — на высоте дна; под лого он приподнят на глубину оттиска
    let raised = 0;
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const r = Math.hypot(mesh.positions[i], mesh.positions[i + 1]);
      if (r > 2 && r < 8 && mesh.positions[i + 2] > shell + 0.4) raised++;
    }
    expect(raised).toBeGreaterThan(0);
  });
});
