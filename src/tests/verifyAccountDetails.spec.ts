import { test, expect } from "@playwright/test";

const baseUrl: any = process.env.BASEURL;

test(`Go to homepage and verify user's account details`, async ({ page }) => {
  await page.goto(baseUrl);
  expect(page.locator('[data-id="topBar"]')).toBeVisible;
  await page.locator('[id="mectrl_main_trigger"]').click();
  expect(page.locator('[aria-label="Sign out of this account"]')).toBeVisible;
});
