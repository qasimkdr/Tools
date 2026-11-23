"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "–");
const pc = (x: number) => (Number.isFinite(x) ? `${(x * 100).toFixed(2).replace(/\.00$/, "")}%` : "–");
type Mode = "markup" | "price" | "margin";

export default function MarkupCalculator() {
  const [s, set] = useUrlState({ mode: "markup", cost: "40", mu: "50", price: "60", mg: "30", qty: "1" });
  const mode = (["markup", "price", "margin"].includes(s.mode) ? s.mode : "markup") as Mode;
  const cost = Number(s.cost), qty = Math.max(1, Number(s.qty) || 1);
  let price = NaN;
  if (mode === "markup") price = cost * (1 + Number(s.mu) / 100);
  else if (mode === "price") price = Number(s.price);
  else price = Number(s.mg) < 100 ? cost / (1 - Number(s.mg) / 100) : NaN;
  const profit = price - cost, markup = profit / cost, margin = profit / price;
  const err = !(cost > 0) ? "Enter the cost." : mode === "margin" && !(Number(s.mg) < 100) ? "Margin must be below 100%." : !(price > 0) ? "Enter the selling price or a markup." : null;
  const label = mode === "price" ? "Markup" : "Selling price";

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Markup calculator">
          <Segmented label="I know the cost and" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "markup", label: "Markup %" }, { id: "price", label: "Selling price" }, { id: "margin", label: "Target margin %" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="cost" label="Cost per unit" prefix="$" value={s.cost} onChange={(v) => set("cost", v)} min={0} />
            {mode === "markup" && <Field id="mu" label="Markup" suffix="%" value={s.mu} onChange={(v) => set("mu", v)} />}
            {mode === "price" && <Field id="price" label="Selling price" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />}
            {mode === "margin" && <Field id="mg" label="Target gross margin" suffix="%" value={s.mg} onChange={(v) => set("mg", v)} />}
            <Field id="qty" label="Units sold (optional)" value={s.qty} onChange={(v) => set("qty", v)} min={1} inputMode="numeric" />
          </div>
        </form>
        <ResultCard label={label} error={err} value={err ? "–" : mode === "price" ? pc(markup) : usd(price)}>
          {!err && <>
            <p className="mt-1 text-sm muted">Cost {usd(cost)} → price {usd(price)} · profit {usd(profit)} per unit</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Markup (profit ÷ cost)" v={<span data-testid="markup">{pc(markup)}</span>} />
              <Stat k="Gross margin (profit ÷ price)" v={<span data-testid="margin">{pc(margin)}</span>} />
              <Stat k="Profit per unit" v={<span data-testid="profit">{usd(profit)}</span>} />
              {qty > 1 && <Stat k={`Revenue for ${qty.toLocaleString("en-US")} units`} v={usd(price * qty)} />}
              {qty > 1 && <Stat k={`Profit for ${qty.toLocaleString("en-US")} units`} v={<span data-testid="profit-qty">{usd(profit * qty)}</span>} />}
              <Stat k="Price multiplier" v={`${(price / cost).toFixed(3)}× cost`} />
            </dl>
            <div className="mt-4" aria-hidden>
              <div className="flex h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <div className="bg-slate-400" style={{ width: `${Math.max(0, Math.min(100, (cost / price) * 100))}%` }} />
                <div className="bg-[var(--color-brand-600)]" style={{ width: `${Math.max(0, Math.min(100, margin * 100))}%` }} />
              </div>
              <p className="mt-1 flex justify-between text-xs subtle"><span>Cost {pc(cost / price)} of price</span><span>Profit {pc(margin)}</span></p>
            </div>
            {profit < 0 && <p className="mt-3 text-sm text-amber-700">This price is below cost, so each sale loses money.</p>}
          </>}
        </ResultCard>
      </div>
      <div>
        <h3 className="text-base font-semibold">Markup ↔ margin conversion</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full max-w-xl text-sm" data-testid="table">
            <thead><tr className="text-left subtle"><th className="py-1">Markup</th><th>Margin</th><th>Price on {usd(cost > 0 ? cost : 40)} cost</th></tr></thead>
            <tbody>{[10, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200].map((m) => <tr key={m} className="border-t border-[var(--border)]"><td className="py-1">{m}%</td><td>{pc(m / (100 + m))}</td><td>{usd((cost > 0 ? cost : 40) * (1 + m / 100))}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
