import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/stair-calculator/Calculator";
import Content from "@/tools/stair-calculator/Content";
import meta from "@/tools/stair-calculator/meta";
import { faq } from "@/tools/stair-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Plan a staircase from its <strong>total rise</strong>: the number of steps, riser height, total run, stringer length and angle, checked against common building-code limits for riser height and tread depth.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
