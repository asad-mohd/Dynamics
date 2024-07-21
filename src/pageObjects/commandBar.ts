import { Page, Locator, expect } from "@playwright/test";

export class CommandBar {
  page: Page;
  private newButton: Locator;
  saveButton: string;
  contact: string;
  deleteButton: string;
  confirmDeleteButton: string;
  selectAllButton: string;
  editButton: string;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.locator('button[aria-label="New"]');
    this.saveButton = 'button[aria-label="Save (CTRL+S)"]';
    this.contact = 'button[aria-label="More commands for Contact"]';
    this.deleteButton =
      '[id="OverflowButton_button5_flyout"] li button[aria-label="Delete"]';
    this.confirmDeleteButton =
      '[data-id="confirmdialog"] button[aria-label="Delete"]';
    this.selectAllButton = '[title="Select All"]';
    this.editButton = '[title="Edit"]';
  }

  async clickOnNewButton() {
    await this.newButton.click();
  }

  async clickOnSaveButton() {
    await this.page.locator(this.saveButton).click();
  }

  async clickOnSaveButtonforGl4b(){
    await this.page.getByLabel("Save this Opportunity.").click();
  }

  async clickOnDeleteButton() {
    await this.page.locator(this.contact).click();
    await this.page.locator(this.deleteButton).click();
    await this.page.locator(this.confirmDeleteButton).click();
    // wait for 5 sec to delete account successful
    await this.page.waitForTimeout(5000);
  }

  async searchPatient(firstName: string, lastName: string) {
    await this.page.getByText("Full Name").click();
    await this.page.getByLabel("Filter by").click();
    await this.page.getByLabel("Filter by value").click();
    await this.page
      .getByLabel("Filter by value")
      .fill(`${firstName} ${lastName}`);
    await this.page.getByRole("button", { name: "Apply" }).click();
  }

  async ClickOnSelectAllButton() {
    await this.page.locator(this.selectAllButton).click();
  }

  async clickOnEditButton() {
    await this.page.locator(this.editButton).click();
  }
}
