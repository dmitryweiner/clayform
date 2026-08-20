// Складная карточка с тумблером: заголовок включает эффект, клик по нему
// сворачивает тело. Выключенная карточка сворачивается сама — панель не
// разрастается неиспользуемыми параметрами.

import { make } from './dom';

export interface CardOptions {
  id: string;
  title: string;
  /** короткая приписка справа от названия */
  tag?: string;
  desc?: string;
  enabled: boolean;
  onToggle(on: boolean): void;
}

export interface CardHandle {
  /** контейнер под контролы */
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
  const title = make('span', 'fcard-title', options.title);
  const caret = make('span', 'fcard-caret', options.enabled ? '▾' : '▸');
  head.append(toggle, title);
  if (options.tag) head.append(make('span', 'fcard-tag', options.tag));
  head.append(caret);

  const body = make('div', 'fcard-body');
  if (options.desc) body.append(make('p', 'fcard-desc', options.desc));

  function setCollapsed(collapsed: boolean): void {
    card.classList.toggle('collapsed', collapsed);
    caret.textContent = collapsed ? '▸' : '▾';
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
    body,
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
