import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/confidence-interval-calculator/Calculator";
import Content from "@/tools/confidence-interval-calculator/Content";
import meta from "@/tools/confidence-interval-calculator/meta";
import { faq } from "@/tools/confidence-interval-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate a <strong>confidence interval</strong> for a mean (t or z) or a proportion (Wald and Wilson). Enter your sample statistics and confidence level to get the interval, margin of error, standard error and critical value.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
