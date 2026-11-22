/**
 * Density altitude, National Weather Service method (dew point optional):
 *   e (hPa) = 6.11 × 10^(7.5·Td / (237.7 + Td))                     vapor pressure from dew point (°C)
 *   Pstn (inHg) = altimeter × ((288 − 0.0065·h) / 288)^5.2561       station pressure, h = elevation in meters
 *   Tv (K) = T / (1 − 0.379 · e / Pstn(hPa))                         virtual temperature
 *   DA (ft) = 145366 × (1 − (17.326 · Pstn / Tv(°R))^0.235)
 * Rule of thumb (dry): pressure altitude = elevation + 1000 × (29.92 − altimeter); DA ≈ PA + 120 × (OAT − ISA).
 */
export const HPA_PER_INHG = 33.8639;
export const FT_PER_M = 3.28084;

export function vaporPressureHpa(dewC: number) {
  return 6.11 * 10 ** ((7.5 * dewC) / (237.7 + dewC));
}

export function densityAltitude({ elevFt, tempC, altInHg, dewC }: { elevFt: number; tempC: number; altInHg: number; dewC?: number | null }) {
  const elevM = elevFt / FT_PER_M;
  const pStnInHg = altInHg * ((288 - 0.0065 * elevM) / 288) ** 5.2561;
  const e = dewC == null ? 0 : vaporPressureHpa(dewC);
  const tvK = (tempC + 273.15) / (1 - 0.379 * (e / (pStnInHg * HPA_PER_INHG)));
  const da = 145366 * (1 - ((17.326 * pStnInHg) / (tvK * 1.8)) ** 0.235);
  const pa = elevFt + 1000 * (29.92 - altInHg);
  const isaC = 15 - (2 * pa) / 1000;
  const rh = dewC == null ? null : (100 * vaporPressureHpa(dewC)) / vaporPressureHpa(tempC);
  return { da, pa, isaC, isaDev: tempC - isaC, rule: pa + 120 * (tempC - isaC), pStnInHg, tvC: tvK - 273.15, rh, vaporHpa: e };
}
