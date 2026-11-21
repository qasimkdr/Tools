import Link from "next/link";
import Tilt from "./Tilt";
import { CATEGORIES } from "@/lib/site";
import type { ToolMeta } from "@/tools/types";

export default function ToolCard({ tool }: { tool: ToolMeta }) {
  const cat = CATEGORIES[tool.category];
  return (
    <Tilt className="card h-full">
      <Link href={`/${tool.slug}/`} className="lift block h-full p-5">
        <span aria-hidden className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-[var(--surface-2)] text-xl">{tool.icon ?? cat.icon}</span>
        <h3 className="font-semibold tracking-tight">{tool.name}</h3>
        <p className="mt-1 text-sm leading-relaxed muted">{tool.short}</p>
        <span className="mt-3 inline-block text-xs font-medium text-[var(--color-brand-600)]">{cat.name} →</span>
      </Link>
    </Tilt>
  );
}
