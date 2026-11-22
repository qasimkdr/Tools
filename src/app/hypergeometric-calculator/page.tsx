import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/hypergeometric-calculator/Calculator";
import Content from "@/tools/hypergeometric-calculator/Content";
import meta from "@/tools/hypergeometric-calculator/meta";
import { faq } from "@/tools/hypergeometric-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate <strong>hypergeometric probabilities</strong> for drawing without replacement: the chance of exactly, at most or at least k successes, as in card hands, lottery numbers or quality checks. Mean, variance and a distribution chart are included.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
