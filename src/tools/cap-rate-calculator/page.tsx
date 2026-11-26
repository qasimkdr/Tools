import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cap-rate-calculator/Calculator";
import Content from "@/tools/cap-rate-calculator/Content";
import meta from "@/tools/cap-rate-calculator/meta";
import { faq } from "@/tools/cap-rate-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>The <strong>cap rate</strong> is a property&apos;s net operating income (NOI) divided by its value. A $400,000 rental with $38,400 a year in rent, 5% vacancy and $12,918 in operating expenses has an NOI of $23,562, a cap rate of <strong>5.89%</strong>. Mortgage payments are not part of the calculation.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
