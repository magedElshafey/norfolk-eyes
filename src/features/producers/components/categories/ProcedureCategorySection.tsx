import { FC, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion";
import ProcedureMainCard from "../card/ProcedureMainCard";
import { ProcedureListType } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { Link } from "react-router-dom";

type Props = {
  category: ProcedureListType;
  index: number;
  activeFilter: "all" | string;
};

const ProcedureCategorySection: FC<Props> = ({ category, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const inView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  const animate = { opacity: 1, y: 0 };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        aria-labelledby={`${category.id}-heading`}
        className="border-b border-softGray/40 py-6 md:py-8"
        initial={shouldReduceMotion ? false : initial}
        animate={inView ? animate : initial}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 0.45, ease: "easeOut", delay: index * 0.04 }
        }
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
          {/* ================= Category Info ================= */}
          <div className="md:max-w-sm space-y-1.5">
            <h2
              id={`${category.id}-heading`}
              className="text-lg md:text-xl font-semibold text-[var(--section-title-color)]"
            >
              <Link
                to={`/procedures/${category?.slug}`}
                className="transition-all duration-300 hover:underline"
              >
                {category?.name}
              </Link>
            </h2>

            <div className="!text-xs md:!text-sm !text-[var(--text-muted)]">
              <HtmlConverter html={category?.description} />
            </div>
          </div>

          {/* ================= Procedures Grid ================= */}
          {category?.children && category.children.length > 0 && (
            <ul
              className="
                mt-3 md:mt-0
                grid gap-3
                md:grid-cols-2
                lg:grid-cols-3
                w-full
              "
              role="list"
              aria-label={`Procedures in ${category.name}`}
            >
              {category.children.map((item, i) => (
                <ProcedureMainCard
                  key={item.id}
                  item={item}
                  index={i}
                  trigger={inView}
                  isHome={false}
                />
              ))}
            </ul>
          )}
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default ProcedureCategorySection;
