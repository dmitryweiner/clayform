// Вогнутое дно: наружное дно уходит внутрь изделия, а стоит оно на краю.
//
// Два вида. Сфера занимает всё плоское дно: изделие стоит на окружности его
// края, параметр — радиус сферы. Утопленное плоское дно оставляет на столе
// пояс заданной ширины, а внутри него поднимается на глубину; оба угла
// ступеньки скругляет один радиус. Наружную кромку дна по-прежнему
// скругляет «Скругление дна» силуэта — сюда приходит уже радиус плоского
// дна после него.
//
// Всё здесь — осевое сечение: ломаная от оси к краю дна, z — подъём над
// столом. По нему `geo/bottom.ts` строит сетку дна, а полость — свой пол:
// дно остаётся пластиной ровной толщины, выгнутой внутрь вместе с ним.

import type { Message } from './message';

export const CONCAVE_KINDS = ['sphere', 'flat'] as const;
export type ConcaveKind = (typeof CONCAVE_KINDS)[number];

export interface ConcaveState {
  on: boolean;
  kind: ConcaveKind;
  /** радиус сферы, мм */
  radiusMm: number;
  /** глубина утопленного дна, мм */
  depthMm: number;
  /** ширина пояса, которым изделие стоит на столе, мм */
  ringMm: number;
  /** радиус скругления обоих углов ступеньки, мм */
  filletMm: number;
}

interface Limit {
  min: number;
  max: number;
}

/** Пределы ползунков: одни и те же для UI и для санатора. */
export const CONCAVE_LIMITS: Record<'radiusMm' | 'depthMm' | 'ringMm' | 'filletMm', Limit> = {
  radiusMm: { min: 20, max: 100 },
  depthMm: { min: 0, max: 10 },
  ringMm: { min: 0.5, max: 5 },
  filletMm: { min: 0, max: 5 },
};

export function defaultConcave(): ConcaveState {
  return { on: false, kind: 'sphere', radiusMm: 100, depthMm: 3, ringMm: 3, filletMm: 1.5 };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

export function sanitizeConcave(raw: unknown): ConcaveState {
  const fallback = defaultConcave();
  const source: Record<string, unknown> = {};
  if (typeof raw === 'object' && raw !== null) {
    for (const [key, value] of Object.entries(raw)) source[key] = value;
  }
  const within = (key: keyof typeof CONCAVE_LIMITS): number => {
    const value = source[key];
    const limit = CONCAVE_LIMITS[key];
    return clamp(typeof value === 'number' && Number.isFinite(value) ? value : fallback[key], limit.min, limit.max);
  };
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    kind: source.kind === 'flat' ? 'flat' : 'sphere',
    radiusMm: within('radiusMm'),
    depthMm: within('depthMm'),
    ringMm: within('ringMm'),
    filletMm: within('filletMm'),
  };
}

/** Точка осевого сечения: радиус и подъём над столом, мм. */
export interface SectionPoint {
  r: number;
  z: number;
}

export interface ConcaveLayout {
  /** сечение наружного дна от оси `(0, depthMm)` к краю `(footprintMm, 0)`; r не убывает */
  section: SectionPoint[];
  /** фактическая глубина, мм */
  depthMm: number;
  /** радиус участка, на котором клеймо: утопленный круг или всё дно */
  markMm: number;
  /** радиус плоского дна — край, на котором изделие стоит */
  footprintMm: number;
}

/** Глубже четверти высоты вогнутость не бывает: это уже не дно, а второе дно. */
const DEPTH_SHARE = 0.25;
/** Утопленный круг уже этого — не круг, а ямка. */
const RECESS_MIN_MM = 2;
/** Шаг ломаной по дугам, мм. */
const ARC_STEP_MM = 0.1;
/** Шаг ломаной по сфере, мм: хорда на R = 20 отходит от дуги на 0,4 мкм. */
const SPHERE_STEP_MM = 0.25;
const SPHERE_MAX_POINTS = 4000;

