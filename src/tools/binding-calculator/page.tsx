import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/binding-calculator/Calculator";
import Content from "@/tools/binding-calculator/Content";
import meta from "@/tools/binding-calculator/meta";
import { faq } from "@/tools/binding-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To work out <strong>quilt binding</strong>, add the four sides plus about 10 inches for joins, then divide by the width of your fabric. A 60 × 72 inch quilt needs 274 inches of binding: <strong>7 strips</strong> of 2½ inch fabric cut across 42 inch cotton, or <strong>½ yard</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
