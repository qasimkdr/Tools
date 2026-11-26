import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/binomial-distribution-calculator/Calculator";
import Content from "@/tools/binomial-distribution-calculator/Content";
import meta from "@/tools/binomial-distribution-calculator/meta";
import { faq } from "@/tools/binomial-distribution-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>The <strong>binomial distribution</strong> gives the probability of k successes in n independent trials: P(X = k) = C(n, k) × p^k × (1 − p)^(n − k). The chance of exactly 3 heads in 10 fair coin flips is 120 ÷ 1,024 = <strong>0.1172</strong>. Enter n, p and k for exact, cumulative or range probabilities, with a chart and the working.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
