import { Outlet } from "react-router-dom";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import ScrollToTopButton from "./common/scroll-to-top/ScrollToTopButton";
import MobileNavbar from "./small-screens/mobile-navbar/MobileNavbar";
import MobileWidget from "./small-screens/mobile-widget/MobileWidget";
import StickyNavbar from "./larg-screens/sticky-navbar/StickyNavbar";
import NavbarSkeleton from "@/common/components/loader/skeltons/NavbarSkeleton";
import Header from "./larg-screens/header/Header";
import AccessibilityWidget from "@/common/components/accessibility-widget/AccessibilityWidget";
import Footer from "./common/footer/Footer";
import FooterSkeleton from "@/common/components/loader/skeltons/FooterSkeleton";
import PageSeo from "@/features/seo/PageSeo";
import CookieBanner from "@/features/cookies/CookieBanner";

const WebsiteLayout = () => {
  const { data, isLoading } = useGetWebsiteSettings();
  const logo = data?.app_logo;

  const clinicSchema = data && {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${data.app_url}#organization`,
    name: data.app_name,
    url: data.app_url,
    medicalSpecialty: "Ophthalmology",
    logo: {
      "@type": "ImageObject",
      url: data.app_logo,
    },
    telephone: data.contact_phone,
    address: data.contact_address && {
      "@type": "PostalAddress",
      // لو عندك تفاصيل أكتر حطها
      // streetAddress: data.contact_address.street,
      // addressLocality: data.contact_address.city,
      addressCountry: "UK", // أو UK أو حسب الـ project
    },
    sameAs: [
      data.social_facebook,
      data.social_instagram,
      data.social_linkedin,
      data.social_youtube,
      data.social_twitter,
    ].filter(Boolean),
  };

  return (
    <div id="app-shell" className="flex min-h-screen flex-col">
      {/* 👇 نحط الـ PageSeo هنا عشان الـ org schema + الdefaults */}
      {!isLoading && clinicSchema && <PageSeo structuredData={clinicSchema} />}

      {isLoading ? (
        <NavbarSkeleton />
      ) : (
        <>
          {/* common tools*/}
          <ScrollToTopButton />
          <AccessibilityWidget />

          {/* mobile layout */}
          <div className="lg:hidden">
            <MobileNavbar logo={logo || ""} />
            <MobileWidget />
          </div>

          {/* website layout */}
          <header className="hidden md:block">
            <Header />
            <StickyNavbar logo={logo || ""} />
          </header>
        </>
      )}

      {/* breadcrumb + outlet */}
      <main className="grow flex flex-col">
        <div>
          <Outlet />
        </div>
      </main>

      {isLoading ? (
        <FooterSkeleton />
      ) : (
        <Footer
          app_logo={logo || ""}
          contact_address={data?.contact_address || ""}
          contact_email={data?.contact_email || ""}
          contact_phone={data?.contact_phone || ""}
          app_description={data?.app_description || ""}
          social_facebook={data?.social_facebook || ""}
          social_instagram={data?.social_instagram || ""}
          social_linkedin={data?.social_linkedin || ""}
          social_twitter={data?.social_twitter || ""}
          social_youtube={data?.social_youtube || ""}
          copyright_text={data?.copyright_text || ""}
          business_hours={data?.business_hours || ""}
        />
      )}
      <CookieBanner />
    </div>
  );
};

export default WebsiteLayout;
