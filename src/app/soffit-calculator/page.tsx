import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/soffit-calculator/Calculator";
import Content from "@/tools/soffit-calculator/Content";
import meta from "@/tools/soffit-calculator/meta";
import { faq } from "@/tools/soffit-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate the <strong>soffit</strong> you need for your eaves and gable rakes: square footage, panels and trim. It also works out the attic intake vent area under the code&apos;s 1/150 and 1/300 rules.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
