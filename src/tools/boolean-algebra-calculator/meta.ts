import type { ToolMeta } from "../types";

const meta: ToolMeta = {
  slug: "boolean-algebra-calculator",
  name: "Boolean Algebra Calculator",
  title: "Boolean Algebra Calculator: Simplify, Truth Table, SOP/POS",
  description: "Simplify a Boolean expression to minimal SOP and POS form, see its truth table, minterms and maxterms, and check whether two logic expressions are equivalent.",
  short: "Simplify logic expressions, with truth table, minterms, SOP/POS and equivalence check.",
  category: "math",
  primaryKw: "boolean algebra calculator",
  keywords: ["boolean expression simplifier", "simplify boolean expression", "truth table generator", "logic simplifier", "sum of products calculator", "minterm calculator", "quine mccluskey calculator"],
  related: ["binary-calculator", "matrix-inverse-calculator", "fraction-calculator", "scientific-notation-calculator"],
  sources: [
    { name: "MIT OpenCourseWare 6.004: Computation Structures (Boolean algebra and logic synthesis)", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/" },
    { name: "Wikipedia: Quine–McCluskey algorithm", url: "https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm" },
  ],
  publishAt: "2026-11-30T10:21:00+05:00", // hidden until this time (scripts/publish-scheduled.mjs)
  published: "2026-11-30",
  updated: "2026-11-30",
  icon: "🔣",
};
export default meta;
