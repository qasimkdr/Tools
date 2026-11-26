/** Brick and mortar estimate from brick and joint geometry (pure, inches / square feet). */
export type BrickSize = { id: string; label: string; l: number; h: number; d: number; joint: number; metric?: boolean };
const MM = 1 / 25.4;
export const BRICKS: BrickSize[] = [
  { id: "modular", label: "US modular (7⅝ × 2¼ × 3⅝ in)", l: 7.625, h: 2.25, d: 3.625, joint: 0.375 },
  { id: "standard", label: "US standard (8 × 2¼ × 3⅝ in)", l: 8, h: 2.25, d: 3.625, joint: 0.375 },
  { id: "utility", label: "US utility (11⅝ × 3⅝ × 3⅝ in)", l: 11.625, h: 3.625, d: 3.625, joint: 0.375 },
  { id: "uk", label: "UK / metric (215 × 65 × 102.5 mm)", l: 215 * MM, h: 65 * MM, d: 102.5 * MM, joint: 10 * MM, metric: true },
];

export function bricks(o: { areaSqft: number; l: number; h: number; d: number; joint: number; wastePct: number }) {
  const perSqft = 144 / ((o.l + o.joint) * (o.h + o.joint));
  const net = o.areaSqft * perSqft;
  const mortarPerBrickCuIn = (o.l + o.joint) * (o.h + o.joint) * o.d - o.l * o.h * o.d; // bed + head joint share
  return {
    perSqft, net, total: Math.ceil(net * (1 + o.wastePct / 100) - 1e-9),
    mortarCuFt: (net * mortarPerBrickCuIn) / 1728, mortarPer1000: (1000 * mortarPerBrickCuIn) / 1728,
  };
}
