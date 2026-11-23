import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/interest-calculator/Calculator";
import Content from "@/tools/interest-calculator/Content";
import meta from "@/tools/interest-calculator/meta";
import { faq } from "@/tools/interest-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>simple interest (I = Prt)</strong> or <strong>compound interest (A = P(1 + r/n)^nt)</strong> on savings or a loan. $10,000 at 5% for 10 years earns $5,000 simple or $6,470 compounded monthly. Add monthly deposits to see them grow too.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
