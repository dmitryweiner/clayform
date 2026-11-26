// Текст на боку изделия: до трёх строк по центру, шрифтами клейма. Сам
// текст в состоянии; растр рисует главный поток (`ui/sideTextRaster.ts`) —
// шрифтов и canvas ядро не знает — и отдаёт его сборке и воркеру. Как он
// ложится на стенку — `geo/decal.ts`.

import type { MarkFont } from './mark';
import { MARK_FONTS } from './mark';

export interface SideTextState {
  on: boolean;
  /** строки через перевод строки */
  text: string;
  font: MarkFont;
  /** кегль — высота прописной, мм */
  sizeMm: number;
  /** по кругу от «лица», °, плюс — к носику */
  angleDeg: number;
  /** доля высоты центра надписи */
  heightAt: number;
  /** + выпуклое, − вдавленное, мм */
  depthMm: number;
}

export const SIDE_TEXT_MAX = 80;
export const SIDE_TEXT_LINES = 3;
/** Междустрочие в прописных: строки не слипаются и в глине. */
export const SIDE_TEXT_SPACING = 1.5;

/** Пределы ползунков; санация держит те же. */
export const DECAL_LIMITS = {
  angleDeg: { min: -180, max: 180 },
  heightAt: { min: 0, max: 1 },
  depthMm: { min: -5, max: 5 },
} as const;

export const SIDE_TEXT_SIZE = { min: 3, max: 60 } as const;

export function defaultSideText(): SideTextState {
  return { on: false, text: '', font: 'rubik', sizeMm: 10, angleDeg: 0, heightAt: 0.5, depthMm: 1 };
}

const clamp = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));
const num = (x: unknown, fallback: number): number => (typeof x === 'number' && Number.isFinite(x) ? x : fallback);

export function asRecord(x: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (typeof x === 'object' && x !== null) {
    for (const [key, value] of Object.entries(x)) out[key] = value;
  }
  return out;
}

/** Строки без управляющих символов (перевод строки — можно), не больше трёх и не длиннее предела. */
export function sanitizeSideTextText(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  // oxlint-disable-next-line no-control-regex -- управляющие символы и ищем
  const clean = raw.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f-\u009f]/g, ' ');
  return [...clean.split('\n').slice(0, SIDE_TEXT_LINES).join('\n')].slice(0, SIDE_TEXT_MAX).join('');
}

/** Положение и глубина надписи — общие у текста и картинки. */
export function sanitizePlacement(source: Record<string, unknown>, fallback: { angleDeg: number; heightAt: number; depthMm: number }) {
  const { angleDeg, heightAt, depthMm } = DECAL_LIMITS;
  return {
    angleDeg: clamp(num(source.angleDeg, fallback.angleDeg), angleDeg.min, angleDeg.max),
    heightAt: clamp(num(source.heightAt, fallback.heightAt), heightAt.min, heightAt.max),
    depthMm: clamp(num(source.depthMm, fallback.depthMm), depthMm.min, depthMm.max),
  };
}

export function sanitizeSideText(raw: unknown): SideTextState {
  const source = asRecord(raw);
  const fallback = defaultSideText();
  return {
    on: typeof source.on === 'boolean' ? source.on : fallback.on,
    text: sanitizeSideTextText(source.text),
    font: MARK_FONTS.find((font) => font === source.font) ?? fallback.font,
    sizeMm: clamp(num(source.sizeMm, fallback.sizeMm), SIDE_TEXT_SIZE.min, SIDE_TEXT_SIZE.max),
    ...sanitizePlacement(source, fallback),
  };
}

/** Строки, которые рисуются: пустые края не в счёт, пустые в середине — интервал. */
export function sideTextLines(state: SideTextState): string[] {
  const lines = state.text.split('\n');
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  return lines;
}
