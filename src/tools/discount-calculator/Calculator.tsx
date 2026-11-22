"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";

type Mode = "sale" | "original" | "percent";
const DEFAULTS = { mode: "sale", price: "80", off: "25", type: "pct", off2: "", tax: "", sale: "45", orig: "50", salep: "35" };
const QUICK = [10, 15, 20, 25, 30, 40, 50, 70];
const n = (s: string) => (s.trim() === "" ? 0 : Number(s));

export default function DiscountCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const mode = (["sale", "original", "percent"].includes(s.mode) ? s.mode : "sale") as Mode;
  let error: string | null = null, label = "", value = "", stats: { k: string; v: string }[] = [], steps: string[] = [];
  const tax = n(s.tax) / 100;

  if (mode === "sale") {
    const P = n(s.price), d1 = n(s.off), d2 = n(s.off2);
    if (!(P > 0)) error = "Enter the original price.";
    else if (s.type === "pct" && (d1 < 0 || d1 > 100 || d2 < 0 || d2 > 100)) error = "Discounts must be between 0% and 100%.";
    else if (s.type === "amt" && (d1 < 0 || d1 > P)) error = "The amount off can't be more than the price.";
    else {
      const after1 = s.type === "pct" ? P * (1 - d1 / 100) : P - d1;
      const final = d2 > 0 && s.type === "pct" ? after1 * (1 - d2 / 100) : after1;
      const saved = P - final, effPct = (saved / P) * 100;
      label = "Sale price"; value = usd(final);
      stats = [{ k: "You save", v: usd(saved) }, { k: "Total discount", v: `${+effPct.toFixed(2)}%` }];
      if (tax > 0) stats.push({ k: `Tax (${+(tax * 100).toFixed(3)}%)`, v: usd(final * tax) }, { k: "Total with tax", v: usd(final * (1 + tax)) });
      steps = s.type === "pct"
        ? [`${usd(P)} × (1 − ${d1}%) = ${usd(after1)}`, ...(d2 > 0 ? [`${usd(after1)} × (1 − ${d2}%) = ${usd(final)}`, `Stacked total: ${+effPct.toFixed(2)}% off (not ${d1 + d2}%)`] : [])]
        : [`${usd(P)} − ${usd(d1)} = ${usd(final)}`, `${usd(d1)} ÷ ${usd(P)} = ${+effPct.toFixed(2)}% off`];
    }
  } else if (mode === "original") {
    const S = n(s.sale), d = n(s.off);
    if (!(S > 0) || !(d >= 0 && d < 100)) error = "Enter the sale price and a discount from 0% to less than 100%.";
    else { const O = S / (1 - d / 100); label = "Original price"; value = usd(O); stats = [{ k: "Discount amount", v: usd(O - S) }]; steps = [`${usd(S)} ÷ (1 − ${d}%) = ${usd(S)} ÷ ${+(1 - d / 100).toFixed(4)} = ${usd(O)}`]; }
  } else {
    const O = n(s.orig), S = n(s.salep);
    if (!(O > 0) || !(S >= 0)) error = "Enter the original and sale prices.";
    else if (S > O) error = "The sale price is higher than the original. That's a markup, not a discount.";
    else { const p = ((O - S) / O) * 100; label = "Discount"; value = `${+p.toFixed(2)}% off`; stats = [{ k: "You save", v: usd(O - S) }]; steps = [`(${usd(O)} − ${usd(S)}) ÷ ${usd(O)} × 100 = ${+p.toFixed(2)}%`]; }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Discount calculator">
        <Segmented label="Find" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "sale", label: "Sale price" }, { id: "original", label: "Original price" }, { id: "percent", label: "Discount %" }]} />
        {mode === "sale" && (
          <>
            <Field id="price" label="Original price" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
            <Segmented label="Discount type" value={s.type === "amt" ? "amt" : "pct"} onChange={(v) => set("type", v)} options={[{ id: "pct", label: "Percent off" }, { id: "amt", label: "Amount off ($)" }]} />
            <Field id="off" label={s.type === "amt" ? "Amount off" : "Discount"} prefix={s.type === "amt" ? "$" : undefined} suffix={s.type === "amt" ? undefined : "%"} value={s.off} onChange={(v) => set("off", v)} min={0} />
            {s.type !== "amt" && (
              <>
                <div className="flex flex-wrap gap-2">{QUICK.map((q) => <button key={q} type="button" className="chip" aria-pressed={n(s.off) === q} onClick={() => set("off", String(q))}>{q}%</button>)}</div>
                <Field id="off2" label="Extra discount (optional, stacked)" suffix="%" value={s.off2} onChange={(v) => set("off2", v)} min={0} hint="Applied after the first discount, as in 'extra 10% off sale prices'." />
              </>
            )}
            <Field id="tax" label="Sales tax (optional)" suffix="%" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
          </>
        )}
        {mode === "original" && (
          <div className="grid grid-cols-2 gap-3">
            <Field id="sale" label="Sale price" prefix="$" value={s.sale} onChange={(v) => set("sale", v)} min={0} />
            <Field id="off-o" label="Discount" suffix="%" value={s.off} onChange={(v) => set("off", v)} min={0} />
          </div>
        )}
        {mode === "percent" && (
          <div className="grid grid-cols-2 gap-3">
            <Field id="orig" label="Original price" prefix="$" value={s.orig} onChange={(v) => set("orig", v)} min={0} />
            <Field id="salep" label="Sale price" prefix="$" value={s.salep} onChange={(v) => set("salep", v)} min={0} />
          </div>
        )}
      </form>
      <ResultCard error={error} label={label} value={value}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">{stats.map((x) => <Stat key={x.k} k={x.k} v={x.v} />)}</dl>
        <ol className="mt-4 space-y-2 text-sm">{steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono">{st}</li>)}</ol>
        {mode === "sale" && !error && s.type !== "amt" && n(s.price) > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <caption className="mb-1 text-left text-xs subtle">{usd(n(s.price))} at common discounts</caption>
              <thead><tr className="text-left subtle"><th className="py-1 font-medium">Off</th><th className="font-medium">You pay</th><th className="font-medium">You save</th></tr></thead>
              <tbody>{QUICK.map((q) => <tr key={q} className="border-t border-[var(--border)]"><td className="py-1">{q}%</td><td>{usd(n(s.price) * (1 - q / 100))}</td><td>{usd(n(s.price) * q / 100)}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </ResultCard>
    </div>
  );
}
