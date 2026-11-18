// Строки карточки «Форма»: высота изделия и параметры семейства из
// деклараций ParamSpec — ползунками кита (точное поле, единица, −/+).
// Схема — единственный источник диапазонов, поэтому UI и ядро не могут
// разъехаться.

import type { ParamSpec } from '../geo/profiles';
import { familyById } from '../geo/profiles';
import type { AppState } from '../state/schema';
import { HEIGHT_MAX_MM, HEIGHT_MIN_MM } from '../state/schema';
import type { Key } from '../i18n';
import { hasKey } from '../i18n';
import type { Control } from './controls';

/**
 * Ключ подписи параметра: сперва свой у семейства (`param.pot.rimFlare` —
 * «Отгиб венчика», у миски тот же ключ — «Отгиб края»), затем общий
 * (`param.baseFillet`). `suffix` — '.hint' для подсказки. Нет ни того, ни
 * другого — null; для подписи это ошибка, её ловит tests/i18n.test.ts.
 */
export function paramKey(family: string, key: string, suffix = ''): Key | null {
  for (const candidate of [`param.${family}.${key}${suffix}`, `param.${key}${suffix}`]) {
    if (hasKey(candidate)) return candidate;
  }
  return null;
}

const UNITS: Record<ParamSpec['unit'], Key | undefined> = { mm: 'unit.mm', deg: 'unit.deg', x: undefined };

/** Ползунок параметра семейства; угол 0° — «авто», о чём говорит заметка под строкой. */
function paramControl(family: string, spec: ParamSpec): Control<AppState> {
  const value = (s: AppState): number => s.shape[spec.key] ?? spec.default;
  const hint = paramKey(family, spec.key, '.hint');
  return {
    kind: 'range',
    key: spec.key,
    label: paramKey(family, spec.key) ?? { text: spec.key },
    ...(hint ? { hint } : {}),
    min: spec.min,
    max: spec.max,
    step: spec.step,
    unit: UNITS[spec.unit],
    ...(spec.unit === 'deg' ? { note: { key: 'param.auto', when: (s: AppState) => value(s) === 0 } } : {}),
    get: value,
    set: (s, v) => ({ ...s, shape: { ...s.shape, [spec.key]: v } }),
  };
}

const HEIGHT: Control<AppState> = {
  kind: 'range',
  key: 'heightMm',
  label: 'param.heightMm',
  min: HEIGHT_MIN_MM,
  max: HEIGHT_MAX_MM,
  step: 1,
  unit: 'unit.mm',
  get: (s) => s.heightMm,
  set: (s, v) => ({ ...s, heightMm: v }),
};

/** Высота и параметры семейства — у каждого семейства свой набор. */
export function shapeControls(family: string): Control<AppState>[] {
  return [HEIGHT, ...familyById(family).params.map((spec) => paramControl(family, spec))];
}
