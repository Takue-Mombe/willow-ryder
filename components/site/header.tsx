"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  brandName: string;
  logoUrl: string;
};

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ brandName, logoUrl }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="shell site-header__inner">
        <Link className="site-header__brand" href="/">
          <span className="site-header__brand-mark">
            <Image alt={`${brandName} logo`} fill sizes="48px" src={logoUrl} />
          </span>
          <span className="site-header__brand-text">
            {brandName.split(" ").slice(0, 1).join(" ")}
            <span>{brandName.split(" ").slice(1).join(" ")}</span>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                className={`site-header__link${active ? " is-active" : ""}`}
                href={link.href}
                key={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <Link className="button button--primary" href="/contact">
            Get a Quote
          </Link>
          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="site-header__toggle"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`site-header__mobile${mobileOpen ? " is-open" : ""}`}>
        <nav aria-label="Mobile navigation" className="shell site-header__mobile-nav">
          {navLinks.map((link) => (
            <Link
              className="site-header__mobile-link"
              href={link.href}
              key={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="button button--primary site-header__mobile-cta"
            href="/contact"
            onClick={() => setMobileOpen(false)}
          >
            Start Your Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
