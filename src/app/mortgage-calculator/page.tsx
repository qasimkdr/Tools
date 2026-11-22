import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/mortgage-calculator/Calculator";
import Content from "@/tools/mortgage-calculator/Content";
import meta from "@/tools/mortgage-calculator/meta";
import { faq } from "@/tools/mortgage-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>full monthly mortgage payment</strong>: principal and interest plus property tax, insurance, PMI and HOA. You also see when PMI ends and the total interest you&apos;ll pay.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
