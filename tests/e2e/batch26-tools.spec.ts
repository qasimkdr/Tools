import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("tip: 18% of $80 = $14.40; 15% → $12/$92; pre-tax tip; reverse 20%", async ({ page }) => {
  await page.goto("/tip-calculator/");
  await expect(page.getByTestId("tip-amt")).toHaveText("$14.40");
  await expect(page.getByTestId("total")).toHaveText("$94.40");
  await page.goto("/tip-calculator/?tip=15");
  await expect(page.getByTestId("tip-amt")).toHaveText("$12.00");
  await expect(page.getByTestId("total")).toHaveText("$92.00");
  await page.goto("/tip-calculator/?bill=108&tax=8&tip=20");
  await expect(page.getByTestId("tip-amt")).toHaveText("$20.00");
  await page.goto("/tip-calculator/?n=2");
  await expect(page.getByTestId("each")).toHaveText("$47.20");
  await page.goto("/tip-calculator/?mode=reverse&bill=50&paid=60");
  await expect(page.getByTestId("rev-pct")).toHaveText("20.0%");
});

test("BMR: 35 y male 5'10\" 180 lb → Mifflin 1,758; HB 1,837; Katch 1,781 at 20%", async ({ page }) => {
  await page.goto("/bmr-calculator/");
  await expect(page.getByTestId("bmr")).toHaveText("1,758 kcal/day");
  await expect(page.getByTestId("hb")).toHaveText("1,837 kcal");
  await page.goto("/bmr-calculator/?bf=20");
  await expect(page.getByTestId("km")).toHaveText("1,781 kcal");
  await page.goto("/bmr-calculator/?sex=female&age=30&ft=5&in=5&lb=150");
  await expect(page.getByTestId("bmr")).toHaveText("1,401 kcal/day");
});

test("protein: 180 lb exercising → 114–163 g; 29–41 g per meal; RDA 65 g", async ({ page }) => {
  await page.goto("/protein-calculator/");
  await expect(page.getByTestId("protein")).toHaveText("114–163 g");
  await expect(page.getByTestId("per-meal")).toHaveText("29–41 g");
  await page.goto("/protein-calculator/?goal=rda");
  await expect(page.getByTestId("protein")).toHaveText("65 g");
  await page.goto("/protein-calculator/?kcal=2500");
  await expect(page.getByTestId("pct")).toHaveText("18–26%");
});

test("average: numbers mean 18 median 15.5; weighted % 81.67; time 5:56.3", async ({ page }) => {
  await page.goto("/average-calculator/");
  await expect(page.getByTestId("mean")).toHaveText("18");
  await expect(page.getByTestId("median")).toHaveText("15.5");
  await expect(page.getByTestId("mode")).toHaveText("none");
  await page.goto("/average-calculator/?mode=pct");
  await expect(page.getByTestId("weighted")).toHaveText("81.67%");
  await expect(page.getByTestId("simple")).toHaveText("85%");
  await page.goto("/average-calculator/?mode=time");
  await expect(page.getByTestId("avg-time")).toHaveText("5:56.3");
});

test("tire: 225/65R17 = 28.52 in; vs 235/65R17 +1.79%, 61.1 mph; flotation", async ({ page }) => {
  await page.goto("/tire-size-calculator/");
  await expect(page.getByTestId("dia-pct")).toHaveText("+1.79%");
  await expect(page.getByTestId("actual")).toHaveText("you are doing 61.1 mph");
  await expect(page.getByTestId("dia-a")).toContainText("28.52 in");
  await expect(page.getByTestId("verdict")).toContainText("Within");
  await page.goto("/tire-size-calculator/?a=33x12.50R15&b=");
  await expect(page.getByTestId("dia")).toHaveText("33.00 in");
  await page.goto("/tire-size-calculator/?a=225%2F65R17&b=265%2F70R17");
  await expect(page.getByTestId("verdict")).toContainText("More than 3%");
});
