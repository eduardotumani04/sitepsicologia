import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { ContactInvitation } from "@/components/contact-invitation";
import { SectionLabel } from "@/components/section-label";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span aria-hidden="true" />Psicologia fundamentada em ciência</p>
            <h1 id="hero-heading">Compreender o<br className="wide-break" /> comportamento.<br />Cuidar de <em>pessoas.</em></h1>
            <p className="hero-description">Cada pessoa tem uma história. Um olhar atento ao seu contexto e uma escuta cuidadosa abrem caminhos para compreender o que você vive.</p>
            <Link prefetch={false} className="button button-dark" href="/sobre/">Conheça meu trabalho <Arrow direction="diagonal" /></Link>
            <div className="hero-signature">
              <span className="signature-rule" aria-hidden="true" />
              <div><p>Eduardo Villela Tumani</p><span>Psicólogo — CRP 06/127526</span></div>
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-image">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG local de 1 KB: não há redimensionamento a otimizar; dispensa o JavaScript do componente Image. */}
              <img src="/images/espaco-retrato.svg" alt="Composição abstrata em tons naturais." width={720} height={900} loading="eager" decoding="async" fetchPriority="high" />
              <span className="portrait-top-label">Presença. Escuta. Contexto.</span>
              <div className="portrait-placeholder-label"><span className="portrait-monogram" aria-hidden="true">ev<span>t.</span></span></div>
            </div>
            <figcaption><span>O cuidado começa na escuta.</span><span aria-hidden="true">01 / 01</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="principles" aria-label="Princípios da minha prática">
        <div className="container principles-grid">
          {[
            ["01", "Ciência", "Uma prática orientada pelo conhecimento científico."],
            ["02", "Contexto", "Sua história e suas relações como ponto de partida."],
            ["03", "Cuidado", "Respeito à singularidade de cada pessoa."],
          ].map(([number, title, text]) => <div className="principle" key={number}><span className="principle-number" aria-hidden="true">{number}</span><div><h2>{title}</h2><p>{text}</p></div></div>)}
        </div>
      </section>

      <section className="about-section section-space" aria-labelledby="about-heading">
        <div className="container about-grid">
          <div>
            <SectionLabel number="01">Sobre mim</SectionLabel>
            <h2 id="about-heading" className="section-heading">Antes de tudo,<br />um encontro entre<br /><em>pessoas.</em></h2>
            <EditorialImage position="inicio" />
          </div>
          <div className="about-copy">
            <p className="lead">Sou Eduardo Villela Tumani, psicólogo. Meu trabalho considera a história, as relações e o contexto de cada pessoa.</p>
            <p>A ciência do comportamento orienta uma prática de escuta e investigação, com respeito ao que você vive e sente.</p>
            <div className="specialties" aria-label="Especializações"><span>Terapia Analítico-Comportamental</span><span>Avaliação Psicológica</span></div>
            <Link prefetch={false} className="text-link" href="/sobre/">Conheça minha atuação <Arrow direction="diagonal" /></Link>
          </div>
        </div>
      </section>

      <section className="services-section section-space" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-intro-row">
            <div><SectionLabel number="02">Áreas de atuação</SectionLabel><h2 className="section-heading" id="services-heading">Diferentes caminhos.<br />O mesmo <em>cuidado.</em></h2></div>
            <p>Processos construídos com responsabilidade, de acordo com a singularidade de cada pessoa e com os objetivos de cada trabalho.</p>
          </div>
          <div className="services-grid">
            <Link prefetch={false} className="service-card" href="/psicoterapia/" aria-labelledby="therapy-title therapy-link">
              <div className="service-card-top"><span className="service-number" aria-hidden="true">01 /</span><span className="service-arrow"><Arrow direction="diagonal" /></span></div>
              <h3 id="therapy-title">Psicoterapia</h3>
              <p>Um espaço para compreender sentimentos, comportamentos e relações, investigando outras formas de lidar com o que você vive.</p>
              <span className="service-link" id="therapy-link">Conheça o processo <Arrow /></span>
            </Link>
            <Link prefetch={false} className="service-card" href="/avaliacao-psicologica/" aria-labelledby="assessment-title assessment-link">
              <div className="service-card-top"><span className="service-number" aria-hidden="true">02 /</span><span className="service-arrow"><Arrow direction="diagonal" /></span></div>
              <h3 id="assessment-title">Avaliação Psicológica</h3>
              <p>Uma investigação que integra diferentes fontes de informação para responder a uma demanda específica, com rigor técnico e ético.</p>
              <span className="service-link" id="assessment-link">Entenda a avaliação <Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="approach-section section-space" aria-labelledby="approach-heading">
        <div className="container approach-grid">
          <div className="approach-note" aria-label="Uma ideia que orienta a minha abordagem">
            <span className="small-label">Uma perspectiva sobre o cuidado</span>
            <p>O comportamento<br />faz sentido quando<br />olhamos para<br /><em>o contexto.</em></p>
            <div className="approach-note-bottom"><span className="note-rule" /><span>História, relações e possibilidades.</span></div>
          </div>
          <div className="approach-copy">
            <SectionLabel number="03">Minha abordagem</SectionLabel>
            <h2 className="section-heading" id="approach-heading">Ninguém existe<br /><em>fora de uma história.</em></h2>
            <p>A Terapia Analítico-Comportamental busca compreender como o que fazemos, pensamos e sentimos se relaciona com nossas experiências e com o ambiente em que vivemos.</p>
            <p>A análise funcional investiga em quais situações um comportamento aparece e o que acontece antes e depois dele. Junto à história de aprendizagem, ajuda a compreender o papel desses padrões na vida da pessoa.</p>
            <Link prefetch={false} className="text-link" href="/psicoterapia/">Saiba mais sobre a psicoterapia <Arrow direction="diagonal" /></Link>
          </div>
        </div>
      </section>

      <ContactInvitation />
    </>
  );
}
