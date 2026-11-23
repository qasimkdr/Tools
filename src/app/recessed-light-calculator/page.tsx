import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/recessed-light-calculator/Calculator";
import Content from "@/tools/recessed-light-calculator/Content";
import meta from "@/tools/recessed-light-calculator/meta";
import { faq } from "@/tools/recessed-light-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Space recessed lights about <strong>half the ceiling height apart</strong> (4 ft for an 8 ft ceiling) and half that from the walls. Enter your room to get the number of lights, rows and columns, exact spacing and a to-scale layout.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
