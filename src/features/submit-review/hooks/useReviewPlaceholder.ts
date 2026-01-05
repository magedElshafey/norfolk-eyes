import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useReviewPlaceholder = (rating: number) => {
    const { t } = useTranslation();

    return useMemo(() => {
        if (!rating) return t("review.placeholder.default");

        if (rating <= 2)
            return t("review.placeholder.negative");

        if (rating === 3)
            return t("review.placeholder.neutral");

        return t("review.placeholder.positive");
    }, [rating, t]);
};
