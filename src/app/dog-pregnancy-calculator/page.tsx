import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/dog-pregnancy-calculator/Calculator";
import Content from "@/tools/dog-pregnancy-calculator/Content";
import meta from "@/tools/dog-pregnancy-calculator/meta";
import { faq } from "@/tools/dog-pregnancy-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>dog&apos;s due date</strong> from the breeding, ovulation or LH-surge date. Dogs are pregnant for about 63 days; see the likely whelping window, how far along she is today and a week-by-week timeline.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
