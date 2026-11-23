import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/simplify-radicals-calculator/Calculator";
import Content from "@/tools/simplify-radicals-calculator/Content";
import meta from "@/tools/simplify-radicals-calculator/meta";
import { faq } from "@/tools/simplify-radicals-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Write any square root, cube root or nth root in <strong>simplest radical form</strong>: √72 = 6√2 and ∛54 = 3∛2. See the prime factorization, which factors come out of the root and the decimal value.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
