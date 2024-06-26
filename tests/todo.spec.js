const { test, expect } = require('@playwright/test');

test('Todo - Main', async ({ page }) => {
  await page.goto('/todos');
  page.waitForLoadState('networkidle');

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot();
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Testing Ground');
});
