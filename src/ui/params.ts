// Слайдеры параметров из деклараций ParamSpec: одна строка на параметр,
// с кнопками точной подстройки. Схема — единственный источник диапазонов,
// поэтому UI и ядро не могут разъехаться.

import type { ParamSpec, Params } from '../geo/profiles';
import { make } from './dom';

export interface ParamRowsHandle {
  /** обновляет значения, не пересоздавая DOM (сохраняет фокус и перетаскивание) */
  setValues(values: Params): void;
}

function format(spec: ParamSpec, value: number): string {
  if (spec.unit === 'mm') return `${Math.round(value)}`;
  return value.toFixed(2);
}

/**
 * Перерисовывает container набором строк-слайдеров. onInput зовётся на каждое
 * движение ползунка — вызывающий сам решает, что делать (превью сразу,
 * тяжёлая сборка по отпусканию).
 */
export function renderParams(
  container: HTMLElement,
  specs: ParamSpec[],
  values: Params,
  onInput: (key: string, value: number) => void,
  idPrefix = 'p',
): ParamRowsHandle {
  container.textContent = '';
  const outputs = new Map<string, HTMLOutputElement>();
  const sliders = new Map<string, HTMLInputElement>();

  for (const spec of specs) {
    const row = make('label', 'row');
    const name = make('span', undefined, spec.label);
    if (spec.hint) name.title = spec.hint;

    const slider = make('input');
    slider.type = 'range';
    slider.id = `${idPrefix}_${spec.key}`;
    slider.min = String(spec.min);
    slider.max = String(spec.max);
    slider.step = String(spec.step);
    slider.value = String(values[spec.key] ?? spec.default);

    const readout = make('output', undefined, format(spec, Number(slider.value)));

    const minus = make('button', 'adj-btn', '−');
    const plus = make('button', 'adj-btn', '+');
    for (const [btn, dir] of [[minus, -1], [plus, 1]] as const) {
      btn.type = 'button';
      btn.dataset.slider = slider.id;
      btn.dataset.dir = String(dir);
      btn.tabIndex = -1;
    }

    slider.addEventListener('input', () => {
      const value = Number(slider.value);
      readout.textContent = format(spec, value);
      onInput(spec.key, value);
    });

    row.append(name, minus, slider, plus, readout);
    container.append(row);
    outputs.set(spec.key, readout);
    sliders.set(spec.key, slider);
  }

  return {
    setValues(next: Params): void {
      for (const spec of specs) {
        const value = next[spec.key];
        if (typeof value !== 'number') continue;
        const slider = sliders.get(spec.key);
        const readout = outputs.get(spec.key);
        if (slider) slider.value = String(value);
        if (readout) readout.textContent = format(spec, value);
      }
    },
  };
}
