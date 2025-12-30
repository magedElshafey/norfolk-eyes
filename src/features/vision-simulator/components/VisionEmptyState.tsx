import React from "react";
import { useTranslation } from "react-i18next";
import MainBtn from "@/common/components/buttons/MainBtn";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import { RefreshCw, Info, AlertTriangle } from "lucide-react";

type Props = {
  variant?: "inactive" | "missing" | "error";
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
};

function getIcon(variant: Props["variant"]) {
  if (variant === "error") return AlertTriangle;
  if (variant === "inactive") return Info;
  return Info;
}

const VisionEmptyState: React.FC<Props> = ({
  variant = "missing",
  onRetry,
  isRetrying = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const Icon = getIcon(variant);

  const titleKey =
    variant === "inactive"
      ? "Vision.empty.inactiveTitle"
      : variant === "error"
      ? "Vision.empty.errorTitle"
      : "Vision.empty.noDataTitle";

  const descKey =
    variant === "inactive"
      ? "Vision.empty.inactiveDesc"
      : variant === "error"
      ? "Vision.empty.errorDesc"
      : "Vision.empty.noDataDesc";

  return (
    <section
      aria-label={t("Vision.empty.aria", "Vision simulator status")}
      className={`containerr py-8 md:py-10 lg:py-12 ${className}`}
    >
      <div
        className="
          rounded-2xl
          border border-[var(--border-subtle)]
          bg-[var(--bg-surface)]
          p-5 md:p-6
        "
      >
        <div className="flex items-start gap-3">
          <span
            className="
              inline-flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-[var(--border-subtle)]
              bg-[var(--bg-subtle)]
              text-[var(--accent)]
            "
            aria-hidden="true"
          >
            <Icon size={18} />
          </span>

          <div className="min-w-0">
            <h2 className="text-sm md:text-base font-semibold text-[var(--text-main)]">
              {t(titleKey)}
            </h2>

            <p className="mt-1.5 text-xs md:text-sm text-[var(--text-muted)] max-w-2xl">
              {t(descKey)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {onRetry ? (
            <MainBtn
              type="button"
              variant="solid"
              theme="secondary"
              text={t("Vision.empty.retry", "Try again")}
              showArrow={false}
              onClick={onRetry}
              disabled={isRetrying}
              hasIcon={true}
              icon={
                <span
                  className={isRetrying ? "animate-spin" : ""}
                  aria-hidden="true"
                >
                  <RefreshCw size={16} />
                </span>
              }
            />
          ) : null}

          <BookConsultationButton />
        </div>
      </div>
    </section>
  );
};

export default React.memo(VisionEmptyState);
