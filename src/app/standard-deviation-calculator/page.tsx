import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/standard-deviation-calculator/Calculator";
import Content from "@/tools/standard-deviation-calculator/Content";
import meta from "@/tools/standard-deviation-calculator/meta";
import { faq } from "@/tools/standard-deviation-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Paste a list of numbers to get the <strong>mean and standard deviation</strong> (sample or population), variance, standard error and a 95% confidence interval, with each step of the calculation shown.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
