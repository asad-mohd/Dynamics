import { chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth";

async function otpAuthentication() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  let totp = new OTPAuth.TOTP({
    issuer: "Microsoft",
    secret: "c6cpxv2ptyk7fyt7",
  });
  await page.goto("https://hah-ce-ptntapp-test1.crm11.dynamics.com");
  await page.locator('[type="email"]').fill("Ruchika.Kandpal@hah.co.uk");
  await page.locator('[type="submit"]').click();
  expect(page.locator(".logoImage]")).toBeVisible;
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
