#!/usr/bin/env node
// Браузерный смоук: то, что нельзя проверить в vitest — Three.js/WebGL,
// загрузка WASM-CSG, реальные клики по UI.
//
//   node scripts/smoke.mjs                    # dev-сервер
//   node scripts/smoke.mjs --preview          # прод-сборка (vite preview :4173)
//   node scripts/smoke.mjs --shots shots      # + скриншот на каждое семейство
//   node scripts/smoke.mjs --res 384          # экспорт на предельной сетке
//
// Время каждой выгрузки печатается всегда — этим и меряется, во что обходится
// экспорт на той или иной детализации.
//
// Любая ошибка консоли/страницы → ненулевой код выхода (годится для CI).

import { mkdirSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(process.argv.slice(2), ['shots', 'res']);
const shotsDir = flags.get('shots');
if (shotsDir) mkdirSync(shotsDir, { recursive: true });
const resolution = flags.get('res');

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

// иконка должна реально отдаваться, а не 404 — вкладку по ней и находят
label('favicon');
const faviconStatus = await page.evaluate(
  () => fetch('./favicon.svg').then((r) => r.status, () => 0),
);
if (faviconStatus !== 200) errors.push(`[favicon] favicon.svg отдаёт ${faviconStatus}`);

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
for (const mode of await page.$$eval('#wave2_mode option', (o) => o.map((x) => x.value))) {
  await page.selectOption('#wave2_mode', mode);
  await page.waitForTimeout(120);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[wave2:${mode}] audit="${verdict}"`);
  // в режиме плетения ползунки модуляции скрыты — иначе непонятно, почему
  // они ничего не делают
  const fmVisible = await page.locator('#wave2_fm').isVisible();
  if (fmVisible !== (mode === 'modulate')) {
    errors.push(`[wave2:${mode}] ползунки модуляции видимы: ${fmVisible}`);
  }
}

// дробный шаг спирали: шов обязан сходиться при любом положении ползунка
label('spiral');
await page.selectOption('#wave_axis', 'spiral');
for (const k of ['-2.35', '0.15', '0.7', '3.85']) {
  await page.fill('#wave_spiralK', k);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[spiral k=${k}] audit="${verdict}"`);
}
await page.selectOption('#wave_axis', 'z');

label('roulette');
await page.check('#on_roulette');
await page.fill('#roul0_bandWidth', '40');
await page.fill('#roul0_depth', '2');
await page.waitForTimeout(150);
for (const pattern of await page.$$eval('#roul0_pattern option', (o) => o.map((x) => x.value))) {
  label(`roulette:${pattern}`);
  await page.selectOption('#roul0_pattern', pattern);
  await page.waitForTimeout(120);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[roulette:${pattern}] audit="${verdict}"`);
  if (shotsDir) await page.screenshot({ path: `${shotsDir}/relief-${pattern}.png` });
}

// просвет между оттисками и несколько полос сразу
label('roulette-bands');
await page.fill('#roul0_gap', '8');
if (!(await auditVerdict(page)).includes('замкнуто ✓')) errors.push('[gap] меш разошёлся');

const addBand = page.locator('#card_roulette .fcard-body button', { hasText: 'Полоса' });
for (let i = 1; i < 4; i++) {
  await addBand.click();
  await page.waitForTimeout(120);
  const boxes = await page.locator('#card_roulette .band-box').count();
  if (boxes !== i + 1) errors.push(`[bands] полос ${boxes}, ожидалось ${i + 1}`);
  await page.selectOption(`#roul${i}_pattern`, i === 1 ? 'meander' : 'band');
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[bands:${i + 1}] audit="${verdict}"`);
}
// на пределе кнопку добавления прячем
if (await addBand.isVisible()) errors.push('[bands] кнопка добавления видна на пределе');
if (shotsDir) await page.screenshot({ path: `${shotsDir}/roulette-bands.png` });

// удаление возвращает список к одной полосе
for (let i = 3; i >= 1; i--) {
  await page.locator('#card_roulette .band-del').last().click();
  await page.waitForTimeout(100);
}
const left = await page.locator('#card_roulette .band-box').count();
if (left !== 1) errors.push(`[bands] после удаления осталось ${left}, ожидалась 1`);
await page.fill('#roul0_gap', '0');

// каждый встроенный пресет открывается и строится
label('presets');
const presetValues = await page.$$eval(
  '#presetSel optgroup[label="Готовые"] option',
  (nodes) => nodes.map((n) => n.value),
);
if (presetValues.length < 10) errors.push(`[presets] пресетов ${presetValues.length}, ожидалось ≥10`);
for (const value of presetValues) {
  label(`preset:${value}`);
  await page.selectOption('#presetSel', value);
  await page.waitForTimeout(120);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[${value}] audit="${verdict}"`);
  const blockers = (await page.locator('#blockers').textContent()).trim();
  if (blockers) errors.push(`[${value}] blockers="${blockers}"`);
  // Предупреждения о свесах законны: тарелку с почти горизонтальной стенкой
  // глиной без опор и правда не напечатать, а отливается она прекрасно.
  // А вот поднутрения — брак пресета: форма его не отпустит.
  const warnings = (await page.locator('#warnings').textContent()).trim();
  if (warnings.includes('Поднутрения')) errors.push(`[${value}] warnings="${warnings}"`);
}

