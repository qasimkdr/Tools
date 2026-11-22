import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/weighted-mean-calculator/Calculator";
import Content from "@/tools/weighted-mean-calculator/Content";
import meta from "@/tools/weighted-mean-calculator/meta";
import { faq } from "@/tools/weighted-mean-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>The <strong>weighted mean</strong> is Σ(w × x) ÷ Σw: multiply each value by its weight, add the products, and divide by the total weight. Paste your values and weights to get the answer with every step shown.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
