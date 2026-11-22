import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("molecular weight: glucose, hydrate, case-sensitivity error", async ({ page }) => {
  await page.goto("/molecular-weight-calculator/");
  await expect(page.getByTestId("result")).toContainText("180.156 g/mol");
  await expect(page.getByTestId("convert")).toContainText("0.55507 mol");
  await page.goto("/molecular-weight-calculator/?f=CuSO4·5H2O");
  await expect(page.getByTestId("result")).toContainText("249.677 g/mol");
  await page.goto("/molecular-weight-calculator/?f=Xy2");
  await expect(page.getByTestId("result")).toContainText("Unknown element");
});

test("bowling: sample game 166, perfect 300", async ({ page }) => {
  await page.goto("/bowling-score-calculator/");
  await expect(page.getByTestId("result")).toContainText("166");
  await expect(page.getByTestId("cum-4")).toHaveText("76");
  await page.getByRole("button", { name: "Perfect game" }).click();
  await expect(page.getByTestId("result")).toContainText("300");
});

test("square root: simplified radical, cube root, imaginary", async ({ page }) => {
  await page.goto("/square-root-calculator/?x=72");
  await expect(page.getByTestId("result")).toContainText("8.485281374");
  await expect(page.getByTestId("result")).toContainText("6√72".replace("72", "2"));
  await page.goto("/square-root-calculator/?x=54&n=3");
  await expect(page.getByTestId("result")).toContainText("3∛2");
  await page.goto("/square-root-calculator/?x=-16");
  await expect(page.getByTestId("result")).toContainText("4 i");
});

test("fraction: 1 1/2 + 2 3/4 = 4 1/4; 3/4 ÷ 2/5 = 1 7/8", async ({ page }) => {
  await page.goto("/fraction-calculator/");
  await expect(page.getByTestId("result")).toContainText("4 1/4");
  await expect(page.getByTestId("result")).toContainText("17/4");
  await page.goto("/fraction-calculator/?aw=0&an=3&ad=4&op=%C3%B7&bw=0&bn=2&bd=5");
  await expect(page.getByTestId("result")).toContainText("1 7/8");
});

test("mortgage: 20% down total, 10% down PMI dates", async ({ page }) => {
  await page.goto("/mortgage-calculator/");
  await expect(page.getByTestId("result")).toContainText("$2,514.28");
  await expect(page.getByTestId("result")).toContainText("$2,022.62");
  await page.goto("/mortgage-calculator/?down=10");
  await expect(page.getByTestId("result")).toContainText("$2,917.11");
  await expect(page.getByTestId("result")).toContainText("PMI ends automatically");
});
