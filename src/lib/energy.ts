/**
 * Energy and macronutrient helpers (pure functions).
 * - BMR: Mifflin–St Jeor (Am J Clin Nutr 1990;51:241–7).
 * - Daily energy = BMR × physical activity level (PAL), bands from FAO/WHO/UNU Human Energy Requirements (2001/2004):
 *   sedentary or light 1.40–1.69, active or moderately active 1.70–1.99, vigorous 2.00–2.39.
 * - Lactation: Dietary Guidelines for Americans 2020–2025 — +330 kcal/day (0–6 months) and +400 kcal/day (7–12 months)
 *   above pre-pregnancy needs, for exclusive breastfeeding.
 * - AMDR (adults): carbohydrate 45–65%, protein 10–35%, fat 20–35% of energy (National Academies).
 * - Protein: RDA 0.8 g/kg; ISSN position stand 1.4–2.0 g/kg/day for most exercising people.
 */
export type Sex = "female" | "male";

export function mifflin(sex: Sex, kg: number, cm: number, age: number): number {
  return 10 * kg + 6.25 * cm - 5 * age + (sex === "male" ? 5 : -161);
}

export const PAL_LEVELS = [
  { id: "1.4", pal: 1.4, label: "Mostly sitting", hint: "Desk job, little walking, no exercise" },
  { id: "1.55", pal: 1.55, label: "Lightly active", hint: "Some walking or light exercise 1–3 days a week" },
  { id: "1.75", pal: 1.75, label: "Moderately active", hint: "On your feet a lot, or exercise most days" },
  { id: "1.9", pal: 1.9, label: "Very active", hint: "Physical job, or hard training 6–7 days a week" },
  { id: "2.2", pal: 2.2, label: "Extremely active", hint: "Heavy manual work plus training, endurance athletes" },
] as const;

export const KCAL_PER = { protein: 4, carbs: 4, fat: 9 } as const;
export const AMDR = { carbs: [45, 65], protein: [10, 35], fat: [20, 35] } as const;

/** Extra calories for breastfeeding (DGA 2020–2025), scaled by the share of the baby's milk that is breast milk. */
export function lactationExtra(stage: "0-6" | "7-12", share: number): number {
  const base = stage === "0-6" ? 330 : 400;
  return Math.round(base * Math.max(0, Math.min(1, share)));
}

export type MacroPlan = { kcal: number; protein: number; carbs: number; fat: number; pct: { protein: number; carbs: number; fat: number } };

/** Protein from g/kg, fat from % of calories, carbohydrate fills the rest (grams/day). */
export function macrosFromProtein(kcal: number, kg: number, proteinGPerKg: number, fatPct: number): MacroPlan {
  const protein = kg * proteinGPerKg;
  const fat = (kcal * fatPct) / 100 / KCAL_PER.fat;
  const carbs = Math.max(0, (kcal - protein * KCAL_PER.protein - fat * KCAL_PER.fat) / KCAL_PER.carbs);
  return plan(kcal, protein, carbs, fat);
}
/** Macros from a percentage split (must total 100). */
export function macrosFromPercent(kcal: number, p: number, c: number, f: number): MacroPlan {
  return plan(kcal, (kcal * p) / 100 / 4, (kcal * c) / 100 / 4, (kcal * f) / 100 / 9);
}
function plan(kcal: number, protein: number, carbs: number, fat: number): MacroPlan {
  const tot = protein * 4 + carbs * 4 + fat * 9 || 1;
  return { kcal, protein, carbs, fat, pct: { protein: (protein * 400) / tot, carbs: (carbs * 400) / tot, fat: (fat * 900) / tot } };
}

export const lbToKg = (lb: number) => lb * 0.45359237;
export const inToCm = (inch: number) => inch * 2.54;
