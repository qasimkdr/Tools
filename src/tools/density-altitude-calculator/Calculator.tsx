"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { densityAltitude, FT_PER_M, HPA_PER_INHG } from "@/lib/densityAltitude";

const fToC = (f: number) => ((f - 32) * 5) / 9;
const ft = (n: number) => `${Math.round(n).toLocaleString("en-US")} ft`;
const m = (n: number) => `${Math.round(n / FT_PER_M).toLocaleString("en-US")} m`;

export default function DensityAltitudeCalculator() {
  const [s, set] = useUrlState({ u: "us", elev: "5000", t: "90", alt: "30.00", dew: "50" });
  const metric = s.u === "metric";
  const num = (v: string) => (v.trim() === "" ? NaN : Number(v));
  const elevFt = metric ? num(s.elev) * FT_PER_M : num(s.elev);
  const tempC = metric ? num(s.t) : fToC(num(s.t));
  const altInHg = metric ? num(s.alt) / HPA_PER_INHG : num(s.alt);
  const dewC = s.dew.trim() === "" ? null : metric ? num(s.dew) : fToC(num(s.dew));
  const err = !Number.isFinite(elevFt) || elevFt < -2000 || elevFt > 40000 ? "Enter a field elevation between −2,000 and 40,000 ft."
    : !Number.isFinite(tempC) || tempC < -60 || tempC > 60 ? "Enter a temperature between −60 and 60 °C (−76 to 140 °F)."
    : !(altInHg > 25 && altInHg < 32) ? (metric ? "Enter an altimeter setting (QNH) between about 850 and 1080 hPa." : "Enter an altimeter setting between 25 and 32 inHg.")
    : dewC != null && (!Number.isFinite(dewC) || dewC > tempC) ? "Dew point can't be higher than the temperature." : null;
  const r = err ? null : densityAltitude({ elevFt, tempC, altInHg, dewC });
  const round100 = (n: number) => Math.round(n / 100) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Density altitude calculator">
        <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft · °F · inHg" }, { id: "metric", label: "m · °C · hPa" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="elev" label="Field elevation" suffix={metric ? "m" : "ft"} value={s.elev} onChange={(v) => set("elev", v)} />
          <Field id="t" label="Outside air temp" suffix={metric ? "°C" : "°F"} value={s.t} onChange={(v) => set("t", v)} />
          <Field id="alt" label="Altimeter setting" suffix={metric ? "hPa" : "inHg"} value={s.alt} onChange={(v) => set("alt", v)} hint="From the METAR/ATIS (QNH)" />
          <Field id="dew" label="Dew point (optional)" suffix={metric ? "°C" : "°F"} value={s.dew} onChange={(v) => set("dew", v)} hint="Leave blank for dry air" />
        </div>
      </form>
      <ResultCard label="Density altitude" error={err} value={r ? ft(round100(r.da)) : "–"}>
        {r && <>
          <p className="mt-1 text-sm muted">{m(round100(r.da))} · {ft(r.da - elevFt)} above field elevation{dewC == null ? " · dry air" : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Pressure altitude" v={<span data-testid="pa">{ft(r.pa)}</span>} />
            <Stat k="ISA temperature there" v={`${r.isaC.toFixed(1)} °C (${(r.isaC * 1.8 + 32).toFixed(0)} °F)`} />
            <Stat k="ISA deviation" v={`${r.isaDev >= 0 ? "+" : ""}${r.isaDev.toFixed(1)} °C`} />
            <Stat k="Rule of thumb (dry)" v={<span data-testid="rule">{ft(r.rule)}</span>} />
            <Stat k="Station pressure" v={`${r.pStnInHg.toFixed(2)} inHg (${(r.pStnInHg * HPA_PER_INHG).toFixed(0)} hPa)`} />
            {r.rh != null && <Stat k="Relative humidity" v={`${r.rh.toFixed(0)}%`} />}
          </dl>
          <p className="mt-4 text-sm muted">{r.da - elevFt > 2000 ? "High density altitude: expect longer takeoff rolls, slower climbs and less engine and propeller performance than at the field's elevation." : r.da < elevFt ? "Density altitude is below field elevation: the air is denser than standard, so performance is better than book values at this elevation." : "Check your aircraft's performance charts for this density altitude."}</p>
          <p className="mt-2 text-xs subtle">For planning and education. Always use the aircraft flight manual (POH/AFM) performance charts and current official weather.</p>
        </>}
      </ResultCard>
    </div>
  );
}
