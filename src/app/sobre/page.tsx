import { pageMetadata } from "@/lib/seo";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";
import { EditorialImage } from "@/components/editorial-image";
import { RelatedPages } from "@/components/related-pages";
import styles from "./sobre.module.css";

export const metadata = pageMetadata({
  title: "Sobre mim",
  description: "Conheça a atuação de Eduardo Villela Tumani, psicólogo — CRP 06/127526, com especializações em Terapia Analítico-Comportamental e Avaliação Psicológica.",
  path: "/sobre/",
});

const sections = [
  { id: "apresentacao", title: "Minha atuação" },
  { id: "formacao-academica", title: "Formação acadêmica" },
  { id: "ciencia-e-etica", title: "Ciência e ética" },
];

export default function AboutPage() {
  return (
    <>
      <InteriorPage
        eyebrow="Sobre mim"
        title="Ciência, escuta e compreensão."
        intro="Sou Eduardo Villela Tumani, psicólogo há mais de 15 anos, com atuação nas áreas clínica, organizacional e social. Minha prática é orientada pela Análise do Comportamento."
        introClassName={styles.intro}
        sections={sections}
      >
        <section id="apresentacao" className="reading-section" aria-labelledby="apresentacao-titulo">
          <h2 id="apresentacao-titulo">Compreender a pessoa em suas relações</h2>
          <p>Compreender sentimentos, pensamentos e ações pede atenção às relações, às condições do presente e às experiências que construíram a história de cada pessoa.</p>
          <p>Na minha atuação, essa perspectiva se traduz em escuta, investigação e diálogo, sem reduzir a pessoa a um comportamento isolado. Psicoterapia e Avaliação Psicológica fazem parte do meu trabalho, com objetivos e procedimentos próprios.</p>
        </section>
        <section id="formacao-academica" className="reading-section" aria-labelledby="formacao-academica-titulo">
          <h2 id="formacao-academica-titulo">Formação acadêmica</h2>
          <ol className={`education-list ${styles.educationList}`} role="list">
            <li>
              <span className={styles.educationNumber} aria-hidden="true">01</span>
              <div><strong>Graduação em Psicologia</strong><span>Universidade Presbiteriana Mackenzie</span></div>
            </li>
            <li>
              <span className={styles.educationNumber} aria-hidden="true">02</span>
              <div><strong>Especialização em Terapia Analítico-Comportamental</strong><span>PUC Paraná</span></div>
            </li>
            <li>
              <span className={styles.educationNumber} aria-hidden="true">03</span>
              <div><strong>Especialização em Avaliação Psicológica</strong><span>PUC Campinas</span></div>
            </li>
            <li>
              <span className={styles.educationNumber} aria-hidden="true">04</span>
              <div><strong>Especialização em Neurociências</strong><span>Faculdade Sírio-Libanês</span><span className={styles.inProgress}>Em andamento</span></div>
            </li>
          </ol>
        </section>
        <EditorialImage position="sobre" />
        <section id="ciencia-e-etica" className={`reading-section ${styles.scienceSection}`} aria-labelledby="ciencia-titulo">
          <h2 id="ciencia-titulo" className={styles.scienceTitle}>Conhecimento científico e ética caminham juntos</h2>
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
