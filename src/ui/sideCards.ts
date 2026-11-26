// Карточки надписей на боку: текст и картинка. Положение у обоих общее —
// по кругу от «лица», высота центра и глубина со знаком (`geo/decal.ts`).

import type { SideTextState } from '../geo/sideText';
import { DECAL_LIMITS, SIDE_TEXT_LINES, SIDE_TEXT_MAX, SIDE_TEXT_SIZE } from '../geo/sideText';
import type { SideImageState } from '../geo/sideImage';
import { SIDE_IMAGE_MAX_PX, SIDE_IMAGE_SIZE } from '../geo/sideImage';
import { MARK_FONTS } from '../geo/mark';
import { createCard } from 'maker-kit/ui/card';
import type { Change, Control } from './controls';
import { renderControls } from './controls';
import { t } from '../i18n';
import { MARK_FONT_FILES } from './fonts';

interface Placement {
  angleDeg: number;
  heightAt: number;
  depthMm: number;
}

/** Строки положения — одни у текста и у картинки. */
function placementControls<T extends Placement>(): Control<T>[] {
  return [
    {
      kind: 'range',
      key: 'angle',
      label: 'decal.angle',
      hint: 'decal.angle.hint',
      ...DECAL_LIMITS.angleDeg,
      step: 1,
      unit: 'unit.deg',
      get: (s) => s.angleDeg,
      set: (s, v) => ({ ...s, angleDeg: v }),
    },
    {
      kind: 'range',
      key: 'height',
      label: 'decal.height',
      hint: 'decal.height.hint',
      ...DECAL_LIMITS.heightAt,
      step: 0.01,
      get: (s) => s.heightAt,
      set: (s, v) => ({ ...s, heightAt: v }),
    },
    {
      kind: 'range',
      key: 'depth',
      label: 'ctl.depth',
      hint: 'decal.depth.hint',
      ...DECAL_LIMITS.depthMm,
      step: 0.1,
      unit: 'unit.mm',
      get: (s) => s.depthMm,
      set: (s, v) => ({ ...s, depthMm: v }),
    },
  ];
}

const TEXT_CONTROLS: Control<SideTextState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.on,
    set: (s, v) => ({ ...s, on: v }),
  },
  {
    kind: 'textarea',
    key: 'text',
    label: 'sideText.text',
    hint: 'sideText.text.hint',
    rows: SIDE_TEXT_LINES,
    maxLength: SIDE_TEXT_MAX,
    get: (s) => s.text,
    set: (s, v) => ({ ...s, text: v }),
  },
  {
    kind: 'select',
    key: 'font',
    label: 'mark.font',
    options: MARK_FONTS.map((font) => ({ value: font, text: MARK_FONT_FILES[font].label })),
    get: (s) => s.font,
    set: (s, v) => ({ ...s, font: MARK_FONTS.find((font) => font === v) ?? s.font }),
  },
  {
    kind: 'range',
    key: 'size',
    label: 'mark.size',
    hint: 'sideText.size.hint',
    ...SIDE_TEXT_SIZE,
    step: 0.5,
    unit: 'unit.mm',
    get: (s) => s.sizeMm,
    set: (s, v) => ({ ...s, sizeMm: v }),
  },
  ...placementControls<SideTextState>(),
];

const IMAGE_CONTROLS: Control<SideImageState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.on,
    set: (s, v) => ({ ...s, on: v }),
  },
  {
    kind: 'image',
    key: 'file',
    label: 'mark.logoFile',
    hint: 'sideImage.file.hint',
    maxPx: SIDE_IMAGE_MAX_PX,
    get: (s) => s.image ?? undefined,
    // инверсия переживает смену картинки
    set: (s, image) => ({ ...s, image: { ...image, invert: s.image?.invert ?? false } }),
    remove: { key: 'fileRemove', label: 'sideImage.remove', apply: (s) => ({ ...s, image: null }) },
  },
  {
    kind: 'check',
    key: 'invert',
    label: 'band.invert',
    hint: 'band.invert.hint',
    when: (s) => s.image !== null,
    get: (s) => s.image?.invert ?? false,
    set: (s, v) => (s.image ? { ...s, image: { ...s.image, invert: v } } : s),
  },
  {
    kind: 'range',
    key: 'size',
    label: 'sideImage.size',
    hint: 'sideImage.size.hint',
    ...SIDE_IMAGE_SIZE,
    step: 1,
    unit: 'unit.mm',
    get: (s) => s.sizeMm,
    set: (s, v) => ({ ...s, sizeMm: v }),
  },
  ...placementControls<SideImageState>(),
];

export interface SideCardHandle<T> {
  sync(state: T): void;
}

export function renderSideTextCard(
  container: HTMLElement,
  read: () => SideTextState,
  write: Change<SideTextState>,
): SideCardHandle<SideTextState> {
  const card = createCard(container, { id: 'text', title: 'sideText.title', desc: 'sideText.desc', enabled: read().on, t });
  const rows = renderControls(card.body, TEXT_CONTROLS, read, write, 'text');
  return {
    sync(state): void {
      card.setEnabled(state.on);
      rows.sync(state);
    },
  };
}

export function renderSideImageCard(
  container: HTMLElement,
  read: () => SideImageState,
  write: Change<SideImageState>,
): SideCardHandle<SideImageState> {
  const card = createCard(container, { id: 'image', title: 'sideImage.title', desc: 'sideImage.desc', enabled: read().on, t });
  const rows = renderControls(card.body, IMAGE_CONTROLS, read, write, 'image');
  return {
    sync(state): void {
      card.setEnabled(state.on);
      rows.sync(state);
    },
  };
}
