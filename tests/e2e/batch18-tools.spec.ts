import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("CD: $10,000 at 4.25% APY for 18 months = $10,644.23", async ({ page }) => {
  await page.goto("/cd-calculator/?tax=24");
  await expect(page.getByTestId("result")).toContainText("$10,644.23");
  await expect(page.getByTestId("interest")).toHaveText("$644.23");
  await expect(page.getByTestId("penalty")).toHaveText("$104.60");
  await page.goto("/cd-calculator/?r=4.5&rt=apr&c=monthly&n=12");
  await expect(page.getByTestId("apy")).toHaveText("4.594%");
});

test("area: rectangle 12×10 = 120 ft²; cylinder r5 h6 = 345.575; heron 6-8-10 = 24", async ({ page }) => {
  await page.goto("/area-calculator/");
  await expect(page.getByTestId("result")).toContainText("120 ft²");
  await page.goto("/area-calculator/?dim=3&shape=cylinder&u=");
  await expect(page.getByTestId("result")).toContainText("345.57519");
  await page.goto("/area-calculator/?shape=heron&u=cm");
  await expect(page.getByTestId("result")).toContainText("24 cm²");
});

test("grade curve: flat +12 → avg 83%; sqrt avg 84.1%", async ({ page }) => {
  await page.goto("/grade-curve-calculator/");
  await expect(page.getByTestId("result")).toContainText("83%");
  await expect(page.getByTestId("old-mean")).toHaveText("71%");
  await expect(page.getByTestId("after")).toHaveText("3 · 4 · 2 · 1 · 0");
  await page.goto("/grade-curve-calculator/?m=sqrt");
  await expect(page.getByTestId("result")).toContainText("84.1%");
});

test("BTU: 15×18 ft = 7,000; sunny + 3 people = 8,300 BTU/h", async ({ page }) => {
  await page.goto("/btu-calculator/");
  await expect(page.getByTestId("result")).toContainText("7,000 BTU/h");
  await page.goto("/btu-calculator/?sun=sunny&ppl=3");
  await expect(page.getByTestId("result")).toContainText("8,300 BTU/h");
  await page.goto("/btu-calculator/?l=20&w=20&kitchen=1");
  await expect(page.getByTestId("base")).toHaveText("10,000 BTU/h");
  await expect(page.getByTestId("result")).toContainText("14,000 BTU/h");
});

test("arrow speed: 340 IBO, 28 in, 60 lb, 400 gr → 287 fps, 73.0 ft·lb", async ({ page }) => {
  await page.goto("/arrow-speed-calculator/");
  await expect(page.getByTestId("result")).toContainText("287 fps");
  await expect(page.getByTestId("ke")).toHaveText("73.0 ft·lb");
  await page.goto("/arrow-speed-calculator/?aw=250");
  await expect(page.getByTestId("warn")).toBeVisible();
});
