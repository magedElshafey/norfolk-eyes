import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

const VisionSimulatorDisclaimer: React.FC<Props> = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("VisionSimulatorDisclaimer.title")}
      className={`
        rounded-2xl border border-[color:var(--border-subtle)]
        bg-[color:var(--bg-card)]
        p-4 md:p-5
        ${className}
      `}
    >
      <h3 className="text-sm md:text-base font-semibold text-[color:var(--primary-green)]">
        {t("VisionSimulatorDisclaimer.title")}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
        {t("VisionSimulatorDisclaimer.summary")}
      </p>

      <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--text-muted)]">
        <li className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
            •
          </span>
          <span>{t("VisionSimulatorDisclaimer.point1")}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
            •
          </span>
          <span>{t("VisionSimulatorDisclaimer.point2")}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
            •
          </span>
          <span>{t("VisionSimulatorDisclaimer.point3")}</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
            •
          </span>
          <span>{t("VisionSimulatorDisclaimer.point4")}</span>
        </li>
      </ul>

      <p className="mt-4 text-xs leading-5 text-[color:var(--text-muted)]">
        {t("VisionSimulatorDisclaimer.note")}
      </p>
    </section>
  );
};

export default VisionSimulatorDisclaimer;
