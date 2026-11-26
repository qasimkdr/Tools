/** Reverse BMI (pure): weight for a target BMI. BMI = kg / m² = 703 × lb / in². */
export const weightKg = (bmi: number, heightM: number) => bmi * heightM * heightM;
export const weightLb = (bmi: number, heightIn: number) => (bmi * heightIn * heightIn) / 703;
export const bmiOf = (kg: number, heightM: number) => kg / (heightM * heightM);

export const CUTOFFS = {
  standard: { under: 18.5, over: 25, obese: 30, label: "WHO / CDC adult categories" },
  asian: { under: 18.5, over: 23, obese: 27.5, label: "WHO public-health action points for Asian populations" },
} as const;
export type CutoffSet = keyof typeof CUTOFFS;

export function category(bmi: number, set: CutoffSet = "standard") {
  const c = CUTOFFS[set];
  return bmi < c.under ? "Underweight" : bmi < c.over ? "Healthy weight" : bmi < c.obese ? "Overweight" : "Obesity";
}
