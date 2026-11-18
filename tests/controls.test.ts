// @vitest-environment jsdom
//
// Строки панели: китовые и своя строка картинки — в том порядке, в каком
// записаны; ползунок сообщает кадры жеста и законченную правку.

import type { Control } from '../src/ui/controls';
import { renderControls } from '../src/ui/controls';
import type { RouletteImage } from '../src/geo/roulette';

interface Probe {
  size: number;
  image?: RouletteImage;
  showImage: boolean;
}

const CONTROLS: Control<Probe>[] = [
  { kind: 'range', key: 'size', label: 'ctl.depth', min: 0, max: 10, step: 1, get: (s) => s.size, set: (s, v) => ({ ...s, size: v }) },
  {
    kind: 'image',
    key: 'image',
    label: 'band.image',
    when: (s) => s.showImage,
    get: (s) => s.image,
    set: (s, image) => ({ ...s, image }),
  },
  { kind: 'check', key: 'show', label: 'ctl.onLid', get: (s) => s.showImage, set: (s, v) => ({ ...s, showImage: v }) },
];

function setup(initial: Probe): { root: HTMLElement; changes: [Probe, boolean][]; sync: (state: Probe) => void } {
  const root = document.createElement('div');
  document.body.append(root);
  let state = initial;
  const changes: [Probe, boolean][] = [];
  const handle = renderControls(
    root,
    CONTROLS,
    () => state,
    (next, final) => {
      state = next;
      changes.push([next, final]);
    },
    'probe',
  );
  return { root, changes, sync: (next) => handle.sync(next) };
}

// jsdom ищет `#id` через getElementById: строки прошлого теста с теми же id мешали бы
afterEach(() => document.body.replaceChildren());

describe('строки панели', () => {
  it('китовые строки и картинка идут в порядке списка, с id по схеме кита', () => {
    const { root } = setup({ size: 3, showImage: true });
    const ids = [...root.querySelectorAll('input')].map((input) => input.id);
    expect(ids).toEqual(['probe_size', 'probe_size_n', 'probe_image', 'probe_show']);
  });

  it('строку картинки прячет её `when`', () => {
    const { root, sync } = setup({ size: 3, showImage: false });
    const row = root.querySelector('.image-row');
    expect(row instanceof HTMLElement && row.hidden).toBe(true);
    sync({ size: 3, showImage: true });
    expect(row instanceof HTMLElement && row.hidden).toBe(false);
  });

  it('ползунок: кадры жеста на input, законченная правка на change', () => {
    const { root, changes } = setup({ size: 3, showImage: false });
    const slider = root.querySelector('#probe_size');
    if (!(slider instanceof HTMLInputElement)) throw new Error('no slider');
    slider.value = '5';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    slider.value = '6';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    slider.dispatchEvent(new Event('change', { bubbles: true }));
    expect(changes.map(([state, final]) => [state.size, final])).toEqual([
      [5, false],
      [6, false],
      [6, true],
    ]);
  });
});
