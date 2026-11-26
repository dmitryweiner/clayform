// @vitest-environment jsdom
//
// Карточка клейма: лого — подблок `#card_markLogo` внутри неё; «Убрать» — ✕
// `#mark_logoRemove` рядом с «Файл…», только пока лого есть.

import { renderMarkCard } from '../src/ui/markCard';
import type { MarkState } from '../src/geo/mark';
import { defaultMark } from '../src/geo/mark';
import { t } from '../src/i18n';

afterEach(() => document.body.replaceChildren());

const LOGO = { image: { w: 4, h: 4, data: 'AAAAAAAAAAAAAAAAAAAAAA==', invert: false }, angleDeg: 0, sizeMm: 25 };

function setup(start: MarkState): { host: HTMLElement; mark: () => MarkState; changes: boolean[] } {
  const host = document.createElement('div');
  document.body.append(host);
  let mark = start;
  const changes: boolean[] = [];
  const card = renderMarkCard(
    host,
    () => mark,
    (next, final) => {
      mark = next;
      changes.push(final);
      card.sync(mark);
    },
    () => {},
  );
  card.sync(mark);
  return { host, mark: () => mark, changes };
}

describe('карточка клейма', () => {
  it('лого — подблок внутри карточки: картинка, инверсия, поворот, размер', () => {
    const { host } = setup({ ...defaultMark(), on: true, logo: LOGO });
    const logo = host.querySelector('#card_mark #card_markLogo');
    expect(logo).not.toBeNull();
    for (const id of ['mark_logo', 'mark_logoRemove', 'mark_logoInvert', 'mark_logoAngle', 'mark_logoSize']) {
      expect(logo?.querySelector(`#${id}`), id).not.toBeNull();
    }
    expect(logo?.classList.contains('on')).toBe(true);
  });

  it('✕ стоит рядом с «Файл…» и убирает лого — законченная правка', () => {
    const { host, mark, changes } = setup({ ...defaultMark(), on: true, logo: LOGO });
    const remove = host.querySelector('#mark_logoRemove');
    if (!(remove instanceof HTMLButtonElement)) throw new Error('no ✕');
    expect(remove.previousElementSibling?.textContent).toBe(t('image.file'));
    expect(remove.textContent).toBe('✕');
    expect(remove.hidden).toBe(false);
    remove.click();
    expect(mark().logo).toBeNull();
    expect(changes).toEqual([true]);
    expect(remove.hidden).toBe(true);
    expect(host.querySelector('#card_markLogo')?.classList.contains('on')).toBe(false);
  });

  it('без лого ✕ нет, подблок свёрнут', () => {
    const { host } = setup({ ...defaultMark(), on: true });
    const remove = host.querySelector('#mark_logoRemove');
    expect(remove instanceof HTMLButtonElement && remove.hidden).toBe(true);
    expect(host.querySelector('#card_markLogo')?.classList.contains('collapsed')).toBe(true);
  });
});
