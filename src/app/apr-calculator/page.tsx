import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/apr-calculator/Calculator";
import Content from "@/tools/apr-calculator/Content";
import meta from "@/tools/apr-calculator/meta";
import { faq } from "@/tools/apr-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate a loan&apos;s <strong>true APR</strong>, the annual cost including fees, from the interest rate, term and charges such as origination fees or points. It works whether the fees are paid upfront or added to the balance.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
