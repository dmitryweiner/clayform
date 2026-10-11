// Список пресетов: свои и встроенные, со 🗑 у своих.
//
// Системный <select> этого не умеет: на телефоне он открывается системным
// листом, где рядом со строкой нет места кнопке удаления, а на десктопе
// optgroup не принимает ничего, кроме текста. Поэтому — своя панель, как в
// synesthesia (src/ui/pointList.ts).
//
// Удаление — в два касания: первое превращает 🗑 в «Удалить?», второе
// удаляет. Системный confirm блокировал бы страницу (и смоук вместе с ней),
// а промахнуться пальцем по соседней строке на телефоне проще простого.

import { make } from './dom';

export interface PresetRow {
  /** 'u:<имя>' — свой, 'b:<имя>' — встроенный */
  ref: string;
  name: string;
  /** подсказка: чем пресет интересен */
  note?: string;
  /** свой — можно удалить */
  mine: boolean;
}

export interface PresetListHandlers {
  onPick(ref: string): void;
  onDelete(ref: string): void;
}

/** Сколько «Удалить?» ждёт второго касания, прежде чем вернуться к 🗑. */
const CONFIRM_MS = 3000;

export function renderPresetList(
  root: HTMLElement,
  rows: PresetRow[],
  current: string,
  handlers: PresetListHandlers,
): void {
  root.replaceChildren();
  const mine = rows.filter((row) => row.mine);
  const builtin = rows.filter((row) => !row.mine);

  root.append(make('p', 'preset-group', 'Мои'));
  if (mine.length === 0) {
    root.append(make('p', 'preset-empty', 'Пока пусто — 💾 сохраняет текущее изделие сюда.'));
  }
  for (const row of mine) root.append(presetRow(row, current, handlers));

  root.append(make('p', 'preset-group', 'Готовые'));
  for (const row of builtin) root.append(presetRow(row, current, handlers));
}

function presetRow(row: PresetRow, current: string, handlers: PresetListHandlers): HTMLElement {
  const wrap = make('div', 'preset-row');
  const pick = make('button', 'preset-pick', row.name);
  pick.type = 'button';
  pick.dataset.preset = row.ref;
  if (row.note) pick.title = row.note;
  if (row.ref === current) {
    pick.classList.add('current');
    pick.setAttribute('aria-current', 'true');
  }
  pick.addEventListener('click', () => handlers.onPick(row.ref));
  wrap.append(pick);

  if (row.mine) {
    const del = make('button', 'preset-del', '🗑');
    del.type = 'button';
    del.dataset.del = row.ref;
    del.title = `Удалить «${row.name}»`;
    del.setAttribute('aria-label', `Удалить ${row.name}`);
    let timer: ReturnType<typeof setTimeout> | null = null;
    del.addEventListener('click', () => {
      if (del.classList.contains('armed')) {
        if (timer) clearTimeout(timer);
        handlers.onDelete(row.ref);
        return;
      }
      del.classList.add('armed');
      del.textContent = 'Удалить?';
      timer = setTimeout(() => {
        del.classList.remove('armed');
        del.textContent = '🗑';
      }, CONFIRM_MS);
    });
    wrap.append(del);
  }
  return wrap;
}
