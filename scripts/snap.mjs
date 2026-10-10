#!/usr/bin/env node
// Точечный скриншот приложения в заданном состоянии. Расширять флагами, а не
// плодить одноразовые скрипты (см. CLAUDE.md).
//
//   node scripts/snap.mjs --out shots/x.png
//   node scripts/snap.mjs --out shots/x.png --family vase --set heightMm=300
//   node scripts/snap.mjs --out shots/x.png --check on_roulette \
//        --set roul_pattern=dots --set roul_depth=2 --set roul_bandWidth=18
//
// Флаги:
//   --out <path>          куда сохранить (обязателен)
//   --family <id>         pot | bowl | cup | vase
//   --preset <name>       встроенный пресет по имени
//   Действия (--check/--uncheck/--set/--upload/--click) выполняются в порядке
//   командной строки — клик может открыть ползунок, который следом ставится.
//   --set <id>=<value>    любой input/select по id элемента (повторяемый)
//   --check <id>          включить чекбокс (повторяемый)
//   --uncheck <id>        выключить чекбокс (повторяемый)
//   --click <selector>    кликнуть по селектору (повторяемый)
//   --upload <id>=<path>  отдать файл в <input type=file> (повторяемый),
//                         например --upload roul0_image=tests/fixtures/ornament.png
//   --view                снять только область просмотра, без панели
//   --clip x,y,w,h        вырезать кусок кадра — разглядеть стык вблизи
//   --orbit dx,dy         повернуть камеру мышью: заглянуть внутрь изделия
//   --wait <ms>           доп. пауза перед съёмкой
//   --width / --height    размер окна
//   --preview             прод-сборка вместо dev-сервера
//   --url <path>          снять произвольный путь сервера (иконку, ассет)

import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(
  process.argv.slice(2),
  ['out', 'family', 'preset', 'wait', 'width', 'height', 'url', 'clip', 'orbit'],
  ['set', 'check', 'uncheck', 'click', 'upload'],
);

const out = flags.get('out');
if (!out) {
  console.error('нужен --out <path>');
  process.exit(2);
}
mkdirSync(dirname(out), { recursive: true });

const FAMILY_ORDER = ['pot', 'bowl', 'cup', 'vase'];

const app = await openApp({
  preview: flags.has('preview'),
  width: Number(flags.get('width') ?? 1280),
  height: Number(flags.get('height') ?? 860),
});
const { page, errors, label } = app;

const rawUrl = flags.get('url');
if (rawUrl) {
  // Статический ассет: приложение не поднимаем, просто открываем путь.
  label(`url:${rawUrl}`);
  await page.goto(new URL(rawUrl, page.url()).href);
  await page.waitForTimeout(Number(flags.get('wait') ?? 300));
  await page.screenshot({ path: out });
  await app.close();
  console.log(`snap → ${out}`);
  process.exit(errors.length ? 1 : 0);
}

label('boot');
await page.waitForFunction(
  () => (document.querySelector('#status')?.textContent ?? '').length > 0,
  { timeout: 20000 },
);

const family = flags.get('family');
if (family) {
  const index = FAMILY_ORDER.indexOf(family);
  if (index < 0) {
    console.error(`неизвестное семейство: ${family} (есть ${FAMILY_ORDER.join(', ')})`);
    process.exit(2);
  }
  label(`family:${family}`);
  await page.locator('#familyGrid .family-btn').nth(index).click();
  await page.waitForTimeout(200);
}

const preset = flags.get('preset');
if (preset) {
  label(`preset:${preset}`);
  await page.selectOption('#presetSel', `b:${preset}`);
  await page.waitForTimeout(300);
}

// Действия идут в порядке командной строки: «--click '+ Полоса'» и следом
// «--set lidroul0_pattern=…» должны работать — ползунок появляется кликом.
const ACTIONS = new Set(['check', 'uncheck', 'set', 'upload', 'click']);
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const name = argv[i].startsWith('--') ? argv[i].slice(2) : '';
  if (!ACTIONS.has(name)) continue;
  const arg = argv[++i];
  label(`${name}:${arg}`);
  const eq = arg.indexOf('=');
  if (name === 'check') {
    await page.check(`#${arg}`);
    await page.waitForTimeout(80);
  } else if (name === 'uncheck') {
    await page.uncheck(`#${arg}`);
    await page.waitForTimeout(80);
  } else if (name === 'set') {
    const id = arg.slice(0, eq);
    const value = arg.slice(eq + 1);
    const tag = await page.locator(`#${id}`).evaluate((n) => n.tagName);
    if (tag === 'SELECT') await page.selectOption(`#${id}`, value);
    else await page.fill(`#${id}`, value);
    await page.waitForTimeout(80);
  } else if (name === 'upload') {
    await page.setInputFiles(`#${arg.slice(0, eq)}`, arg.slice(eq + 1));
    await page.waitForTimeout(300);
  } else {
    await page.click(arg);
    await page.waitForTimeout(120);
  }
}

// Вращение — обычным перетаскиванием по канвасу, как это делает человек.
const orbit = flags.get('orbit');
if (orbit) {
  const [dx, dy] = orbit.split(',').map(Number);
  label(`orbit:${orbit}`);
  const box = await page.locator('#view').boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(150);
}

await page.waitForTimeout(Number(flags.get('wait') ?? 400));

// Кадрирование — только у страницы целиком: у локатора свои координаты,
// и «вырезать кусок канваса» проще, отсчитывая от левого верхнего угла окна.
const clip = flags.get('clip');
if (clip) {
  const [x, y, width, height] = clip.split(',').map(Number);
  await page.screenshot({ path: out, clip: { x, y, width, height } });
} else {
  const target = flags.has('view') ? page.locator('#viewWrap') : page;
  await target.screenshot({ path: out });
}

const status = await page.locator('#status').textContent();
const audit = (await page.locator('#audit').textContent()).trim();
const warnings = (await page.locator('#warnings').textContent()).trim();
const blockers = (await page.locator('#blockers').textContent()).trim();
await app.close();

console.log(`snap → ${out}`);
console.log(`status: ${status}`);
console.log(`audit: ${audit}`);
if (warnings) console.log(`warnings: ${warnings}`);
if (blockers) console.log(`blockers: ${blockers}`);
if (errors.length) {
  console.error(`console errors (${errors.length}):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
