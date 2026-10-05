import { defineConfig, devices } from '@playwright/test';

import path from 'path';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile Chrome (390px)',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Desktop Chrome (1280px)',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
  ],
  webServer: process.env.E2E_BASE_URL ? undefined : {
    command: 'node ../../node_modules/next/dist/bin/next start -p 3000',
    cwd: path.resolve(__dirname, '../apps/web'),
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
