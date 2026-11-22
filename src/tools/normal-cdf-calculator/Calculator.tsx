"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { normCdf, normInv, normPdf } from "@/lib/stats";

type Mode = "below" | "above" | "between" | "outside" | "inverse";
const f4 = (v: number) => (Number.isFinite(v) ? (+v.toFixed(6)).toString() : "—");

function Curve({ lo, hi, outside }: { lo: number; hi: number; outside?: boolean }) {
  const W = 320, H = 120, X = (z: number) => ((z + 4) / 8) * W, Y = (z: number) => H - 8 - normPdf(z) * 260;
  const pts = (a: number, b: number) => { const out: string[] = []; for (let z = Math.max(a, -4); z <= Math.min(b, 4) + 1e-9; z += 0.05) out.push(`${X(z).toFixed(1)},${Y(z).toFixed(1)}`); return out; };
  const area = (a: number, b: number) => { const p = pts(a, b); if (!p.length) return ""; return `M${X(Math.max(a, -4)).toFixed(1)},${H - 8} L${p.join(" L")} L${X(Math.min(b, 4)).toFixed(1)},${H - 8} Z`; };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Normal curve with the probability shaded">
      {outside ? <><path d={area(-4, lo)} fill="var(--color-brand-500)" opacity="0.35" /><path d={area(hi, 4)} fill="var(--color-brand-500)" opacity="0.35" /></> : <path d={area(lo, hi)} fill="var(--color-brand-500)" opacity="0.35" />}
      <polyline points={pts(-4, 4).join(" ")} fill="none" stroke="var(--color-brand-600)" strokeWidth="2" />
      <line x1="0" x2={W} y1={H - 8} y2={H - 8} stroke="var(--border)" />
      {[-3, -2, -1, 0, 1, 2, 3].map((z) => <text key={z} x={X(z)} y={H} fontSize="9" textAnchor="middle" fill="var(--subtle)">{z}</text>)}
    </svg>
  );
}

export default function NormalCdfCalculator() {
  const [s, set] = useUrlState({ mode: "below", mu: "100", sd: "15", x: "120", a: "85", b: "115", p: "0.95", tail: "left" });
  const mode = (["below", "above", "between", "outside", "inverse"].includes(s.mode) ? s.mode : "below") as Mode;
  const mu = Number(s.mu), sd = Number(s.sd);
  const z = (v: number) => (v - mu) / sd;
  let prob = NaN, lo = -Infinity, hi = Infinity, cmd = "", label = "Probability", value = "";
  let error: string | null = !(sd > 0) || s.mu === "" ? "Enter a mean and a standard deviation above 0." : null;
  if (!error) {
    if (mode === "below") { lo = -Infinity; hi = z(Number(s.x)); prob = normCdf(hi); label = `P(X ≤ ${s.x})`; cmd = `normalcdf(−1E99, ${s.x}, ${s.mu}, ${s.sd})`; }
    else if (mode === "above") { lo = z(Number(s.x)); prob = 1 - normCdf(lo); label = `P(X ≥ ${s.x})`; cmd = `normalcdf(${s.x}, 1E99, ${s.mu}, ${s.sd})`; }
    else if (mode === "between" || mode === "outside") {
      lo = z(Math.min(Number(s.a), Number(s.b))); hi = z(Math.max(Number(s.a), Number(s.b)));
      const inside = normCdf(hi) - normCdf(lo); prob = mode === "between" ? inside : 1 - inside;
      label = mode === "between" ? `P(${s.a} ≤ X ≤ ${s.b})` : `P(X ≤ ${s.a} or X ≥ ${s.b})`; cmd = `normalcdf(${s.a}, ${s.b}, ${s.mu}, ${s.sd})${mode === "outside" ? " → 1 − result" : ""}`;
    } else {
      const p = Number(s.p);
      if (!(p > 0 && p < 1)) error = "Enter a probability between 0 and 1 (e.g. 0.95).";
      else { const zz = normInv(s.tail === "right" ? 1 - p : p); const x = mu + zz * sd; label = s.tail === "right" ? `x with P(X ≥ x) = ${p}` : `x with P(X ≤ x) = ${p}`; value = f4(x); prob = p; if (s.tail === "right") lo = zz; else hi = zz; cmd = `invNorm(${s.tail === "right" ? 1 - p : p}, ${s.mu}, ${s.sd})`; }
    }
  }
  if (!value) value = f4(prob);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Normal CDF calculator">
        <Segmented label="Find" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "below", label: "P(X ≤ x)" }, { id: "above", label: "P(X ≥ x)" }, { id: "between", label: "Between" }, { id: "outside", label: "Outside" }, { id: "inverse", label: "Inverse (find x)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="mu" label="Mean (μ)" value={s.mu} onChange={(v) => set("mu", v)} />
          <Field id="sd" label="Standard deviation (σ)" value={s.sd} onChange={(v) => set("sd", v)} min={0} />
        </div>
        {(mode === "below" || mode === "above") && <Field id="x" label="Value (x)" value={s.x} onChange={(v) => set("x", v)} />}
        {(mode === "between" || mode === "outside") && <div className="grid grid-cols-2 gap-3"><Field id="a" label="Lower value (a)" value={s.a} onChange={(v) => set("a", v)} /><Field id="b" label="Upper value (b)" value={s.b} onChange={(v) => set("b", v)} /></div>}
        {mode === "inverse" && <>
          <Field id="p" label="Probability (area)" value={s.p} onChange={(v) => set("p", v)} min={0} hint="e.g. 0.95 for the 95th percentile" />
          <Segmented label="Area to the" value={s.tail === "right" ? "right" : "left"} onChange={(v) => set("tail", v)} options={[{ id: "left", label: "Left of x" }, { id: "right", label: "Right of x" }]} />
        </>}
        <p className="text-xs subtle">For the standard normal (z-table), use mean 0 and standard deviation 1.</p>
      </form>
      <ResultCard error={error} label={label} value={value}>
        {mode !== "inverse" && <p className="mt-1 text-sm muted">{(prob * 100).toFixed(4)}%{prob > 0 && prob < 0.2 ? ` · about 1 in ${Math.round(1 / prob).toLocaleString()}` : ""}</p>}
        <Curve lo={lo} hi={hi} outside={mode === "outside"} />
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          {(mode === "below" || mode === "above") && <Stat k="z-score" v={f4(z(Number(s.x)))} />}
          {(mode === "between" || mode === "outside") && <Stat k="z-scores" v={`${f4(lo)} to ${f4(hi)}`} />}
          {mode === "inverse" && <Stat k="z-score" v={f4(Number.isFinite(hi) ? hi : lo)} />}
          <Stat k="TI-83/84 equivalent" v={<span className="font-mono text-xs">{cmd}</span>} />
        </dl>
      </ResultCard>
    </div>
  );
}
