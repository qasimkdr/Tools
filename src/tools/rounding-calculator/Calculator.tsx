"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { deciderDigit, formatDec, MODE_LABEL, parseDec, PLACE_NAMES, roundToPlaces, roundToSigFigs, roundToStep, type Dec, type RoundMode } from "@/lib/round";

const PLACES = [-3, -2, -1, 0, 1, 2, 3, 4];
const placeLabel = (p: number) => (p === 0 ? "Whole number" : p < 0 ? `Nearest ${PLACE_NAMES[p]}` : `${p} decimal place${p > 1 ? "s" : ""} (${PLACE_NAMES[p]})`);

export default function RoundingCalculator() {
  const [s, set] = useUrlState({ x: "3.14159", by: "place", place: "2", sig: "3", step: "0.25", mode: "half-up", list: "" });
  const mode = (Object.keys(MODE_LABEL).includes(s.mode) ? s.mode : "half-up") as RoundMode;
  const by = s.by === "sig" ? "sig" : s.by === "step" ? "step" : "place";
  const place = Math.max(-6, Math.min(10, Math.round(Number(s.place) || 0)));
  const sig = Math.max(1, Math.min(20, Math.round(Number(s.sig) || 1)));
  const step = parseDec(s.step);
  const round = (d: Dec): Dec => (by === "sig" ? roundToSigFigs(d, sig, mode) : by === "step" ? roundToStep(d, step!, mode) : roundToPlaces(d, place, mode));
  const x = parseDec(s.x);
  const err = !x ? "Enter a number, such as 3.14159, −2.5 or 1,250." : by === "step" && !(step && step.n > 0n) ? "Enter a positive step, such as 0.25, 5 or 100." : null;
  const r = !err && x ? round(x) : null;
  const target = by === "sig" ? `${sig} significant figure${sig > 1 ? "s" : ""}` : by === "step" ? `the nearest ${s.step}` : placeLabel(place).toLowerCase();
  const d = x && by === "place" ? deciderDigit(x, place) : null;
  const lines = s.list.split(/[\n,;]+/).map((t) => t.trim()).filter(Boolean).slice(0, 200);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Rounding calculator">
        <div>
          <label htmlFor="x" className="label">Number to round</label>
          <input id="x" className="field font-mono text-lg" value={s.x} onChange={(e) => set("x", e.target.value)} inputMode="decimal" autoComplete="off" spellCheck={false} />
        </div>
        <Segmented label="Round to" value={by} onChange={(v) => set("by", v)} options={[{ id: "place", label: "Place value" }, { id: "sig", label: "Significant figures" }, { id: "step", label: "Nearest step" }]} />
        {by === "place" && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Place value">
            {PLACES.map((p) => (
              <button key={p} type="button" aria-pressed={place === p} onClick={() => set("place", String(p))} className={`btn-ghost px-3 py-1.5 text-xs ${place === p ? "ring-2 ring-[var(--color-brand-500)]" : ""}`}>
                {p === 0 ? "Whole" : p < 0 ? PLACE_NAMES[p].replace(/^\w/, (c) => c.toUpperCase()) + "s" : PLACE_NAMES[p].replace(/^\w/, (c) => c.toUpperCase()) + "s"}
              </button>
            ))}
          </div>
        )}
        {by === "sig" && (
          <div><label htmlFor="sig" className="label">Significant figures</label>
            <input id="sig" type="number" min={1} max={20} className="field w-32" value={s.sig} onChange={(e) => set("sig", e.target.value)} /></div>
        )}
        {by === "step" && (
          <div><label htmlFor="step" className="label">Round to the nearest</label>
            <input id="step" className="field w-40 font-mono" value={s.step} onChange={(e) => set("step", e.target.value)} inputMode="decimal" />
            <p className="mt-1 text-xs subtle">Any step: 0.25 (quarters), 0.05 (nickels), 5, 50, 1000…</p></div>
        )}
        <div>
          <label htmlFor="mode" className="label">Rounding rule</label>
          <select id="mode" className="field" value={mode} onChange={(e) => set("mode", e.target.value)}>
            {(Object.keys(MODE_LABEL) as RoundMode[]).map((m) => <option key={m} value={m}>{MODE_LABEL[m]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="list" className="label">Round a list too (optional)</label>
          <textarea id="list" rows={3} className="field font-mono" placeholder="One number per line or comma-separated" value={s.list} onChange={(e) => set("list", e.target.value)} maxLength={10000} />
        </div>
      </form>
      <ResultCard error={err} label={x ? `${formatDec(x)} rounded to ${target}` : "Rounded"} value={r ? <span className="font-mono" data-testid="rounded">{formatDec(r, true)}</span> : "–"}>
        {r && x && <>
          {by === "place" && d !== null && mode === "half-up" && (
            <p className="mt-2 text-sm" data-testid="explain">The digit after the {place === 0 ? "ones" : PLACE_NAMES[place]} place is <strong>{d}</strong>, so {d >= 5 ? "round up" : "keep the digit and drop the rest"}{d === 5 ? " (5 or more rounds up)" : ""}.</p>
          )}
          <h2 className="mt-4 text-sm font-semibold">Same number, every rule</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm" data-testid="modes">
              <tbody>
                {(Object.keys(MODE_LABEL) as RoundMode[]).map((m) => {
                  const v = by === "sig" ? roundToSigFigs(x, sig, m) : by === "step" ? roundToStep(x, step!, m) : roundToPlaces(x, place, m);
                  return <tr key={m} className={`border-t border-[var(--border)] ${m === mode ? "font-semibold" : ""}`}><td className="py-1 pr-2">{MODE_LABEL[m]}</td><td className="text-right font-mono">{formatDec(v, true)}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
          {by === "place" && (
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[-2, -1, 0, 1, 2, 3].map((p) => <Stat key={p} k={p === 0 ? "Whole number" : p < 0 ? `Nearest ${PLACE_NAMES[p]}` : `Nearest ${PLACE_NAMES[p]}`} v={<span className="font-mono">{formatDec(roundToPlaces(x, p, mode), true)}</span>} />)}
            </dl>
          )}
          {lines.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm" data-testid="list-out">
                <thead><tr className="text-left subtle"><th className="py-1">Number</th><th className="text-right">Rounded</th></tr></thead>
                <tbody>{lines.map((t, i) => { const v = parseDec(t); return <tr key={i} className="border-t border-[var(--border)]"><td className="py-1 font-mono">{t}</td><td className="text-right font-mono">{v ? formatDec(round(v), true) : "not a number"}</td></tr>; })}</tbody>
              </table>
            </div>
          )}
          <p className="mt-3 text-xs subtle">Calculated with exact decimal arithmetic, so 2.675 rounds to 2.68 (many spreadsheets and programming languages give 2.67 because of binary floating point).</p>
        </>}
      </ResultCard>
    </div>
  );
}
