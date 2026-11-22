import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/density-altitude-calculator/Calculator";
import Content from "@/tools/density-altitude-calculator/Content";
import meta from "@/tools/density-altitude-calculator/meta";
import { faq } from "@/tools/density-altitude-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Density altitude</strong> is the altitude your aircraft &quot;feels&quot;: pressure altitude corrected for temperature and humidity. Enter field elevation, temperature, altimeter setting and dew point to get it, using the National Weather Service formula.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
