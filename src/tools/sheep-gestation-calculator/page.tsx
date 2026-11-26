import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/sheep-gestation-calculator/Calculator";
import Content from "@/tools/sheep-gestation-calculator/Content";
import meta from "@/tools/sheep-gestation-calculator/meta";
import { faq } from "@/tools/sheep-gestation-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Sheep are pregnant for about <strong>147 days</strong>, usually 144 to 151. Add 147 days to the breeding date to get the lambing date: a ewe bred on October 1, 2026 is due around <strong>February 25, 2027</strong>. You can also get a whole flock&apos;s lambing period from ram-in and ram-out dates, or plan backwards from a lambing date.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
