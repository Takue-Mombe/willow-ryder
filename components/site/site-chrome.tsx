"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import type { SiteSettings } from "@/lib/types";

type SiteChromeProps = {
  children: React.ReactNode;
  siteSettings: SiteSettings;
};

export function SiteChrome({ children, siteSettings }: SiteChromeProps) {
  const pathname = usePathname();
  const hidePublicChrome = pathname.startsWith("/admin");

  return (
    <div className="site-frame">
      {hidePublicChrome ? null : (
        <SiteHeader brandName={siteSettings.businessName} logoUrl={siteSettings.logoUrl} />
      )}
      {children}
      {hidePublicChrome ? null : <SiteFooter siteSettings={siteSettings} />}
    </div>
  );
}
