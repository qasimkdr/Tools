/**
 * Wire gauge physics + ampacity reference (pure).
 * AWG diameter: d = 0.127 mm × 92^((36 − n)/39), with 1/0 = 0, 2/0 = −1, 3/0 = −2, 4/0 = −3.
 * Resistance from resistivity at conductor temperature (solid conductor; stranded is ~2% higher).
 * Copper ampacities: NEC Table 310.16 (60 °C / 75 °C columns, ≤3 current-carrying conductors, 30 °C ambient).
 * Small-conductor overcurrent limits: NEC 240.4(D) (copper 14 = 15 A, 12 = 20 A, 10 = 30 A).
 */
export const SIZES = ["14", "12", "10", "8", "6", "4", "3", "2", "1", "1/0", "2/0", "3/0", "4/0"] as const;
export type Size = (typeof SIZES)[number];
const awgN = (s: string) => (s.includes("/") ? 1 - Number(s.split("/")[0]) : Number(s));
export const diameterMm = (s: string) => 0.127 * Math.pow(92, (36 - awgN(s)) / 39);
export const areaMm2 = (s: string) => (Math.PI / 4) * diameterMm(s) ** 2;
export const kcmil = (s: string) => (diameterMm(s) / 0.0254) ** 2 / 1000;
const RHO20 = { cu: 1.7241e-8, al: 2.8264e-8 }, ALPHA = { cu: 0.00393, al: 0.00403 };
export type Metal = keyof typeof RHO20;
/** Ohms per 1000 ft at conductor temperature tC. */
export const ohmsPerKft = (s: string, metal: Metal, tC = 75) => (RHO20[metal] * (1 + ALPHA[metal] * (tC - 20)) * 304.8) / (areaMm2(s) * 1e-6);

export const CU_AMPACITY: Record<Size, [number, number]> = {
  "14": [15, 20], "12": [20, 25], "10": [30, 35], "8": [40, 50], "6": [55, 65], "4": [70, 85], "3": [85, 100], "2": [95, 115],
  "1": [110, 130], "1/0": [125, 150], "2/0": [145, 175], "3/0": [165, 200], "4/0": [195, 230],
};
export const CU_CAP: Partial<Record<Size, number>> = { "14": 15, "12": 20, "10": 30 };
/** Copper allowable current: table column, limited by 240.4(D) for 14–10 AWG. */
export const cuAllowed = (s: Size, col: 60 | 75) => Math.min(CU_AMPACITY[s][col === 60 ? 0 : 1], CU_CAP[s] ?? Infinity);

export type System = "dc" | "single" | "three";
/** Voltage drop in volts for one-way length in feet. */
export const voltageDrop = (s: string, metal: Metal, amps: number, feet: number, sys: System) =>
  (sys === "three" ? Math.sqrt(3) : 2) * amps * (ohmsPerKft(s, metal) / 1000) * feet;
