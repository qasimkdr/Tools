import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("interest: $10,000 at 5% monthly for 10 yr = $16,470.09; simple $5,000; +$100/mo = $31,998.32", async ({ page }) => {
  await page.goto("/interest-calculator/");
  await expect(page.getByTestId("result")).toContainText("$16,470.09");
  await expect(page.getByTestId("simple")).toHaveText("$5,000.00");
  await expect(page.getByTestId("apy")).toHaveText("5.116%");
  await page.goto("/interest-calculator/?pmt=100");
  await expect(page.getByTestId("result")).toContainText("$31,998.32");
  await page.goto("/interest-calculator/?type=simple");
  await expect(page.getByTestId("result")).toContainText("$15,000.00");
});

test("recessed lights: 14×12 ft, 8 ft ceiling → 12 lights, 3 ft 6 in apart", async ({ page }) => {
  await page.goto("/recessed-light-calculator/");
  await expect(page.getByTestId("result")).toContainText("12 lights");
  await expect(page.getByTestId("grid")).toHaveText("4 along the length × 3 along the width");
  await expect(page.getByTestId("gap-l")).toHaveText("3 ft 6 in");
  await expect(page.getByTestId("edge-l")).toHaveText("1 ft 9 in");
});

test("fence post: 6 ft, 4×4, ⅓ rule → 24 in, hole 30 in × 10.5 in, 8 ft post, 2 bags", async ({ page }) => {
  await page.goto("/fence-post-depth-calculator/");
  await expect(page.getByTestId("result")).toContainText("2 ft 0 in");
  await expect(page.getByTestId("hole-depth")).toHaveText("2 ft 6 in");
  await expect(page.getByTestId("hole-dia")).toHaveText("10.5 in");
  await expect(page.getByTestId("buy")).toHaveText("8 ft");
  await expect(page.getByTestId("bags80")).toHaveText("2");
  await page.goto("/fence-post-depth-calculator/?frost=36");
  await expect(page.getByTestId("result")).toContainText("3 ft 0 in");
});

test("pine straw: 30×10 ft at 40 sq ft/bale + 10% = 9 bales", async ({ page }) => {
  await page.goto("/pine-straw-calculator/?price=6");
  await expect(page.getByTestId("result")).toContainText("9 bales");
  await expect(page.getByTestId("exact")).toHaveText("7.50");
  await expect(page.getByTestId("cost")).toHaveText("$54.00");
  await page.goto("/pine-straw-calculator/?shape=circle&rings=3");
  await expect(page.getByTestId("area")).toHaveText("84.8 sq ft");
});

test("lead time: Dec 1, 2026 + 12 business days = Dec 17; order-by Jan 15, 2027 = Dec 29", async ({ page }) => {
  await page.goto("/lead-time-calculator/?date=2026-12-01&demand=20&safety=50");
  await expect(page.getByTestId("result")).toContainText("Thursday, December 17, 2026");
  await expect(page.getByTestId("total")).toHaveText("12 business days");
  await expect(page.getByTestId("rop")).toHaveText("290 units");
  await page.goto("/lead-time-calculator/?dir=orderby&date=2027-01-15");
  await expect(page.getByTestId("result")).toContainText("Tuesday, December 29, 2026");
});
