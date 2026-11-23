import Link from "next/link";
import StaticPage from "@/components/StaticPage";
import JsonLd from "@/components/JsonLd";
import { ld, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";
import { TOOLS } from "@/tools/registry";

export const metadata = pageMeta({
  title: "Mohammad Qasim – Founder & Editor of SolvePilot",
  description: "Mohammad Qasim is a software and web developer and the founder and editor of SolvePilot, who builds, source-checks and tests every calculator on the site.",
  path: "/about/mohammad-qasim/",
  ogType: "website",
});

export default function Page() {
  const recent = [...TOOLS].sort((a, b) => (a.published < b.published ? 1 : -1)).slice(0, 6);
  return (
    <StaticPage title="Mohammad Qasim" path="/about/mohammad-qasim/">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: abs("/about/mohammad-qasim/"), mainEntity: ld.person() }} />
      <p className="text-lg"><strong>{SITE.editor.role}, {SITE.name}</strong></p>
      <p>{SITE.editor.bio}</p>
      <h2>What Mohammad does on SolvePilot</h2>
      <ul>
        <li><strong>Builds the tools.</strong> Every calculator is written, tested and maintained in-house, with the formulas shown on the page.</li>
        <li><strong>Checks the sources.</strong> Rates, limits and rules come from official and primary sources such as government agencies, standards bodies and published research, and each tool lists or links them.</li>
        <li><strong>Tests before publishing.</strong> Each calculator is checked against hand-worked examples and edge cases, with automated tests that run before every release.</li>
        <li><strong>Fixes errors quickly.</strong> Reported mistakes are corrected and the page&apos;s last-updated date is changed.</li>
      </ul>
      <h2>Background</h2>
      <p>Mohammad is a software and web developer. SolvePilot&apos;s calculators explain how each result is worked out, so you can check the math yourself. Health, finance and legal-adjacent tools follow published official guidance and are not a substitute for professional advice.</p>
      <h2>Recently published tools</h2>
      <ul>{recent.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}</Link></li>)}</ul>
      <p>Read how tools are made in the <Link href="/editorial-policy/">editorial policy</Link>, browse <Link href="/tools/">all calculators</Link>, or <Link href="/contact/">get in touch</Link> to report a mistake.</p>
    </StaticPage>
  );
}
