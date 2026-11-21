# AdSense readiness & policy rules

## Before applying (owner checklist)
- [ ] Custom domain on HTTPS, live for ≥ 2–4 weeks with real indexed pages (Google sets no official minimum,
      but sites with ~20–30 genuinely useful, indexed pages get approved far more reliably).
- [ ] Pages complete: no "coming soon", no empty categories, no broken links (our build only links published pages).
- [ ] Legal/trust pages live: About, Contact (real monitored email), Privacy Policy (mentions Google cookies,
      opt-out links, EEA consent), Terms, Disclaimer, Editorial Policy. ✅ scaffolded in `src/app/*`; owner must replace
      TODO placeholders (real names, email).
- [ ] Real authorship: replace "SolvePilot Editorial Team" in `src/lib/site.ts` with real person(s) + bio on /about/.
- [ ] Search Console verified, sitemap submitted, pages indexed (check `site:` + GSC Pages report).
- [ ] `public/ads.txt` created after approval: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
- [ ] AdSense → Privacy & messaging → enable Google's certified CMP for EEA/UK/CH (required for personalised ads).
- [ ] Set `NEXT_PUBLIC_ADSENSE_CLIENT` (+ slot ids `NEXT_PUBLIC_AD_SLOT_INARTICLE`, `NEXT_PUBLIC_AD_SLOT_SIDEBAR`) at build.

## Placement rules (UX + policy + CWV)
- Max 3 manual units per tool page: 1 in-article (after the main content), 1 sticky sidebar (desktop only), optionally 1 after FAQ.
- **Never** inside the calculator card, never adjacent to buttons/inputs (accidental clicks = invalid traffic),
  never above the H1, never styled to look like content or navigation. Label: "Advertisement" (done in `AdSlot`).
- Always reserve height (`minH`) → no layout shift. Script loads `lazyOnload`.
- Auto ads: keep OFF until we have CWV data; if enabled later, exclude the calculator area and limit ad load.
- Never click own ads, never ask users to click, never place ads on 404/legal/thank-you pages.

## Content policy (affects BOTH AdSense and Search)
- No dangerous/illegal-product content: unapproved drug/peptide dosing (BPC-157, TB-500, PT-141, reconstitution),
  drug-test evasion (EtG), weapons manufacturing. These roadmap rows are on `hold`.
- Adult/sexual content not allowed (breast implant sizing is on hold for review).
- YMYL (money, health, legal): primary-source citations, conservative wording, visible disclaimer link, reviewer
  name, "not medical/financial advice" note near results. Clinical calculators (ABG, anion gap, ANC, corrected calcium)
  only with a qualified medical reviewer.
- No copyrighted text copied from competitors. Facts/formulas are fine; rewrite explanations in our own words.
- Trademarked names (e.g. "Southwire", "Weight Watchers"): describe compatibility ("points-style calculator"), don't imply affiliation.
- Brand/navigational keywords from competitor exports (calculator.net, nemin.io, bythelaws.com…) are excluded — never target another site's brand.
