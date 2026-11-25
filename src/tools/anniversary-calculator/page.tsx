import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/anniversary-calculator/Calculator";
import Content from "@/tools/anniversary-calculator/Content";
import meta from "@/tools/anniversary-calculator/meta";
import { faq } from "@/tools/anniversary-calculator/faq";
import { BUILD_ISO } from "@/lib/build";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>See <strong>how long you&apos;ve been married or together</strong> in years, months and days, and when your next anniversary falls. A couple married on June 20, 2015 has been married <strong>11 years, 5 months and 5 days</strong> on November 25, 2026. You also get day milestones and work anniversaries.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
