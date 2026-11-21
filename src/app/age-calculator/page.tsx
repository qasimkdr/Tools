import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/age-calculator/Calculator";
import Content from "@/tools/age-calculator/Content";
import meta from "@/tools/age-calculator/meta";
import { faq } from "@/tools/age-calculator/faq";
import { BUILD_ISO } from "@/lib/build";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find your <strong>exact age in years, months and days</strong> from your date of birth, or your age on any date. You also get total days, weeks and months, and a countdown to your next birthday.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
