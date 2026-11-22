import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/right-triangle-calculator/Calculator";
import Content from "@/tools/right-triangle-calculator/Content";
import meta from "@/tools/right-triangle-calculator/meta";
import { faq } from "@/tools/right-triangle-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Solve any right triangle from two values</strong>: two sides, or a side and an angle. Get every side and angle, the area, perimeter and more, with SOHCAHTOA steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
