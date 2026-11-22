import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/paycheck-calculator/Calculator";
import Content from "@/tools/paycheck-calculator/Content";
import meta from "@/tools/paycheck-calculator/meta";
import { faq } from "@/tools/paycheck-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>take-home pay from an hourly wage</strong>. Enter your wage, hours and overtime to see each paycheck after 2026 federal income tax, Social Security, Medicare, state tax and pre-tax deductions.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
