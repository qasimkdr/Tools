import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/superscript-generator/Calculator";
import Content from "@/tools/superscript-generator/Content";
import meta from "@/tools/superscript-generator/meta";
import { faq } from "@/tools/superscript-generator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Turn text into <strong>superscript</strong>, subscript or small caps that you can copy and paste anywhere. Smart mode raises exponents (x^2 → x²) and lowers numbers in chemical formulas (H2O → H₂O) automatically.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
