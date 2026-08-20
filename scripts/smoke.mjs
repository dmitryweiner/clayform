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
import { stat } from 'node:fs/promises';
import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(process.argv.slice(2), ['shots']);
const shotsDir = flags.get('shots');
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

/** Аудит меша отложен, чтобы не тормозить превью — ждём его вердикт. */
async function auditVerdict(page) {
  await page.waitForFunction(
    () => !(document.querySelector('#audit')?.textContent ?? '').includes('проверка'),
    { timeout: 15000 },
  );
  return page.locator('#audit').textContent();
}

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

  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[family:${name}] audit="${verdict}"`);

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
const afterExtremes = await auditVerdict(page);
if (!afterExtremes.includes('замкнуто ✓')) {
  errors.push(`[slider-extremes] audit="${afterExtremes}"`);
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
    const verdict = await auditVerdict(page);
    if (!verdict.includes('замкнуто ✓')) errors.push(`[wave:${shape}/${axis}] audit="${verdict}"`);
  }
}

label('wave2');
await page.check('#on_wave2');
await page.waitForTimeout(150);
if (!(await auditVerdict(page)).includes('замкнуто ✓')) {
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
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[roulette:${pattern}] audit="${verdict}"`);
  if (shotsDir) await page.screenshot({ path: `${shotsDir}/relief-${pattern}.png` });
}

// ручка и носик: крайние значения и обе конфигурации ручки
label('attachments');
await page.uncheck('#on_wave');
await page.uncheck('#on_wave2');
await page.uncheck('#on_roulette');
await page.check('#on_handle');
await page.check('#on_spout');
for (const [id, value] of [['handle_reach', '3'], ['handle_reach', '120'], ['handle_reach', '28'],
                           ['handle_thickness', '3'], ['handle_thickness', '40'], ['handle_thickness', '11'],
                           ['handle_count', '2'], ['handle_count', '1'],
                           ['spout_pull', '60'], ['spout_width', '180'], ['spout_pull', '14'],
                           ['spout_width', '60']]) {
  const tag = await page.locator(`#${id}`).evaluate((n) => n.tagName);
  if (tag === 'SELECT') await page.selectOption(`#${id}`, value);
  else await page.fill(`#${id}`, value);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[attach:${id}=${value}] audit="${verdict}"`);
}
if (shotsDir) await page.screenshot({ path: `${shotsDir}/attachments.png` });

// стенка и дно: крайние значения не должны рвать полость
label('hollow');
for (const [id, value] of [['print_wall', '0.8'], ['print_wall', '60'], ['print_wall', '3'],
                           ['print_base', '1'], ['print_base', '60'], ['print_base', '4']]) {
  await page.fill(`#${id}`, value);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[hollow:${id}=${value}] audit="${verdict}"`);
}

// конечный продукт приложения — файл; проверяем, что он реально выгружается
label('export');
await expectDownloads(1, 'vessel');

// Литейная оснастка: у каждой схемы своё число деталей. Ручку и носик
// снимаем — они расширяют габарит и через это меняют выбор схемы, а здесь
// проверяется именно соответствие «силуэт → число деталей».
label('mold');
await page.uncheck('#on_handle');
await page.uncheck('#on_spout');
for (const [family, index, tab, expected] of [
  ['миска', 1, '#tabBath', 1],
  ['горшок', 0, '#tabBath', 3],
  ['ваза', 3, '#tabBath', 2],
  ['ваза', 3, '#tabMaster', 1],
]) {
  label(`mold:${family}:${tab}`);
  await page.locator('#familyGrid .family-btn').nth(index).click();
  await page.click(tab);
  await page.waitForFunction(
    () => !(document.querySelector('#audit')?.textContent ?? '').includes('собираю'),
    { timeout: 60000 },
  );
  const parts = await page.locator('#partList li').count();
  if (parts !== expected) {
    errors.push(`[mold:${family}${tab}] деталей ${parts}, ожидалось ${expected}`);
  }
  const blockers = (await page.locator('#blockers').textContent()).trim();
  if (blockers) errors.push(`[mold:${family}${tab}] blockers="${blockers}"`);
  if (shotsDir) await page.screenshot({ path: `${shotsDir}/mold-${family}-${tab.slice(4)}.png` });
}

// экспорт оснастки: у горшка это три отдельных файла
label('export-mold');
await page.locator('#familyGrid .family-btn').nth(0).click();
await page.click('#tabBath');
await page.waitForFunction(
  () => !(document.querySelector('#audit')?.textContent ?? '').includes('собираю'),
  { timeout: 60000 },
);
await expectDownloads(3, 'mold');

async function expectDownloads(count, tag) {
  const seen = [];
  const collect = (download) => seen.push(download);
  page.on('download', collect);
  await page.click('#exportBtn');
  const deadline = Date.now() + 120000;
  while (seen.length < count && Date.now() < deadline) {
    await page.waitForTimeout(200);
  }
  page.off('download', collect);
  if (seen.length !== count) {
    errors.push(`[${tag}] файлов ${seen.length}, ожидалось ${count}`);
    return;
  }
  for (const download of seen) {
    if (!download.suggestedFilename().endsWith('.stl')) {
      errors.push(`[${tag}] имя файла "${download.suggestedFilename()}"`);
    }
    const { size } = await stat(await download.path());
    // 84 байта заголовка + 50 на треугольник
    if (size < 84 + 50 * 1000) errors.push(`[${tag}] подозрительно маленький STL: ${size} байт`);
  }
}

await app.close();

if (errors.length) {
  console.error(`smoke FAILED (${errors.length}):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log(`smoke OK (семейств: ${families.length})`);
