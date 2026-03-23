import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

type SiteFooterProps = {
  siteSettings: SiteSettings;
};

export function SiteFooter({ siteSettings }: SiteFooterProps) {
  const [brandFirst, ...brandRest] = siteSettings.businessName.split(" ");

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand" href="/">
            {brandFirst} <span>{brandRest.join(" ")}</span>
          </Link>
          <p>{siteSettings.businessDescription}</p>
          <div className="site-footer__contact-lines">
            <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}>{siteSettings.phone}</a>
            <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            <span>
              {siteSettings.addressLocality}, {siteSettings.addressRegion}, Zimbabwe
            </span>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>Explore</h3>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/blog">Insights</Link>
        </div>

        <div className="site-footer__column">
          <h3>Studio</h3>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Admin Login</Link>
          <Link href="/admin">CMS</Link>
        </div>

        <div className="site-footer__column">
          <h3>Serving</h3>
          <span>Victoria Falls</span>
          <span>Hwange</span>
          <span>Bulawayo</span>
          <span>Harare</span>
          <span>All of Zimbabwe</span>
        </div>
      </div>

      <div className="shell site-footer__bottom">
        <p>
          © 2026 {siteSettings.businessName}. Crafted in Victoria Falls, Zimbabwe.
        </p>
        <p>
          Carpentry Victoria Falls · Interior Design Zimbabwe · Epoxy Flooring
          Zimbabwe
        </p>
      </div>
    </footer>
  );
}
