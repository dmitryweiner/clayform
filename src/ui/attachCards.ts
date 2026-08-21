// Карточки приставных деталей: ручка и носик-слив.

import type { HandleState } from '../geo/handle';
import { REACH_MAX_MM, THICKNESS_MAX_MM, ANGLE_MAX_DEG } from '../geo/handle';
import type { SpoutState } from '../geo/spout';
import { PULL_MAX_MM } from '../geo/spout';
import type { Control } from './controls';
import { renderControls } from './controls';
import { createCard } from './card';

const HANDLE_CONTROLS: Control<HandleState>[] = [
  {
    kind: 'select', key: 'count', label: 'Сколько',
    options: [{ value: '1', label: 'одна (кружка)' }, { value: '2', label: 'две (амфора)' }],
    get: (s) => String(s.count),
    set: (s, v) => ({ ...s, count: v === '2' ? 2 : 1 }),
  },
  {
    kind: 'range', key: 'topAt', label: 'Верх', min: 0.15, max: 0.98, step: 0.01,
    hint: 'высота верхнего крепления, доля высоты изделия',
    get: (s) => s.topAt,
    set: (s, v) => ({ ...s, topAt: v }),
  },
  {
    kind: 'range', key: 'bottomAt', label: 'Низ', min: 0.02, max: 0.88, step: 0.01,
    get: (s) => s.bottomAt,
    set: (s, v) => ({ ...s, bottomAt: v }),
  },
  {
    kind: 'range', key: 'reach', label: 'Вынос', min: 3, max: REACH_MAX_MM, step: 1, unit: 'мм',
    hint: 'насколько дуга отходит от стенки',
    get: (s) => s.reachMm,
    set: (s, v) => ({ ...s, reachMm: v }),
  },
  {
    kind: 'range', key: 'thickness', label: 'Толщина', min: 3, max: THICKNESS_MAX_MM, step: 0.5, unit: 'мм',
    get: (s) => s.thicknessMm,
    set: (s, v) => ({ ...s, thicknessMm: v }),
  },
  {
    kind: 'range', key: 'width', label: 'Ширина', min: 0.25, max: 3, step: 0.05,
    hint: 'ширина сечения в долях толщины',
    get: (s) => s.widthRatio,
    set: (s, v) => ({ ...s, widthRatio: v }),
  },
  {
    kind: 'range', key: 'topAngle', label: 'Угол вверху', min: -ANGLE_MAX_DEG, max: ANGLE_MAX_DEG, step: 1, unit: '°',
    hint: 'под каким наклоном дуга отходит от стенки; 0 — под прямым углом',
    get: (s) => s.topAngleDeg,
    set: (s, v) => ({ ...s, topAngleDeg: v }),
  },
  {
    kind: 'range', key: 'bottomAngle', label: 'Угол внизу', min: -ANGLE_MAX_DEG, max: ANGLE_MAX_DEG, step: 1, unit: '°',
    hint: 'отрицательный уводит нижний конец дуги вниз',
    get: (s) => s.bottomAngleDeg,
    set: (s, v) => ({ ...s, bottomAngleDeg: v }),
  },
];

const SPOUT_CONTROLS: Control<SpoutState>[] = [
  {
    kind: 'range', key: 'pull', label: 'Вытяг', min: 0, max: PULL_MAX_MM, step: 0.5, unit: 'мм',
    get: (s) => s.pullMm,
    set: (s, v) => ({ ...s, pullMm: v }),
  },
  {
    kind: 'range', key: 'width', label: 'Ширина', min: 15, max: 180, step: 1, unit: '°',
    get: (s) => s.widthDeg,
    set: (s, v) => ({ ...s, widthDeg: v }),
  },
  {
    kind: 'range', key: 'zone', label: 'Высота', min: 0.03, max: 0.6, step: 0.01,
    hint: 'по какой доле высоты сверху идёт оттяжка',
    get: (s) => s.zone,
    set: (s, v) => ({ ...s, zone: v }),
  },
];

export interface AttachCardsHandle {
  sync(handle: HandleState, spout: SpoutState): void;
}

export function renderAttachCards(
  container: HTMLElement,
  readHandle: () => HandleState,
  readSpout: () => SpoutState,
  onHandle: (handle: HandleState) => void,
  onSpout: (spout: SpoutState) => void,
): AttachCardsHandle {
  container.textContent = '';

  const handleCard = createCard(container, {
    id: 'handle',
    title: 'Ручка',
    desc: 'Дуга в плоскости разъёма формы: одна ручка сзади, две — зеркально, как у амфоры.',
    enabled: readHandle().on,
    onToggle: (on) => onHandle({ ...readHandle(), on }),
  });
  const handleRows = renderControls(handleCard.body, HANDLE_CONTROLS, readHandle, onHandle, 'handle');

  const spoutCard = createCard(container, {
    id: 'spout',
    title: 'Носик',
    desc: 'Оттянутый наружу край, как у крынки. Смотрит вперёд, напротив ручки.',
    enabled: readSpout().on,
    onToggle: (on) => onSpout({ ...readSpout(), on }),
  });
  const spoutRows = renderControls(spoutCard.body, SPOUT_CONTROLS, readSpout, onSpout, 'spout');

  return {
    sync(handle, spout): void {
      handleCard.setEnabled(handle.on);
      spoutCard.setEnabled(spout.on);
      handleRows.sync(handle);
      spoutRows.sync(spout);
    },
  };
}
