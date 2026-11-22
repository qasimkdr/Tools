import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("dog pregnancy: bred Jan 10 2027 → Mar 14; ovulation → Mar 16", async ({ page }) => {
  await page.goto("/dog-pregnancy-calculator/?date=2027-01-10");
  await expect(page.getByTestId("result")).toContainText("Sunday, March 14, 2027");
  await expect(page.getByTestId("result")).toContainText("Mar 9, 2027 – Mar 19, 2027");
  await page.goto("/dog-pregnancy-calculator/?date=2027-01-12&basis=ovulation");
  await expect(page.getByTestId("result")).toContainText("March 16, 2027");
});

test("binary: 156 → 1001 1100 / 9C; -5 two's complement; math; text", async ({ page }) => {
  await page.goto("/binary-calculator/");
  await expect(page.getByTestId("result")).toContainText("1001 1100");
  await expect(page.getByTestId("result")).toContainText("9C");
  await expect(page.getByTestId("steps")).toContainText("128 + 16 + 8 + 4 = 156");
  await expect(page.getByTestId("unsigned")).toHaveText("1001 1100");
  await page.goto("/binary-calculator/?v=-5");
  await expect(page.getByTestId("twos")).toHaveText("1111 1011");
  await page.goto("/binary-calculator/?v=10.625");
  await expect(page.getByTestId("result")).toContainText("1010.101");
  await page.goto("/binary-calculator/?mode=math&a=1101&b=101&op=%C3%97");
  await expect(page.getByTestId("result")).toContainText("1000001");
  await page.goto("/binary-calculator/?mode=text");
  await expect(page.getByTestId("result")).toContainText("01001000 01101001");
});

test("pool salt: 15,000 gal 2500→3200 = 87.6 lb; too salty", async ({ page }) => {
  await page.goto("/pool-salt-calculator/");
  await expect(page.getByTestId("result")).toContainText("87.6 lb");
  await page.goto("/pool-salt-calculator/?cur=0");
  await expect(page.getByTestId("result")).toContainText("400.3 lb");
  await page.goto("/pool-salt-calculator/?gal=20000&cur=4000");
  await expect(page.getByTestId("result")).toContainText("Drain 4,000 gal");
});

test("rafter: 24 ft span 6/12 → 14′ 5 9/16″", async ({ page }) => {
  await page.goto("/rafter-length-calculator/");
  await expect(page.getByTestId("result")).toContainText("14′ 5 9/16″");
  await expect(page.getByTestId("result")).toContainText("13′ 4 3/16″");
  await expect(page.getByTestId("result")).toContainText("26.6°");
});

test("stairs: 105 in rise → 14 risers of 7.5 in", async ({ page }) => {
  await page.goto("/stair-calculator/");
  await expect(page.getByTestId("result")).toContainText("14 risers · 13 treads");
  await expect(page.getByTestId("result")).toContainText("7.5 in");
  await expect(page.getByTestId("result")).toContainText("13′ 11 1/8″");
  await expect(page.getByTestId("checks")).not.toContainText("⚠");
});

test("scientific notation: convert, sig figs, calculate", async ({ page }) => {
  await page.goto("/scientific-notation-calculator/");
  await expect(page.getByTestId("result")).toContainText("4.56 × 10⁻⁴");
  await expect(page.getByTestId("result")).toContainText("456 × 10⁻⁶");
  await page.goto("/scientific-notation-calculator/?x=9.996&sf=3");
  await expect(page.getByTestId("result")).toContainText("1.00 × 10¹");
  await page.goto("/scientific-notation-calculator/?mode=math");
  await expect(page.getByTestId("result")).toContainText("1.44 × 10¹⁰");
  await expect(page.getByTestId("result")).toContainText("1.4 × 10¹⁰");
});
