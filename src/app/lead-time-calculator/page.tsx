import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/lead-time-calculator/Calculator";
import Content from "@/tools/lead-time-calculator/Content";
import meta from "@/tools/lead-time-calculator/meta";
import { faq } from "@/tools/lead-time-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Lead time</strong> is the time from placing an order to receiving it: processing + production + shipping + receiving. Add up your stages to get the expected delivery date, or the latest day you can order to meet a deadline, plus your reorder point.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
