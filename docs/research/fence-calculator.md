# Brief: Fence Calculator (`/fence-calculator/`) · 2026-11-26 · scheduled · construction
- Primary: "fence calculator" (8,100, KD 39) + "fence cost estimator" (1,300). Competitors: inchcalculator 26/30, Omni 17/25. Overlap check: live /fence-post-depth-calculator/ covers hole depth/concrete (different intent; linked).
- Geometry only; post depth rule of thumb ⅓–½ of height (stated as a guide). Lib: `src/lib/fence.ts`.
## Gaps beaten
Privacy vs picket · gates (extra posts, excluded length) · rails per section · board/picket count with extra % · post length · itemised cost · spacing comparison table · fence types table · before-you-build checklist.
## Test cases
100 ft, 8 ft, 1×4 ft gate, 3 rails, 5.5″, 5%: 12 sections, 14 posts, 36 rails, 220 boards, 8 ft posts · picket 50 ft, 3.5 + 2.5: 8 posts, 100 pickets.
- Gap fixes (2026-11-26): shadowbox style (both sides) and concrete per post (hole − post, 80 lb bag ≈ 0.6 cu ft); stockade explained. Tests: shadowbox 269 boards; 10″×2 ft hole, 3.5″ post → 0.92 cu ft, 22 bags for 14 posts.
