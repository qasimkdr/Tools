import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/wedding-alcohol-calculator/Calculator";
import Content from "@/tools/wedding-alcohol-calculator/Content";
import meta from "@/tools/wedding-alcohol-calculator/meta";
import { faq } from "@/tools/wedding-alcohol-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how much alcohol to buy for your wedding</strong>. Plan on about one drink per guest per hour: 100 guests over 5 hours with a 10% buffer is 550 drinks, or roughly <strong>55 bottles of wine, 10 bottles of liquor and 5 cases of beer</strong> for a full bar.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
