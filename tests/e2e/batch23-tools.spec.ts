import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("markup: $40 cost + 50% = $60, 33.33% margin; 30% margin → $57.14", async ({ page }) => {
  await page.goto("/markup-calculator/?qty=100");
  await expect(page.getByTestId("result")).toContainText("$60.00");
  await expect(page.getByTestId("margin")).toHaveText("33.33%");
  await expect(page.getByTestId("profit-qty")).toHaveText("$2,000.00");
  await page.goto("/markup-calculator/?mode=margin");
  await expect(page.getByTestId("result")).toContainText("$57.14");
  await expect(page.getByTestId("markup")).toHaveText("42.86%");
  await page.goto("/markup-calculator/?mode=price");
  await expect(page.getByTestId("result")).toContainText("50%");
});

test("aspect ratio: 1920×1080 = 16:9; resize 1280 → 720; fit 4000×3000 into 1920×1080", async ({ page }) => {
  await page.goto("/aspect-ratio-calculator/");
  await expect(page.getByTestId("ratio")).toHaveText("16:9");
  await expect(page.getByTestId("nearest")).toHaveText("16:9");
  await page.goto("/aspect-ratio-calculator/?mode=resize");
  await expect(page.getByTestId("resized")).toHaveText("1280 × 720 px");
  await page.goto("/aspect-ratio-calculator/?mode=fit");
  await expect(page.getByTestId("fit")).toHaveText("1440 × 1080 px");
  await expect(page.getByTestId("fill")).toHaveText("1920 × 1440 px");
});

test("goat gestation: Mar 1, 2025 + 150 = Jul 29, 2025; herd sorted", async ({ page }) => {
  await page.goto("/goat-gestation-calculator/?date=2025-03-01");
  await expect(page.getByTestId("due")).toHaveText("Tuesday, July 29, 2025");
  await page.goto("/goat-gestation-calculator/?date=2025-03-01&breed=mini");
  await expect(page.getByTestId("due")).toHaveText("Thursday, July 24, 2025");
  await page.goto("/goat-gestation-calculator/?mode=herd");
  await expect(page.getByTestId("herd")).toContainText("Feb 12, 2027");
  await expect(page.getByTestId("herd")).toContainText("Mar 19, 2027");
});

test("VPD: 25 °C, 60% RH, leaf −2 → 0.91 leaf, 1.27 air, in vegetative range", async ({ page }) => {
  await page.goto("/vpd-calculator/");
  await expect(page.getByTestId("leaf")).toHaveText("0.91 kPa");
  await expect(page.getByTestId("air")).toHaveText("1.27 kPa");
  await expect(page.getByTestId("status")).toContainText("In the vegetative growth range");
  await page.goto("/vpd-calculator/?rh=90");
  await expect(page.getByTestId("status")).toContainText("Too humid");
});

test("gas oil mix: 1 gal 50:1 = 2.56 oz; 5 L = 100 mL; 6.4 oz bottle → 2.5 gal", async ({ page }) => {
  await page.goto("/50-to-1-gas-oil-mix-calculator/");
  await expect(page.getByTestId("oil-out")).toHaveText("2.56 fl oz");
  await expect(page.getByTestId("per-l")).toHaveText("20 mL");
  await page.goto("/50-to-1-gas-oil-mix-calculator/?gas=5&gu=L");
  await expect(page.getByTestId("result")).toContainText("100 mL");
  await page.goto("/50-to-1-gas-oil-mix-calculator/?mode=gas&oil=6.4");
  await expect(page.getByTestId("gas-out")).toHaveText("2.5 gal");
});
