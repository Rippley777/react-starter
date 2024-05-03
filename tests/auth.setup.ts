import { test as setup, expect } from '@playwright/test';

const adminFile = 'playwright/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/login');
  await page.getByTestId('email').fill('test@test.com');
  await page.getByTestId('password').fill('testtest');
  await page.getByRole('button').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/profile');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //   await expect(
  //     page.getByRole('button', { name: 'View profile and more' }),
  //   ).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: adminFile });
});

// const userFile = 'playwright/.auth/user.json';

// setup('authenticate as user', async ({ page }) => {
//   // Perform authentication steps. Replace these actions with your own.
//   await page.goto('https://github.com/login');
//   await page.getByLabel('Username or email address').fill('user');
//   await page.getByLabel('Password').fill('password');
//   await page.getByRole('button', { name: 'Sign in' }).click();
//   // Wait until the page receives the cookies.
//   //
//   // Sometimes login flow sets cookies in the process of several redirects.
//   // Wait for the final URL to ensure that the cookies are actually set.
//   await page.waitForURL('https://github.com/');
//   // Alternatively, you can wait until the page reaches a state where all cookies are set.
//   await expect(
//     page.getByRole('button', { name: 'View profile and more' }),
//   ).toBeVisible();

//   // End of authentication steps.

//   await page.context().storageState({ path: userFile });
// });