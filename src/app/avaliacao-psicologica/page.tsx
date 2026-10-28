import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";

export const metadata: Metadata = { title: "Avaliação Psicológica", description: "Conheça a proposta da Avaliação Psicológica: um processo estruturado de investigação, orientado por uma demanda e conduzido com rigor técnico e ético." };

export default function AssessmentPage() {
  return (
    <>
      <InteriorPage eyebrow="Avaliação Psicológica" title="Investigar para compreender." intro="Um processo estruturado que busca compreender aspectos psicológicos e responder a uma demanda específica, com cuidado, rigor técnico e responsabilidade ética.">
        <h2>Múltiplas fontes, uma compreensão integrada</h2>
        <p>A Avaliação Psicológica pode envolver entrevistas, observações e instrumentos psicológicos, conforme a finalidade e a necessidade de cada processo. Ela vai além da aplicação de um teste isolado.</p>
        <h2>Cada demanda pede um olhar</h2>
        <p>A escolha dos procedimentos, as etapas e a devolutiva são orientadas pela questão que motivou a avaliação. Os limites e as possibilidades do trabalho são esclarecidos ao longo do processo.</p>
        <p className="editorial-notice">Página em preparação. As finalidades de avaliação oferecidas e os detalhes do atendimento serão apresentados em uma próxima etapa.</p>
      </InteriorPage>
      <ContactInvitation />
    </>
  );
}
