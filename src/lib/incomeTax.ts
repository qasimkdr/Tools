/**
 * US federal income tax, tax year 2026 (IRS Rev. Proc. 2025-32, as amended by the One Big Beautiful Bill Act).
 * Brackets are [lower bound of taxable income, rate]. Pure functions.
 */
export type Status = "single" | "mfj" | "hoh" | "mfs";
export const STATUS_LABEL: Record<Status, string> = { single: "Single", mfj: "Married filing jointly (or surviving spouse)", hoh: "Head of household", mfs: "Married filing separately" };
export const STANDARD_DEDUCTION_2026: Record<Status, number> = { single: 16100, mfj: 32200, hoh: 24150, mfs: 16100 };
/** Additional standard deduction per condition (age 65+ or blind): $1,650, or $2,050 if unmarried and not a surviving spouse. */
export const ADDITIONAL_2026 = { married: 1650, unmarried: 2050 } as const;
export const BRACKETS_2026: Record<Status, [number, number][]> = {
  single: [[0, 0.1], [12400, 0.12], [50400, 0.22], [105700, 0.24], [201775, 0.32], [256225, 0.35], [640600, 0.37]],
  mfj: [[0, 0.1], [24800, 0.12], [100800, 0.22], [211400, 0.24], [403550, 0.32], [512450, 0.35], [768700, 0.37]],
  hoh: [[0, 0.1], [17700, 0.12], [67450, 0.22], [105700, 0.24], [201750, 0.32], [256200, 0.35], [640600, 0.37]],
  mfs: [[0, 0.1], [12400, 0.12], [50400, 0.22], [105700, 0.24], [201775, 0.32], [256225, 0.35], [384350, 0.37]],
};
export type BracketRow = { rate: number; from: number; to: number | null; amount: number; tax: number };
export function taxFor(taxable: number, status: Status): { tax: number; rows: BracketRow[]; marginal: number } {
  const b = BRACKETS_2026[status]; const rows: BracketRow[] = []; let tax = 0, marginal = b[0][1];
  for (let i = 0; i < b.length; i++) {
    const [lo, rate] = b[i], hi = i + 1 < b.length ? b[i + 1][0] : null;
    if (taxable <= lo) break;
    const amount = (hi === null ? taxable : Math.min(taxable, hi)) - lo;
    const t = amount * rate; tax += t; marginal = rate;
    rows.push({ rate, from: lo, to: hi, amount, tax: t });
  }
  return { tax, rows, marginal };
}
