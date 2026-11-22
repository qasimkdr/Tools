/**
 * Tiny client-side tool search (no dependencies). Ranks tools by name, keywords, blurb and category, tolerates typos
 * (Damerau–Levenshtein) and suggests a corrected query. Pure functions; the index is built once per page load.
 */
export type SearchDoc = { slug: string; name: string; short: string; keywords: string[]; category: string; icon?: string };
type Field = { tokens: string[]; weight: number };
type Indexed = { doc: SearchDoc; fields: Field[]; nameNorm: string };
export type SearchIndex = { docs: Indexed[]; vocab: string[] };
export type SearchResult = { doc: SearchDoc; score: number };

const STOP = new Set(["calculator", "calculators", "calc", "calculate", "calculation", "how", "to", "the", "a", "an", "of", "for", "my", "is", "in", "on", "and", "what", "much", "many", "do", "i", "tool", "online", "free"]);
export const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[()'’]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const tokenize = (s: string) => norm(s).split(" ").filter((t) => t && !STOP.has(t));

/** Optimal-string-alignment distance with an early exit once it exceeds max. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2: number[] = [], prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  let cur: number[] = [];
  for (let i = 1; i <= a.length; i++) {
    cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v; rowMin = Math.min(rowMin, v);
    }
    if (rowMin > max) return max + 1;
    prev2.splice(0, prev2.length, ...prev); prev.splice(0, prev.length, ...cur);
  }
  return prev[b.length];
}
const maxTypos = (len: number) => (len <= 3 ? 0 : len <= 7 ? 1 : 2);

export function buildIndex(docs: SearchDoc[]): SearchIndex {
  const vocab = new Set<string>();
  const out = docs.map((doc) => {
    const fields: Field[] = [
      { tokens: tokenize(doc.name), weight: 3 },
      { tokens: tokenize(doc.keywords.join(" ")), weight: 2 },
      { tokens: tokenize(doc.category), weight: 1.2 },
      { tokens: tokenize(doc.short), weight: 1 },
    ];
    fields.forEach((f) => f.tokens.forEach((t) => vocab.add(t)));
    return { doc, fields, nameNorm: norm(doc.name) };
  });
  return { docs: out, vocab: [...vocab] };
}

/** How well one query token matches one document token (0 = no match). */
function tokenScore(q: string, t: string) {
  if (q === t) return 1;
  if (q.length >= 2 && t.startsWith(q)) return 0.85;
  if (q.length >= 4 && t.length >= 4 && (t.includes(q) || q.startsWith(t))) return 0.6;
  const m = maxTypos(Math.min(q.length, t.length));
  if (m === 0) return 0;
  const d = editDistance(q, t, m);
  return d <= m ? 0.75 - 0.15 * (d - 1) : 0;
}

/** Closest vocabulary word for a token, or the token itself when it's already known or nothing is close. */
function correct(q: string, vocab: string[]) {
  if (vocab.includes(q) || vocab.some((v) => v.startsWith(q))) return q;
  const m = maxTypos(q.length);
  let best = q, bestD = m + 1;
  for (const v of vocab) { const d = editDistance(q, v, m); if (d < bestD || (d === bestD && v.length === q.length)) { best = v; bestD = d; } }
  return bestD <= m ? best : q;
}

export function search(index: SearchIndex, query: string, limit = 8): { results: SearchResult[]; corrected: string | null } {
  const raw = norm(query);
  const q = tokenize(query);
  if (!raw) return { results: [], corrected: null };
  const terms = q.length ? q : raw.split(" "); // a query of only stop-words ("calculator") still searches
  const results: SearchResult[] = [];
  for (const it of index.docs) {
    let score = 0, matched = 0;
    for (const term of terms) {
      let best = 0;
      for (const f of it.fields) for (const t of f.tokens) { const s = tokenScore(term, t) * f.weight; if (s > best) best = s; }
      if (best > 0) matched++;
      score += best;
    }
    if (!matched) continue;
    score *= matched / terms.length; // all words matching beats one strong word
    if (it.nameNorm.includes(raw)) score += 2; // whole phrase in the name
    if (it.nameNorm.startsWith(raw)) score += 1;
    results.push({ doc: it.doc, score });
  }
  results.sort((a, b) => b.score - a.score || a.doc.name.localeCompare(b.doc.name));
  const top = results[0]?.score ?? 0;
  const kept = results.filter((r) => r.score >= top * 0.3); // drop weak tail matches
  const fixed = terms.map((t) => correct(t, index.vocab)).join(" ");
  return { results: kept.slice(0, limit), corrected: fixed !== terms.join(" ") ? fixed : null };
}
