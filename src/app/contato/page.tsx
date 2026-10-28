import type { Metadata } from "next";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { Arrow } from "@/components/arrow";

export const metadata: Metadata = { title: "Contato", description: "Informações sobre os canais de contato de Eduardo Villela Tumani, psicólogo — CRP 06/127526. Canais profissionais em preparação." };

export default function ContactPage() {
  return (
    <InteriorPage eyebrow="Contato" title="Vamos começar uma conversa." intro="Seja para conhecer melhor meu trabalho ou esclarecer dúvidas sobre os processos de Psicoterapia e Avaliação Psicológica, este será o ponto de encontro.">
      <span className="status-tag">Canais em preparação</span>
      <h2>Em breve, um caminho para entrar em contato</h2>
      <p>Os canais profissionais ainda não estão disponíveis neste site. As informações de contato serão adicionadas após confirmação.</p>
      <p>Por enquanto, não há formulário nem envio de mensagens por esta página. Evite compartilhar informações pessoais ou clínicas em espaços públicos.</p>
      <div className="care-note"><h3>Precisa de ajuda imediata?</h3><p>Este site não oferece atendimento de urgência ou emergência. Em uma situação de risco imediato, procure um serviço de urgência da sua região.</p></div>
      <Link className="text-link" href="/">Voltar à página inicial <Arrow /></Link>
    </InteriorPage>
  );
}
