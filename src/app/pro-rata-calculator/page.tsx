import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/pro-rata-calculator/Calculator";
import Content from "@/tools/pro-rata-calculator/Content";
import meta from "@/tools/pro-rata-calculator/meta";
import { faq } from "@/tools/pro-rata-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Prorate any amount</strong> by the share actually used: rent or bills for a partial month with three day-count methods, refunds for unused time, or a part-time salary by hours.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
