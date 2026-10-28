import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { Arrow } from "./arrow";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link className="footer-name" href="/">{site.name}<span>.</span></Link>
            <p className="footer-registration">Psicólogo — {site.registration}</p>
            <p className="footer-tagline">Ciência para compreender.<br />Cuidado para acolher.</p>
          </div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/contato/">Contato <Arrow direction="diagonal" /></Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          <Link href="/privacidade/">Política de Privacidade</Link>
        </div>
        <p className="footer-disclaimer">O conteúdo deste site é informativo e não substitui o acompanhamento psicológico individualizado.</p>
      </div>
    </footer>
  );
}
