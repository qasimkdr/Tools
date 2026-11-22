# Brief: Wire Size Calculator (`/wire-size-calculator/`) · 2026-11-22 · safety-sensitive
- Primary: "wire gauge calculator" (5,400) + "wire size calculator". Data: `research/wire-size-calculator/report.md` (inchcalculator, omnicalculator, calculator.net voltage drop).
- Verified: NEC 310.16 copper 60/75 °C 14–4/0 (multiple sources) · 240.4(D) caps 15/20/30 A · aluminum 75 °C only partially verified → aluminum sized for voltage drop only, with explicit warning. Resistance from resistivity at 75 °C matches NEC Ch.9 Table 8 (12 AWG 1.93, 10 AWG 1.21).
## Gaps beaten
Ampacity AND voltage drop in one answer · DC / 1φ / 3φ · 60/75 °C column · continuous ×125% · full table with per-size drop and max amps · AWG chart (mm, in, mm², kcmil, Ω) · strong safety framing.
## Test cases
20 A 120 V 100 ft Cu → 8 AWG (2.55%; ampacity alone 12 AWG) · 30 A 240 V 50 ft → 10 AWG (1.52%) · 16 A continuous 25 ft → 12 AWG.
