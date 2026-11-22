import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("discount: 25% off $80 = $60; stacked 20%+10% = 28%; reverse and percent modes", async ({ page }) => {
  await page.goto("/discount-calculator/?price=80&off=25");
  await expect(page.getByTestId("result")).toContainText("$60.00");
  await page.goto("/discount-calculator/?price=100&off=20&off2=10");
  const r = page.getByTestId("result");
  await expect(r).toContainText("$72.00");
  await expect(r).toContainText("28%");
  await page.goto("/discount-calculator/?mode=original&sale=45&off=25");
  await expect(page.getByTestId("result")).toContainText("$60.00");
  await page.goto("/discount-calculator/?mode=percent&orig=50&salep=35");
  await expect(page.getByTestId("result")).toContainText("30% off");
});

test("hypotenuse: 3-4-5, missing leg 13/5 → 12, legs 6/8 angles", async ({ page }) => {
  await page.goto("/hypotenuse-calculator/?a=3&b=4");
  await expect(page.getByTestId("result")).toContainText("5");
  await page.goto("/hypotenuse-calculator/?mode=leg&c=13&leg=5");
  await expect(page.getByTestId("result")).toContainText("12");
  await page.goto("/hypotenuse-calculator/?a=6&b=8");
  await expect(page.getByTestId("result")).toContainText("36.87°");
  await page.goto("/hypotenuse-calculator/?mode=leg&c=5&leg=6");
  await expect(page.getByTestId("result")).toContainText("must be longer");
});

test("period: fills form, predicts next period 28 days after LMP", async ({ page }) => {
  await page.goto("/period-calculator/");
  const d = new Date(); d.setDate(d.getDate() - 10);
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  await page.fill("#lmp", iso);
  const next = new Date(d); next.setDate(next.getDate() + 28);
  await expect(page.getByTestId("result")).toContainText(next.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  await expect(page.getByTestId("result")).toContainText("18 days"); // 28 − 10
  expect(page.url()).not.toContain("lmp"); // health data stays out of the URL
});

test("random numbers: unique 1-10 ×10 is a permutation; impossible unique request errors", async ({ page }) => {
  await page.goto("/random-number-generator/?min=1&max=10&count=10&unique=1&sort=asc");
  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.getByTestId("numbers")).toHaveText(/1\s*2\s*3\s*4\s*5\s*6\s*7\s*8\s*9\s*10/);
  await page.goto("/random-number-generator/?min=1&max=10&count=11&unique=1");
  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.getByTestId("result")).toContainText("only 10 whole numbers");
});

test("cubic yards: 12×14 ft × 9 in = 4.67 yd³ exact", async ({ page }) => {
  await page.goto("/cubic-yard-calculator/?waste=0");
  await expect(page.getByTestId("result")).toContainText("4.67 yd³");
  await expect(page.getByTestId("result")).toContainText("126.0 ft³");
  await page.goto("/cubic-yard-calculator/?shape=circle&dia=10&d=4&waste=0");
  await expect(page.getByTestId("result")).toContainText("0.97 yd³");
});
