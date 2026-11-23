import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/income-tax-calculator/Calculator";
import Content from "@/tools/income-tax-calculator/Content";
import meta from "@/tools/income-tax-calculator/meta";
import { faq } from "@/tools/income-tax-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>2026 federal income tax</strong> with the official IRS brackets. Taxable income is your income minus pre-tax deductions and the standard deduction ($16,100 single, $32,200 married filing jointly). A single filer earning $85,000 with $5,000 in a 401(k) owes about <strong>$8,770</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
