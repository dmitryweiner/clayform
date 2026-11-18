import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { serviceWorkerPlugin } from './src/sw-plugin.ts';

/**
 * Имя пакета — id приложения: приставка кэша сервис-воркера. Все приложения
 * на `<user>.github.io` делят одно хранилище кэшей, и каждое чистит только свои.
 */
function appId(): string {
  const pkg: unknown = JSON.parse(readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf8'));
  if (typeof pkg === 'object' && pkg !== null && 'name' in pkg && typeof pkg.name === 'string') return pkg.name;
  throw new Error('package.json has no name');
}

export default defineConfig({
  base: './',
  // офлайн после первого визита: sw.js кладёт в кэш сборку и public/ (_conventions/pwa.md)
  plugins: [serviceWorkerPlugin({ appId: appId(), publicDir: resolve(import.meta.dirname, 'public') })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Three.js — 86 % главного чанка: 490 КБ из 568 (122 из 152 в gzip).
    // Ужать его нечем, и это проверено, а не предположено: внутри
    // WebGLRenderer с библиотекой шейдеров, а тряска дерева уже отработала —
    // `import * as THREE` и поимённый импорт дают байт в байт одно и то же.
    //
    // Отдельный чанк поэтому НЕ про вес: первая загрузка ровно та же, оба
    // файла нужны до первого кадра и грузятся параллельно по modulepreload.
    // Он про кэш. Наш код меняется каждым деплоем, Three — раз в полгода,
    // и вернувшийся посетитель забирает 30 КБ вместо 152.
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) принимает только функцию; OrbitControls лежит
        // в том же пакете и уходит в тот же чанк.
        manualChunks(id: string) {
          return id.includes('node_modules/three/') ? 'three' : undefined;
        },
      },
    },
    // Порог предупреждения — выше вендорного чанка. О том, что Three весит
    // полмегабайта, мы уже знаем, и сообщать об этом каждой сборкой значит
    // приучать не читать предупреждения. А вот если полмегабайта наберёт
    // НАШ код, это будет новостью.
    chunkSizeWarningLimit: 600,
  },
  // manifold-3d — WASM-модуль; исключаем из pre-bundling, иначе vite ломает
  // относительный путь к .wasm внутри пакета. maker-kit — исходники на
  // TypeScript, а pre-bundling читает их как JavaScript, и dev-сервер падает:
  // vite раздаёт их как наши собственные.
  optimizeDeps: {
    exclude: ['manifold-3d', 'maker-kit'],
  },
  // CSG живёт в module worker'е. Формат по умолчанию (iife) для него не
  // годится: обвязка manifold ищет свой .wasm через import.meta.url, а в
  // iife его попросту нет.
  worker: {
    format: 'es',
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
    // Node не снимает типы с файлов в node_modules: исходники кита
    // преобразуются как наши.
    server: { deps: { inline: ['maker-kit'] } },
  },
});
