import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import MainInput from "@/common/components/inputs/MainInput";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import MainBtn from "@/common/components/buttons/MainBtn";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import MainDate from "@/common/components/inputs/MainDateInput";
import StarRating from "../components/StarRating";
import useReviewLogic from "../logic/useReviewLogic";
import useGetReviewIntro from "../api/useGetReviewIntro";

const Review = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    rating,
    showFields,
    onSelectRating,
  } = useReviewLogic();

  // Optional intro like contact
  const introQuery = useGetReviewIntro();

  return (
    <main
      aria-label={t("Review.pageAria", "Write a review page")}
      className="bg-[var(--bg-page)]"
    >
      <div className="containerr py-8 md:py-10 lg:py-12">
        <div className=" space-y-5">
          <FetchHandler queryResult={introQuery} skeletonType="hero">
            {introQuery?.data?.is_active ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section
                  aria-labelledby="review-form-heading"
                  className="
                  rounded-2xl bg-[var(--card-bg)]
                  border border-softGray/60
                  p-4 md:p-6 lg:p-7
                  shadow-sm space-y-3
                "
                >
                  <SectionTitle
                    as="h2"
                    id="review-form-heading"
                    text={
                      introQuery?.data?.section?.heading || t("Write a review")
                    }
                  />
                  <SectionDescription
                    description={
                      introQuery?.data?.section?.description ||
                      t("Share your experience with us.")
                    }
                  />

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-4 !capitalize"
                    noValidate
                  >
                    {/* ⭐ Rating first */}
                    <div className="space-y-2">
                      <label className="text-sm md:text-base block font-medium text-gray-700">
                        {t("rate")}
                        <span
                          className="ml-1"
                          style={{ color: "var(--field-error-text)" }}
                        >
                          *
                        </span>
                      </label>

                      <StarRating
                        value={rating}
                        onChange={onSelectRating}
                        disabled={isPending}
                        size="md"
                      />

                      {/* Error */}
                      <AnimatePresence>
                        {errors.rating?.message ? (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-red-500 text-xs"
                            role="alert"
                          >
                            {t(errors.rating.message)}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>

                      {/* Hidden input for RHF */}
                      <input
                        type="hidden"
                        {...register("rating", { valueAsNumber: true })}
                      />
                    </div>

                    {/* باقي الحقول تظهر بعد اختيار الـ rating */}
                    <AnimatePresence mode="popLayout">
                      {showFields ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                        >
                          <div className="col-span-2 lg:col-span-1">
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

                          <div className="col-span-2 lg:col-span-1">
                            <MainInput
                              placeholder="job title"
                              label="job title"
                              enableAutocomplete
                              storageKey="review_job_title"
                              {...register("title")}
                              error={errors.title?.message}
                            />
                          </div>

                          <div className="col-span-2">
                            <MainDate
                              label="visit date"
                              placeholder="visit date"
                              {...register("visit_date")}
                              error={errors.visit_date?.message}
                            />
                          </div>

                          <div className="col-span-2">
                            <MainTextArea
                              placeholder="comment"
                              label="comment"
                              rows={5}
                              {...register("content")}
                              error={errors.content?.message}
                            />
                          </div>

                          <div className="col-span-2 w-full flex justify-center pt-2">
                            <div className="w-full md:w-[180px]">
                              <MainBtn
                                type="submit"
                                className="w-full flex justify-center"
                                text="send"
                                isPending={isPending}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="
                          rounded-xl
                          bg-[var(--bg-surface)]
                          border border-[color:var(--field-border)]
                          p-4 text-sm text-[var(--text-soft)]
                        "
                        >
                          {t("Select a rating first to continue")}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </section>

                {/* Image side (same vibe as contact) */}
                <div className="relative w-full flex items-center justify-center">
                  <div
                    className="
                    relative w-full max-w-[720px]
                    aspect-[16/10] md:aspect-[16/9]
                    transition-all duration-500 ease-out
                    hover:-translate-y-1
                    hover:scale-[1.015]
                  "
                  >
                    <div
                      aria-hidden
                      className="
                      absolute inset-0 -z-10
                      rounded-[32px]
                      bg-[var(--accent-soft-bg)]
                      blur-3xl opacity-60
                      transition-opacity duration-500
                    "
                    />

                    <img
                      src={introQuery?.data?.section?.image || ""}
                      alt={introQuery?.data?.section?.intro || ""}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // لو intro مش active: اعرض الفورم لوحده
              <section
                className="
                rounded-2xl bg-[var(--card-bg)]
                border border-softGray/60
                p-4 md:p-6 lg:p-7
                shadow-sm space-y-3
              "
                style={{
                  borderInlineStart: isRTL
                    ? undefined
                    : "4px solid var(--field-focus-border)",
                  borderInlineEnd: isRTL
                    ? "4px solid var(--field-focus-border)"
                    : undefined,
                }}
              >
                <SectionTitle as="h2" text={t("Write a review")} />
                <SectionDescription
                  description={t("Share your experience with us.")}
                />
                {/* نفس الفورم فوق */}
              </section>
            )}
          </FetchHandler>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4 !capitalize"
            noValidate
          >
            <div className="space-y-3">
              <label className="text-sm md:text-base block font-medium text-gray-700">
                {t("rate")}
                <span
                  className="ml-1"
                  style={{ color: "var(--field-error-text)" }}
                >
                  *
                </span>
              </label>

              <StarRating
                value={rating}
                onChange={onSelectRating}
                disabled={isPending}
              />
              {errors.rating?.message ? (
                <p className="text-red-500 text-xs" role="alert">
                  {t(errors.rating.message)}
                </p>
              ) : null}
              <input
                type="hidden"
                {...register("rating", { valueAsNumber: true })}
              />
            </div>

            <AnimatePresence>
              {showFields ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                >
                  <div className="col-span-2 lg:col-span-1">
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

                  <div className="col-span-2 lg:col-span-1">
                    <MainInput
                      placeholder="job title"
                      label="job title"
                      enableAutocomplete
                      storageKey="review_job_title"
                      {...register("title")}
                      error={errors.title?.message}
                    />
                  </div>

                  <div className="col-span-2">
                    <MainDate
                      label="visit date"
                      placeholder="visit date"
                      {...register("visit_date")}
                      error={errors.visit_date?.message}
                    />
                  </div>

                  <div className="col-span-2">
                    <MainTextArea
                      placeholder="comment"
                      label="comment"
                      rows={5}
                      {...register("content")}
                      error={errors.content?.message}
                    />
                  </div>

                  <div className="col-span-2 w-full flex justify-center pt-2">
                    <div className="w-full md:w-[180px]">
                      <MainBtn
                        type="submit"
                        className="w-full flex justify-center"
                        text="send"
                        isPending={isPending}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Review;
