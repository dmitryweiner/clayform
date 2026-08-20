// Golden-тесты: подвыборка вершин, объём и габариты пиннят текущую геометрию
// каждого семейства. Ловят непреднамеренный сдвиг формы при рефакторинге —
// то, чего не видят инвариантные тесты (меш остаётся замкнутым, а изделие
// уже другое).
//
// Осознанная перегенерация: UPDATE_GOLDEN=1 npx vitest run tests/golden.test.ts

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildVessel, defaultBuildParams } from '../src/geo/build';
import { FAMILY_IDS, defaultFamilyParams, familyById } from '../src/geo/profiles';
import { validateMesh } from '../src/geo/validate';

const GOLDEN_PATH = join(dirname(fileURLToPath(import.meta.url)), 'golden', 'vessels.json');
const SAMPLE_COUNT = 96;

interface GoldenEntry {
  positionsLength: number;
  indicesLength: number;
  volume: number;
  extents: number[];
  sample: number[];
}

function snapshot(family: string): GoldenEntry {
  const mesh = buildVessel({
    ...defaultBuildParams(),
    family,
    shape: defaultFamilyParams(family),
    heightMm: familyById(family).defaultHeightMm,
    nu: 48,
    nv: 64,
  });
  const stride = Math.max(1, Math.floor(mesh.positions.length / SAMPLE_COUNT));
  const sample: number[] = [];
  for (let i = 0; i < mesh.positions.length && sample.length < SAMPLE_COUNT; i += stride) {
    sample.push(mesh.positions[i]);
  }
  const report = validateMesh(mesh);
  return {
    positionsLength: mesh.positions.length,
    indicesLength: mesh.indices.length,
    volume: report.volume,
    extents: report.extents,
    sample,
  };
}

describe('golden-силуэты семейств', () => {
  const golden: Record<string, GoldenEntry> = {};
  if (process.env.UPDATE_GOLDEN) {
    for (const id of FAMILY_IDS) golden[id] = snapshot(id);
    writeFileSync(GOLDEN_PATH, JSON.stringify(golden, null, 1));
  } else {
    expect(
      existsSync(GOLDEN_PATH),
      `нет эталона ${GOLDEN_PATH}; сгенерируйте: UPDATE_GOLDEN=1 npx vitest run tests/golden.test.ts`,
    ).toBe(true);
    Object.assign(golden, JSON.parse(readFileSync(GOLDEN_PATH, 'utf8')));
  }

  it.each(FAMILY_IDS.map((id) => [id]))('%s совпадает с эталоном', (id) => {
    const ref = golden[id];
    expect(ref, `в эталоне нет семейства ${id}`).toBeDefined();
    const got = snapshot(id);
    expect(got.positionsLength).toBe(ref.positionsLength);
    expect(got.indicesLength).toBe(ref.indicesLength);
    // относительный допуск: Math.sin/cos между версиями V8 гуляют в младших
    // разрядах, а объём здесь порядка 10⁶ мм³
    expect(Math.abs(got.volume - ref.volume) / Math.abs(ref.volume)).toBeLessThan(1e-7);
    for (let i = 0; i < 3; i++) {
      expect(got.extents[i]).toBeCloseTo(ref.extents[i], 6);
    }
    expect(got.sample.length).toBe(ref.sample.length);
    for (let i = 0; i < ref.sample.length; i++) {
      if (Math.abs(got.sample[i] - ref.sample[i]) > 1e-4) {
        expect.fail(`${id}.sample[${i}]: ${got.sample[i]} != ${ref.sample[i]}`);
      }
    }
  });
});
