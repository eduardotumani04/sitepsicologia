import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { Arrow } from "@/components/arrow";
import { contact, hasContactChannel, whatsappHref } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Contato",
  description: "Informações de contato de Eduardo Villela Tumani, psicólogo — CRP 06/127526. Conheça os canais profissionais disponíveis neste site.",
  path: "/contato/",
  indexable: hasContactChannel,
});

export default function ContactPage() {
  const channels = [
    { title: "Canal profissional", value: contact.professionalChannel?.label, href: contact.professionalChannel?.url, action: "Acessar canal profissional" },
    { title: "WhatsApp", value: contact.whatsapp, href: whatsappHref(contact.whatsapp), action: "Abrir WhatsApp" },
    { title: "E-mail", value: contact.email, href: contact.email ? `mailto:${contact.email}` : null, action: "Escrever e-mail" },
  ].filter(channel => channel.href && channel.value);

  return (
    <InteriorPage
      eyebrow="Contato"
      title="Informação e cuidado desde o início."
      intro="Informações profissionais de Eduardo Villela Tumani, psicólogo — CRP 06/127526."
      sections={[
        { id: "canais", title: "Canais profissionais" },
        ...(contact.modality ? [{ id: "atendimento", title: "Sobre o atendimento" }] : []),
        { id: "orientacoes", title: "Informação e privacidade" },
      ]}
    >
      <section className="reading-section" id="canais" aria-labelledby="canais-titulo">
        <h2 id="canais-titulo">Canais profissionais</h2>
        {hasContactChannel ? (
          <>
            <p>Utilize os canais abaixo para solicitar informações sobre o trabalho.</p>
            <div className="contact-channels">
              {channels.map((channel, index) => (
                <section className="contact-channel" key={channel.title} aria-labelledby={`canal-${index}`}>
                  <h3 id={`canal-${index}`}>{channel.title}</h3>
                  <p className="contact-value">{channel.value}</p>
                  <a className="text-link" href={channel.href!} rel="noreferrer">{channel.action} <Arrow direction="diagonal" /></a>
                </section>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>Não há canais de contato disponíveis neste site no momento. Esta página não recebe mensagens ou solicitações de agendamento.</p>
            <p>Você pode conhecer a <Link prefetch={false} href="/sobre/">minha atuação</Link> e entender como funciona a <Link prefetch={false} href="/psicoterapia/">psicoterapia</Link>.</p>
          </>
        )}
      </section>
      {contact.modality && (
        <section className="reading-section" id="atendimento" aria-labelledby="atendimento-titulo">
          <h2 id="atendimento-titulo">Sobre o atendimento</h2>
          <p>{contact.modality}</p>
        </section>
      )}
      <section className="reading-section" id="orientacoes" aria-labelledby="orientacoes-titulo">
        <h2 id="orientacoes-titulo">Informação e privacidade</h2>
        {hasContactChannel && <p>Utilize o primeiro contato para dúvidas gerais. Evite enviar relatos clínicos detalhados, resultados de testes ou documentos sensíveis em uma mensagem inicial.</p>}
        <p>Não há formulário de envio de mensagens neste site. Consulte a <Link prefetch={false} href="/privacidade/">Política de Privacidade</Link> para conhecer o funcionamento das páginas.</p>
        <div className="care-note"><h3>Precisa de ajuda imediata?</h3><p>Este site não oferece atendimento de urgência ou emergência. Em uma situação de risco imediato, procure um serviço de urgência da sua região.</p></div>
      </section>
    </InteriorPage>
  );
}
