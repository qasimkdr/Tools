import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("board feet: 4×(2×6×8) + 6×(4/4×6×10) = 62, +10% = 68.2", async ({ page }) => {
  await page.goto("/board-foot-calculator/");
  await expect(page.getByTestId("result")).toContainText("68.20 bd ft");
  await expect(page.getByTestId("result")).toContainText("62.00 bd ft");
  await page.goto("/board-foot-calculator/?rows=1:8/4:8:6&waste=0");
  await expect(page.getByTestId("result")).toContainText("8.00 bd ft");
});

test("studs: 20 ft at 16 in OC → 27 to buy", async ({ page }) => {
  await page.goto("/stud-calculator/");
  await expect(page.getByTestId("result")).toContainText("27 studs");
  await expect(page.getByTestId("steps")).toContainText("= 16 studs");
  await page.goto("/stud-calculator/?oc=24&corners=0&win=0&door=0&waste=0");
  await expect(page.getByTestId("result")).toContainText("11 studs");
});

test("fill dirt: 20×30 ft × 6 in + 20% = 13.33 yd³, 16 tons, 2 loads", async ({ page }) => {
  await page.goto("/fill-dirt-calculator/");
  await expect(page.getByTestId("result")).toContainText("13.33 yd³");
  await expect(page.getByTestId("result")).toContainText("16.00 tons");
  await expect(page.getByTestId("result")).toContainText("11.11 yd³");
});

test("hypergeometric: cards, deck, lottery", async ({ page }) => {
  await page.goto("/hypergeometric-calculator/");
  await expect(page.getByTestId("result")).toContainText("0.03993");
  await page.goto("/hypergeometric-calculator/?N=60&K=4&n=7&k=1");
  await expect(page.getByTestId("atleast")).toHaveText("0.3995");
  await page.goto("/hypergeometric-calculator/?N=49&K=6&n=6&k=6");
  await expect(page.getByTestId("result")).toContainText("1 in 13,983,816");
});

test("cross stitch: 140×100 on 14-ct → 16 × 13.14 in", async ({ page }) => {
  await page.goto("/cross-stitch-calculator/");
  await expect(page.getByTestId("result")).toContainText("16 in × 13.14 in");
  await expect(page.getByTestId("result")).toContainText("10 in × 7.14 in");
  await page.goto("/cross-stitch-calculator/?count=28&over=2");
  await expect(page.getByTestId("result")).toContainText("16 in × 13.14 in");
});
