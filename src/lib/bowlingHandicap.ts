/** League bowling handicap (pure). Handicap = percentage × (basis − average), fractions dropped; none at or above basis. */
export function handicap(average: number, basis: number, pct: number) {
  if (!(average >= 0) || !(basis > 0) || !(pct >= 0)) return NaN;
  return Math.floor(Math.max(0, basis - Math.floor(average)) * (pct / 100) + 1e-9);
}
/** Book average: total pins ÷ games, fractions dropped. */
export const bookAverage = (pins: number, games: number) => (games > 0 ? Math.floor(pins / games + 1e-9) : NaN);
