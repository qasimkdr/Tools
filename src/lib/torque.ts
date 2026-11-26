/** Torque units (pure). Factors to newton-metres; 1 lbf·ft = 1.3558179483314004 N·m (exact from 0.45359237 kg, 0.3048 m, 9.80665 m/s²). */
export const TORQUE = {
  nm: { label: "newton-metres (N·m)", short: "N·m", f: 1 },
  ftlb: { label: "foot-pounds (ft·lbf)", short: "ft·lb", f: 1.3558179483314004 },
  inlb: { label: "inch-pounds (in·lbf)", short: "in·lb", f: 0.1129848290276167 },
  kgfm: { label: "kilogram-force metres (kgf·m)", short: "kgf·m", f: 9.80665 },
  kgfcm: { label: "kilogram-force centimetres (kgf·cm)", short: "kgf·cm", f: 0.0980665 },
  ozin: { label: "ounce-force inches (ozf·in)", short: "ozf·in", f: 0.1129848290276167 / 16 },
  dnm: { label: "decinewton-metres (dN·m)", short: "dN·m", f: 0.1 },
} as const;
export type TorqueUnit = keyof typeof TORQUE;
export const convertTorque = (v: number, from: TorqueUnit, to: TorqueUnit) => (v * TORQUE[from].f) / TORQUE[to].f;
