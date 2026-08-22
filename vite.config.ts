import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  // manifold-3d — WASM-модуль; исключаем из pre-bundling, иначе vite ломает
  // относительный путь к .wasm внутри пакета.
  optimizeDeps: {
    exclude: ['manifold-3d'],
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
  },
});
