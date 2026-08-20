// Выбор семейства формы. Иконки не рисуются руками, а строятся из самих
// дефолтных профилей — силуэт на кнопке гарантированно совпадает с тем, что
// получится после нажатия.

import type { FamilyDef } from '../geo/profiles';
import { FAMILIES, buildProfile, profileRadius } from '../geo/profiles';
import { make } from './dom';

const SVG_NS = 'http://www.w3.org/2000/svg';
const ICON_W = 30;
const ICON_H = 34;

/** Замкнутый контур силуэта семейства, вписанный в ICON_W × ICON_H. */
function silhouettePath(family: FamilyDef): string {
  const def = buildProfile(family.id, {}, family.defaultHeightMm);
  const N = 40;
  const rs: number[] = [];
  let rMax = 0;
  for (let i = 0; i <= N; i++) {
    const r = profileRadius(def, i / N);
    rs.push(r);
    if (r > rMax) rMax = r;
  }
  const scale = Math.min(ICON_W / (2 * rMax), ICON_H / def.heightMm);
  const cx = ICON_W / 2;
  const y0 = ICON_H - (ICON_H - def.heightMm * scale) / 2;
  const at = (i: number, side: 1 | -1): string => {
    const x = cx + side * rs[i] * scale;
    const y = y0 - (i / N) * def.heightMm * scale;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  };
  const right = Array.from({ length: N + 1 }, (_, i) => at(i, 1));
  const left = Array.from({ length: N + 1 }, (_, i) => at(N - i, -1));
  return `M${right.concat(left).join('L')}Z`;
}

export interface FamilyPickerHandle {
  setActive(id: string): void;
}

export function renderFamilyPicker(
  container: HTMLElement,
  active: string,
  onPick: (id: string) => void,
): FamilyPickerHandle {
  container.textContent = '';
  const buttons = new Map<string, HTMLButtonElement>();

  for (const family of FAMILIES) {
    const btn = make('button', 'family-btn');
    btn.type = 'button';
    btn.title = family.examples;
    btn.setAttribute('aria-pressed', String(family.id === active));

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${ICON_W} ${ICON_H}`);
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', silhouettePath(family));
    svg.append(path);

    btn.append(svg, make('span', undefined, family.label));
    btn.addEventListener('click', () => onPick(family.id));
    container.append(btn);
    buttons.set(family.id, btn);
  }

  return {
    setActive(id: string): void {
      for (const [key, btn] of buttons) {
        btn.setAttribute('aria-pressed', String(key === id));
      }
    },
  };
}
