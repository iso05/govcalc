import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@govcalc/config': path.resolve(__dirname, '../packages/config/src'),
      '@govcalc/types': path.resolve(__dirname, '../packages/types/src'),
      '@govcalc/ui': path.resolve(__dirname, '../packages/ui/src'),
      '@govcalc/validation': path.resolve(__dirname, '../packages/validation/src'),
      '@govcalc/calculators': path.resolve(__dirname, '../packages/calculators/src'),
      '@': path.resolve(__dirname, '../apps/web'),
    },
  },
});
