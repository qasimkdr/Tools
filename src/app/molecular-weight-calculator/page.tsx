import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/molecular-weight-calculator/Calculator";
import Content from "@/tools/molecular-weight-calculator/Content";
import meta from "@/tools/molecular-weight-calculator/meta";
import { faq } from "@/tools/molecular-weight-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate the <strong>molar mass (molecular weight)</strong> of any chemical formula, including brackets and hydrates. You also get each element&apos;s mass percent and a grams-to-moles converter.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
