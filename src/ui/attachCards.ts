// Карточки приставных деталей: ручка, носик-слив и крышка.

import type { HandleState } from '../geo/handle';
import { REACH_MAX_MM, THICKNESS_MAX_MM, ANGLE_MAX_DEG } from '../geo/handle';
import type { SpoutState } from '../geo/spout';
import { PULL_MAX_MM, SPOUT_LIMITS } from '../geo/spout';
import type { LidState } from '../geo/lid';
import type { RouletteBand } from '../geo/roulette';
import { renderBandList } from './reliefCards';
import { make } from './dom';
import { t } from '../i18n';
import { LID_LIMITS } from '../geo/lid';
import type { Control } from './controls';
import { renderControls } from './controls';
import { createCard } from './card';

const HANDLE_CONTROLS: Control<HandleState>[] = [
  {
    kind: 'select', key: 'count', label: 'handle.count',
    options: [{ value: '1', label: 'handle.count.one' }, { value: '2', label: 'handle.count.two' }],
    get: (s) => String(s.count),
    set: (s, v) => ({ ...s, count: v === '2' ? 2 : 1 }),
  },
  {
    kind: 'range', key: 'topAt', label: 'handle.top', min: 0.15, max: 0.98, step: 0.01,
    hint: 'handle.top.hint',
    get: (s) => s.topAt,
    set: (s, v) => ({ ...s, topAt: v }),
  },
  {
    kind: 'range', key: 'bottomAt', label: 'handle.bottom', min: 0.02, max: 0.88, step: 0.01,
    get: (s) => s.bottomAt,
    set: (s, v) => ({ ...s, bottomAt: v }),
  },
  {
    kind: 'range', key: 'reach', label: 'handle.reach', min: 3, max: REACH_MAX_MM, step: 1,
    hint: 'handle.reach.hint',
    get: (s) => s.reachMm,
    set: (s, v) => ({ ...s, reachMm: v }),
  },
  {
    kind: 'range', key: 'thickness', label: 'handle.thickness', min: 3, max: THICKNESS_MAX_MM, step: 0.5,
    get: (s) => s.thicknessMm,
    set: (s, v) => ({ ...s, thicknessMm: v }),
  },
  {
    kind: 'range', key: 'width', label: 'ctl.width', min: 0.25, max: 3, step: 0.05,
    hint: 'handle.width.hint',
    get: (s) => s.widthRatio,
    set: (s, v) => ({ ...s, widthRatio: v }),
  },
  {
    kind: 'range', key: 'topAngle', label: 'handle.topAngle', min: -ANGLE_MAX_DEG, max: ANGLE_MAX_DEG, step: 1,
    hint: 'handle.topAngle.hint',
    get: (s) => s.topAngleDeg,
    set: (s, v) => ({ ...s, topAngleDeg: v }),
  },
  {
    kind: 'range', key: 'bottomAngle', label: 'handle.bottomAngle', min: -ANGLE_MAX_DEG, max: ANGLE_MAX_DEG, step: 1,
    hint: 'handle.bottomAngle.hint',
    get: (s) => s.bottomAngleDeg,
    set: (s, v) => ({ ...s, bottomAngleDeg: v }),
  },
];

const isLip = (s: SpoutState): boolean => s.kind === 'lip';
const isApplied = (s: SpoutState): boolean => s.kind === 'applied';

