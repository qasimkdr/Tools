"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { num } from "@/lib/ratio";

type Mode = "legs" | "leg" | "angle";
const UNITS = ["", "cm", "m", "in", "ft"] as const;
const DEFAULTS = { mode: "legs", a: "3", b: "4", c: "13", leg: "5", ang: "35", pos: "opp", u: "" };
const deg = (r: number) => (r * 180) / Math.PI, rad = (d: number) => (d * Math.PI) / 180;

export default function HypotenuseCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const mode = (["legs", "leg", "angle"].includes(s.mode) ? s.mode : "legs") as Mode;
  const u = s.u ? ` ${s.u}` : "";
  let a = NaN, b = NaN, c = NaN, error: string | null = null, steps: string[] = [], label = "Hypotenuse (c)";

  if (mode === "legs") {
    a = Number(s.a); b = Number(s.b);
    if (!(a > 0 && b > 0)) error = "Enter two positive leg lengths.";
    else { c = Math.hypot(a, b); steps = [`c² = a² + b² = ${num(a)}² + ${num(b)}² = ${num(a * a)} + ${num(b * b)} = ${num(a * a + b * b)}`, `c = √${num(a * a + b * b)} = ${num(c, 4)}`]; }
  } else if (mode === "leg") {
    c = Number(s.c); a = Number(s.leg); label = "Missing leg (b)";
    if (!(c > 0 && a > 0)) error = "Enter the hypotenuse and one leg.";
    else if (a >= c) error = "The hypotenuse must be longer than the leg. It's the longest side of a right triangle.";
    else { b = Math.sqrt(c * c - a * a); steps = [`b² = c² − a² = ${num(c)}² − ${num(a)}² = ${num(c * c)} − ${num(a * a)} = ${num(c * c - a * a)}`, `b = √${num(c * c - a * a)} = ${num(b, 4)}`]; }
  } else {
    const leg = Number(s.leg), t = Number(s.ang);
    if (!(leg > 0)) error = "Enter a positive leg length.";
    else if (!(t > 0 && t < 90)) error = "The angle must be between 0° and 90° (not including either).";
    else if (s.pos === "adj") { c = leg / Math.cos(rad(t)); a = leg; b = leg * Math.tan(rad(t)); steps = [`c = adjacent ÷ cos(${num(t)}°) = ${num(leg)} ÷ ${num(Math.cos(rad(t)), 6)} = ${num(c, 4)}`, `Other leg = ${num(leg)} × tan(${num(t)}°) = ${num(b, 4)}`]; }
    else { c = leg / Math.sin(rad(t)); a = leg; b = Math.sqrt(c * c - a * a); steps = [`c = opposite ÷ sin(${num(t)}°) = ${num(leg)} ÷ ${num(Math.sin(rad(t)), 6)} = ${num(c, 4)}`, `Other leg = √(c² − a²) = ${num(b, 4)}`]; }
  }
  const ok = !error && [a, b, c].every((x) => Number.isFinite(x) && x > 0);
  const alpha = ok ? deg(Math.atan2(a, b)) : NaN; // angle opposite a

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Hypotenuse calculator">
        <Segmented label="I know" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "legs", label: "Both legs" }, { id: "leg", label: "Hypotenuse + leg" }, { id: "angle", label: "Leg + angle" }]} />
        {mode === "legs" && <div className="grid grid-cols-2 gap-3"><Field id="a" label="Leg a" value={s.a} onChange={(v) => set("a", v)} min={0} suffix={s.u} /><Field id="b" label="Leg b" value={s.b} onChange={(v) => set("b", v)} min={0} suffix={s.u} /></div>}
        {mode === "leg" && <div className="grid grid-cols-2 gap-3"><Field id="c" label="Hypotenuse c" value={s.c} onChange={(v) => set("c", v)} min={0} suffix={s.u} /><Field id="leg" label="Known leg a" value={s.leg} onChange={(v) => set("leg", v)} min={0} suffix={s.u} /></div>}
        {mode === "angle" && (
          <>
            <div className="grid grid-cols-2 gap-3"><Field id="leg2" label="Known leg" value={s.leg} onChange={(v) => set("leg", v)} min={0} suffix={s.u} /><Field id="ang" label="Angle" value={s.ang} onChange={(v) => set("ang", v)} min={0} suffix="°" /></div>
            <Segmented label="The angle is…" value={s.pos === "adj" ? "adj" : "opp"} onChange={(v) => set("pos", v)} options={[{ id: "opp", label: "Opposite the leg" }, { id: "adj", label: "Next to the leg" }]} />
          </>
        )}
        <div>
          <span className="label">Units (optional)</span>
          <div className="flex flex-wrap gap-2">{UNITS.map((x) => <button key={x || "none"} type="button" className="chip" aria-pressed={s.u === x} onClick={() => set("u", x)}>{x || "none"}</button>)}</div>
        </div>
        <TriangleSketch />
      </form>
      <ResultCard error={error} label={label} value={ok ? `${num(mode === "leg" ? b : c, 4)}${u}` : ""}>
        {ok && (
          <>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat k="Leg a" v={`${num(a, 4)}${u}`} /><Stat k="Leg b" v={`${num(b, 4)}${u}`} /><Stat k="Hypotenuse c" v={`${num(c, 4)}${u}`} />
              <Stat k="Angle α (opposite a)" v={`${num(alpha, 2)}°`} /><Stat k="Angle β (opposite b)" v={`${num(90 - alpha, 2)}°`} /><Stat k="Altitude to c" v={`${num((a * b) / c, 4)}${u}`} />
              <Stat k="Area" v={`${num((a * b) / 2, 4)}${u ? `${u}²` : ""}`} /><Stat k="Perimeter" v={`${num(a + b + c, 4)}${u}`} />
            </dl>
            <ol className="mt-4 space-y-2 text-sm">{steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono">{st}</li>)}</ol>
          </>
        )}
      </ResultCard>
    </div>
  );
}

function TriangleSketch() {
  return (
    <svg viewBox="0 0 220 130" className="w-full max-w-xs" role="img" aria-label="Right triangle with legs a and b and hypotenuse c">
      <path d="M20 110 L200 110 L20 20 Z" fill="var(--color-brand-50)" stroke="var(--color-brand-600)" strokeWidth="2" />
      <path d="M20 96 h14 v14" fill="none" stroke="var(--color-brand-600)" strokeWidth="1.5" />
      <text x="8" y="70" fontSize="13" fill="currentColor">a</text>
      <text x="105" y="126" fontSize="13" fill="currentColor">b</text>
      <text x="115" y="58" fontSize="13" fontWeight="700" fill="var(--color-brand-700)">c</text>
      <text x="168" y="104" fontSize="11" fill="currentColor">α</text>
      <text x="26" y="40" fontSize="11" fill="currentColor">β</text>
    </svg>
  );
}
