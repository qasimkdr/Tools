import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("volume: 10×6×3 ft pond = 180 ft³ ≈ 1,346.494 gal; sphere r4 = 268.0826", async ({ page }) => {
  await page.goto("/volume-calculator/");
  await expect(page.getByTestId("result")).toContainText("180 ft³");
  await expect(page.getByTestId("gal")).toHaveText("1,346.494");
  await page.goto("/volume-calculator/?shape=sphere&u=in");
  await expect(page.getByTestId("result")).toContainText("268.0826 in³");
});

test("productivity: 2,400 units / 160 h = 15/h, +7.14%, 200 h for 3,000", async ({ page }) => {
  await page.goto("/productivity-calculator/");
  await expect(page.getByTestId("result")).toContainText("15 units/hour");
  await expect(page.getByTestId("change")).toHaveText("+7.14%");
  await expect(page.getByTestId("need")).toHaveText("200 h");
});

test("date difference: Jan 1 → Dec 25, 2026 = 358 days, 256 business days, 246 minus holidays", async ({ page }) => {
  await page.goto("/date-difference-calculator/");
  await expect(page.getByTestId("result")).toContainText("11 months, 24 days");
  await expect(page.getByTestId("days")).toHaveText("358");
  await expect(page.getByTestId("weeks")).toHaveText("51 weeks, 1 day");
  await expect(page.getByTestId("biz")).toHaveText("256");
  await expect(page.getByTestId("biz-h")).toHaveText("246");
  await page.goto("/date-difference-calculator/?inc=1");
  await expect(page.getByTestId("days")).toHaveText("359");
});

test("blood pressure: 128/78 elevated, MAP 95; 130/80 stage 1; >180 warning; minors excluded", async ({ page }) => {
  await page.goto("/blood-pressure-by-age-calculator/");
  await expect(page.getByTestId("result")).toContainText("Elevated");
  await expect(page.getByTestId("map")).toHaveText("95 mmHg");
  await page.goto("/blood-pressure-by-age-calculator/?s1=130&d1=80");
  await expect(page.getByTestId("result")).toContainText("Stage 1 hypertension");
  await page.goto("/blood-pressure-by-age-calculator/?s1=190&d1=100");
  await expect(page.getByTestId("severe")).toBeVisible();
  await page.goto("/blood-pressure-by-age-calculator/?s1=125&d1=85&s2=135&d2=75");
  await expect(page.getByTestId("avg")).toContainText("130/80");
  await page.goto("/blood-pressure-by-age-calculator/?age=12");
  await expect(page.getByTestId("result")).toContainText("percentiles");
});

test("Ohm's law: 12 V, 8 Ω → 1.5 A, 18 W; 1,200 W @120 V → 10 A", async ({ page }) => {
  await page.goto("/ohms-law-calculator/");
  await expect(page.getByTestId("q-I")).toHaveText("1.5 A");
  await expect(page.getByTestId("q-P")).toHaveText("18 W");
  await page.goto("/ohms-law-calculator/?pair=PV&x=1200&y=120");
  await expect(page.getByTestId("q-I")).toHaveText("10 A");
  await expect(page.getByTestId("q-R")).toHaveText("12 Ω");
  await page.goto("/ohms-law-calculator/?pair=VI&x=3&y=0.02");
  await expect(page.getByTestId("q-R")).toHaveText("150 Ω");
  await expect(page.getByTestId("q-P")).toHaveText("60 mW");
});
