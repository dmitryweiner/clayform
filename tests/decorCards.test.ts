// @vitest-environment jsdom
//
// Группа «Надписи»: текст, картинка, клеймо — по порядку; id строк
// `#text_*`, `#image_*` (смоук и snap.mjs ими пользуются).

import { renderDecorCards } from '../src/ui/decorCards';
import type { SideImageState } from '../src/geo/sideImage';
import { defaultSideImage } from '../src/geo/sideImage';
import type { SideTextState } from '../src/geo/sideText';
import { defaultSideText } from '../src/geo/sideText';
import { defaultMark } from '../src/geo/mark';

afterEach(() => document.body.replaceChildren());

const IMAGE = { w: 4, h: 4, data: 'AAAAAAAAAAAAAAAAAAAAAA==', invert: false };

function setup(image: SideImageState = defaultSideImage()) {
  const host = document.createElement('div');
  document.body.append(host);
  let text: SideTextState = defaultSideText();
  let picture = image;
  const mark = defaultMark();
  const cards = renderDecorCards(
    host,
    { sideText: () => text, sideImage: () => picture, mark: () => mark },
    {
      sideText: (next) => {
        text = next;
        cards.sync(text, picture, mark);
      },
      sideImage: (next) => {
        picture = next;
        cards.sync(text, picture, mark);
      },
      mark: () => {},
      viewBottom: () => {},
    },
  );
  cards.sync(text, picture, mark);
  return { host, text: () => text, picture: () => picture };
}

describe('группа «Надписи»', () => {
  it('текст, картинка и клеймо — по порядку', () => {
    const { host } = setup();
    expect([...host.querySelectorAll(':scope > .fcard')].map((card) => card.id)).toEqual(['card_text', 'card_image', 'card_mark']);
  });

  it('у текста — строки, шрифт, кегль и положение', () => {
    const { host } = setup();
    for (const id of ['text_on', 'text_text', 'text_font', 'text_size', 'text_angle', 'text_height', 'text_depth']) {
      expect(host.querySelector(`#${id}`), id).not.toBeNull();
    }
    expect(host.querySelector('#text_text')?.tagName).toBe('TEXTAREA');
  });

  it('у картинки — файл с ✕, инверсия, размер и положение; ✕ убирает картинку', () => {
    const { host, picture } = setup({ ...defaultSideImage(), on: true, image: IMAGE });
    for (const id of [
      'image_on',
      'image_file',
      'image_fileRemove',
      'image_invert',
      'image_size',
      'image_angle',
      'image_height',
      'image_depth',
    ]) {
      expect(host.querySelector(`#${id}`), id).not.toBeNull();
    }
    const remove = host.querySelector('#image_fileRemove');
    if (!(remove instanceof HTMLButtonElement)) throw new Error('no ✕');
    remove.click();
    expect(picture().image).toBeNull();
    expect(remove.hidden).toBe(true);
  });

  it('включённый текст раскрывает свою карточку', () => {
    const { host } = setup();
    const on = host.querySelector('#text_on');
    if (!(on instanceof HTMLInputElement)) throw new Error('no #text_on');
    on.checked = true;
    on.dispatchEvent(new Event('change'));
    expect(host.querySelector('#card_text')?.classList.contains('on')).toBe(true);
    expect(host.querySelector('#card_text')?.classList.contains('collapsed')).toBe(false);
  });
});
