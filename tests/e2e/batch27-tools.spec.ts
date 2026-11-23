import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md). Tax: IRS Rev. Proc. 2025-32. AFT: official AFT Scoring Scales (1 June 2025).
test("income tax: single $85k, $5k 401(k) → taxable $63,900, tax $8,770, 22%; IRS table checkpoints", async ({ page }) => {
  await page.goto("/income-tax-calculator/");
  await expect(page.getByTestId("taxable")).toHaveText("$63,900");
  await expect(page.getByTestId("tax")).toHaveText("$8,770");
  await expect(page.getByTestId("marginal")).toHaveText("22%");
  await expect(page.getByTestId("effective")).toHaveText("10.32%");
  await page.goto("/income-tax-calculator/?st=mfj&gross=800900&pre=0");
  await expect(page.getByTestId("taxable")).toHaveText("$768,700");
  await expect(page.getByTestId("tax")).toHaveText("$206,584");
  await page.goto("/income-tax-calculator/?withheld=9000");
  await expect(page.getByTestId("refund")).toHaveText("$230");
});

test("AFT: 25 y male general 250/40/1:55/2:30/16:00 → 81/83/78/80/87 = 409 pass", async ({ page }) => {
  await page.goto("/army-fitness-test-aft-calculator/");
  await expect(page.getByTestId("pts-MDL")).toHaveText("81");
  await expect(page.getByTestId("pts-2MR")).toHaveText("87");
  await expect(page.getByTestId("total")).toHaveText("409");
  await expect(page.getByTestId("verdict")).toHaveText("Pass");
  await page.goto("/army-fitness-test-aft-calculator/?age=19&mdl=340&run=13:22");
  await expect(page.getByTestId("pts-MDL")).toHaveText("100");
  await expect(page.getByTestId("pts-2MR")).toHaveText("100");
  await page.goto("/army-fitness-test-aft-calculator/?mdl=140");
  await expect(page.getByTestId("verdict")).toHaveText("Does not meet the standard");
});

test("wedding: 100 guests 5 h → 550 drinks, 55 wine, 10 liquor, 5 cases, 16 Champagne", async ({ page }) => {
  await page.goto("/wedding-alcohol-calculator/?toast=1");
  await expect(page.getByTestId("drinks")).toHaveText("550");
  await expect(page.getByTestId("wine")).toHaveText("55");
  await expect(page.getByTestId("liquor")).toHaveText("10");
  await expect(page.getByTestId("beer")).toHaveText("5");
  await expect(page.getByTestId("toast")).toContainText("16 bottles");
  await page.goto("/wedding-alcohol-calculator/?bar=bw");
  await expect(page.getByTestId("wine")).toHaveText("82");
});

test("cement block: 40×6 ft → 284 blocks, 9 courses × 30, 9 bags", async ({ page }) => {
  await page.goto("/cement-block-calculator/");
  await expect(page.getByTestId("blocks")).toHaveText("284");
  await expect(page.getByTestId("courses")).toHaveText("9");
  await expect(page.getByTestId("per-course")).toHaveText("30");
  await expect(page.getByTestId("bags")).toHaveText("9");
  await page.goto("/cement-block-calculator/?waste=0&size=16x4");
  await expect(page.getByTestId("blocks")).toHaveText("540");
});

test("basis points: 25 bps = 0.25%; 4.75→4.25 = −50 bps; 1.5 bps of $65k = $9.75; loan +$49.59", async ({ page }) => {
  await page.goto("/basis-point-calculator/");
  await expect(page.getByTestId("conv")).toHaveText("0.25%");
  await expect(page.getByTestId("as-dec")).toHaveText("0.0025");
  await page.goto("/basis-point-calculator/?mode=change");
  await expect(page.getByTestId("chg")).toHaveText("−50 bps");
  await page.goto("/basis-point-calculator/?mode=amount");
  await expect(page.getByTestId("val")).toHaveText("$9.75");
  await page.goto("/basis-point-calculator/?mode=loan");
  await expect(page.getByTestId("pmt-chg")).toHaveText("+$49.59/mo");
  await expect(page.getByTestId("p1")).toHaveText("$1,896.20");
});
