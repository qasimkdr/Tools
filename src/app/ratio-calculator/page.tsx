import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ratio-calculator/Calculator";
import Content from "@/tools/ratio-calculator/Content";
import meta from "@/tools/ratio-calculator/meta";
import { faq } from "@/tools/ratio-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Simplify a ratio</strong> (12:18 = 2:3), solve A:B = C:D, scale a ratio or split a total. Each answer comes with percentages, fractions and steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
