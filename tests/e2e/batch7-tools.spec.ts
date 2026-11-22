import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("cylinder volume: 4 ft × 5 ft tank, horizontal partial fill, pipe", async ({ page }) => {
  await page.goto("/cylinder-volume-calculator/");
  await expect(page.getByTestId("result")).toContainText("62.832 ft³");
  await expect(page.getByTestId("result")).toContainText("470.01");
  await page.goto("/cylinder-volume-calculator/?shape=tank&orient=h&fill=1");
  await expect(page.getByTestId("result")).toContainText("91.89");
  await expect(page.getByTestId("result")).toContainText("19.6%");
  await page.goto("/cylinder-volume-calculator/?shape=hollow&size=6&su=in&inner=5&iu=in&h=10");
  await expect(page.getByTestId("result")).toContainText("0.6 ft³");
});

test("overtime: 48 h at $20 = $1,040; California 12-hour shifts", async ({ page }) => {
  await page.goto("/overtime-calculator/");
  await expect(page.getByTestId("result")).toContainText("$1,040.00");
  await expect(page.getByTestId("premium")).toContainText("$80.00");
  await page.goto("/overtime-calculator/?mode=days&rule=california&d0=12&d1=12&d2=12&d3=0&d4=0&d5=0&d6=0");
  await expect(page.getByTestId("result")).toContainText("$840.00");
  await page.goto("/overtime-calculator/?mode=days&rule=federal&d0=12&d1=12&d2=12&d3=0&d4=0&d5=0&d6=0");
  await expect(page.getByTestId("result")).toContainText("$720.00");
});

test("paycheck: $25/h biweekly single 2026, with overtime", async ({ page }) => {
  await page.goto("/paycheck-calculator/");
  await expect(page.getByTestId("result")).toContainText("$1,690.85");
  await expect(page.getByTestId("breakdown")).toContainText("$156.15");
  await page.goto("/paycheck-calculator/?ot=5");
  await expect(page.getByTestId("result")).toContainText("$1,992.16");
  await expect(page.getByTestId("ot-deduction")).toContainText("$390.00");
  await page.goto("/paycheck-calculator/?k401=100&health=50&state=5");
  await expect(page.getByTestId("result")).toContainText("$1,470.17");
});

test("asphalt: 12 × 50 ft at 3 in = 11.42 tons", async ({ page }) => {
  await page.goto("/asphalt-calculator/");
  await expect(page.getByTestId("result")).toContainText("11.42 tons");
  await expect(page.getByTestId("result")).toContainText("10.36 t");
  await expect(page.getByTestId("result")).toContainText("1256 lb");
});

test("AP Bio: 45 MC + 24 FRQ = est. 4; boundary warning near 3", async ({ page }) => {
  await page.goto("/ap-biology-score-calculator/");
  await expect(page.getByTestId("result")).toContainText("72.8%");
  await expect(page.getByTestId("result")).toContainText("51 multiple-choice");
  await page.goto("/ap-biology-score-calculator/?mc=30&q1=3&q2=3&q3=2&q4=2&q5=1&q6=1");
  await expect(page.getByTestId("result")).toContainText("2 or 3");
});
