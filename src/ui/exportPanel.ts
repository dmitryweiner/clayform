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

/** Над всем состоянием: флажок зависит от того, включена ли крышка. */
const LID_BESIDE: Control<AppState>[] = [
  {
    kind: 'check', key: 'lidBeside', label: 'Крышка рядом',
    hint: 'крышка юбкой вниз рядом с изделием и одним файлом — печатать за один заход',
    when: (s) => s.lid.on,
    get: (s) => s.lidBeside,
    set: (s, v) => ({ ...s, lidBeside: v }),
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

const SLUMP_CONTROLS: Control<MoldState>[] = [
  SHRINK,
  {
    kind: 'range', key: 'bathWall', label: 'Борт', min: 1.2, max: 12, step: 0.2, unit: 'мм',
    hint: 'толщина скорлупы формы и пуансона: печатается только поверхность, которой касается пласт',
    get: (s) => s.bathWallMm,
    set: (s, v) => ({ ...s, bathWallMm: v }),
  },  {
    kind: 'range', key: 'ear', label: 'Ушки', min: EAR_MIN_MM, max: EAR_MAX_MM, step: 0.5, unit: 'мм',
    hint: 'площадка ушка формы под лапку пуансона: на столько ушки и лапки выходят дальше',
    get: (s) => s.earMm,
    set: (s, v) => ({ ...s, earMm: v }),
  },
  {
    kind: 'range', key: 'round', label: 'Скругление дна', min: 0, max: 100, step: 5, unit: '%',
    hint: 'низ пуансона: 100 — шапка от оси, у миски почти полусфера; 0 — плоский пол. Глина в углу толще, но не тоньше пласта',
    get: (s) => s.punchRoundPct,
    set: (s, v) => ({ ...s, punchRoundPct: v }),
  },
  {
    kind: 'range', key: 'vent', label: 'Отдушины', min: VENT_MIN_MM, max: VENT_MAX_MM, step: 0.5, unit: 'мм',
    hint: 'диаметр отверстий в дне формы и по оси пуансона: выпускают воздух и снимают присос',
    get: (s) => s.ventMm,
    set: (s, v) => ({ ...s, ventMm: v }),
  },
];

/** Толщина пласта — это стенка изделия: пуансон строится по его внутренней поверхности. */
const SLAB_CONTROLS: Control<HollowState>[] = [
  {
    kind: 'range', key: 'wall', label: 'Пласт', min: WALL_MIN_MM, max: WALL_MAX_MM, step: 0.1, unit: 'мм',
    hint: 'толщина пласта — стенка изделия; пуансон меньше формы ровно на неё',
    get: (s) => s.wallMm,
    set: (s, v) => ({ ...s, wallMm: v }),
  },
];

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

  for (const mode of EXPORT_MODES) {
    tabs[mode].addEventListener('click', () => onMode(mode));
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
