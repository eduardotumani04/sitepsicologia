import type { Metadata } from "next";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { EditorialNote } from "@/components/editorial-note";
import { Arrow } from "@/components/arrow";
import { contact, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contato",
  description: "Consulte as informações e a situação dos canais profissionais de Eduardo Villela Tumani, psicólogo — CRP 06/127526. Dados de contato aguardam confirmação.",
};

export default function ContactPage() {
  const whatsapp = whatsappHref(contact.whatsapp);
  const available = Boolean(contact.professionalChannel || whatsapp || contact.email);
  const channels = [
    { title: "Canal profissional", description: "O canal principal será informado após confirmação.", value: contact.professionalChannel?.label, href: contact.professionalChannel?.url, action: "Acessar canal profissional" },
    { title: "WhatsApp", description: "Número profissional ainda não informado.", value: contact.whatsapp, href: whatsapp, action: "Abrir WhatsApp" },
    { title: "E-mail", description: "Endereço profissional ainda não informado.", value: contact.email, href: contact.email ? `mailto:${contact.email}` : null, action: "Escrever e-mail" },
  ];
  return (
    <InteriorPage
      eyebrow="Contato"
      title="Vamos começar uma conversa."
      intro="Um espaço para conhecer os canais profissionais e esclarecer dúvidas sobre Psicoterapia e Avaliação Psicológica, com cuidado desde o primeiro contato."
      sections={[
        { id: "canais", title: "Canais profissionais" },
        { id: "atendimento", title: "Sobre o atendimento" },
        { id: "primeiro-contato", title: "Antes de conversar" },
      ]}
    >
      <section className="reading-section" id="canais" aria-labelledby="canais-titulo">
        <span className="status-tag">{available ? "Informações profissionais" : "Canais em preparação"}</span>
        <h2 id="canais-titulo">Um caminho para entrar em contato</h2>
        <p>{available ? "Utilize os canais profissionais disponíveis abaixo para solicitar informações sobre o trabalho." : "Os dados de contato ainda precisam ser confirmados. Os espaços abaixo identificam as informações que serão disponibilizadas, sem links de envio enquanto os canais não forem definidos."}</p>
        <div className="contact-channels">
          {channels.map((channel, index) => (
            <section className="contact-channel" key={channel.title} aria-labelledby={`canal-${index}`}>
              <span className="small-label" aria-hidden="true">0{index + 1}</span>
              <h3 id={`canal-${index}`}>{channel.title}</h3>
              {channel.href && channel.value ? <><p className="contact-value">{channel.value}</p><a className="text-link" href={channel.href} rel="noreferrer">{channel.action} <Arrow direction="diagonal" /></a></> : <><p>{channel.description}</p><span className="pending-label">A confirmar</span></>}
            </section>
          ))}
        </div>
      </section>
      <section className="reading-section" id="atendimento" aria-labelledby="atendimento-titulo">
        <h2 id="atendimento-titulo">Informações sobre o atendimento</h2>
        <div className="contact-modality"><span className="small-label">Modalidade</span><p>{contact.modality ?? "Informação a confirmar com o responsável."}</p></div>
        <p>Modalidades de atendimento, público atendido, localização e disponibilidade precisam ser confirmados antes de serem divulgados. A descrição das áreas de atuação apresenta os processos de forma geral e não substitui esses esclarecimentos.</p>
        <EditorialNote><p>Informar o canal principal, o número profissional de WhatsApp, o e-mail e as modalidades efetivamente oferecidas. Confirmar também quais informações de localização, público e funcionamento devem ser apresentadas no site.</p></EditorialNote>
      </section>
      <section className="reading-section" id="primeiro-contato" aria-labelledby="contato-titulo">
        <h2 id="contato-titulo">Cuidado com as informações desde o início</h2>
        <p>Quando um canal estiver disponível, o primeiro contato poderá ser utilizado para solicitar informações gerais e esclarecer o funcionamento do trabalho. Evite enviar relatos clínicos detalhados, resultados de testes ou documentos sensíveis em uma mensagem inicial.</p>
        <p>Este site não possui formulário de contato e não recebe mensagens por esta página. As informações sobre o funcionamento atual estão na <Link href="/privacidade/">Política de Privacidade</Link>.</p>
        <div className="care-note"><h3>Precisa de ajuda imediata?</h3><p>Este site não oferece atendimento de urgência ou emergência. Em uma situação de risco imediato, procure um serviço de urgência da sua região.</p></div>
      </section>
    </InteriorPage>
  );
}
