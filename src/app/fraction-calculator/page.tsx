import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/fraction-calculator/Calculator";
import Content from "@/tools/fraction-calculator/Content";
import meta from "@/tools/fraction-calculator/meta";
import { faq } from "@/tools/fraction-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Add, subtract, multiply and divide fractions and mixed numbers</strong>, with every step shown. Answers come simplified, as a mixed number and as a decimal.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
