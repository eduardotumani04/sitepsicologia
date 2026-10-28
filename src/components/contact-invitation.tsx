import Link from "next/link";
import { Arrow } from "./arrow";
import { SectionLabel } from "./section-label";
import { hasContactChannel } from "@/lib/contact";

export function ContactInvitation({ nextPage = "/psicoterapia/" }: { nextPage?: "/psicoterapia/" | "/sobre/" }) {
  return (
    <section className="contact-invitation" aria-labelledby="next-step-heading">
      <div className="container contact-invitation-inner">
        <div>
          <SectionLabel>{hasContactChannel ? "Vamos conversar" : "Conheça meu trabalho"}</SectionLabel>
          <h2 id="next-step-heading">{hasContactChannel ? <>Toda conversa começa<br />com uma <em>possibilidade.</em></> : <>Ciência para compreender.<br />Cuidado para <em>acolher.</em></>}</h2>
          <p>{hasContactChannel ? "Conheça os canais profissionais para esclarecer suas dúvidas sobre o meu trabalho." : "Uma prática orientada pela compreensão do comportamento e pelo respeito à singularidade de cada pessoa."}</p>
        </div>
        <Link prefetch={false} className="button button-light" href={hasContactChannel ? "/contato/" : nextPage}>{hasContactChannel ? "Ir para contato" : nextPage === "/sobre/" ? "Conheça minha atuação" : "Conheça a abordagem"} <Arrow direction="diagonal" /></Link>
      </div>
    </section>
  );
}
