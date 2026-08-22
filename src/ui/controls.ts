// Декларативные контролы над произвольным состоянием: описываем, как прочесть
// и как записать значение, а рендер строк, форматирование и синхронизацию
// берёт на себя этот модуль. Тем же кодом рисуются карточки рельефа, накатки,
// ручки и параметров формы.

import { make } from './dom';

/**
 * Когда контрол виден. Нужен там, где у карточки несколько взаимоисключающих
 * режимов: показывать ползунок, который в текущем режиме ни на что не влияет,
 * хуже, чем не показывать вовсе.
 */
type Visibility<T> = (state: T) => boolean;

export interface RangeControl<T> {
  kind: 'range';
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  /** приписка к числу: 'мм', '°', … */
  unit?: string;
  hint?: string;
  when?: Visibility<T>;
  get(state: T): number;
  set(state: T, value: number): T;
}

export interface SelectControl<T> {
  kind: 'select';
  key: string;
  label: string;
  options: readonly { value: string; label: string }[];
  hint?: string;
  when?: Visibility<T>;
  get(state: T): string;
  set(state: T, value: string): T;
}

export type Control<T> = RangeControl<T> | SelectControl<T>;

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
  const text = value.toFixed(decimals(control.step));
  return control.unit ? `${text}` : text;
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
    const name = make('span', undefined, control.label);
    if (control.hint) name.title = control.hint;
    row.append(name);

    if (control.kind === 'select') {
      const select = make('select');
      select.id = `${idPrefix}_${control.key}`;
      for (const option of control.options) {
        const node = make('option', undefined, option.label);
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
