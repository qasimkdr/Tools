/** Grade helpers (pure). Letter scale is the common US +/− scale; schools vary. */
export const SCALE: [number, string][] = [[93, "A"], [90, "A−"], [87, "B+"], [83, "B"], [80, "B−"], [77, "C+"], [73, "C"], [70, "C−"], [67, "D+"], [63, "D"], [60, "D−"], [0, "F"]];
export const letter = (pct: number) => (SCALE.find(([min]) => pct >= min - 1e-9) ?? [0, "F"])[1];
/** Score needed on the final (as %) to finish with `target`, given current grade and the final's weight (0–1). */
export const neededOnFinal = (current: number, weight: number, target: number) => (target - current * (1 - weight)) / weight;
export const courseGrade = (current: number, weight: number, final: number) => current * (1 - weight) + final * weight;
export function weighted(rows: { score: number; weight: number }[]) {
  const valid = rows.filter((r) => Number.isFinite(r.score) && r.weight > 0);
  const w = valid.reduce((a, r) => a + r.weight, 0);
  return { pct: w ? valid.reduce((a, r) => a + r.score * r.weight, 0) / w : NaN, weight: w };
}
