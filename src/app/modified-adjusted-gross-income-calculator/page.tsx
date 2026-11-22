import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/modified-adjusted-gross-income-calculator/Calculator";
import Content from "@/tools/modified-adjusted-gross-income-calculator/Content";
import meta from "@/tools/modified-adjusted-gross-income-calculator/meta";
import { faq } from "@/tools/modified-adjusted-gross-income-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate your <strong>modified adjusted gross income (MAGI)</strong> the way it&apos;s defined for Roth IRA limits, ACA Marketplace subsidies or Medicare premiums. For a Roth IRA, it also shows how much you can contribute for 2026.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
