import Link from "next/link";
import { Arrow } from "./arrow";
import { SectionLabel } from "./section-label";
import { site } from "@/lib/site";

export type PageSection = { id: string; title: string };

type InteriorPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  introClassName?: string;
  sections?: readonly PageSection[];
  backHref?: string;
  backLabel?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
};

export function InteriorPage({
  eyebrow, title, intro, introClassName, sections = [], backHref = "/", backLabel = "Voltar ao início", meta, children,
}: InteriorPageProps) {
  return (
    <>
      <section className="interior-hero" aria-labelledby="page-title">
        <div className="container">
          <Link prefetch={false} href={backHref} className="back-link"><Arrow /> {backLabel}</Link>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 id="page-title">{title}</h1>
          <p className={introClassName ? `interior-intro ${introClassName}` : "interior-intro"}>{intro}</p>
          {meta}
        </div>
      </section>
      <section className="interior-content">
        <div className="container interior-content-grid">
          <aside className="interior-aside">
            <div className="interior-aside-sticky">
              {sections.length > 0 && (
                <nav className="page-index" aria-label="Nesta página">
                  <p className="small-label">Nesta página</p>
                  <ol>{sections.map(({ id, title }, index) => (
                    <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</a></li>
                  ))}</ol>
                </nav>
              )}
              <div className="aside-professional"><p>{site.name}</p><span>{site.profession} — {site.registration}</span></div>
              <p className="aside-reading-note">Informações para conhecer o trabalho e fazer escolhas com mais clareza.</p>
            </div>
          </aside>
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
