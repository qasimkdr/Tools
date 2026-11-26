import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cpm-calculator/Calculator";
import Content from "@/tools/cpm-calculator/Content";
import meta from "@/tools/cpm-calculator/meta";
import { faq } from "@/tools/cpm-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>CPM</strong> is the cost of 1,000 ad impressions: total cost ÷ impressions × 1,000. A campaign that cost $500 for 250,000 impressions has a CPM of <strong>$2.00</strong>. Enter any two of cost, impressions and CPM to find the third, and add clicks to get CTR and cost per click.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
