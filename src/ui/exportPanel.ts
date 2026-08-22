// Панель экспорта: три режима и свои параметры у каждого.
//
//   Изделие  — полый сосуд, как его печатают глиной;
//   Мастер   — позитив с литейной горловиной под ручную силиконовую форму;
//   Ванночки — печатные опалубки под заливку силикона, по одной на часть.

import type { HollowState } from '../geo/hollow';
import { WALL_MIN_MM, WALL_MAX_MM, BASE_MIN_MM, BASE_MAX_MM, RIM_MAX_MM } from '../geo/hollow';
// Пределы ползунков — из geo/mold/state: фасад geo/mold тянет за собой
// csg.ts с WASM, а панели он ни к чему (весь CSG считает воркер).
import type { MoldState } from '../geo/mold/state';
import { SHRINK_MAX_PCT, PLASTER_MAX_MM, SPARE_MAX_MM } from '../geo/mold/state';
import type { ExportMode } from '../state/schema';
import type { Control } from './controls';
import { renderControls } from './controls';
import { make } from './dom';

const HOLLOW_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range', key: 'wall', label: 'Стенка', min: WALL_MIN_MM, max: WALL_MAX_MM, step: 0.1, unit: 'мм',
    hint: 'толщина меряется по нормали к поверхности',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
  {
    kind: 'range', key: 'base', label: 'Дно', min: BASE_MIN_MM, max: BASE_MAX_MM, step: 0.5, unit: 'мм',
    get: (s) => s.baseMm,
    set: (s, v) => ({ ...s, baseMm: v }),
  },
  {
    kind: 'range', key: 'rim', label: 'Радиус края', min: 0, max: RIM_MAX_MM, step: 0.1, unit: 'мм',
    hint: '0 — плоский срез; больше половины стенки не бывает — это уже поднутрение',
    get: (s) => s.rimRadiusMm,
    set: (s, v) => ({ ...s, rimRadiusMm: v }),
  },
];

const SHRINK: Control<MoldState> = {
  kind: 'range', key: 'shrink', label: 'Усадка', min: 0, max: SHRINK_MAX_PCT, step: 0.5, unit: '%',
  hint: 'шликер садится при сушке и обжиге — на столько увеличивается модель',
  get: (s) => s.shrinkPct,
  set: (s, v) => ({ ...s, shrinkPct: v }),
};

const SPARE: Control<MoldState> = {
  kind: 'range', key: 'spare', label: 'Горловина', min: 0, max: SPARE_MAX_MM, step: 1, unit: 'мм',
  hint: 'воротник над венчиком, куда доливают шликер',
  get: (s) => s.spareMm,
  set: (s, v) => ({ ...s, spareMm: v }),
};

const MASTER_CONTROLS: Control<MoldState>[] = [SHRINK, SPARE];

const BATH_CONTROLS: Control<MoldState>[] = [
  SHRINK,
  SPARE,
  {
    kind: 'range', key: 'plaster', label: 'Гипс', min: 5, max: PLASTER_MAX_MM, step: 1, unit: 'мм',
    hint: 'толщина гипса вокруг полости',
    get: (s) => s.plasterMm,
    set: (s, v) => ({ ...s, plasterMm: v }),
  },
  {
    kind: 'range', key: 'key', label: 'Ключи', min: 0, max: 25, step: 0.5, unit: 'мм',
    hint: 'радиус замков на плоскости разъёма; 0 — без них',
    get: (s) => s.keyMm,
    set: (s, v) => ({ ...s, keyMm: v }),
  },
  {
    kind: 'range', key: 'silicone', label: 'Силикон', min: 3, max: 60, step: 1, unit: 'мм',
    hint: 'слой силикона над блоком',
    get: (s) => s.bathClearMm,
    set: (s, v) => ({ ...s, bathClearMm: v }),
  },
  {
    kind: 'range', key: 'bathWall', label: 'Борт', min: 1.2, max: 12, step: 0.2, unit: 'мм',
    hint: 'толщина стенки печатной опалубки',
    get: (s) => s.bathWallMm,
    set: (s, v) => ({ ...s, bathWallMm: v }),
  },
];

export interface ExportPanelHandle {
  sync(mode: ExportMode, hollow: HollowState, mold: MoldState): void;
  setParts(parts: { label: string; note?: string }[]): void;
  setSchemeNote(text: string): void;
}

export function renderExportPanel(
  tabs: Record<ExportMode, HTMLButtonElement>,
  paramsHost: HTMLElement,
  schemeNote: HTMLElement,
  partList: HTMLElement,
  readHollow: () => HollowState,
  readMold: () => MoldState,
  onMode: (mode: ExportMode) => void,
  onHollow: (hollow: HollowState) => void,
  onMold: (mold: MoldState) => void,
): ExportPanelHandle {
  for (const [mode, button] of Object.entries(tabs)) {
    button.disabled = false;
    button.addEventListener('click', () => {
      if (mode === 'vessel' || mode === 'master' || mode === 'bath') onMode(mode);
    });
  }

  const hollowHost = make('div');
  const masterHost = make('div');
  const bathHost = make('div');
  paramsHost.textContent = '';
  paramsHost.append(hollowHost, masterHost, bathHost);

  const hollowRows = renderControls(hollowHost, HOLLOW_CONTROLS, readHollow, onHollow, 'print');
  const masterRows = renderControls(masterHost, MASTER_CONTROLS, readMold, onMold, 'master');
  const bathRows = renderControls(bathHost, BATH_CONTROLS, readMold, onMold, 'bath');

  return {
    sync(mode, hollow, mold): void {
      for (const [key, button] of Object.entries(tabs)) {
        button.setAttribute('aria-selected', String(key === mode));
      }
      hollowHost.hidden = mode !== 'vessel';
      masterHost.hidden = mode !== 'master';
      bathHost.hidden = mode !== 'bath';
      hollowRows.sync(hollow);
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
