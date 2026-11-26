"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { costOf, cpmOf, impressionsOf } from "@/lib/cpm";

const usd = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d }) : "–");
const int = (x: number) => (Number.isFinite(x) ? Math.round(x).toLocaleString("en-US") : "–");

export default function CpmCalculator() {
  const [s, set] = useUrlState({ find: "cpm", cost: "500", imp: "250000", cpm: "8", clicks: "1250" });
  const find = ["cpm", "cost", "imp"].includes(s.find) ? s.find : "cpm";
  const cost0 = Number(s.cost), imp0 = Number(String(s.imp).replace(/,/g, "")), cpm0 = Number(s.cpm);
  let cost = cost0, imp = imp0, cpm = cpm0, err: string | null = null;
  if (find === "cpm") { if (!(cost0 >= 0) || !(imp0 > 0)) err = "Enter the total cost and the number of impressions."; else cpm = cpmOf(cost0, imp0); }
  else if (find === "cost") { if (!(cpm0 >= 0) || !(imp0 > 0)) err = "Enter the CPM and the number of impressions."; else cost = costOf(cpm0, imp0); }
  else { if (!(cost0 > 0) || !(cpm0 > 0)) err = "Enter the budget and the CPM."; else imp = impressionsOf(cost0, cpm0); }
  const clicks = Number(s.clicks);
  const hasClicks = clicks > 0 && !err;
  const ctr = hasClicks ? clicks / imp : NaN, cpc = hasClicks ? cost / clicks : NaN;
  const label = find === "cpm" ? "CPM (cost per 1,000 impressions)" : find === "cost" ? "Total cost" : "Impressions you can buy";
  const value = find === "cpm" ? usd(cpm) : find === "cost" ? usd(cost) : int(imp);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="CPM calculator">
        <Segmented label="Find" value={find} onChange={(v) => set("find", v)} options={[{ id: "cpm", label: "CPM" }, { id: "cost", label: "Cost" }, { id: "imp", label: "Impressions" }]} />
        {find !== "cost" && <Field id="cost" label={find === "imp" ? "Budget" : "Total ad cost"} prefix="$" value={s.cost} onChange={(v) => set("cost", v)} min={0} />}
        {find !== "imp" && <Field id="imp" label="Impressions" value={s.imp} onChange={(v) => set("imp", v)} min={0} inputMode="numeric" hint="Times the ad was shown" />}
        {find !== "cpm" && <Field id="cpm" label="CPM" prefix="$" value={s.cpm} onChange={(v) => set("cpm", v)} min={0} hint="Cost per 1,000 impressions" />}
        <Field id="clicks" label="Clicks (optional)" value={s.clicks} onChange={(v) => set("clicks", v)} min={0} inputMode="numeric" hint="Adds click-through rate and cost per click" />
      </form>
      <ResultCard error={err} label={label} value={err ? "–" : <span data-testid="out">{value}</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Total cost" v={<span data-testid="cost">{usd(cost)}</span>} />
            <Stat k="Impressions" v={<span data-testid="imp">{int(imp)}</span>} />
            <Stat k="CPM" v={<span data-testid="cpm">{usd(cpm)}</span>} />
            <Stat k="Cost per single impression" v={usd(cost / imp, 4)} />
            {hasClicks && <>
              <Stat k="Click-through rate (CTR)" v={<span data-testid="ctr">{(ctr * 100).toFixed(2)}%</span>} />
              <Stat k="Cost per click (CPC)" v={<span data-testid="cpc">{usd(cpc)}</span>} />
            </>}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">What this budget buys at other CPMs</h2>
          <table className="mt-2 w-full text-sm" data-testid="table">
            <thead><tr className="text-left subtle"><th className="py-1">CPM</th><th>Impressions for {usd(cost, 0)}</th>{hasClicks && <th>Clicks at {(ctr * 100).toFixed(2)}% CTR</th>}</tr></thead>
            <tbody>{[1, 2, 5, 10, 15, 20, 30].map((c) => { const i = impressionsOf(cost, c); return <tr key={c} className={`border-t border-[var(--border)] ${Math.abs(c - cpm) < 0.005 ? "font-semibold" : ""}`}><td className="py-1">{usd(c)}</td><td>{int(i)}</td>{hasClicks && <td>{int(i * ctr)}</td>}</tr>; })}</tbody>
          </table>
        </>}
      </ResultCard>
    </div>
  );
}
