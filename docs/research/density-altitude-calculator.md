# Brief: Density Altitude Calculator (`/density-altitude-calculator/`) · 2026-11-22
- Primary: "density altitude calculator" (2,900). Research **partial (1 page: omnicalculator 15/25; calctool, calculate.co.nz unreachable)**.
- Source: NWS formula (weather.gov densityAltitude.pdf; vapor pressure, station pressure, virtual temperature, DA = 145366(1 − (17.326P/Tv)^0.235)), rounded to 100 ft; rule of thumb PA + 120 × (OAT − ISA).
## Gaps beaten
US + metric units · optional dew point · PA, ISA temp/deviation, station pressure, RH · NWS vs rule-of-thumb side by side · factor table · POH caveat.
## Test cases
5,000 ft, 90 °F, 30.00 inHg, Td 50 °F → 8,146 → 8,100 ft (dry 8,000); PA 4,920; rule 8,167. Sea-level ISA → 18 ft.
