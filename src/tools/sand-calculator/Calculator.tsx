"use client";
import MaterialEstimator from "@/components/calc/MaterialEstimator";

// Typical densities (US tons per cubic yard); always editable. Dry ≈ 2,700 lb/yd³, wet ≈ 3,240 lb/yd³.
const MATERIALS = [
  { id: "dry", label: "Dry sand", tonsPerYd3: 1.35 },
  { id: "damp", label: "Damp sand", tonsPerYd3: 1.5 },
  { id: "wet", label: "Wet sand", tonsPerYd3: 1.62 },
];
export default function SandCalculator() {
  return <MaterialEstimator noun="Sand" materials={MATERIALS} defaults={{ l: "12", w: "12", d: "1", du: "in", extra: "10" }} />;
}
