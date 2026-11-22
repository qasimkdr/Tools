import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("body fat: man 70/15/34 in = 17.5%, fitness; woman 31.1%", async ({ page }) => {
  await page.goto("/body-fat-calculator/");
  await expect(page.getByTestId("result")).toContainText("17.5%");
  await expect(page.getByTestId("cat")).toHaveText("Fitness");
  await expect(page.getByTestId("fat")).toHaveText("31.5 lb");
  await expect(page.getByTestId("deur")).toHaveText("22.8%");
  await page.goto("/body-fat-calculator/?sex=f&h=65&neck=13&waist=30&hip=40&wt=140");
  await expect(page.getByTestId("result")).toContainText("31.1%");
  await expect(page.getByTestId("cat")).toHaveText("Average");
});

test("tile: 10×12 ft, 12×12 in, 1/8 in grout, 10% → 130 tiles, 11 boxes", async ({ page }) => {
  await page.goto("/tile-calculator/");
  await expect(page.getByTestId("result")).toContainText("130 tiles");
  await expect(page.getByTestId("boxes")).toHaveText("11 boxes");
  await expect(page.getByTestId("net")).toHaveText("117.5");
  await page.goto("/tile-calculator/?g=0&tl=24&per=16&price=3");
  await expect(page.getByTestId("result")).toContainText("66 tiles");
  await expect(page.getByTestId("cost")).toHaveText("$432.00");
});

test("sourdough: 900 g loaf at 75% → 458 g flour, 331 g water, 102 g starter, 10 g salt", async ({ page }) => {
  await page.goto("/sourdough-calculator/");
  const r = page.getByTestId("recipe");
  await expect(r).toContainText("458 g");
  await expect(r).toContainText("331 g");
  await expect(r).toContainText("102 g");
  await expect(r).toContainText("10 g");
  await page.goto("/sourdough-calculator/?mode=feed&fs=1&ff=2&fw=2&ft=150");
  await expect(page.getByTestId("feed-s")).toHaveText("30 g");
});

test("pay raise: $60,000 + 4% = $62,400; 60k→63k = 5%; real raise 0.97%", async ({ page }) => {
  await page.goto("/pay-raise-calculator/?infl=3");
  await expect(page.getByTestId("result")).toContainText("$62,400.00");
  await expect(page.getByTestId("periods")).toContainText("$92.31");
  await expect(page.getByTestId("real")).toHaveText("0.97%");
  await page.goto("/pay-raise-calculator/?mode=find");
  await expect(page.getByTestId("result")).toContainText("5.00%");
});

test("audiobook: 12 h 30 min at 1.5× = 8 h 20 min, 17 days, 1.25× to finish in 10 h", async ({ page }) => {
  await page.goto("/audiobook-speed-calculator/");
  await expect(page.getByTestId("result")).toContainText("8 h 20 min");
  await expect(page.getByTestId("saved")).toHaveText("4 h 10 min");
  await expect(page.getByTestId("days")).toHaveText("17 days");
  await expect(page.getByTestId("need")).toHaveText("1.25×");
});
