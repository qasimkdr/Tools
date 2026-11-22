import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/sourdough-calculator/Calculator";
import Content from "@/tools/sourdough-calculator/Content";
import meta from "@/tools/sourdough-calculator/meta";
import { faq } from "@/tools/sourdough-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Get exact <strong>flour, water, starter and salt weights</strong> for your sourdough from the loaf size and baker&apos;s percentages. The starter&apos;s own flour and water are counted, so your hydration is the real one. Includes a starter feeding calculator.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
