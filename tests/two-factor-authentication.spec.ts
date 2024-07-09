import { test, expect } from "@playwright/test";

test("2FA", async ({ page }) => {
  await page.goto(
    "https://login.microsoftonline.com/8ca7c99e-246c-49e9-b32b-fb90e6696682/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAAOFBplkuYBHvjkl8HlIEdIaYXKACj4pEAwrmjzQ4Cf-fTBMWjPaXXHsRu8K4Zv0b3AEAAAABAAAACS5yZWRpcmVjdLkBaHR0cHM6Ly9oYWgtY2UtZ2w0Yi1lMmUuY3JtMTEuZHluYW1pY3MuY29tL21haW4uYXNweD9hcHBpZD0wMDNhZGExMC0wOWI0LWVhMTEtYTgxMi0wMDBkM2E3ZWQ1ODgmcGFnZXR5cGU9ZW50aXR5cmVjb3JkJmV0bj1temtfd29ya29yZGVyc3RvY2tjaGVjayZpZD0yZTdmMjNkYy0yYjZjLWVlMTEtOWFlNy0wMDIyNDg0MWY3NTY%26RedirectTo%3DMAAAAOFBplkuYBHvjkl8HlIEdIY47eZGd3RmjTjVj6sEbpI5C35WBnN98C%252fxg54tYZc4KGh0dHBzOi8vaGFoLWNlLWdsNGItZTJlLmNybTExLmR5bmFtaWNzLmNvbS8%253d%26RedirectToForMcas%3Dhttps%253a%252f%252fhah-ce-gl4b-e2e.crm11.dynamics.com%252fmain.aspx%253fappid%253d003ada10-09b4-ea11-a812-000d3a7ed588%2526pagetype%253dentityrecord%2526etn%253dmzk_workorderstockcheck%2526id%253d2e7f23dc-2b6c-ee11-9ae7-00224841f756&response_mode=form_post&nonce=638561195383011022.NDQ3ZTY5MzMtNTJhOS00NjgyLWE5N2YtMmE4NzFmZTM0YjZlOWViN2UzYzEtNzA3OC00NWI0LTk1YjUtMWE2NmM0MGM0YjM2&redirect_uri=https%3A%2F%2Fcwl--gbrcrmlivesg605.crm11.dynamics.com%2F&max_age=86400&x-client-SKU=ID_NET472&x-client-ver=7.5.0.0&sso_reload=true"
  );
  await page.locator('[type="email"]').fill("Ruchika.Kandpal@hah.co.uk");
  await page.locator('[type="submit"]').click();
  expect(page.locator(".logoImage]")).toBeVisible;
  await page.locator('[id="passwordInput"]').fill("Healthcare24");
  await page.locator('[id="submitButton"]').click();
});
