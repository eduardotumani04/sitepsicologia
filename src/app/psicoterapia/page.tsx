import { pageMetadata } from "@/lib/seo";
import { EditorialImage } from "@/components/editorial-image";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";
import { RelatedPages } from "@/components/related-pages";
import { ServiceInformation } from "@/components/service-information";
import { services } from "@/lib/services";
import styles from "./psicoterapia.module.css";

export const metadata = pageMetadata({
  title: "Psicoterapia",
  description: "Entenda o que é psicoterapia, como a Terapia Analítico-Comportamental compreende o comportamento e como o processo é construído em conjunto.",
  path: "/psicoterapia/",
});

const sections = [
  { id: "o-que-e", title: "O que é psicoterapia" },
  { id: "abordagem", title: "Comportamento e contexto" },
  { id: "relacao", title: "Relação terapêutica" },
  { id: "processo", title: "O processo" },
  { id: "duvidas", title: "Dúvidas frequentes" },
];

export default function TherapyPage() {
  return (
    <>
      <InteriorPage
        eyebrow="Psicoterapia"
        title="Um espaço para compreender."
        intro="Um processo de escuta e investigação sobre o que você sente, pensa e faz, considerando sua história de aprendizagem, suas relações e as condições em que vive, para construir, em conjunto, novas possibilidades de mudança."
        introClassName={styles.intro}
        meta={<ServiceInformation text={services.psicoterapia.practicalInformation} />}
        sections={sections}
      >
        <section id="o-que-e" className="reading-section" aria-labelledby="terapia-titulo">
          <h2 id="terapia-titulo">O que é psicoterapia?</h2>
          <p>A psicoterapia é um trabalho profissional em que questões da vida de uma pessoa são acolhidas e investigadas por meio de uma relação terapêutica e de procedimentos fundamentados em conhecimento psicológico.</p>
          <p>As sessões podem abordar sentimentos, escolhas, relações e dificuldades do cotidiano. O psicólogo participa dessa investigação, ajuda a observar relações e discute possibilidades de trabalho.</p>
          <p>Os objetivos não precisam estar todos definidos no primeiro encontro. Eles podem ser esclarecidos e revistos ao longo do processo, de acordo com as necessidades identificadas.</p>
        </section>
        <section id="abordagem" className="reading-section" aria-labelledby="abordagem-titulo">
          <h2 id="abordagem-titulo">O comportamento acontece em um contexto</h2>
          <p>Na Terapia Analítico-Comportamental, compreender um comportamento envolve investigar suas relações com o ambiente. O que acontece ao redor, as experiências anteriores e os efeitos das nossas ações ajudam a entender por que certas formas de agir se repetem.</p>
          <h3>A história de aprendizagem</h3>
          <p>Ao longo da vida, aprendemos maneiras de responder a situações, de nos relacionar e de lidar com o que sentimos. Algumas dessas maneiras podem ter sido importantes em determinados momentos e tornar-se difíceis de sustentar em outros contextos.</p>
          <p>O passado ajuda a compreender o ponto de partida, mas não determina tudo o que pode acontecer. As condições do presente também são investigadas.</p>
          <h3>A análise funcional</h3>
          <p>A análise funcional procura relacionar o que ocorre antes de um comportamento, o próprio comportamento e o que acontece depois dele. Importa observar em quais situações ele aparece e que papel desempenha na vida daquela pessoa.</p>
          <p>Esse olhar inclui pensamentos e sentimentos, sem separá-los das experiências em que acontecem. A compreensão construída orienta as intervenções e pode ser revista quando surgem novas informações.</p>
        </section>
        <EditorialImage position="psicoterapia" />
        <section id="relacao" className="reading-section" aria-labelledby="relacao-titulo">
          <h2 id="relacao-titulo">Uma relação de trabalho construída em conjunto</h2>
          <p>A relação terapêutica é parte do processo. Ela envolve uma escuta respeitosa, comunicação clara e espaço para que a pessoa expresse dúvidas, dificuldades e sua percepção sobre o acompanhamento.</p>
          <p>Conversar sobre objetivos, limites e expectativas ajuda a construir o trabalho. Não é necessário saber explicar perfeitamente o que acontece: o diálogo também inclui o que incomoda e o que precisa ser ajustado no acompanhamento.</p>
          <p>O cuidado com o sigilo e o esclarecimento de suas condições fazem parte das responsabilidades profissionais e devem ser abordados no acompanhamento.</p>
        </section>
        <section id="processo" className="reading-section" aria-labelledby="processo-titulo">
          <h2 id="processo-titulo">Como o processo pode se organizar</h2>
          <p>Não existe uma sequência única para todas as pessoas. De maneira geral, o trabalho pode envolver os movimentos abaixo, que se relacionam e podem ser retomados conforme a necessidade.</p>
          <ol className="process-list">
            <li><h3>Conhecer a demanda</h3><p>Compreender o que motivou a procura e reunir informações sobre o momento de vida, as relações e as questões relevantes para a pessoa.</p></li>
            <li><h3>Construir uma compreensão</h3><p>Investigar padrões, contextos e experiências, discutir hipóteses e definir objetivos possíveis para o acompanhamento.</p></li>
            <li><h3>Desenvolver e acompanhar o trabalho</h3><p>Realizar intervenções coerentes com essa compreensão e conversar sobre o percurso, considerando dificuldades e mudanças no contexto.</p></li>
            <li><h3>Reavaliar o percurso</h3><p>Rever objetivos, discutir a continuidade, o encerramento ou outros encaminhamentos quando necessários.</p></li>
          </ol>
          <p>A duração, a frequência e os procedimentos dependem de diferentes fatores e precisam ser discutidos no contexto de cada acompanhamento. Não há garantia de resultados ou de um prazo universal.</p>
        </section>
        <section id="duvidas" className="reading-section" aria-labelledby="duvidas-titulo">
          <h2 id="duvidas-titulo">Algumas dúvidas sobre a psicoterapia</h2>
          <div className="faq-list">
            <details><summary>Preciso chegar com tudo o que quero trabalhar definido?</summary><p>Não. As questões podem ser apresentadas aos poucos, e a compreensão da demanda faz parte do trabalho. As primeiras conversas ajudam a esclarecer o que poderá ser abordado.</p></details>
            <details><summary>A psicoterapia consiste apenas em receber conselhos?</summary><p>O trabalho envolve investigar relações e construir uma compreensão das questões apresentadas. As intervenções dependem do contexto, da avaliação profissional e dos objetivos discutidos, e não se resumem a uma lista de orientações prontas.</p></details>
            <details><summary>É possível definir antecipadamente quanto tempo vai durar?</summary><p>Não há uma duração que se aplique a todos os acompanhamentos. Essa definição depende da demanda, do contexto e da avaliação do percurso, e deve ser retomada quando necessário.</p></details>
          </div>
        </section>
        <RelatedPages pages={[
          { href: "/sobre/", title: "Sobre minha atuação", description: "Conheça os princípios que orientam o meu trabalho." },
          { href: "/avaliacao-psicologica/", title: "Avaliação Psicológica", description: "Entenda as diferenças em relação à psicoterapia." },
        ]} />
      </InteriorPage>
      <ContactInvitation nextPage="/sobre/" />
    </>
  );
}
