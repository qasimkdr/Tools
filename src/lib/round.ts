/**
 * Exact decimal rounding (no floating-point errors: 2.675 rounds to 2.68, 1.005 to 1.01).
 * Numbers are held as BigInt digits with a decimal scale. Pure functions.
 */
export type RoundMode = "half-up" | "half-even" | "half-down" | "up" | "down" | "ceiling" | "floor";
export const MODE_LABEL: Record<RoundMode, string> = {
  "half-up": "Half up (standard)",
  "half-even": "Half to even (banker's)",
  "half-down": "Half down",
  up: "Up (away from zero)",
  down: "Down (truncate)",
  ceiling: "Ceiling (toward +∞)",
  floor: "Floor (toward −∞)",
};

export type Dec = { n: bigint; scale: number }; // value = n × 10^-scale

export function parseDec(raw: string): Dec | null {
  const s = raw.trim().replace(/[,\s_]/g, "").replace(/^−/, "-");
  const m = s.match(/^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/);
  if (!m || (!m[2] && !m[3])) return null;
  const digits = (m[2] || "") + (m[3] || "");
  let scale = (m[3] || "").length - (m[4] ? Number(m[4]) : 0);
  let n = BigInt(digits || "0");
  if (scale < 0) { n *= 10n ** BigInt(-scale); scale = 0; }
  return { n: m[1] === "-" ? -n : n, scale };
}

const pow10 = (k: number) => 10n ** BigInt(k);
const abs = (x: bigint) => (x < 0n ? -x : x);

/** Round x to the nearest multiple of step (step > 0) using mode. */
export function roundToStep(x: Dec, step: Dec, mode: RoundMode): Dec {
  const scale = Math.max(x.scale, step.scale);
  const xn = x.n * pow10(scale - x.scale), sn = step.n * pow10(scale - step.scale);
  if (sn <= 0n) throw new Error("Step must be positive.");
  const neg = xn < 0n, a = abs(xn);
  let q = a / sn; const r = a % sn;
  if (r !== 0n) {
    const twice = 2n * r;
    let bump = false;
    switch (mode) {
      case "half-up": bump = twice >= sn; break;
      case "half-down": bump = twice > sn; break;
      case "half-even": bump = twice > sn || (twice === sn && q % 2n === 1n); break;
      case "up": bump = true; break;
      case "down": bump = false; break;
      case "ceiling": bump = !neg; break;
      case "floor": bump = neg; break;
    }
    if (bump) q += 1n;
  }
  const res = q * sn;
  return { n: neg ? -res : res, scale };
}

/** Round to a number of decimal places (negative places: tens, hundreds, …). */
export function roundToPlaces(x: Dec, places: number, mode: RoundMode): Dec {
  const step: Dec = places >= 0 ? { n: 1n, scale: places } : { n: pow10(-places), scale: 0 };
  return trimTo(roundToStep(x, step, mode), Math.max(0, places));
}

/** Position of the first significant digit: 0 for units, 1 for tens, −1 for tenths … (null for zero). */
export function leadingExponent(x: Dec): number | null {
  if (x.n === 0n) return null;
  return abs(x.n).toString().length - 1 - x.scale;
}

/** Round to n significant figures. */
export function roundToSigFigs(x: Dec, sig: number, mode: RoundMode): Dec {
  const e = leadingExponent(x);
  if (e === null) return { n: 0n, scale: Math.max(0, sig - 1) };
  let r = roundToPlaces(x, sig - 1 - e, mode);
  const e2 = leadingExponent(r); // 9.99 → 10.0 can gain a digit
  if (e2 !== null && e2 > e) r = roundToPlaces(x, sig - 1 - e2, mode);
  return r;
}

/** Re-express with exactly `places` decimals (only removes zeros that rounding guaranteed). */
export function trimTo(x: Dec, places: number): Dec {
  if (x.scale === places) return x;
  if (x.scale > places) return { n: x.n / pow10(x.scale - places), scale: places };
  return { n: x.n * pow10(places - x.scale), scale: places };
}

export function formatDec(x: Dec, group = false): string {
  const neg = x.n < 0n, s = abs(x.n).toString().padStart(x.scale + 1, "0");
  let int = x.scale ? s.slice(0, -x.scale) : s;
  const frac = x.scale ? s.slice(-x.scale) : "";
  if (group) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (neg && x.n !== 0n ? "−" : "") + int + (frac ? "." + frac : "");
}

/** The digit just right of the rounding place (the "decider"), for place-value explanations. */
export function deciderDigit(x: Dec, places: number): number {
  const shifted = abs(x.n) * pow10(Math.max(0, places + 1 - x.scale)) / pow10(Math.max(0, x.scale - places - 1));
  return Number(shifted % 10n);
}

export const PLACE_NAMES: Record<number, string> = {
  [-6]: "million", [-5]: "hundred thousand", [-4]: "ten thousand", [-3]: "thousand", [-2]: "hundred", [-1]: "ten", 0: "whole number",
  1: "tenth", 2: "hundredth", 3: "thousandth", 4: "ten-thousandth", 5: "hundred-thousandth", 6: "millionth",
};
