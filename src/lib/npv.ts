/** Discounted cash flow helpers (pure). Cash flows are end-of-period; flows[0] is period 1. */
export const pvFlows = (flows: number[], rate: number) => flows.map((c, i) => c / (1 + rate) ** (i + 1));
export const npv = (initial: number, flows: number[], rate: number) => pvFlows(flows, rate).reduce((a, b) => a + b, 0) - initial;

/** IRR by bisection on [-99%, 1000%]; null when NPV doesn't change sign (no unique IRR in range). */
export function irr(initial: number, flows: number[]) {
  let lo = -0.99, hi = 10;
  const f = (r: number) => npv(initial, flows, r);
  if (f(lo) * f(hi) > 0) return null;
  for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (f(m) * f(lo) > 0) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

/** Periods until cumulative (optionally discounted) cash flow recovers the initial investment, interpolated; null if never. */
export function payback(initial: number, flows: number[], rate = 0) {
  let cum = -initial;
  for (let i = 0; i < flows.length; i++) {
    const v = rate ? flows[i] / (1 + rate) ** (i + 1) : flows[i];
    if (cum + v >= 0 && v > 0) return i + -cum / v;
    cum += v;
  }
  return null;
}
