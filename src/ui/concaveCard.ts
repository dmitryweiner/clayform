// Карточка вогнутого дна: вид, его ползунки и глубина, которую дала сфера.

import type { ConcaveState } from '../geo/concave';
import { CONCAVE_LIMITS } from '../geo/concave';
import { createCard } from 'maker-kit/ui/card';
import { make } from 'maker-kit/ui/dom';
import type { Change, Control } from './controls';
import { renderControls } from './controls';
import { t } from '../i18n';

const isSphere = (s: ConcaveState): boolean => s.kind === 'sphere';
const isFlat = (s: ConcaveState): boolean => s.kind === 'flat';

const CONCAVE_CONTROLS: Control<ConcaveState>[] = [
  {
    kind: 'check',
    key: 'on',
    label: 'ctl.on',
    get: (s) => s.on,
    set: (s, v) => ({ ...s, on: v }),
  },
  {
    kind: 'select',
    key: 'kind',
    label: 'concave.kind',
    options: [
      { value: 'sphere', label: 'concave.kind.sphere' },
      { value: 'flat', label: 'concave.kind.flat' },
    ],
    get: (s) => s.kind,
    set: (s, v) => ({ ...s, kind: v === 'flat' ? 'flat' : 'sphere' }),
  },
  // --- сфера ---
  {
    kind: 'range',
    key: 'radius',
    label: 'concave.radius',
    hint: 'concave.radius.hint',
    ...CONCAVE_LIMITS.radiusMm,
    step: 5,
    unit: 'unit.mm',
    when: isSphere,
    // текст заметки — глубина этой сферы на этом дне; пишет его setDepth
    note: { key: 'concave.depthNote', params: { d: '—' } },
    get: (s) => s.radiusMm,
    set: (s, v) => ({ ...s, radiusMm: v }),
  },
  // --- утопленное плоское ---
  {
    kind: 'range',
    key: 'depth',
    label: 'concave.depth',
    hint: 'concave.depth.hint',
    ...CONCAVE_LIMITS.depthMm,
    step: 0.5,
    unit: 'unit.mm',
    when: isFlat,
    get: (s) => s.depthMm,
    set: (s, v) => ({ ...s, depthMm: v }),
  },
  {
    kind: 'range',
    key: 'ring',
    label: 'concave.ring',
    hint: 'concave.ring.hint',
    ...CONCAVE_LIMITS.ringMm,
    step: 0.5,
    unit: 'unit.mm',
    when: isFlat,
    get: (s) => s.ringMm,
    set: (s, v) => ({ ...s, ringMm: v }),
  },
  {
    kind: 'range',
    key: 'fillet',
    label: 'concave.fillet',
    hint: 'concave.fillet.hint',
    ...CONCAVE_LIMITS.filletMm,
    step: 0.5,
    unit: 'unit.mm',
    when: isFlat,
    get: (s) => s.filletMm,
    set: (s, v) => ({ ...s, filletMm: v }),
  },
];

export interface ConcaveCardHandle {
  sync(state: ConcaveState): void;
  /** глубина, которую дала сфера на этом дне, мм; null — вогнутости нет */
  setDepth(depthMm: number | null): void;
}

/** Карточка вогнутого дна; `onView` — развернуть камеру на донышко. */
export function renderConcaveCard(
  container: HTMLElement,
  read: () => ConcaveState,
  write: Change<ConcaveState>,
  onView: () => void,
): ConcaveCardHandle {
  container.textContent = '';
  const card = createCard(container, {
    id: 'concave',
    title: 'concave.title',
    desc: 'concave.desc',
    enabled: read().on,
    t,
  });
  // renderControls очищает свой контейнер — кнопке нужен свой
  const view = make('button', 'row-btn', t('concave.view'));
  view.type = 'button';
  view.id = 'concave_view';
  view.addEventListener('click', onView);
  const host = make('div');
  card.body.append(view, host);
  const rows = renderControls(host, CONCAVE_CONTROLS, read, write, 'concave');
  // Заметка кита — текст, заданный при отрисовке; глубина же меняется с
  // каждой правкой, поэтому её пишет карточка сама.
  const note = host.querySelector('#concave_radius_note');
  return {
    sync(state): void {
      card.setEnabled(state.on);
      rows.sync(state);
    },
    setDepth(depthMm): void {
      if (note) note.textContent = depthMm === null ? '' : t('concave.depthNote', { d: depthMm.toFixed(1) });
    },
  };
}