/** Раскладка и сказанное о ней: что не вышло так, как просили. */
function plan(state: ConcaveState | undefined, flatMm: number, heightMm: number): { layout: ConcaveLayout | null; warnings: Message[] } {
  if (!state || !state.on || !(flatMm > 0)) return { layout: null, warnings: [] };
  const a = flatMm;
  const limit = Math.max(0, heightMm) * DEPTH_SHARE;
  const tooDeep = (d: number): Message => ({ code: 'concave.tooDeep', params: { d: d.toFixed(1) } });

  if (state.kind === 'sphere') {
    // глубже полусферы сфера через край дна не уйдёт
    const reach = Math.min(limit, a);
    const smallest = (a * a + reach * reach) / (2 * reach);
    const R = Math.max(state.radiusMm, smallest);
    const depthMm = R - Math.sqrt(Math.max(0, R * R - a * a));
    const reachAngle = Math.asin(Math.min(1, a / R));
    const n = Math.min(SPHERE_MAX_POINTS, Math.max(16, Math.ceil((R * reachAngle) / SPHERE_STEP_MM)));
    const section: SectionPoint[] = [];
    for (let k = 0; k <= n; k++) {
      const angle = (reachAngle * k) / n;
      section.push({ r: R * Math.sin(angle), z: depthMm - R + R * Math.cos(angle) });
    }
    // концы — ровно на оси и ровно на крае дна, без погрешности синусов
    section[0] = { r: 0, z: depthMm };
    section[n] = { r: a, z: 0 };
    const layout = { section, depthMm, markMm: a, footprintMm: a };
    return { layout, warnings: R > state.radiusMm ? [tooDeep(depthMm)] : [] };
  }

  // глубина 0 — дно плоское: тот же путь, что без вогнутости
  if (!(state.depthMm > 0)) return { layout: null, warnings: [] };
  const rc = a - state.ringMm;
  if (rc < RECESS_MIN_MM) return { layout: null, warnings: [{ code: 'concave.noRoom' }] };
  const depthMm = Math.min(state.depthMm, limit);
  const f = Math.min(state.filletMm, (rc - RECESS_MIN_MM) / 2);
  // мелкое дно: отвесного куска нет, две дуги смыкаются под углом θ
  const theta = depthMm >= 2 * f ? Math.PI / 2 : Math.acos(1 - depthMm / (2 * f));
  const rho = rc - 2 * f * Math.sin(theta);
  const steps = Math.max(2, Math.ceil((f * theta) / ARC_STEP_MM));

  const section: SectionPoint[] = [];
  const push = (r: number, z: number): void => {
    const last = section[section.length - 1];
    if (!last || last.r !== r || last.z !== z) section.push({ r, z });
  };
  push(0, depthMm);
  push(rho, depthMm);
  // вогнутая дуга: центр (ρ, d − f), от верха утопленного круга вниз
  for (let k = 1; k <= steps; k++) {
    const psi = (theta * k) / steps;
    push(rho + f * Math.sin(psi), depthMm - f + f * Math.cos(psi));
  }
  // выпуклая дуга: центр (rc, f); при θ = π/2 между дугами — отвесная стенка
  for (let k = steps; k >= 0; k--) {
    const phi = (theta * k) / steps;
    push(rc - f * Math.sin(phi), f - f * Math.cos(phi));
  }
  push(a, 0);
  const layout = { section, depthMm, markMm: rho, footprintMm: a };
  return { layout, warnings: depthMm < state.depthMm ? [tooDeep(depthMm)] : [] };
}

/**
 * Сечение вогнутого дна на плоском дне радиуса `flatMm` у изделия высотой
 * `heightMm`. null — вогнутости нет: выключена или ей нет места.
 */
export function concaveLayout(state: ConcaveState | undefined, flatMm: number, heightMm: number): ConcaveLayout | null {
  return plan(state, flatMm, heightMm).layout;
}

/** Предупреждения вогнутости для панели — те же, что видит сборка. */
export function concaveWarnings(state: ConcaveState | undefined, flatMm: number, heightMm: number): Message[] {
  return plan(state, flatMm, heightMm).warnings;
}

/** Пол полости над вогнутым дном. */
export interface ConcaveFloor {
  /** высота пола над столом на радиусе r, мм */
  heightAt: (r: number) => number;
  /** сечение пола от оси до радиуса `edgeMm` (края пола у стенки полости) */
  section(edgeMm: number): SectionPoint[];
}

/** Шаг выборки пола по радиусу, мм. */
const FLOOR_STEP_MM = 0.1;
/** Отвесная стенка пола выбирается двумя точками в стольких мм по обе стороны. */
const JUMP_MM = 1e-4;
/** Точка ломаной, отстоящая от хорды соседей меньше этого, лишняя. */
const SIMPLIFY_MM = 1e-4;

