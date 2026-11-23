# Brief: Redacted Text Generator (`/redacted-text-generator/`) · 2026-11-23 · text
- Primary: "redacted text generator" (1,000, KD 4). Data: `research/redacted-text-generator/report.md` (omnicalculator).
- Lib: `src/lib/redact.ts`.
## Gaps beaten
Three modes (bracketed parts, chosen words, everything) · six bar styles (█ ▇ ■ ▓ X *) · keep punctuation · fixed-width bars to hide word length · count of hidden characters · honest warning that visual redaction is not secure redaction.
## Test cases
"Agent [John Smith] at [9pm]" → names and time barred, 12 characters hidden · everything mode keeps spaces and punctuation.
