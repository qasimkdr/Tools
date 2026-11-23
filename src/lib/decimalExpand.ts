import type { Q } from "./rational";

/** Exact decimal expansion of a fraction: integer part, non-repeating digits and repeating block (≤ maxDigits). */
export function expand(x: Q, maxDigits = 120): { neg: boolean; int: string; fixed: string; rep: string; truncated: boolean } {
  const neg = x.n < 0n;
  let n = neg ? -x.n : x.n;
  const d = x.d;
  const int = (n / d).toString();
  let r = n % d;
  const seen = new Map<string, number>();
  let digits = "";
  while (r !== 0n && digits.length < maxDigits) {
    const key = r.toString();
    if (seen.has(key)) { const i = seen.get(key)!; return { neg, int, fixed: digits.slice(0, i), rep: digits.slice(i), truncated: false }; }
    seen.set(key, digits.length);
    r *= 10n; digits += (r / d).toString(); r %= d;
  }
  return { neg, int, fixed: digits, rep: "", truncated: r !== 0n };
}

/** Round a fraction to `places` decimal places (half away from zero) and return the string. */
export function roundQ(x: Q, places: number): string {
  const neg = x.n < 0n, n = neg ? -x.n : x.n, scale = 10n ** BigInt(places);
  let v = (n * scale * 2n + x.d) / (2n * x.d); // round half up on magnitude
  const s = v.toString().padStart(places + 1, "0");
  const out = places ? `${s.slice(0, -places)}.${s.slice(-places)}` : s;
  return (neg && v !== 0n ? "-" : "") + out;
}

/** Number of digits after the decimal point in a typed decimal string. */
export const placesOf = (s: string) => { const m = s.trim().match(/\.(\d+)/); return m ? m[1].length : 0; };
