import { test, expect } from "@playwright/test";

// Hand-verified values (docs/research/<slug>.md).
test("AP World: weighted score, band and boundary warning", async ({ page }) => {
  await page.goto("/ap-world-history-score-calculator/");
  const r = page.getByTestId("result");
  await expect(r).toContainText("64.2%");
  await expect(r).toContainText("3 or 4");
  await page.goto("/ap-world-history-score-calculator/?mc=55&s1=3&s2=3&s3=3&dbq=7&leq=6");
  await expect(page.getByTestId("result")).toContainText("100.0%");
});

test("GPA: unweighted 3.36, weighted 3.69 with an AP class", async ({ page }) => {
  await page.goto("/gpa-calculator/");
  await expect(page.getByTestId("result")).toContainText("3.36");
  await page.getByLabel("Class 2 level").selectOption("ap");
  await expect(page.getByTestId("result")).toContainText("3.69");
});

test("square footage: 12×12 = 144, plus a 10×8 room = 224", async ({ page }) => {
  await page.goto("/square-footage-calculator/");
  await expect(page.getByTestId("result")).toContainText("144.00 sq ft");
  await page.getByRole("button", { name: "+ Add another area" }).click();
  await page.fill("#ar1a", "10"); await page.fill("#ar1b", "8");
  await expect(page.getByTestId("result")).toContainText("224.00 sq ft");
});

test("hours: day shift, overnight shift, weekly pay", async ({ page }) => {
  await page.goto("/hours-calculator/");
  await expect(page.getByTestId("result")).toContainText("8 h 00 min");
  await page.fill("#st", "22:00"); await page.fill("#en", "06:30"); await page.fill("#br", "0");
  await expect(page.getByTestId("result")).toContainText("8 h 30 min");
  await page.getByRole("button", { name: "Weekly timesheet" }).click();
  await page.fill("#rate", "20");
  await expect(page.getByTestId("result")).toContainText("40 h 00 min");
  await expect(page.getByTestId("result")).toContainText("$800.00");
});

test("bench: 225×5 → ~260 lb, plates per side, rep limit", async ({ page }) => {
  await page.goto("/bench-press-max-calculator/");
  await expect(page.getByTestId("result")).toContainText("260 lb");
  await expect(page.getByText("45 + 45 + 10 + 5 + 2.5 lb")).toBeVisible();
  await page.goto("/bench-press-max-calculator/?w=225&r=20");
  await expect(page.getByTestId("result")).toContainText("1–15 reps");
});
