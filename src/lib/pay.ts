/**
 * Pay and US payroll-tax helpers (pure). Tax-year constants are verified figures; update yearly with sources:
 * - Brackets + standard deduction: IRS Rev. Proc. 2025-32 (tax year 2026).
 * - Social Security wage base $184,500 (SSA, Oct 24 2025); 6.2% employee. Medicare 1.45% + 0.9% withheld above $200,000 (IRS).
 * - "No tax on overtime" deduction (2025–2028): premium portion of FLSA overtime, max $12,500 ($25,000 joint),
 *   reduced $100 per $1,000 of MAGI over $150,000 ($300,000 joint) — IRS newsroom.
 */
export type Filing = "single" | "joint";
export const TAX_YEAR = 2026;
export const STD_DEDUCTION: Record<Filing, number> = { single: 16100, joint: 32200 };
const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
// Upper limit of each bracket (taxable income); last is open-ended.
export const BRACKETS: Record<Filing, number[]> = {
  single: [12400, 50400, 105700, 201775, 256225, 640600, Infinity],
  joint: [24800, 100800, 211400, 403550, 512450, 768700, Infinity],
};
export const SS_RATE = 0.062, SS_WAGE_BASE = 184500, MEDICARE_RATE = 0.0145, ADDL_MEDICARE_RATE = 0.009, ADDL_MEDICARE_THRESHOLD = 200000;
export const OT_DEDUCTION = { cap: { single: 12500, joint: 25000 }, phaseStart: { single: 150000, joint: 300000 } } as const;

/** Federal income tax on taxable income (after deductions). Returns tax and marginal rate. */
export function incomeTax(taxable: number, filing: Filing) {
  let tax = 0, lower = 0, marginal = 0.1;
  const t = Math.max(0, taxable);
  for (let i = 0; i < RATES.length; i++) {
    const upper = BRACKETS[filing][i];
    if (t > lower) { tax += (Math.min(t, upper) - lower) * RATES[i]; marginal = RATES[i]; }
    lower = upper;
  }
  return { tax, marginal };
}

/** Employee FICA on annual FICA wages (single employer). */
export function fica(wages: number) {
  const w = Math.max(0, wages);
  const ss = Math.min(w, SS_WAGE_BASE) * SS_RATE;
  const medicare = w * MEDICARE_RATE + Math.max(0, w - ADDL_MEDICARE_THRESHOLD) * ADDL_MEDICARE_RATE;
  return { ss, medicare };
}

/** Qualified overtime deduction (premium portion), after the cap and MAGI phase-out. */
export function overtimeDeduction(premium: number, magi: number, filing: Filing) {
  const reduce = Math.floor(Math.max(0, magi - OT_DEDUCTION.phaseStart[filing]) / 1000) * 100;
  return Math.max(0, Math.min(premium, OT_DEDUCTION.cap[filing]) - reduce);
}

export type OtRule = "federal" | "california";
export type DayHours = { reg: number; ot: number; dt: number };

/**
 * Split a workweek (7 daily hour totals, in order) into regular, overtime (1.5×) and double-time (2×) hours.
 * federal: FLSA, hours over 40 in the workweek. california: over 8/day (1.5×), over 12/day (2×), 7th consecutive day
 * first 8 at 1.5× and beyond 8 at 2×, plus regular hours over 40/week at 1.5×. No pyramiding.
 */
export function splitWeek(days: number[], rule: OtRule, weekly = 40) {
  const d = days.map((h) => Math.max(0, Math.min(24, h || 0)));
  const total = d.reduce((a, b) => a + b, 0);
  if (rule === "federal") {
    const reg = Math.min(total, weekly);
    return { reg, ot: total - reg, dt: 0, total, flsaOt: Math.max(0, total - weekly) };
  }
  const seventh = d.length === 7 && d.every((h) => h > 0);
  const per: DayHours[] = d.map((h, i) =>
    seventh && i === 6 ? { reg: 0, ot: Math.min(h, 8), dt: Math.max(0, h - 8) } : { reg: Math.min(h, 8), ot: Math.min(Math.max(h - 8, 0), 4), dt: Math.max(h - 12, 0) });
  let reg = per.reduce((a, p) => a + p.reg, 0), ot = per.reduce((a, p) => a + p.ot, 0);
  const dt = per.reduce((a, p) => a + p.dt, 0);
  if (reg > weekly) { ot += reg - weekly; reg = weekly; }
  return { reg, ot, dt, total, flsaOt: Math.max(0, total - weekly) };
}
