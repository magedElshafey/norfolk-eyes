import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import useGetContactDetails from "../../api/useGetContactDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const HomeContact: FC = () => {
  const { t } = useTranslation();
  const queryResult = useGetContactDetails();

  return (
    <FetchHandler queryResult={queryResult} skeletonType="contact-section">
      {queryResult?.data?.is_active ? (
        <section
          aria-labelledby="home-contact-heading"
          className="
        bg-[color:var(--bg-surface)]
        border-t border-[color:var(--border-subtle)]
      "
        >
          <div className="containerr py-10 md:py-12 lg:py-14">
            <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] items-start">
              {/* Left: contact details */}
              <div className="space-y-4 md:space-y-5">
                <SectionIntro title={queryResult?.data?.section?.intro || ""} />
                <SectionTitle
                  as="h2"
                  id="home-contact-heading"
                  text={queryResult?.data?.section?.heading || ""}
                />
                <SectionDescription
                  description={queryResult?.data?.section?.description || ""}
                />

                <dl className="space-y-3 text-sm md:text-base text-[color:var(--section-body-color)]">
                  {/* Address */}
                  {queryResult?.data &&
                    queryResult?.data?.contact_info?.clinic_address && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-1">
                          {t("Clinic address")}
                        </dt>
                        <dd className="text-[color:var(--accent)]">
                          {queryResult?.data?.contact_info?.clinic_address}
                        </dd>
                      </div>
                    )}

                  {/* Phone */}
                  {queryResult?.data &&
                    queryResult?.data?.contact_info?.clinic_phone && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-1">
                          {t("Phone")}
                        </dt>
                        <dd>
                          <a
                            dir="ltr"
                            href={`https://wa.me/${queryResult?.data?.contact_info?.clinic_phone}`}
                            className="
                      text-[color:var(--accent)]
                      hover:underline
                    "
                            aria-label={t("Call the clinic on this number")}
                          >
                            {queryResult?.data?.contact_info?.clinic_phone}
                          </a>
                        </dd>
                      </div>
                    )}

                  {/* Email */}
                  {queryResult?.data &&
                    queryResult?.data?.contact_info?.clinic_email && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-1">
                          {t("Email")}
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${queryResult?.data?.contact_info?.clinic_email}`}
                            className="
                      text-[color:var(--accent)]
                      hover:underline
                    "
                          >
                            {queryResult?.data?.contact_info?.clinic_email}
                          </a>
                        </dd>
                      </div>
                    )}

                  {/* Hours */}
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-1">
                      {t("Opening hours")}
                    </dt>
                    <dd className="space-y-0.5 text-[color:var(--section-body-color)] text-sm">
                      <p className="text-[color:var(--accent)]">
                        {queryResult?.data?.contact_info?.opening_hours}
                      </p>
                      <p className="text-[11px] text-[color:var(--text-muted)]">
                        {t(
                          "Please call ahead for urgent appointments or surgery dates."
                        )}
                      </p>
                    </dd>
                  </div>
                </dl>

                {/* CTA row */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <BookConsultationButton />
                  {queryResult?.data?.section?.ending && (
                    <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] max-w-xs">
                      {queryResult?.data?.section?.ending}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: map */}
              <div
                className="
              rounded-2xl
              bg-[color:var(--bg-subtle)]
              border border-[color:var(--border-subtle)]
              shadow-sm
              overflow-hidden
            "
                aria-label={t(
                  "HomeContact.mapRegion",
                  "Map and directions to the clinic"
                )}
              >
                <div className="p-4 md:p-5 border-b border-[color:var(--border-subtle)]">
                  <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
                    {t("Find us on the map")}
                  </h3>
                  <p className="text-xs md:text-sm text-[color:var(--text-muted)]">
                    {t(
                      "Use the map below to plan your route by car or public transport."
                    )}
                  </p>
                </div>

                <div className="w-full h-[260px] md:h-[320px] lg:h-[460px] bg-[color:var(--bg-surface)]">
                  {/* 🔁 استبدل الـ src برابط Google Maps الحقيقي بتاع العيادة */}
                  <iframe
                    title={t("Clinic location on Google Maps")}
                    src={queryResult?.data?.map_info?.google_map_url}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </FetchHandler>
  );
};

export default memo(HomeContact);
