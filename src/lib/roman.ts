/** Roman numerals (pure). Standard form 1–3,999; with an overline (vinculum, ×1,000) up to 3,999,999. */
const MAP: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
const VAL: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export function toRomanBasic(n: number): string {
  let out = "";
  for (const [v, s] of MAP) while (n >= v) { out += s; n -= v; }
  return out;
}
/** Returns the overlined part (to be shown with a bar, value × 1,000) and the plain part. */
export function toRoman(n: number): { over: string; plain: string; text: string } {
  if (!Number.isInteger(n) || n < 1 || n > 3999999) return { over: "", plain: "", text: "" };
  if (n < 4000) { const p = toRomanBasic(n); return { over: "", plain: p, text: p }; }
  const th = Math.floor(n / 1000), rest = n % 1000;
  const over = toRomanBasic(th), plain = toRomanBasic(rest);
  return { over, plain, text: [...over].map((c) => c + "̅").join("") + plain };
}
/** Breakdown by place value, e.g. 1994 → 1000 M + 900 CM + 90 XC + 4 IV. */
export function breakdown(n: number): { value: number; roman: string }[] {
  const parts: { value: number; roman: string }[] = [];
  for (const place of [1000, 100, 10, 1]) {
    const v = Math.floor(n / place) * place;
    n -= v;
    if (v) parts.push({ value: v, roman: toRomanBasic(v) });
  }
  return parts;
}
const STRICT = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
/** Parse a numeral; accepts non-standard forms (e.g. IIII) and reports the standard spelling. Overline: prefix with _ or use combining macrons. */
export function fromRoman(raw: string): { value: number; standard: string; valid: boolean; error?: string } {
  let s = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!s) return { value: NaN, standard: "", valid: false, error: "Enter a Roman numeral." };
  let thousands = 0;
  const m = s.match(/^((?:[IVXLCDM]̅)+)(.*)$/) || s.match(/^\(([IVXLCDM]+)\)(.*)$/) || s.match(/^_([IVXLCDM]+)_?(.*)$/);
  if (m) { const inner = m[1].replace(/̅/g, ""); const r = fromRoman(inner); if (!Number.isFinite(r.value)) return r; thousands = r.value * 1000; s = m[2]; }
  if (s && !/^[IVXLCDM]+$/.test(s)) return { value: NaN, standard: "", valid: false, error: "Use only the letters I, V, X, L, C, D and M." };
  let total = 0;
  for (let i = 0; i < s.length; i++) { const v = VAL[s[i]], next = VAL[s[i + 1]] ?? 0; total += v < next ? -v : v; }
  const value = thousands + total;
  if (!(value > 0)) return { value: NaN, standard: "", valid: false, error: "That isn't a valid numeral." };
  const std = toRoman(value).text;
  return { value, standard: std, valid: STRICT.test(s) && (thousands === 0 || total < 1000) };
}
