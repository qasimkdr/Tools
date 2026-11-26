import { test, expect } from "@playwright/test";

// Scheduled tools: run against a SHOW_SCHEDULED=1 build. Hand-verified values (docs/research/<slug>.md).
test("sphere: 15 thin → 530 blocks, 15 layers; thick 890; filled 1,791; dome 285", async ({ page }) => {
  await page.goto("/minecraft-sphere-generator/");
  await expect(page.getByTestId("total")).toHaveText("530");
  await expect(page.getByTestId("layers")).toHaveText("15");
  await expect(page.getByTestId("stacks")).toHaveText("8 + 18");
  await expect(page.getByTestId("per-layer")).toContainText("Layer 2: 48");
  await page.goto("/minecraft-sphere-generator/?shell=thick");
  await expect(page.getByTestId("total")).toHaveText("890");
  await page.goto("/minecraft-sphere-generator/?shell=filled");
  await expect(page.getByTestId("total")).toHaveText("1,791");
  await page.goto("/minecraft-sphere-generator/?dome=1");
  await expect(page.getByTestId("total")).toHaveText("285");
  await expect(page.getByTestId("layers")).toHaveText("8");
});

test("boolean: AB + A'C + BC → AB + A'C, POS (A + C)(A' + B), Σm(1, 3, 6, 7); equivalence; errors", async ({ page }) => {
  await page.goto("/boolean-algebra-calculator/");
  await expect(page.getByTestId("sop")).toHaveText("AB + A'C");
  await expect(page.getByTestId("pos")).toHaveText("(A + C)(A' + B)");
  await expect(page.getByTestId("minterms")).toHaveText("Σm(1, 3, 6, 7)");
  await page.locator("#cmp").fill("AB + A'C");
  await expect(page.getByTestId("equiv")).toContainText("equivalent");
  await page.locator("#cmp").fill("AB + C");
  await expect(page.getByTestId("equiv")).toContainText("Not equivalent");
  await page.goto("/boolean-algebra-calculator/?expr=(A%2BB)(A%2BC)");
  await expect(page.getByTestId("sop")).toHaveText("A + BC");
  await page.goto("/boolean-algebra-calculator/?expr=A%2BA'");
  await expect(page.getByTestId("kind")).toContainText("Tautology");
  await page.locator("#expr").fill("A +");
  await expect(page.getByText("The expression ends too early")).toBeVisible();
});

test("reverse BMI: 5'9\" BMI 22 → 149.0 lb, range 125.3–168.6, current 26.6, lose 31.0 lb; metric 67.4 kg", async ({ page }) => {
  await page.goto("/reverse-bmi-calculator/");
  await expect(page.getByTestId("weight")).toHaveText("149.0 lb");
  await expect(page.getByTestId("range")).toHaveText("125.3 lb – 168.6 lb");
  await expect(page.getByTestId("cur-bmi")).toHaveText("26.6 (Overweight)");
  await expect(page.getByTestId("diff")).toHaveText("Lose 31.0 lb");
  await expect(page.getByTestId("weeks")).toHaveText("about 31 weeks");
  await page.goto("/reverse-bmi-calculator/?u=metric");
  await expect(page.getByTestId("weight")).toHaveText("67.4 kg");
  await expect(page.getByTestId("range")).toHaveText("56.7 kg – 76.3 kg");
  await page.goto("/reverse-bmi-calculator/?set=asian");
  await expect(page.getByTestId("range")).toHaveText("125.3 lb – 155.1 lb");
});

test("sheep: Oct 1 2026 → Feb 25 2027; flock Oct 1–Nov 4 → Feb 22–Apr 4; plan Mar 1 → Oct 5", async ({ page }) => {
  await page.goto("/sheep-gestation-calculator/?date=2026-10-01");
  await expect(page.getByTestId("due")).toHaveText("Thursday, February 25, 2027");
  await expect(page.getByTestId("window")).toHaveText("Feb 22, 2027 and Mar 1, 2027");
  await page.goto("/sheep-gestation-calculator/?mode=flock&rin=2026-10-01&rout=2026-11-04");
  await expect(page.getByTestId("period")).toHaveText("Feb 22, 2027 – Apr 4, 2027");
  await expect(page.getByTestId("exposure")).toHaveText("34 days (2.0 cycles)");
  await page.goto("/sheep-gestation-calculator/?mode=plan&target=2027-03-01");
  await expect(page.getByTestId("ram-in")).toHaveText("Monday, October 5, 2026");
  await expect(page.getByTestId("ram-out")).toHaveText("Nov 8, 2026");
  await page.goto("/sheep-gestation-calculator/?date=2026-10-01&breed=late");
  await expect(page.getByTestId("due")).toHaveText("Sunday, February 28, 2027");
});

test("binding: 60×72 → 274″, 7 strips, ½ yd; bias 27″ square, ¾ yd; metric", async ({ page }) => {
  await page.goto("/binding-calculator/");
  await expect(page.getByTestId("strips")).toHaveText("7 strips");
  await expect(page.getByTestId("total")).toHaveText("274″");
  await expect(page.getByTestId("buy")).toHaveText("½ yd");
  await page.goto("/binding-calculator/?type=bias");
  await expect(page.getByTestId("square")).toHaveText("27″ × 27″");
  await expect(page.getByTestId("buy")).toHaveText("¾ yd");
  await page.goto("/binding-calculator/?w=108&l=108");
  await expect(page.getByTestId("strips")).toHaveText("11 strips");
  await expect(page.getByTestId("buy")).toHaveText("⅞ yd");
});
