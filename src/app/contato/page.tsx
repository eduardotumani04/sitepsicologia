import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { Arrow } from "@/components/arrow";
import { contactChannels, hasContactChannel } from "@/lib/contact";
import { services } from "@/lib/services";
import styles from "./contato.module.css";

export const metadata = pageMetadata({
  title: "Contato",
  description: "Informações sobre modalidades de atendimento e canais profissionais de Eduardo Villela Tumani, psicólogo — CRP 06/127526.",
  path: "/contato/",
  indexable: hasContactChannel,
});

export default function ContactPage() {
  return (
    <InteriorPage
      eyebrow="Contato"
      title="Vamos conversar."
      intro="Entre em contato para esclarecer dúvidas sobre os serviços, modalidades de atendimento e disponibilidade de horários."
      introClassName={styles.intro}
      sections={[
        { id: "canais", title: "Canais profissionais" },
        { id: "atendimento", title: "Modalidades de atendimento" },
        { id: "orientacoes", title: "Informação e privacidade" },
      ]}
    >
      <section className="reading-section" id="canais" aria-labelledby="canais-titulo">
        <h2 id="canais-titulo">Canais profissionais</h2>
        {hasContactChannel ? (
          <>
            <p>Utilize os canais abaixo para solicitar informações sobre o trabalho.</p>
            <div className={`contact-channels ${styles.channels}`}>
              {contactChannels.map(channel => (
                <section className="contact-channel" key={channel.kind} aria-labelledby={`canal-${channel.kind}`}>
                  <h3 id={`canal-${channel.kind}`}>{channel.title}</h3>
                  <p className="contact-value">{channel.value}</p>
                  <a className="text-link" href={channel.href} rel="noreferrer">{channel.action} <Arrow direction="diagonal" /></a>
                </section>
              ))}
            </div>
          </>
        ) : (
          <p>Não há canais de contato disponíveis neste site no momento. Esta página não recebe mensagens ou solicitações de agendamento.</p>
        )}
      </section>
      <section className="reading-section" id="atendimento" aria-labelledby="atendimento-titulo">
        <h2 id="atendimento-titulo">Modalidades de atendimento</h2>
        <div className={styles.modalities}>
          {Object.values(services).map(service => (
            <section className={styles.modality} key={service.href} aria-labelledby={`modalidade-${service.modality.toLowerCase()}`}>
              <h3 id={`modalidade-${service.modality.toLowerCase()}`}>{service.title}</h3>
              <p>{service.contactSummary}</p>
              {service.regionSummary && <p>{service.regionSummary}</p>}
              <Link prefetch={false} className="text-link" href={service.href}>Conheça o serviço <Arrow /></Link>
            </section>
          ))}
        </div>
      </section>
      <section className="reading-section" id="orientacoes" aria-labelledby="orientacoes-titulo">
        <h2 id="orientacoes-titulo">Informação e privacidade</h2>
        {hasContactChannel && <p>Utilize o primeiro contato para dúvidas gerais. Evite enviar relatos clínicos detalhados, resultados de testes ou documentos sensíveis em uma mensagem inicial.</p>}
        <p>Não há formulário de envio de mensagens neste site. Consulte a <Link prefetch={false} href="/privacidade/">Política de Privacidade</Link> para conhecer o funcionamento das páginas.</p>
        <div className="care-note"><h3>Precisa de ajuda imediata?</h3><p>Este site não oferece atendimento de urgência ou emergência. Em uma situação de risco imediato, procure um serviço de urgência da sua região.</p></div>
      </section>
    </InteriorPage>
  );
}
