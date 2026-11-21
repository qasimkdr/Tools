/** Pure loan/interest math. Rates are decimals per year (0.06 = 6%). No rounding until display. */

/** Periodic payment for an amortizing loan. r = periodic rate, n = number of payments. */
export function payment(principal: number, r: number, n: number) {
  if (n <= 0) return NaN;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Number of payments to repay `principal` with periodic payment `pmt`. Infinity if the payment never covers interest. */
export function paymentsNeeded(principal: number, r: number, pmt: number) {
  if (pmt <= 0) return Infinity;
  if (r === 0) return principal / pmt;
  if (pmt <= principal * r) return Infinity;
  return -Math.log(1 - (principal * r) / pmt) / Math.log(1 + r);
}

/** Periodic rate that makes `pmt` repay `principal` in `n` payments (bisection; robust, ~1e-12). NaN if impossible. */
export function rateFor(principal: number, pmt: number, n: number) {
  if (principal <= 0 || pmt <= 0 || n <= 0) return NaN;
  if (pmt * n < principal - 1e-9) return NaN; // would need a negative rate
  if (Math.abs(pmt * n - principal) < 1e-9) return 0;
  let lo = 0, hi = 1; // up to 100% per period
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (payment(principal, mid, n) > pmt) hi = mid; else lo = mid;
  }
  return (lo + hi) / 2;
}

/** Effective annual rate from a nominal annual rate compounded m times per year. */
export const effectiveAnnual = (nominal: number, m: number) => Math.pow(1 + nominal / m, m) - 1;

/** Nominal annual rate (compounded m times/yr) that grows `start` to `end` in `years`. */
export const growthRate = (start: number, end: number, years: number, m: number) =>
  start > 0 && end > 0 && years > 0 ? m * (Math.pow(end / start, 1 / (years * m)) - 1) : NaN;

export type Row = { period: number; payment: number; interest: number; principal: number; balance: number };

/** Amortization schedule with optional extra payment each period. Stops when the balance reaches zero. */
export function schedule(principal: number, r: number, n: number, extra = 0): Row[] {
  const base = payment(principal, r, n);
  const rows: Row[] = [];
  let bal = principal;
  for (let k = 1; bal > 0.005 && k <= n * 2 + 1200; k++) {
    const interest = bal * r;
    let pay = base + extra;
    if (pay > bal + interest) pay = bal + interest;
    const princ = pay - interest;
    bal = Math.max(0, bal - princ);
    rows.push({ period: k, payment: pay, interest, principal: princ, balance: bal });
  }
  return rows;
}

export const usd = (x: number, digits = 2) =>
  Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits }) : "—";
export const pct = (x: number, digits = 3) => (Number.isFinite(x) ? `${(x * 100).toFixed(digits).replace(/\.?0+$/, "")}%` : "—");
