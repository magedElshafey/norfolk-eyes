import AboutHero from "../components/AboutHero";
import AboutSpecialist from "../components/AboutSpecialist";
import CareerSection from "../components/CareerSection";
import AcheivementSection from "../components/AceivementSection";
import WorkGallery from "../components/WorkGallery";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useTranslation } from "react-i18next";
export default function AboutUsPage() {
  const { t } = useTranslation();
  return (
    <>
      <AboutHero />
      <CareerSection />
      <AboutSpecialist />
      <AcheivementSection />
      <WorkGallery />
      <div className="containerr">
        <div
          className="
                rounded-3xl
                bg-[var(--footer-bg)]
                border border-[var(--text-muted)]
             
                shadow-sm
                p-4 md:p-5
                space-y-2 mt-6 flex items-center justify-between flex-col md:flex-row gap-4
              "
        >
          <div>
            <p className="font-semibold text-center md:text-start text-[var(--footer-text)]">
              {t("Have you recently visited us?")}
            </p>
            <p className="text-xs  mb-3 text-center md:text-start mt-3 md:mt-0 text-[var(--footer-muted)]">
              {t(
                "Your feedback helps other patients feel confident and helps us improve the care we provide."
              )}
            </p>
          </div>

          <a className="inline-block w-fit mt-4" href="https://www.google.com">
            <MainBtn text="submit review" theme="outline" />
          </a>
        </div>
      </div>
    </>
  );
}
