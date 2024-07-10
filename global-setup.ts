import { Browser, chromium, Page } from "@playwright/test";
import * as OTPAuth from "otpauth";

async function globalSetup(){
    const browser: Browser = await chromium.launch()
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    let totp = new OTPAuth.TOTP({
        issuer: "Microsoft",
        secret: "c6cpxv2ptyk7fyt7",
      });
      //cptest
      await page.goto("https://hah-ce-ptntapp-test1.crm11.dynamics.com");
      await page.locator('[type="email"]').fill("Ruchika.Kandpal@hah.co.uk");
      await page.locator('[type="submit"]').click();
      await page.locator('[id="passwordInput"]').fill("Healthcare24");
      await page.locator('[id="submitButton"]').click();
      
      let token = totp.generate();
      
      await page.locator('[id="signInAnotherWay"]').click();
      await page.locator('[data-value="PhoneAppOTP"]').click();
      await page.locator('[id="idTxtBx_SAOTCC_OTC"]').fill(token);
      await page.locator('[type="submit"]').click();
      await page.locator('[id="KmsiCheckboxField"]').click();
      await page.locator('[type="submit"]').click();
      await page.waitForLoadState()

      // Save the state of the webpage
      await page.context().storageState({ path: "./Auth.json" });
      await browser.close();

}


export default globalSetup;
