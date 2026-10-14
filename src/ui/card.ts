// Складная карточка с тумблером: заголовок включает эффект, клик по нему
// сворачивает тело. Выключенная карточка сворачивается сама — панель не
// разрастается неиспользуемыми параметрами.

import { make } from './dom';
import type { Key } from '../i18n';
import { t } from '../i18n';

export interface CardOptions {
  id: string;
  title: Key;
  /** короткая приписка справа от названия */
  tag?: Key;
  desc?: Key;
  enabled: boolean;
  onToggle(on: boolean): void;
}

export interface CardHandle {
  /**
   * Контейнер под контролы. Отдельный от описания: renderControls очищает
   * свой контейнер, и общий на двоих означал бы, что пояснение к карточке
   * стирается при первой же отрисовке.
   */
  body: HTMLElement;
  setEnabled(on: boolean): void;
}

export function createCard(container: HTMLElement, options: CardOptions): CardHandle {
  const card = make('section', 'fcard');
  card.id = `card_${options.id}`;

  const head = make('div', 'fcard-head');
  const toggle = make('input');
  toggle.type = 'checkbox';
  toggle.checked = options.enabled;
  toggle.id = `on_${options.id}`;
  const title = make('span', 'fcard-title', t(options.title));
  const caret = make('span', 'fcard-caret', options.enabled ? '▾' : '▸');
  head.append(toggle, title);
  if (options.tag) head.append(make('span', 'fcard-tag', t(options.tag)));
  head.append(caret);

  const body = make('div', 'fcard-body');
  if (options.desc) body.append(make('p', 'fcard-desc', t(options.desc)));
  const controls = make('div');
  body.append(controls);

  function setCollapsed(collapsed: boolean): void {
    showCollapsed(card, collapsed);
  }
  setCollapsed(!options.enabled);

  toggle.addEventListener('click', (event) => {
    event.stopPropagation(); // клик по чекбоксу не должен ещё и сворачивать
    setCollapsed(!toggle.checked);
    options.onToggle(toggle.checked);
  });
  head.addEventListener('click', () => setCollapsed(!card.classList.contains('collapsed')));

  card.append(head, body);
  container.append(card);

  let lastEnabled = options.enabled;
  return {
    body: controls,
    setEnabled(on: boolean): void {
      toggle.checked = on;
      // Сворачиваем только на смене тумблера. Иначе карточка, раскрытая
      // вручную при выключенном эффекте, схлопывалась бы на каждом движении
      // ползунка внутри неё.
      if (on !== lastEnabled) {
        setCollapsed(!on);
        lastEnabled = on;
      }
    },
  };
}

function showCollapsed(card: Element, collapsed: boolean): void {
  card.classList.toggle('collapsed', collapsed);
  const caret = card.querySelector('.fcard-caret');
  if (caret) caret.textContent = collapsed ? '▸' : '▾';
}

/**
 * Какие карточки свёрнуты — до перерисовки панели (смена языка). Свёрнутость
 * по умолчанию следует тумблеру, а раскрытую руками выключенную карточку
 * перерисовка иначе схлопнула бы.
 */
export function snapshotCards(root: ParentNode): Map<string, boolean> {
  const collapsed = new Map<string, boolean>();
  for (const card of root.querySelectorAll('.fcard')) {
    collapsed.set(card.id, card.classList.contains('collapsed'));
  }
  return collapsed;
}

export function restoreCards(root: ParentNode, collapsed: Map<string, boolean>): void {
  for (const card of root.querySelectorAll('.fcard')) {
    const value = collapsed.get(card.id);
    if (value !== undefined) showCollapsed(card, value);
  }
}
