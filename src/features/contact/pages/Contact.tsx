import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import useContactusLogic from "../logic/useContactusLogic";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/common/components/sections/SectionTitle";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SectionDescription from "@/common/components/sections/SectionDescription";
import useGetContactIntro from "../api/useGetContactIntro";
const Contact = () => {
  const { t } = useTranslation();
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useContactusLogic();
  const query = useGetContactIntro();
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
      </div>
    </main>
  );
};

export default Contact;
