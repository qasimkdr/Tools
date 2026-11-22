/**
 * 401(k) projection (pure). Yearly steps; contributions are assumed to arrive evenly through the year
 * (mid-year approximation: they earn half a year of return in the year they're made).
 * IRS 2026 limits (IR-2025-111): elective deferral $24,500; catch-up age 50+ $8,000; ages 60–63 $11,250.
 * Limits are held flat in future years (conservative; the IRS adjusts them for inflation).
 */
export const LIMIT_2026 = { base: 24500, catchUp50: 8000, catchUp6063: 11250 };

export function deferralLimit(age: number) {
  if (age >= 60 && age <= 63) return LIMIT_2026.base + LIMIT_2026.catchUp6063;
  if (age >= 50) return LIMIT_2026.base + LIMIT_2026.catchUp50;
  return LIMIT_2026.base;
}

export type Year = { age: number; salary: number; employee: number; employer: number; balance: number; capped: boolean };

export function project(o: {
  age: number; retireAge: number; balance: number; salary: number; contribPct: number; matchPct: number; matchUpToPct: number;
  salaryGrowth: number; returnRate: number;
}) {
  const years: Year[] = [];
  let bal = o.balance, sal = o.salary;
  for (let age = o.age; age < o.retireAge; age++) {
    const wanted = sal * o.contribPct;
    const employee = Math.min(wanted, deferralLimit(age));
    const employer = sal * Math.min(o.contribPct, o.matchUpToPct) * o.matchPct;
    bal = bal * (1 + o.returnRate) + (employee + employer) * (1 + o.returnRate / 2);
    years.push({ age, salary: sal, employee, employer, balance: bal, capped: employee < wanted - 0.005 });
    sal *= 1 + o.salaryGrowth;
  }
  const employeeTotal = years.reduce((t, y) => t + y.employee, 0), employerTotal = years.reduce((t, y) => t + y.employer, 0);
  return { years, final: years.length ? bal : o.balance, employeeTotal, employerTotal, growth: (years.length ? bal : o.balance) - o.balance - employeeTotal - employerTotal };
}
