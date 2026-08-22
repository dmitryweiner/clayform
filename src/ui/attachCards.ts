// Карточки приставных деталей: ручка, носик-слив и крышка.

import type { HandleState } from '../geo/handle';
import { REACH_MAX_MM, THICKNESS_MAX_MM, ANGLE_MAX_DEG } from '../geo/handle';
import type { SpoutState } from '../geo/spout';
import { PULL_MAX_MM, SPOUT_LIMITS } from '../geo/spout';
import type { LidState } from '../geo/lid';
import { LID_LIMITS } from '../geo/lid';
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

const isLip = (s: SpoutState): boolean => s.kind === 'lip';
const isApplied = (s: SpoutState): boolean => s.kind === 'applied';

const SPOUT_CONTROLS: Control<SpoutState>[] = [
  {
    kind: 'select', key: 'kind', label: 'Какой',
    options: [
      { value: 'lip', label: 'оттянутый край (крынка)' },
      { value: 'applied', label: 'трубчатый (чайник)' },
    ],
    get: (s) => s.kind,
    set: (s, v) => ({ ...s, kind: v === 'applied' ? 'applied' : 'lip' }),
  },
  // --- оттянутый край ---
  {
    kind: 'range', key: 'pull', label: 'Вытяг', min: 0, max: PULL_MAX_MM, step: 0.5, unit: 'мм',
    when: isLip,
    get: (s) => s.pullMm,
    set: (s, v) => ({ ...s, pullMm: v }),
  },
  {
    kind: 'range', key: 'width', label: 'Ширина', min: 15, max: 180, step: 1, unit: '°',
    when: isLip,
    get: (s) => s.widthDeg,
    set: (s, v) => ({ ...s, widthDeg: v }),
  },
  {
    kind: 'range', key: 'zone', label: 'Высота', min: 0.03, max: 0.6, step: 0.01,
    hint: 'по какой доле высоты сверху идёт оттяжка',
    when: isLip,
    get: (s) => s.zone,
    set: (s, v) => ({ ...s, zone: v }),
  },
  // --- трубчатый ---
  {
    kind: 'range', key: 'attach', label: 'Крепление',
    min: SPOUT_LIMITS.attachAt.min, max: SPOUT_LIMITS.attachAt.max, step: 0.01,
    hint: 'на какой доле высоты трубка выходит из стенки',
    when: isApplied,
    get: (s) => s.attachAt,
    set: (s, v) => ({ ...s, attachAt: v }),
  },
  {
    kind: 'range', key: 'length', label: 'Длина',
    min: SPOUT_LIMITS.lengthMm.min, max: SPOUT_LIMITS.lengthMm.max, step: 1, unit: 'мм',
    hint: 'вынос кончика от стенки по горизонтали',
    when: isApplied,
    get: (s) => s.lengthMm,
    set: (s, v) => ({ ...s, lengthMm: v }),
  },
  {
    kind: 'range', key: 'tip', label: 'Высота кончика',
    min: SPOUT_LIMITS.tipAt.min, max: SPOUT_LIMITS.tipAt.max, step: 0.01,
    hint: 'доля высоты изделия; ниже венчика — изделие не налить доверху',
    when: isApplied,
    get: (s) => s.tipAt,
    set: (s, v) => ({ ...s, tipAt: v }),
  },
  {
    kind: 'range', key: 'base', label: '⌀ основания',
    min: SPOUT_LIMITS.baseMm.min, max: SPOUT_LIMITS.baseMm.max, step: 1, unit: 'мм',
    when: isApplied,
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
  {
    kind: 'range', key: 'tipD', label: '⌀ кончика',
    min: SPOUT_LIMITS.tipMm.min, max: SPOUT_LIMITS.tipMm.max, step: 1, unit: 'мм',
    hint: 'толще основания не бывает — трубка сужается к устью',
    when: isApplied,
    get: (s) => s.tipMm,
    set: (s, v) => ({ ...s, tipMm: v }),
  },
  {
    kind: 'range', key: 'angle', label: 'Наклон кончика',
    min: SPOUT_LIMITS.tipAngleDeg.min, max: SPOUT_LIMITS.tipAngleDeg.max, step: 1, unit: '°',
    when: isApplied,
    get: (s) => s.tipAngleDeg,
    set: (s, v) => ({ ...s, tipAngleDeg: v }),
  },
];

const isTee = (s: LidState): boolean => s.knobKind === 'tee';

const LID_CONTROLS: Control<LidState>[] = [
  {
    kind: 'range', key: 'recess', label: 'Утопление',
    min: LID_LIMITS.recessMm.min, max: LID_LIMITS.recessMm.max, step: 0.5, unit: 'мм',
    hint: '0 — поле лежит на венчике; больше — крышка опущена в горловину на полочку',
    get: (s) => s.recessMm,
    set: (s, v) => ({ ...s, recessMm: v }),
  },
  {
    kind: 'range', key: 'depth', label: 'Юбка',
    min: LID_LIMITS.depthMm.min, max: LID_LIMITS.depthMm.max, step: 0.5, unit: 'мм',
    hint: 'на сколько юбка уходит в горловину — ею крышка и держится от съезжания',
    get: (s) => s.depthMm,
    set: (s, v) => ({ ...s, depthMm: v }),
  },
  {
    kind: 'range', key: 'ledge', label: 'Полочка',
    min: LID_LIMITS.ledgeMm.min, max: LID_LIMITS.ledgeMm.max, step: 0.1, unit: 'мм',
    hint: 'на столько посадка уже полости. 0 — горловину просто цилиндризует, '
      + 'и отливка выходит из формы готовой; полочку же довели бы по сырому',
    get: (s) => s.ledgeMm,
    set: (s, v) => ({ ...s, ledgeMm: v }),
  },
  {
    kind: 'range', key: 'clearance', label: 'Зазор в горловине',
    min: LID_LIMITS.clearanceMm.min, max: LID_LIMITS.clearanceMm.max, step: 0.05, unit: 'мм',
    hint: 'между юбкой крышки и посадкой в горловине, на сторону: '
      + 'меньше — крышка сидит плотнее, но тем вернее закусит при усадке',
    get: (s) => s.clearanceMm,
    set: (s, v) => ({ ...s, clearanceMm: v }),
  },
  {
    kind: 'range', key: 'field', label: 'Поле',
    min: LID_LIMITS.fieldMm.min, max: LID_LIMITS.fieldMm.max, step: 0.5, unit: 'мм',
    hint: 'вынос края за посадку; за наружную стенку изделия не выходит',
    get: (s) => s.fieldMm,
    set: (s, v) => ({ ...s, fieldMm: v }),
  },
  {
    kind: 'range', key: 'dome', label: 'Купол',
    min: LID_LIMITS.domeMm.min, max: LID_LIMITS.domeMm.max, step: 0.5, unit: 'мм',
    get: (s) => s.domeMm,
    set: (s, v) => ({ ...s, domeMm: v }),
  },
  {
    kind: 'range', key: 'curvature', label: 'Округлость',
    min: LID_LIMITS.curvature.min, max: LID_LIMITS.curvature.max, step: 0.01,
    hint: '0 — конус, 1 — сферический сегмент',
    get: (s) => s.curvature,
    set: (s, v) => ({ ...s, curvature: v }),
  },
  {
    kind: 'select', key: 'knob', label: 'Ручка',
    options: [
      { value: 'ball', label: 'шар на ножке' },
      { value: 'tee', label: 'диск (Т в разрезе)' },
    ],
    get: (s) => s.knobKind,
    set: (s, v) => ({ ...s, knobKind: v === 'tee' ? 'tee' : 'ball' }),
  },
  {
    kind: 'range', key: 'knobD', label: '⌀ ручки',
    min: LID_LIMITS.knobDMm.min, max: LID_LIMITS.knobDMm.max, step: 0.5, unit: 'мм',
    get: (s) => s.knobDMm,
    set: (s, v) => ({ ...s, knobDMm: v }),
  },
  {
    kind: 'range', key: 'stemD', label: '⌀ ножки',
    min: LID_LIMITS.stemDMm.min, max: LID_LIMITS.stemDMm.max, step: 0.5, unit: 'мм',
    hint: 'толще ручки не бывает — это была бы уже не ручка, а обрубок',
    get: (s) => s.stemDMm,
    set: (s, v) => ({ ...s, stemDMm: v }),
  },
  {
    kind: 'range', key: 'stemH', label: 'Высота ножки',
    min: LID_LIMITS.stemHMm.min, max: LID_LIMITS.stemHMm.max, step: 0.5, unit: 'мм',
    hint: 'за неё крышку и берут — под пальцы нужен просвет',
    get: (s) => s.stemHMm,
    set: (s, v) => ({ ...s, stemHMm: v }),
  },
  {
    kind: 'range', key: 'capH', label: 'Толщина диска',
    min: LID_LIMITS.capHMm.min, max: LID_LIMITS.capHMm.max, step: 0.5, unit: 'мм',
    when: isTee,
    get: (s) => s.capHMm,
    set: (s, v) => ({ ...s, capHMm: v }),
  },
];

/** Откуда карточки берут состояние и куда возвращают изменённое. */
export interface AttachSources {
  handle(): HandleState;
  spout(): SpoutState;
  lid(): LidState;
}

export interface AttachSinks {
  handle(next: HandleState): void;
  spout(next: SpoutState): void;
  lid(next: LidState): void;
}

export interface AttachCardsHandle {
  sync(handle: HandleState, spout: SpoutState, lid: LidState): void;
}

export function renderAttachCards(
  container: HTMLElement,
  read: AttachSources,
  write: AttachSinks,
): AttachCardsHandle {
  container.textContent = '';

  const handleCard = createCard(container, {
    id: 'handle',
    title: 'Ручка',
    desc: 'Дуга в плоскости разъёма формы: одна ручка сзади, две — зеркально, как у амфоры.',
    enabled: read.handle().on,
    onToggle: (on) => write.handle({ ...read.handle(), on }),
  });
  const handleRows = renderControls(handleCard.body, HANDLE_CONTROLS, read.handle, write.handle, 'handle');

  const spoutCard = createCard(container, {
    id: 'spout',
    title: 'Носик',
    desc: 'Оттянутый наружу край, как у крынки, или приставная трубка, как у чайника. '
      + 'Смотрит вперёд, напротив ручки.',
    enabled: read.spout().on,
    onToggle: (on) => write.spout({ ...read.spout(), on }),
  });
  const spoutRows = renderControls(spoutCard.body, SPOUT_CONTROLS, read.spout, write.spout, 'spout');

  const lidCard = createCard(container, {
    id: 'lid',
    title: 'Крышка',
    desc: 'Отдельная деталь: печатается и отливается сама по себе, в форме — перевёрнутой. '
      + 'В горловине изделия под неё формируется цилиндрическая посадка. '
      + 'С оттянутым краем крышка несовместима — при ней он выключается.',
    enabled: read.lid().on,
    onToggle: (on) => write.lid({ ...read.lid(), on }),
  });
  const lidRows = renderControls(lidCard.body, LID_CONTROLS, read.lid, write.lid, 'lid');

  return {
    sync(handle, spout, lid): void {
      handleCard.setEnabled(handle.on);
      spoutCard.setEnabled(spout.on);
      lidCard.setEnabled(lid.on);
      handleRows.sync(handle);
      spoutRows.sync(spout);
      lidRows.sync(lid);
    },
  };
}
