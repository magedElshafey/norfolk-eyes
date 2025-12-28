import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

export type FilterValue = "all" | string;

type Props = {
  activeFilter: FilterValue;
  onChange: (value: FilterValue) => void; // هنسيبه عشان يدعم keyboard/analytics لو حبيت
  categories: {
    id: number;
    name: string;
    slug: string;
    description: string;
    procedures_count: number;
  }[];
};

const CAT_PARAM = "cat";

const ProceduresFilterBar: FC<Props> = ({
  activeFilter,
  onChange,
  categories,
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const totalCount = useMemo(
    () =>
      (categories ?? []).reduce(
        (sum, c) => sum + (c?.procedures_count ?? 0),
        0
      ),
    [categories]
  );

  const baseBtn =
    "inline-flex items-center gap-2 rounded-full border px-3 md:px-4 py-1.5 text-[11px] md:text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]";

  const getBtnClass = (isActive: boolean) =>
    isActive
      ? `${baseBtn} bg-primaryGreen text-white border-primaryGreen`
      : `${baseBtn} bg-white text-primaryDarkGreen border-softGray hover:bg-primaryGreen/5`;

  const badgeBase =
    "inline-flex min-w-[1.5rem] justify-center rounded-full text-[10px] px-1.5 py-0.5";

  const getBadgeClass = (isActive: boolean) =>
    isActive
      ? `${badgeBase} bg-white/15 text-white`
      : `${badgeBase} bg-[var(--proc-list-tag-bg)] text-[var(--proc-list-tag-text)]`;

  const makeTo = (value: FilterValue) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(CAT_PARAM);
    else next.set(CAT_PARAM, String(value));
    return { search: next.toString() ? `?${next.toString()}` : "" };
  };

  return (
    <section
      aria-label={t("ProceduresPage.filterAria", "Filter procedures by type")}
      className="bg-[var(--proc-list-bg)] border-b border-softGray/50"
    >
      <div className="containerr py-3 md:py-4">
        <ul className="flex flex-wrap items-center gap-2 md:gap-3">
          <li>
            <Link
              to={makeTo("all")}
              onClick={() => onChange("all")}
              aria-current={activeFilter === "all" ? "page" : undefined}
              className={getBtnClass(activeFilter === "all")}
            >
              <span>{t("All")}</span>
              <span className={getBadgeClass(activeFilter === "all")}>
                {totalCount}
              </span>
            </Link>
          </li>

          {categories.map((cat) => {
            const slug = cat.slug;
            const isActive = activeFilter === slug;

            return (
              <li key={slug}>
                <button
                  type="button"
                  onClick={() => onChange(slug)}
                  aria-pressed={isActive}
                  className={getBtnClass(isActive)}
                >
                  <span>{cat.name}</span>
                  <span className={getBadgeClass(isActive)}>
                    {cat.procedures_count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProceduresFilterBar;
