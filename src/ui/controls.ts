// Декларативные контролы над произвольным состоянием: описываем, как прочесть
// и как записать значение, а рендер строк, форматирование и синхронизацию
// берёт на себя этот модуль. Тем же кодом рисуются карточки рельефа, накатки,
// ручки и параметров формы.
//
// Подписи, подсказки и пункты списков — ключи словаря, а не текст: перевод
// делается при отрисовке, и смена языка — это просто повторная отрисовка.

import { make } from './dom';
import type { Key } from '../i18n';
import { t } from '../i18n';
import type { RouletteImage } from '../geo/roulette';
import { imageFromFile, drawOrnament } from './ornament';

/**
 * Когда контрол виден. Нужен там, где у карточки несколько взаимоисключающих
 * режимов: показывать ползунок, который в текущем режиме ни на что не влияет,
 * хуже, чем не показывать вовсе.
 */
type Visibility<T> = (state: T) => boolean;

export interface RangeControl<T> {
  kind: 'range';
  key: string;
  label: Key;
  min: number;
  max: number;
  step: number;
  hint?: Key;
  when?: Visibility<T>;
  get(state: T): number;
  set(state: T, value: number): T;
}

/**
 * Пункт списка: значение и ключ его подписи — или готовый текст, когда
 * переводить нечего (имя шрифта).
 */
export type SelectOption = { value: string; label: Key } | { value: string; text: string };

export interface SelectControl<T> {
  kind: 'select';
  key: string;
  label: Key;
  options: readonly SelectOption[];
  hint?: Key;
  when?: Visibility<T>;
  get(state: T): string;
  set(state: T, value: string): T;
}

export interface CheckControl<T> {
  kind: 'check';
  key: string;
  label: Key;
  hint?: Key;
  when?: Visibility<T>;
  get(state: T): boolean;
  set(state: T, value: boolean): T;
}

/** Картинка из файла: кнопка, скрытый <input type=file> и миниатюра. */
export interface ImageControl<T> {
  kind: 'image';
  key: string;
  label: Key;
  hint?: Key;
  when?: Visibility<T>;
  /** предел по длинной стороне, px; по умолчанию — как у накатки */
  maxPx?: number;
  get(state: T): RouletteImage | undefined;
  set(state: T, image: RouletteImage): T;
}

/** Строка текста; меняет состояние на каждом вводе, как ползунок. */
export interface TextControl<T> {
  kind: 'text';
  key: string;
  label: Key;
  hint?: Key;
  placeholder?: Key;
  maxLength: number;
  when?: Visibility<T>;
  get(state: T): string;
  set(state: T, value: string): T;
}

/** Кнопка-действие над состоянием («убрать лого»). */
export interface ButtonControl<T> {
  kind: 'button';
  key: string;
  label: Key;
  /** надпись на кнопке */
  button: Key;
  hint?: Key;
  when?: Visibility<T>;
  apply(state: T): T;
}

export type Control<T> =
  | RangeControl<T> | SelectControl<T> | CheckControl<T> | ImageControl<T> | TextControl<T> | ButtonControl<T>;

export interface ControlsHandle<T> {
  /** обновляет отображаемые значения, не пересоздавая DOM */
  sync(state: T): void;
}

function decimals(step: number): number {
  if (step >= 1) return 0;
  if (step >= 0.1) return 1;
  return 2;
}

function format<T>(control: RangeControl<T>, value: number): string {
  return value.toFixed(decimals(control.step));
}

