/** Deck boards, joists and screws (pure). Boards run along `length`; joists run across, spaced along the length. */
export type DeckInput = { length: number; width: number; boardW: number; gap: number; boardLen: number; wastePct: number; joistSpacing: number };

export function deck(o: DeckInput) {
  const rows = Math.ceil((o.width * 12) / (o.boardW + o.gap) - 1e-9);
  const linear = rows * o.length;
  const withWaste = linear * (1 + o.wastePct / 100);
  const boards = Math.ceil(withWaste / o.boardLen - 1e-9);
  const joists = Math.floor((o.length * 12) / o.joistSpacing + 1e-9) + 1;
  return { area: o.length * o.width, rows, linear, withWaste, boards, joists, joistLen: o.width, crossings: rows * joists, screws: rows * joists * 2 };
}