const SPOUT_CONTROLS: Control<SpoutState>[] = [
  {
    kind: 'select', key: 'kind', label: 'spout.kind',
    options: [
      { value: 'lip', label: 'spout.kind.lip' },
      { value: 'applied', label: 'spout.kind.applied' },
    ],
    get: (s) => s.kind,
    set: (s, v) => ({ ...s, kind: v === 'applied' ? 'applied' : 'lip' }),
  },
  // --- оттянутый край ---
  {
    kind: 'range', key: 'pull', label: 'spout.pull', min: 0, max: PULL_MAX_MM, step: 0.5,
    when: isLip,
    get: (s) => s.pullMm,
    set: (s, v) => ({ ...s, pullMm: v }),
  },
  {
    kind: 'range', key: 'width', label: 'ctl.width', min: 15, max: 180, step: 1,
    when: isLip,
    get: (s) => s.widthDeg,
    set: (s, v) => ({ ...s, widthDeg: v }),
  },
  {
    kind: 'range', key: 'zone', label: 'ctl.height', min: 0.03, max: 0.6, step: 0.01,
    hint: 'spout.zone.hint',
    when: isLip,
    get: (s) => s.zone,
    set: (s, v) => ({ ...s, zone: v }),
  },
  // --- трубчатый ---
  {
    kind: 'range', key: 'attach', label: 'spout.attach',
    min: SPOUT_LIMITS.attachAt.min, max: SPOUT_LIMITS.attachAt.max, step: 0.01,
    hint: 'spout.attach.hint',
    when: isApplied,
    get: (s) => s.attachAt,
    set: (s, v) => ({ ...s, attachAt: v }),
  },
  {
    kind: 'range', key: 'length', label: 'spout.length',
    min: SPOUT_LIMITS.lengthMm.min, max: SPOUT_LIMITS.lengthMm.max, step: 1,
    hint: 'spout.length.hint',
    when: isApplied,
    get: (s) => s.lengthMm,
    set: (s, v) => ({ ...s, lengthMm: v }),
  },
  {
    kind: 'range', key: 'tip', label: 'spout.tip',
    min: SPOUT_LIMITS.tipAt.min, max: SPOUT_LIMITS.tipAt.max, step: 0.01,
    hint: 'spout.tip.hint',
    when: isApplied,
    get: (s) => s.tipAt,
    set: (s, v) => ({ ...s, tipAt: v }),
  },
  {
    kind: 'range', key: 'base', label: 'spout.base',
    min: SPOUT_LIMITS.baseMm.min, max: SPOUT_LIMITS.baseMm.max, step: 1,
    when: isApplied,
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
  {
    kind: 'range', key: 'tipD', label: 'spout.tipD',
    min: SPOUT_LIMITS.tipMm.min, max: SPOUT_LIMITS.tipMm.max, step: 1,
    hint: 'spout.tipD.hint',
    when: isApplied,
    get: (s) => s.tipMm,
    set: (s, v) => ({ ...s, tipMm: v }),
  },
  {
    kind: 'range', key: 'angle', label: 'spout.angle',
    min: SPOUT_LIMITS.tipAngleDeg.min, max: SPOUT_LIMITS.tipAngleDeg.max, step: 1,
    when: isApplied,
    get: (s) => s.tipAngleDeg,
    set: (s, v) => ({ ...s, tipAngleDeg: v }),
  },
];

const isTee = (s: LidState): boolean => s.knobKind === 'tee';

const LID_CONTROLS: Control<LidState>[] = [
  {
    kind: 'range', key: 'recess', label: 'lid.recess',
    min: LID_LIMITS.recessMm.min, max: LID_LIMITS.recessMm.max, step: 0.5,
    hint: 'lid.recess.hint',
    get: (s) => s.recessMm,
    set: (s, v) => ({ ...s, recessMm: v }),
  },
  {
    kind: 'range', key: 'depth', label: 'lid.depth',
    min: LID_LIMITS.depthMm.min, max: LID_LIMITS.depthMm.max, step: 0.5,
    hint: 'lid.depth.hint',
    get: (s) => s.depthMm,
    set: (s, v) => ({ ...s, depthMm: v }),
  },
  {
    kind: 'range', key: 'ledge', label: 'lid.ledge',
    min: LID_LIMITS.ledgeMm.min, max: LID_LIMITS.ledgeMm.max, step: 0.1,
    hint: 'lid.ledge.hint',
    get: (s) => s.ledgeMm,
    set: (s, v) => ({ ...s, ledgeMm: v }),
  },
  {
    kind: 'range', key: 'clearance', label: 'lid.clearance',
    min: LID_LIMITS.clearanceMm.min, max: LID_LIMITS.clearanceMm.max, step: 0.05,
    hint: 'lid.clearance.hint',
    get: (s) => s.clearanceMm,
    set: (s, v) => ({ ...s, clearanceMm: v }),
  },
  {
    kind: 'range', key: 'field', label: 'lid.field',
    min: LID_LIMITS.fieldMm.min, max: LID_LIMITS.fieldMm.max, step: 0.5,
    hint: 'lid.field.hint',
    get: (s) => s.fieldMm,
    set: (s, v) => ({ ...s, fieldMm: v }),
  },
  {
    kind: 'range', key: 'dome', label: 'lid.dome',
    min: LID_LIMITS.domeMm.min, max: LID_LIMITS.domeMm.max, step: 0.5,
    get: (s) => s.domeMm,
    set: (s, v) => ({ ...s, domeMm: v }),
  },
  {
    kind: 'range', key: 'curvature', label: 'ctl.curvature',
    min: LID_LIMITS.curvature.min, max: LID_LIMITS.curvature.max, step: 0.01,
    hint: 'lid.curvature.hint',
    get: (s) => s.curvature,
    set: (s, v) => ({ ...s, curvature: v }),
  },
  {
    kind: 'select', key: 'knob', label: 'lid.knob',
    options: [
      { value: 'ball', label: 'lid.knob.ball' },
      { value: 'tee', label: 'lid.knob.tee' },
    ],
    get: (s) => s.knobKind,
    set: (s, v) => ({ ...s, knobKind: v === 'tee' ? 'tee' : 'ball' }),
  },
  {
    kind: 'range', key: 'knobD', label: 'lid.knobD',
    min: LID_LIMITS.knobDMm.min, max: LID_LIMITS.knobDMm.max, step: 0.5,
    get: (s) => s.knobDMm,
    set: (s, v) => ({ ...s, knobDMm: v }),
  },
  {
    kind: 'range', key: 'knobFlat', label: 'lid.knobFlat',
    min: LID_LIMITS.knobFlat.min, max: LID_LIMITS.knobFlat.max, step: 0.05,
    hint: 'lid.knobFlat.hint',
    when: (s) => !isTee(s),
    get: (s) => s.knobFlat,
    set: (s, v) => ({ ...s, knobFlat: v }),
  },
  {
    kind: 'range', key: 'stemD', label: 'lid.stemD',
    min: LID_LIMITS.stemDMm.min, max: LID_LIMITS.stemDMm.max, step: 0.5,
    hint: 'lid.stemD.hint',
    get: (s) => s.stemDMm,
    set: (s, v) => ({ ...s, stemDMm: v }),
  },
  {
    kind: 'range', key: 'stemH', label: 'lid.stemH',
    min: LID_LIMITS.stemHMm.min, max: LID_LIMITS.stemHMm.max, step: 0.5,
    hint: 'lid.stemH.hint',
    get: (s) => s.stemHMm,
    set: (s, v) => ({ ...s, stemHMm: v }),
  },
  {
    kind: 'range', key: 'capH', label: 'lid.capH',
    min: LID_LIMITS.capHMm.min, max: LID_LIMITS.capHMm.max, step: 0.5,
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
  /** подпись полосы накатки на куполе: сколько оттисков ляжет за оборот */
  setLidBandNote(describe: (band: RouletteBand) => string): void;
}

export function renderAttachCards(
  container: HTMLElement,
  read: AttachSources,
  write: AttachSinks,
): AttachCardsHandle {
  container.textContent = '';

  const handleCard = createCard(container, {
    id: 'handle',
    title: 'handle.title',
    desc: 'handle.desc',
    enabled: read.handle().on,
    onToggle: (on) => write.handle({ ...read.handle(), on }),
  });
  const handleRows = renderControls(handleCard.body, HANDLE_CONTROLS, read.handle, write.handle, 'handle');

  const spoutCard = createCard(container, {
    id: 'spout',
    title: 'spout.title',
    desc: 'spout.desc',
    enabled: read.spout().on,
    onToggle: (on) => write.spout({ ...read.spout(), on }),
  });
  const spoutRows = renderControls(spoutCard.body, SPOUT_CONTROLS, read.spout, write.spout, 'spout');

  const lidCard = createCard(container, {
    id: 'lid',
    title: 'lid.title',
    desc: 'lid.desc',
    enabled: read.lid().on,
    onToggle: (on) => write.lid({ ...read.lid(), on }),
  });
  const lidRows = renderControls(lidCard.body, LID_CONTROLS, read.lid, write.lid, 'lid');
  // Накатка на куполе — свои полосы. Высота полосы здесь — доля дуги купола.
  lidCard.body.append(make('h4', 'sub-title', t('lid.roulette')));
  const lidBandsHost = make('div');
  lidCard.body.append(lidBandsHost);
  const lidBands = renderBandList(
    lidBandsHost,
    () => read.lid().roulette,
    (roulette) => write.lid({ ...read.lid(), roulette }),
    'lidroul',
  );
  let describeLidBand: (band: RouletteBand) => string = () => '';

  return {
    sync(handle, spout, lid): void {
      handleCard.setEnabled(handle.on);
      spoutCard.setEnabled(spout.on);
      lidCard.setEnabled(lid.on);
      handleRows.sync(handle);
      spoutRows.sync(spout);
      lidRows.sync(lid);
      lidBands.sync(lid.roulette, describeLidBand);
    },
    setLidBandNote(describe): void {
      describeLidBand = describe;
    },
  };
}
