import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ProceduresHeroSkeleton: FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };

  const shimmer = shouldReduceMotion ? "" : "animate-pulse";

  return (
    <motion.section
      aria-labelledby="procedures-hero-heading"
      className="bg-[var(--mm-bg)] border-b border-softGray/50"
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="containerr py-8 md:py-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
          {/* Text */}
          <div className="space-y-3 md:space-y-4">
            {/* SectionIntro */}
            <div
              className={`h-4 w-40 rounded-full bg-softGray/50 ${shimmer}`}
            />

            {/* SectionTitle */}
            <div className="space-y-2">
              <div
                className={`h-6 md:h-7 w-[92%] rounded-xl bg-softGray/50 ${shimmer}`}
              />
              <div
                className={`h-6 md:h-7 w-[70%] rounded-xl bg-softGray/50 ${shimmer}`}
              />
            </div>

            {/* SectionDescription */}
            <div className="space-y-2 pt-1">
              <div
                className={`h-4 w-[95%] rounded-full bg-softGray/40 ${shimmer}`}
              />
              <div
                className={`h-4 w-[90%] rounded-full bg-softGray/40 ${shimmer}`}
              />
              <div
                className={`h-4 w-[78%] rounded-full bg-softGray/40 ${shimmer}`}
              />
            </div>

            {/* SectionEnding */}
            <div
              className={`h-4 w-[82%] rounded-full bg-softGray/40 ${shimmer}`}
            />
          </div>

          {/* Simple visual / stats */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="relative max-w-md w-full mx-auto"
            aria-hidden="true"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-softYellow/40 via-softYellow/0 to-primaryGreen/20 pointer-events-none" />

            <div className="relative rounded-3xl bg-white border border-softGray/60 shadow-xl px-5 py-4 flex flex-col gap-3">
              {/* top small label */}
              <div
                className={`h-3 w-44 rounded-full bg-softGray/50 ${shimmer}`}
              />

              {/* paragraph */}
              <div className="space-y-2">
                <div
                  className={`h-3 w-[96%] rounded-full bg-softGray/40 ${shimmer}`}
                />
                <div
                  className={`h-3 w-[92%] rounded-full bg-softGray/40 ${shimmer}`}
                />
                <div
                  className={`h-3 w-[78%] rounded-full bg-softGray/40 ${shimmer}`}
                />
              </div>

              {/* stats grid */}
              <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-primaryGreen/5 px-3 py-2"
                  >
                    <div
                      className={`h-4 w-[70%] mx-auto rounded-full bg-softGray/50 ${shimmer}`}
                    />
                    <div
                      className={`h-3 w-[90%] mx-auto mt-2 rounded-full bg-softGray/40 ${shimmer}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProceduresHeroSkeleton;
