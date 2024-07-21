import { test } from "@playwright/test";
import random  from "../pageObjects/randomGenerator";
import { createContact} from "../pageObjects/createContact"
import { Navigation } from "src/pageObjects/navigation"; 
import { CommandBar } from "src/pageObjects/commandBar";



let primaryIDNumber = random.generatePrimaryIdNumber(7);
const firstName = random.generateRandomString(6);
const lastName = random.generateRandomString(8);

test(`Create contact`, async ({ page }) => {
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
  await contact.fillIdentificationInfo(primaryIDNumber)

  // add address
  await contact.fillAddressInfo(firstName);

  // set deliver address as primary address
  await contact.setDeliveryAddressAsPrimaryAddress();

  // set treatment address as primary address
  await contact.setTreatmentAddressAsPrimaryAddress()

  // save the contact
  await commandBar.clickOnSaveButton();

  // assert contact is created
  await contact.verifyContactIsCreated(firstName, lastName);

  // // Delete the contact
  await commandBar.clickOnDeleteButton();
});
