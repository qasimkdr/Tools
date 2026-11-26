import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/drywall-calculator/Calculator";
import Content from "@/tools/drywall-calculator/Content";
import meta from "@/tools/drywall-calculator/meta";
import { faq } from "@/tools/drywall-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To estimate <strong>drywall</strong>, add the wall and ceiling area, subtract doors and windows, add 10% for waste and divide by the sheet size. A 14 × 12 ft room with 8 ft walls needs 533 sq ft, or <strong>19 sheets of 4 × 8</strong> drywall, about 5 gallons of joint compound and 200 ft of tape.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
