import { site } from "@/lib/site";
import { seoSettings } from "@/lib/seo";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.profession,
    identifier: { "@type": "PropertyValue", propertyID: "CRP", value: "06/127526" },
    ...(seoSettings.url ? { url: `${seoSettings.url}/sobre/` } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
