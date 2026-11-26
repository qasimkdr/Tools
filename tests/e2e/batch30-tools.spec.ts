import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("roofing: 40×30, 1 ft overhang, 6/12 gable → 1,503 sq ft, 15.03 squares, 50 bundles; hip ridge+hips 106 ft", async ({ page }) => {
  await page.goto("/roofing-calculator/");
  await expect(page.getByTestId("area")).toHaveText("1,503 sq ft");
  await expect(page.getByTestId("squares")).toHaveText("15.03");
  await expect(page.getByTestId("bundles")).toHaveText("50");
  await expect(page.getByTestId("ridge")).toHaveText("42.0 ft");
  await expect(page.getByTestId("drip")).toHaveText("155.6 ft");
  await page.goto("/roofing-calculator/?type=hip&price=450");
  await expect(page.getByTestId("ridge")).toHaveText("106.0 ft");
  await expect(page.getByTestId("drip")).toHaveText("148.0 ft");
  await expect(page.getByTestId("cost")).toHaveText("$7,438");
});

test("cap rate: $400k, $3,200/mo, 5% vacancy → NOI $23,562, 5.89%, $362,486 at 6.5%; NOI mode", async ({ page }) => {
  await page.goto("/cap-rate-calculator/");
  await expect(page.getByTestId("cap")).toHaveText("5.89%");
  await expect(page.getByTestId("noi")).toHaveText("$23,562");
  await expect(page.getByTestId("expenses")).toHaveText("$12,918");
  await expect(page.getByTestId("target-value")).toHaveText("$362,486");
  await page.goto("/cap-rate-calculator/?mode=quick&value=700000&noi=60000");
  await expect(page.getByTestId("cap")).toHaveText("8.57%");
  await expect(page.getByTestId("target-value")).toHaveText("$923,077");
});

test("horsepower: 300 lb-ft @ 5,000 → 285.6 hp; 400 hp @ 6,000 → 350.1 lb-ft; 100 hp → 101.4 PS; lift 1.364 hp", async ({ page }) => {
  await page.goto("/horsepower-calculator/");
  await expect(page.getByTestId("hp")).toHaveText("285.6 hp");
  await expect(page.getByTestId("kw")).toHaveText("213.0 kW");
  await page.goto("/horsepower-calculator/?find=torque&rpm=6000");
  await expect(page.getByTestId("torque")).toHaveText("350.1");
  await page.goto("/horsepower-calculator/?mode=convert");
  await expect(page.getByTestId("kw")).toHaveText("74.6 kW");
  await expect(page.getByTestId("ps")).toHaveText("101.4 PS");
  await page.goto("/horsepower-calculator/?mode=work");
  await expect(page.getByTestId("hp")).toHaveText("1.364 hp");
});

test("five number summary: textbook 3,6,12,16,21; Tukey/linear Q1 7 Q3 14; outlier 100", async ({ page }) => {
  await page.goto("/five-number-summary-calculator/");
  await expect(page.getByTestId("summary")).toHaveText("3, 6, 12, 16, 21");
  await expect(page.getByTestId("iqr")).toHaveText("10");
  await page.goto("/five-number-summary-calculator/?m=tukey");
  await expect(page.getByTestId("summary")).toHaveText("3, 7, 12, 14, 21");
  await page.goto("/five-number-summary-calculator/?m=linear&data=2,4,6,8,10,12");
  await expect(page.getByTestId("q1")).toHaveText("4.5");
  await expect(page.getByTestId("q3")).toHaveText("9.5");
  await page.goto("/five-number-summary-calculator/?data=1,2,3,4,5,6,7,8,9,10,100");
  await expect(page.getByTestId("outliers")).toContainText("100");
});

test("bowling handicap: 165 avg, 90% of 220 → 49; series 147; team 172; 2,487/15 → 165", async ({ page }) => {
  await page.goto("/bowling-handicap-calculator/");
  await expect(page.getByTestId("hcp")).toHaveText("49 pins");
  await expect(page.getByTestId("series-hcp")).toHaveText("147");
  await expect(page.getByTestId("hdcp-total")).toHaveText("658");
  await expect(page.getByTestId("team-hcp")).toHaveText("172 per game");
  await page.getByRole("button", { name: "80% of 230" }).click();
  await expect(page.getByTestId("hcp")).toHaveText("52 pins");
  await page.goto("/bowling-handicap-calculator/?src=pins");
  await expect(page.getByTestId("avg")).toHaveText("165");
  await page.goto("/bowling-handicap-calculator/?avg=225");
  await expect(page.getByTestId("hcp")).toHaveText("0 pins");
});

test("gap fixes: roofing degrees + nails; cap rate financing; five-number steps", async ({ page }) => {
  await page.goto("/roofing-calculator/?pu=deg&pitch=26.565");
  await expect(page.getByTestId("area")).toHaveText("1,503 sq ft");
  await page.goto("/roofing-calculator/?spb=26&nps=4");
  await expect(page.getByTestId("nails")).toHaveText("5,200");
  await page.goto("/roofing-calculator/?pu=deg&pitch=30");
  await expect(page.getByTestId("factor")).toContainText("6.9/12");
  await page.goto("/cap-rate-calculator/?cash=100000&debt=18000");
  await expect(page.getByTestId("coc")).toHaveText("5.56%");
  await expect(page.getByTestId("dscr")).toHaveText("1.31×");
  await page.goto("/five-number-summary-calculator/");
  await expect(page.getByTestId("steps")).toContainText("Lower half (the median is left out of both halves): 3, 5, 7, 8");
  await expect(page.getByTestId("steps")).toContainText("IQR = 16 − 6 = 10");
  await page.goto("/five-number-summary-calculator/?m=linear&data=2,4,6,8,10,12");
  await expect(page.getByTestId("steps")).toContainText("position (n − 1) × 0.25 + 1 = 2.25, so 4 + 0.25 × (6 − 4)");
});

test("fix-these: roofing metric; cap rate steps", async ({ page }) => {
  await page.goto("/roofing-calculator/?u=m&length=12&width=9&overhang=0.3");
  await expect(page.getByTestId("area")).toHaveText("135.2 m²");
  await page.goto("/roofing-calculator/");
  await page.getByRole("button", { name: "Metric (m)" }).click();
  await expect(page.locator("#length")).toHaveValue("12.19");
  await page.goto("/cap-rate-calculator/");
  await expect(page.getByTestId("steps")).toContainText("NOI = $36,480 − $12,918 = $23,562");
  await expect(page.getByTestId("steps")).toContainText("Cap rate = $23,562 ÷ $400,000 = 5.89%");
});

test("fix-these: roofing step by step", async ({ page }) => {
  await page.goto("/roofing-calculator/");
  await expect(page.getByTestId("steps")).toContainText("Pitch factor = √(1 + (6 ÷ 12)²) = 1.118");
  await expect(page.getByTestId("steps")).toContainText("rounded up to 50");
});
