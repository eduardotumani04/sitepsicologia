import Link from "next/link";
import { Arrow } from "./arrow";
import { SectionLabel } from "./section-label";

type InteriorPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function InteriorPage({ eyebrow, title, intro, children }: InteriorPageProps) {
  return (
    <>
      <section className="interior-hero">
        <div className="container">
          <Link href="/" className="back-link"><Arrow /> Voltar ao início</Link>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1>{title}</h1>
          <p className="interior-intro">{intro}</p>
        </div>
      </section>
      <section className="interior-content">
        <div className="container interior-content-grid">
          <div className="interior-aside"><span className="small-label">Um site em construção</span><p>Este espaço está sendo preparado com o mesmo cuidado que orienta o meu trabalho.</p></div>
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
