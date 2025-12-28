import { FC, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import FaqItem, { FaqItemProps } from "./FaqItem";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";
import useGetFaq from "../../api/useGetFaq";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const FaqSection: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const containerVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };
  const queryResult = useGetFaq();
  return (
    <>
      {queryResult?.data?.is_active ? (
        <section
          aria-labelledby="home-faq-heading"
          className="
        relative
   
       bg-[var(--bg-page)]
        border-b border-[var(--border-subtle)]
    
      "
        >
          {/* subtle gradient bubble */}
          <div
            aria-hidden="true"
            className="
          pointer-events-none
          absolute right-[-80px] top-[-40px]
          h-48 w-48 rounded-full
          bg-[color:var(--accent-soft-bg)]
          blur-3xl
        "
          />
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative containerr py-10 md:py-14 lg:py-16"
          >
            <FetchHandler queryResult={queryResult} skeletonType="faq-section">
              <div className="flex flex-col items-center justify-center text-center gap-2 mb-6">
                <SectionIntro title={queryResult?.data?.section?.intro || ""} />
                <SectionTitle
                  as="h2"
                  id="home-faq-heading"
                  text={queryResult?.data?.section?.heading || ""}
                />
                <SectionDescription
                  description={queryResult?.data?.section?.description || ""}
                />
              </div>
              <div
                className="
            columns-1 md:columns-2
            gap-4 md:gap-6
          "
                aria-label={t(
                  "FAQ.listAria",
                  "Frequently asked questions about eye care and surgery"
                )}
              >
                {queryResult?.data?.faqs.map(
                  (item: FaqItemProps, index: number) => (
                    <div
                      key={index}
                      className="
                break-inside-avoid
                mb-4 md:mb-6
              "
                    >
                      <FaqItem
                        answer={item?.answer}
                        question={item?.question}
                        index={index}
                      />
                    </div>
                  )
                )}
              </div>

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
                    {t("Still have a question about your eyes?")}
                  </p>
                  <p className="text-xs  mb-3 text-center md:text-start mt-3 md:mt-0 text-[var(--footer-muted)]">
                    {t(
                      "Our team are happy to clarify anything before you book or before your procedure date."
                    )}
                  </p>
                </div>

                <Link className="inline-block w-fit mt-4" to="/contact-us">
                  <MainBtn
                    text="Contact us about your question"
                    theme="outline"
                  />
                </Link>
              </div>
            </FetchHandler>
          </motion.div>
        </section>
      ) : null}
    </>
  );
};

export default FaqSection;
