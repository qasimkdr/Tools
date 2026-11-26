"use client";
import { useState } from "react";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { cleanSequence, countBases, gcContent, gcSkew, meltingTemp, reverseComplement, slidingGc } from "@/lib/dna";

const p2 = (x: number) => (Number.isFinite(x) ? `${(x * 100).toFixed(2)}%` : "–");

export default function GcCalculator() {
  const [s, set] = useUrlState({ seq: "ATGCGCGATTACGCGTATAGCGC", win: "10" });
  const [copied, setCopied] = useState(false);
  const seq = cleanSequence(s.seq);
  const c = countBases(seq);
  const rna = c.U > 0 && c.T === 0;
  const known = c.A + c.T + c.U + c.G + c.C;
  const err = !seq ? "Paste a DNA or RNA sequence (A, C, G, T or U). FASTA headers are ignored." : !known ? "No A, C, G, T or U bases found." : c.T > 0 && c.U > 0 ? "The sequence mixes T and U. Use T for DNA or U for RNA." : null;
  const gc = gcContent(c), tm = meltingTemp(c);
  const win = Math.max(2, Math.min(1000, Math.round(Number(s.win) || 10)));
  const windows = !err && seq.length >= win * 2 ? slidingGc(seq, win, Math.max(1, Math.round(win / 2))) : [];
  const rc = err ? "" : reverseComplement(seq, rna);
  const copy = () => { try { navigator.clipboard.writeText(rc).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {}); } catch {} };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="GC content calculator">
        <div>
          <label htmlFor="seq" className="label">DNA or RNA sequence</label>
          <textarea id="seq" rows={7} className="field font-mono text-sm" value={s.seq} onChange={(e) => set("seq", e.target.value)} spellCheck={false} maxLength={200000} />
          <p className="mt-1 text-xs subtle">Paste plain bases or FASTA. Spaces, line breaks and numbers are ignored; N and other IUPAC codes are counted but left out of GC%.</p>
        </div>
        <Field id="win" label="Window size for GC% by region" suffix="bases" value={s.win} onChange={(v) => set("win", v)} min={2} inputMode="numeric" />
      </form>
      <ResultCard error={err} label={`GC content (${rna ? "RNA" : "DNA"}, ${seq.length.toLocaleString("en-US")} bases)`} value={err ? "–" : <span data-testid="gc">{p2(gc)}</span>}>
        {!err && <>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full" aria-hidden>
            <span style={{ width: `${(c.G / known) * 100}%`, background: "#0d6b5a" }} /><span style={{ width: `${(c.C / known) * 100}%`, background: "#3fbf9f" }} />
            <span style={{ width: `${(c.A / known) * 100}%`, background: "#f59e0b" }} /><span style={{ width: `${((c.T + c.U) / known) * 100}%`, background: "#fbbf77" }} />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <Stat k={rna ? "AU content" : "AT content"} v={<span data-testid="at">{p2(1 - gc)}</span>} />
            <Stat k="G / C" v={`${c.G.toLocaleString("en-US")} / ${c.C.toLocaleString("en-US")}`} />
            <Stat k={rna ? "A / U" : "A / T"} v={`${c.A.toLocaleString("en-US")} / ${(rna ? c.U : c.T).toLocaleString("en-US")}`} />
            <Stat k="GC skew (G−C)/(G+C)" v={<span data-testid="skew">{Number.isFinite(gcSkew(c)) ? gcSkew(c).toFixed(3) : "–"}</span>} />
            <Stat k="Estimated Tm" v={<span data-testid="tm">{Number.isFinite(tm.tm) ? `${tm.tm.toFixed(1)} °C` : "–"}</span>} />
            <Stat k="Other / N bases" v={(c.N + c.other).toLocaleString("en-US")} />
          </dl>
          <p className="mt-2 text-xs subtle">Tm method: {tm.method}. A rough guide for primers in standard conditions; use a nearest-neighbor tool for final PCR design.</p>
          <h2 className="mt-5 text-sm font-semibold">Reverse complement</h2>
          <div className="mt-2 flex items-start gap-2">
            <code className="block max-h-24 flex-1 overflow-auto break-all rounded-lg bg-[var(--surface-2)] p-2 text-xs" data-testid="rc">{rc.length > 5000 ? rc.slice(0, 5000) + "…" : rc}</code>
            <button type="button" className="btn-ghost px-3 py-1.5 text-xs" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
          </div>
          {windows.length > 0 && <>
            <h2 className="mt-5 text-sm font-semibold">GC% by region ({win}-base windows)</h2>
            <div className="mt-2 flex h-24 items-end gap-px" role="img" aria-label="GC percentage across the sequence">
              {windows.slice(0, 400).map((w) => <div key={w.start} className="flex-1 bg-[var(--color-brand-500)]" style={{ height: `${w.gc * 100}%`, minWidth: 1 }} title={`From base ${w.start}: ${p2(w.gc)}`} />)}
            </div>
            <p className="mt-1 text-xs subtle">Lowest {p2(Math.min(...windows.map((w) => w.gc)))}, highest {p2(Math.max(...windows.map((w) => w.gc)))}.</p>
          </>}
        </>}
      </ResultCard>
    </div>
  );
}
