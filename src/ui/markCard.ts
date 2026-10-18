// Карточка клейма на донышке: строка, шрифт, дата, лого.

import type { MarkState } from '../geo/mark';
import {
  MARK_FONTS, MARK_TEXT_MAX, MARK_SIZE_MIN_MM, MARK_SIZE_MAX_MM, MARK_MARGIN_MAX_MM,
  MARK_DEPTH_MIN_MM, MARK_DEPTH_MAX_MM, LOGO_MIN_MM, LOGO_MAX_MM, LOGO_MAX_PX, todayIso,
} from '../geo/mark';
import type { Control } from './controls';
import { renderControls } from './controls';
import type { ControlsHandle } from './controls';
import { createCard } from './card';
import type { CardHandle } from './card';
import { make } from './dom';
import { t } from '../i18n';
import { MARK_FONT_FILES } from './fonts';

const hasLogo = (s: MarkState): boolean => s.logo !== null;

const MARK_CONTROLS: Control<MarkState>[] = [
  {
    kind: 'text', key: 'text', label: 'mark.text', hint: 'mark.text.hint',
    placeholder: 'mark.text.placeholder', maxLength: MARK_TEXT_MAX,
    get: (s) => s.text,
    set: (s, v) => ({ ...s, text: v }),
  },
  {
    kind: 'select', key: 'font', label: 'mark.font',
    options: MARK_FONTS.map((font) => ({ value: font, text: MARK_FONT_FILES[font].label })),
    get: (s) => s.font,
    set: (s, v) => ({ ...s, font: MARK_FONTS.find((font) => font === v) ?? s.font }),
  },
  {
    kind: 'check', key: 'date', label: 'mark.date', hint: 'mark.date.hint',
    get: (s) => s.date !== null,
    // дата запоминается в момент галочки: клеймо — про день, когда делали
    set: (s, v) => ({ ...s, date: v ? todayIso() : null }),
  },
  {
    kind: 'range', key: 'start', label: 'mark.start', min: 0, max: 355, step: 5,
    hint: 'mark.start.hint',
    get: (s) => s.startDeg,
    set: (s, v) => ({ ...s, startDeg: v }),
  },
  {
    kind: 'range', key: 'size', label: 'mark.size', min: MARK_SIZE_MIN_MM, max: MARK_SIZE_MAX_MM, step: 0.5,
    hint: 'mark.size.hint',
    get: (s) => s.sizeMm,
    set: (s, v) => ({ ...s, sizeMm: v }),
  },
  {
    kind: 'range', key: 'margin', label: 'mark.margin', min: 0, max: MARK_MARGIN_MAX_MM, step: 0.5,
    hint: 'mark.margin.hint',
    get: (s) => s.marginMm,
    set: (s, v) => ({ ...s, marginMm: v }),
  },
  {
    kind: 'range', key: 'depth', label: 'mark.depth', min: MARK_DEPTH_MIN_MM, max: MARK_DEPTH_MAX_MM, step: 0.1,
    hint: 'mark.depth.hint',
    get: (s) => s.depthMm,
    set: (s, v) => ({ ...s, depthMm: v }),
  },
  {
    kind: 'image', key: 'logo', label: 'mark.logo', hint: 'mark.logo.hint', maxPx: LOGO_MAX_PX,
    get: (s) => s.logo?.image,
    set: (s, image) => ({
      ...s,
      logo: { image, angleDeg: s.logo?.angleDeg ?? 0, sizeMm: s.logo?.sizeMm ?? 25 },
    }),
  },
  {
    kind: 'check', key: 'logoInvert', label: 'mark.logoInvert', when: hasLogo,
    get: (s) => s.logo?.image.invert ?? false,
    set: (s, v) => (s.logo ? { ...s, logo: { ...s.logo, image: { ...s.logo.image, invert: v } } } : s),
  },
  {
    kind: 'range', key: 'logoAngle', label: 'mark.logoAngle', min: 0, max: 355, step: 5, when: hasLogo,
    hint: 'mark.logoAngle.hint',
    get: (s) => s.logo?.angleDeg ?? 0,
    set: (s, v) => (s.logo ? { ...s, logo: { ...s.logo, angleDeg: v } } : s),
  },
  {
    kind: 'range', key: 'logoSize', label: 'mark.logoSize', min: LOGO_MIN_MM, max: LOGO_MAX_MM, step: 1,
    when: hasLogo, hint: 'mark.logoSize.hint',
    get: (s) => s.logo?.sizeMm ?? 25,
    set: (s, v) => (s.logo ? { ...s, logo: { ...s.logo, sizeMm: v } } : s),
  },
  {
    kind: 'button', key: 'logoRemove', label: 'mark.logoRemove', button: 'mark.logoRemove.button',
    when: hasLogo,
    apply: (s) => ({ ...s, logo: null }),
  },
];

export interface MarkCardHandle {
  card: CardHandle;
  rows: ControlsHandle<MarkState>;
}

/** Карточка клейма; `onView` — развернуть камеру на донышко. */
export function renderMarkCard(
  container: HTMLElement,
  read: () => MarkState,
  write: (next: MarkState) => void,
  onView: () => void,
): MarkCardHandle {
  const card = createCard(container, {
    id: 'mark',
    title: 'mark.title',
    desc: 'mark.desc',
    enabled: read().on,
    onToggle: (on) => write({ ...read(), on }),
  });
  // renderControls очищает свой контейнер — кнопке нужен свой
  const view = make('button', 'tb-btn', t('mark.view'));
  view.type = 'button';
  view.id = 'mark_view';
  view.onclick = onView;
  const host = make('div');
  card.body.append(view, host);
  const rows = renderControls(host, MARK_CONTROLS, read, write, 'mark');
  return { card, rows };
}
