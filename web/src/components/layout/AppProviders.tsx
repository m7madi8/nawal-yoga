"use client";

import { usePathname } from "next/navigation";
import { I18nProvider, useI18n } from "@/lib/i18n/provider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/sections/PageLoader";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showLoader = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <I18nProvider>
      <SmoothScroll>
        {showLoader && <PageLoader />}
        <SkipLink />
        <Header />
        <main id="main" className="min-w-0 pt-14">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}

function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[110] focus:bg-olive focus:px-4 focus:py-2 focus:text-bone"
    >
      {t("skip_to_content")}
    </a>
  );
}
