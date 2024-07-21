import { Page, Locator, expect } from "@playwright/test";

export class createContact {
  page: Page;
  private dynamicsHeading: Locator;
  private newContact: Locator;
  basicInfoContainer: Locator;
  gender: string;
  genderResults: any;
  genderResultsData: string;
  primarylanguage: Locator;
  primarylanguageLookup: string;
  lookupResults: any;
  IdentificationHeading: string;
  IdentificationContainer: string;
  primaryIdentificationType: string;
  primaryIdentificationOptions: string;
  primaryIdentificationNumber: string;
  primaryAddress: string;
  defaultDeliveryAddress: string;
  defaultTreatmentAddress: string;
  headerContainer: Locator;
  gl4bAddressContainer: Locator;
  clinicalHistoryButton: string;
  generalButton: string;
  contractInformation: string;
  contractInfoContainer: Locator;
  contractInfoContainerDiv: Locator;
  contractServiceLookup: string;
  payerXpath: string;
  serviceAgreeMmentXpath: string;
  referrerXpath: string;
  registrationFormHeading: string;
  patientNameOnRegistrationForm: string;
  hospitalRefNumber: string;
  hospitalRefNumberField: string;
  patientConsent: string;
  paediatricPatient: string;
  clinicalStatus: string;
  primaryIdentificationExpirationDate: string;
  verifyReferralButton: string;
  verifyReferralStatus: string;
  confirmButton: string;
  finishButton: string;

  constructor(page: Page) {
    this.page = page;
    this.dynamicsHeading = page.locator(
      '[aria-label="MazikCare Referral Management"]'
    );
    this.newContact = page.locator('[data-id="header_title"]');
    this.basicInfoContainer = page.locator('[aria-label="BASIC INFORMATION"]');
    this.gender = 'input[aria-label="Gender, Lookup"]';
    this.genderResults = page.waitForSelector('[aria-label="Lookup results"]');
    this.genderResultsData = '[aria-label="Lookup results"] li';
    this.primarylanguage = page.locator(
      '[aria-label="BASIC INFORMATION"] [data-id="mzk_patientlanguage"]'
    );
    this.primarylanguageLookup = 'input[aria-label="Primary Language, Lookup"]';
    this.lookupResults = '[aria-label="Lookup results"] li';
    this.IdentificationHeading =
      '[aria-label="Identification"] [data-id="mzk_patientidentificationtype"]';
    this.IdentificationContainer = '[aria-label="Identification"]';
    this.primaryIdentificationType =
      '[aria-label="Primary Identification Type"]';
    this.primaryIdentificationOptions = "Hospital Reference Number";
    this.primaryIdentificationNumber =
      '[aria-label="Primary Identification Number"]';
    this.primaryAddress = '[aria-label="Home Address (Primary Address)"]';
    this.defaultDeliveryAddress = '[aria-label="Default Delivery Address"]';
    this.defaultTreatmentAddress = '[aria-label="Default Treatment Address"]';
    this.headerContainer = page.locator('[data-id="headerContainer"] h1');
    this.gl4bAddressContainer = page.locator(
      '[aria-label="Home Address (Primary Address)"][data-id="SUMMARY_TAB_section_9"]'
    );
    this.clinicalHistoryButton = '[aria-label="Clinical History"]';
    this.generalButton = '[aria-label="General"]';
    this.contractInformation = '[title="Contract Information(s)"]';
    this.contractInfoContainer = page.locator(
      '[title="Contract Information(s)"]'
    );
    this.contractInfoContainerDiv = page.locator(
      '[data-id="mzk_service-FieldSectionItemContainer"]'
    );
    this.contractServiceLookup = '[aria-label="Service, Lookup"]';
    this.payerXpath =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-84-mzk_payer-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.serviceAgreeMmentXpath =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-88-mzk_contract-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.referrerXpath =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-91-mzk_referringprescriber-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.registrationFormHeading = '[title="Registration Information"]';
    this.patientNameOnRegistrationForm =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-97-parentcontactid-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.hospitalRefNumber =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-99-mzk_hospitalreferencenumber-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.hospitalRefNumberField = '[aria-label="Hospital Reference Number"]';
    this.patientConsent =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-101-mzk_patientconsent-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.paediatricPatient =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-104-mzk_patienttobetreatedaspediatricpatient-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.clinicalStatus =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-109-mzk_nursingstatus-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.primaryIdentificationExpirationDate =
      '//*[@id="id-283e8392-24bb-413c-8553-5e8fa686471f-11-mzk_patientidentificationexpirationdate-FieldSectionItemContainer"]/div[2]/div/div[2]';
    this.verifyReferralButton =
      '[data-id="MscrmControls.Containers.ProcessBreadCrumb-processHeaderStageButton_43ee97f6-5959-46a3-ad48-c16f2f16170b"]';
    this.verifyReferralStatus =
      '//*[@id="MscrmControls.Containers.ProcessStageControl-businessProcessFlowFlyoutFooterContainer"]';
    this.confirmButton =
      '//*[@id="MscrmControls.Containers.ProcessBreadCrumb-processHeaderStage_8acbbd76-6c8b-4b95-99cf-62a570f7e988"]';
    this.finishButton = '[aria-label="Finish"]';
  }

