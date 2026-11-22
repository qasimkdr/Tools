import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/square-root-calculator/Calculator";
import Content from "@/tools/square-root-calculator/Content";
import meta from "@/tools/square-root-calculator/meta";
import { faq } from "@/tools/square-root-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>square root, cube root or any nth root</strong> of a number. Whole numbers are also shown in simplified radical form, such as √72 = 6√2, with steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
