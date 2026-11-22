import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/gcf-calculator/Calculator";
import Content from "@/tools/gcf-calculator/Content";
import meta from "@/tools/gcf-calculator/meta";
import { faq } from "@/tools/gcf-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>greatest common factor</strong> (GCF, also called GCD or HCF) of two or more numbers. You get every common factor, each number&apos;s prime factorization and the Euclidean algorithm worked step by step.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
