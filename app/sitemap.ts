import type { MetadataRoute } from "next";
import { getServices } from "@/lib/cms";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/process", priority: 0.6 },
    { path: "/service-areas", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
