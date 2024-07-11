import { test, expect } from "@playwright/test";

test(`Go to homepage and verify user's account details`, async ({ page }) => {
  await page.goto("https://hah-ce-ptntapp-test1.crm11.dynamics.com");
  expect(page.locator('[data-id="topBar"]')).toBeVisible;
  await page.locator('[id="mectrl_main_trigger"]').click();
  expect(page.locator('[aria-label="Sign out of this account"]')).toBeVisible;
});
