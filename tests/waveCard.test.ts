// @vitest-environment jsdom
//
// Карточка «Волна»: одна на обе волны — сверху готовый узор, внизу «Волна
// волны» складным подблоком; id прежние (`#wave2_*` — смоук и snap.mjs).

import { renderReliefCards } from '../src/ui/reliefCards';
import type { ReliefState } from '../src/geo/relief';
import { defaultRelief } from '../src/geo/relief';
import { defaultRoulette } from '../src/geo/roulette';
import { WAVE_PRESETS } from '../src/geo/wavePresets';

afterEach(() => document.body.replaceChildren());

function setup(): { host: HTMLElement; relief: () => ReliefState; changes: boolean[] } {
  const host = document.createElement('div');
  document.body.append(host);
  let relief = defaultRelief();
  const roulette = defaultRoulette();
  const changes: boolean[] = [];
  const cards = renderReliefCards(
    host,
    () => relief,
    () => roulette,
    (next, final) => {
      relief = next;
      changes.push(final);
      cards.sync(relief, roulette);
    },
    () => {},
  );
  cards.sync(relief, roulette);
  return { host, relief: () => relief, changes };
}

function select(host: HTMLElement, id: string): HTMLSelectElement {
  const element = host.querySelector(`#${id}`);
  if (!(element instanceof HTMLSelectElement)) throw new Error(`no #${id}`);
  return element;
}

describe('карточка «Волна»', () => {
  it('«Волна волны» — подблок внутри неё, своих карточек у волн две не стало', () => {
    const { host } = setup();
    const wave = host.querySelector('#card_wave');
    expect(wave?.querySelector('#card_wave2')).not.toBeNull();
    expect(wave?.querySelector('#card_wave2 #wave2_on')).not.toBeNull();
    expect(host.querySelectorAll(':scope > .fcard')).toHaveLength(2);
  });

  it('список узоров: «Свой» и пять пресетов; «Свой» не выбирается', () => {
    const { host } = setup();
    const list = select(host, 'wave_preset');
    expect([...list.options].map((option) => option.value)).toEqual(['', ...WAVE_PRESETS.map((preset) => preset.id)]);
    expect(list.value).toBe('');
    expect(list.options[0].disabled).toBe(true);
  });

  it('выбор узора — законченная правка: обе волны его числами, первая включена', () => {
    const { host, relief, changes } = setup();
    const list = select(host, 'wave_preset');
    list.value = 'flame';
    list.dispatchEvent(new Event('change'));
    expect(changes).toEqual([true]);
    expect(relief().wave.on).toBe(true);
    expect(relief().wave.axis).toBe('theta');
    expect(list.value).toBe('flame');
    expect(host.querySelector('#card_wave')?.classList.contains('on')).toBe(true);
    expect(host.querySelector('#card_wave2')?.classList.contains('on')).toBe(true);
  });

  it('правка ползунка волны делает узор своим', () => {
    const { host } = setup();
    const list = select(host, 'wave_preset');
    list.value = 'ripple';
    list.dispatchEvent(new Event('change'));
    const freq = host.querySelector('#wave_freq_n');
    if (!(freq instanceof HTMLInputElement)) throw new Error('no #wave_freq_n');
    freq.value = '20';
    freq.dispatchEvent(new Event('change'));
    expect(list.value).toBe('');
  });
});
