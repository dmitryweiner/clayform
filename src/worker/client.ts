// Сторона главного потока: CSG-воркер за очередью кита (`WorkerClient`).
//
// Одна дорожка. Бегущую задачу прервать нельзя — WASM посреди булевой
// операции не останавливается. Зато ждущую можно вытеснить, и это ровно то,
// что нужно точному превью изделия: пока пользователь возит ползунок, смысл
// имеет только самый свежий запрос. Вытесненная задача разрешается null —
// «считать расхотелось», а не ошибкой. Экспорт запросили кнопкой, и другого
// раза не будет: превью его из очереди не выбрасывает (`kept`).
//
// Воркер создаётся здесь, в коде приложения: Vite находит и собирает его
// только по выражению `new Worker(new URL(…), …)`.

import { moduleWorker, WorkerClient } from 'maker-kit/worker/client';
import type { CsgJob, JobPart } from './protocol';

export type CsgClient = WorkerClient<CsgJob, JobPart[]>;

export function createCsgClient(): CsgClient {
  return new WorkerClient<CsgJob, JobPart[]>(
    moduleWorker(() => new Worker(new URL('./csg.worker.ts', import.meta.url), { type: 'module' })),
    { lane: () => 'csg', kept: (job) => job.kind === 'export' },
  );
}
