import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/implicit-differentiation-calculator/Calculator";
import Content from "@/tools/implicit-differentiation-calculator/Content";
import meta from "@/tools/implicit-differentiation-calculator/meta";
import { faq } from "@/tools/implicit-differentiation-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find <strong>dy/dx by implicit differentiation</strong> with every step. For x² + y² = 25, dy/dx = −x/y, so the slope at (3, 4) is −0.75. Enter a point to also get the second derivative and the tangent and normal lines.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