/**
 * Пол полости: наружное дно, смещённое на `thicknessMm` по нормали внутрь
 * материала. Это верхняя огибающая окружностей радиуса b вокруг точек
 * сечения — одна формула на оба вида и на вырожденные углы: где выпуклый
 * угол уже толщины, острый угол получается сам, у вогнутого — дуга радиуса
 * f + b. За краем дна сечение продолжается столом, поэтому дальше пол — на
 * высоте b, как плоский пол без вогнутости.
 *
 * Отвесный кусок пола (над отвесной стенкой ступеньки) функцией от r не
 * выразить: огибающая выбирается густо, а у стенки — двумя точками по обе
 * стороны от неё.
 */
export function concaveFloor(layout: ConcaveLayout, thicknessMm: number): ConcaveFloor {
  const b = Math.max(0, thicknessMm);
  const outer = [...layout.section, { r: layout.footprintMm + 2 * b + 1, z: 0 }];
  const reach = layout.footprintMm + b;

  const envelope = (r: number): number => {
    let top = b;
    // r по сечению не убывает: дальние от r на b куски не нужны
    let lo = 0;
    let hi = outer.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (outer[mid].r < r - b) lo = mid + 1;
      else hi = mid;
    }
    for (let i = Math.max(1, lo); i < outer.length; i++) {
      const p = outer[i - 1];
      const q = outer[i];
      if (p.r > r + b) break;
      // смещённый отрезок: нормаль слева по ходу от оси наружу — в материал
      const dr = q.r - p.r;
      const dz = q.z - p.z;
      const len = Math.hypot(dr, dz);
      if (len > 0 && dr > 0) {
        const nr = -dz / len;
        const nz = dr / len;
        const r0 = p.r + b * nr;
        const r1 = q.r + b * nr;
        if (r >= r0 && r <= r1) top = Math.max(top, p.z + b * nz + ((r - r0) / (r1 - r0)) * dz);
      }
      // окружности вокруг концов
      const dp = r - p.r;
      if (Math.abs(dp) <= b) top = Math.max(top, p.z + Math.sqrt(b * b - dp * dp));
    }
    const last = outer[outer.length - 1];
    const dl = r - last.r;
    if (Math.abs(dl) <= b) top = Math.max(top, last.z + Math.sqrt(b * b - dl * dl));
    return top;
  };

  // радиусы выборки: равномерно плюс по обе стороны от каждой отвесной стенки
  const radii = new Set<number>();
  for (let r = 0; r < reach; r += FLOOR_STEP_MM) radii.add(r);
  radii.add(reach);
  for (let i = 1; i < outer.length; i++) {
    if (outer[i].r === outer[i - 1].r) {
      const jump = outer[i].r + b;
      radii.add(Math.max(0, jump - JUMP_MM));
      radii.add(jump + JUMP_MM);
    }
  }
  const sampled = [...radii].sort((x, y) => x - y).map((r) => ({ r, z: envelope(r) }));
  const points = simplify(sampled);

  const heightAt = (r: number): number => {
    if (r >= reach) return b;
    if (r <= 0) return points[0].z;
    let lo = 0;
    let hi = points.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (points[mid].r <= r) lo = mid;
      else hi = mid;
    }
    const p = points[lo];
    const q = points[hi];
    return q.r > p.r ? p.z + ((r - p.r) / (q.r - p.r)) * (q.z - p.z) : q.z;
  };

  return {
    heightAt,
    section(edgeMm) {
      const out = points.filter((p) => p.r < edgeMm);
      out.push({ r: edgeMm, z: heightAt(edgeMm) });
      return out;
    },
  };
}

/** Ломаная без точек, лежащих на прямой между соседями. */
function simplify(points: SectionPoint[]): SectionPoint[] {
  if (points.length < 3) return points;
  const out = [points[0]];
  for (let i = 1; i + 1 < points.length; i++) {
    const p = out[out.length - 1];
    const c = points[i];
    const q = points[i + 1];
    const dr = q.r - p.r;
    const dz = q.z - p.z;
    const len = Math.hypot(dr, dz);
    const off = len > 0 ? Math.abs((c.r - p.r) * dz - (c.z - p.z) * dr) / len : 0;
    if (off > SIMPLIFY_MM) out.push(c);
  }
  out.push(points[points.length - 1]);
  return out;
}
