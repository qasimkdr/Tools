import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/hypotenuse-calculator/Calculator";
import Content from "@/tools/hypotenuse-calculator/Content";
import meta from "@/tools/hypotenuse-calculator/meta";
import { faq } from "@/tools/hypotenuse-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>hypotenuse of a right triangle</strong> with the Pythagorean theorem, c = √(a² + b²). It also solves a missing leg or works from an angle, with steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
