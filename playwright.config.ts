import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/e2e/tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx tsx app/src/server.ts',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
