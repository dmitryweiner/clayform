// Общая обвязка браузерных скриптов: разбор флагов, поднятие vite-сервера,
// сбор ошибок консоли. Правило репозитория — не плодить одноразовые скрипты,
// а расширять эти (см. CLAUDE.md).

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

/** Разбирает `--flag value` / `--flag`; VALUE_FLAGS перечисляет флаги со значением. */
export function parseArgs(argv, valueFlags = [], repeatableFlags = []) {
  const values = new Set(valueFlags);
  const repeatable = new Set(repeatableFlags);
  const flags = new Map();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const name = arg.slice(2);
    const value = values.has(name) || repeatable.has(name) ? argv[++i] : 'true';
    if (repeatable.has(name)) {
      const list = flags.get(name) ?? [];
      list.push(value);
      flags.set(name, list);
    } else {
      flags.set(name, value);
    }
  }
  return flags;
}

export function baseUrl(preview) {
  return `http://localhost:${preview ? 4173 : 5173}`;
}

async function serverUp(base) {
  try {
    return (await fetch(base)).ok;
  } catch {
    return false;
  }
}

/** Поднимает dev/preview-сервер, если он ещё не слушает порт. */
export async function ensureServer(preview) {
  const base = baseUrl(preview);
  if (await serverUp(base)) return { base, proc: null };
  const port = preview ? 4173 : 5173;
  const cmd = preview
    ? ['vite', 'preview', '--port', String(port), '--strictPort']
    : ['vite', '--port', String(port), '--strictPort'];
  const proc = spawn('npx', cmd, { stdio: 'ignore' });
  for (let i = 0; i < 40 && !(await serverUp(base)); i++) {
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!(await serverUp(base))) {
    console.error(`server did not start on :${port}`);
    process.exit(1);
  }
  return { base, proc };
}

/**
 * Открывает страницу и начинает копить ошибки. `label(text)` помечает,
 * на каком шаге сценария они случились.
 */
export async function openApp({ preview = false, width = 1280, height = 860 } = {}) {
  const { base, proc } = await ensureServer(preview);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  let context = 'app';
  page.on('pageerror', (e) => errors.push(`[${context}] ${String(e)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${context}] ${m.text()}`);
  });
  await page.goto(base, { waitUntil: 'load' });
  return {
    page,
    errors,
    label: (text) => {
      context = text;
    },
    async close() {
      await browser.close();
      proc?.kill();
    },
  };
}
