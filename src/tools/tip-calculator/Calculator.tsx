"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const money = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "–");
const PRESETS = ["10", "15", "18", "20", "22", "25"];
const r2 = (x: number) => Math.round(x * 100) / 100;

export default function TipCalculator() {
  const [s, set] = useUrlState({ mode: "tip", bill: "80", tax: "", tip: "18", on: "pre", n: "1", round: "none", paid: "" });
  const bill = Number(s.bill), tax = Number(s.tax) || 0, pct = Number(s.tip), n = Math.floor(Number(s.n) || 0);
  const reverse = s.mode === "reverse";
  const base = s.on === "post" ? bill : bill - tax; // bill is the receipt total including any tax entered
  let tip = r2((base * pct) / 100);
  let total = r2(bill + tip);
  if (s.round === "tip") { tip = Math.ceil(tip); total = r2(bill + tip); }
  if (s.round === "total") { total = Math.ceil(total); tip = r2(total - bill); }
  const each = s.round === "each" ? Math.ceil(total / n) : total / n;
  if (s.round === "each") { total = r2(each * n); tip = r2(total - bill); }
  const effPre = (tip / (bill - tax)) * 100;
  const paid = Number(s.paid), revTip = paid - bill, revPct = (revTip / (bill - tax)) * 100;
  const err = !(bill > 0) ? "Enter the bill amount." : tax < 0 || tax >= bill ? "Tax must be less than the bill." : reverse
    ? !(paid >= bill) ? "Enter the total you paid (bill plus tip)." : null
    : !(pct >= 0 && pct <= 100) ? "Enter a tip percentage from 0 to 100." : !(n >= 1 && n <= 100) ? "Enter how many people are paying (1–100)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Tip calculator">
        <Segmented label="I want to" value={reverse ? "reverse" : "tip"} onChange={(v) => set("mode", v)} options={[{ id: "tip", label: "Work out the tip" }, { id: "reverse", label: "Find the % I tipped" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="bill" label="Bill total (on the receipt)" prefix="$" value={s.bill} onChange={(v) => set("bill", v)} min={0} />
          <Field id="tax" label="Tax on the bill (optional)" prefix="$" value={s.tax} onChange={(v) => set("tax", v)} min={0} hint="To tip on the pre-tax amount" />
        </div>
        {reverse ? (
          <Field id="paid" label="Total you paid, including tip" prefix="$" value={s.paid} onChange={(v) => set("paid", v)} min={0} />
        ) : <>
          <div>
            <Field id="tip" label="Tip" suffix="%" value={s.tip} onChange={(v) => set("tip", v)} min={0} />
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((p) => <button key={p} type="button" aria-pressed={s.tip === p} className={`btn-ghost px-3 py-1.5 text-xs ${s.tip === p ? "ring-2 ring-[var(--color-brand-500)]" : ""}`} onClick={() => set("tip", p)}>{p}%</button>)}
            </div>
          </div>
          {tax > 0 && <Segmented label="Tip on" value={s.on === "post" ? "post" : "pre"} onChange={(v) => set("on", v)} options={[{ id: "pre", label: "Amount before tax" }, { id: "post", label: "Total with tax" }]} />}
          <div className="grid grid-cols-2 gap-3">
            <Field id="n" label="Split between" suffix="people" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
            <div>
              <label htmlFor="round" className="label">Round up</label>
              <select id="round" className="field" value={s.round} onChange={(e) => set("round", e.target.value)}>
                <option value="none">Don&apos;t round</option>
                <option value="tip">Tip to the next $1</option>
                <option value="total">Total to the next $1</option>
                <option value="each">Each person&apos;s share to the next $1</option>
              </select>
            </div>
          </div>
        </>}
      </form>
      {reverse ? (
        <ResultCard error={err} label="You tipped" value={err ? "–" : <span data-testid="rev-pct">{revPct.toFixed(1)}%</span>}>
          {!err && <p className="mt-2 text-sm muted">A tip of <strong>${money(revTip)}</strong> on ${money(bill - tax)}{tax > 0 ? " before tax" : ""}.{tax > 0 && ` On the total with tax, that is ${((revTip / bill) * 100).toFixed(1)}%.`}</p>}
        </ResultCard>
      ) : (
        <ResultCard error={err} label="Tip" value={err ? "–" : <span data-testid="tip-amt">${money(tip)}</span>}>
          {!err && <>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Total with tip" v={<span data-testid="total">${money(total)}</span>} />
              <Stat k={n > 1 ? `Each of ${n} pays` : "You pay"} v={<span data-testid="each">${money(n > 1 ? each : total)}</span>} />
              {s.round !== "none" && <Stat k="Tip after rounding" v={`${effPre.toFixed(1)}% of the pre-tax bill`} />}
              {n > 1 && <Stat k="Tip per person" v={`$${money(tip / n)}`} />}
            </dl>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm" data-testid="tip-table">
                <thead><tr className="text-left subtle"><th className="py-1">Tip %</th><th>Tip</th><th>Total</th>{n > 1 && <th className="text-right">Each</th>}</tr></thead>
                <tbody>
                  {[10, 15, 18, 20, 22, 25].map((p) => { const t = r2((base * p) / 100); return (
                    <tr key={p} className={`border-t border-[var(--border)] ${String(p) === s.tip ? "font-semibold" : ""}`}><td className="py-1">{p}%</td><td>${money(t)}</td><td>${money(bill + t)}</td>{n > 1 && <td className="text-right">${money((bill + t) / n)}</td>}</tr>
                  ); })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs subtle">Etiquette guides suggest 15–20% of the pre-tax bill for sit-down service. Need to split by what each person ordered? Use the split calculator.</p>
          </>}
        </ResultCard>
      )}
    </div>
  );
}
