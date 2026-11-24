import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Disclaimer", description: "Mathico calculators provide estimates for general information only. They are not a substitute for professional financial, medical, legal or engineering advice.", path: "/disclaimer/" });

export default function Page() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer/" updated="November 21, 2026">
      <p>All calculators and articles on Mathico are for general information and educational purposes. We work hard to make every result accurate, but we can&apos;t guarantee it is complete or right for your situation.</p>
      <ul>
        <li><strong>Financial tools</strong> are estimates and are not financial, tax or investment advice. Consult a qualified professional.</li>
        <li><strong>Health and fitness tools</strong> are not medical advice, diagnosis or treatment. Talk to a healthcare provider about medical decisions.</li>
        <li><strong>Construction estimates</strong> do not replace professional measurement, local building codes or engineering review. Order extra material to allow for waste.</li>
        <li><strong>Date and deadline tools</strong> follow common counting conventions. Legal and official deadlines may use different rules.</li>
      </ul>
    </StaticPage>
  );
}
