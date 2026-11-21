import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of Use", description: "The terms that govern your use of SolvePilot's free online calculators and content, including acceptable use, intellectual property and limitation of liability.", path: "/terms/" });

export default function Page() {
  return (
    <StaticPage title="Terms of use" path="/terms/" updated="November 21, 2026">
      <p>By using SolvePilot you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Use of the tools</h2>
      <p>Our calculators and guides are free for personal and commercial use. You may not scrape the site at scale, try to disrupt it, or present our content as your own.</p>
      <h2>No professional advice</h2>
      <p>Results are estimates for informational purposes and are not financial, medical, legal or engineering advice. See our disclaimer.</p>
      <h2>Intellectual property</h2>
      <p>The site design, code and written content belong to SolvePilot unless otherwise noted.</p>
      <h2>Limitation of liability</h2>
      <p>The site is provided &quot;as is&quot; without warranties. To the fullest extent permitted by law, SolvePilot is not liable for decisions made based on its results.</p>
      <h2>Changes</h2>
      <p>We may update these terms. Continued use after changes means you accept them.</p>
    </StaticPage>
  );
}
