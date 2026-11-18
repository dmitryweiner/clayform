// @vitest-environment jsdom
//
// Полосы накатки на списке кита: строка на полосу с ✕, ползунки полосы с
// индексом в приставке (`#roul0_pattern` — смоук и snap.mjs ими пользуются),
// «+ Полоса» прячется на пределе.

import { renderBandList } from '../src/ui/reliefCards';
import type { RouletteState } from '../src/geo/roulette';
import { MAX_BANDS, defaultBand } from '../src/geo/roulette';

afterEach(() => document.body.replaceChildren());

function setup(count: number): { host: HTMLElement; changes: [RouletteState, boolean][]; state: () => RouletteState } {
  const host = document.createElement('div');
  document.body.append(host);
  let state: RouletteState = { bands: Array.from({ length: count }, () => ({ ...defaultBand(), on: true })) };
  const changes: [RouletteState, boolean][] = [];
  const list = renderBandList(
    host,
    () => state,
    (next, final) => {
      state = next;
      changes.push([next, final]);
      list.sync(state, (band) => `шаг ${band.pattern}`);
    },
  );
  list.sync(state, (band) => `шаг ${band.pattern}`);
  return { host, changes, state: () => state };
}

describe('полосы накатки', () => {
  it('строка на полосу, ползунки полосы внутри неё, подпись полосы под ними', () => {
    const { host } = setup(2);
    const rows = [...host.querySelectorAll('.item-row')];
    expect(rows.map((row) => row.id)).toEqual(['roul_0', 'roul_1']);
    expect(rows[1].querySelector('#roul1_pattern')).not.toBeNull();
    expect(rows[0].querySelector('.band-note')?.textContent).toBe(`шаг ${defaultBand().pattern}`);
  });

  it('✕ убирает свою полосу — законченная правка', () => {
    const { host, changes, state } = setup(2);
    const remove = host.querySelector('#roul_0_remove');
    if (!(remove instanceof HTMLButtonElement)) throw new Error('no ✕');
    remove.click();
    expect(changes.at(-1)?.[1]).toBe(true);
    expect(state().bands).toHaveLength(1);
    expect([...host.querySelectorAll('.item-row')].map((row) => row.id)).toEqual(['roul_0']);
  });

  it('«+ Полоса» добавляет полосу и прячется на пределе', () => {
    const { host, state } = setup(MAX_BANDS - 1);
    const add = host.querySelector('.add-button');
    if (!(add instanceof HTMLButtonElement)) throw new Error('no add button');
    expect(add.hidden).toBe(false);
    add.click();
    expect(state().bands).toHaveLength(MAX_BANDS);
    expect(add.hidden).toBe(true);
  });
});
