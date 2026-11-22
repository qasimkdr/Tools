/** Format decimal feet as feet-inches with a fraction (default 1/16 inch), e.g. 13.3465 → 13′ 4 3⁄16″. Pure. */
export function ftIn(feet: number, denom = 16) {
  if (!Number.isFinite(feet)) return "—";
  const neg = feet < 0; let total = Math.round(Math.abs(feet) * 12 * denom); // in 1/denom inches
  const ft = Math.floor(total / (12 * denom)); total -= ft * 12 * denom;
  const inch = Math.floor(total / denom); let num = total - inch * denom, den = denom;
  while (num && num % 2 === 0) { num /= 2; den /= 2; }
  return `${neg ? "-" : ""}${ft}′ ${inch}${num ? ` ${num}/${den}` : ""}″`;
}
