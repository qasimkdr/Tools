import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("RMD: born 1952, $500k, 2026 → $19,607.84 (25.5); first RMD born 1953; 1960 → age 75; spouse note", async ({ page }) => {
  await page.goto("/rmd-calculator/?yr=2026");
  await expect(page.getByTestId("rmd")).toHaveText("$19,607.84");
  await expect(page.getByTestId("start-age")).toHaveText("73");
  await expect(page.getByTestId("deadline")).toHaveText("December 31, 2026");
  await expect(page.getByTestId("projection")).toContainText("$20,505");
  await page.goto("/rmd-calculator/?yr=2026&by=1953");
  await expect(page.getByTestId("deadline")).toHaveText("April 1, 2027");
  await expect(page.getByTestId("double")).toBeVisible();
  await page.goto("/rmd-calculator/?yr=2026&by=1962");
  await expect(page.getByTestId("rmd")).toHaveText("Not required yet");
  await expect(page.getByTestId("start-age")).toHaveText("75");
  await page.goto("/rmd-calculator/?yr=2026&sp=1");
  await expect(page.getByTestId("spouse")).toContainText("Table II");
});

test("brick: 20×8 ft, one 3×4 window, modular → 6.86/sq ft, 1,066 bricks, 8.2 cu ft mortar; UK per m²", async ({ page }) => {
  await page.goto("/brick-calculator/");
  await expect(page.getByTestId("per")).toHaveText("6.86");
  await expect(page.getByTestId("bricks")).toHaveText("1,066 bricks");
  await expect(page.getByTestId("mortar")).toHaveText("8.2 cu ft");
  await page.goto("/brick-calculator/?u=m&type=uk&l=5&h=2&open=0");
  await expect(page.getByTestId("per")).toHaveText("59.26");
  await expect(page.getByTestId("bricks")).toHaveText("623 bricks");
});

test("binomial: n=10, p=0.5, k=3 → 0.117188; ≤ 0.171875; ≥ 0.945313; between; normal approx shown for large n", async ({ page }) => {
  await page.goto("/binomial-distribution-calculator/");
  await expect(page.getByTestId("prob")).toHaveText("0.117188");
  await expect(page.getByTestId("le")).toHaveText("0.171875");
  await expect(page.getByTestId("ge")).toHaveText("0.945313");
  await expect(page.getByTestId("mean")).toHaveText("5");
  await page.goto("/binomial-distribution-calculator/?n=20&p=0.05&k=1&t=ge");
  await expect(page.getByTestId("prob")).toHaveText("0.641514");
  await page.goto("/binomial-distribution-calculator/?t=bt&k=4&b=6");
  await expect(page.getByTestId("prob")).toHaveText("0.65625");
  await page.goto("/binomial-distribution-calculator/?n=100&p=0.5&k=55&t=le");
  await expect(page.getByTestId("normal")).toBeVisible();
});

test("roman: 2026 → MMXXVI; MCMXCIV → 1994; IIII → non-standard; date; several; big numbers", async ({ page }) => {
  await page.goto("/roman-numeral-converter/");
  await expect(page.getByTestId("out")).toHaveText("MMXXVI");
  await page.goto("/roman-numeral-converter/?mode=rom");
  await expect(page.getByTestId("out")).toHaveText("1,994");
  await expect(page.getByTestId("steps")).toContainText("900 → CM");
  await page.goto("/roman-numeral-converter/?mode=rom&rn=IIII");
  await expect(page.getByTestId("nonstd")).toContainText("IV");
  await page.goto("/roman-numeral-converter/?mode=date&date=1776-07-04");
  await expect(page.getByTestId("out")).toHaveText("VII.IV.MDCCLXXVI");
  await page.goto("/roman-numeral-converter/?v=4%2C9%2C14");
  await expect(page.getByTestId("out")).toHaveText("IV, IX, XIV");
  await page.goto("/roman-numeral-converter/?v=12345");
  await expect(page.getByTestId("out")).toHaveText("XIICCCXLV");
  await page.goto("/roman-numeral-converter/?mode=rom&rn=(V)CCC");
  await expect(page.getByTestId("out")).toHaveText("5,300");
});

test("heart rate: age 40 → max 180, moderate 115–137, vigorous 139–167; age 50 CDC example; Karvonen; known max", async ({ page }) => {
  await page.goto("/target-heart-rate-calculator/");
  await expect(page.getByTestId("max")).toHaveText("180 bpm");
  await expect(page.getByTestId("moderate")).toHaveText("115–137 bpm");
  await expect(page.getByTestId("vigorous")).toHaveText("139–167 bpm");
  await page.goto("/target-heart-rate-calculator/?age=50");
  await expect(page.getByTestId("moderate")).toHaveText("109–129 bpm");
  await page.goto("/target-heart-rate-calculator/?m=hrr&rest=60");
  await expect(page.getByTestId("moderate")).toHaveText("137–151 bpm");
  await page.goto("/target-heart-rate-calculator/?known=190");
  await expect(page.getByTestId("max")).toHaveText("190 bpm");
  await page.goto("/target-heart-rate-calculator/?f=tanaka&age=60");
  await expect(page.getByTestId("max")).toHaveText("166 bpm");
});
