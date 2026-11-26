export const faq = [
  { q: "How do you calculate GC content?", a: "Count the G and C bases, divide by the total number of A, T, G and C bases, and multiply by 100. A 23-base sequence with 7 G and 6 C has a GC content of 13 ÷ 23 × 100 = 56.52%." },
  { q: "What is a good GC content for a PCR primer?", a: "Primer design guides commonly recommend about 40–60% GC, with the two primers of a pair having similar melting temperatures. Very GC-rich primers can bind non-specifically; very AT-rich ones may bind weakly." },
  { q: "How is melting temperature estimated?", a: "For sequences under 14 bases, the Wallace rule: Tm = 2(A+T) + 4(G+C) °C. For longer sequences, Tm = 64.9 + 41 × (G + C − 16.4) ÷ N. Both are rough; nearest-neighbor methods that consider sequence order and salt are more accurate." },
  { q: "What is GC skew?", a: "GC skew = (G − C) ÷ (G + C). It shows whether one strand has more G than C. In bacterial genomes the skew often changes sign at the origin and terminus of replication." },
  { q: "Does it work for RNA?", a: "Yes. Paste an RNA sequence with U instead of T; the calculator reports AU content and gives an RNA reverse complement. A sequence mixing T and U is flagged." },
  { q: "How are N and other ambiguous bases handled?", a: "They are counted and shown separately but left out of the GC% calculation, so unknown positions do not lower or raise the GC content." },
  { q: "Can I paste a FASTA file?", a: "Yes. Lines starting with > are treated as headers and ignored, and spaces, line breaks and numbers are removed before counting." },
];
