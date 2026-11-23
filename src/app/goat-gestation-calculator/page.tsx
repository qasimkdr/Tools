import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/goat-gestation-calculator/Calculator";
import Content from "@/tools/goat-gestation-calculator/Content";
import meta from "@/tools/goat-gestation-calculator/meta";
import { faq } from "@/tools/goat-gestation-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Goats are pregnant for about <strong>150 days</strong> (about 145 for miniature breeds). Enter a breeding date to get the kidding date, likely window and a care timeline, or plan due dates for your whole herd at once.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
