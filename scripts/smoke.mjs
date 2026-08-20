#!/usr/bin/env node
// Браузерный смоук: то, что нельзя проверить в vitest — Three.js/WebGL,
// загрузка WASM-CSG, реальные клики по UI.
//
//   node scripts/smoke.mjs                    # dev-сервер
//   node scripts/smoke.mjs --preview          # прод-сборка (vite preview :4173)
//   node scripts/smoke.mjs --shots shots      # + скриншот на каждое семейство
//
// Любая ошибка консоли/страницы → ненулевой код выхода (годится для CI).

import { mkdirSync } from 'node:fs';
import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(process.argv.slice(2), ['shots']);
const shotsDir = flags.get('shots');
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

const app = await openApp({ preview: flags.has('preview') });
const { page, errors, label } = app;

label('boot');
await page.waitForFunction(
  () => (document.querySelector('#status')?.textContent ?? '').length > 0,
  { timeout: 20000 },
);

// каждое семейство выбирается, строится и объявляет себя замкнутым
const families = await page.$$eval('#familyGrid .family-btn', (nodes) =>
  nodes.map((n) => n.textContent.trim()),
);
if (families.length !== 4) errors.push(`[boot] семейств на панели: ${families.length}, ожидалось 4`);

for (let i = 0; i < families.length; i++) {
  const name = families[i];
  label(`family:${name}`);
  await page.locator('#familyGrid .family-btn').nth(i).click();
  await page.waitForTimeout(200);

  const status = await page.locator('#status').textContent();
  if (!status.includes('замкнуто ✓')) errors.push(`[family:${name}] status="${status}"`);

  const blockers = await page.locator('#blockers').textContent();
  if (blockers.trim()) errors.push(`[family:${name}] blockers="${blockers}"`);

  const sliders = await page.locator('#shapeParams input[type=range]').count();
  if (sliders < 3) errors.push(`[family:${name}] слайдеров ${sliders}, ожидалось ≥3`);

  if (shotsDir) {
    await page.screenshot({ path: `${shotsDir}/${String(i + 1)}-${name}.png` });
  }
}

// крайние положения каждого слайдера не должны ломать сборку
label('slider-extremes');
const count = await page.locator('#shapeParams input[type=range]').count();
for (let i = 0; i < count; i++) {
  const slider = page.locator('#shapeParams input[type=range]').nth(i);
  for (const bound of ['min', 'max']) {
    const value = await slider.getAttribute(bound);
    await slider.fill(value);
    await page.waitForTimeout(60);
  }
}
const afterExtremes = await page.locator('#status').textContent();
if (!afterExtremes.includes('замкнуто ✓')) {
  errors.push(`[slider-extremes] status="${afterExtremes}"`);
}

// высота в миллиметрах доезжает до габаритов модели
label('height');
await page.fill('#heightMm', '300');
await page.waitForTimeout(200);
const heightStatus = await page.locator('#status').textContent();
if (!heightStatus.includes('× 300 мм')) errors.push(`[height] status="${heightStatus}"`);

// рельеф: каждая форма волны и каждый узор накатки строятся без ошибок
label('relief');
await page.locator('#familyGrid .family-btn').nth(0).click();
await page.waitForTimeout(150);
await page.check('#on_wave');
await page.fill('#wave_amp', '3');
await page.waitForTimeout(150);
for (const shape of await page.$$eval('#wave_shape option', (o) => o.map((x) => x.value))) {
  label(`wave:${shape}`);
  await page.selectOption('#wave_shape', shape);
  for (const axis of ['z', 'theta', 'spiral']) {
    await page.selectOption('#wave_axis', axis);
    await page.waitForTimeout(80);
    const status = await page.locator('#status').textContent();
    if (!status.includes('замкнуто ✓')) errors.push(`[wave:${shape}/${axis}] status="${status}"`);
  }
}

label('wave2');
await page.check('#on_wave2');
await page.waitForTimeout(150);
if (!(await page.locator('#status').textContent()).includes('замкнуто ✓')) {
  errors.push('[wave2] меш перестал быть замкнутым');
}

label('roulette');
await page.check('#on_roulette');
await page.fill('#roul_bandWidth', '40');
await page.fill('#roul_depth', '2');
await page.waitForTimeout(150);
for (const pattern of await page.$$eval('#roul_pattern option', (o) => o.map((x) => x.value))) {
  label(`roulette:${pattern}`);
  await page.selectOption('#roul_pattern', pattern);
  await page.waitForTimeout(120);
  const status = await page.locator('#status').textContent();
  if (!status.includes('замкнуто ✓')) errors.push(`[roulette:${pattern}] status="${status}"`);
  if (shotsDir) await page.screenshot({ path: `${shotsDir}/relief-${pattern}.png` });
}

await app.close();

if (errors.length) {
  console.error(`smoke FAILED (${errors.length}):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log(`smoke OK (семейств: ${families.length})`);
