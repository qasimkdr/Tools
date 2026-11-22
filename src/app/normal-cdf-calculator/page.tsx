import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/normal-cdf-calculator/Calculator";
import Content from "@/tools/normal-cdf-calculator/Content";
import meta from "@/tools/normal-cdf-calculator/meta";
import { faq } from "@/tools/normal-cdf-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find <strong>normal distribution probabilities</strong>: the area below, above or between values on the bell curve, for any mean and standard deviation. It also gives z-scores, a shaded chart, the inverse normal and the matching TI-84 command.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