  async goToHomepage() {
    await this.page.goto(
      `/main.aspx?appid=003ada10-09b4-ea11-a812-000d3a7ed588`
    );
    expect(this.dynamicsHeading).toBeVisible();
  }

  async fillBasicInformation(FirstName: string, lastName: string) {
    expect(this.newContact).toContainText("New Contact");
    await this.basicInfoContainer.getByLabel("First Name").fill(FirstName);
    await this.basicInfoContainer.getByLabel("Last Name").fill(lastName);
    await this.basicInfoContainer.locator(this.gender).fill("Male");
    await this.genderResults;
    const genderOption = await this.page.$$(this.genderResultsData);
    await genderOption[0].click(); // Male
    await this.primarylanguage.scrollIntoViewIfNeeded();
    await this.basicInfoContainer
      .locator(this.primarylanguageLookup)
      .fill("en-GB");
    await this.page.waitForSelector(this.lookupResults);
    const langOption = await this.page.$$(this.lookupResults);
    await langOption[0].click();
  }

  async fillIdentificationInfo(primaryIDNumber: any) {
    await this.page
      .locator(this.IdentificationHeading)
      .scrollIntoViewIfNeeded();
    const identificationContainer = this.page.locator(
      this.IdentificationContainer
    );
    const option = identificationContainer.locator(
      this.primaryIdentificationType
    );
    await option.selectOption(this.primaryIdentificationOptions);
    await identificationContainer
      .locator(this.primaryIdentificationNumber)
      .fill(`HAH${primaryIDNumber}`);
  }

  async fillAddressInfo(firstName: string) {
    await this.page.locator(this.primaryAddress).scrollIntoViewIfNeeded();
    const primaryAdd = this.page.locator(this.primaryAddress);
    await this.page.waitForLoadState("domcontentloaded");
    await primaryAdd.getByLabel("Name").fill(firstName);
    await primaryAdd.getByLabel("Address line 1").fill("27B Lechlade Road");
    await primaryAdd.getByLabel("Town").fill("Faringdon");
    await primaryAdd.getByLabel("State/Province").fill("England");
    await primaryAdd.getByLabel("Country Code ISO").fill("GB");
    await this.page.locator('button[aria-label="OK"]').click();
  }

  async setDeliveryAddressAsPrimaryAddress() {
    await this.page
      .locator(this.defaultDeliveryAddress)
      .getByLabel("No")
      .click();
  }

