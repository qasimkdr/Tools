/** DNA / RNA sequence helpers (pure): base counts, GC content, GC skew, melting temperature estimates. */
export type BaseCounts = { A: number; T: number; U: number; G: number; C: number; N: number; other: number; length: number };

/** Clean a pasted sequence: drops FASTA header lines, whitespace and digits; uppercases. */
export function cleanSequence(raw: string): string {
  return raw.split(/\r?\n/).filter((l) => !l.trim().startsWith(">")).join("").replace(/[\s\d]/g, "").toUpperCase();
}

export function countBases(seq: string): BaseCounts {
  const c: BaseCounts = { A: 0, T: 0, U: 0, G: 0, C: 0, N: 0, other: 0, length: seq.length };
  for (const ch of seq) {
    if (ch === "A" || ch === "T" || ch === "U" || ch === "G" || ch === "C" || ch === "N") c[ch]++;
    else if ("RYSWKMBDHV".includes(ch)) c.other++; // IUPAC ambiguity codes
    else c.other++;
  }
  return c;
}

/** GC content as a fraction of A/T/U/G/C bases (ambiguous bases excluded from the denominator). */
export function gcContent(c: BaseCounts) {
  const known = c.A + c.T + c.U + c.G + c.C;
  return known ? (c.G + c.C) / known : NaN;
}
export const gcSkew = (c: BaseCounts) => (c.G + c.C ? (c.G - c.C) / (c.G + c.C) : NaN);

/**
 * Basic Tm estimates (Sigma-Aldrich): Wallace rule 2(A+T) + 4(G+C) for sequences under 14 nt;
 * 64.9 + 41 × (G + C − 16.4) / N for longer sequences. Rough guides only; nearest-neighbor models are more accurate.
 */
export function meltingTemp(c: BaseCounts) {
  const at = c.A + c.T + c.U, gc = c.G + c.C, n = at + gc;
  if (!n) return { tm: NaN, method: "" };
  if (n < 14) return { tm: 2 * at + 4 * gc, method: "Wallace rule: 2(A+T) + 4(G+C)" };
  return { tm: 64.9 + (41 * (gc - 16.4)) / n, method: "64.9 + 41 × (G + C − 16.4) ÷ N" };
}

export function reverseComplement(seq: string, rna = false): string {
  const map: Record<string, string> = { A: rna ? "U" : "T", T: "A", U: "A", G: "C", C: "G", N: "N" };
  return [...seq].reverse().map((b) => map[b] ?? "N").join("");
}

/** GC% in sliding windows (for spotting GC-rich or AT-rich regions). */
export function slidingGc(seq: string, window: number, step: number) {
  const out: { start: number; gc: number }[] = [];
  if (window < 1 || seq.length < window) return out;
  for (let i = 0; i + window <= seq.length; i += step) {
    const c = countBases(seq.slice(i, i + window));
    out.push({ start: i + 1, gc: gcContent(c) });
  }
  return out;
}
