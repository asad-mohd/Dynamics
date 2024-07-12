import { chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";

const username: any = process.env.USER_NAME;
const password: any = process.env.PASSWORD;
const baseUrl: any = process.env.BASEURL;

async function otpAuthentication() {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();
  let totp = new OTPAuth.TOTP({
    issuer: "Microsoft",
    secret: "c6cpxv2ptyk7fyt7",
  });
  await page.goto(baseUrl);
  await page.locator('[type="email"]').fill(username);
  await page.locator('[type="submit"]').click();
  expect(page.locator(".logoImage]")).toBeVisible;
  await page.locator('[id="passwordInput"]').fill(password);
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
