// Обвязка браузерных скриптов — китовая (`maker-kit/harness`): разбор
// флагов, свой vite на своих портах со --strictPort (перед `--preview` сам
// пересобирает, занятый порт превью — ошибка), страницы со сбором ошибок
// консоли, шаги и прогон. Здесь — только порты clayform. Правило
// репозитория — не плодить одноразовые скрипты, а расширять эти (см.
// CLAUDE.md).
//
// Браузер — Playwright по умолчанию либо из `PLAYWRIGHT_BROWSER` (путь к
// исполняемому chromium): в облачном контейнере Playwright ищет не ту
// сборку, что предустановлена.

import { launch as kitLaunch } from 'maker-kit/harness';

export { binaryStl, check, download, horizontalOverflow, offline, parseArgs, settled, throttle, VIEWPORTS } from 'maker-kit/harness';

/**
 * Порты clayform — свои, со --strictPort: сервер другого проекта на
 * 5173/4173 по ошибке не проверится (список занятых — в docs/harness.md кита).
 */
export const PORTS = { dev: 5281, preview: 4281 };

/** `launch` кита на портах clayform. */
export const launch = ({ preview = false } = {}) => kitLaunch({ preview, ports: PORTS });
