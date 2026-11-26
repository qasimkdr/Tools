/** Wainscoting layout (pure, inches): equal panels or picture-frame boxes across one wall. */
export type WainscotInput = { wall: number; height: number; panels: number; gap: number; top: number; bottom: number; wastePct: number; stick: number };

export function layout(o: WainscotInput) {
  const panelW = (o.wall - (o.panels + 1) * o.gap) / o.panels;
  const panelH = o.height - o.top - o.bottom;
  const perBox = 2 * (panelW + panelH); // picture-frame moulding per box
  const moulding = perBox * o.panels;
  const withWaste = moulding * (1 + o.wastePct / 100);
  const battens = o.panels + 1; // board & batten / stiles between panels, including both ends
  return {
    panelW, panelH, perBox, moulding, withWaste,
    sticks: Math.ceil(withWaste / o.stick),
    chairRail: o.wall, baseboard: o.wall,
    battens, battenLength: panelH,
    centers: Array.from({ length: o.panels }, (_, i) => o.gap + panelW / 2 + i * (panelW + o.gap)),
    area: (o.wall * o.height) / 144,
  };
}

/** Panel count that brings panel width closest to a target width. */
export const suggestPanels = (wall: number, gap: number, target: number) => Math.max(1, Math.round((wall - gap) / (target + gap)));
