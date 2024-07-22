import { chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";
import { FullConfig } from '@playwright/test';

const username: any = process.env.USER_NAME;
const password: any = process.env.PASSWORD;

async function otpAuthentication(config: FullConfig) {
  const { baseURL } :  any = config.projects[1].use;
  console.log(baseURL)
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  let totp = new OTPAuth.TOTP({
    issuer: "Microsoft",
    secret: "c6cpxv2ptyk7fyt7",
  });
  await page.goto(baseURL);
  await page.locator('[type="email"]').fill(username);
  await page.locator('[type="submit"]').click();
  // expect(page.locator('[id="contentWrapper"]')).toBeVisible({timeout: 60000});
  await page.waitForTimeout(3000);
  console.log(password);
  await page.locator('[id="passwordInput"]').click();
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
  await context.storageState({ path: "./loginAuth.json" });
  await browser.close();
}

export default otpAuthentication;
