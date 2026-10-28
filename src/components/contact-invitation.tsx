import Link from "next/link";
import { Arrow } from "./arrow";
import { SectionLabel } from "./section-label";

export function ContactInvitation() {
  return (
    <section className="contact-invitation" aria-labelledby="contact-heading">
      <div className="container contact-invitation-inner">
        <div>
          <SectionLabel>Vamos conversar</SectionLabel>
          <h2 id="contact-heading">Toda conversa começa<br />com uma <em>possibilidade.</em></h2>
          <p>Conheça os próximos passos para entrar em contato<br className="desktop-break" /> e esclarecer suas dúvidas sobre o meu trabalho.</p>
        </div>
        <Link prefetch={false} className="button button-light" href="/contato/">Ir para contato <Arrow direction="diagonal" /></Link>
      </div>
    </section>
  );
}
