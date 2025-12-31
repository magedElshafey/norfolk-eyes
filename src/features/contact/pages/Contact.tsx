import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import useContactusLogic from "../logic/useContactusLogic";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/common/components/sections/SectionTitle";
import useGetContactDetails from "@/features/home/api/useGetContactDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SectionDescription from "@/common/components/sections/SectionDescription";
import useGetContactIntro from "../api/useGetContactIntro";
const Contact = () => {
  const { t, i18n } = useTranslation();
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useContactusLogic();
  const queryResult = useGetContactDetails();
  const query = useGetContactIntro();
  const isRTL = i18n.dir() === "rtl";
  return (
    <main
      aria-label={t("Contact.pageAria", "Contact us page")}
      className="bg-[var(--bg-page)] "
    >
      <div className="containerr py-8 md:py-10 lg:py-12">
        {/* Map section */}
        <FetchHandler queryResult={query} skeletonType="hero">
          {query?.data?.is_active ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <section
                aria-labelledby="contact-form-heading"
                className="rounded-2xl bg-[var(--card-bg)] border border-softGray/60 p-4 md:p-6 lg:p-7 shadow-sm space-y-3"
              >
                <SectionTitle
                  as="h2"
                  id="contact-form-heading"
                  text={query?.data?.section?.heading}
                />
                <SectionDescription
                  description={query?.data?.section?.description}
                />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-4 !capitalize"
                  noValidate
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <MainInput
                        placeholder="subject"
                        label="subject"
                        enableAutocomplete
                        storageKey="contact_subject"
                        {...register("subject")}
                        error={errors.subject?.message}
                      />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <MainInput
                        required
                        placeholder="full name"
                        label="full name"
                        enableAutocomplete
                        storageKey="contact_name"
                        {...register("name")}
                        error={errors.name?.message}
                      />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <MainInput
                        required
                        type="email"
                        placeholder="email"
                        label="email"
                        enableAutocomplete
                        storageKey="contact_email"
                        {...register("email")}
                        error={errors.email?.message}
                      />
                    </div>

                    <div className="col-span-2">
                      <MainInput
                        placeholder="phone"
                        label="phone"
                        enableAutocomplete
                        storageKey="contact_phone"
                        {...register("phone")}
                        error={errors.phone?.message}
                      />
                    </div>

                    <div className="col-span-2">
                      <MainTextArea
                        placeholder="message"
                        label="message"
                        rows={5}
                        {...register("message")}
                        error={errors.message?.message}
                      />
                    </div>
                  </div>

                  <div className="w-full flex justify-center pt-2">
                    <div className="w-full md:w-[180px]">
                      <MainBtn
                        type="submit"
                        className="w-full flex justify-center"
                        text="send"
                        isPending={isPending}
                      />
                    </div>
                  </div>
                </form>
              </section>
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
                  {/* subtle background glow */}
                  <div
                    aria-hidden
                    className="
          absolute inset-0 -z-10
          rounded-[32px]
          bg-[var(--accent-soft-bg)]
          blur-3xl opacity-60
          transition-opacity duration-500
          group-hover:opacity-80
        "
                  />

                  <img
                    src={query?.data?.section?.image || ""}
                    alt={query?.data?.section?.intro}
                    loading="lazy"
                    decoding="async"
                    className="
          w-full h-full object-contain
          transition-transform duration-500 ease-out
        "
                  />
                </div>
              </div>
            </div>
          ) : null}
        </FetchHandler>

        <FetchHandler queryResult={queryResult} skeletonType="contact-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 my-8">
            <div className="w-full h-[260px] md:h-[320px] lg:h-[460px] bg-[color:var(--bg-surface)]">
              {/* 🔁 استبدل الـ src برابط Google Maps الحقيقي بتاع العيادة */}
              <iframe
                title={t(
                  "HomeContact.mapIframeTitle",
                  "Clinic location on Google Maps"
                )}
                src={queryResult?.data?.map_info?.google_map_url}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            {/* Contact info */}
            <section
              aria-labelledby="contact-info-heading"
              className={`
              rounded-2xl bg-[var(--card-bg)] border border-softGray/60 p-4 md:p-6 lg:p-7 shadow-sm
              ${
                isRTL
                  ? "md:border-r-4 md:border-l-0"
                  : "md:border-l-4 md:border-r-0"
              }
              border-[var(--field-focus-border)]
            `}
            >
              <SectionTitle
                as="h3"
                id="contact-info-heading"
                text={queryResult?.data?.section?.heading || ""}
              />

              <div className="mt-4 space-y-4 text-sm md:text-base text-[var(--text-soft)]">
                {queryResult?.data?.contact_info?.clinic_address && (
                  <div>
                    <p className="font-semibold">{t("Clinic address")}</p>
                    <p className="mt-0.5">
                      {queryResult?.data?.contact_info?.clinic_address}
                    </p>
                  </div>
                )}

                {queryResult?.data?.contact_info?.clinic_email && (
                  <div>
                    <p className="font-semibold">{t("email")}</p>
                    <a
                      href={`mailto:${queryResult?.data?.contact_info?.clinic_email}`}
                      className="mt-0.5 inline-block lowercase hover:underline"
                    >
                      {queryResult?.data?.contact_info?.clinic_email}
                    </a>
                  </div>
                )}

                {queryResult?.data?.contact_info?.clinic_phone && (
                  <div>
                    <p className="font-semibold">{t("phone")}</p>
                    <a
                      dir="ltr"
                      href={`https://wa.me/${queryResult?.data?.contact_info?.clinic_phone}`}
                      className="mt-0.5 inline-block hover:underline"
                    >
                      {queryResult?.data?.contact_info?.clinic_phone}
                    </a>
                  </div>
                )}
                {queryResult?.data?.contact_info?.opening_hours && (
                  <div>
                    <p className="font-semibold">{t("Opening hours")}</p>
                    <p className="mt-0.5 inline-block hover:underline">
                      {queryResult?.data?.contact_info?.opening_hours}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </FetchHandler>
      </div>
    </main>
  );
};

export default Contact;
