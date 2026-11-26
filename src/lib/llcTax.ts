/**
 * LLC federal tax estimate, tax year 2026 (pure). Sources: IRS Topic 554 (SE tax 15.3% on 92.35% of net earnings),
 * SSA 2026 wage base $184,500, IRS Topic 560 (Additional Medicare 0.9% over $200k / $250k MFJ / $125k MFS),
 * Rev. Proc. 2025-32 (2026 brackets, standard deduction, §199A thresholds and $400 minimum).
 * Default LLC (single-member or partnership share) vs S-corporation election with a salary.
 */
import { STANDARD_DEDUCTION_2026, taxFor, type Status } from "./incomeTax";

export const SS_WAGE_BASE_2026 = 184500;
export const QBI_THRESHOLD_2026: Record<Status, number> = { single: 201750, hoh: 201750, mfj: 403500, mfs: 201775 };
const ADDL_MEDICARE: Record<Status, number> = { single: 200000, hoh: 200000, mfj: 250000, mfs: 125000 };

export type LlcResult = {
  seTax: number; ssTax: number; medicareTax: number; addlMedicare: number; payrollTax: number;
  halfSeDeduction: number; qbi: number; qbiDeduction: number; qbiLimited: boolean;
  taxableIncome: number; incomeTax: number; stateTax: number; total: number; effective: number; takeHome: number;
};

function qbiDeduction(qbiIncome: number, taxableBeforeQbi: number, status: Status) {
  if (qbiIncome < 1000) return { d: 0, limited: false };
  if (taxableBeforeQbi > QBI_THRESHOLD_2026[status]) return { d: 0, limited: true }; // wage/property & SSTB limits apply: not estimated
  return { d: Math.max(400, Math.min(0.2 * qbiIncome, 0.2 * taxableBeforeQbi)), limited: false };
}

/** Default LLC tax treatment: owner pays self-employment tax on their share of profit. */
export function defaultLlc(o: { profit: number; status: Status; otherIncome: number; stateRate: number }): LlcResult {
  const nese = Math.max(0, o.profit) * 0.9235;
  const owes = nese >= 400;
  const ssTax = owes ? 0.124 * Math.min(nese, SS_WAGE_BASE_2026) : 0;
  const medicareTax = owes ? 0.029 * nese : 0;
  const addlMedicare = owes ? 0.009 * Math.max(0, nese - ADDL_MEDICARE[o.status]) : 0;
  const seTax = ssTax + medicareTax;
  const halfSeDeduction = seTax / 2;
  const agi = o.profit + o.otherIncome - halfSeDeduction;
  const beforeQbi = Math.max(0, agi - STANDARD_DEDUCTION_2026[o.status]);
  const qbi = Math.max(0, o.profit - halfSeDeduction);
  const q = qbiDeduction(qbi, beforeQbi, o.status);
  const taxableIncome = Math.max(0, beforeQbi - q.d);
  const incomeTax = taxFor(taxableIncome, o.status).tax;
  const stateTax = Math.max(0, agi) * (o.stateRate / 100);
  const total = seTax + addlMedicare + incomeTax + stateTax;
  return { seTax, ssTax, medicareTax, addlMedicare, payrollTax: 0, halfSeDeduction, qbi, qbiDeduction: q.d, qbiLimited: q.limited, taxableIncome, incomeTax, stateTax, total, effective: o.profit > 0 ? total / o.profit : 0, takeHome: o.profit - total };
}

/** S-corp election: owner takes a W-2 salary (payroll tax on salary only); remaining profit passes through. */
export function sCorp(o: { profit: number; salary: number; status: Status; otherIncome: number; stateRate: number }): LlcResult {
  const salary = Math.min(Math.max(0, o.salary), o.profit / 1.0765); // salary + employer FICA can't exceed profit
  const ss = 0.062 * Math.min(salary, SS_WAGE_BASE_2026), med = 0.0145 * salary;
  const employer = ss + med, employee = ss + med;
  const addlMedicare = 0.009 * Math.max(0, salary - ADDL_MEDICARE[o.status]);
  const passThrough = o.profit - salary - employer; // employer FICA is a business deduction
  const agi = salary + passThrough + o.otherIncome;
  const beforeQbi = Math.max(0, agi - STANDARD_DEDUCTION_2026[o.status]);
  const q = qbiDeduction(Math.max(0, passThrough), beforeQbi, o.status);
  const taxableIncome = Math.max(0, beforeQbi - q.d);
  const incomeTax = taxFor(taxableIncome, o.status).tax;
  const stateTax = Math.max(0, agi) * (o.stateRate / 100);
  const payrollTax = employer + employee;
  const total = payrollTax + addlMedicare + incomeTax + stateTax;
  return { seTax: 0, ssTax: 2 * ss, medicareTax: 2 * med, addlMedicare, payrollTax, halfSeDeduction: 0, qbi: Math.max(0, passThrough), qbiDeduction: q.d, qbiLimited: q.limited, taxableIncome, incomeTax, stateTax, total, effective: o.profit > 0 ? total / o.profit : 0, takeHome: o.profit - total };
}
