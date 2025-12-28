import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/common/components/loader/spinner/Loader";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { ProcedureSearch } from "@/features/producers/types/ProcedureList.types";
import EmptyData from "@/common/components/empty-data/EmptyData";

interface SearchResultsProps {
  products?: ProcedureSearch[];
  isLoading: boolean;
  hasSearchValue: boolean;
  onClear: () => void;
  onClose?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = memo(
  ({ products, isLoading, hasSearchValue, onClear, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isEmpty =
      !isLoading && hasSearchValue && (!products || products.length === 0);
    const showPrompt = !isLoading && !hasSearchValue;

    const renderedProducts = useMemo(() => {
      if (!products?.length) return null;
      return products.map((product) => (
        <button
          key={product.id}
          onClick={() => {
            navigate(`/${product?.type}/${product.slug}`);
            onClear();
            onClose?.();
          }}
          className="
            flex items-center gap-3 p-2 w-full text-start
            hover:bg-[var(--list-hover-bg,rgba(15,23,42,0.02))]
            rounded
            transition-colors
          "
          role="option"
          aria-label={product.name}
        >
          <p className="text-sm font-medium text-[color:var(--text-main)] line-clamp-2">
            {product.name}
          </p>
        </button>
      ));
    }, [products, navigate, onClear, onClose]);

    return (
      <div
        className="p-2 max-h-[350px] overflow-y-auto"
        role="listbox"
        aria-live="polite"
      >
        {isLoading && (
          <div
            className="flex items-center justify-center gap-2 p-4"
            role="status"
          >
            <Loader />
            <span className="ml-2 text-[color:var(--text-muted)]">
              {t("loading")}
            </span>
          </div>
        )}

        {showPrompt && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CiSearch
              size={32}
              className="mb-2"
              aria-hidden="true"
              style={{ color: "var(--icon-muted, #9CA3AF)" }}
            />
            <p className="text-sm font-medium text-[color:var(--text-muted)]">
              {t("startTypingToSearch")}
            </p>
            <p className="text-xs text-[color:var(--text-muted-soft,#9CA3AF)]">
              {t("searchForProductsCategoriesOrBrands")}
            </p>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CiSearch
              size={32}
              className="mb-2"
              aria-hidden="true"
              style={{ color: "var(--icon-muted, #9CA3AF)" }}
            />

            <EmptyData />
          </div>
        )}

        {!isLoading && !isEmpty && hasSearchValue && (
          <div className="flex flex-col gap-1">{renderedProducts}</div>
        )}
      </div>
    );
  }
);

SearchResults.displayName = "SearchResults";
export default SearchResults;
