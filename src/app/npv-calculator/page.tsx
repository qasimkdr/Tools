import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/npv-calculator/Calculator";
import Content from "@/tools/npv-calculator/Content";
import meta from "@/tools/npv-calculator/meta";
import { faq } from "@/tools/npv-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate the <strong>net present value</strong> of an investment from its upfront cost, yearly cash flows and your discount rate. You also get the IRR, payback periods and a year-by-year table.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
