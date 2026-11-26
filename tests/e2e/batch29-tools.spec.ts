import { test, expect } from "@playwright/test";

// Batch 29 (published immediately). Hand-verified values (docs/research/<slug>.md).
test("LLC tax: single, $90k profit → $19,316; S-corp with $50k salary → $16,187, saving ≈ $3,129", async ({ page }) => {
  await page.goto("/llc-tax-calculator/");
  await expect(page.getByTestId("total")).toHaveText("$19,316");
  await expect(page.getByTestId("se")).toHaveText("$12,717");
  await expect(page.getByTestId("income")).toHaveText("$6,599");
  await expect(page.getByTestId("saving")).toContainText("$3,129");
  await page.goto("/llc-tax-calculator/?view=scorp");
  await expect(page.getByTestId("total")).toHaveText("$16,187");
  await expect(page.getByTestId("payroll")).toHaveText("$7,650");
});

test("GC content: 23-mer → 56.52%, skew 0.077, Tm 58.8 °C; Wallace for short oligo; RNA", async ({ page }) => {
  await page.goto("/gc-calculator/");
  await expect(page.getByTestId("gc")).toHaveText("56.52%");
  await expect(page.getByTestId("at")).toHaveText("43.48%");
  await expect(page.getByTestId("skew")).toHaveText("0.077");
  await expect(page.getByTestId("tm")).toHaveText("58.8 °C");
  await expect(page.getByTestId("rc")).toHaveText("GCGCTATACGCGTAATCGCGCAT");
  await page.locator("#seq").fill(">primer\nATGC ATGC");
  await expect(page.getByTestId("gc")).toHaveText("50.00%");
  await expect(page.getByTestId("tm")).toHaveText("24.0 °C");
  await page.goto("/gc-calculator/?seq=AUGCNN");
  await expect(page.getByTestId("gc")).toHaveText("50.00%");
  await expect(page.getByTestId("rc")).toHaveText("NNGCAU");
});

test("wainscoting: 144 in wall, 4 panels → 31 5/8″ × 23″, 36.4 ft moulding, 6 sticks; metric", async ({ page }) => {
  await page.goto("/wainscoting-calculator/");
  await expect(page.getByTestId("panel")).toHaveText("31 5/8″ × 23″");
  await expect(page.getByTestId("moulding")).toHaveText("36.4 ft");
  await expect(page.getByTestId("waste")).toHaveText("40.1 ft");
  await expect(page.getByTestId("sticks")).toHaveText("6");
  await expect(page.getByTestId("marks")).toContainText("19 5/16″");
  await page.goto("/wainscoting-calculator/?unit=cm&wall=300&height=90&panels=4&gap=10&top=10&bottom=10&stick=244&price=12");
  await expect(page.getByTestId("panel")).toHaveText("62.5 cm × 70.0 cm");
  await expect(page.getByTestId("moulding")).toHaveText("10.60 m");
  await expect(page.getByTestId("sticks")).toHaveText("5");
  await expect(page.getByTestId("cost")).toHaveText("$60.00");
});
