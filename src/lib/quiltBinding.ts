/** Quilt binding (pure, inches). */
export type BindingInput = { width: number; length: number; strip: number; wof: number; extra: number };

/** Round up to the next 1/8 yard. */
export const yardsUp = (inches: number) => Math.ceil((inches / 36) * 8 - 1e-9) / 8;

export function binding(o: BindingInput) {
  const perimeter = 2 * (o.width + o.length);
  const total = perimeter + o.extra;
  const strips = Math.ceil(total / o.wof - 1e-9);
  const fabric = strips * o.strip; // inches of yardage for straight-grain strips cut across the width of fabric
  const biasArea = total * o.strip; // square inches of fabric for continuous bias
  const biasSquare = Math.ceil(Math.sqrt(biasArea) - 1e-9);
  return {
    perimeter, total, strips, fabric, yards: fabric / 36, buy: yardsUp(fabric),
    seams: Math.max(0, strips - 1), biasArea, biasSquare, biasBuy: yardsUp(biasSquare), totalYd: total / 36,
  };
}
