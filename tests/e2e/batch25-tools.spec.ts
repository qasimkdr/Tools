import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("split: $120, 8% tax, 18% tip, 4 people → $37.80 each; itemized $47.25/$28.98/$37.17; rounding", async ({ page }) => {
  await page.goto("/split-calculator/");
  await expect(page.getByTestId("each")).toHaveText("$37.80");
  await expect(page.getByTestId("tip")).toHaveText("$21.60");
  await expect(page.getByTestId("total")).toHaveText("$151.20");
  await page.goto("/split-calculator/?round=5");
  await expect(page.getByTestId("each")).toHaveText("$40.00");
  await expect(page.getByTestId("extra")).toContainText("$8.80");
  await page.goto("/split-calculator/?bill=100&n=3&tax=0&tip=0");
  await expect(page.getByTestId("pays-0")).toHaveText("$33.34");
  await expect(page.getByTestId("pays-2")).toHaveText("$33.33");
  await page.goto("/split-calculator/?mode=items");
  await expect(page.getByTestId("each")).toHaveText("$113.40");
  await expect(page.getByTestId("pays-0")).toHaveText("$47.25");
  await expect(page.getByTestId("pays-1")).toHaveText("$28.98");
  await expect(page.getByTestId("pays-2")).toHaveText("$37.17");
});

test("partial fractions: distinct, repeated, quadratic, improper, Laplace", async ({ page }) => {
  await page.goto("/partial-fraction-calculator/");
  await expect(page.getByTestId("decomposition")).toHaveText("−2/(3(x + 1)) + 11/(3(x − 2))");
  await expect(page.getByTestId("check")).toContainText("✓");
  await page.goto("/partial-fraction-calculator/?n=5x-4&d=(x-1)(x%2B2)%5E2");
  await expect(page.getByTestId("decomposition")).toHaveText("1/(9(x − 1)) − 1/(9(x + 2)) + 14/(3(x + 2)²)");
  await page.goto("/partial-fraction-calculator/?n=2x%5E2%2B3&d=x%5E3%2Bx");
  await expect(page.getByTestId("decomposition")).toHaveText("3/x − x/(x² + 1)");
  await expect(page.getByTestId("factored")).toHaveText("x(x² + 1)");
  await page.goto("/partial-fraction-calculator/?n=x%5E3&d=x%5E2-1");
  await expect(page.getByTestId("decomposition")).toHaveText("x + 1/(2(x − 1)) + 1/(2(x + 1))");
  await page.goto("/partial-fraction-calculator/?n=s%2B3&d=s%5E2%2B3s%2B2");
  await expect(page.getByTestId("decomposition")).toHaveText("2/(s + 1) − 1/(s + 2)");
});

test("implicit differentiation: circle slope −0.75 and tangent; folium dy/dx", async ({ page }) => {
  await page.goto("/implicit-differentiation-calculator/");
  await expect(page.getByTestId("dydx")).toHaveText("−x / y");
  await expect(page.getByTestId("slope")).toHaveText("-0.75");
  await expect(page.getByTestId("second")).toHaveText("-0.390625");
  await expect(page.getByTestId("tangent")).toHaveText("y = −0.75x + 6.25");
  await page.goto("/implicit-differentiation-calculator/?eq=x%5E3%2By%5E3%3D6xy&x=3&y=3");
  await expect(page.getByTestId("dydx")).toHaveText("(2y − x²) / (y² − 2x)");
  await expect(page.getByTestId("slope")).toHaveText("-1");
  await page.goto("/implicit-differentiation-calculator/?x=1&y=1");
  await expect(page.getByTestId("off-curve")).toBeVisible();
});

test("breastfeeding: 30 y, 5'5\", 150 lb, light → 2,172 + 330 = 2,502; lose → 2,002", async ({ page }) => {
  await page.goto("/breastfeeding-calorie-calculator/");
  await expect(page.getByTestId("base")).toHaveText("2,172 kcal");
  await expect(page.getByTestId("extra")).toHaveText("+330 kcal");
  await expect(page.getByTestId("target")).toHaveText("2,502 kcal");
  await page.goto("/breastfeeding-calorie-calculator/?goal=lose");
  await expect(page.getByTestId("target")).toHaveText("2,002 kcal");
  await page.goto("/breastfeeding-calorie-calculator/?stage=7-12&share=0.5");
  await expect(page.getByTestId("extra")).toHaveText("+200 kcal");
  await page.goto("/breastfeeding-calorie-calculator/?goal=lose&lb=105&ft=4&in=11&pal=1.4");
  await expect(page.getByTestId("target")).toHaveText("1,800 kcal");
});

test("macro: 35 y male, 5'10\", 180 lb, light → 2,724 kcal; 170/341/76 g", async ({ page }) => {
  await page.goto("/macro-calculator/");
  await expect(page.getByTestId("kcal")).toHaveText("2,724 kcal");
  await expect(page.getByTestId("g-protein")).toHaveText("170 g");
  await expect(page.getByTestId("g-carbs")).toHaveText("341 g");
  await expect(page.getByTestId("g-fat")).toHaveText("76 g");
  await page.goto("/macro-calculator/?goal=-500&split=protein");
  await expect(page.getByTestId("kcal")).toHaveText("2,224 kcal");
  await expect(page.getByTestId("g-protein")).toHaveText("195 g");
  await page.goto("/macro-calculator/?kcal=2000&split=custom&p=30&c=40&f=30");
  await expect(page.getByTestId("g-protein")).toHaveText("150 g");
  await expect(page.getByTestId("g-fat")).toHaveText("67 g");
});
