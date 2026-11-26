import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "gc-calculator",
  name: "GC Content Calculator",
  title: "GC Content Calculator: DNA and RNA GC%, Tm, GC Skew",
  description: "Paste a DNA or RNA sequence to get its GC content, AT content, base counts, GC skew, an estimated melting temperature, the reverse complement and GC% by window.",
  short: "GC% of a DNA or RNA sequence, with base counts, Tm, GC skew and windows.",
  category: "science",
  primaryKw: "gc calculator",
  keywords: ["gc content calculator", "dna gc content", "gc percentage calculator", "primer gc content", "gc skew", "oligo melting temperature", "reverse complement"],
  related: ["molecular-weight-calculator", "molarity-calculator", "percent-calculator", "standard-deviation-calculator"],
  sources: [
    { name: "Sigma-Aldrich: Oligonucleotide melting temperature", url: "https://www.sigmaaldrich.com/technical-documents/protocol/genomics/pcr/oligos-melting-temp" },
    { name: "OpenWetWare: Primer Tm estimation methods", url: "https://openwetware.org/wiki/Primer_Tm_estimation_methods" },
  ],
  publishAt: "2026-11-26T08:06:00+05:00",
  published: "2026-11-26",
  updated: "2026-11-26",
  icon: "🧬",
};
export default meta;
