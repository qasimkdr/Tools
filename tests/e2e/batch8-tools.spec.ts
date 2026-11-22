import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("BMI women: 5'5\" 160 lb = 26.6 overweight; metric; waist warning; teen note", async ({ page }) => {
  await page.goto("/bmi-women-calculator/");
  await expect(page.getByTestId("result")).toContainText("26.6");
  await expect(page.getByTestId("category")).toHaveText("Overweight");
  await expect(page.getByTestId("result")).toContainText("111 lb – 150 lb");
  await expect(page.getByTestId("result")).toContainText("15–25 lb");
  await page.goto("/bmi-women-calculator/?waist=36");
  await expect(page.getByTestId("waist")).toBeVisible();
  await page.goto("/bmi-women-calculator/?u=metric&cm=165&kg=60");
  await expect(page.getByTestId("result")).toContainText("22.0");
  await expect(page.getByTestId("category")).toHaveText("Healthy weight");
  await page.goto("/bmi-women-calculator/?age=16");
  await expect(page.getByTestId("teen")).toBeVisible();
});

test("AP Chem: 40 MC + 25 FRQ = 60.5 → 4, 54 MC for a 5", async ({ page }) => {
  await page.goto("/ap-chemistry-score-calculator/");
  await expect(page.getByTestId("result")).toContainText("60.5 / 100");
  await expect(page.getByTestId("result")).toContainText("54 multiple-choice");
});

test("concrete: 10×10×4in slab, columns, steps", async ({ page }) => {
  await page.goto("/concrete-calculator/");
  await expect(page.getByTestId("result")).toContainText("1.30 yd³");
  await expect(page.getByTestId("result")).toContainText("59");
  await page.goto("/concrete-calculator/?shape=round&qty=4&waste=0");
  await expect(page.getByTestId("result")).toContainText("12.57 ft³");
  await page.goto("/concrete-calculator/?shape=steps&waste=0");
  await expect(page.getByTestId("result")).toContainText("21.39 ft³");
});

test("NPV: $2,381.38, IRR 18.03%, add a year", async ({ page }) => {
  await page.goto("/npv-calculator/");
  await expect(page.getByTestId("result")).toContainText("$2,381.38");
  await expect(page.getByTestId("result")).toContainText("18.03%");
  await expect(page.getByTestId("result")).toContainText("2.96 years");
  await page.getByRole("button", { name: "+ Add year" }).click();
  await expect(page.getByLabel("Year 5")).toHaveValue("3000");
});

test("half birthday: Mar 15 → Sep 15; Aug 31 → Feb 28/29", async ({ page }) => {
  await page.goto("/half-birthday-calculator/");
  await expect(page.getByTestId("every")).toHaveText("every September 15");
  await page.goto("/half-birthday-calculator/?dob=2010-08-31");
  await expect(page.getByTestId("every")).toHaveText("every February 28 (February 29 in leap years)");
});

test("search: typo correction, keyboard navigation, no results", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search-open").click();
  const input = page.getByTestId("search-input");
  await input.fill("mortage");
  await expect(page.getByTestId("search-results").locator("li").first()).toContainText("Mortgage Calculator");
  await expect(page.getByTestId("search-corrected")).toContainText("mortgage");
  await input.fill("overtme pay");
  await expect(page.getByTestId("search-results").locator("li").first()).toContainText("Overtime Calculator");
  await input.fill("xqzv");
  await expect(page.getByTestId("search-empty")).toBeVisible();
  await input.fill("bmi");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/bmi-women-calculator\/$/);
  await page.keyboard.press("Control+k");
  await expect(page.getByTestId("search-input")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("search-input")).toHaveCount(0);
});
