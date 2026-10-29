import type { Metadata, MetadataRoute } from "next";
import { site } from "./site";
import { hasContactChannel } from "./contact";

export function createSeoSettings(values: { SITE_URL?: string; SITE_INDEXING_ENABLED?: string }) {
  let url: string | null = null;
  if (values.SITE_URL?.trim()) {
    const candidate = new URL(values.SITE_URL.trim());
    if (candidate.protocol !== "https:" || candidate.username || candidate.password ||
        candidate.search || candidate.hash || candidate.pathname !== "/") {
      throw new Error("SITE_URL deve conter apenas o domínio oficial HTTPS, sem credenciais, caminho ou parâmetros.");
    }
    url = candidate.origin;
  }
  const indexing = values.SITE_INDEXING_ENABLED ?? "false";
  if (!["true", "false"].includes(indexing)) {
    throw new Error("SITE_INDEXING_ENABLED deve ser true ou false.");
  }
  if (indexing === "true" && !url) {
    throw new Error("Defina SITE_URL com o domínio oficial antes de habilitar a indexação.");
  }
  return { url, indexingEnabled: indexing === "true" };
}

export const seoSettings = createSeoSettings({
  SITE_URL: process.env.SITE_URL,
  SITE_INDEXING_ENABLED: process.env.SITE_INDEXING_ENABLED,
});

type SeoSettings = ReturnType<typeof createSeoSettings>;
type PageMetadataInput = {
  title?: string;
  description: string;
  path: string | null;
  indexable?: boolean;
  follow?: boolean;
  publishedAt?: string;
};

export function pageMetadata({ title, description, path, indexable = true, follow = true, publishedAt }: PageMetadataInput, settings: SeoSettings = seoSettings): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Psicologia`;
  const canonical = settings.url && path ? new URL(path, `${settings.url}/`).href : null;
  const image = settings.url ? `${settings.url}/opengraph.png` : null;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: { index: settings.indexingEnabled && indexable, follow: settings.indexingEnabled && follow },
    openGraph: {
      title: fullTitle, description, locale: "pt_BR", siteName: site.name,
      type: publishedAt ? "article" : "website",
      ...(canonical ? { url: canonical } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — Psicólogo, ${site.registration}` }] } : {}),
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: fullTitle, description, ...(image ? { images: [image] } : {}) },
  };
}

export function siteRobots(settings: SeoSettings = seoSettings): MetadataRoute.Robots {
  if (!settings.indexingEnabled || !settings.url) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  // Somente páginas públicas; o acervo editorial não participa da exportação.
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${settings.url}/sitemap.xml` };
}

export function siteSitemap(settings: SeoSettings = seoSettings): MetadataRoute.Sitemap {
  if (!settings.url || !settings.indexingEnabled) return [];
  const paths = ["/", "/sobre/", "/psicoterapia/", "/avaliacao-psicologica/"];
  if (hasContactChannel) paths.push("/contato/");
  return paths.map(path => ({ url: new URL(path, `${settings.url}/`).href }));
}
