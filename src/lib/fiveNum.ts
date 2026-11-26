/** Five-number summary (pure) with the three common quartile conventions. */
export type QuartileMethod = "exclusive" | "tukey" | "linear";

const med = (s: number[]) => { const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };

/** Linear interpolation between order statistics, h = (n − 1)p (Excel QUARTILE.INC, R type 7, NumPy default). */
export function quantileLinear(s: number[], p: number) {
  const h = (s.length - 1) * p, lo = Math.floor(h);
  return lo + 1 < s.length ? s[lo] + (h - lo) * (s[lo + 1] - s[lo]) : s[lo];
}

export function fiveNumber(xs: number[], method: QuartileMethod = "exclusive") {
  const s = [...xs].sort((a, b) => a - b), n = s.length;
  if (!n) return null;
  const median = med(s);
  let q1: number, q3: number;
  if (method === "linear" || n < 2) { q1 = quantileLinear(s, 0.25); q3 = quantileLinear(s, 0.75); }
  else {
    // exclusive: halves leave out the median when n is odd (TI-84, most intro textbooks); tukey: halves include it (R fivenum).
    const half = Math.floor(n / 2), incl = method === "tukey" && n % 2 === 1;
    q1 = med(s.slice(0, half + (incl ? 1 : 0)));
    q3 = med(s.slice(n - half - (incl ? 1 : 0)));
  }
  const iqr = q3 - q1, lower = q1 - 1.5 * iqr, upper = q3 + 1.5 * iqr;
  const outliers = s.filter((x) => x < lower || x > upper);
  const inside = s.filter((x) => x >= lower && x <= upper);
  return {
    n, sorted: s, min: s[0], q1, median, q3, max: s[n - 1], iqr, range: s[n - 1] - s[0],
    mean: s.reduce((a, b) => a + b, 0) / n, lower, upper, outliers,
    whiskerLo: inside.length ? inside[0] : s[0], whiskerHi: inside.length ? inside[inside.length - 1] : s[n - 1],
  };
}
