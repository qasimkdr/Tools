import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("seller financing: $250k, 10% down, 7%, 30-yr amort, 5-yr balloon", async ({ page }) => {
  await page.goto("/seller-financing-calculator/");
  await expect(page.getByTestId("result")).toContainText("$1,496.93");
  await expect(page.getByTestId("balloon")).toHaveText("$211,796.08");
  await expect(page.getByTestId("interest")).toHaveText("$76,611.91");
});

test("retirement savings: $500k, $3,000/mo, 5%, 3% → 16 yrs 6 mo; 30-yr withdrawal $1,858.69", async ({ page }) => {
  await page.goto("/how-long-will-retirement-savings-last-calculator/");
  await expect(page.getByTestId("result")).toContainText("16 years, 6 months");
  await expect(page.getByTestId("safe")).toHaveText("$1,858.69");
  await page.goto("/how-long-will-retirement-savings-last-calculator/?bal=300000&w=2500&ret=0&inf=0");
  await expect(page.getByTestId("result")).toContainText("10 years, 0 months");
});

test("quarter mile: 3,500 lb, 400 hp → 12.00 s, 113.6 mph; hp from trap speed", async ({ page }) => {
  await page.goto("/quarter-mile-calculator/");
  await expect(page.getByTestId("result")).toContainText("12.00 s");
  await expect(page.getByTestId("mph")).toHaveText("113.6 mph");
  await page.goto("/quarter-mile-calculator/?mode=hp&mph=113.56&et=12");
  await expect(page.getByTestId("hp-mph")).toHaveText("400 hp");
});

test("firewood: 16×4 ft, 16 in logs → 0.667 cords, 2 face cords; $120 face = $360/cord", async ({ page }) => {
  await page.goto("/firewood-calculator/?fprice=120&price=300");
  await expect(page.getByTestId("result")).toContainText("0.667 cords");
  await expect(page.getByTestId("faces")).toHaveText("2");
  await expect(page.getByTestId("equiv")).toHaveText("$360.00 per cord");
  await expect(page.getByTestId("value")).toHaveText("$200.00");
});

test("nether portal: Overworld 1250, -340 → Nether 156, -43; back ×8", async ({ page }) => {
  await page.goto("/nether-portal-calculator/");
  await expect(page.getByTestId("coords")).toHaveText("X 156, Z -43");
  await page.goto("/nether-portal-calculator/?dir=n2o&x=200&z=75");
  await expect(page.getByTestId("coords")).toHaveText("X 1600, Z 600");
  await page.goto("/nether-portal-calculator/?x=-100&z=0");
  await expect(page.getByTestId("coords")).toHaveText("X -13, Z 0");
});
