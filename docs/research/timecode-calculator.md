# Brief: Timecode Calculator (`/timecode-calculator/`) · 2026-11-26 · scheduled · time-date
- Primary: "timecode calculator" (1,300, KD 11). SERP is mostly apps (Mac/Windows/iOS) plus Omni (18/25, frames-to-timecode only); bushe.co and bchillmix not scored. Category set to time-date (roadmap said science).
- Drop-frame rules (SMPTE; Wikipedia): skip 2 numbers (4 at 59.94) each minute except every 10th. Lib: `src/lib/timecode.ts`, round-trip tested over 2 h at 29.97 DF and 1 h at 59.94 DF.
## Gaps beaten
Add/subtract + both conversions in one tool · 11 frame rates incl. 23.976, 29.97/59.94 DF and NDF · invalid DF codes flagged · real clock time vs nominal · rates table · 6 FAQs.
## Test cases
00:59:59;29 + 1 = 01:00:00;00 (107,892 frames, real 59:59.996) · 25 fps 00:10:00:00 + 00:05:30:12 = 00:15:30:12 · 25,015 @ 60 = 00:06:56:55 · 00:01:00;00 invalid.
- Feature parity (seo:gaps, 2026-11-26): step-by-step working (timecode → frames incl. drop-frame subtraction, frames → timecode incl. add-back).
