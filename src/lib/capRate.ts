/** Cap rate and net operating income (pure, annual dollars). */
export type CapInput = { value: number; rent: number; other: number; vacancyPct: number; taxes: number; insurance: number; maintenance: number; mgmtPct: number; otherExp: number };

export function capRate(o: CapInput) {
  const gross = o.rent + o.other;
  const vacancy = gross * (o.vacancyPct / 100);
  const effective = gross - vacancy;
  const management = effective * (o.mgmtPct / 100);
  const expenses = o.taxes + o.insurance + o.maintenance + management + o.otherExp;
  const noi = effective - expenses;
  return {
    gross, vacancy, effective, management, expenses, noi,
    cap: o.value > 0 ? noi / o.value : NaN,
    expenseRatio: effective > 0 ? expenses / effective : NaN,
    grm: o.rent > 0 ? o.value / o.rent : NaN, // gross rent multiplier
  };
}

/** Value implied by an NOI and a cap rate (decimal). */
export const valueAtCap = (noi: number, cap: number) => (cap > 0 ? noi / cap : NaN);
