"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/site";
import { Arrow } from "./arrow";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname.replace(/\/$/, "") === href.replace(/\/$/, "");
  }

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} — página inicial`} onClick={() => setMenuOpen(false)}>
          <span className="brand-name">Eduardo Villela Tumani<span className="brand-dot">.</span></span>
          <span className="brand-registration">Psicólogo <span aria-hidden="true">·</span> {site.registration}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <Link href="/contato/" className="header-contact">Vamos conversar <Arrow direction="diagonal" /></Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={menuButton}
        >
          <span>{menuOpen ? "Fechar" : "Menu"}</span>
          <span className={`menu-lines ${menuOpen ? "is-open" : ""}`} aria-hidden="true"><span /><span /></span>
        </button>
      </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação principal móvel" hidden={!menuOpen}>
          <div className="container">
            {[...navigation, { href: "/contato/", label: "Contato" }].map(({ href, label }, index) => (
              <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                <span className="mobile-nav-number" aria-hidden="true">0{index + 1}</span>
                {label}<Arrow direction="diagonal" />
              </Link>
            ))}
            <p className="mobile-nav-note">Ciência, escuta e compreensão do comportamento.</p>
          </div>
        </nav>
    </header>
  );
}
