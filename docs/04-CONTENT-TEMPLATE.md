# Content template (tool pages & articles)

## Tool page structure (ToolLayout renders the frame; you write `intro`, `Content`, `faq`)
1. **Intro (`intro` prop, 1–2 sentences)**: answer-first. Bold the core promise with the primary keyword in natural form.
2. **Calculator** (above the fold on desktop, first screen on mobile).
3. `## How to use the <tool>`: 3–5 numbered steps, mention every input.
4. `## How <X> is calculated` / `## <X> formula`: `.formula` block + a plain-English explanation + conventions/edge cases.
5. `## Worked examples`: 2–4 realistic scenarios with real numbers and the result. Link related tools inline.
6. `## <Reference table>`: when the SERP/PAA shows lookup intent (e.g. conversion charts, N days table, score charts).
7. `## When to use it / Use cases` or `## Tips`: practical context, mistakes to avoid.
8. `## Note on accuracy/limits` for YMYL: assumptions, sources (link primary sources with `rel="nofollow noopener"` only if untrusted; official sources can be followed).
9. FAQ (5–8): pulled from People Also Ask + keyword cluster questions. Answers 40–80 words, plain text, self-contained.

## Articles (later phase: `/guides/<slug>/`)
Only for informational keywords that a tool can't fully answer (e.g. "how to calculate board feet"). Each article
must embed or link its calculator prominently and use `Article` schema. Target clusters in `00-PROJECT-SUMMARY.md`.

## Voice & style
- Second person, short sentences, US English, active voice. Grade 7–9 readability.
- Specific over generic: numbers, dates, named standards (IRS Pub 15-T, ACI, CDC), not "experts say".
- Bold sparingly (key answers). Use lists and tables for scannability.
- **Banned**: "In today's fast-paced world", "Look no further", "Whether you're X or Y", "It's not X, it's Y",
  "delve", "unlock", "game-changer", "comprehensive guide", stacked rhetorical questions, emoji in body copy,
  repeating the exact keyword more than ~3–4 times in body.
- Never claim things we can't support ("most accurate in the world"). Never copy competitor sentences.

## Lengths (guide, not target)
Simple converter 600–900 words · standard calculator 900–1,500 · finance/health YMYL 1,500–2,500 · programmatic variant 350–600 (unique computed facts).
