import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";

export const metadata: Metadata = { title: "Psicoterapia", description: "Uma introdução à psicoterapia e à Terapia Analítico-Comportamental na atuação de Eduardo Villela Tumani, psicólogo — CRP 06/127526." };

export default function TherapyPage() {
  return (
    <>
      <InteriorPage eyebrow="Psicoterapia" title="Um espaço para compreender." intro="Um processo de escuta e investigação sobre o que você sente, pensa e faz, considerando sua história e suas relações.">
        <h2>Olhar para o comportamento em seu contexto</h2>
        <p>A Terapia Analítico-Comportamental investiga as relações entre os comportamentos e o ambiente. Isso inclui as experiências de vida, as situações presentes e a história de aprendizagem de cada pessoa.</p>
        <p>A análise funcional ajuda a compreender em quais situações um comportamento ocorre e o que contribui para que se mantenha. Esse entendimento orienta a construção conjunta do trabalho terapêutico.</p>
        <h2>Um processo construído em conjunto</h2>
        <p>Os objetivos do acompanhamento são definidos a partir das necessidades e do contexto de cada pessoa. Não há uma experiência única de psicoterapia nem garantias de resultados.</p>
        <p className="editorial-notice">Página em preparação. Informações sobre modalidades de atendimento e funcionamento serão adicionadas após confirmação.</p>
      </InteriorPage>
      <ContactInvitation />
    </>
  );
}
