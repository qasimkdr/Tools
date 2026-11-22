import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/btu-calculator/Calculator";
import Content from "@/tools/btu-calculator/Content";
import meta from "@/tools/btu-calculator/meta";
import { faq } from "@/tools/btu-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the right <strong>air conditioner size in BTUs</strong> for a room. A 250–300 sq ft room needs about 7,000 BTU/h and a 450–550 sq ft room about 12,000 BTU/h, before adjusting for sun, occupants and kitchens, which this calculator does for you.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
