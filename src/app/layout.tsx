import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} | Psicologia`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: "Eduardo Villela Tumani — Psicologia",
  authors: [{ name: site.name }],
  icons: { icon: "/icon.svg" },
  openGraph: { title: `${site.name} | Psicologia`, description: site.description, locale: "pt_BR", type: "website", siteName: site.name },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F7F5F0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
