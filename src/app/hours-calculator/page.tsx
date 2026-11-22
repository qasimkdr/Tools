import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/hours-calculator/Calculator";
import Content from "@/tools/hours-calculator/Content";
import meta from "@/tools/hours-calculator/meta";
import { faq } from "@/tools/hours-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate the <strong>hours and minutes between two times</strong>, including breaks and overnight shifts. Total a weekly timesheet with pay and overtime, or find the time X hours from now.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
