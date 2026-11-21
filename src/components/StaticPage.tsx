import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { ld } from "@/lib/seo";

export default function StaticPage({ title, path, updated, children }: { title: string; path: string; updated?: string; children: ReactNode }) {
  const crumbs = [{ name: "Home", path: "/" }, { name: title, path }];
  return (
    <div className="container-x max-w-3xl py-10">
      <JsonLd data={ld.breadcrumbs(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">{title}</h1>
      {updated && <p className="mt-2 text-sm subtle">Last updated: {updated}</p>}
      <div className="prose-sp mt-6">{children}</div>
    </div>
  );
}
