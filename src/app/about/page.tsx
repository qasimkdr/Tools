import Link from "next/link";
import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({ title: "About Mathi – Who We Are & How We Build Tools", description: "Mathi builds free, accurate online calculators with documented formulas, worked examples and tested edge cases. Learn who we are and how every tool is made.", path: "/about/" });

export default function Page() {
  return (
    <StaticPage title="About Mathi" path="/about/">
      <p>{SITE.name} is a free library of online calculators for everyday decisions: counting days to a deadline, comparing loan payments, estimating concrete for a patio, checking a grade. We started it because most calculator sites give you a number with no explanation, cram the page with ads, or get the edge cases wrong.</p>
      <h2>What makes our tools different</h2>
      <ul>
        <li><strong>Documented formulas.</strong> Every tool explains how the result is calculated, including the conventions behind it, such as how months are added or which holidays count.</li>
        <li><strong>Tested edge cases.</strong> We check leap years, month ends, rounding, zero and negative inputs, and unit conversions before publishing.</li>
        <li><strong>Privacy first.</strong> Calculations run in your browser. We don&apos;t ask for accounts or store your inputs.</li>
        <li><strong>Kept up to date.</strong> Tools that depend on rules, rates or limits are reviewed when those rules change, and each page shows its last-updated date.</li>
      </ul>
      <h2>Who is behind Mathi</h2>
      <p>Mathi was founded and is edited by <Link href="/about/mohammad-qasim/">Mohammad Qasim</Link>, a software and web developer who builds, source-checks and tests every calculator. Finance, health and legal-adjacent tools follow official published guidance, cite their sources, and are not a substitute for professional advice. Read our <Link href="/editorial-policy/">editorial policy</Link> to see how we research, test and correct our content.</p>
      <p>Questions or found a mistake? <Link href="/contact/">Contact us</Link>. We read every message and fix confirmed errors quickly.</p>
    </StaticPage>
  );
}
