import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/watt-hour-calculator/Calculator";
import Content from "@/tools/watt-hour-calculator/Content";
import meta from "@/tools/watt-hour-calculator/meta";
import { faq } from "@/tools/watt-hour-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Watt-hours</strong> = watts × hours. A 60 W device running for 8 hours uses <strong>480 Wh</strong> (0.48 kWh). For a battery, multiply volts by amp-hours: a 12 V, 50 Ah battery stores <strong>600 Wh</strong>. Switch modes to convert mAh, check airline battery limits or estimate runtime.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
