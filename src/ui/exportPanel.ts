// Панель экспорта: пять режимов и свои параметры у каждого.
//
//   Изделие  — полый сосуд, как его печатают глиной;
//   Мастер   — позитив с литейной горловиной под ручную силиконовую форму;
//   Ванночки — печатные опалубки под заливку силикона, по одной на часть;
//   Отминка  — углублённая форма под пласт и пуансон к ней. Только для тела
//              без ручки, носика и крышки.

import type { HollowState } from '../geo/hollow';
import { WALL_MIN_MM, WALL_MAX_MM, BASE_MIN_MM, BASE_MAX_MM, RIM_MAX_MM } from '../geo/hollow';
// Пределы ползунков — из geo/mold/state: фасад geo/mold тянет за собой
// csg.ts с WASM, а панели он ни к чему (весь CSG считает воркер).
import type { MoldState } from '../geo/mold/state';
import {
  SHRINK_MAX_PCT, PLASTER_MAX_MM, SPARE_MAX_MM, EAR_MIN_MM, EAR_MAX_MM, VENT_MIN_MM, VENT_MAX_MM,
} from '../geo/mold/state';
import type { AppState, ExportMode } from '../state/schema';
import { EXPORT_MODES, pressAllowed } from '../state/schema';
import type { Control } from './controls';
import { renderControls } from './controls';
import { make } from './dom';

const HOLLOW_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range', key: 'wall', label: 'export.wall', min: WALL_MIN_MM, max: WALL_MAX_MM, step: 0.1,
    hint: 'export.wall.hint',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
  {
    kind: 'range', key: 'base', label: 'export.base', min: BASE_MIN_MM, max: BASE_MAX_MM, step: 0.5,
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
  {
    kind: 'range', key: 'rim', label: 'export.rim', min: 0, max: RIM_MAX_MM, step: 0.1,
    hint: 'export.rim.hint',
    get: (s) => s.rimRadiusMm,
    set: (s, v) => ({ ...s, rimRadiusMm: v }),
  },
];

/** Над всем состоянием: флажок зависит от того, включена ли крышка. */
const LID_BESIDE: Control<AppState>[] = [
  {
    kind: 'check', key: 'lidBeside', label: 'export.lidBeside',
    hint: 'export.lidBeside.hint',
    when: (s) => s.lid.on,
    get: (s) => s.lidBeside,
    set: (s, v) => ({ ...s, lidBeside: v }),
  },
];

const SHRINK: Control<MoldState> = {
  kind: 'range', key: 'shrink', label: 'export.shrink', min: 0, max: SHRINK_MAX_PCT, step: 0.5,
  hint: 'export.shrink.hint',
  get: (s) => s.shrinkPct,
  set: (s, v) => ({ ...s, shrinkPct: v }),
};

const SPARE: Control<MoldState> = {
  kind: 'range', key: 'spare', label: 'export.spare', min: 0, max: SPARE_MAX_MM, step: 1,
  hint: 'export.spare.hint',
  get: (s) => s.spareMm,
  set: (s, v) => ({ ...s, spareMm: v }),
};

const MASTER_CONTROLS: Control<MoldState>[] = [SHRINK, SPARE];

const SLUMP_CONTROLS: Control<MoldState>[] = [
  SHRINK,
  {
    kind: 'range', key: 'bathWall', label: 'ctl.wall', min: 1.2, max: 12, step: 0.2,
    hint: 'export.slumpWall.hint',
    get: (s) => s.bathWallMm,
    set: (s, v) => ({ ...s, bathWallMm: v }),
  },
  {
    kind: 'range', key: 'ear', label: 'export.ear', min: EAR_MIN_MM, max: EAR_MAX_MM, step: 0.5,
    hint: 'export.ear.hint',
    get: (s) => s.earMm,
    set: (s, v) => ({ ...s, earMm: v }),
  },
  {
    kind: 'range', key: 'round', label: 'export.round', min: 0, max: 100, step: 5,
    hint: 'export.round.hint',
    get: (s) => s.punchRoundPct,
    set: (s, v) => ({ ...s, punchRoundPct: v }),
  },
  {
    kind: 'range', key: 'vent', label: 'export.vent', min: VENT_MIN_MM, max: VENT_MAX_MM, step: 0.5,
    hint: 'export.vent.hint',
    get: (s) => s.ventMm,
    set: (s, v) => ({ ...s, ventMm: v }),
  },
];

/** Толщина пласта — это стенка изделия: пуансон строится по его внутренней поверхности. */
const SLAB_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range', key: 'wall', label: 'export.slab', min: WALL_MIN_MM, max: WALL_MAX_MM, step: 0.1,
    hint: 'export.slab.hint',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
];

