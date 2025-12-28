import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import ProceduresHero from "../components/hero/ProceduresHero";
import ProceduresFilterBar, {
  type FilterValue,
} from "../components/filter/ProceduresFilterBar";
import ProcedureCategorySection from "../components/categories/ProcedureCategorySection";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetAllProcedures from "../api/useGetAllProcedures";
import useGetProcedureCategories from "../api/useGetProcedureCategories";

const CAT_PARAM = "cat"; // slug

const AllProceduresPage: FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ slug من الـ URL
  const filter: FilterValue = searchParams.get(CAT_PARAM) ?? "all";

  const setFilter = (value: FilterValue) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "all") next.delete(CAT_PARAM);
      else next.set(CAT_PARAM, value);

      return next;
    });
  };

  const queryResult = useGetAllProcedures();
  const categoriesQueryResult = useGetProcedureCategories();

  // ✅ فلترة باستخدام slug مباشرة
  const filteredCategories = useMemo(() => {
    const data = queryResult?.data ?? [];
    if (filter === "all") return data;

    return data.filter((cat) => cat.slug === filter);
  }, [queryResult?.data, filter]);

  return (
    <main
      aria-label={t("ProceduresPage.mainAria", "All procedures")}
      className="bg-[var(--bg-page)]"
    >
      <ProceduresHero />

      <FetchHandler queryResult={categoriesQueryResult} skeletonType="hero">
        <ProceduresFilterBar
          activeFilter={filter}
          onChange={setFilter}
          categories={categoriesQueryResult?.data?.categories ?? []}
        />
      </FetchHandler>

      <FetchHandler
        skeletonType="procedure-section-home"
        queryResult={queryResult}
      >
        {filteredCategories.length > 0 ? (
          <section>
            <div className="containerr py-6 md:py-8 lg:py-10">
              {filteredCategories.map((cat, index) => (
                <ProcedureCategorySection
                  key={cat.id}
                  category={cat}
                  index={index}
                  activeFilter={filter}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="containerr py-10">
            <p className="text-sm text-muted">
              {t("ProceduresPage.empty", "No procedures found.")}
            </p>
          </section>
        )}
      </FetchHandler>
    </main>
  );
};

export default AllProceduresPage;
