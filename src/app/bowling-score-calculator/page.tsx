import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/bowling-score-calculator/Calculator";
import Content from "@/tools/bowling-score-calculator/Content";
import meta from "@/tools/bowling-score-calculator/meta";
import { faq } from "@/tools/bowling-score-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Score a <strong>ten-pin bowling game frame by frame</strong>. Strikes, spares and the 10th-frame bonus balls are handled automatically, with running totals as you go.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
