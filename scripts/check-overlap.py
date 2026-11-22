"""Cross-tool overlap check: does a not-yet-built roadmap page duplicate the intent of a LIVE tool?

Usage:  npm run roadmap:overlap                 (all todo pages)
        npm run roadmap:overlap -- <slug> ...   (specific pages, e.g. before building a batch)

Signals per (todo page, live tool): shared exact keywords, keyword-token Jaccard, and overlap of the core words in the
tool name. It prints CANDIDATES only — the agent then reads both keyword lists and decides:
  • same intent  → set status "covered" + note "covered by /<live-slug>/ (why)" in data/roadmap.json (never build it)
  • different    → build normally (different searches, e.g. "interest calculator" vs "interest rate calculator")
Owner rule (2026-11-22): never create a tool that matches a live one; never edit a live tool to absorb it.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
STOP = set("calculator calculators calc how to the a of in for and what is my do does calculate calculation find online free with from by your formula".split())

def words(s):
    return {w for w in re.split(r"[^a-z0-9]+", s.lower()) if len(w) > 2 and w not in STOP}

def main():
    pages = json.loads((ROOT / "data/roadmap.json").read_text())["pages"]
    live = [p for p in pages if p["status"] == "live"]
    want = set(sys.argv[1:])
    todo = [p for p in pages if p["status"] == "todo" and (not want or p["slug"] in want)]
    rows = []
    for p in todo:
        kws = {k["kw"] for k in p["keywords"]} | {p["primaryKw"]}
        T, C = words(" ".join([p["name"], *kws])), words(p["name"])
        best = None
        for l in live:
            lk = {k["kw"] for k in l["keywords"]} | {l["primaryKw"]}
            LT, LC = words(" ".join([l["name"], *lk])), words(l["name"])
            jac = len(T & LT) / max(1, len(T | LT)); core = len(C & LC) / max(1, len(C)); exact = len(kws & lk)
            score = max(jac, core * 0.9) + 0.5 * (exact > 0)
            if not best or score > best[0]:
                best = (score, l["slug"], jac, core, exact)
        if best and best[0] >= 0.45:
            rows.append((best[0], p["order"], p["slug"], p["primaryKw"], *best[1:]))
    for r in sorted(rows, key=lambda x: -x[0]):
        print(f"{r[0]:.2f}  #{r[1]:<4} {r[2]:<40} ({r[3]})  ~ live /{r[4]}/  jaccard={r[5]:.2f} core={r[6]:.2f} sharedKw={r[7]}")
    print(f"\n{len(rows)} candidate(s) of {len(todo)} checked. Review keywords; mark true overlaps 'covered'.")

if __name__ == "__main__":
    main()
