import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/partial-fraction-calculator/Calculator";
import Content from "@/tools/partial-fraction-calculator/Content";
import meta from "@/tools/partial-fraction-calculator/meta";
import { faq } from "@/tools/partial-fraction-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Break a rational expression into <strong>partial fractions</strong> with every step shown: (3x + 5)/(x² − x − 2) = −2/(3(x + 1)) + 11/(3(x − 2)). It handles repeated factors, irreducible quadratics and improper fractions, with exact answers.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
