import { pageMetadata } from "@/lib/seo";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";
import { EditorialNote } from "@/components/editorial-note";
import { RelatedPages } from "@/components/related-pages";

export const metadata = pageMetadata({
  title: "Avaliação Psicológica",
  description: "Entenda o que é Avaliação Psicológica, como diferentes fontes de informação são integradas e por que o processo exige cuidado técnico, científico e ético.",
  path: "/avaliacao-psicologica/",
});

const sections = [
  { id: "o-que-e", title: "O que é avaliação" },
  { id: "diferencas", title: "Avaliação e psicoterapia" },
  { id: "informacoes", title: "Fontes de informação" },
  { id: "processo", title: "Construção do processo" },
  { id: "responsabilidade", title: "Ciência e ética" },
];

export default function AssessmentPage() {
  return (
    <>
      <InteriorPage
        eyebrow="Avaliação Psicológica"
        title="Investigar para compreender."
        intro="Um processo estruturado para compreender aspectos psicológicos e responder a uma demanda delimitada, reunindo informações com cuidado, rigor técnico e responsabilidade ética."
        sections={sections}
      >
        <section id="o-que-e" className="reading-section" aria-labelledby="avaliacao-titulo">
          <h2 id="avaliacao-titulo">O que é Avaliação Psicológica?</h2>
          <p>A Avaliação Psicológica é um processo de investigação orientado por uma questão e por uma finalidade. Ela busca compreender características e processos psicológicos relevantes para aquela demanda, considerando as condições em que as informações foram produzidas.</p>
          <p>Esse trabalho reúne planejamento, escolha de procedimentos, análise integrada e comunicação dos resultados. A aplicação de um instrumento pode fazer parte do percurso, mas um teste isolado não representa, por si só, todo o processo de avaliação.</p>
        </section>
        <section id="diferencas" className="reading-section" aria-labelledby="diferencas-titulo">
          <h2 id="diferencas-titulo">Como se diferencia da psicoterapia?</h2>
          <div className="comparison-list">
            <div><h3>Na psicoterapia</h3><p>O foco está no acompanhamento das questões apresentadas e no trabalho terapêutico construído ao longo da relação profissional, com objetivos discutidos e revistos durante o processo.</p></div>
            <div><h3>Na Avaliação Psicológica</h3><p>O foco está na investigação de uma demanda delimitada e na integração de informações para fundamentar uma compreensão e responder à finalidade da avaliação.</p></div>
          </div>
          <p>Esses processos têm objetivos e características próprios. Podem se relacionar em determinadas situações, mas não são intercambiáveis nem constituem etapas obrigatórias um do outro.</p>
        </section>
        <section id="informacoes" className="reading-section" aria-labelledby="fontes-titulo">
          <h2 id="fontes-titulo">Diferentes fontes, uma análise integrada</h2>
          <p>A seleção de procedimentos depende da demanda e da avaliação profissional. O processo pode utilizar:</p>
          <ul className="information-list">
            <li><strong>Entrevistas:</strong> conversas planejadas para compreender a demanda, a história e as informações relevantes para a investigação.</li>
            <li><strong>Observações:</strong> registros de comportamentos e de aspectos do contexto, conforme os objetivos e as condições do trabalho.</li>
            <li><strong>Instrumentos psicológicos:</strong> recursos selecionados por sua adequação à finalidade, ao contexto e às exigências técnicas e profissionais aplicáveis.</li>
            <li><strong>Outras fontes pertinentes:</strong> informações e documentos relevantes, quando sua utilização for apropriada e respeitar as condições éticas e legais.</li>
          </ul>
          <p>As informações precisam ser relacionadas entre si. Um resultado numérico, uma resposta ou uma observação isolada não deve ser tomado como uma explicação completa sobre a pessoa.</p>
        </section>
        <section id="processo" className="reading-section" aria-labelledby="construcao-titulo">
          <h2 id="construcao-titulo">Um percurso definido pela demanda</h2>
          <ol className="process-list">
            <li><h3>Esclarecimento e planejamento</h3><p>Delimitar a questão, discutir os objetivos, explicar as condições do trabalho e selecionar procedimentos compatíveis com a finalidade da avaliação.</p></li>
            <li><h3>Produção e análise das informações</h3><p>Realizar os procedimentos planejados e integrar os dados, considerando o contexto, a qualidade das informações e os limites de interpretação.</p></li>
            <li><h3>Comunicação e devolutiva</h3><p>Apresentar a compreensão construída de forma adequada à demanda, esclarecendo seus limites e os encaminhamentos pertinentes. A necessidade e o tipo de documento dependem da finalidade e das normas aplicáveis.</p></li>
          </ol>
          <p>A organização, a duração e os procedimentos não são idênticos em todas as avaliações. As condições precisam ser esclarecidas no início e ao longo do processo, conforme necessário.</p>
        </section>
        <section id="responsabilidade" className="reading-section" aria-labelledby="responsabilidade-titulo">
          <h2 id="responsabilidade-titulo">Responsabilidade técnica, científica e ética</h2>
          <p>Uma avaliação exige fundamentação científica, uso criterioso de procedimentos e atenção às condições em que as informações são obtidas. Reconhecer limitações e incertezas faz parte de uma análise responsável.</p>
          <p>O respeito à dignidade, ao sigilo e à finalidade do trabalho deve orientar a coleta, a guarda e a comunicação das informações. A linguagem utilizada também precisa evitar conclusões que ultrapassem o que o processo permite compreender.</p>
          <EditorialNote><p>Confirmar quais finalidades de Avaliação Psicológica são efetivamente oferecidas, público atendido e condições de atendimento. Esta página explica o processo em termos gerais e não anuncia avaliações específicas ainda não confirmadas.</p></EditorialNote>
        </section>
        <RelatedPages pages={[
          { href: "/psicoterapia/", title: "Psicoterapia", description: "Saiba como se constrói um acompanhamento terapêutico." },
          { href: "/contato/", title: "Informações de contato", description: "Consulte a situação dos canais profissionais." },
        ]} />
      </InteriorPage>
      <ContactInvitation />
    </>
  );
}
