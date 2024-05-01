const { test, expect } = require('@playwright/test');

test('Home Page - Main', async ({ page }) => {
  await page.goto('/');

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot();
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Testing Ground');
});
