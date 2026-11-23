/** Vapor pressure deficit (kPa), Tetens equation. Pure. */
export const svp = (tC: number) => 0.61078 * Math.exp((17.27 * tC) / (tC + 237.3));
/** Leaf VPD: saturation pressure at leaf temperature minus actual vapor pressure of the air. */
export const leafVpd = (airC: number, rh: number, leafOffset = 0) => svp(airC + leafOffset) - svp(airC) * (rh / 100);
export const airVpd = (airC: number, rh: number) => svp(airC) * (1 - rh / 100);
/** Dew point (°C), Magnus form with the same constants. */
export function dewPoint(airC: number, rh: number) {
  const g = Math.log(rh / 100) + (17.27 * airC) / (237.3 + airC);
  return (237.3 * g) / (17.27 - g);
}
/** RH (%) that gives a target leaf VPD at this air temperature and leaf offset. */
export const rhForVpd = (airC: number, target: number, leafOffset = 0) => (100 * (svp(airC + leafOffset) - target)) / svp(airC);
export const STAGES = [
  { id: "prop", name: "Propagation / seedlings", lo: 0.4, hi: 0.8 },
  { id: "veg", name: "Vegetative growth", lo: 0.8, hi: 1.2 },
  { id: "flower", name: "Flowering / fruiting", lo: 1.2, hi: 1.6 },
] as const;
