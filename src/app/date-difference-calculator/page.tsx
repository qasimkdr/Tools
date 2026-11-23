import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/date-difference-calculator/Calculator";
import Content from "@/tools/date-difference-calculator/Content";
import meta from "@/tools/date-difference-calculator/meta";
import { faq } from "@/tools/date-difference-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find exactly <strong>how much time is between two dates</strong>: years, months and days, total days and weeks, business days with or without holidays, and hours down to the second. January 1 to December 25, 2026 is 358 days.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
