import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/proportion-calculator/Calculator";
import Content from "@/tools/proportion-calculator/Content";
import meta from "@/tools/proportion-calculator/meta";
import { faq } from "@/tools/proportion-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Enter three numbers to <strong>solve a proportion for x</strong>. Each answer shows the cross-multiplication steps, and works for direct and inverse proportions.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
