// Строки панели — контролы кита (`maker-kit/ui/controls`), привязанные к
// нашему словарю, плюс один свой вид: картинка из файла (орнамент накатки,
// лого клейма). Она нужна одному приложению, поэтому в кит не идёт: здесь
// подряд идущие строки кита рисует кит, а картинку — мы, в том же порядке,
// в каком они записаны.
//
// Подписи, подсказки и пункты списков — ключи словаря, а не текст: перевод
// делается при отрисовке, и смена языка — это просто повторная отрисовка.

import type { Control as KitControl, ControlsHandle, Option } from 'maker-kit/ui/controls';
import { renderControls as renderKitControls } from 'maker-kit/ui/controls';
import { make } from 'maker-kit/ui/dom';
import type { Key } from '../i18n';
import { t } from '../i18n';
import type { RouletteImage } from '../geo/roulette';
import { imageFromFile, drawOrnament } from './ornament';

export type { ControlsHandle };

/**
 * Пункт списка: значение и ключ его подписи — или готовый текст, когда
 * переводить нечего (имя шрифта).
 */
export type SelectOption = Option<Key>;

/**
 * Новое состояние из панели. `final` — правка закончена, это шаг отмены;
 * false — кадр жеста (ползунок тащат, текст набирают, −/+ держат).
 */
export type Change<T> = (next: T, final: boolean) => void;

/**
 * Картинка из файла: кнопка, скрытый <input type=file> и миниатюра; с
 * `remove` — ещё ✕ рядом с «Файл…», пока картинка есть (`#<приставка>_<key>`).
 */
export interface ImageControl<T> {
  kind: 'image';
  key: string;
  label: Key;
  hint?: Key;
  when?: (state: T) => boolean;
  /** предел по длинной стороне, px; по умолчанию — как у накатки */
  maxPx?: number;
  get(state: T): RouletteImage | undefined;
  set(state: T, image: RouletteImage): T;
  remove?: { key: string; label: Key; apply(state: T): T };
}

export type Control<T> = KitControl<T, Key> | ImageControl<T>;

export function renderControls<T>(
  container: HTMLElement,
  controls: readonly Control<T>[],
  read: () => T,
  change: Change<T>,
  idPrefix: string,
): ControlsHandle<T> {
  container.textContent = '';
  const handles: ControlsHandle<T>[] = [];
  let run: KitControl<T, Key>[] = [];
  // строки кита рисуются пачкой в свой контейнер (кит его очищает), картинка — между пачками
  const flush = (): void => {
    if (run.length === 0) return;
    const host = make('div', 'rows');
    container.append(host);
    handles.push(renderKitControls(host, run, { read, change, idPrefix, t }));
    run = [];
  };
  for (const control of controls) {
    if (control.kind === 'image') {
      flush();
      handles.push(renderImageRow(container, control, read, change, idPrefix));
    } else {
      run.push(control);
    }
  }
  flush();
  return {
    sync(state) {
      for (const handle of handles) handle.sync(state);
    },
  };
}

/**
 * Строка картинки в разметке строк кита: имя, кнопка, миниатюра, размер.
 * Загруженная картинка — законченная правка, шаг отмены.
 */
function renderImageRow<T>(
  container: HTMLElement,
  control: ImageControl<T>,
  read: () => T,
  change: Change<T>,
  idPrefix: string,
): ControlsHandle<T> {
  const id = `${idPrefix}_${control.key}`;
  const row = make('div', 'row image-row');
  const name = make('label', 'row-name', t(control.label));
  name.htmlFor = id;
  if (control.hint) name.title = t(control.hint);

  const input = make('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.id = id;
  input.hidden = true;
  const button = make('button', 'row-btn', t('image.file'));
  button.type = 'button';
  button.addEventListener('click', () => input.click());
  // ✕ — законченная правка, шаг отмены; подпись — во всплывающей подсказке
  const remove = control.remove;
  const removeBtn = remove ? make('button', 'row-btn image-remove', '✕') : null;
  if (remove && removeBtn) {
    removeBtn.type = 'button';
    removeBtn.id = `${idPrefix}_${remove.key}`;
    removeBtn.title = t(remove.label);
    removeBtn.setAttribute('aria-label', t(remove.label));
    removeBtn.addEventListener('click', () => change(remove.apply(read()), true));
  }
  const thumb = make('canvas', 'ornament-thumb');
  thumb.width = 48;
  thumb.height = 48;
  const note = make('span', 'ornament-note');
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    imageFromFile(file, control.maxPx).then(
      (image) => change(control.set(read(), image), true),
      () => {
        note.textContent = t('image.notImage');
      },
    );
  });
  // одна ячейка сетки строки: кнопка, миниатюра и размер в линию
  const pick = make('div', 'image-pick');
  pick.append(button, ...(removeBtn ? [removeBtn] : []), thumb, note, input);
  row.append(name, pick);
  container.append(row);

  const handle: ControlsHandle<T> = {
    sync(state) {
      const image = control.get(state);
      drawOrnament(thumb, image);
      thumb.hidden = !image;
      note.textContent = image ? `${image.w}×${image.h}` : t('image.load');
      if (removeBtn) removeBtn.hidden = !image;
      row.hidden = control.when ? !control.when(state) : false;
    },
  };
  handle.sync(read());
  return handle;
}
