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

/** Stair tread boards: each tread is covered by full-width pieces cut from stock boards. */
export function stairTreads(steps: number, treadDepthIn: number, stairWidthFt: number, boardW: number, gap: number, boardLen: number) {
  if (!(steps > 0) || !(stairWidthFt > 0)) return { perTread: 0, pieces: 0, boards: 0, linear: 0 };
  const perTread = Math.ceil(treadDepthIn / (boardW + gap) - 1e-9);
  const pieces = steps * perTread;
  const perBoard = Math.max(1, Math.floor(boardLen / stairWidthFt + 1e-9));
  const boards = stairWidthFt > boardLen ? Math.ceil(pieces * (stairWidthFt / boardLen) - 1e-9) : Math.ceil(pieces / perBoard - 1e-9);
  return { perTread, pieces, boards, linear: pieces * stairWidthFt };
}
