#!/usr/bin/env node
// Браузерный смоук: то, что нельзя проверить в vitest — Three.js/WebGL,
// загрузка WASM-CSG, реальные клики по UI.
//
//   node scripts/smoke.mjs              # dev-сервер
//   node scripts/smoke.mjs --preview    # прод-сборка (vite preview :4173)
//
// Любая ошибка консоли/страницы → ненулевой код выхода (годится для CI).

import { parseArgs, openApp } from './lib/harness.mjs';

const flags = parseArgs(process.argv.slice(2));
const app = await openApp({ preview: flags.has('preview') });
const { page, errors, label } = app;

label('boot');
await page.waitForFunction(
  () => (document.querySelector('#status')?.textContent ?? '').length > 0,
  { timeout: 20000 },
);
const status = await page.locator('#status').textContent();
if (!status.includes('CSG готовы')) {
  errors.push(`[boot] WASM-CSG не поднялся: status="${status}"`);
}

await app.close();

if (errors.length) {
  console.error(`smoke FAILED (${errors.length}):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('smoke OK');
