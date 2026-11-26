import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/rmd-calculator/Calculator";
import Content from "@/tools/rmd-calculator/Content";
import meta from "@/tools/rmd-calculator/meta";
import { faq } from "@/tools/rmd-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Your <strong>required minimum distribution</strong> is last year&apos;s December 31 balance divided by the IRS life-expectancy factor for your age. At age 74 the factor is 25.5, so a $500,000 IRA has a 2026 RMD of <strong>$19,607.84</strong>. RMDs start at age 73 for people born 1951 to 1959 and at 75 for those born in 1960 or later.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
