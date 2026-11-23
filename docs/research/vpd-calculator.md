# Brief: VPD Calculator (`/vpd-calculator/`) · 2026-11-23
- Primary: "vpd calculator" (1,300). Research **partial (1 page: omnicalculator 16/25)**.
- Tetens SVP = 0.61078·e^(17.27T/(T+237.3)); leaf VPD = SVP(leaf) − SVP(air)·RH (Sigrow); stage bands 0.4–0.8 / 0.8–1.2 / 1.2–1.6 kPa (Hydrobuilder), <0.4 humid, >1.6 dry noted as guidance. New lib/vpd.ts.
## Gaps beaten
Leaf offset · stage status · RH needed for stage target · dew point, SVP/AVP · °C/°F · full color VPD chart for current offset.
## Test cases
25 °C, 60%, −2 → leaf 0.91, air 1.27, vegetative; RH 90 → too humid; 1.0 kPa target → ~57% RH.
