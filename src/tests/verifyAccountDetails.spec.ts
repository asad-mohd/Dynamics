import { test, expect, Page } from "@playwright/test";

// generating random primary identification number
let primaryIDNumber = "";
for (let i = 0; i < 9; i++) {
  primaryIDNumber += Math.floor(Math.random() * 10).toString();
}
console.log(primaryIDNumber);

const baseUrl: any = process.env.BASEURL;

test(`Create contact`, async ({ page }) => {
  await page.goto(
    `${baseUrl}/main.aspx?appid=003ada10-09b4-ea11-a812-000d3a7ed588`
  );
  expect(page.locator('[aria-label="MazikCare Referral Management"]'))
    .toBeVisible;
  // create a new contact
  await page.locator('[aria-label="Patients"]').click();
  expect(
    page.locator('[data-automationid="splitbuttonprimary"] span span', {
      hasText: "Patients",
    })
  ).toBeVisible;
  await page.locator('button[aria-label="New"]').click();
  // fill basic information
  expect(page.locator('[data-id="header_title"]')).toContainText("New Contact");
  const basicInfoContainer = page.locator('[aria-label="BASIC INFORMATION"]');
  await basicInfoContainer.getByLabel("First Name").fill("James");
  await basicInfoContainer.getByLabel("Last Name").fill("Smith");
  await basicInfoContainer
    .locator('input[aria-label="Gender, Lookup"]')
    .fill("Male");
  await page.waitForSelector('[aria-label="Lookup results"]');
  const genderOption = await page.$$('[aria-label="Lookup results"] li');
  await genderOption[0].click(); // Male

  await page
    .locator('[aria-label="BASIC INFORMATION"] [data-id="mzk_patientlanguage"]')
    .scrollIntoViewIfNeeded();
  await basicInfoContainer
    .locator('input[aria-label="Primary Language, Lookup"]')
    .fill("en-GB");
  await page.waitForSelector('[aria-label="Lookup results"] li');
  const langOption = await page.$$('[aria-label="Lookup results"] li');
  await langOption[0].click();

  // select identification type and fill identification number
  await page
    .locator(
      '[aria-label="Identification"] [data-id="mzk_patientidentificationtype"]'
    )
    .scrollIntoViewIfNeeded();
  const identificationContainer = page.locator('[aria-label="Identification"]');
  const option = identificationContainer.locator(
    '[aria-label="Primary Identification Type"]'
  );
  await option.selectOption("Hospital Reference Number");

  await identificationContainer
    .locator('[aria-label="Primary Identification Number"]')
    .fill(primaryIDNumber);
  /*
      // add address
  */
  // add address
  await page
    .locator('[aria-label="Home Address (Primary Address)"]')
    .scrollIntoViewIfNeeded();
  const primaryAdd = page.locator(
    '[aria-label="Home Address (Primary Address)"]'
  );
  await primaryAdd.getByLabel("Name").fill("James");
  await primaryAdd.getByLabel("Address line 1").fill("27B Lechlade Road");
  await primaryAdd.getByLabel("Town").fill("Faringdon");
  await primaryAdd.getByLabel("State/Province").fill("England");
  await primaryAdd.getByLabel("Country Code ISO").fill("GB");
  // select suggested address from the dialog box
  await page.locator('button[aria-label="OK"]').click();

  // set deliver address as primary address
  await page
    .locator('[aria-label="Default Delivery Address"]')
    .getByLabel("No")
    .click();

  // set treatment address as primary address
  await page
    .locator('[aria-label="Default Treatment Address"]')
    .scrollIntoViewIfNeeded();
  await page
    .locator('[aria-label="Default Treatment Address"]')
    .getByLabel("No")
    .click();

  // save the contact
  await page.locator('button[aria-label="Save (CTRL+S)"]').click();
  // assert contact is created
  await expect(
    page.locator('[data-id="headerContainer"] h1', { hasText: "James Smith" })
  ).toBeVisible({ visible: true });

  // Delete the contact
  await page.locator('button[aria-label="More commands for Contact"]').click();
  await page
    .locator(
      '[id="OverflowButton_button5_flyout"] li button[aria-label="Delete"]'
    )
    .click();
  await page
    .locator('[data-id="confirmdialog"] button[aria-label="Delete"]')
    .click();
  // wait for 5 sec to delete account successful
  await page.waitForTimeout(5000);
});
