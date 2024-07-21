import { Page, Locator, expect } from "@playwright/test";
import { CommandBar } from "../pageObjects/commandBar";

export class Navigation {
  page: Page;
  private patientTab: Locator;
  private patientTabHeading: Locator;
  CopilotCloseButton: string;

  constructor(page: Page) {
    this.page = page;
    this.patientTab = page.locator('[aria-label="Patients"]');
    const header = new CommandBar(page);
    this.patientTabHeading = page.locator(
      '[data-automationid="splitbuttonprimary"] span span',
      { hasText: "Patients" }
    );
    this.CopilotCloseButton =
      '[aria-label="Copilot"][aria-controls="Microsoft.Copilot.Pane"]';
  }

  async clickOnPatientTab() {
    await this.patientTab.click();
    expect(this.patientTabHeading).toHaveText("Patients");
    expect(this.patientTabHeading).toBeVisible();
  }

  async closeCopilotUI() {
    await this.page.waitForSelector(this.CopilotCloseButton, {
      state: "visible",
    });
    await this.page.locator(this.CopilotCloseButton).click();
  }
}
