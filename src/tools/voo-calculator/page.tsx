import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/voo-calculator/Calculator";
import Content from "@/tools/voo-calculator/Content";
import meta from "@/tools/voo-calculator/meta";
import { faq } from "@/tools/voo-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Project what an investment in <strong>VOO, the Vanguard S&amp;P 500 ETF</strong>, could grow to. $10,000 plus $500 a month for 20 years becomes about <strong>$424,600 at 10% a year</strong>, after VOO&apos;s 0.03% fee. Compare your own return assumption with VOO&apos;s 14.89% average since 2010.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
