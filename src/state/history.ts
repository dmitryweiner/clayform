// Ограниченная история состояний для отмены и повтора.
//
// Записи копятся не на каждое изменение, а порциями: протаскивание ползунка
// от края до края — это одно действие, а не двести. Склейкой во времени
// занимается вызывающий (см. main.ts), здесь же — только стек с пределом,
// чтобы длинная сессия не съела память.

export class History<T> {
  private past: T[] = [];
  private future: T[] = [];
  private current: T;

  constructor(initial: T, private readonly limit = 80) {
    this.current = initial;
  }

  get value(): T {
    return this.current;
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  /** Фиксирует новое состояние. Повтор предыдущего игнорируется. */
  push(state: T): void {
    if (equal(state, this.current)) return;
    this.past.push(this.current);
    if (this.past.length > this.limit) this.past.shift();
    this.future = [];
    this.current = state;
  }

  /** Меняет текущее состояние, не создавая записи (промежуточные кадры). */
  replace(state: T): void {
    this.current = state;
  }

  undo(): T | null {
    const previous = this.past.pop();
    if (previous === undefined) return null;
    this.future.push(this.current);
    this.current = previous;
    return previous;
  }

  redo(): T | null {
    const next = this.future.pop();
    if (next === undefined) return null;
    this.past.push(this.current);
    this.current = next;
    return next;
  }
}

function equal(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
