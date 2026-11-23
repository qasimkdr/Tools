import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("molarity: 250 mL 0.5 M NaCl = 7.305 g; 10 g in 500 mL = 0.3422 M; dilution 50 mL", async ({ page }) => {
  await page.goto("/molarity-calculator/");
  await expect(page.getByTestId("mw")).toHaveText("58.44 g/mol");
  await expect(page.getByTestId("result")).toContainText("7.305 g");
  await page.goto("/molarity-calculator/?mode=molarity&v=500");
  await expect(page.getByTestId("result")).toContainText("0.3422 M");
  await page.goto("/molarity-calculator/?mode=dilute");
  await expect(page.getByTestId("result")).toContainText("50 mL");
  await page.goto("/molarity-calculator/?cmp=Xx");
  await expect(page.getByTestId("result")).toContainText("Unknown element");
});

test("watts to amps: 1500 W @120 V = 12.5 A; 230 V PF .9 = 7.25 A; 3-phase 15 kW = 24.06 A; 10 A → 1200 W", async ({ page }) => {
  await page.goto("/watts-to-amps-calculator/");
  await expect(page.getByTestId("result")).toContainText("12.5 A");
  await page.goto("/watts-to-amps-calculator/?v=230&pf=0.9");
  await expect(page.getByTestId("result")).toContainText("7.25 A");
  await page.goto("/watts-to-amps-calculator/?sys=ac3&p=15&pu=kW&v=400&pf=0.9");
  await expect(page.getByTestId("result")).toContainText("24.06 A");
  await page.goto("/watts-to-amps-calculator/?dir=a2w");
  await expect(page.getByTestId("result")).toContainText("1,200 W");
});

test("time off: 15 days biweekly = 4.615 h/period; balance 68 h = 8.5 days", async ({ page }) => {
  await page.goto("/time-off-calculator/");
  await expect(page.getByTestId("result")).toContainText("4.615 hours");
  await expect(page.getByTestId("future")).toHaveText("68 h");
  await expect(page.getByTestId("future-days")).toHaveText("8.5 days");
  await expect(page.getByTestId("per-hour")).toContainText("17.33");
});

test("decimals: 12.75 × 3.4 = 43.35 (867/20); 1 ÷ 7 repeating; 0.1 + 0.2 = 0.3", async ({ page }) => {
  await page.goto("/decimals-calculator/");
  await expect(page.getByTestId("exact")).toHaveText("43.35");
  await expect(page.getByTestId("frac")).toHaveText("867/20");
  await page.goto("/decimals-calculator/?a=1&b=7&op=div&dp=4");
  await expect(page.getByTestId("exact")).toHaveText("0.142857");
  await expect(page.getByTestId("rounded")).toHaveText("0.1429");
  await page.goto("/decimals-calculator/?a=0.1&b=0.2&op=add");
  await expect(page.getByTestId("exact")).toHaveText("0.3");
});

test("epoxy: 48×24 in at 1/8 in + 10% = 87.8 fl oz, 43.9 each at 1:1", async ({ page }) => {
  await page.goto("/epoxy-resin-calculator/");
  await expect(page.getByTestId("result")).toContainText("87.8 fl oz");
  await expect(page.getByTestId("part-a")).toHaveText("43.9 fl oz");
  await page.goto("/epoxy-resin-calculator/?ratio=2:1&kit=32");
  await expect(page.getByTestId("part-a")).toHaveText("58.5 fl oz");
  await expect(page.getByTestId("kits")).toHaveText("3");
});
