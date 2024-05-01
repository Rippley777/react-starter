const { test, expect } = require('@playwright/test');

test('Chat - Main', async ({ page }) => {
  await page.goto('/chat');

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot();
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Testing Ground');
});
