const { test, expect } = require('@playwright/test');

test('Chat - Main', async ({ page }) => {
  await page.goto('/chat');

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot();
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Testing Ground');
});

test.describe('Chat - Authenticated', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Chat - Authenticated', async ({ page }) => {
    await page.goto('/chat');
    page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot();
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Testing Ground');
  });
});
