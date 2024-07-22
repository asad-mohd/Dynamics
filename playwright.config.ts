import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: "./global-setup",
  testDir: "./src/tests",
  // Timeout for each test, includes test, hooks and fixtures:
  timeout: 2 * 60 * 1000,
  // Timeout for each assertion:
  expect: {
    timeout: 60 * 1000,
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  use: {
    trace: "retain-on-failure",
    // storageState: "loginAuth.json",
    video: "retain-on-failure",
    screenshot: {
      mode: "only-on-failure",
      // fullPage: true,
    },
  },

  projects: [
    {
      name: 'CPTest',
      use: {
        baseURL: 'https://hah-ce-ptntapp-test1.crm11.dynamics.com',
        browserName: 'chromium',
      },
    },
    {
      name: 'GL4B',
      use: {
        baseURL: 'https://hah-ce-gl4b-e2e.crm11.dynamics.com',
        browserName: 'chromium',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
