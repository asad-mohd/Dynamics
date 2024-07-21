import { test } from "@playwright/test";
import random from "../pageObjects/randomGenerator";
import { createContact } from "../pageObjects/createContact";
import { Navigation } from "src/pageObjects/navigation";
import { CommandBar } from "src/pageObjects/commandBar";

const firstName = random.generateRandomString(6);
const lastName = random.generateRandomString(8);
console.log(`${firstName} ${lastName}`);

test(`Create contact`, async ({ page }) => {
  const primaryIDNumber = random.generatePrimaryIdNumber(7);
  const contact = new createContact(page);
  const navigation = new Navigation(page);
  const commandBar = new CommandBar(page);

  // Go to homepage
  await contact.goToHomepage();

  // Go to patient page
  await navigation.clickOnPatientTab();

  // Click on New Button
  await commandBar.clickOnNewButton();

  // fill basic information
  await contact.fillBasicInformation(firstName, lastName);

  // select identification type and fill identification number
  await contact.fillIdentificationInfo(primaryIDNumber);

  // add address
  await contact.fillAdressInfoForGl4b(firstName);

  // set deliver address as primary address
  await contact.setDeliveryAddressAsPrimaryAddress();

  // set treatment address as primary address
  await contact.setTreatmentAddressAsPrimaryAddress();

  // save the contact
  await commandBar.clickOnSaveButton();

  // assert contact is created
  await contact.verifyContactIsCreated(firstName, lastName);
});

test("Create Referral with the above contact;", async ({ page }) => {
  const primaryIDNumber: any = random.generatePrimaryIdNumber(7);
  const primaryIDNumberTwo: any = random.generatePrimaryIdNumber(7);
  const contact = new createContact(page);
  const navigation = new Navigation(page);
  const commandBar = new CommandBar(page);

  // Go to homepage
  await contact.goToHomepage();

  // Go to patient page
  await navigation.clickOnPatientTab();

  //Close Copilot Button
  await navigation.closeCopilotUI();

  //Find Patient
  await commandBar.searchPatient(firstName, lastName);

  // select Created contact
  await commandBar.ClickOnSelectAllButton();
  await commandBar.clickOnEditButton();

  // create new referral for patient
  await contact.createNewOpportunity();

  // fill contract info
  await contact.fillContractInfo();

  // fill Registretion info
  await contact.fillRegistrationInfo(primaryIDNumber);

  // fil patient mandatory fields
  await contact.fillPatientDetailsMandatoryFields(primaryIDNumberTwo);

  // Save referral
  await commandBar.clickOnSaveButtonforGl4b();

  // verify and Save referral
  await contact.verifyReferral();
  await page.waitForTimeout(2000);

  // confirm Referral
  await contact.clickOnConfirmButton();
  await page.waitForTimeout(2000);
   
});
