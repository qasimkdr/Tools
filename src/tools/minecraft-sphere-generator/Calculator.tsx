"use client";
import { useEffect, useMemo, useRef } from "react";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { layer, layerCounts, stacks, type Shell } from "@/lib/sphere";

const MAX = 100;
const clampInt = (v: string) => { const n = Math.round(Number(v)); return n >= 1 && n <= MAX ? n : 0; };

export default function MinecraftSphereGenerator() {
  const [s, set] = useUrlState({ shape: "sphere", d: "15", w: "21", h: "13", l: "21", shell: "thin", dome: "0", y: "" });
  const ell = s.shape === "ellipsoid";
  const w = ell ? clampInt(s.w) : clampInt(s.d), h = ell ? clampInt(s.h) : w, d = ell ? clampInt(s.l) : w;
  const shell = (["thin", "thick", "filled"].includes(s.shell) ? s.shell : "thin") as Shell;
  const dome = s.dome === "1";
  const err = !w || !h || !d ? `Enter whole numbers from 1 to ${MAX}.` : null;
  const counts = useMemo(() => (err ? [] : layerCounts(w, h, d, shell)), [w, h, d, shell, err]);
  const first = dome ? Math.floor(h / 2) : 0; // dome = upper half (middle layer included when the height is odd)
  const shown = counts.slice(first);
  const total = shown.reduce((a, b) => a + b, 0);
  const nLayers = shown.length;
  const ly = Math.min(Math.max(1, Math.round(Number(s.y)) || Math.ceil(nLayers / 2)), Math.max(1, nLayers)); // 1-based within shown layers
  const grid = useMemo(() => (err ? [] : layer(w, h, d, first + ly - 1, shell)), [w, h, d, first, ly, shell, err]);
  const below = useMemo(() => (err || ly <= 1 ? [] : layer(w, h, d, first + ly - 2, shell)), [w, h, d, first, ly, shell, err]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const st = stacks(total);

  useEffect(() => {
    const c = canvas.current;
    if (!c || !grid.length) return;
    const cell = Math.max(3, Math.min(20, Math.floor(520 / Math.max(w, d))));
    const dpr = window.devicePixelRatio || 1;
    c.width = w * cell * dpr; c.height = d * cell * dpr;
    c.style.width = `${w * cell}px`; c.style.height = `${d * cell}px`;
    const g = c.getContext("2d");
    if (!g) return;
    g.scale(dpr, dpr);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, w * cell, d * cell);
    g.fillStyle = "rgba(15,118,110,0.18)";
    below.forEach((row, z) => row.forEach((on, x) => { if (on) g.fillRect(x * cell, z * cell, cell, cell); }));
    g.fillStyle = "#0f766e";
    grid.forEach((row, z) => row.forEach((on, x) => { if (on) g.fillRect(x * cell + 1, z * cell + 1, cell - 2, cell - 2); }));
    if (cell >= 6) {
      g.strokeStyle = "rgba(0,0,0,0.1)"; g.lineWidth = 1; g.beginPath();
      for (let x = 0; x <= w; x++) { g.moveTo(x * cell + 0.5, 0); g.lineTo(x * cell + 0.5, d * cell); }
      for (let z = 0; z <= d; z++) { g.moveTo(0, z * cell + 0.5); g.lineTo(w * cell, z * cell + 0.5); }
      g.stroke();
    }
    g.strokeStyle = "rgba(220,38,38,0.7)"; g.lineWidth = 1.5; g.beginPath();
    g.moveTo((w * cell) / 2, 0); g.lineTo((w * cell) / 2, d * cell); g.moveTo(0, (d * cell) / 2); g.lineTo(w * cell, (d * cell) / 2);
    g.stroke();
  }, [grid, below, w, d]);

  const download = () => {
    const c = canvas.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png"); a.download = `sphere-${w}x${h}x${d}-${shell}-layer-${ly}.png`; a.click();
  };
  const go = (n: number) => set("y", String(Math.min(nLayers, Math.max(1, n))));

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Sphere generator">
          <Segmented label="Shape" value={ell ? "ellipsoid" : "sphere"} onChange={(v) => { set("shape", v); set("y", ""); }} options={[{ id: "sphere", label: "Sphere" }, { id: "ellipsoid", label: "Ellipsoid" }]} />
          {ell ? (
            <div className="grid grid-cols-3 gap-3">
              <Field id="w" label="Width (X)" value={s.w} onChange={(v) => { set("w", v); set("y", ""); }} min={1} inputMode="numeric" />
              <Field id="h" label="Height (Y)" value={s.h} onChange={(v) => { set("h", v); set("y", ""); }} min={1} inputMode="numeric" />
              <Field id="l" label="Length (Z)" value={s.l} onChange={(v) => { set("l", v); set("y", ""); }} min={1} inputMode="numeric" />
            </div>
          ) : (
            <Field id="d" label="Diameter" suffix="blocks" value={s.d} onChange={(v) => { set("d", v); set("y", ""); }} min={1} inputMode="numeric" hint="Odd diameters have one centre block; even ones a 2 × 2 centre." />
          )}
          <Segmented label="Walls" value={shell} onChange={(v) => set("shell", v)} options={[{ id: "thin", label: "Hollow (thin)" }, { id: "thick", label: "Hollow (thick)" }, { id: "filled", label: "Filled" }]} />
          <Segmented label="Build" value={dome ? "1" : "0"} onChange={(v) => { set("dome", v); set("y", ""); }} options={[{ id: "0", label: "Whole shape" }, { id: "1", label: "Dome (top half)" }]} />
          <p className="text-xs subtle">Thin walls touch only at edges and can show gaps from some angles; thick walls are watertight.</p>
        </form>
        <ResultCard label="Blocks needed" value={err ? "–" : <span data-testid="total">{total.toLocaleString("en-US")}</span>} error={err}>
          {!err && <>
            <p className="mt-1 text-sm muted">{ell ? `${w} × ${h} × ${d} ellipsoid` : `${w}-block sphere`}{dome ? " dome" : ""}, {shell === "filled" ? "filled" : `${shell} hollow walls`}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Stacks of 64" v={<span data-testid="stacks">{st.stacks} + {st.rest}</span>} />
              <Stat k="Shulker boxes" v={st.shulkers.toFixed(2)} />
              <Stat k="Layers to build" v={<span data-testid="layers">{nLayers}</span>} />
              <Stat k="Biggest layer" v={`${Math.max(...shown)} blocks`} />
            </dl>
          </>}
        </ResultCard>
      </div>
      {!err && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Layer {ly} of {nLayers} <span className="font-normal subtle">({grid.flat().filter(Boolean).length} blocks)</span></h2>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost px-3 py-1.5 text-sm" onClick={() => go(ly - 1)} disabled={ly <= 1} aria-label="Previous layer">↓ Down</button>
              <button type="button" className="btn-ghost px-3 py-1.5 text-sm" onClick={() => go(ly + 1)} disabled={ly >= nLayers} aria-label="Next layer">↑ Up</button>
              <button type="button" className="btn-ghost px-3 py-1.5 text-sm" onClick={download}>PNG</button>
            </div>
          </div>
          <label htmlFor="ly" className="sr-only">Layer</label>
          <input id="ly" type="range" min={1} max={nLayers} value={ly} onChange={(e) => go(Number(e.target.value))} className="mt-3 w-full" />
          <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)] bg-white p-3" data-testid="chart">
            <canvas ref={canvas} role="img" aria-label={`Layer ${ly} of the shape seen from above`} className="mx-auto block" />
          </div>
          <p className="mt-2 text-xs subtle">Seen from above. Dark squares are this layer; light squares show the layer below. Red lines mark the centre. Layer 1 is the bottom.</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold">Blocks per layer ({nLayers} layers)</summary>
            <ol className="mt-2 grid grid-cols-2 gap-1 text-sm sm:grid-cols-4" data-testid="per-layer">
              {shown.map((c, i) => <li key={i}><button type="button" className="underline-offset-2 hover:underline" onClick={() => go(i + 1)}>Layer {i + 1}</button>: {c}</li>)}
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
