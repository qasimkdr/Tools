import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/half-birthday-calculator/Calculator";
import Content from "@/tools/half-birthday-calculator/Content";
import meta from "@/tools/half-birthday-calculator/meta";
import { faq } from "@/tools/half-birthday-calculator/faq";
import { pageMeta } from "@/lib/seo";
import { BUILD_ISO } from "@/lib/build";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find your <strong>half birthday</strong>: the date exactly six months after your birthday. See when the next one is, how many days away it is, your half age and the exact-midpoint date.</p>}
      calculator={<Calculator buildISO={BUILD_ISO} />}>
      <Content />
    </ToolLayout>
  );
}
