// Протокол разговора с CSG-воркером. Только типы: исполняемого кода здесь
// нет намеренно — тестировать в этом файле нечего, а обе стороны границы
// (main и воркер) должны видеть одно и то же описание сообщений.
//
// Всё, что уходит в воркер, — это состояние приложения целиком: воркер сам
// прогоняет его через sanitizeState и сам решает, что из него строить.
// Граница воркера — такая же внешняя граница ядра, как ссылка или
// localStorage.

import type { AppState } from '../state/schema';

/**
 * Задача воркеру. Обе — про булевы операции, ради которых он и заведён:
 * превью оснастки на огрублённой сетке и экспортная сборка на полной.
 */
export type CsgJob =
  | { kind: 'mold-preview'; state: AppState; segments: number }
  | { kind: 'export'; state: AppState };

/** Готовая деталь: меш плюс всё, что о ней показывает панель. */
export interface JobPart {
  id: string;
  label: string;
  /** приписка в списке деталей — габарит; пусто, если нечего сказать */
  note: string;
  positions: Float32Array;
  indices: Uint32Array;
  normals: Float32Array;
  /** что мешает выгрузить деталь в STL; у превью всегда пусто */
  blocking: string[];
}

/**
 * Прогресс — покрупному, по этапам. Manifold внутри одной булевой операции
 * ничего о себе не сообщает, и притворяться, что сообщает, мы не будем:
 * шкала считает этапы, а подпись говорит, какой идёт сейчас.
 */
export interface JobProgress {
  /** сколько этапов уже позади */
  step: number;
  /** сколько их всего; после анализа разъёма может уточниться в меньшую сторону */
  total: number;
  /** что делается прямо сейчас */
  label: string;
}

export interface WorkerIn {
  jobId: number;
  job: CsgJob;
}

export type WorkerOut =
  | ({ type: 'progress'; jobId: number } & JobProgress)
  | { type: 'done'; jobId: number; parts: JobPart[] }
  | { type: 'error'; jobId: number; message: string };
