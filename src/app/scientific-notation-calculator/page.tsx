import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/scientific-notation-calculator/Calculator";
import Content from "@/tools/scientific-notation-calculator/Content";
import meta from "@/tools/scientific-notation-calculator/meta";
import { faq } from "@/tools/scientific-notation-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Convert any number to scientific notation</strong> and back, with E and engineering notation and significant figures. You can also multiply, divide, add or subtract numbers in scientific notation, with the steps explained.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
