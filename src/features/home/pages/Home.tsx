// import PageSeo from "@/features/seo/PageSeo";
import AboutAffiliationsPreviewSection from "../components/about-affiliations/AboutAffiliationsPreviewSection";
// import HomeContact from "../components/contact-details/HomeContact";
import FaqSection from "../components/faq/FaqSection";
import HomeHero from "../components/hero/HomeHero";
import PatientEducationSection from "../components/patient-education/PatientEducationSection";
import SuccessStoriesSlider from "../components/patient-education/SuccessStoriesSlider";
import PreparingForVisitSection from "../components/pre-visit/PreparingForVisitSection";
import OurMainProceduresSection from "../components/producers/OurMainProceduresSection";
// import TechnologySection from "../components/technology/TechnologySection";
import WhyChooseUsSection from "../components/why-choose-us/WhyChooseUsSection";
// import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
const Home = () => {
  // const { isLoading, data } = useGetWebsiteSettings();
  return (
    <>
      {/* {!isLoading && data && (
        <PageSeo
          title={data?.app_name}
          description={data?.app_description}
          canonicalPath="/"
          ogType="website"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: data?.app_name,
            description: data?.app_description,
            url: data?.app_url,
            inLanguage: "en-GB",
            medicalSpecialty: "Ophthalmology",
            publisher: {
              "@id": `${data?.app_url}#organization`,
            },
          }}
        />
      )} */}
      <HomeHero />
      <WhyChooseUsSection />
      <AboutAffiliationsPreviewSection />
      <OurMainProceduresSection />
      <PatientEducationSection />
      <PreparingForVisitSection />
      <FaqSection />
      <SuccessStoriesSlider />
    </>
  );
};

export default Home;
