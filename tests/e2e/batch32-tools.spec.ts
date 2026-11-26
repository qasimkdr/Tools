import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("drywall: 14×12×8 room, ceiling, 1 door, 2 windows → 533 sq ft, 19 sheets; 4×12 → 13; mud 5.1 gal; tape 197 ft", async ({ page }) => {
  await page.goto("/drywall-calculator/");
  await expect(page.getByTestId("net")).toHaveText("533 sq ft");
  await expect(page.getByTestId("sheets")).toHaveText("19 sheets");
  await expect(page.getByTestId("mud")).toContainText("5.1 gal");
  await expect(page.getByTestId("tape")).toContainText("197 ft");
  await page.goto("/drywall-calculator/?sheet=48&price=18");
  await expect(page.getByTestId("sheets")).toHaveText("13 sheets");
  await expect(page.getByTestId("cost")).toHaveText("$234.00");
  await page.goto("/drywall-calculator/?l=10&w=10&win=0");
  await expect(page.getByTestId("sheets")).toHaveText("14 sheets");
});

test("CPM: $500 / 250,000 → $2.00; CTR 0.50%, CPC $0.40; $1,000 at $8 → 125,000; cost of 2M at $5", async ({ page }) => {
  await page.goto("/cpm-calculator/");
  await expect(page.getByTestId("out")).toHaveText("$2.00");
  await expect(page.getByTestId("ctr")).toHaveText("0.50%");
  await expect(page.getByTestId("cpc")).toHaveText("$0.40");
  await page.goto("/cpm-calculator/?find=imp&cost=1000&cpm=8");
  await expect(page.getByTestId("out")).toHaveText("125,000");
  await page.goto("/cpm-calculator/?find=cost&imp=2000000&cpm=5");
  await expect(page.getByTestId("out")).toHaveText("$10,000.00");
});

test("weight loss %: 160 → 145 = 9.38%, 75% to goal, 1.5 lb/week; gain", async ({ page }) => {
  await page.goto("/weight-loss-percentage-calculator/");
  await expect(page.getByTestId("pct")).toHaveText("9.38%");
  await expect(page.getByTestId("to-goal")).toHaveText("5.0 lb");
  await expect(page.getByTestId("progress")).toHaveText("75%");
  await expect(page.getByTestId("per-week")).toHaveText("1.5 lb");
  await expect(page.getByTestId("milestones")).toContainText("152.0 lb");
  await page.goto("/weight-loss-percentage-calculator/?start=150&cur=165&goal=&weeks=");
  await expect(page.getByTestId("lost")).toContainText("Gained 15.0 lb");
  await expect(page.getByTestId("pct")).toHaveText("10.00%");
});

test("timecode: DF rollover, hour of 29.97 DF = 107,892 frames, PAL add, frames → TC, invalid DF code", async ({ page }) => {
  await page.goto("/timecode-calculator/");
  await expect(page.getByTestId("out")).toHaveText("01:00:00;00");
  await expect(page.getByTestId("frames")).toHaveText("107,892");
  await page.goto("/timecode-calculator/?mode=tc&tc=01:00:00;00");
  await expect(page.getByTestId("out")).toHaveText("107,892");
  await expect(page.getByTestId("real")).toHaveText("00:59:59.996");
  await page.goto("/timecode-calculator/?rate=25&a=00:10:00:00&b=00:05:30:12");
  await expect(page.getByTestId("out")).toHaveText("00:15:30:12");
  await page.goto("/timecode-calculator/?mode=frames&rate=60&fr=25015");
  await expect(page.getByTestId("out")).toHaveText("00:06:56:55");
  await page.goto("/timecode-calculator/?a=00:01:00;00");
  await expect(page.getByText("doesn't exist in drop-frame")).toBeVisible();
});

test("watt-hours: 60 W × 8 h = 480 Wh, $2.16/30 days; 5,000 mAh × 3.7 V = 18.5 Wh (FAA ok); 600 Wh / 60 W = 10 h", async ({ page }) => {
  await page.goto("/watt-hour-calculator/");
  await expect(page.getByTestId("out")).toHaveText("480.0 Wh");
  await expect(page.getByTestId("kwh")).toHaveText("0.480 kWh");
  await expect(page.getByTestId("cost-period")).toHaveText("$2.16");
  await page.goto("/watt-hour-calculator/?mode=battery");
  await expect(page.getByTestId("out")).toHaveText("18.5 Wh");
  await expect(page.getByTestId("faa")).toContainText("Up to 100 Wh");
  await page.goto("/watt-hour-calculator/?mode=battery&cap=6500&v=15.4");
  await expect(page.getByTestId("faa")).toContainText("airline approval");
  await page.goto("/watt-hour-calculator/?mode=runtime");
  await expect(page.getByTestId("out")).toHaveText("10 h 0 min");
});
