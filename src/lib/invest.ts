/** Investment growth with monthly contributions, a fund expense ratio and inflation (pure). */
export type YearRow = { year: number; contributed: number; balance: number; growth: number; fees: number; real: number };

/**
 * Monthly compounding: each month the balance earns the monthly equivalent of the annual total return,
 * the fund's expense ratio is charged (annual ratio / 12 of the balance), then the contribution is added.
 */
export function project(o: { initial: number; monthly: number; years: number; annualReturn: number; expenseRatio: number; inflation: number }) {
  const rm = Math.pow(1 + o.annualReturn / 100, 1 / 12) - 1, fm = o.expenseRatio / 100 / 12;
  let bal = o.initial, contributed = o.initial, fees = 0;
  const rows: YearRow[] = [];
  for (let m = 1; m <= Math.round(o.years * 12); m++) {
    bal *= 1 + rm;
    const fee = bal * fm; bal -= fee; fees += fee;
    bal += o.monthly; contributed += o.monthly;
    if (m % 12 === 0 || m === Math.round(o.years * 12)) {
      const y = m / 12;
      rows.push({ year: Math.round(y * 100) / 100, contributed, balance: bal, growth: bal - contributed, fees, real: bal / Math.pow(1 + o.inflation / 100, y) });
    }
  }
  const last = rows[rows.length - 1] ?? { contributed, balance: bal, growth: 0, fees: 0, real: bal, year: 0 };
  return { rows, final: last };
}
