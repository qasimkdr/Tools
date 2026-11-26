/** Heart rate formulas (pure). CDC: max ≈ 220 − age; moderate 64–76% and vigorous 77–93% of max. */
export const FORMULAS = {
  fox: { label: "220 − age (CDC, Fox)", f: (a: number) => 220 - a },
  tanaka: { label: "Tanaka: 208 − 0.7 × age", f: (a: number) => 208 - 0.7 * a },
  nes: { label: "Nes: 211 − 0.64 × age", f: (a: number) => 211 - 0.64 * a },
  gulati: { label: "Gulati (women): 206 − 0.88 × age", f: (a: number) => 206 - 0.88 * a },
} as const;
export type Formula = keyof typeof FORMULAS;

/** Target at an intensity (fraction). With a resting HR, uses the Karvonen heart-rate-reserve method. */
export const target = (max: number, pct: number, rest?: number) => (rest && rest > 0 ? rest + pct * (max - rest) : pct * max);

export const ZONES = [
  { n: 1, name: "Very light / recovery", lo: 0.5, hi: 0.6 },
  { n: 2, name: "Light / endurance", lo: 0.6, hi: 0.7 },
  { n: 3, name: "Moderate / aerobic", lo: 0.7, hi: 0.8 },
  { n: 4, name: "Hard / threshold", lo: 0.8, hi: 0.9 },
  { n: 5, name: "Maximum", lo: 0.9, hi: 1.0 },
];
