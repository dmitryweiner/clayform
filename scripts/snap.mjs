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
//   --set <id>=<value>    любой input/select по id элемента (повторяемый)
//   --check <id>          включить чекбокс (повторяемый)
//   --uncheck <id>        выключить чекбокс (повторяемый)
//   --click <selector>    кликнуть по селектору (повторяемый)
//   --view                снять только область просмотра, без панели
//   --wait <ms>           доп. пауза перед съёмкой
//   --width / --height    размер окна
//   --preview             прод-сборка вместо dev-сервера
//   --url <path>          снять произвольный путь сервера (иконку, ассет)

import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(
  process.argv.slice(2),
  ['out', 'family', 'wait', 'width', 'height', 'url'],
  ['set', 'check', 'uncheck', 'click'],
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

for (const id of flags.get('check') ?? []) {
  label(`check:${id}`);
  await page.check(`#${id}`);
  await page.waitForTimeout(80);
}
for (const id of flags.get('uncheck') ?? []) {
  label(`uncheck:${id}`);
  await page.uncheck(`#${id}`);
  await page.waitForTimeout(80);
}

for (const pair of flags.get('set') ?? []) {
  const eq = pair.indexOf('=');
  const id = pair.slice(0, eq);
  const value = pair.slice(eq + 1);
  label(`set:${id}`);
  const tag = await page.locator(`#${id}`).evaluate((n) => n.tagName);
  if (tag === 'SELECT') await page.selectOption(`#${id}`, value);
  else await page.fill(`#${id}`, value);
  await page.waitForTimeout(80);
}

for (const selector of flags.get('click') ?? []) {
  label(`click:${selector}`);
  await page.click(selector);
  await page.waitForTimeout(120);
}

await page.waitForTimeout(Number(flags.get('wait') ?? 400));

const target = flags.has('view') ? page.locator('#viewWrap') : page;
await target.screenshot({ path: out });

const status = await page.locator('#status').textContent();
const warnings = (await page.locator('#warnings').textContent()).trim();
const blockers = (await page.locator('#blockers').textContent()).trim();
await app.close();

console.log(`snap → ${out}`);
console.log(`status: ${status}`);
if (warnings) console.log(`warnings: ${warnings}`);
if (blockers) console.log(`blockers: ${blockers}`);
if (errors.length) {
  console.error(`console errors (${errors.length}):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
