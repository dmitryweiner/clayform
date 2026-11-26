// Группа «Надписи»: то, что пишут и рисуют на изделии, — клеймо на дне.
// Текст и картинка на боку приходят сюда же (plans/PLAN-DECOR.md).

import type { MarkState } from '../geo/mark';
import type { Change } from './controls';
import { renderMarkCard } from './markCard';

export interface DecorSources {
  mark: () => MarkState;
}

export interface DecorSinks {
  mark: Change<MarkState>;
  /** развернуть камеру на донышко */
  viewBottom: () => void;
}

export interface DecorCardsHandle {
  sync(mark: MarkState): void;
}

export function renderDecorCards(container: HTMLElement, read: DecorSources, write: DecorSinks): DecorCardsHandle {
  container.textContent = '';
  const mark = renderMarkCard(container, read.mark, write.mark, write.viewBottom);
  return {
    sync(markState): void {
      mark.sync(markState);
    },
  };
}