// ссылка переносит состояние: открываем её в чистой вкладке и сверяем статус
label('share');
await page.selectOption('#presetSel', presetValues[1]);
await auditVerdict(page);
const beforeShare = await page.locator('#status').textContent();
await page.click('#shareBtn');
await page.waitForTimeout(300);
const shared = page.url();
if (!shared.includes('#s=')) errors.push(`[share] в адресе нет токена: ${shared}`);
await page.goto('about:blank');
await page.goto(shared);
await auditVerdict(page);
const afterShare = await page.locator('#status').textContent();
if (afterShare !== beforeShare) {
  errors.push(`[share] состояние не восстановилось: "${beforeShare}" → "${afterShare}"`);
}

// отмена возвращает к прежнему состоянию, повтор — обратно
label('undo');
await page.goto(shared.split('#')[0]);
await auditVerdict(page);
const initial = await page.locator('#status').textContent();
await page.fill('#heightMm', '260');
await page.waitForTimeout(900); // дольше склейки истории
const changed = await page.locator('#status').textContent();
if (changed === initial) errors.push('[undo] высота не изменилась, проверять нечего');
await page.click('#undoBtn');
await page.waitForTimeout(200);
if ((await page.locator('#status').textContent()) !== initial) {
  errors.push('[undo] отмена не вернула прежнее состояние');
}
await page.click('#redoBtn');
await page.waitForTimeout(200);
if ((await page.locator('#status').textContent()) !== changed) {
  errors.push('[undo] повтор не вернул изменение');
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
                           ['handle_topAngle', '-75'], ['handle_topAngle', '75'], ['handle_topAngle', '0'],
                           ['handle_bottomAngle', '-75'], ['handle_bottomAngle', '75'], ['handle_bottomAngle', '0'],
                           ['spout_pull', '60'], ['spout_width', '180'], ['spout_pull', '14'],
                           ['spout_width', '60']]) {
  const tag = await page.locator(`#${id}`).evaluate((n) => n.tagName);
  if (tag === 'SELECT') await page.selectOption(`#${id}`, value);
  else await page.fill(`#${id}`, value);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[attach:${id}=${value}] audit="${verdict}"`);
}
if (shotsDir) await page.screenshot({ path: `${shotsDir}/attachments.png` });

// трубчатый носик: переключение вида прячет чужие ползунки и строит трубку
label('spout-applied');
await page.selectOption('#spout_kind', 'applied');
await page.waitForTimeout(150);
if (await page.locator('#spout_pull').isVisible()) {
  errors.push('[spout-applied] ползунки оттянутого края видны у трубчатого носика');
}
for (const [id, value] of [['spout_length', '15'], ['spout_length', '150'], ['spout_length', '70'],
                           ['spout_attach', '0.2'], ['spout_attach', '0.85'], ['spout_attach', '0.4'],
                           ['spout_tip', '0.5'], ['spout_tip', '1.3'], ['spout_tip', '1'],
                           ['spout_base', '12'], ['spout_base', '80'], ['spout_base', '32'],
                           ['spout_tipD', '6'], ['spout_tipD', '40'], ['spout_tipD', '15'],
                           ['spout_angle', '20'], ['spout_angle', '85'], ['spout_angle', '55']]) {
  await page.fill(`#${id}`, value);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[spout:${id}=${value}] audit="${verdict}"`);
}
await page.selectOption('#spout_kind', 'lip');
await page.waitForTimeout(120);
if (!(await page.locator('#spout_pull').isVisible())) {
  errors.push('[spout-applied] вернулись к краю, а его ползунки не показались');
}

