// Текст и картинка на боку в состоянии: санаторы не бросают ни на чём,
// идемпотентны и держат пределы; старое состояние без полей — выключено.

import { defaultSideText, sanitizeSideText, sideTextLines, SIDE_TEXT_MAX, SIDE_TEXT_SIZE, DECAL_LIMITS } from '../src/geo/sideText';
import { defaultSideImage, sanitizeSideImage, SIDE_IMAGE_MAX_PX, SIDE_IMAGE_SIZE } from '../src/geo/sideImage';
import { sanitizeState } from '../src/state/schema';
import { encodeBase64 } from '../src/geo/bytes';

const GARBAGE: unknown[] = [null, undefined, 'текст', 42, [], { on: 'да' }, { text: {}, sizeMm: Infinity, angleDeg: 'x' }];

describe('текст на боку', () => {
  it('не бросает ни на чём и идемпотентен', () => {
    for (const raw of [...GARBAGE, { on: true, text: 'А\nБ', sizeMm: 999, angleDeg: -999, heightAt: 2, depthMm: -9 }]) {
      const once = sanitizeSideText(raw);
      expect(sanitizeSideText(once)).toEqual(once);
    }
    expect(sanitizeSideText(null)).toEqual(defaultSideText());
  });

  it('держит пределы', () => {
    const state = sanitizeSideText({ sizeMm: 999, angleDeg: -999, heightAt: 2, depthMm: -9, font: 'comic' });
    expect(state.sizeMm).toBe(SIDE_TEXT_SIZE.max);
    expect(state.angleDeg).toBe(DECAL_LIMITS.angleDeg.min);
    expect(state.heightAt).toBe(1);
    expect(state.depthMm).toBe(DECAL_LIMITS.depthMm.min);
    expect(state.font).toBe('rubik');
  });

  it('не больше трёх строк и предела символов, без управляющих символов', () => {
    expect(sanitizeSideText({ text: 'a\nb\nc\nd' }).text).toBe('a\nb\nc');
    expect(sanitizeSideText({ text: 'a\r\nb\tc' }).text).toBe('a\nb c');
    expect([...sanitizeSideText({ text: 'я'.repeat(200) }).text]).toHaveLength(SIDE_TEXT_MAX);
  });

  it('пустые строки по краям не рисуются, в середине — интервал', () => {
    expect(sideTextLines({ ...defaultSideText(), text: '\n Мама \n\nПапа\n ' })).toEqual([' Мама ', '', 'Папа']);
    expect(sideTextLines({ ...defaultSideText(), text: ' \n ' })).toEqual([]);
  });
});

describe('картинка на боку', () => {
  const image = (w: number, h: number) => ({ w, h, data: encodeBase64(new Uint8Array(w * h)), invert: true });

  it('не бросает ни на чём и идемпотентна', () => {
    for (const raw of [...GARBAGE, { on: true, image: image(8, 4), sizeMm: 0 }, { image: 'картинка' }]) {
      const once = sanitizeSideImage(raw);
      expect(sanitizeSideImage(once)).toEqual(once);
    }
    expect(sanitizeSideImage(undefined)).toEqual(defaultSideImage());
  });

  it('картинка — до 256 px по стороне, битая — пропадает', () => {
    expect(sanitizeSideImage({ image: image(SIDE_IMAGE_MAX_PX, 4) }).image?.w).toBe(SIDE_IMAGE_MAX_PX);
    expect(sanitizeSideImage({ image: image(SIDE_IMAGE_MAX_PX + 1, 4) }).image).toBeNull();
    expect(sanitizeSideImage({ image: { ...image(8, 4), data: 'не base64' } }).image).toBeNull();
    expect(sanitizeSideImage({ sizeMm: 1 }).sizeMm).toBe(SIDE_IMAGE_SIZE.min);
  });
});

describe('старое состояние', () => {
  it('без полей текста и картинки — оба выключены', () => {
    const state = sanitizeState({ family: 'cup' });
    expect(state.sideText).toEqual(defaultSideText());
    expect(state.sideImage).toEqual(defaultSideImage());
  });
});
