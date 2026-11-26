"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { analyze } from "@/lib/boolean";

const EXAMPLES = ["AB + A'C + BC", "(A + B)(A + C)", "A'B'C + A'BC + AB'C + ABC", "!(A & B) | C", "A XOR B XOR C"];

function run(src: string) {
  try { return { r: analyze(src), e: null as string | null }; } catch (e) { return { r: null, e: (e as Error).message }; }
}

export default function BooleanAlgebraCalculator() {
  const [s, set] = useUrlState({ expr: "AB + A'C + BC", cmp: "" });
  const { r, e } = run(s.expr);
  const c = s.cmp.trim() ? run(s.cmp) : null;
  let eq: { same: boolean; row?: string } | null = null;
  if (r && c?.r) {
    const vars = [...new Set([...r.vars, ...c.r.vars])].sort();
    if (vars.length <= 8) {
      const ra = r, rb = c.r;
      const val = (x: typeof ra, m: number) => { const env: Record<string, boolean> = {}; vars.forEach((v, i) => { env[v] = ((m >> (vars.length - 1 - i)) & 1) === 1; }); return x.table[x.vars.reduce((acc, v) => (acc << 1) | (env[v] ? 1 : 0), 0)]; };
      let diff = -1;
      for (let m = 0; m < 1 << vars.length && diff < 0; m++) if (val(ra, m) !== val(rb, m)) diff = m;
      eq = diff < 0 ? { same: true } : { same: false, row: vars.map((v, i) => `${v}=${(diff >> (vars.length - 1 - i)) & 1}`).join(", ") };
    }
  }
  const n = r?.vars.length ?? 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(ev) => ev.preventDefault()} aria-label="Boolean algebra calculator">
          <div>
            <label htmlFor="expr" className="label">Boolean expression</label>
            <input id="expr" className="field font-mono" value={s.expr} onChange={(ev) => set("expr", ev.target.value)} spellCheck={false} autoComplete="off" />
            <p className="mt-1 text-xs subtle">Variables are single letters (AB means A AND B). NOT: A&apos; or !A or ~A · AND: AB, A·B, A*B, A&amp;B · OR: A+B, A|B · XOR: A^B · also AND, OR, NOT, XOR, NAND, NOR · 0 and 1.</p>
          </div>
          <div className="flex flex-wrap gap-2">{EXAMPLES.map((x) => <button key={x} type="button" className="btn-ghost px-2.5 py-1 font-mono text-xs" onClick={() => set("expr", x)}>{x}</button>)}</div>
          <div>
            <label htmlFor="cmp" className="label">Compare with (optional)</label>
            <input id="cmp" className="field font-mono" value={s.cmp} onChange={(ev) => set("cmp", ev.target.value)} placeholder="e.g. AB + A'C" spellCheck={false} autoComplete="off" />
          </div>
        </form>
        <ResultCard error={e} label="Simplified (minimal sum of products)" value={r ? <span className="font-mono" data-testid="sop">{r.sop}</span> : "–"}>
          {r && <>
            <dl className="mt-3 grid gap-3 text-sm">
              <Stat k="Minimal product of sums (POS)" v={<span className="font-mono" data-testid="pos">{r.pos}</span>} />
              <Stat k={`Minterms (${n} variable${n === 1 ? "" : "s"}: ${r.vars.join(", ") || "none"})`} v={<span className="font-mono" data-testid="minterms">{r.ones.length ? `Σm(${r.ones.join(", ")})` : "none"}</span>} />
              <Stat k="Maxterms" v={<span className="font-mono">{r.zeros.length ? `ΠM(${r.zeros.join(", ")})` : "none"}</span>} />
              <Stat k="Type" v={<span data-testid="kind">{r.kind === "tautology" ? "Tautology (always 1)" : r.kind === "contradiction" ? "Contradiction (always 0)" : `True in ${r.ones.length} of ${r.table.length} rows`}</span>} />
            </dl>
            {c && <p className="mt-3 rounded-lg bg-[var(--surface-2)] p-2 text-sm" data-testid="equiv">{c.e ? `Second expression: ${c.e}` : !eq ? "Too many variables to compare (max 8)." : eq.same ? "✓ The two expressions are equivalent." : `✗ Not equivalent. They differ at ${eq.row}.`}</p>}
          </>}
        </ResultCard>
      </div>
      {r && n > 0 && (
        <div>
          <h2 className="text-base font-semibold">Truth table</h2>
          <div className="mt-3 max-h-96 overflow-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-center font-mono text-sm" data-testid="truth">
              <thead className="sticky top-0 bg-[var(--surface-2)]"><tr><th className="py-1.5">#</th>{r.vars.map((v) => <th key={v}>{v}</th>)}<th>Output</th></tr></thead>
              <tbody>{r.table.map((out, m) => (
                <tr key={m} className={`border-t border-[var(--border)] ${out ? "bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)]" : ""}`}>
                  <td className="py-1 subtle">{m}</td>{r.vars.map((v, i) => <td key={v}>{(m >> (n - 1 - i)) & 1}</td>)}<td className="font-semibold">{out ? 1 : 0}</td>
                </tr>))}</tbody>
            </table>
          </div>
          <p className="mt-2 text-xs subtle">Row numbers are the minterm indexes: the inputs read as a binary number with {r.vars[0]} as the most significant bit.</p>
        </div>
      )}
    </div>
  );
}
