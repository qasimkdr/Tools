import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/days-from-today/Calculator";
import Content from "@/tools/days-from-today/Content";
import meta from "@/tools/days-from-today/meta";
import { faq } from "@/tools/days-from-today/faq";
import { BUILD_ISO } from "@/lib/build";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the exact date any number of <strong>days, weeks, months or business days from today</strong>, or ago. You also get the weekday, the business-day count and the US holidays in between.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content buildISO={BUILD_ISO} />
    </ToolLayout>
  );
}
