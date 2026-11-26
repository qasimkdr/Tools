import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/boolean-algebra-calculator/Calculator";
import Content from "@/tools/boolean-algebra-calculator/Content";
import meta from "@/tools/boolean-algebra-calculator/meta";
import { faq } from "@/tools/boolean-algebra-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Enter a <strong>Boolean expression</strong> to simplify it to its minimal form and see the full truth table. For example, AB + A&apos;C + BC simplifies to <strong>AB + A&apos;C</strong>, because BC is redundant (the consensus theorem). You also get the product-of-sums form, minterms, maxterms and an equivalence check.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
