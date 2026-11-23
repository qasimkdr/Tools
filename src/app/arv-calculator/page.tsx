import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/arv-calculator/Calculator";
import Content from "@/tools/arv-calculator/Content";
import meta from "@/tools/arv-calculator/meta";
import { faq } from "@/tools/arv-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate a property&apos;s <strong>after-repair value (ARV)</strong> from comparable sales, then find your <strong>maximum offer with the 70% rule</strong> (ARV × 70% − repairs) and the flip&apos;s projected profit after holding and selling costs.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
