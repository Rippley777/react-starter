// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  snapshotDir: './tests/snapshots',
  reporter: [['html', { outputFolder: './playwright-report' }]],
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      dependencies: ['setup'],
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
      },
      dependencies: ['setup'],
    },
  ],
};
