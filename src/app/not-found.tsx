import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { SectionLabel } from "@/components/section-label";

export default function NotFound() {
  return <section className="not-found"><div className="container"><SectionLabel>Página não encontrada · 404</SectionLabel><h1>Vamos encontrar<br />outro <em>caminho.</em></h1><p>A página que você procura não está disponível.<br />Você pode continuar a navegação pela página inicial.</p><Link className="button button-dark" href="/">Voltar ao início <Arrow /></Link></div></section>;
}
