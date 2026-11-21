import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Editorial Policy – How We Research & Test Tools", description: "How SolvePilot researches, builds, tests, reviews and corrects its calculators and guides, including our sourcing standards and our policy on advertising independence.", path: "/editorial-policy/" });

export default function Page() {
  return (
    <StaticPage title="Editorial policy" path="/editorial-policy/" updated="November 21, 2026">
      <h2>How we build each calculator</h2>
      <ol>
        <li><strong>Research:</strong> we study the question people are trying to answer, the formulas and standards involved, and the existing tools. Then we write down what those tools get wrong or leave out.</li>
        <li><strong>Primary sources:</strong> formulas, rates and rules come from official or primary sources such as government agencies, standards bodies and peer-reviewed references. Those sources are cited on the page.</li>
        <li><strong>Testing:</strong> every calculator is checked against hand-worked examples and edge cases before publishing.</li>
        <li><strong>Review:</strong> finance, health and legal-adjacent tools get an additional review by someone with relevant expertise.</li>
        <li><strong>Maintenance:</strong> rule-dependent tools, such as tax, retirement limits or fitness test standards, are re-checked whenever the rules change.</li>
      </ol>
      <h2>Corrections</h2>
      <p>If we find or are told about an error, we fix it promptly and update the page&apos;s last-updated date.</p>
      <h2>Advertising and independence</h2>
      <p>SolvePilot is funded by advertising. Advertisers have no influence over our tools or content. Ads are clearly labelled and kept separate from calculator controls.</p>
      <h2>Use of automation</h2>
      <p>We use software, including AI-assisted drafting, to help research and write. Every page is fact-checked, tested and edited by a person before publishing, and we only publish pages that add something useful beyond what already exists.</p>
    </StaticPage>
  );
}
