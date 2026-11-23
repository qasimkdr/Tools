import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/pine-straw-calculator/Calculator";
import Content from "@/tools/pine-straw-calculator/Content";
import meta from "@/tools/pine-straw-calculator/meta";
import { faq } from "@/tools/pine-straw-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Divide your bed area by the <strong>coverage per bale</strong> (often 35–50 sq ft at a 2–3 in layer) and add about 10%. Enter your beds or tree rings to get the number of pine straw bales and the cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
