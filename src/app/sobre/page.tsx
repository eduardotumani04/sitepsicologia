import { pageMetadata } from "@/lib/seo";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";
import { EditorialImage } from "@/components/editorial-image";
import { RelatedPages } from "@/components/related-pages";

export const metadata = pageMetadata({
  title: "Sobre mim",
  description: "Conheça a atuação de Eduardo Villela Tumani, psicólogo — CRP 06/127526, com especializações em Terapia Analítico-Comportamental e Avaliação Psicológica.",
  path: "/sobre/",
});

const sections = [
  { id: "apresentacao", title: "Minha atuação" },
  { id: "especializacoes", title: "Especializações" },
  { id: "ciencia-e-etica", title: "Ciência e ética" },
];

export default function AboutPage() {
  return (
    <>
      <InteriorPage
        eyebrow="Sobre mim"
        title="Ciência, escuta e compreensão."
        intro="Sou Eduardo Villela Tumani, psicólogo — CRP 06/127526. Meu trabalho se orienta pela compreensão do comportamento e pelo respeito à singularidade de cada pessoa."
        sections={sections}
      >
        <section id="apresentacao" className="reading-section" aria-labelledby="apresentacao-titulo">
          <h2 id="apresentacao-titulo">Compreender a pessoa em suas relações</h2>
          <p>Compreender sentimentos, pensamentos e ações pede atenção às relações, às condições do presente e às experiências que construíram a história de cada pessoa.</p>
          <p>Na minha atuação, essa perspectiva se traduz em escuta, investigação e diálogo, sem reduzir a pessoa a um comportamento isolado. Psicoterapia e Avaliação Psicológica fazem parte do meu trabalho, com objetivos e procedimentos próprios.</p>
        </section>
        <section id="especializacoes" className="reading-section" aria-labelledby="especializacoes-titulo">
          <h2 id="especializacoes-titulo">Duas especializações, um compromisso com o cuidado</h2>
          <div className="expertise-list">
            <div><span className="small-label">01 · Psicoterapia</span><h3>Terapia Analítico-Comportamental</h3><p>Uma abordagem que investiga como os comportamentos se relacionam com o contexto e com a história de aprendizagem. A análise dessas relações orienta a construção do trabalho terapêutico.</p></div>
            <div><span className="small-label">02 · Investigação psicológica</span><h3>Avaliação Psicológica</h3><p>Um processo de investigação que integra informações e procedimentos para compreender aspectos psicológicos e responder a uma questão delimitada, com responsabilidade técnica e ética.</p></div>
          </div>
        </section>
        <EditorialImage position="sobre" />
        <section id="ciencia-e-etica" className="reading-section" aria-labelledby="ciencia-titulo">
          <h2 id="ciencia-titulo">Conhecimento científico e ética caminham juntos</h2>
          <p>Uma prática fundamentada em ciência envolve estudar, avaliar a qualidade das informações e reconhecer o alcance e os limites do conhecimento disponível. As escolhas profissionais precisam considerar esse conhecimento em diálogo com as particularidades de cada situação.</p>
          <p>A ética profissional orienta a forma de escutar, comunicar, registrar informações e estabelecer os limites do trabalho. O respeito à autonomia, à dignidade e ao sigilo faz parte desse compromisso, consideradas as responsabilidades e as situações previstas nas normas profissionais.</p>
          <h3>O contexto importa</h3>
          <p>Pessoas podem viver situações semelhantes de maneiras diferentes. Relações familiares, condições de trabalho, oportunidades, dificuldades e práticas culturais participam da vida de cada um. Uma compreensão contextualizada reconhece essas diferenças e evita explicações apressadas ou julgamentos sobre a pessoa.</p>
        </section>
        <RelatedPages pages={[
          { href: "/psicoterapia/", title: "Psicoterapia", description: "Conheça a abordagem e a construção do processo terapêutico." },
          { href: "/avaliacao-psicologica/", title: "Avaliação Psicológica", description: "Entenda os objetivos e as características da investigação psicológica." },
        ]} />
      </InteriorPage>
      <ContactInvitation />
    </>
  );
}
