// Группа «Надписи»: то, что пишут и рисуют на изделии, — текст и картинка
// на боку (plans/PLAN-DECOR.md) и клеймо на дне.

import type { MarkState } from '../geo/mark';
import type { SideTextState } from '../geo/sideText';
import type { SideImageState } from '../geo/sideImage';
import type { Change } from './controls';
import { renderMarkCard } from './markCard';
import { renderSideImageCard, renderSideTextCard } from './sideCards';

export interface DecorSources {
  sideText: () => SideTextState;
  sideImage: () => SideImageState;
  mark: () => MarkState;
}

export interface DecorSinks {
  sideText: Change<SideTextState>;
  sideImage: Change<SideImageState>;
  mark: Change<MarkState>;
  /** развернуть камеру на донышко */
  viewBottom: () => void;
}

export interface DecorCardsHandle {
  sync(sideText: SideTextState, sideImage: SideImageState, mark: MarkState): void;
}

export function renderDecorCards(container: HTMLElement, read: DecorSources, write: DecorSinks): DecorCardsHandle {
  container.textContent = '';
  const text = renderSideTextCard(container, read.sideText, write.sideText);
  const image = renderSideImageCard(container, read.sideImage, write.sideImage);
  const mark = renderMarkCard(container, read.mark, write.mark, write.viewBottom);
  return {
    sync(sideText, sideImage, markState): void {
      text.sync(sideText);
      image.sync(sideImage);
      mark.sync(markState);
    },
  };
}
