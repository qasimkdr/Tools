import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cubic-yard-calculator/Calculator";
import Content from "@/tools/cubic-yard-calculator/Content";
import meta from "@/tools/cubic-yard-calculator/meta";
import { faq } from "@/tools/cubic-yard-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how many cubic yards</strong> of soil, mulch, gravel or concrete you need. There are <strong>27 cubic feet in a cubic yard</strong>; enter your measurements in any unit.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
