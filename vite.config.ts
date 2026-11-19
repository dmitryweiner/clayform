import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
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
