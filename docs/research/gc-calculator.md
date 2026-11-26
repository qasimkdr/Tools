# Brief: GC Content Calculator (`/gc-calculator/`) · 2026-11-26 · published immediately · science
- Primary: "gc calculator" (1,300, KD 6). Mixed SERP: Agilent gas-chromatography calculators (2 results) next to DNA GC-content tools (Iowa State, MyCalcBuddy, Science Buddies). We serve the DNA GC-content intent; no competitor page could be inspected by the crawler, so there is no score.
- Formulas (Sigma-Aldrich oligo Tm page, OpenWetWare): GC% = (G+C)/(A+T+G+C); Wallace 2(A+T)+4(G+C) under 14 nt; 64.9 + 41(G+C−16.4)/N otherwise. Lib: `src/lib/dna.ts`.
## Gaps beaten
FASTA paste · DNA and RNA · ambiguous bases excluded from GC% but counted · GC skew · Tm with the method named and its limits · reverse complement with copy · GC% by sliding window chart · worked example.
## Test cases
ATGCGCGATTACGCGTATAGCGC: A5 T5 G7 C6, GC 56.52%, skew 0.077, Tm 58.8 °C, RC GCGCTATACGCGTAATCGCGCAT · ATGCATGC: Tm 24 °C · AUGCNN: 50%, RC NNGCAU.
