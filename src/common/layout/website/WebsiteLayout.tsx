// WebsiteLayout.tsx
import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";

import ScrollToTopButton from "./common/scroll-to-top/ScrollToTopButton";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
import StickyNavbar from "./larg-screens/sticky-navbar/StickyNavbar";
import Header from "./larg-screens/header/Header";
import PageSeo from "@/features/seo/PageSeo";
import CookieBanner from "@/features/cookies/CookieBanner";

const Footer = lazy(() => import("./common/footer/Footer"));
const AccessibilityWidget = lazy(
  () => import("@/common/components/accessibility-widget/AccessibilityWidget")
);

const WebsiteLayout = () => {
  const { data } = useGetWebsiteSettings();

  const clinicSchema = data?.app_url
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": `${data.app_url}#organization`,
        name: data.app_name,
        url: data.app_url,
        logo: data.app_logo,
        telephone: data.contact_phone,
        sameAs: [
          data.social_facebook,
          data.social_instagram,
          data.social_linkedin,
          data.social_youtube,
          data.social_twitter,
        ].filter(Boolean),
      }
    : undefined;
  console.log("data from settings", data);
  return (
    <div id="app-shell" className="flex min-h-screen flex-col">
      <PageSeo
        structuredData={clinicSchema}
        fav={data?.app_favicon || ""}
        title={data?.seo_title}
        description={data?.seo_description || ""}
      />

      {/* Global tools */}
      <ScrollToTopButton />

      <Suspense fallback={null}>
        <AccessibilityWidget />
      </Suspense>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileNavbar logo={data?.app_logo || ""} />
        <MobileWidget />
      </div>

      {/* Desktop */}
      <header className="hidden lg:block">
        <Header />
        <StickyNavbar logo={data?.app_logo || ""} />
      </header>

      {/* Content */}
      <main className="grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-40" />}>
        {data && <Footer {...data} />}
      </Suspense>

      <CookieBanner />
    </div>
  );
};

export default WebsiteLayout;
