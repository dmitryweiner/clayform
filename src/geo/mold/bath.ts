// Ванночка под заливку силикона.
//
// Печатная деталь — это опалубка с уже встроенным ПОЗИТИВОМ гипсового блока.
// Заливаем силикон, он застывает вокруг позитива, снимаем — получается
// силиконовый негатив блока. В него льём гипс и получаем рабочую полуформу.
// Отсюда объединение, а не вычитание: позитив должен физически стоять внутри
// коробки, иначе силикону не во что затекать.
//
// Блок кладётся рабочей поверхностью КВЕРХУ. Силикон, залитый сверху,
// снимается вертикально, и отпечаток изделия отходит по своему же
// направлению вытяжки — тому самому, которое выбрал анализатор.

import type { Manifold } from 'manifold-3d';
import type { CsgApi } from '../csg';
import type { CsgScope } from '../csg';
import type { BlockPart } from './block';
import type { MoldState } from './state';

/** Поворот блока так, чтобы его рабочая поверхность смотрела вверх. */
function faceUp(part: BlockPart, scope: CsgScope): Manifold {
  switch (part.pull) {
    case 'up':
      return part.solid;
    case 'down':
      return scope.keep(part.solid.rotate([180, 0, 0]));
    case '+y':
      // плоскость разъёма y = 0 становится верхом: тело уходит под неё
      return scope.keep(part.solid.rotate([-90, 0, 0]));
    case '-y':
      return scope.keep(part.solid.rotate([90, 0, 0]));
  }
}

/** Ванночка вокруг одной части формы; стоит дном на z = 0. */
export function buildBath(
  csg: CsgApi,
  scope: CsgScope,
  part: BlockPart,
  mold: MoldState,
): Manifold {
  const oriented = faceUp(part, scope);
  const box = oriented.boundingBox();
  const positive = scope.keep(oriented.translate([
    -(box.min[0] + box.max[0]) / 2,
    -(box.min[1] + box.max[1]) / 2,
    -box.min[2],
  ]));

  const width = box.max[0] - box.min[0];
  const depth = box.max[1] - box.min[1];
  const height = box.max[2] - box.min[2];

  const clear = mold.bathClearMm;
  const wall = mold.bathWallMm;
  const innerX = width + 2 * clear;
  const innerY = depth + 2 * clear;
  const innerZ = height + clear;

  const outer = scope.keep(
    csg.Manifold.cube([innerX + 2 * wall, innerY + 2 * wall, innerZ + wall], true)
      .translate([0, 0, (innerZ + wall) / 2 - wall]),
  );
  // полость опалубки открыта сверху: вырезаем её насквозь через верхнюю грань
  const cavity = scope.keep(
    csg.Manifold.cube([innerX, innerY, innerZ + wall], true)
      .translate([0, 0, (innerZ + wall) / 2]),
  );
  const shell = scope.keep(outer.subtract(cavity));

  // после сборки опускаем всё так, чтобы дно ванночки легло на стол
  return scope.keep(csg.Manifold.union([shell, positive]).translate([0, 0, wall]));
}