export function renderControls<T>(
  container: HTMLElement,
  controls: readonly Control<T>[],
  read: () => T,
  onChange: (next: T) => void,
  idPrefix: string,
): ControlsHandle<T> {
  container.textContent = '';
  const syncers: ((state: T) => void)[] = [];

  for (const control of controls) {
    const row = make('label', 'row');
    const name = make('span', undefined, t(control.label));
    if (control.hint) name.title = t(control.hint);
    row.append(name);

    if (control.kind === 'image') {
      const input = make('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.id = `${idPrefix}_${control.key}`;
      input.hidden = true;
      const button = make('button', 'tb-btn', t('image.file'));
      button.type = 'button';
      button.addEventListener('click', () => input.click());
      const thumb = make('canvas', 'ornament-thumb');
      thumb.width = 48;
      thumb.height = 48;
      const note = make('span', 'ornament-note');
      input.addEventListener('change', () => {
        const file = input.files?.[0];
        input.value = '';
        if (!file) return;
        imageFromFile(file, control.maxPx).then(
          (image) => onChange(control.set(read(), image)),
          () => {
            note.textContent = t('image.notImage');
          },
        );
      });
      row.append(button, thumb, note, input);
      const show = (state: T): void => {
        const image = control.get(state);
        drawOrnament(thumb, image);
        thumb.hidden = !image;
        note.textContent = image ? `${image.w}×${image.h}` : t('image.load');
      };
      show(read());
      syncers.push(show);
    } else if (control.kind === 'text') {
      const input = make('input');
      input.type = 'text';
      input.id = `${idPrefix}_${control.key}`;
      input.maxLength = control.maxLength;
      input.spellcheck = false;
      if (control.placeholder) input.placeholder = t(control.placeholder);
      input.value = control.get(read());
      input.addEventListener('input', () => onChange(control.set(read(), input.value)));
      row.append(input);
      syncers.push((state) => {
        // переписываем только при расхождении: иначе курсор прыгал бы в конец
        const value = control.get(state);
        if (input.value !== value) input.value = value;
      });
    } else if (control.kind === 'button') {
      const button = make('button', 'tb-btn', t(control.button));
      button.type = 'button';
      button.id = `${idPrefix}_${control.key}`;
      button.addEventListener('click', () => onChange(control.apply(read())));
      row.append(button);
    } else if (control.kind === 'check') {
      const box = make('input');
      box.type = 'checkbox';
      box.id = `${idPrefix}_${control.key}`;
      box.checked = control.get(read());
      box.addEventListener('change', () => onChange(control.set(read(), box.checked)));
      row.classList.add('check-row');
      row.prepend(box);
      syncers.push((state) => {
        box.checked = control.get(state);
      });
    } else if (control.kind === 'select') {
      const select = make('select');
      select.id = `${idPrefix}_${control.key}`;
      for (const option of control.options) {
        const node = make('option', undefined, 'text' in option ? option.text : t(option.label));
        node.value = option.value;
        select.append(node);
      }
      select.value = control.get(read());
      select.addEventListener('change', () => onChange(control.set(read(), select.value)));
      row.append(select);
      syncers.push((state) => {
        select.value = control.get(state);
      });
    } else {
      const slider = make('input');
      slider.type = 'range';
      slider.id = `${idPrefix}_${control.key}`;
      slider.min = String(control.min);
      slider.max = String(control.max);
      slider.step = String(control.step);
      slider.value = String(control.get(read()));

      const readout = make('output', undefined, format(control, control.get(read())));
      const minus = make('button', 'adj-btn', '−');
      const plus = make('button', 'adj-btn', '+');
      for (const [button, dir] of [[minus, -1], [plus, 1]] as const) {
        button.type = 'button';
        button.dataset.slider = slider.id;
        button.dataset.dir = String(dir);
        button.tabIndex = -1;
      }

      slider.addEventListener('input', () => {
        const value = Number(slider.value);
        readout.textContent = format(control, value);
        onChange(control.set(read(), value));
      });

      row.append(minus, slider, plus, readout);
      syncers.push((state) => {
        const value = control.get(state);
        slider.value = String(value);
        readout.textContent = format(control, value);
      });
    }

    const when = control.when;
    if (when) {
      const show = (state: T): void => {
        row.hidden = !when(state);
      };
      show(read());
      syncers.push(show);
    }

    container.append(row);
  }

  return {
    sync(state: T): void {
      for (const syncer of syncers) syncer(state);
    },
  };
}
