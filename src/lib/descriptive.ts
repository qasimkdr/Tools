/** Descriptive statistics helpers (pure). */

/** Parse numbers from free text: commas, spaces, tabs, semicolons or new lines. Returns the numbers and any bad tokens. */
export function parseNumbers(text: string): { nums: number[]; bad: string[] } {
  const nums: number[] = [], bad: string[] = [];
  for (const tok of text.split(/[\s,;]+/).filter(Boolean)) {
    const n = Number(tok);
    if (Number.isFinite(n)) nums.push(n); else bad.push(tok);
  }
  return { nums, bad };
}

export type Summary = {
  n: number; sum: number; mean: number; median: number; min: number; max: number; range: number; modes: number[];
  ss: number; varPop: number; varSample: number; sdPop: number; sdSample: number;
};

/** Two-pass (numerically stable) summary. Sample variance is NaN when n < 2. */
export function summarize(xs: number[]): Summary | null {
  const n = xs.length;
  if (!n) return null;
  const sum = xs.reduce((a, b) => a + b, 0), mean = sum / n;
  const ss = xs.reduce((a, x) => a + (x - mean) ** 2, 0);
  const sorted = [...xs].sort((a, b) => a - b);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const counts = new Map<number, number>();
  for (const x of xs) counts.set(x, (counts.get(x) ?? 0) + 1);
  const top = Math.max(...counts.values());
  const modes = top > 1 ? [...counts].filter(([, c]) => c === top).map(([v]) => v).sort((a, b) => a - b) : [];
  const varPop = ss / n, varSample = n > 1 ? ss / (n - 1) : NaN;
  return { n, sum, mean, median, min: sorted[0], max: sorted[n - 1], range: sorted[n - 1] - sorted[0], modes, ss, varPop, varSample, sdPop: Math.sqrt(varPop), sdSample: Math.sqrt(varSample) };
}

export type Weighted = { sumW: number; sumWX: number; mean: number; sdPop: number; sdFreq: number };

/** Weighted mean Σwx / Σw, plus weighted SD (population form, and sample form treating weights as frequencies). */
export function weightedMean(xs: number[], ws: number[]): Weighted | null {
  if (!xs.length || xs.length !== ws.length || ws.some((w) => w < 0)) return null;
  const sumW = ws.reduce((a, b) => a + b, 0);
  if (!(sumW > 0)) return null;
  const sumWX = xs.reduce((a, x, i) => a + x * ws[i], 0), mean = sumWX / sumW;
  const ssw = xs.reduce((a, x, i) => a + ws[i] * (x - mean) ** 2, 0);
  return { sumW, sumWX, mean, sdPop: Math.sqrt(ssw / sumW), sdFreq: sumW > 1 ? Math.sqrt(ssw / (sumW - 1)) : NaN };
}
