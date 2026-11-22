import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/horse-gestation-calculator/Calculator";
import Content from "@/tools/horse-gestation-calculator/Content";
import meta from "@/tools/horse-gestation-calculator/meta";
import { faq } from "@/tools/horse-gestation-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>mare&apos;s foaling date</strong> from the breeding date. Horses are pregnant for about 340 days; see the likely and normal foaling windows, how far along she is today and a care timeline.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
