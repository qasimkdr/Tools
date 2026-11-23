import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/time-off-calculator/Calculator";
import Content from "@/tools/time-off-calculator/Content";
import meta from "@/tools/time-off-calculator/meta";
import { faq } from "@/tools/time-off-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>See how much <strong>paid time off you earn per paycheck</strong> (yearly PTO hours ÷ pay periods) and per hour worked, then project your balance after future pay periods and planned vacations, including any cap.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
