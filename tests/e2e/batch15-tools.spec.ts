import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("horse gestation: May 1, 2026 + 340 days = Apr 6, 2027", async ({ page }) => {
  await page.goto("/horse-gestation-calculator/?date=2026-05-01");
  await expect(page.getByTestId("result")).toContainText("April 6, 2027");
  await expect(page.getByTestId("timeline")).toBeVisible();
});

test("linear feet: 200 sq ft at 5.5 in = 436.36 LF; pieces 53 LF; perimeter 49 LF", async ({ page }) => {
  await page.goto("/linear-feet-calculator/");
  await expect(page.getByTestId("result")).toContainText("480");
  await expect(page.getByTestId("steps")).toContainText("0.4583 ft");
  await expect(page.getByTestId("result")).toContainText("436.36");
  await page.goto("/linear-feet-calculator/?mode=pieces&waste=0");
  await expect(page.getByTestId("result")).toContainText("53");
  await page.goto("/linear-feet-calculator/?mode=perimeter&waste=0");
  await expect(page.getByTestId("result")).toContainText("49");
});

test("pro rata: $1,500 rent moving in Feb 20, 2027 = $482.14", async ({ page }) => {
  await page.goto("/pro-rata-calculator/");
  await expect(page.getByTestId("result")).toContainText("$482.14");
  await expect(page.getByTestId("methods")).toContainText("$443.84");
  await expect(page.getByTestId("methods")).toContainText("$450.00");
  await page.goto("/pro-rata-calculator/?mode=general");
  await expect(page.getByTestId("result")).toContainText("$805.48");
  await page.goto("/pro-rata-calculator/?mode=salary");
  await expect(page.getByTestId("result")).toContainText("$18,000");
});

test("water: man 3.0 L from drinks; + sweat 1.06 L", async ({ page }) => {
  await page.goto("/water-intake-calculator/");
  await expect(page.getByTestId("result")).toContainText("3.0 L");
  await expect(page.getByTestId("result")).toContainText("12.7 cups");
  await page.goto("/water-intake-calculator/?who=woman");
  await expect(page.getByTestId("result")).toContainText("2.2 L");
  await page.goto("/water-intake-calculator/?before=180&after=178.7&drank=16");
  await expect(page.getByTestId("sweat")).toHaveText("1.06 L");
  await expect(page.getByTestId("result")).toContainText("4.1 L");
});

test("steps: 10,000 steps at 5'9\" male = 4.52 mi; 1 mi = 2,213 steps", async ({ page }) => {
  await page.goto("/steps-to-miles-calculator/");
  await expect(page.getByTestId("result")).toContainText("4.52 mi");
  await expect(page.getByTestId("result")).toContainText("7.27 km");
  await expect(page.getByTestId("per-mile")).toHaveText("2,213");
  await page.goto("/steps-to-miles-calculator/?dir=dist&dist=1");
  await expect(page.getByTestId("result")).toContainText("2,213");
});
