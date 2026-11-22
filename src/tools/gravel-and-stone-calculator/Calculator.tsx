"use client";
import MaterialEstimator from "@/components/calc/MaterialEstimator";

// Typical densities (US tons per cubic yard). Real values vary with stone type, size and moisture: always editable.
const MATERIALS = [
  { id: "gravel", label: "Gravel / crushed stone (typical)", tonsPerYd3: 1.4 },
  { id: "base", label: "Dense base: road base, crusher run", tonsPerYd3: 1.6 },
  { id: "heavy", label: "Upper range (wet or very dense stone)", tonsPerYd3: 1.7 },
];
export default function GravelCalculator() {
  return <MaterialEstimator noun="Gravel" materials={MATERIALS} defaults={{ l: "50", w: "10", d: "4", du: "in", extra: "10" }} />;
}