const BATH_CONTROLS: Control<MoldState>[] = [
  SHRINK,
  SPARE,
  {
    kind: 'range', key: 'plaster', label: 'export.plaster', min: 5, max: PLASTER_MAX_MM, step: 1,
    hint: 'export.plaster.hint',
    get: (s) => s.plasterMm,
    set: (s, v) => ({ ...s, plasterMm: v }),
  },
  {
    kind: 'range', key: 'key', label: 'export.key', min: 0, max: 25, step: 0.5,
    hint: 'export.key.hint',
    get: (s) => s.keyMm,
    set: (s, v) => ({ ...s, keyMm: v }),
  },
  {
    kind: 'range', key: 'silicone', label: 'export.silicone', min: 3, max: 60, step: 1,
    hint: 'export.silicone.hint',
    get: (s) => s.bathClearMm,
    set: (s, v) => ({ ...s, bathClearMm: v }),
  },
  {
    kind: 'range', key: 'bathWall', label: 'ctl.wall', min: 1.2, max: 12, step: 0.2,
    hint: 'export.bathWall.hint',
    get: (s) => s.bathWallMm,
    set: (s, v) => ({ ...s, bathWallMm: v }),
  },
];

export interface ExportPanelHandle {
  sync(state: AppState): void;
  setParts(parts: { label: string; note?: string }[]): void;
  setSchemeNote(text: string): void;
}

export function renderExportPanel(
  tabs: Record<ExportMode, HTMLButtonElement>,
  pressRow: HTMLElement,
  paramsHost: HTMLElement,
  schemeNote: HTMLElement,
  partList: HTMLElement,
  read: () => AppState,
  onChange: (state: AppState) => void,
): ExportPanelHandle {
  const readHollow = (): HollowState => read().hollow;
  const readMold = (): MoldState => read().mold;
  const onMode = (exportMode: ExportMode): void => onChange({ ...read(), exportMode });
  const onHollow = (hollow: HollowState): void => onChange({ ...read(), hollow });
  const onMold = (mold: MoldState): void => onChange({ ...read(), mold });

  // Свойством, а не addEventListener: панель перерисовывается на смене
  // языка, а табы — статическая разметка, и обработчики копились бы.
  for (const mode of EXPORT_MODES) {
    tabs[mode].onclick = () => onMode(mode);
  }

  const hollowHost = make('div');
  const masterHost = make('div');
  const bathHost = make('div');
  const slumpHost = make('div');
  paramsHost.textContent = '';
  paramsHost.append(hollowHost, masterHost, bathHost, slumpHost);

  const hollowRows = renderControls(hollowHost, HOLLOW_CONTROLS, readHollow, onHollow, 'print');
  const besideHost = make('div');
  hollowHost.append(besideHost);
  const besideRows = renderControls(besideHost, LID_BESIDE, read, onChange, 'print');
  const masterRows = renderControls(masterHost, MASTER_CONTROLS, readMold, onMold, 'master');
  const bathRows = renderControls(bathHost, BATH_CONTROLS, readMold, onMold, 'bath');
  const slumpMoldHost = make('div');
  const slumpSlabHost = make('div');
  slumpHost.append(slumpMoldHost, slumpSlabHost);
  const slumpRows = renderControls(slumpMoldHost, SLUMP_CONTROLS, readMold, onMold, 'slump');
  const slumpSlabRows = renderControls(slumpSlabHost, SLAB_CONTROLS, readHollow, onHollow, 'slump');

  return {
    sync(state): void {
      const { exportMode: mode, hollow, mold } = state;
      for (const [key, button] of Object.entries(tabs)) {
        button.setAttribute('aria-selected', String(key === mode));
      }
      hollowHost.hidden = mode !== 'vessel';
      masterHost.hidden = mode !== 'master';
      bathHost.hidden = mode !== 'bath';
      slumpHost.hidden = mode !== 'slump';
      pressRow.hidden = !pressAllowed(state);
      slumpRows.sync(mold);
      slumpSlabRows.sync(hollow);
      hollowRows.sync(hollow);
      besideRows.sync(state);
      masterRows.sync(mold);
      bathRows.sync(mold);
    },

    setParts(parts): void {
      partList.textContent = '';
      for (const part of parts) {
        const item = make('li');
        item.append(make('span', 'part-name', part.label));
        if (part.note) item.append(make('span', undefined, part.note));
        partList.append(item);
      }
    },

    setSchemeNote(text): void {
      schemeNote.textContent = text;
    },
  };
}
