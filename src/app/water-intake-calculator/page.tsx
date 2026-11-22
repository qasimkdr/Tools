import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/water-intake-calculator/Calculator";
import Content from "@/tools/water-intake-calculator/Content";
import meta from "@/tools/water-intake-calculator/meta";
import { faq } from "@/tools/water-intake-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Most adults should drink about <strong>3.0 liters (12.7 cups) a day for men and 2.2 liters (9.2 cups) for women</strong>, with the rest of their water coming from food. Get your figure in cups, ounces and liters, plus extra for exercise.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
