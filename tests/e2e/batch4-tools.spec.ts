import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("gravel: 50×10 ft × 4 in at 1.4 t/yd³ = 8.64 t (9.51 t with 10%)", async ({ page }) => {
  await page.goto("/gravel-and-stone-calculator/");
  await expect(page.getByTestId("result")).toContainText("9.51 tons");
  await page.goto("/gravel-and-stone-calculator/?extra=0");
  await expect(page.getByTestId("result")).toContainText("8.64 tons");
  await expect(page.getByTestId("result")).toContainText("6.17 yd³");
});

test("sand: 12×12 ft × 1 in dry = 0.60 t, 24 bags", async ({ page }) => {
  await page.goto("/sand-calculator/?extra=0");
  const r = page.getByTestId("result");
  await expect(r).toContainText("0.60 tons");
  await expect(r).toContainText("24");
});

test("army WHtR: truncation at the 0.550 limit + legacy tape formula", async ({ page }) => {
  await page.goto("/army-body-fat-calculator/?h=70&w=36");
  await expect(page.getByTestId("result")).toContainText("0.514");
  await expect(page.getByTestId("result")).toContainText("Meets the standard");
  await page.goto("/army-body-fat-calculator/?h=70&w=38.49");
  await expect(page.getByTestId("result")).toContainText("0.549");
  await expect(page.getByTestId("result")).toContainText("Meets the standard");
  await page.goto("/army-body-fat-calculator/?h=70&w=38.5");
  await expect(page.getByTestId("result")).toContainText("Does not meet");
  await page.goto("/army-body-fat-calculator/?sex=m&age=25&lb=210&ab=35");
  await page.getByText("Legacy: 2023 one-site tape test").click();
  await expect(page.getByTestId("legacy")).toContainText("17.5%");
});

test("401k: default projection and unclaimed match warning", async ({ page }) => {
  await page.goto("/401k-calculator/");
  await expect(page.getByTestId("result")).toContainText("$1,084,250");
  await page.goto("/401k-calculator/?c=3");
  await expect(page.getByTestId("result")).toContainText("$900 a year");
});

test("right triangle: legs, hypotenuse+angle, two-angle error", async ({ page }) => {
  await page.goto("/right-triangle-calculator/");
  await expect(page.getByTestId("result")).toContainText("6 · 8 · 10");
  await page.goto("/right-triangle-calculator/?a=&b=&c=10&al=30");
  await expect(page.getByTestId("result")).toContainText("5 · 8.6603 · 10");
  await page.goto("/right-triangle-calculator/?a=&b=&al=30&be=60");
  await expect(page.getByTestId("result")).toContainText("at least one side");
});
