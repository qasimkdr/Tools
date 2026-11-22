import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("minecraft circle: 21 thin = 56 blocks, filled = 349, oval 31×17 = 68", async ({ page }) => {
  await page.goto("/minecraft-circle/");
  await expect(page.getByTestId("result")).toContainText("56");
  await expect(page.getByTestId("chart").locator("canvas")).toBeVisible();
  await page.getByText("Row-by-row build guide").click();
  await expect(page.getByTestId("rows")).toContainText("Row 1: 8–14 (7)");
  await page.goto("/minecraft-circle/?style=filled");
  await expect(page.getByTestId("result")).toContainText("349");
  await page.goto("/minecraft-circle/?shape=oval");
  await expect(page.getByTestId("result")).toContainText("68");
});

test("density altitude: 5,000 ft, 90°F, 30.00, dew 50°F → 8,100 ft", async ({ page }) => {
  await page.goto("/density-altitude-calculator/");
  await expect(page.getByTestId("result")).toContainText("8,100 ft");
  await expect(page.getByTestId("pa")).toHaveText("4,920 ft");
  await expect(page.getByTestId("rule")).toHaveText("8,167 ft");
  await page.goto("/density-altitude-calculator/?dew=");
  await expect(page.getByTestId("result")).toContainText("8,000 ft");
});

test("height: boy 10, 55 in, 75 lb, parents 5'4\" & 5'10\" → 5 ft 10.2 in", async ({ page }) => {
  await page.goto("/height-calculator/");
  await expect(page.getByTestId("result")).toContainText("5 ft 10.2 in");
  await expect(page.getByTestId("mph")).toHaveText("5 ft 9.6 in");
  await page.goto("/height-calculator/?age=2");
  await expect(page.getByTestId("result")).toContainText("Mid-parental target height");
});

test("weighted mean: 90/80/70 weighted 20/30/50 = 77", async ({ page }) => {
  await page.goto("/weighted-mean-calculator/");
  await expect(page.getByTestId("result")).toContainText("77");
  await expect(page.getByTestId("plain")).toHaveText("80");
  await expect(page.getByTestId("wsd")).toHaveText("7.8102");
  await page.goto("/weighted-mean-calculator/?x=1,2&w=1");
  await expect(page.getByTestId("result")).toContainText("same length");
});

test("standard deviation: 2,4,4,4,5,5,7,9 → s 2.1381, σ 2", async ({ page }) => {
  await page.goto("/standard-deviation-calculator/");
  await expect(page.getByTestId("result")).toContainText("2.1381");
  await expect(page.getByTestId("other-sd")).toHaveText("2");
  await expect(page.getByTestId("ci")).toHaveText("3.2125 to 6.7875");
  await page.goto("/standard-deviation-calculator/?type=population");
  await expect(page.getByTestId("other-sd")).toHaveText("2.1381");
});
