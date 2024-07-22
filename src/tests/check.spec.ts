import { chromium, expect, test } from "@playwright/test";
import * as OTPAuth from "otpauth";

const username: any = process.env.USER_NAME;
const password: any = process.env.PASSWORD;

test(`check-microsoft-login`, async ({ page }) => {
    // const { baseURL } :  any = config.projects[1].use;
    // console.log(baseURL)
    let totp = new OTPAuth.TOTP({
      issuer: "Microsoft",
      secret: "c6cpxv2ptyk7fyt7",
    });
    await page.goto(`/main.aspx?appid=003ada10-09b4-ea11-a812-000d3a7ed588`);
    await page.locator('[type="email"]').fill(username);
    await page.locator('[type="submit"]').click();
    // expect(page.locator('[id="contentWrapper"]')).toBeVisible({timeout: 60000});
    await page.waitForLoadState("domcontentloaded");
    console.log(password);
    try {
      await page.locator('//*[@id="passwordArea"]').waitFor({ state: 'visible', timeout: 60000 });
      await page.locator('//*[@id="passwordArea"]').click();
    } catch (e) {
      console.error("Password area not found:", e);
      await page.screenshot({ path: 'password_area_not_found.png' });
      throw e;
    }
    await page.locator('//*[@id="passwordArea"]').click();
    await page.locator('[id="passwordInput"]').fill("Healthcare24");
    await page.locator('[id="submitButton"]').click();
    await page
      .getByText(`I can't use my Microsoft Authenticator app right now`)
      .click();
    let otp = totp.generate();
    await page.locator('[data-value="PhoneAppOTP"]').click();
    await page.locator('[id="idTxtBx_SAOTCC_OTC"]').fill(otp);
    await page.locator('[type="submit"]').click();
    // verify user is logged in
    await page.locator('[id="idSIButton9"]').click();
    await page.waitForLoadState();
});
