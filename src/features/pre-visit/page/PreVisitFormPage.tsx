import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import PreVisitForm from "../components/PreVisitForm";

const PreVisitFormPage: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <main className="bg-[var(--page-hero)]">
      <motion.section
        initial={initial}
        animate={animate}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="border-b border-softGray/60 bg-[var(--mm-bg)]"
        aria-label={t("PreVisit.heroAria", "Patient pre-visit form")}
      >
        <div className="containerr py-8 md:py-10 lg:py-12">
          <div className="space-y-3">
            <SectionTitle
              as="h3"
              text="Pre-Visit Medical Form | Norfolk Eyes Eye Clinic"
              id="previsit-heading"
            />
            <SectionDescription description="Please fill out the pre-visit form at Norfolk Eyes to help us understand your medical condition and eye symptoms before your appointment. This information is for informational purposes only and does not replace an in-office examination." />
            <section>
              <PreVisitForm />
            </section>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default PreVisitFormPage;
