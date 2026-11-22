import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("soffit: 120 ft × 16 in = 160 sq ft, 15 panels, 360 sq in intake", async ({ page }) => {
  await page.goto("/soffit-calculator/");
  await expect(page.getByTestId("result")).toContainText("15 panels");
  await expect(page.getByTestId("result")).toContainText("160.0 sq ft");
  await expect(page.getByTestId("intake")).toHaveText("360 sq in");
  await page.goto("/soffit-calculator/?rule=150");
  await expect(page.getByTestId("intake")).toHaveText("720 sq in");
});

test("AP Lang: 32 MC + 11 essay points = 65.6 → 4", async ({ page }) => {
  await page.goto("/ap-english-language-score-calculator/");
  await expect(page.getByTestId("result")).toContainText("65.6 / 100");
  await expect(page.getByTestId("result")).toContainText("Estimated AP score4");
  await page.goto("/ap-english-language-score-calculator/?mc=38&e1=5&e2=5&e3=4");
  await expect(page.getByTestId("result")).toContainText("80.8 / 100");
});

test("money counter: $250.03 total, over by 3 cents", async ({ page }) => {
  await page.goto("/money-counter/?exp=250");
  await expect(page.getByTestId("result")).toContainText("$250.03");
  await expect(page.getByTestId("result")).toContainText("$242.00");
  await expect(page.getByTestId("diff")).toHaveText("$0.03");
});

test("FFMI: 5'10\" 180 lb 15% → 22.1 normalized", async ({ page }) => {
  await page.goto("/ffmi-calculator/");
  await expect(page.getByTestId("result")).toContainText("22.1");
  await expect(page.getByTestId("result")).toContainText("153.0 lb");
});

test("dunk: 6'0\" needs 30.2 in; with 26 in vertical can touch rim", async ({ page }) => {
  await page.goto("/dunk-calculator/");
  await expect(page.getByTestId("result")).toContainText("30.2 in");
  await expect(page.getByTestId("result")).toContainText("24.2 in");
  await expect(page.getByTestId("verdict")).toContainText("You can touch the rim");
});
