import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("grade: 82% current, 25% final, 85% target → 94%; weighted 87.19% B+", async ({ page }) => {
  await page.goto("/grade-calculator/");
  await expect(page.getByTestId("result")).toContainText("94%");
  await expect(page.getByTestId("result")).toContainText("Not possible");
  await expect(page.getByTestId("whatif")).toContainText("86.5%");
  await page.goto("/grade-calculator/?mode=weighted");
  await expect(page.getByTestId("result")).toContainText("87.19% · B+");
});

test("MAGI: Roth single $160,500 → $3,750; ACA add-backs", async ({ page }) => {
  await page.goto("/modified-adjusted-gross-income-calculator/");
  await expect(page.getByTestId("result")).toContainText("$160,500");
  await expect(page.getByTestId("result")).toContainText("$3,750");
  await page.goto("/modified-adjusted-gross-income-calculator/?st=joint&agi=245000&sli=0");
  await expect(page.getByTestId("result")).toContainText("$5,250");
  await page.goto("/modified-adjusted-gross-income-calculator/?p=aca&agi=40000&ss=12000&exempt=500");
  await expect(page.getByTestId("result")).toContainText("$52,500");
});

test("money market: $10k + $200/mo at 4% APY for 5 yrs", async ({ page }) => {
  await page.goto("/money-market-calculator/");
  await expect(page.getByTestId("result")).toContainText("$25,402.33");
  await expect(page.getByTestId("result")).toContainText("$3,402.33");
  await page.goto("/money-market-calculator/?add=0&yrs=1");
  await expect(page.getByTestId("result")).toContainText("$10,400.00");
});

test("confidence interval: t mean, z mean, proportion + Wilson", async ({ page }) => {
  await page.goto("/confidence-interval-calculator/");
  await expect(page.getByTestId("result")).toContainText("45.8722 to 54.1278");
  await expect(page.getByTestId("result")).toContainText("2.0639");
  await page.goto("/confidence-interval-calculator/?sig=z");
  await expect(page.getByTestId("result")).toContainText("46.0801 to 53.9199");
  await page.goto("/confidence-interval-calculator/?type=prop&x=3&pn=20");
  await expect(page.getByTestId("result")).toContainText("0.0524 to 0.3604");
});

test("superscript: styles, smart mode, missing characters", async ({ page }) => {
  await page.goto("/superscript-generator/?t=abc123");
  await expect(page.getByTestId("output")).toHaveText("ᵃᵇᶜ¹²³");
  await page.goto("/superscript-generator/?mode=smart&t=x%5E2%20%2B%20H2O");
  await expect(page.getByTestId("output")).toHaveText("x² + H₂O");
  await page.goto("/superscript-generator/?t=quiz");
  await expect(page.getByTestId("missing")).toContainText("q");
  await page.goto("/superscript-generator/?mode=small&t=Small");
  await expect(page.getByTestId("output")).toHaveText("ꜱᴍᴀʟʟ");
});