  async setTreatmentAddressAsPrimaryAddress() {
    await this.page
      .locator(this.defaultTreatmentAddress)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.defaultTreatmentAddress)
      .getByLabel("No")
      .click();
  }

  async verifyContactIsCreated(FirstName: string, lastName: string) {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.headerContainer).toHaveText(
      `${FirstName} ${lastName}- Saved`
    );
  }

  async fillAdressInfoForGl4b(firstName: any) {
    await this.gl4bAddressContainer.scrollIntoViewIfNeeded();
    await this.page
      .locator(this.primaryAddress)
      .getByLabel("Name")
      .fill(firstName);
    await this.page.getByRole("textbox", { name: "---" }).click();
    await this.page.getByRole("textbox", { name: "---" }).fill("27B Buscot");
    await this.page.getByRole("textbox", { name: "---" }).press("Enter");
    await this.page.getByLabel("Town").click();
    await this.page.getByLabel("Town").fill("faringdon");
    await this.page.getByLabel("State/Province").click();
    await this.page.getByLabel("State/Province").fill("Oxfordshire");
    await this.page.getByLabel("Country Code ISO").click();
    await this.page.getByLabel("Country Code ISO").fill("GB");
    await this.page.getByLabel("ZIP/Postal Code").click();
    await this.page.getByLabel("ZIP/Postal Code").fill("SN7 8DF");
    await this.page.getByLabel("ZIP/Postal Code").press("Enter");
  }

  async createNewOpportunity() {
    await this.page.locator(this.clinicalHistoryButton).click();
    await this.page.getByLabel("New Opportunity. Add New").click();
    await this.page.locator(this.generalButton).first().click();
  }

  async fillContractInfo() {
    await this.page.waitForSelector(this.contractInformation, {
      state: "visible",
    });
    await this.contractInfoContainer.scrollIntoViewIfNeeded();
    await this.contractInfoContainerDiv
      .locator(this.contractServiceLookup)
      .click();
    await this.contractInfoContainerDiv
      .locator(this.contractServiceLookup)
      .fill("REPATHA");
    await this.page.waitForTimeout(2000);
    await this.page.getByLabel("REPATHA, Repatha").click();
    await this.page.locator(this.payerXpath).click();
    await this.page.getByPlaceholder("Look for Payer").press("Enter");
    await this.page.getByLabel("2gether NHS Foundation Trust, CAN-").click();
    await this.page.locator(this.serviceAgreeMmentXpath).click();
    await this.page
      .getByPlaceholder("Look for Service Agreement")
      .press("Enter");
    await this.page.getByLabel("CON-SA-100821, Pathway test").click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.referrerXpath).click();
    await this.page.locator(this.referrerXpath).press("Enter");
    await this.page.getByLabel("A Bell").click();
  }

  async fillRegistrationInfo(primaryIDNumber: number) {
    await this.page
      .locator(this.registrationFormHeading)
      .scrollIntoViewIfNeeded();
    await expect(
      this.page.locator(this.patientNameOnRegistrationForm)
    ).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.hospitalRefNumber).click();
    await this.page
      .locator(this.hospitalRefNumberField)
      .fill(`HAH${primaryIDNumber}`);
    await this.page
      .getByLabel("Patient Switch Status", { exact: true })
      .selectOption("275380000");
    await this.page.locator(this.patientConsent).click({ force: true });
    await this.page.locator(this.paediatricPatient).click({ force: true });
    await this.page.locator(this.clinicalStatus).click({ force: true });
    await this.page.waitForTimeout(2000);
    await this.page
      .getByLabel("Diagnosis Group, Lookup", { exact: true })
      .click();
    await this.page.getByPlaceholder("Look for Diagnosis Group").press("Enter");
    await this.page.getByLabel("aHUS, aHUS").click();
    await this.page
      .getByLabel("Master Pathway, Lookup", { exact: true })
      .click();
    await this.page.getByPlaceholder("Look for Master Pathway").press("Enter");
    await this.page.getByLabel("Benepali - Delivery and Nurse").click();
    await this.page.getByLabel("PCG Brand, Lookup", { exact: true }).click();
    await this.page.getByPlaceholder("Look for PCG Brand").fill("REPATHA");
    await this.page.getByLabel("REPATHA, Repatha").click({ force: true });
  }

  async fillPatientDetailsMandatoryFields(primaryIDNumberTwo: number) {
    await this.page.getByRole("tab", { name: "Patient Details" }).click();
    await this.page.getByLabel("Identification", { exact: true }).click();
    await this.page
      .getByLabel("Identification", { exact: true })
      .fill(`HAH${primaryIDNumberTwo}`);
    await this.page.locator(this.primaryIdentificationExpirationDate).click();
    await this.page.getByLabel("27, July,").click();
  }

  async verifyReferral() {
    await this.page.locator(this.verifyReferralButton).click();
    await this.page.locator(this.verifyReferralStatus).click();
  }

  async clickOnConfirmButton() {
    await this.page.locator(this.confirmButton).click();
    await this.page.locator(this.finishButton).click();
  }
}
