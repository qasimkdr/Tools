/** Watt-hours (pure). 1 Wh = 3,600 J. Battery energy = V × Ah. */
export const whFromPower = (w: number, hours: number) => w * hours;
export const whFromBattery = (volts: number, ah: number) => volts * ah;
export const ahFromWh = (wh: number, volts: number) => (volts > 0 ? wh / volts : NaN);
export const runtimeHours = (wh: number, loadW: number, efficiencyPct = 100) => (loadW > 0 ? (wh * efficiencyPct) / 100 / loadW : NaN);
/** FAA PackSafe tiers for lithium-ion batteries on passenger aircraft. */
export function faaTier(wh: number) {
  if (wh <= 100) return { tier: "allowed", text: "Up to 100 Wh: generally allowed in carry-on (spares must stay in carry-on)." };
  if (wh <= 160) return { tier: "approval", text: "101–160 Wh: needs airline approval; up to two spares, carry-on only." };
  return { tier: "forbidden", text: "Over 160 Wh: forbidden on passenger aircraft." };
}
