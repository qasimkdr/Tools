import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("ERA: 45 ER in 162.1 IP = 2.49; softball; invalid innings", async ({ page }) => {
  await page.goto("/earned-run-average-calculator/");
  await expect(page.getByTestId("result")).toContainText("2.49");
  await expect(page.getByTestId("result")).toContainText("1.05");
  await page.goto("/earned-run-average-calculator/?er=2&ip=5&g=7");
  await expect(page.getByTestId("result")).toContainText("2.80");
  await expect(page.getByTestId("result")).toContainText("3.60");
  await page.goto("/earned-run-average-calculator/?ip=6.5");
  await expect(page.getByTestId("result")).toContainText("decimal counts outs");
});

test("AP Stats: 30 MC + 24 FRQ = 65.7 → 4 or 5", async ({ page }) => {
  await page.goto("/ap-statistics-score-calculator/");
  await expect(page.getByTestId("result")).toContainText("65.7 / 100");
  await expect(page.getByTestId("result")).toContainText("4 or 5");
  await page.goto("/ap-statistics-score-calculator/?mc=35&q1=8&q2=8&q3=8&q4=8");
  await expect(page.getByTestId("result")).toContainText("81.7 / 100");
});

test("GCF: 48,180,300 = 12; Euclid 1071,462 = 21; coprime", async ({ page }) => {
  await page.goto("/gcf-calculator/");
  await expect(page.getByTestId("result")).toContainText("12");
  await expect(page.getByTestId("common")).toHaveText("1, 2, 3, 4, 6, 12");
  await expect(page.getByTestId("primes")).toContainText("180 = 2² × 3² × 5");
  await page.goto("/gcf-calculator/?n=1071,462");
  await expect(page.getByTestId("euclid")).toContainText("147 = 7 × 21 + 0");
  await page.goto("/gcf-calculator/?n=17,31");
  await expect(page.getByTestId("result")).toContainText("relatively prime");
});

test("APR: $20k 7% 5y $800 financed = 8.659%; upfront 8.727%", async ({ page }) => {
  await page.goto("/apr-calculator/");
  await expect(page.getByTestId("result")).toContainText("8.659%");
  await expect(page.getByTestId("result")).toContainText("$411.86");
  await page.goto("/apr-calculator/?how=up");
  await expect(page.getByTestId("result")).toContainText("8.727%");
  await page.goto("/apr-calculator/?amt=300000&rate=6.5&term=30&fees=7500&how=up");
  await expect(page.getByTestId("result")).toContainText("6.745%");
});

test("wire: 20 A 120 V 100 ft → 8 AWG; 30 A 240 V 50 ft → 10 AWG; continuous", async ({ page }) => {
  await page.goto("/wire-size-calculator/");
  await expect(page.getByTestId("result")).toContainText("8 AWG");
  await expect(page.getByTestId("result")).toContainText("2.55%");
  await page.goto("/wire-size-calculator/?amps=30&volts=240&len=50");
  await expect(page.getByTestId("result")).toContainText("10 AWG");
  await page.goto("/wire-size-calculator/?amps=16&len=25&cont=1");
  await expect(page.getByTestId("result")).toContainText("12 AWG");
});
