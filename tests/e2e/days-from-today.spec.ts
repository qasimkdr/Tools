import { test, expect } from "@playwright/test";

test("calculator: business days skip weekends + holidays and update URL", async ({ page }) => {
  await page.goto("/days-from-today/?n=10&u=business&start=2026-11-21");
  const result = page.getByTestId("result");
  await expect(result).toContainText("Monday, December 7, 2026"); // skips Thanksgiving (Nov 26)
  await expect(result).toContainText("Thanksgiving Day");
  await page.getByRole("button", { name: "Ago" }).click();
  await expect(page).toHaveURL(/dir=before/);
});

test("calculator: month-end clamping (Jan 31 + 1 month = Feb 28)", async ({ page }) => {
  await page.goto("/days-from-today/?n=1&u=months&start=2027-01-31");
  await expect(page.getByTestId("result")).toContainText("February 28, 2027");
});

test("variant page answers in the intro", async ({ page }) => {
  await page.goto("/days-from-today/90/");
  await expect(page.locator("h1")).toHaveText("What Date Is 90 Days From Today?");
  await expect(page.locator("main p").first()).toContainText("90 days from today is");
});
