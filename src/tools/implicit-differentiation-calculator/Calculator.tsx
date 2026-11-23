"use client";
import { useEffect, useState } from "react";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

type Lib = typeof import("@/lib/implicitDiff");
const EXAMPLES: [string, string, string, string][] = [
  ["Circle", "x^2 + y^2 = 25", "3", "4"],
  ["Folium", "x^3 + y^3 = 6xy", "3", "3"],
  ["Ellipse", "x^2/9 + y^2/4 = 1", "0", "2"],
  ["Trig", "sin(xy) = x", "", ""],
  ["Exponential", "e^(xy) = x + y", "", ""],
];

export default function ImplicitDifferentiationCalculator() {
  const [s, set, setAll] = useUrlState({ eq: "x^2 + y^2 = 25", x: "3", y: "4" });
  const [lib, setLib] = useState<Lib | null>(null);
  const [loadErr, setLoadErr] = useState(false);
  useEffect(() => { import("@/lib/implicitDiff").then(setLib).catch(() => setLoadErr(true)); }, []);

  let r: ReturnType<Lib["implicitDerivative"]> | null = null, err: string | null = null;
  const hasPt = s.x.trim() !== "" && s.y.trim() !== "";
  if (loadErr) err = "The math engine didn't load. Check your connection and reload the page.";
  else if (lib) {
    try { r = lib.implicitDerivative(s.eq, hasPt ? Number(s.x) : undefined, hasPt ? Number(s.y) : undefined); }
    catch (e) { err = (e as Error).message; }
  }
  const f = lib?.fmtNum ?? ((v: number) => String(v));
  const term = (a: string, b: string) => {
    const parts = [a !== "0" ? a : "", b !== "0" ? `${b === "1" ? "" : `(${b})·`}dy/dx` : ""].filter(Boolean);
    return parts.length ? parts.join(" + ") : "0";
  };

  const diff = (a: string, b: string) => (b === "0" ? a : a === "0" ? `−(${b})` : `(${a}) − (${b})`);
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Implicit differentiation calculator">
        <div>
          <label htmlFor="eq" className="label">Equation in x and y</label>
          <input id="eq" className="field font-mono" value={s.eq} onChange={(e) => set("eq", e.target.value)} spellCheck={false} autoComplete="off" maxLength={200} />
          <p className="mt-1 text-xs subtle">Use ^ for powers, and brackets for functions: sin(x), cos(y), tan, ln, log, sqrt, e^(xy). Write 2xy or 2*x*y.</p>
        </div>
        <div>
          <span className="label">Point on the curve (optional)</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="px" label="x" value={s.x} onChange={(v) => set("x", v)} />
            <Field id="py" label="y" value={s.y} onChange={(v) => set("y", v)} />
          </div>
        </div>
        <div>
          <span className="label">Try an example</span>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map(([label, eq, x, y]) => <button key={label} type="button" className="btn-ghost px-3 py-1.5 text-xs" onClick={() => setAll({ eq, x, y })}>{label}</button>)}
          </div>
        </div>
      </form>
      <ResultCard error={err} label="dy/dx =" value={r ? <span className="font-mono text-2xl break-words" data-testid="dydx">{r.dydx}</span> : lib ? "–" : <span className="text-base muted">Loading…</span>}>
        {r && <>
          {r.at && (
            <div className="mt-3">
              {!r.at.onCurve && <p className="mb-2 text-sm text-amber-800" data-testid="off-curve">({f(r.at.x)}, {f(r.at.y)}) is not on the curve: the two sides differ by {f(r.at.residual)}. The values below use the formula anyway.</p>}
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Stat k={`Slope at (${f(r.at.x)}, ${f(r.at.y)})`} v={<span data-testid="slope">{Number.isFinite(r.at.slope) ? f(r.at.slope) : "undefined (vertical)"}</span>} />
                <Stat k="d²y/dx² there" v={<span data-testid="second">{Number.isFinite(r.at.second) ? f(r.at.second) : "undefined"}</span>} />
                <Stat k="Tangent line" v={<span data-testid="tangent">{r.at.tangent}</span>} />
                <Stat k="Normal line" v={r.at.normal} />
              </dl>
            </div>
          )}
          <ol className="mt-4 space-y-2 text-sm">
            <li><strong>Differentiate both sides with respect to x</strong>, treating y as a function of x (chain rule: d/dx of a y-term = its y-derivative × dy/dx):<br />
              <span className="font-mono">{term(r.Lx, r.Ly)} = {term(r.Rx, r.Ry)}</span></li>
            <li><strong>Collect the dy/dx terms on one side:</strong><br />
              <span className="font-mono">dy/dx·[{diff(r.Ly, r.Ry)}] = {diff(r.Rx, r.Lx)}</span></li>
            <li><strong>Divide and simplify:</strong> <span className="font-mono">dy/dx = {r.dydx}</span></li>
          </ol>
          <p className="mt-3 text-xs subtle">Equivalent shortcut: dy/dx = −F<sub>x</sub>/F<sub>y</sub>, where F = left side − right side. Here ln means natural log and log means base 10.</p>
        </>}
      </ResultCard>
    </div>
  );
}
