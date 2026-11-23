/** Retirement drawdown: monthly withdrawals that rise with inflation once a year. Pure. */
export function drawdown(balance: number, monthly: number, annualReturn: number, inflation: number, maxYears = 100) {
  const rm = (1 + annualReturn) ** (1 / 12) - 1;
  let bal = balance, w = monthly, months = 0, withdrawn = 0;
  const years: { year: number; start: number; withdrawn: number; growth: number; end: number }[] = [];
  for (let y = 1; y <= maxYears; y++) {
    const start = bal; let wy = 0, gy = 0;
    for (let m = 0; m < 12; m++) {
      const g = bal * rm; bal += g; gy += g;
      const take = Math.min(w, bal); bal -= take; wy += take; withdrawn += take;
      if (take > 0) months++;
      if (bal <= 1e-6) { years.push({ year: y, start, withdrawn: wy, growth: gy, end: 0 }); return { months, depleted: true, years, withdrawn, end: 0 }; }
    }
    years.push({ year: y, start, withdrawn: wy, growth: gy, end: bal });
    w *= 1 + inflation;
  }
  return { months, depleted: false, years, withdrawn, end: bal };
}

/** Largest starting monthly withdrawal that lasts `targetYears` (bisection). */
export function sustainableWithdrawal(balance: number, annualReturn: number, inflation: number, targetYears: number) {
  let lo = 0, hi = balance;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const r = drawdown(balance, mid, annualReturn, inflation, targetYears);
    if (!r.depleted) lo = mid; else hi = mid;
  }
  return lo;
}
