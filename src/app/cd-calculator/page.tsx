import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cd-calculator/Calculator";
import Content from "@/tools/cd-calculator/Content";
import meta from "@/tools/cd-calculator/meta";
import { faq } from "@/tools/cd-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>See how much a <strong>certificate of deposit</strong> will earn: enter the deposit, rate and term to get the interest and value at maturity, with APY and APR, taxes, the early withdrawal penalty and a month-by-month table. Works for fixed deposits (FDs) too.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
