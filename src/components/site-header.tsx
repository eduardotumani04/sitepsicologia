"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/site";
import { hasContactChannel } from "@/lib/contact";
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
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onDesktop() {
      if (!desktop.matches) return;
      const focused = document.activeElement;
      const focusWasInMenu = focused === menuButton.current || header.current?.querySelector("#mobile-navigation")?.contains(focused);
      setMenuOpen(false);
      if (focusWasInMenu) header.current?.querySelector<HTMLAnchorElement>(".brand")?.focus();
    }
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    const current = pathname.replace(/\/$/, "");
    const target = href.replace(/\/$/, "");
    return current === target || (target !== "" && current.startsWith(`${target}/`));
  }

  return (
    <header className="site-header" ref={header} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
    }}>
      <div className="container header-inner">
        <Link prefetch={false} href="/" className="brand" aria-label={`${site.name} — página inicial`} onClick={() => setMenuOpen(false)}>
          <span className="brand-name">Eduardo Villela Tumani<span className="brand-dot">.</span></span>
          <span className="brand-registration">Psicólogo <span aria-hidden="true">·</span> {site.registration}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(({ href, label }) => (
            <Link prefetch={false} key={href} href={href} aria-current={isActive(href) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <Link prefetch={false} href="/contato/" className="header-contact">{hasContactChannel ? "Vamos conversar" : "Contato"} <Arrow direction="diagonal" /></Link>
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
              <Link prefetch={false} key={href} href={href} aria-current={isActive(href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
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
