import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("decking: 12×16, 5.5″ + 1/8″, 16 ft boards → 26 rows, 416 ft, 29 boards, 13 joists, 676 screws; 12×12 → 29 × 12 ft", async ({ page }) => {
  await page.goto("/decking-calculator/");
  await expect(page.getByTestId("rows")).toHaveText("26");
  await expect(page.getByTestId("linear")).toHaveText("416 ft");
  await expect(page.getByTestId("boards")).toHaveText("29 × 16 ft");
  await expect(page.getByTestId("joists")).toHaveText("13 × 12 ft");
  await expect(page.getByTestId("screws")).toHaveText("676");
  await page.goto("/decking-calculator/?l=12&len=12&price=25");
  await expect(page.getByTestId("boards")).toHaveText("29 × 12 ft");
  await expect(page.getByTestId("cost")).toHaveText("$725.00");
});

test("fence: 100 ft privacy, 8 ft spacing, 1×4 ft gate → 14 posts, 36 rails, 220 boards, 8 ft posts; picket", async ({ page }) => {
  await page.goto("/fence-calculator/");
  await expect(page.getByTestId("posts")).toHaveText("14 posts");
  await expect(page.getByTestId("rails")).toHaveText("36");
  await expect(page.getByTestId("pickets")).toHaveText("220");
  await expect(page.getByTestId("post-len")).toHaveText("8 ft");
  await page.goto("/fence-calculator/?style=picket&len=50&gates=0&h=4&rails=2&bw=3.5&gap=2.5&waste=0&bury=1.5");
  await expect(page.getByTestId("posts")).toHaveText("8 posts");
  await expect(page.getByTestId("pickets")).toHaveText("100");
});

test("torque: 100 N·m = 73.7562 ft·lb; 150 ft·lb = 203.373 N·m; 25 N·m = 221.269 in·lb", async ({ page }) => {
  await page.goto("/nm-to-ft-lb/");
  await expect(page.getByTestId("out")).toHaveText("73.7562 ft·lb");
  await page.goto("/nm-to-ft-lb/?v=150&from=ftlb&to=nm");
  await expect(page.getByTestId("out")).toHaveText("203.373 N·m");
  await page.goto("/nm-to-ft-lb/?v=25&to=inlb");
  await expect(page.getByTestId("out")).toHaveText("221.269 in·lb");
  await page.getByRole("button", { name: "Swap units" }).click();
  await expect(page).toHaveURL(/from=inlb/);
});

test("decathlon: world record 9,126 (100 m 963, PV 1,051); heptathlon 7,291; blank events", async ({ page }) => {
  await page.goto("/decathlon-calculator/");
  await expect(page.getByTestId("total")).toHaveText("9,126");
  await expect(page.getByTestId("p-m100")).toHaveText("963");
  await expect(page.getByTestId("p-pv")).toHaveText("1051");
  await expect(page.getByTestId("day1")).toHaveText("4,563");
  await page.goto("/decathlon-calculator/?ev=hep");
  await expect(page.getByTestId("total")).toHaveText("7,291");
  await page.getByRole("button", { name: "Clear all" }).click();
  await page.locator("#e-h100").fill("13.85");
  await expect(page.getByTestId("total")).toHaveText("1,000");
});

test("running record: 99 words, 8 errors, 4 SC, 1:30 → 91.9%, instructional, 1:12, 1:3, 66 WPM, 61 WCPM", async ({ page }) => {
  await page.goto("/running-record-calculator/");
  await expect(page.getByTestId("acc")).toHaveText("91.9%");
  await expect(page.getByTestId("level")).toHaveText("Instructional level");
  await expect(page.getByTestId("er")).toHaveText("1:12");
  await expect(page.getByTestId("scr")).toHaveText("1:3");
  await expect(page.getByTestId("wpm")).toHaveText("66");
  await expect(page.getByTestId("wcpm")).toHaveText("61");
  await page.goto("/running-record-calculator/?words=120&err=3&sc=1&time=");
  await expect(page.getByTestId("level")).toHaveText("Independent level");
  await expect(page.getByTestId("acc")).toHaveText("97.5%");
});

test("fence metric: 30 m, 2.4 m spacing, no gate → 14 posts; toggling units converts the inputs", async ({ page }) => {
  await page.goto("/fence-calculator/?u=m&len=30&sp=2.4&h=1.8&gates=0&bw=14&bury=0.6");
  await expect(page.getByTestId("posts")).toHaveText("14 posts");
  await expect(page.getByTestId("post-len")).toHaveText("2.4 m");
  await page.goto("/fence-calculator/");
  await page.getByRole("button", { name: "Metric (m, cm)" }).click();
  await expect(page.locator("#len")).toHaveValue("30.48");
  await expect(page.getByTestId("posts")).toHaveText("14 posts");
});
