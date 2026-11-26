import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/llc-tax-calculator/Calculator";
import Content from "@/tools/llc-tax-calculator/Content";
import meta from "@/tools/llc-tax-calculator/meta";
import { faq } from "@/tools/llc-tax-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate the <strong>federal taxes on your LLC profit</strong> for 2026: 15.3% self-employment tax plus income tax after the QBI deduction. A single owner with $90,000 profit pays about <strong>$19,316</strong> (21.5%). Compare that with an S-corp election and a salary.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
