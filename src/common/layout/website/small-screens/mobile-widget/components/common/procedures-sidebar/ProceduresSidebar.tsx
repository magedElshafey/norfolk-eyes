import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
import type { ProcedureListType } from "@/features/producers/types/ProcedureList.types";
import SidebarIntro from "../sidebar-intro/SidebarIntro";
import Backdrop from "../backdrop/Backdrop";
import ProcedureItem from "./ProducerItem";
import useGetAllProcedures from "@/features/producers/api/useGetAllProcedures";

interface CategoriesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProcedureSidebar: React.FC<CategoriesSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n, t } = useTranslation();
  const dir = i18n.dir() as "ltr" | "rtl";
  const navigate = useNavigate();
  const { isLoading, data } = useGetAllProcedures();

  const handleNavigate = useCallback(
    (slug: string) => {
      navigate(`/procedures/${slug}`);
      onClose();
    },
    [navigate, onClose]
  );

  const titleId = "procedures-sidebar-title";

  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria={t("A11y.closeProceduresNav", "Close procedures navigation")}
      />

      <aside
        className={`
          fixed top-0
          ${dir === "rtl" ? "left-0" : "right-0"}
          h-screen w-[85%] max-w-sm
           bg-[color:var(--bg-surface)]
          text-[color:var(--text-main)]
          border border-[color:var(--border-subtle)]
         
          shadow-2xl
          z-40
          overflow-y-auto
          transform transition-transform duration-300 ease-out
          ${
            isOpen
              ? "translate-x-0"
              : dir === "rtl"
              ? "-translate-x-full"
              : "translate-x-full"
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby={titleId}
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <div className="flex-center">
            <p
              id={titleId}
              className="text-lg font-bold text-[color:var(--sidebar-header-text,var(--section-title-color))]"
            >
              {t("Navbar.Procedures")}
            </p>
          </div>
        </SidebarIntro>

        <nav
          aria-label={t("Navbar.Procedures") ?? "Procedures"}
          className="mt-2"
        >
          <ul
            role="menu"
            aria-label={t("Navbar.Procedures") ?? "Procedures list"}
            className="flex flex-col divide-y divide-[color:var(--border-subtle)]"
          >
            {isLoading && (
              <li className="py-4 flex-center" role="status">
                <Loader />
              </li>
            )}

            {!isLoading && data?.length
              ? data.map((cat: ProcedureListType) => (
                  <li key={cat.id} role="none">
                    <ProcedureItem
                      category={cat}
                      dir={dir}
                      onNavigate={handleNavigate}
                    />
                  </li>
                ))
              : !isLoading && (
                  <li className="py-4">
                    <EmptyData />
                  </li>
                )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default memo(ProcedureSidebar);
