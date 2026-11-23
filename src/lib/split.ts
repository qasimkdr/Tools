/** Bill splitting with exact cents: every share is rounded so the shares always add up to the bill. */

/** Split `total` (in cents) into parts proportional to `weights`, largest-remainder rounding. */
export function allocate(totalCents: number, weights: number[]): number[] {
  const W = weights.reduce((a, b) => a + b, 0);
  if (!(W > 0)) return weights.map(() => 0);
  const raw = weights.map((w) => (totalCents * w) / W);
  const base = raw.map(Math.floor);
  let left = totalCents - base.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => ({ i, f: r - Math.floor(r) })).sort((a, b) => b.f - a.f || a.i - b.i);
  for (let k = 0; left > 0 && k < order.length; k++, left--) base[order[k].i]++;
  return base;
}
export const cents = (x: number) => Math.round(x * 100);

export type SplitInput = {
  people: { name: string; own: number }[]; // own items (0 for an even split)
  shared: number;                           // items everyone shares equally
  taxPct: number;
  tipPct: number;
  tipOn: "pre" | "post";                    // tip on the pre-tax subtotal or on subtotal + tax
  tipSplit: "prop" | "equal";
  roundTo: number;                          // 0 = exact; 1 or 5 = round each share up
};
export type SplitRow = { name: string; food: number; tax: number; tip: number; total: number; pays: number };
export type SplitResult = { rows: SplitRow[]; subtotal: number; tax: number; tip: number; total: number; collected: number; extra: number };

export function splitBill(inp: SplitInput): SplitResult {
  const n = inp.people.length;
  const sharedEach = allocate(cents(inp.shared), inp.people.map(() => 1));
  const food = inp.people.map((p, i) => cents(p.own) + sharedEach[i]);
  const subtotal = food.reduce((a, b) => a + b, 0);
  const tax = Math.round((subtotal * inp.taxPct) / 100);
  const tip = Math.round(((inp.tipOn === "pre" ? subtotal : subtotal + tax) * inp.tipPct) / 100);
  const taxEach = allocate(tax, food);
  const tipEach = inp.tipSplit === "equal" ? allocate(tip, food.map(() => 1)) : allocate(tip, food);
  const rows = inp.people.map((p, i) => {
    const total = food[i] + taxEach[i] + tipEach[i];
    const step = inp.roundTo * 100;
    const pays = step > 0 ? Math.ceil(total / step) * step : total;
    return { name: p.name || `Person ${i + 1}`, food: food[i] / 100, tax: taxEach[i] / 100, tip: tipEach[i] / 100, total: total / 100, pays: pays / 100 };
  });
  const total = subtotal + tax + tip;
  const collected = rows.reduce((a, r) => a + cents(r.pays), 0);
  return { rows, subtotal: subtotal / 100, tax: tax / 100, tip: tip / 100, total: total / 100, collected: collected / 100, extra: (collected - total) / 100, ...(n ? {} : {}) };
}

/** "Alex:32.5|Sam:18" ⇄ people list (for shareable URLs). */
export function parsePeople(s: string): { name: string; own: number }[] {
  return s.split("|").filter(Boolean).map((part) => { const i = part.lastIndexOf(":"); return { name: i >= 0 ? part.slice(0, i) : part, own: Number(i >= 0 ? part.slice(i + 1) : 0) || 0 }; });
}
export const serializePeople = (p: { name: string; own: number | string }[]) => p.map((x) => `${x.name.replace(/[|:]/g, " ")}:${x.own}`).join("|");
