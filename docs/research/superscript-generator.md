# Brief: Superscript Generator (`/superscript-generator/`) · 2026-11-22
- Primary: "superscript generator" (9,900). Research **partial (1 page: omnicalculator)**; other tool sites unreachable or thin.
- First "text" category tool (hub goes live). Unicode maps in `src/lib/unicodeText.ts`; title kept plain ASCII for SERP display.
## Gaps beaten
Superscript + subscript + small caps + Smart mode (^, _, {} groups, chemical formulas with opt-out) · reports unconvertible characters · copy button · full character tables · accessibility caveats.
## Test cases
abc123 → ᵃᵇᶜ¹²³ · smart "x^2 + H2O" → x² + H₂O · "Small" small caps → ꜱᴍᴀʟʟ · q flagged missing.
