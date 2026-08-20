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
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
  },
});
