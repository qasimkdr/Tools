import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("rounding: 3.14159 → 3.14; 2.675 → 2.68; banker's 2.5 → 2; sig figs; nearest 0.25", async ({ page }) => {
  await page.goto("/rounding-calculator/");
  await expect(page.getByTestId("rounded")).toHaveText("3.14");
  await expect(page.getByTestId("explain")).toContainText("is 1");
  await page.goto("/rounding-calculator/?x=2.675");
  await expect(page.getByTestId("rounded")).toHaveText("2.68");
  await page.goto("/rounding-calculator/?x=2.5&place=0&mode=half-even");
  await expect(page.getByTestId("rounded")).toHaveText("2");
  await page.goto("/rounding-calculator/?x=1234.5678&place=-2");
  await expect(page.getByTestId("rounded")).toHaveText("1,200");
  await page.goto("/rounding-calculator/?x=0.004567&by=sig&sig=2");
  await expect(page.getByTestId("rounded")).toHaveText("0.0046");
  await page.goto("/rounding-calculator/?x=3.67&by=step&step=0.25");
  await expect(page.getByTestId("rounded")).toHaveText("3.75");
});

test("anniversary: 2015-06-20 → 2026-11-25 = 11 yr 5 mo 5 d, 4,176 days, 12th on Jun 20 2027 in 207 days", async ({ page }) => {
  await page.goto("/anniversary-calculator/?at=2026-11-25");
  await expect(page.getByTestId("span")).toHaveText("11 yr 5 mo 5 d");
  await expect(page.getByTestId("days")).toHaveText("4,176");
  await expect(page.getByTestId("next")).toContainText("12th anniversary");
  await expect(page.getByTestId("next")).toContainText("207 days");
  await page.goto("/anniversary-calculator/?start=2024-06-20&at=2026-11-25");
  await expect(page.getByTestId("gift")).toContainText("Leather");
});

test("VOO: $10k + $500/mo, 20 y, 10% → $424,609; contributed $130,000; 14.89% → $803,942", async ({ page }) => {
  await page.goto("/voo-calculator/");
  await expect(page.getByTestId("final")).toHaveText("$424,609");
  await expect(page.getByTestId("contributed")).toHaveText("$130,000");
  await expect(page.getByTestId("real")).toHaveText("$235,096");
  await expect(page.getByTestId("fees")).toHaveText("$934");
  await expect(page.getByTestId("scenarios")).toContainText("$803,942");
});
