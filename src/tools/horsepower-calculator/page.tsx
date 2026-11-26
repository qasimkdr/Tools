import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/horsepower-calculator/Calculator";
import Content from "@/tools/horsepower-calculator/Content";
import meta from "@/tools/horsepower-calculator/meta";
import { faq } from "@/tools/horsepower-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Horsepower</strong> equals torque (lb-ft) times RPM divided by 5,252. An engine making 300 lb-ft at 5,000 RPM produces <strong>285.6 hp</strong>, which is 213 kW. Below you can also convert between hp, kW and metric PS, or work out power from a weight lifted over a distance and time.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
