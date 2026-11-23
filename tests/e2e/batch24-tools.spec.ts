import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("percent: 20% of 150 = 30; 30→50 = 66.6667%; diff 50%; 150+20% = 180", async ({ page }) => {
  await page.goto("/percent-calculator/");
  await expect(page.getByTestId("answer")).toHaveText("30");
  await page.goto("/percent-calculator/?mode=change&a=30&b=50");
  await expect(page.getByTestId("answer")).toHaveText("66.6667%");
  await page.goto("/percent-calculator/?mode=diff&a=30&b=50");
  await expect(page.getByTestId("answer")).toHaveText("50%");
  await page.goto("/percent-calculator/?mode=what&a=30&b=150");
  await expect(page.getByTestId("answer")).toHaveText("20%");
  await page.goto("/percent-calculator/?mode=inc&a=150&b=20");
  await expect(page.getByTestId("answer")).toHaveText("180");
});

test("ARV: comps → $259,978; $300k ARV, $40k repairs → MAO $170,000, profit $57,000", async ({ page }) => {
  await page.goto("/arv-calculator/");
  await expect(page.getByTestId("arv")).toHaveText("$259,978");
  await page.goto("/arv-calculator/?src=known");
  await expect(page.getByTestId("mao")).toHaveText("$170,000");
  await expect(page.getByTestId("profit")).toHaveText("$57,000");
});

test("radicals: √72 = 6√2; ∛54 = 3∛2; 3√200 = 30√2; ∛-8 = −2", async ({ page }) => {
  await page.goto("/simplify-radicals-calculator/");
  await expect(page.getByTestId("simplified")).toHaveText("6√2");
  await expect(page.getByTestId("check")).toHaveText("6² × 2 = 72");
  await page.goto("/simplify-radicals-calculator/?r=54&n=3");
  await expect(page.getByTestId("simplified")).toHaveText("3∛2");
  await page.goto("/simplify-radicals-calculator/?r=200&c=3");
  await expect(page.getByTestId("simplified")).toHaveText("30√2");
  await page.goto("/simplify-radicals-calculator/?r=-8&n=3");
  await expect(page.getByTestId("simplified")).toHaveText("−2");
});

test("lease vs buy: lease $17,321.95 vs buy net $21,003.75 → leasing by $3,681.80", async ({ page }) => {
  await page.goto("/car-lease-vs-buy-calculator/");
  await expect(page.getByTestId("winner")).toHaveText("Leasing");
  await expect(page.getByTestId("lease-net")).toHaveText("$17,321.95");
  await expect(page.getByTestId("buy-net")).toHaveText("$21,003.75");
  await expect(page.getByTestId("diff")).toHaveText("$3,681.80");
});

test("redacted text: brackets and chosen words", async ({ page }) => {
  await page.goto("/redacted-text-generator/");
  await expect(page.getByTestId("out")).toHaveText("Agent ████ █████ will meet the informant at ███ near the old bridge.");
  await page.goto("/redacted-text-generator/?mode=words&text=Meet%20at%209pm%20near%20the%20old%20bridge.&words=9pm%2C%20bridge");
  await expect(page.getByTestId("out")).toHaveText("Meet at ███ near the old ██████.");
});
