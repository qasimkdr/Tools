import { test, expect } from "@playwright/test";

// Hand-verified values (see research/<slug> briefs). Inputs are set via the shareable query string.
test("payment: $20,000, 6%, 5 years → $386.66/month; extra $100 saves ~$755", async ({ page }) => {
  await page.goto("/payment-calculator/?amount=20000&rate=6&years=5");
  const r = page.getByTestId("result");
  await expect(r).toContainText("$386.66");
  await expect(r).toContainText("$3,199.36"); // total interest
  await page.goto("/payment-calculator/?amount=20000&rate=6&years=5&extra=100");
  await expect(page.getByTestId("result")).toContainText("$754.98");
  await expect(page.getByTestId("result")).toContainText("13 payments early");
});

test("payment: payoff time mode and impossible payment warning", async ({ page }) => {
  await page.goto("/payment-calculator/?mode=term&amount=10000&rate=12&pay=300");
  await expect(page.getByTestId("result")).toContainText("41"); // payments
  await page.goto("/payment-calculator/?mode=term&amount=10000&rate=12&pay=50");
  await expect(page.getByTestId("result")).toContainText("never go down");
});

test("interest rate: loan 20000 / 386.66 / 60 → 6.000%; savings 10k→12k in 3y → 6.093%", async ({ page }) => {
  await page.goto("/interest-rate-calculator/?amount=20000&pay=386.66&months=60");
  await expect(page.getByTestId("result")).toContainText("6%");
  await page.goto("/interest-rate-calculator/?amount=25000&pay=500&months=60");
  await expect(page.getByTestId("result")).toContainText("7.42");
  await page.goto("/interest-rate-calculator/?mode=savings&start=10000&end=12000&years=3&comp=12");
  await expect(page.getByTestId("result")).toContainText("6.093%");
});

test("proportion: 3/4 = x/8 → 6; inverse 4×6 = 8×x → 3; check mode", async ({ page }) => {
  await page.goto("/proportion-calculator/?a=3&b=4&c=&d=8");
  await expect(page.getByTestId("result")).toContainText("C = 6");
  await page.goto("/proportion-calculator/?a=4&b=6&c=8&d=&type=inverse");
  await expect(page.getByTestId("result")).toContainText("D = 3");
  await page.goto("/proportion-calculator/?a=3&b=4&c=6&d=8");
  await expect(page.getByTestId("result")).toContainText("Yes");
});

test("ratio: simplify, split, solve", async ({ page }) => {
  await page.goto("/ratio-calculator/?terms=1920:1080");
  await expect(page.getByTestId("result")).toContainText("16 : 9");
  await page.goto("/ratio-calculator/?mode=split&terms=2:3&total=100");
  await expect(page.getByTestId("result")).toContainText("40 / 60");
  await page.goto("/ratio-calculator/?mode=solve&a=3&b=4&c=9&d=");
  await expect(page.getByTestId("result")).toContainText("12");
});

test("age: exact years/months/days, Feb 29 convention", async ({ page }) => {
  await page.goto("/age-calculator/?dob=1990-05-15&at=2026-11-21");
  const r = page.getByTestId("result");
  await expect(r).toContainText("36 years, 6 months, 6 days");
  await expect(r).toContainText("13,339");
  await page.goto("/age-calculator/?dob=2000-02-29&at=2027-02-28");
  await expect(page.getByTestId("result")).toContainText("27 years, 0 months, 0 days");
});
