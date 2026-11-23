"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { parsePeople, serializePeople, splitBill } from "@/lib/split";

const money = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "–");

export default function SplitCalculator() {
  const [s, set] = useUrlState({ mode: "even", bill: "120", n: "4", p: "Alex:32.50|Sam:18|Jo:24.50", shared: "15", tax: "8", tip: "18", on: "pre", ts: "prop", round: "0" });
  const even = s.mode !== "items";
  const count = Math.floor(Number(s.n) || 0);
  const people = even
    ? Array.from({ length: count >= 1 && count <= 100 ? count : 0 }, (_, i) => ({ name: `Person ${i + 1}`, own: 0 }))
    : parsePeople(s.p);
  const shared = even ? Number(s.bill) || 0 : Number(s.shared) || 0;
  const tax = Number(s.tax) || 0, tip = Number(s.tip) || 0, roundTo = Number(s.round) || 0;
  const setPeople = (list: { name: string; own: number | string }[]) => set("p", serializePeople(list));
  const err = even
    ? !(Number(s.bill) > 0) ? "Enter the bill amount." : !people.length ? "Enter how many people are splitting (1–100)." : tax < 0 || tip < 0 ? "Tax and tip can't be negative." : null
    : !people.length ? "Add at least one person." : people.some((p) => p.own < 0) || shared < 0 || tax < 0 || tip < 0 ? "Amounts can't be negative." : !(people.reduce((a, p) => a + p.own, 0) + shared > 0) ? "Enter what each person ordered." : null;
  const r = err ? null : splitBill({ people, shared, taxPct: tax, tipPct: tip, tipOn: s.on === "post" ? "post" : "pre", tipSplit: s.ts === "equal" ? "equal" : "prop", roundTo });
  const uneven = r && new Set(r.rows.map((x) => x.total.toFixed(2))).size > 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Bill split calculator">
        <Segmented label="How to split" value={even ? "even" : "items"} onChange={(v) => set("mode", v)} options={[{ id: "even", label: "Evenly" }, { id: "items", label: "By what each person ordered" }]} />
        {even ? (
          <div className="grid grid-cols-2 gap-3">
            <Field id="bill" label="Bill before tax and tip" prefix="$" value={s.bill} onChange={(v) => set("bill", v)} min={0} />
            <Field id="n" label="Number of people" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
          </div>
        ) : (
          <div>
            <span className="label">Each person&apos;s own items (before tax)</span>
            <ul className="space-y-2" data-testid="people">
              {people.map((p, i) => (
                <li key={i} className="grid grid-cols-[minmax(0,1fr)_7rem_auto] items-center gap-2">
                  <input aria-label={`Name ${i + 1}`} className="field" value={p.name} onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} maxLength={30} />
                  <input aria-label={`Amount for person ${i + 1}`} className="field" inputMode="decimal" type="number" min={0} step="any" value={String(p.own)} onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, own: e.target.value } : x)))} />
                  <button type="button" className="btn-ghost px-3" aria-label={`Remove person ${i + 1}`} onClick={() => setPeople(people.filter((_, j) => j !== i))}>✕</button>
                </li>
              ))}
            </ul>
            <button type="button" className="btn-ghost mt-2" onClick={() => setPeople([...people, { name: `Person ${people.length + 1}`, own: 0 }])} disabled={people.length >= 30}>+ Add person</button>
            <div className="mt-3"><Field id="shared" label="Shared items (split equally)" prefix="$" value={s.shared} onChange={(v) => set("shared", v)} min={0} hint="Appetizers, a bottle for the table, delivery fee" /></div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field id="tax" label="Sales tax" suffix="%" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
          <Field id="tip" label="Tip" suffix="%" value={s.tip} onChange={(v) => set("tip", v)} min={0} />
        </div>
        <div className="flex flex-wrap gap-4">
          <Segmented label="Tip on" value={s.on === "post" ? "post" : "pre"} onChange={(v) => set("on", v)} options={[{ id: "pre", label: "Before tax" }, { id: "post", label: "After tax" }]} />
          {!even && <Segmented label="Share the tip" value={s.ts === "equal" ? "equal" : "prop"} onChange={(v) => set("ts", v)} options={[{ id: "prop", label: "By amount" }, { id: "equal", label: "Equally" }]} />}
          <Segmented label="Round each share up" value={(["0", "1", "5"].includes(s.round) ? s.round : "0") as "0" | "1" | "5"} onChange={(v) => set("round", v)} options={[{ id: "0", label: "Exact" }, { id: "1", label: "$1" }, { id: "5", label: "$5" }]} />
        </div>
      </form>
      <ResultCard error={err} label={even ? "Each person pays" : "Total bill"} value={r ? <span data-testid="each">${money(even ? r.rows[0].pays : r.total)}</span> : "–"}>
        {r && <>
          {even && uneven && <p className="mt-1 text-sm muted">The cents don&apos;t divide evenly, so some people pay one cent more and the shares add up exactly.</p>}
          <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
            <Stat k="Tax" v={`$${money(r.tax)}`} />
            <Stat k="Tip" v={<span data-testid="tip">${money(r.tip)}</span>} />
            <Stat k="Total" v={<span data-testid="total">${money(r.total)}</span>} />
          </dl>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm" data-testid="shares">
              <thead><tr className="text-left subtle"><th className="py-1">Who</th><th>Items</th><th>Tax</th><th>Tip</th><th className="text-right">Pays</th></tr></thead>
              <tbody>
                {(even ? r.rows.slice(0, 12) : r.rows).map((x, i) => (
                  <tr key={i} className="border-t border-[var(--border)]">
                    <td className="py-1 pr-2">{x.name}</td><td>{money(x.food)}</td><td>{money(x.tax)}</td><td>{money(x.tip)}</td>
                    <td className="text-right font-semibold" data-testid={`pays-${i}`}>${money(x.pays)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {even && r.rows.length > 12 && <p className="mt-1 text-xs subtle">…and {r.rows.length - 12} more people.</p>}
          {roundTo > 0 && <p className="mt-3 text-sm" data-testid="extra">Rounding up collects <strong>${money(r.collected)}</strong>, which is <strong>${money(r.extra)}</strong> over the bill. Leave it as extra tip or hand it back.</p>}
          <p className="mt-3 text-xs subtle">Tax is shared in proportion to what each person ordered. Shares are rounded to the cent so they always add up to the bill.</p>
        </>}
      </ResultCard>
    </div>
  );
}
