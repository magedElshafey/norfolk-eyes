import { useTranslation } from "react-i18next";

const CopyRight = () => {
  const { t } = useTranslation();

  return (
    <div className="py-3 containerr border-t" role="contentinfo">
      <div className="flex-between flex-wrap gap-3">
        <p className="text-sm text-gray-600">
          {t("copyright")} © {new Date().getFullYear()} {t("abazeer")}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <p>{t("by qutell")}</p>
          <a
            href="https:wa.me/+201022153359"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline text-transition"
          >
            {t("qutell")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CopyRight;
