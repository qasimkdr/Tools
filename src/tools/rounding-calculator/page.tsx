import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/rounding-calculator/Calculator";
import Content from "@/tools/rounding-calculator/Content";
import meta from "@/tools/rounding-calculator/meta";
import { faq } from "@/tools/rounding-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Round any number</strong> to the nearest whole number, ten, hundred, tenth or hundredth, to significant figures, or to any step. To round, look at the digit after the place you want: 5 or more rounds up. So 3.14159 to the nearest hundredth is <strong>3.14</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
