import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/vpd-calculator/Calculator";
import Content from "@/tools/vpd-calculator/Content";
import meta from "@/tools/vpd-calculator/meta";
import { faq } from "@/tools/vpd-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>vapor pressure deficit (VPD)</strong> at the leaf from air temperature, humidity and leaf temperature, then compare it with the target for seedlings, vegetative growth or flowering and find the humidity that hits it.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
