import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/tire-size-calculator/Calculator";
import Content from "@/tools/tire-size-calculator/Content";
import meta from "@/tools/tire-size-calculator/meta";
import { faq } from "@/tools/tire-size-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Convert a <strong>tire size</strong> to inches and compare two sizes. A 225/65R17 tire is <strong>28.52 in</strong> tall with a 5.76 in sidewall; moving to 235/65R17 makes it 1.79% bigger, so 60 mph on the speedometer is really about 61.1 mph.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
