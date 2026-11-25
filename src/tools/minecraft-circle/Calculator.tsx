"use client";
import { useEffect, useMemo, useRef } from "react";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { countBlocks, pixelEllipse, rowRuns, type CircleStyle } from "@/lib/pixelCircle";

const MAX = 256;
const clampInt = (v: string) => { const n = Math.round(Number(v)); return n >= 1 && n <= MAX ? n : 0; };

export default function MinecraftCircle() {
  const [s, set] = useUrlState({ shape: "circle", d: "21", w: "31", h: "17", style: "thin" });
  const oval = s.shape === "oval";
  const w = oval ? clampInt(s.w) : clampInt(s.d), h = oval ? clampInt(s.h) : w;
  const style = (["thin", "thick", "filled"].includes(s.style) ? s.style : "thin") as CircleStyle;
  const grid = useMemo(() => (w && h ? pixelEllipse(w, h, style) : []), [w, h, style]);
  const blocks = countBlocks(grid);
  const canvas = useRef<HTMLCanvasElement>(null);
  const err = !w || !h ? `Enter a whole number from 1 to ${MAX}.` : null;

  useEffect(() => {
    const c = canvas.current;
    if (!c || !grid.length) return;
    const cell = Math.max(2, Math.min(18, Math.floor(560 / Math.max(w, h))));
    const dpr = window.devicePixelRatio || 1;
    c.width = w * cell * dpr; c.height = h * cell * dpr;
    c.style.width = `${w * cell}px`; c.style.height = `${h * cell}px`;
    const g = c.getContext("2d");
    if (!g) return;
    g.scale(dpr, dpr);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, w * cell, h * cell);
    g.fillStyle = "#0f766e";
    grid.forEach((row, y) => row.forEach((on, x) => { if (on) g.fillRect(x * cell, y * cell, cell, cell); }));
    if (cell >= 6) {
      g.strokeStyle = "rgba(0,0,0,0.12)"; g.lineWidth = 1; g.beginPath();
      for (let x = 0; x <= w; x++) { g.moveTo(x * cell + 0.5, 0); g.lineTo(x * cell + 0.5, h * cell); }
      for (let y = 0; y <= h; y++) { g.moveTo(0, y * cell + 0.5); g.lineTo(w * cell, y * cell + 0.5); }
      g.stroke();
    }
    // Centre guides: a line through the middle block (odd size) or between the two middle blocks (even size).
    g.strokeStyle = "rgba(220,38,38,0.7)"; g.lineWidth = 1.5; g.beginPath();
    g.moveTo((w * cell) / 2, 0); g.lineTo((w * cell) / 2, h * cell); g.moveTo(0, (h * cell) / 2); g.lineTo(w * cell, (h * cell) / 2);
    g.stroke();
  }, [grid, w, h]);

  const download = () => {
    const c = canvas.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png"); a.download = `pixel-${oval ? "oval" : "circle"}-${w}x${h}-${style}.png`; a.click();
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Pixel circle generator">
          <Segmented label="Shape" value={oval ? "oval" : "circle"} onChange={(v) => set("shape", v)} options={[{ id: "circle", label: "Circle" }, { id: "oval", label: "Oval / ellipse" }]} />
          {oval ? (
            <div className="grid grid-cols-2 gap-3">
              <Field id="w" label="Width" suffix="blocks" value={s.w} onChange={(v) => set("w", v)} min={1} inputMode="numeric" />
              <Field id="h" label="Height" suffix="blocks" value={s.h} onChange={(v) => set("h", v)} min={1} inputMode="numeric" />
            </div>
          ) : (
            <Field id="d" label="Diameter" suffix="blocks" value={s.d} onChange={(v) => set("d", v)} min={1} inputMode="numeric" hint="Odd diameters have a single centre block; even ones have a 2 × 2 centre." />
          )}
          <Segmented label="Style" value={style} onChange={(v) => set("style", v)} options={[{ id: "thin", label: "Thin outline" }, { id: "thick", label: "Thick outline" }, { id: "filled", label: "Filled" }]} />
        </form>
        <ResultCard label="Blocks needed" value={err ? "–" : blocks.toLocaleString("en-US")} error={err}>
          <p className="mt-1 text-sm muted">{w} × {h} {oval ? "oval" : "circle"}, {style === "filled" ? "filled" : `${style} outline`}{blocks >= 64 ? ` · ${Math.floor(blocks / 64)} stacks + ${blocks % 64}` : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Centre" v={w % 2 && h % 2 ? "1 block" : w % 2 || h % 2 ? "2 blocks" : "2 × 2 blocks"} />
            <Stat k="Longest row" v={`${Math.max(0, ...grid.map((r) => r.filter(Boolean).length))} blocks`} />
            <Stat k="Rows" v={h} />
            <Stat k="Quarter (≈)" v={`${Math.round(blocks / 4)} blocks`} />
          </dl>
        </ResultCard>
      </div>
      {!err && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Block chart</h2>
            <button type="button" className="btn-ghost text-sm" onClick={download}>Download PNG</button>
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)] bg-white p-3" data-testid="chart">
            <canvas ref={canvas} role="img" aria-label={`${w} by ${h} pixel ${oval ? "oval" : "circle"} chart`} className="mx-auto block" />
          </div>
          <p className="mt-2 text-xs subtle">Red lines mark the centre. Each square is one block.</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold">Row-by-row build guide ({h} rows)</summary>
            <ol className="mt-2 grid gap-1 text-sm sm:grid-cols-2" data-testid="rows">
              {grid.map((row, y) => {
                const runs = rowRuns(row);
                return <li key={y}><span className="font-semibold">Row {y + 1}:</span> {runs.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)).join(", ")} <span className="subtle">({row.filter(Boolean).length})</span></li>;
              })}
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
