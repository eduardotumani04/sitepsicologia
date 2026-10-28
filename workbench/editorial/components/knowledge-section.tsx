import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { SectionLabel } from "@/components/section-label";

export function KnowledgeSection() {
  return (
<section className="knowledge-section section-space" aria-labelledby="knowledge-heading">
        <div className="container knowledge-grid">
          <div>
            <SectionLabel number="04">Conhecimento que aproxima</SectionLabel>
            <h2 className="section-heading" id="knowledge-heading">Ciência também<br />é uma forma de<br /><em>abrir conversas.</em></h2>
            <p>Um espaço em construção para compartilhar conhecimento sobre Psicologia, comportamento humano e neurociências. Informação acessível, com cuidado e compromisso com a ciência.</p>
            <Link prefetch={false} className="text-link" href="/conteudos/">Conheça o espaço de conteúdos <Arrow direction="diagonal" /></Link>
          </div>
          <div className="knowledge-topics">
            <p className="small-label knowledge-status"><span aria-hidden="true" /> Temas que estarão por aqui</p>
            {[
              ["01", "Psicologia", "Reflexões sobre cuidado e saúde mental."],
              ["02", "Comportamento humano", "Um olhar para as relações do dia a dia."],
              ["03", "Neurociências", "Conhecimento para ampliar a compreensão."],
            ].map(([number, title, text]) => <div className="topic" key={number}><span className="topic-number" aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
            <p className="content-note">Os primeiros conteúdos serão publicados em uma próxima etapa.</p>
          </div>
        </div>
      </section>
  );
}
