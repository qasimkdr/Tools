"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

type Q = "V" | "I" | "R" | "P";
const UNIT: Record<Q, string> = { V: "V", I: "A", R: "Ω", P: "W" };
const NAME: Record<Q, string> = { V: "Voltage", I: "Current", R: "Resistance", P: "Power" };
const PAIRS: { id: string; a: Q; b: Q }[] = [{ id: "VR", a: "V", b: "R" }, { id: "VI", a: "V", b: "I" }, { id: "IR", a: "I", b: "R" }, { id: "PV", a: "P", b: "V" }, { id: "PI", a: "P", b: "I" }, { id: "PR", a: "P", b: "R" }];
const PREFIX: [number, string][] = [[1e9, "G"], [1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"]];
const si = (x: number, u: string) => { const a = Math.abs(x); const p = PREFIX.find(([f]) => a >= f) ?? PREFIX[PREFIX.length - 1]; return `${Number((x / p[0]).toPrecision(5))} ${p[1]}${u}`; };

/** Solve all four quantities from a known pair. */
function solve(pair: string, x: number, y: number): Record<Q, number> {
  switch (pair) {
    case "VR": return { V: x, R: y, I: x / y, P: (x * x) / y };
    case "VI": return { V: x, I: y, R: x / y, P: x * y };
    case "IR": return { I: x, R: y, V: x * y, P: x * x * y };
    case "PV": return { P: x, V: y, I: x / y, R: (y * y) / x };
    case "PI": return { P: x, I: y, V: x / y, R: x / (y * y) };
    default: return { P: x, R: y, I: Math.sqrt(x / y), V: Math.sqrt(x * y) };
  }
}
const STEPS: Record<string, string> = {
  VR: "I = V ÷ R · P = V² ÷ R", VI: "R = V ÷ I · P = V × I", IR: "V = I × R · P = I² × R",
  PV: "I = P ÷ V · R = V² ÷ P", PI: "V = P ÷ I · R = P ÷ I²", PR: "I = √(P ÷ R) · V = √(P × R)",
};

export default function OhmsLawCalculator() {
  const [s, set] = useUrlState({ pair: "VR", x: "12", y: "8" });
  const pr = PAIRS.find((p) => p.id === s.pair) ?? PAIRS[0];
  const x = Number(s.x), y = Number(s.y);
  const err = !(x > 0 && y > 0) ? `Enter positive values for ${NAME[pr.a].toLowerCase()} and ${NAME[pr.b].toLowerCase()}.` : null;
  const r = err ? null : solve(pr.id, x, y);
  const unknown = (["V", "I", "R", "P"] as Q[]).filter((q) => q !== pr.a && q !== pr.b);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Ohm's law calculator">
        <Segmented label="I know" value={pr.id} onChange={(v) => set("pair", v)} options={PAIRS.map((p) => ({ id: p.id, label: `${p.a} & ${p.b}` }))} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="x" label={NAME[pr.a]} suffix={UNIT[pr.a]} value={s.x} onChange={(v) => set("x", v)} min={0} hint="e.g. 0.02 for 20 mA" />
          <Field id="y" label={NAME[pr.b]} suffix={UNIT[pr.b]} value={s.y} onChange={(v) => set("y", v)} min={0} />
        </div>
        <div className="formula">V = I × R · P = V × I<br />{STEPS[pr.id]}</div>
      </form>
      <ResultCard label={`${NAME[unknown[0]]} and ${NAME[unknown[1]].toLowerCase()}`} error={err} value={r ? `${si(r[unknown[0]], UNIT[unknown[0]])} · ${si(r[unknown[1]], UNIT[unknown[1]])}` : "–"}>
        {r && <>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {(["V", "I", "R", "P"] as Q[]).map((q) => <Stat key={q} k={`${NAME[q]} (${q})`} v={<span data-testid={`q-${q}`}>{si(r[q], UNIT[q])}</span>} />)}
          </dl>
          <p className="mt-4 text-sm muted">Conductance: {si(1 / r.R, "S")} · energy per hour: {si(r.P, "Wh")}</p>
          <p className="mt-2 text-xs subtle">Ohm&apos;s law applies to resistive (ohmic) loads at a steady current. For AC circuits with motors or capacitors, use impedance and power factor.</p>
        </>}
      </ResultCard>
    </div>
  );
}
