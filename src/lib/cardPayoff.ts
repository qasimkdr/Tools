/** Credit card payoff simulation (pure). Interest = balance × APR/12 each month (statement approximation). */
export type MinRule = { kind: "pctPlusInterest" | "pct"; pct: number; floor: number };
export type Result = { months: number; interest: number; total: number; firstPayment: number; neverPaysOff: boolean };

export function simulate(balance: number, apr: number, pay: (bal: number, interest: number) => number, maxMonths = 1200): Result {
  const r = apr / 12; let b = balance, months = 0, interest = 0, total = 0, first = 0;
  while (b > 0.005 && months < maxMonths) {
    const i = b * r; let p = pay(b, i);
    if (months === 0) first = p;
    if (p <= i && p < b + i) return { months: Infinity, interest, total, firstPayment: first, neverPaysOff: true };
    p = Math.min(p, b + i); b = b + i - p; interest += i; total += p; months++;
  }
  return { months: b > 0.005 ? Infinity : months, interest, total, firstPayment: first, neverPaysOff: b > 0.005 };
}
export const minPayment = (rule: MinRule) => (b: number, i: number) =>
  Math.max(rule.kind === "pctPlusInterest" ? b * rule.pct + i : (b + i) * rule.pct, rule.floor);
/** Fixed monthly payment that clears the balance in n months. */
export const paymentFor = (balance: number, apr: number, n: number) => { const r = apr / 12; return r === 0 ? balance / n : (balance * r) / (1 - (1 + r) ** -n); };
export const fmtMonths = (m: number) => (!Number.isFinite(m) ? "never" : m < 12 ? `${m} months` : `${Math.floor(m / 12)} yr ${m % 12} mo`);
