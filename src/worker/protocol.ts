// Задачи CSG-воркера и их проверка. Конверт сообщений, очередь и ответы —
// китовые (`maker-kit/worker/*`); здесь — что именно считать и что
// возвращается.
//
// Всё, что уходит в воркер, — это состояние приложения целиком: воркер сам
// прогоняет его через sanitizeState и сам решает, что из него строить.
// Граница воркера — такая же внешняя граница ядра, как ссылка или
// localStorage.

import type { AppState } from '../state/schema';
import type { Message } from '../geo/message';
import type { MarkRaster } from '../geo/mark';

/**
 * Задача воркеру. Обе — про булевы операции, ради которых он и заведён:
 * точное превью изделия на огрублённой сетке и экспортная сборка на полной.
 */
export type CsgJob = ({ kind: 'vessel-preview'; state: AppState; segments: number } | { kind: 'export'; state: AppState }) & {
  /**
   * Растр строки клейма. Шрифты есть только у главного потока, поэтому
   * строку рисует он; это производное от состояния, а не его часть, и
   * воркер проверяет у растра только размеры (`sanitizeMarkRaster`).
   */
  markStrip?: MarkRaster | null;
};

/**
 * Готовая деталь: меш плюс всё, что о ней показывает панель. Название панель
 * выводит из `id` сама — воркер языка не знает.
 */
export interface JobPart {
  id: string;
  /** габарит «Ш×Г×В» в мм, без единиц (их подпишет панель); пусто, если нечего сказать */
  note: string;
  positions: Float32Array;
  indices: Uint32Array;
  normals: Float32Array;
  /** что мешает выгрузить деталь в STL; у превью всегда пусто */
  blockers: Message[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Проверка задачи на границе воркера (`serveJobs` отвечает на чужую
 * ошибкой). Состояние только объект: его по полям чистит sanitizeState;
 * растр клейма — объект или пусто: его размеры проверит sanitizeMarkRaster.
 */
export function isCsgJob(job: unknown): job is CsgJob {
  if (!isRecord(job) || !isRecord(job.state)) return false;
  if (job.markStrip !== undefined && job.markStrip !== null && !isRecord(job.markStrip)) return false;
  if (job.kind === 'export') return true;
  return job.kind === 'vessel-preview' && typeof job.segments === 'number' && Number.isFinite(job.segments);
}
