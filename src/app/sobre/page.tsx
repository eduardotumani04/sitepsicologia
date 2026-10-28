import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { ContactInvitation } from "@/components/contact-invitation";

export const metadata: Metadata = { title: "Sobre mim", description: "Conheça Eduardo Villela Tumani, psicólogo — CRP 06/127526, e sua formação em Psicologia, Terapia Analítico-Comportamental e Avaliação Psicológica." };

export default function AboutPage() {
  return (
    <>
      <InteriorPage eyebrow="Sobre mim" title="Ciência, escuta e uma história." intro="Sou Eduardo Villela Tumani, psicólogo — CRP 06/127526. Minha atuação se fundamenta na compreensão do comportamento e no respeito à singularidade de cada pessoa.">
        <h2>Uma prática em constante construção</h2>
        <p>Compreender uma pessoa envolve olhar para suas experiências, suas relações e os contextos em que vive. Esse olhar orienta meu trabalho em Psicoterapia e Avaliação Psicológica.</p>
        <h2>Formação e especializações</h2>
        <ul className="education-list">
          <li><strong>Psicologia</strong><span>Universidade Mackenzie</span></li>
          <li><strong>Terapia Analítico-Comportamental</strong><span>PUC Paraná</span></li>
          <li><strong>Avaliação Psicológica</strong><span>PUC Campinas</span></li>
          <li><strong>Neurociências</strong><span>Faculdade Sírio Libanês — em andamento</span></li>
        </ul>
        <p className="editorial-notice">Esta é uma apresentação inicial. A trajetória profissional e a fotografia serão complementadas em uma próxima etapa.</p>
      </InteriorPage>
      <ContactInvitation />
    </>
  );
}
