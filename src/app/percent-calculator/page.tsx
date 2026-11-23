import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/percent-calculator/Calculator";
import Content from "@/tools/percent-calculator/Content";
import meta from "@/tools/percent-calculator/meta";
import { faq } from "@/tools/percent-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Answer any <strong>percentage question</strong>: 20% of 150 is 30, 30 is 20% of 150, going from 30 to 50 is a 66.7% increase, and 30 and 50 differ by 50%. Pick the calculation and see the answer with every step.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
