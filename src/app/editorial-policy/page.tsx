import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Editorial Policy – How We Research & Test Tools", description: "How Mathico researches, builds, tests, reviews and corrects its calculators, including our sourcing standards and our policy on independence from advertisers.", path: "/editorial-policy/" });

export default function Page() {
  return (
    <StaticPage title="Editorial policy" path="/editorial-policy/" updated="November 23, 2026">
      <h2>How we build each calculator</h2>
      <ol>
        <li><strong>Research:</strong> we study the question people are trying to answer, the formulas and standards involved, and the existing tools. Then we write down what those tools get wrong or leave out.</li>
        <li><strong>Primary sources:</strong> formulas, rates and rules come from official or primary sources such as government agencies, standards bodies and peer-reviewed references. Those sources are cited on the page.</li>
        <li><strong>Testing:</strong> every calculator is checked against hand-worked examples and edge cases before publishing.</li>
        <li><strong>High-stakes topics:</strong> finance, health and legal-adjacent tools stick to official published guidance (for example IRS, CDC or American Heart Association figures), state their limits clearly, and are not a substitute for professional advice.</li>
        <li><strong>Maintenance:</strong> rule-dependent tools, such as tax, retirement limits or fitness test standards, are re-checked whenever the rules change.</li>
      </ol>
      <h2>Corrections</h2>
      <p>If we find or are told about an error, we fix it promptly and update the page&apos;s last-updated date.</p>
      <h2>Advertising and independence</h2>
      <p>Mathico is funded by advertising. Advertisers have no influence over our tools or content. Ads are clearly labelled and kept separate from calculator controls.</p>
      <h2>Use of automation</h2>
      <p>We use software, including AI-assisted drafting and coding, to help research, write and build tools. Every figure is checked against its source, every calculator is tested against hand-worked examples and automated tests before release, and pages are published under the editor&apos;s responsibility. We only publish pages that add something useful beyond what already exists.</p>
      <h2>Who is responsible</h2>
      <p>Mathico is edited by <a href="/about/mohammad-qasim/">Mohammad Qasim</a>, founder and editor.</p>
    </StaticPage>
  );
}
