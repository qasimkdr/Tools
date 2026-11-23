"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const ML_PER_OZ = 29.5735;
const BARS: Record<string, { label: string; wine: number; liquor: number; beer: number }> = {
  full: { label: "Full bar", wine: 50, liquor: 30, beer: 20 },
  bw: { label: "Beer & wine", wine: 75, liquor: 0, beer: 25 },
  wine: { label: "Wine only", wine: 100, liquor: 0, beer: 0 },
};
const n0 = (x: number) => Math.round(x).toLocaleString("en-US");
const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function WeddingAlcoholCalculator() {
  const [s, set] = useUrlState({ guests: "100", hours: "5", rate: "1", bar: "full", w: "50", l: "30", b: "20", buffer: "10", toast: "0", big: "0", pw: "", pl: "", pb: "", pc: "" });
  const guests = Math.floor(Number(s.guests)), hours = Number(s.hours), rate = Number(s.rate), buffer = (Number(s.buffer) || 0) / 100;
  const custom = s.bar === "custom";
  const mix = custom ? { wine: Number(s.w) || 0, liquor: Number(s.l) || 0, beer: Number(s.b) || 0 } : BARS[s.bar] ?? BARS.full;
  const sum = mix.wine + mix.liquor + mix.beer;
  const err = !(guests >= 1 && guests <= 5000) ? "Enter the number of guests who drink (1–5,000)." : !(hours > 0 && hours <= 12) ? "Enter how many hours the bar is open (up to 12)." : !(rate > 0 && rate <= 4) ? "Enter drinks per guest per hour (up to 4)." : custom && Math.abs(sum - 100) > 0.01 ? `The bar mix must add up to 100% (now ${sum}%).` : null;
  const drinks = guests * hours * rate * (1 + buffer);
  const servings = { wine: (drinks * mix.wine) / 100, liquor: (drinks * mix.liquor) / 100, beer: (drinks * mix.beer) / 100 };
  const wineBottles = Math.ceil(servings.wine / (750 / ML_PER_OZ / 5));
  const liqSize = s.big === "1" ? 1750 : 750;
  const liqBottles = Math.ceil(servings.liquor / (liqSize / ML_PER_OZ / 1.5));
  const beerCans = Math.ceil(servings.beer), beerCases = Math.ceil(beerCans / 24);
  const toast = s.toast === "1" ? Math.ceil(guests / (750 / ML_PER_OZ / 4)) : 0;
  const cost = (Number(s.pw) || 0) * (wineBottles + toast) + (Number(s.pl) || 0) * liqBottles + (Number(s.pb) || 0) * beerCases;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Wedding alcohol calculator">
        <div className="grid grid-cols-3 gap-3">
          <Field id="guests" label="Guests who drink" value={s.guests} onChange={(v) => set("guests", v)} min={1} inputMode="numeric" />
          <Field id="hours" label="Bar open" suffix="hours" value={s.hours} onChange={(v) => set("hours", v)} min={0} />
          <Field id="rate" label="Drinks per guest/hour" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
        </div>
        <div>
          <Segmented label="Bar type" value={custom ? "custom" : BARS[s.bar] ? s.bar : "full"} onChange={(v) => set("bar", v)} options={[...Object.entries(BARS).map(([id, x]) => ({ id, label: x.label })), { id: "custom", label: "Custom" }]} />
          {custom && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Field id="w" label="Wine" suffix="%" value={s.w} onChange={(v) => set("w", v)} min={0} />
              <Field id="l" label="Liquor" suffix="%" value={s.l} onChange={(v) => set("l", v)} min={0} />
              <Field id="b" label="Beer" suffix="%" value={s.b} onChange={(v) => set("b", v)} min={0} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="buffer" label="Extra buffer" suffix="%" value={s.buffer} onChange={(v) => set("buffer", v)} min={0} hint="So you don't run out" />
          <div className="space-y-2 pt-6 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={s.toast === "1"} onChange={(e) => set("toast", e.target.checked ? "1" : "0")} /> Champagne toast</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={s.big === "1"} onChange={(e) => set("big", e.target.checked ? "1" : "0")} /> Liquor in 1.75 L bottles</label>
          </div>
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">Add prices for a cost estimate</summary>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Field id="pw" label="Wine / bottle" prefix="$" value={s.pw} onChange={(v) => set("pw", v)} min={0} />
            <Field id="pl" label="Liquor / bottle" prefix="$" value={s.pl} onChange={(v) => set("pl", v)} min={0} />
            <Field id="pb" label="Beer / case" prefix="$" value={s.pb} onChange={(v) => set("pb", v)} min={0} />
          </div>
        </details>
      </form>
      <ResultCard error={err} label="Total drinks to plan for" value={err ? "–" : <span data-testid="drinks">{n0(drinks)}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">{guests} guests × {hours} h × {rate} drink{rate === 1 ? "" : "s"}/h{buffer ? ` + ${Math.round(buffer * 100)}% buffer` : ""}</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {mix.wine > 0 && <div className="rounded-xl bg-[var(--surface-2)] p-3"><div className="text-xs subtle">Wine (750 ml)</div><div className="text-2xl font-bold" data-testid="wine">{wineBottles}</div><div className="text-xs muted">bottles · {n0(servings.wine)} glasses</div></div>}
            {mix.liquor > 0 && <div className="rounded-xl bg-[var(--surface-2)] p-3"><div className="text-xs subtle">Liquor ({s.big === "1" ? "1.75 L" : "750 ml"})</div><div className="text-2xl font-bold" data-testid="liquor">{liqBottles}</div><div className="text-xs muted">bottles · {n0(servings.liquor)} drinks</div></div>}
            {mix.beer > 0 && <div className="rounded-xl bg-[var(--surface-2)] p-3"><div className="text-xs subtle">Beer (24-packs)</div><div className="text-2xl font-bold" data-testid="beer">{beerCases}</div><div className="text-xs muted">cases · {n0(beerCans)} beers</div></div>}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {toast > 0 && <Stat k="Champagne for the toast" v={<span data-testid="toast">{toast} bottles (4 oz each)</span>} />}
            {cost > 0 && <Stat k="Estimated cost" v={<span data-testid="cost">{usd(cost)}</span>} />}
            <Stat k="Drinks per guest (whole event)" v={(hours * rate).toFixed(1)} />
            <Stat k="Mix" v={`${mix.wine}% wine · ${mix.liquor}% liquor · ${mix.beer}% beer`} />
          </dl>
          <p className="mt-3 text-xs subtle">Servings use US standard drinks: 5 oz wine (about 5 glasses per bottle), 1.5 oz spirits (about 17 per 750 ml) and one 12 oz beer. Plan non-alcoholic drinks and water too, and ask your store about returning unopened bottles.</p>
        </>}
      </ResultCard>
    </div>
  );
}
