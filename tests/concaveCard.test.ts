// @vitest-environment jsdom
//
// Карточка вогнутого дна: вид прячет и показывает свои ползунки, заметка
// под радиусом сферы — глубина, которую пишет приложение.

import type { ConcaveState } from '../src/geo/concave';
import { defaultConcave } from '../src/geo/concave';
import { renderConcaveCard } from '../src/ui/concaveCard';
import { setLang } from '../src/i18n';

function setup(initial: ConcaveState) {
  const root = document.createElement('div');
  document.body.append(root);
  let state = initial;
  const changes: [ConcaveState, boolean][] = [];
  let views = 0;
  const card = renderConcaveCard(
    root,
    () => state,
    (next, final) => {
      state = next;
      changes.push([next, final]);
    },
    () => views++,
  );
  const row = (id: string): HTMLElement => {
    const found = root.querySelector<HTMLElement>(`#${id}`);
    if (!found) throw new Error(`no #${id}`);
    return found;
  };
  /** строка контрола скрыта: у кита строка — родитель поля */
  const hidden = (id: string): boolean => row(id).closest<HTMLElement>('.row')?.hidden === true;
  return { root, card, changes, row, hidden, views: () => views, sync: (next: ConcaveState) => card.sync((state = next)) };
}

beforeAll(() => setLang('ru'));
afterEach(() => document.body.replaceChildren());

describe('карточка вогнутого дна', () => {
  it('сфера: виден радиус с заметкой глубины, ползунков ступеньки нет', () => {
    const { hidden, row } = setup({ ...defaultConcave(), on: true, kind: 'sphere' });
    expect(hidden('concave_radius')).toBe(false);
    expect(row('concave_radius_note').hidden === true).toBe(false);
    for (const id of ['concave_depth', 'concave_ring', 'concave_fillet']) expect(hidden(id), id).toBe(true);
  });

  it('смена вида — законченная правка, и ползунки меняются местами', () => {
    const { row, hidden, changes, sync } = setup({ ...defaultConcave(), on: true, kind: 'sphere' });
    const select = row('concave_kind');
    if (!(select instanceof HTMLSelectElement)) throw new Error('kind is not a select');
    select.value = 'flat';
    select.dispatchEvent(new Event('change'));
    expect(changes.at(-1)).toEqual([{ ...defaultConcave(), on: true, kind: 'flat' }, true]);
    sync(changes[changes.length - 1][0]);
    expect(hidden('concave_radius')).toBe(true);
    for (const id of ['concave_depth', 'concave_ring', 'concave_fillet']) expect(hidden(id), id).toBe(false);
  });

  it('пределы и шаги ползунков', () => {
    const { row } = setup({ ...defaultConcave(), on: true });
    const range = (id: string): string[] => {
      const slider = row(id);
      if (!(slider instanceof HTMLInputElement)) throw new Error(`#${id} is not an input`);
      return [slider.min, slider.max, slider.step];
    };
    expect(range('concave_radius')).toEqual(['20', '100', '1']);
    expect(range('concave_depth')).toEqual(['0', '10', '0.1']);
    expect(range('concave_ring')).toEqual(['0.5', '5', '0.1']);
    expect(range('concave_fillet')).toEqual(['0', '5', '0.1']);
  });

  it('заметка — глубина, которую сказало приложение', () => {
    const { row, card } = setup({ ...defaultConcave(), on: true });
    card.setDepth(4.53);
    expect(row('concave_radius_note').textContent).toBe('Глубина 4.5 мм');
    card.setDepth(null);
    expect(row('concave_radius_note').textContent).toBe('');
  });

  it('👁 разворачивает камеру на дно', () => {
    const { row, views } = setup(defaultConcave());
    row('concave_view').click();
    expect(views()).toBe(1);
  });
});
