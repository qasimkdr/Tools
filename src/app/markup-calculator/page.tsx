import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/markup-calculator/Calculator";
import Content from "@/tools/markup-calculator/Content";
import meta from "@/tools/markup-calculator/meta";
import { faq } from "@/tools/markup-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Markup = profit ÷ cost; margin = profit ÷ price.</strong> A $40 item sold for $60 has a 50% markup but a 33.3% margin. Find a selling price, markup or margin and the profit on any quantity.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
