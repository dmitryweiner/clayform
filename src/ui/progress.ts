// Полоса прогресса на канвасе — для всего долгого, а не только для экспорта.
// На M1 превью оснастки укладывается в полсекунды, и мельтешить полосой там
// незачем; на медленной машине (и на телефоне, где панель с текстом прогресса
// спрятана) она — единственный признак, что вкладка работает, а не умерла.
// Отсюда задержка появления: показываем только то, что и правда долго.

import type { JobProgress } from '../worker/protocol';

/** Через сколько после старта задачи полоса появляется, если та ещё идёт. */
export const SHOW_DELAY_MS = 300;

export interface ProgressElements {
  wrap: HTMLElement;
  fill: HTMLElement;
  label: HTMLElement;
}

export interface TrackOptions {
  /** подпись, пока задача о себе ничего не сообщила */
  label: string;
  /** 0 — показать сразу: экспорт запросили кнопкой и ждут ответа */
  delayMs?: number;
  /**
   * Шкала без делений — бегущая полоска. Для задач из одного этапа: шкала
   * на «0 из 1» выглядела бы зависшей.
   */
  indeterminate?: boolean;
}

interface Tracker {
  label: string;
  step: number | null;
  total: number | null;
  indeterminate: boolean;
  visible: boolean;
}

export interface ProgressHandle {
  /**
   * Следит за задачей: `job` получает колбэк хода работ и возвращает
   * промис; когда он разрешится (в том числе null-ом вытеснения или
   * ошибкой), полоса прячется.
   */
  track<T>(job: (onProgress: (progress: JobProgress) => void) => Promise<T>, options: TrackOptions): Promise<T>;
}

export function createProgress({ wrap, fill, label }: ProgressElements): ProgressHandle {
  /** идущие задачи; показывается последняя видимая */
  const active: Tracker[] = [];
  let hideFrame = 0;

  function render(): void {
    const shown = active.filter((tracker) => tracker.visible).at(-1);
    if (!shown) {
      // Две задачи подряд — окончание одной и старт следующей в том же
      // кадре — не должны мигать полосой: прячем на кадр позже.
      if (!hideFrame && !wrap.hidden) {
        hideFrame = requestAnimationFrame(() => {
          hideFrame = 0;
          if (active.some((tracker) => tracker.visible)) return;
          wrap.hidden = true;
          wrap.classList.remove('indeterminate');
          fill.style.width = '0%';
          label.textContent = '';
        });
      }
      return;
    }
    if (hideFrame) {
      cancelAnimationFrame(hideFrame);
      hideFrame = 0;
    }
    wrap.hidden = false;
    const indeterminate = shown.indeterminate || shown.total === null || shown.step === null;
    wrap.classList.toggle('indeterminate', indeterminate);
    fill.style.width = indeterminate
      ? ''
      : `${Math.round(((shown.step ?? 0) / Math.max(1, shown.total ?? 1)) * 100)}%`;
    label.textContent = shown.label;
  }

  return {
    async track(job, options) {
      const tracker: Tracker = {
        label: options.label,
        step: null,
        total: null,
        indeterminate: options.indeterminate ?? false,
        visible: false,
      };
      active.push(tracker);
      const reveal = (): void => {
        tracker.visible = true;
        render();
      };
      const delay = options.delayMs ?? SHOW_DELAY_MS;
      const timer = delay > 0 ? setTimeout(reveal, delay) : null;
      if (!timer) reveal();
      try {
        return await job(({ step, total, label: text }) => {
          tracker.step = step;
          tracker.total = total;
          tracker.label = text;
          if (tracker.visible) render();
        });
      } finally {
        if (timer) clearTimeout(timer);
        active.splice(active.indexOf(tracker), 1);
        render();
      }
    },
  };
}
