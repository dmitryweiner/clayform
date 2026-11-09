// Панель экспорта: изделие, как его печатают глиной, — полое, с заданной
// стенкой. Формы, ванночки и отминку строит cast-builder по этому же STL —
// сплошной мастер он заливает из него сам; ссылка на него — в разметке.

import type { HollowState } from '../geo/hollow';
import { WALL_MIN_MM, WALL_MAX_MM, BASE_MIN_MM, BASE_MAX_MM, RIM_MAX_MM } from '../geo/hollow';
import type { AppState } from '../state/schema';
import type { Control } from './controls';
import { renderControls } from './controls';
import { make } from './dom';

const HOLLOW_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range',
    key: 'wall',
    label: 'export.wall',
    min: WALL_MIN_MM,
    max: WALL_MAX_MM,
    step: 0.1,
    hint: 'export.wall.hint',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
  {
    kind: 'range',
    key: 'base',
    label: 'export.base',
    min: BASE_MIN_MM,
    max: BASE_MAX_MM,
    step: 0.5,
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
  {
    kind: 'range',
    key: 'rim',
    label: 'export.rim',
    min: 0,
    max: RIM_MAX_MM,
    step: 0.1,
    hint: 'export.rim.hint',
    get: (s) => s.rimRadiusMm,
    set: (s, v) => ({ ...s, rimRadiusMm: v }),
  },
];

/** Над всем состоянием: «Крышка рядом» зависит от того, включена ли крышка. */
const PIECE_CONTROLS: Control<AppState>[] = [
  {
    kind: 'check',
    key: 'lidBeside',
    label: 'export.lidBeside',
    hint: 'export.lidBeside.hint',
    when: (s) => s.lid.on,
    get: (s) => s.lidBeside,
    set: (s, v) => ({ ...s, lidBeside: v }),
  },
];

export interface ExportPanelHandle {
  sync(state: AppState): void;
  setParts(parts: { label: string; note?: string }[]): void;
}

export function renderExportPanel(
  paramsHost: HTMLElement,
  partList: HTMLElement,
  read: () => AppState,
  onChange: (state: AppState) => void,
): ExportPanelHandle {
  const onHollow = (hollow: HollowState): void => onChange({ ...read(), hollow });

  const hollowHost = make('div');
  const pieceHost = make('div');
  paramsHost.textContent = '';
  paramsHost.append(hollowHost, pieceHost);
  const hollowRows = renderControls(hollowHost, HOLLOW_CONTROLS, () => read().hollow, onHollow, 'print');
  const pieceRows = renderControls(pieceHost, PIECE_CONTROLS, read, onChange, 'print');

  return {
    sync(state): void {
      hollowRows.sync(state.hollow);
      pieceRows.sync(state);
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
  };
}
