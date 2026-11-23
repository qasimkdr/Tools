import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/decimals-calculator/Calculator";
import Content from "@/tools/decimals-calculator/Content";
import meta from "@/tools/decimals-calculator/meta";
import { faq } from "@/tools/decimals-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Add, subtract, multiply and divide <strong>decimals exactly</strong>, with no floating-point rounding errors. See repeating decimals marked with a bar, the fraction form, the answer rounded to any place and the hand-calculation steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
