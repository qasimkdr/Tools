/**
 * Programmatic pages are generated ONLY for values with real search demand (SEMrush volume ≥ 1,000, from
 * data/roadmap.json → "Date From Today Calculator" cluster). Each page carries unique computed data
 * (date, weekday, business-day count, holidays crossed, week/quarter, the "ago" date), not swapped numbers.
 * Add a value only when keyword data shows demand. Volumes are monthly US searches.
 */
export const DAY_VARIANTS = [90, 14, 10, 120, 15, 60, 20, 45, 100, 5, 25, 31, 22, 180, 12, 16, 17, 11, 18, 13, 9, 30, 3, 63, 41, 23, 27, 24, 4, 61, 19, 49, 67, 105, 110, 140, 37, 47, 210, 300, 365, 38, 54, 35, 130, 66, 182, 99, 160, 53, 57, 58, 50, 2, 7, 21, 28, 40, 75, 150, 200, 270] as const;
export const WEEK_VARIANTS = [10, 14, 9, 5, 18, 13, 2, 8, 6, 11, 30, 28, 32, 36, 16, 3, 20, 19, 23, 1, 4, 12, 15, 26, 33, 29, 31, 40, 52] as const;
export const MONTH_VARIANTS = [6, 9, 18, 4, 2, 8, 5, 1, 7, 10, 15, 3, 12, 24] as const;

/**
 * Values kept live for users (and linked from nearby strips) but with no matching keyword in the source export
 * (data/source/*.xlsx, checked 2026-11-25). They are noindex and left out of the sitemap until Search Console
 * shows demand; then remove the value from this list. All other variants have ≥1,000 monthly searches.
 */
export const NO_DEMAND_DATA: Record<"days" | "weeks" | "months", readonly number[]> = {
  days: [7, 21, 28, 40, 75, 100, 200, 270],
  weeks: [4, 12, 15, 52],
  months: [3, 12],
};
export const isIndexed = (unit: "days" | "weeks" | "months", n: number) => !NO_DEMAND_DATA[unit].includes(n);

export type VariantUnit = "days" | "weeks" | "months";
export const VARIANTS: Record<VariantUnit, readonly number[]> = { days: DAY_VARIANTS, weeks: WEEK_VARIANTS, months: MONTH_VARIANTS };
export const variantPath = (unit: VariantUnit, n: number) => `/${unit}-from-today/${n}/`;
/** Nearest variants (for the "nearby" internal-link strip) — same unit, sorted by distance. */
export const nearby = (unit: VariantUnit, n: number, k = 8) =>
  [...VARIANTS[unit]].filter((x) => x !== n).sort((a, b) => Math.abs(a - n) - Math.abs(b - n) || a - b).slice(0, k).sort((a, b) => a - b);
