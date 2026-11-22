import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/money-market-calculator/Calculator";
import Content from "@/tools/money-market-calculator/Content";
import meta from "@/tools/money-market-calculator/meta";
import { faq } from "@/tools/money-market-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate <strong>how much a money market account earns</strong> from your opening deposit, monthly additions, APY or APR and time. You&apos;ll see the final balance, interest earned (before and after tax) and a year-by-year table.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
