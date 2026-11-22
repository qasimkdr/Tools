/**
 * Exact scientific-notation handling on decimal strings (pure; no floating-point rounding for conversions).
 * A number is sign + significant digits + the decimal exponent of the first digit.
 */
export type Sci = { neg: boolean; digits: string; exp: number; zero: boolean };
const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const sup = (n: number) => String(n).split("").map((c) => SUP[c] ?? c).join("");

/** Accepts 12,300 · 0.00456 · 4.56e-4 · 4.56E-4 · 4.56×10^-4 · 4.56 x 10^-4 · 4.56*10^-4 · 4.56·10⁻⁴ */
export function parseSci(input: string): Sci | null {
  let s = input.trim().replace(/[,\s]/g, "").replace(/[−–]/g, "-");
  s = s.replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+$/, (m) => "^" + m.split("").map((c) => Object.keys(SUP).find((k) => SUP[k] === c)).join(""));
  const m = s.match(/^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+)|(?:[x×*·]10\^?([+-]?\d+)))?$/);
  if (!m || (!m[2] && !m[3])) return null;
  const neg = m[1] === "-", ip = m[2] || "", fp = m[3] || "", e = Number(m[4] ?? m[5] ?? 0);
  if (!Number.isFinite(e) || Math.abs(e) > 1e6) return null;
  let digits = ip + fp, point = ip.length + e;
  const lead = digits.match(/^0*/)![0].length;
  digits = digits.slice(lead); point -= lead;
  if (!digits.replace(/0/g, "")) return { neg: false, digits: "0", exp: 0, zero: true };
  // Trailing zeros are significant only when a decimal point was written (12.300); for 12300 they're ambiguous → dropped.
  if (m[3] === undefined) digits = digits.replace(/0+$/, "") || "0";
  return { neg, digits, exp: point - 1, zero: false };
}

/** Round to n significant figures (half up), exactly. */
export function roundSig(x: Sci, n: number): Sci {
  if (x.zero || x.digits.length <= n) return { ...x, digits: x.digits.padEnd(n, "0") };
  const keep = x.digits.slice(0, n).split("").map(Number);
  let carry = Number(x.digits[n]) >= 5 ? 1 : 0, exp = x.exp;
  for (let i = keep.length - 1; i >= 0 && carry; i--) { const v = keep[i] + carry; keep[i] = v % 10; carry = v >= 10 ? 1 : 0; }
  if (carry) { keep.unshift(1); keep.pop(); exp++; }
  return { ...x, digits: keep.join(""), exp };
}

export const mantissa = (x: Sci, shift = 0) => {
  const d = x.digits.padEnd(shift + 1, "0");
  const m = d.slice(0, shift + 1) + (d.length > shift + 1 ? "." + d.slice(shift + 1) : "");
  return (x.neg ? "-" : "") + m;
};
export const toSci = (x: Sci) => (x.zero ? "0" : `${mantissa(x)} × 10${sup(x.exp)}`);
export const toE = (x: Sci) => (x.zero ? "0" : `${mantissa(x)}e${x.exp >= 0 ? "+" : ""}${x.exp}`);

export function toDecimal(x: Sci) {
  if (x.zero) return "0";
  const point = x.exp + 1, d = x.digits;
  let out: string;
  if (point <= 0) out = "0." + "0".repeat(-point) + d;
  else if (point >= d.length) out = d + "0".repeat(point - d.length);
  else out = d.slice(0, point) + "." + d.slice(point);
  const [i, f] = out.split(".");
  return (x.neg ? "-" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (f ? "." + f : "");
}

const PREFIX: Record<number, string> = { 30: "Q (quetta)", 27: "R (ronna)", 24: "Y (yotta)", 21: "Z (zetta)", 18: "E (exa)", 15: "P (peta)", 12: "T (tera)", 9: "G (giga)", 6: "M (mega)", 3: "k (kilo)", 0: "", [-3]: "m (milli)", [-6]: "µ (micro)", [-9]: "n (nano)", [-12]: "p (pico)", [-15]: "f (femto)", [-18]: "a (atto)", [-21]: "z (zepto)", [-24]: "y (yocto)", [-27]: "r (ronto)", [-30]: "q (quecto)" };
export function toEng(x: Sci) {
  if (x.zero) return { text: "0", prefix: "" };
  const e3 = Math.floor(x.exp / 3) * 3;
  return { text: `${mantissa(x, x.exp - e3)} × 10${sup(e3)}`, prefix: PREFIX[e3] ?? "" };
}

/** For arithmetic: JS number → Sci (≈15–17 significant digits). */
export function fromNumber(n: number): Sci | null {
  if (!Number.isFinite(n)) return null;
  return parseSci(n.toExponential());
}
export const toNumber = (x: Sci) => Number(toE(x));
