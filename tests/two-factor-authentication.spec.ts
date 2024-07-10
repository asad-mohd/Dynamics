import { test, expect } from "@playwright/test";

test("testcode", async ({ page }) => {
  await page.goto(
    "https://hah-ce-ptntapp-test1.crm11.dynamics.com/main.aspx?appid=003ada10-09b4-ea11-a812-000d3a7ed588"
  );
  
  await page.waitForLoadState("domcontentloaded");
  await page.locator('[data-id="appBreadCrumbText"]').click();
});
