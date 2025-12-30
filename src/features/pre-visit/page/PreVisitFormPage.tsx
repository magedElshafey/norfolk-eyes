import { FC } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import { useTranslation } from "react-i18next";

import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import PreVisitForm from "../components/PreVisitForm";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetPreVisitIntro from "../api/useGetPreVisitIntro";

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

const PreVisitFormPage: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const query = useGetPreVisitIntro();

  const initial: TargetAndTransition = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };

  const animate: TargetAndTransition = { opacity: 1, y: 0 };

  const transition: Transition | undefined = shouldReduceMotion
    ? undefined
    : { duration: 0.45, ease: EASE_OUT };

  return (
    <main className="bg-[var(--page-hero)]">
      <LazyMotion features={domAnimation}>
        <m.section
          initial={shouldReduceMotion ? false : initial}
          animate={animate}
          transition={transition}
          className="border-b border-softGray/60 bg-[var(--mm-bg)]"
          aria-label={t("PreVisit.heroAria", "Patient pre-visit form")}
        >
          <div className="containerr py-8 md:py-10 lg:py-12">
            <FetchHandler queryResult={query} skeletonType="hero">
              {query?.data?.is_active ? (
                <div className="space-y-3">
                  <SectionTitle
                    as="h3"
                    text={query?.data?.section?.heading}
                    id="previsit-heading"
                  />
                  <SectionDescription
                    description={query?.data?.section?.description}
                  />
                </div>
              ) : null}
            </FetchHandler>

            <section>
              <PreVisitForm />
            </section>
          </div>
        </m.section>
      </LazyMotion>
    </main>
  );
};

export default PreVisitFormPage;
