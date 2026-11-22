import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/period-calculator/Calculator";
import Content from "@/tools/period-calculator/Content";
import meta from "@/tools/period-calculator/meta";
import { faq } from "@/tools/period-calculator/faq";
import { BUILD_ISO } from "@/lib/build";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate <strong>when your next period will start</strong>, plus your next six cycles, estimated ovulation and fertile days. Everything is calculated privately in your browser.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
