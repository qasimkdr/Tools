/** Length conversion to feet (pure). Used by volume/material calculators. */
export const TO_FT = { ft: 1, in: 1 / 12, yd: 3, m: 3.28084, cm: 0.0328084 } as const;
export type LengthUnit = keyof typeof TO_FT;
export const LENGTH_UNITS: LengthUnit[] = ["ft", "in", "yd", "m", "cm"];
export const toFt = (v: string | number, u: string) => Number(v) * (TO_FT[u as LengthUnit] ?? 1);
export const FT3_PER_YD3 = 27;
export const M3_PER_FT3 = 0.0283168;
export const LB_PER_TON = 2000; // US short ton
