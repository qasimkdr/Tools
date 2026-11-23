import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/basis-point-calculator/Calculator";
import Content from "@/tools/basis-point-calculator/Content";
import meta from "@/tools/basis-point-calculator/meta";
import { faq } from "@/tools/basis-point-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>basis point</strong> is one hundredth of a percent: 1 bp = 0.01% = 0.0001, so <strong>25 bps = 0.25%</strong>. Convert in either direction, find the bps change between two rates, see what basis points are worth in dollars, or how a rate move changes a loan payment.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
