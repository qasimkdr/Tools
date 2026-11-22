/**
 * Exact number-base conversion (pure). Integers use BigInt (any size); fractions are kept as an exact ratio so
 * terminating/repeating expansions are reported honestly.
 */
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";
export type Parsed = { neg: boolean; int: bigint; num: bigint; den: bigint }; // value = ±(int + num/den)

export function parseBase(input: string, base: number): Parsed | null {
  let s = input.trim().toLowerCase().replace(/[\s_]/g, "");
  if (base === 16) s = s.replace(/^(-?)0x/, "$1"); else if (base === 2) s = s.replace(/^(-?)0b/, "$1"); else if (base === 8) s = s.replace(/^(-?)0o/, "$1");
  const neg = s.startsWith("-"); if (neg) s = s.slice(1);
  if (!s || !/^[0-9a-z]*\.?[0-9a-z]*$/.test(s) || s === ".") return null;
  const [ip, fp = ""] = s.split(".");
  const B = BigInt(base);
  let int = 0n, num = 0n, den = 1n;
  for (const ch of ip) { const d = DIGITS.indexOf(ch); if (d < 0 || d >= base) return null; int = int * B + BigInt(d); }
  for (const ch of fp) { const d = DIGITS.indexOf(ch); if (d < 0 || d >= base) return null; num = num * B + BigInt(d); den *= B; }
  return { neg, int, num, den };
}

export const intToBase = (n: bigint, base: number) => (n < 0n ? "-" + (-n).toString(base) : n.toString(base));

/** Value in another base; fraction digits up to maxFrac, flagging when the expansion doesn't terminate. */
export function formatBase(p: Parsed, base: number, maxFrac = 24) {
  let out = p.int.toString(base);
  let exact = true;
  if (p.num > 0n) {
    let num = p.num, frac = "";
    const B = BigInt(base);
    for (let i = 0; i < maxFrac && num > 0n; i++) { num *= B; frac += DIGITS[Number(num / p.den)]; num %= p.den; }
    if (num > 0n) exact = false;
    out += "." + frac;
  }
  const zero = p.int === 0n && p.num === 0n;
  return { text: (p.neg && !zero ? "-" : "") + out, exact };
}

/** Two's complement bit pattern of an integer at a given width, or null if it doesn't fit. */
export function twosComplement(n: bigint, bits: number) {
  const min = -(1n << BigInt(bits - 1)), max = (1n << BigInt(bits - 1)) - 1n;
  if (n < min || n > max) return null;
  const v = n < 0n ? (1n << BigInt(bits)) + n : n;
  return v.toString(2).padStart(bits, "0");
}

export const group = (bin: string, size = 4) => {
  const [i, f] = bin.replace("-", "").split(".");
  const g = i.padStart(Math.ceil(i.length / size) * size, "0").match(new RegExp(`.{${size}}`, "g"))!.join(" ");
  return (bin.startsWith("-") ? "-" : "") + g + (f ? "." + f : "");
};

export const textToBinary = (t: string) => [...new TextEncoder().encode(t)].map((b) => b.toString(2).padStart(8, "0")).join(" ");
export function binaryToText(b: string) {
  const bytes = b.trim().split(/\s+/).filter(Boolean);
  if (!bytes.length || bytes.some((x) => !/^[01]{1,8}$/.test(x))) return null;
  try { return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes.map((x) => parseInt(x, 2)))); } catch { return null; }
}
