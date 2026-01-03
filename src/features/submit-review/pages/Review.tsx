import { memo, useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";

import MainInput from "@/common/components/inputs/MainInput";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainDate from "@/common/components/inputs/MainDateInput";

import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

import StarRating from "../components/StarRating";
import useReviewLogic from "../logic/useReviewLogic";
import useGetReviewIntro from "../api/useGetReviewIntro";

function isTranslationKey(s?: string) {
  return Boolean(s && s.includes("."));
}

const FieldError = memo(function FieldError({ message }: { message?: string }) {
  const { t } = useTranslation();
  if (!message) return null;

  return (
    <m.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-[12px] text-[var(--field-error-text)]"
      role="alert"
    >
      {isTranslationKey(message) ? t(message) : message}
    </m.p>
  );
});

const Review = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();

  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    rating,
    showFields,
    onSelectRating,
    onReset,
  } = useReviewLogic();

  const introQuery = useGetReviewIntro();
  const hasIntro = Boolean(introQuery?.data?.is_active);

  const ui = useMemo(() => {
    const heading = introQuery?.data?.section?.heading || t("Write a review");
    const description =
      introQuery?.data?.section?.description ||
      t("Share your experience with us.");
    const image = introQuery?.data?.section?.image || "";
    const imageAlt = introQuery?.data?.section?.intro || heading;

    return { heading, description, image, imageAlt };
  }, [introQuery?.data, t]);

  const cardAccentStyle = useMemo(() => {
    const accent = "4px solid var(--field-focus-border)";
    return isRTL ? { borderInlineEnd: accent } : { borderInlineStart: accent };
  }, [isRTL]);

  return (
    <LazyMotion features={domAnimation}>
      <main
        aria-label={t("Review.pageAria", "Write a review page")}
        className="bg-[var(--bg-page)]"
      >
        <div className="containerr py-8 md:py-10 lg:py-12">
          <FetchHandler queryResult={introQuery} skeletonType="hero">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Form Card */}
              <section
                aria-labelledby="review-form-heading"
                className="
                  lg:col-span-7
                  rounded-3xl
                  bg-[var(--card-bg)]
                  border border-softGray/60
                  shadow-sm
                  overflow-hidden
                "
                style={cardAccentStyle}
              >
                {/* Header */}
                <div className="p-5 md:p-6 lg:p-7 border-b border-[color:var(--field-border)]/60">
                  <SectionTitle
                    as="h2"
                    id="review-form-heading"
                    text={ui.heading}
                  />
                  <SectionDescription description={ui.description} />
                </div>

                {/* Body */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="p-5 md:p-6 lg:p-7 space-y-5 !capitalize"
                >
                  {/* Rating */}
                  <fieldset className="space-y-2">
                    <legend className="text-sm md:text-base font-medium text-[var(--text)]">
                      {t("rate")}
                      <span className="ms-1 text-[var(--field-error-text)]">
                        *
                      </span>
                    </legend>

                    <div className="flex items-center gap-3 flex-wrap">
                      <StarRating
                        value={rating}
                        onChange={onSelectRating}
                        disabled={isPending}
                        size="md"
                        ariaLabel={t("rate")}
                        dir={isRTL ? "rtl" : "ltr"} // ✅ direction-aware stagger
                      />

                      <span className="text-xs text-[var(--text-soft)]">
                        {rating
                          ? `${t("Selected")}: ${rating}/5`
                          : t("Choose a rating")}
                      </span>
                    </div>

                    <AnimatePresence>
                      {errors.rating?.message ? (
                        <FieldError message={errors.rating.message as any} />
                      ) : null}
                    </AnimatePresence>

                    <input
                      type="hidden"
                      {...register("rating", { valueAsNumber: true })}
                    />
                  </fieldset>

                  {/* Fields / Hint */}
                  <AnimatePresence mode="popLayout">
                    {showFields ? (
                      <m.div
                        key="fields"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={reduceMotion ? undefined : { opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={
                          reduceMotion
                            ? undefined
                            : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="md:col-span-1">
                          <MainInput
                            required
                            placeholder="full name"
                            label="full name"
                            enableAutocomplete
                            storageKey="review_full_name"
                            {...register("user_name")}
                            error={errors.user_name?.message}
                          />
                        </div>

                        <div className="md:col-span-1">
                          <MainInput
                            placeholder="job title"
                            label="job title"
                            enableAutocomplete
                            storageKey="review_job_title"
                            {...register("title")}
                            error={errors.title?.message}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <MainDate
                            label="visit date"
                            placeholder="visit date"
                            {...register("visit_date")}
                            error={errors.visit_date?.message}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <MainTextArea
                            placeholder="comment"
                            label="comment"
                            rows={6}
                            {...register("content")}
                            error={errors.content?.message}
                          />
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 pt-1 flex flex-col sm:flex-row gap-3">
                          <MainBtn
                            type="submit"
                            className="w-full flex justify-center"
                            text="send"
                            isPending={isPending}
                          />

                          {/* ✅ Reset */}
                          <button
                            type="button"
                            onClick={onReset}
                            disabled={isPending}
                            className="
                              w-full
                              inline-flex items-center justify-center
                              rounded-2xl
                              border border-[color:var(--field-border)]
                              bg-[var(--bg-surface)]
                              px-4 py-3
                              text-sm font-medium
                              text-[var(--text)]
                              transition
                              hover:opacity-90
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--field-focus-border)]
                              focus-visible:ring-offset-2
                              disabled:opacity-60 disabled:cursor-not-allowed
                            "
                          >
                            {t("Reset")}
                          </button>
                        </div>
                      </m.div>
                    ) : (
                      <m.div
                        key="hint"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={reduceMotion ? undefined : { opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={
                          reduceMotion
                            ? undefined
                            : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
                        }
                        className="
                          rounded-2xl
                          bg-[var(--bg-surface)]
                          border border-[color:var(--field-border)]
                          p-4
                        "
                      >
                        <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                          {t("Select a rating first to continue")}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </form>
              </section>

              {/* Side Visual */}
              {hasIntro ? (
                <aside className="lg:col-span-5">
                  <div className="relative h-full">
                    <div
                      className="
                        relative
                        rounded-3xl
                        border border-softGray/60
                        bg-[var(--card-bg)]
                        shadow-sm
                        overflow-hidden
                        h-full
                        min-h-[260px]
                        flex items-center justify-center
                      "
                    >
                      <div
                        aria-hidden
                        className="
                          absolute inset-0
                          bg-[var(--accent-soft-bg)]
                          opacity-50
                          blur-3xl
                        "
                      />

                      {ui.image ? (
                        <m.img
                          src={ui.image}
                          alt={ui.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="relative w-full h-full object-contain p-6"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={reduceMotion ? undefined : { opacity: 1 }}
                          transition={
                            reduceMotion
                              ? undefined
                              : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                          }
                        />
                      ) : (
                        <div className="relative p-8 text-center">
                          <p className="text-sm text-[var(--text-soft)]">
                            {t("Share your experience with us.")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              ) : null}
            </div>
          </FetchHandler>
        </div>
      </main>
    </LazyMotion>
  );
};

export default memo(Review);
