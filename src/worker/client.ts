// Сторона главного потока: один воркер, очередь глубиной в одну задачу.
//
// Бегущую задачу прервать нельзя — WASM посреди булевой операции не
// останавливается. Зато ждущую можно вытеснить, и это ровно то, что нужно
// превью оснастки: пока пользователь возит ползунок, смысл имеет только
// самый свежий запрос. Вытесненная задача разрешается значением null —
// «считать расхотелось», а не ошибкой: отказ пришлось бы ловить и отличать
// от настоящей поломки на каждом вызове.

import type { CsgJob, JobPart, JobProgress, WorkerIn, WorkerOut } from './protocol';

interface Pending {
  id: number;
  job: CsgJob;
  onProgress?: (progress: JobProgress) => void;
  settle(parts: JobPart[] | null): void;
  fail(message: string): void;
}

export class CsgClient {
  private worker: Worker | null = null;
  private nextId = 1;
  private running: Pending | null = null;
  private waiting: Pending | null = null;

  /** null в ответе — задачу вытеснила более свежая. */
  run(job: CsgJob, onProgress?: (progress: JobProgress) => void): Promise<JobPart[] | null> {
    return new Promise((resolve, reject) => {
      const pending: Pending = {
        id: this.nextId++,
        job,
        onProgress,
        settle: resolve,
        fail: (message) => reject(new Error(message)),
      };

      if (!this.running) {
        this.start(pending);
        return;
      }
      // Экспорт из очереди не выбрасываем: его запросили кнопкой, и другого
      // раза не будет. Превью — наоборот, придёт снова с ближайшей правкой.
      if (this.waiting?.job.kind === 'export' && job.kind !== 'export') {
        resolve(null);
        return;
      }
      this.waiting?.settle(null);
      this.waiting = pending;
    });
  }

  private start(pending: Pending): void {
    this.running = pending;
    const message: WorkerIn = { jobId: pending.id, job: pending.job };
    this.ensure().postMessage(message);
  }

  private next(): void {
    this.running = null;
    const waiting = this.waiting;
    this.waiting = null;
    if (waiting) this.start(waiting);
  }

  private receive(data: unknown): void {
    if (!isWorkerOut(data)) return;
    const running = this.running;
    // Ответ от задачи, которую уже никто не ждёт (воркер досчитал вытесненную
    // до конца): просто выбрасываем.
    if (!running || running.id !== data.jobId) return;

    if (data.type === 'progress') {
      running.onProgress?.({ step: data.step, total: data.total, label: data.label });
      return;
    }
    if (data.type === 'done') running.settle(data.parts);
    else running.fail(data.message);
    this.next();
  }

  /** Поломка самого воркера: не догрузился модуль, упал WASM. */
  private broke(message: string): void {
    this.running?.fail(message);
    this.waiting?.fail(message);
    this.waiting = null;
    this.running = null;
    // Следующая задача поднимет воркер заново: разовый сбой не должен
    // хоронить приложение до перезагрузки страницы.
    this.worker?.terminate();
    this.worker = null;
  }

  private ensure(): Worker {
    if (!this.worker) {
      const worker = new Worker(new URL('./csg.worker.ts', import.meta.url), { type: 'module' });
      worker.addEventListener('message', (event) => this.receive(event.data));
      worker.addEventListener('error', (event) => this.broke(event.message || 'воркер не запустился'));
      worker.addEventListener('messageerror', () => this.broke('ответ воркера не читается'));
      this.worker = worker;
    }
    return this.worker;
  }
}

function isWorkerOut(data: unknown): data is WorkerOut {
  if (typeof data !== 'object' || data === null) return false;
  if (!('jobId' in data) || typeof data.jobId !== 'number') return false;
  if (!('type' in data)) return false;
  return data.type === 'progress' || data.type === 'done' || data.type === 'error';
}