// стенка и дно: крайние значения не должны рвать полость
label('hollow');
for (const [id, value] of [['print_wall', '0.8'], ['print_wall', '60'], ['print_wall', '3'],
                           ['print_base', '1'], ['print_base', '60'], ['print_base', '4'],
                           ['print_rim', '0'], ['print_rim', '8'], ['print_rim', '1.5']]) {
  await page.fill(`#${id}`, value);
  const verdict = await auditVerdict(page);
  if (!verdict.includes('замкнуто ✓')) errors.push(`[hollow:${id}=${value}] audit="${verdict}"`);
}

// конечный продукт приложения — файл; проверяем, что он реально выгружается
label('export');
await expectDownloads(1, 'vessel');

// Точная сборка изделия: быстрое превью рисует ручку и носик отдельными
// телами, а следом воркер присылает их настоящее объединение — с срезанными
// полостью торцами и сквозным носиком. Отличить одно от другого можно по
// числу треугольников в вердикте: оно обязано смениться.
label('exact-preview');
await page.selectOption('#presetSel', 'b:Чайник');
const quickVerdict = await auditVerdict(page);
const exactStarted = Date.now();
try {
  await page.waitForFunction(
    (before) => (document.querySelector('#audit')?.textContent ?? '') !== before,
    quickVerdict,
    { timeout: 30000 },
  );
  console.log(`точная сборка изделия: ${Date.now() - exactStarted} мс после быстрого вердикта`);
} catch {
  errors.push(`[exact-preview] точная сборка не доехала: audit так и остался "${quickVerdict}"`);
}
const exactVerdict = await auditVerdict(page);
if (!exactVerdict.includes('замкнуто ✓')) errors.push(`[exact-preview] audit="${exactVerdict}"`);

// чайник экспортируется целиком: тело, ручка и трубка носика с проходом
// сквозь стенку — единственный STL, где сходится весь CSG изделия
label('export-teapot');
await expectDownloads(1, 'teapot');

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
await expectDownloads(3, 'mold', true);

/**
 * Клик по «Экспорт» → столько-то реальных файлов. `watchProgress` заодно
 * следит, что полоса прогресса ожила: сборку считает воркер, и полоса —
 * единственный признак, что вкладка не умерла, а работает.
 */
async function expectDownloads(count, tag, watchProgress = false) {
  // Пресеты сбрасывают детализацию к своей, поэтому ставим её перед каждым
  // экспортом, а не один раз на весь прогон.
  if (resolution) {
    await page.selectOption('#resolution', resolution);
    await page.waitForTimeout(200);
  }
  const seen = [];
  const collect = (download) => seen.push(download);
  page.on('download', collect);
  const started = Date.now();
  await page.click('#exportBtn');
  const deadline = started + 300000;
  let progressSeen = false;
  while (seen.length < count && Date.now() < deadline) {
    if (watchProgress && !progressSeen) {
      progressSeen = await page.locator('#progressWrap').isVisible();
    }
    await page.waitForTimeout(200);
  }
  page.off('download', collect);
  console.log(`export ${tag}: ${seen.length} файл(ов) за ${Date.now() - started} мс`
    + `${resolution ? `, детализация ${resolution}` : ''}`);
  if (watchProgress && !progressSeen) errors.push(`[${tag}] полоса прогресса ни разу не показалась`);
  // файлы уходят по одному с паузой, так что полоса гаснет чуть позже
  // последней загрузки — ждём, а не проверяем мгновенно
  try {
    await page.waitForFunction(() => document.querySelector('#progressWrap')?.hidden, { timeout: 5000 });
  } catch {
    errors.push(`[${tag}] полоса прогресса осталась висеть после экспорта`);
  }
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
