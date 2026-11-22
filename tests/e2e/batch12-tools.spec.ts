import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("cone: 2 ft × 3 ft = 3.142 ft³; frustum 21.991", async ({ page }) => {
  await page.goto("/cone-volume-calculator/");
  await expect(page.getByTestId("result")).toContainText("3.142 ft³");
  await expect(page.getByTestId("result")).toContainText("23.5");
  await page.goto("/cone-volume-calculator/?shape=frustum&size=4&top=2");
  await expect(page.getByTestId("result")).toContainText("21.991 ft³");
});

test("normal CDF: IQ examples and inverse", async ({ page }) => {
  await page.goto("/normal-cdf-calculator/");
  await expect(page.getByTestId("result")).toContainText("0.908789");
  await page.goto("/normal-cdf-calculator/?mode=between");
  await expect(page.getByTestId("result")).toContainText("0.682689");
  await page.goto("/normal-cdf-calculator/?mode=above&x=130");
  await expect(page.getByTestId("result")).toContainText("0.02275");
  await page.goto("/normal-cdf-calculator/?mode=inverse");
  await expect(page.getByTestId("result")).toContainText("124.672804");
});

test("matrix inverse: 2×2 fractions, 3×3 integers, singular", async ({ page }) => {
  await page.goto("/matrix-inverse-calculator/?n=2&m=4,7;2,6");
  await expect(page.getByTestId("inverse")).toContainText("3/5");
  await expect(page.getByTestId("inverse")).toContainText("-7/10");
  await expect(page.getByTestId("result")).toContainText("A × A⁻¹ = I");
  await page.goto("/matrix-inverse-calculator/");
  await expect(page.getByTestId("inverse")).toContainText("-24");
  await page.goto("/matrix-inverse-calculator/?n=2&m=1,2;2,4");
  await expect(page.getByTestId("result")).toContainText("singular");
});

test("credit card: $5,000 at 22%, $200 → 34 months; target 36 → $190.95", async ({ page }) => {
  await page.goto("/credit-card-payoff-calculator/");
  await expect(page.getByTestId("result")).toContainText("2 yr 10 mo");
  await expect(page.getByTestId("result")).toContainText("$1,749.88");
  await page.goto("/credit-card-payoff-calculator/?mode=target&months=36");
  await expect(page.getByTestId("result")).toContainText("$190.95");
  await page.goto("/credit-card-payoff-calculator/?pay=50");
  await expect(page.getByTestId("result")).toContainText("Never");
});

test("circle skirt: 28 in waist full circle", async ({ page }) => {
  await page.goto("/circle-skirt-calculator/");
  await expect(page.getByTestId("result")).toContainText("4.46 in");
  await expect(page.getByTestId("result")).toContainText("27.46 in");
  await expect(page.getByTestId("result")).toContainText("1.53 yd");
  await page.goto("/circle-skirt-calculator/?type=half");
  await expect(page.getByTestId("result")).toContainText("1.77 yd");
});
