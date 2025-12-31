import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "@/common/components/logo/Logo";
import { Setting } from "@/features/settings/types/settings.type";
// import useGetFeaturedProcedures from "@/features/producers/api/useGetFeaturedProcedures";
// import useGetSimpleBlogs from "@/features/blogs/api/useGetSimpleBlogs";
import { openCookieSettings } from "@/features/cookies/CookieConsentProvider";
type FooterProps = Pick<
  Setting,
  | "app_logo"
  | "contact_address"
  | "contact_email"
  | "contact_phone"
  | "app_description"
  | "social_facebook"
  | "social_instagram"
  | "social_linkedin"
  | "social_twitter"
  | "social_youtube"
  | "copyright_text"
  | "business_hours"
>;

export default function Footer(props: FooterProps) {
  const { t } = useTranslation();
  // const { data: procedures, isLoading } = useGetFeaturedProcedures();
  // const { data: blogs, isLoading: loadingBlogs } = useGetSimpleBlogs();
  const POLICY_LINKS: { label: string; href: string }[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
    { label: "terms of use", href: "/terms" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  ];
  return (
    <footer>
      <div
        className="
        mt-10
        py-8
        bg-[var(--footer-bg)]
        text-[var(--footer-text)]
        transition-colors duration-300
      "
      >
        <div
          className="
          containerr
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-6
          text-sm
          leading-[calc(1.6*var(--a11y-line-height-scale))]
        "
        >
          {/* Logo + About */}
          <div>
            <Logo logo={props.app_logo || ""} />

            <p className="text-[var(--footer-muted)]">
              {props.app_description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              {props?.social_facebook && (
                <a
                  href={props.social_facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  bg-[var(--footer-icon-bg)]
                  text-[var(--footer-icon-text)]
                  hover:bg-[var(--footer-icon-hover-bg)]
                  hover:text-[var(--footer-icon-hover-text)]
                  transition-colors
                "
                  aria-label="facebook"
                >
                  <FaFacebookF size={16} aria-hidden="true" />
                </a>
              )}
              {props?.social_instagram && (
                <a
                  href={props.social_instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  bg-[var(--footer-icon-bg)]
                  text-[var(--footer-icon-text)]
                  hover:bg-[var(--footer-icon-hover-bg)]
                  hover:text-[var(--footer-icon-hover-text)]
                  transition-colors
                "
                  aria-label="instagram"
                >
                  <FaInstagram size={16} aria-hidden="true" />
                </a>
              )}
              {props?.social_youtube && (
                <a
                  href={props.social_youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  bg-[var(--footer-icon-bg)]
                  text-[var(--footer-icon-text)]
                  hover:bg-[var(--footer-icon-hover-bg)]
                  hover:text-[var(--footer-icon-hover-text)]
                  transition-colors
                "
                  aria-label="youtube"
                >
                  <FaYoutube size={16} aria-hidden="true" />
                </a>
              )}
              {props?.social_twitter && (
                <a
                  href={props.social_twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  bg-[var(--footer-icon-bg)]
                  text-[var(--footer-icon-text)]
                  hover:bg-[var(--footer-icon-hover-bg)]
                  hover:text-[var(--footer-icon-hover-text)]
                  transition-colors
                "
                  aria-label="twitter"
                >
                  <FaXTwitter size={16} aria-hidden="true" />
                </a>
              )}
              {props?.social_linkedin && (
                <a
                  href={props.social_linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  bg-[var(--footer-icon-bg)]
                  text-[var(--footer-icon-text)]
                  hover:bg-[var(--footer-icon-hover-bg)]
                  hover:text-[var(--footer-icon-hover-text)]
                  transition-colors
                "
                  aria-label="linkedin"
                >
                  <FaLinkedin size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-[color:var(--footer-heading)]  font-bold  mb-4 tracking-wide uppercase">
              {t("Footer.quick")}
            </h2>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                >
                  {t("Navbar.Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                >
                  {t("Navbar.About")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                >
                  {t("Navbar.contact us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/vision-simulator"
                  className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                >
                  {t("Navbar.vision simulator")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[color:var(--footer-heading)]  font-bold  mb-4 tracking-wide uppercase">
              {t("policies")}
            </h2>

            <ul className="space-y-2 text-sm">
              {POLICY_LINKS.map((item) => (
                <li key={item?.href}>
                  <Link
                    to={item?.href}
                    className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                  >
                    {t(item?.label)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="
                  hover:text-[color:var(--footer-link-hover)]
                  text-[color:var(--footer-link)] duration-200 transition hover:underline
                "
                >
                  {t("Cookie settings")}
                </button>
              </li>
            </ul>
          </div>
          {/* Procedures */}
          {/* {!isLoading && procedures && procedures?.length > 1 && (
            <div>
              <h2 className="text-[color:var(--footer-heading)] font-bold mb-4 tracking-wide uppercase">
                {t("Navbar.Procedures")}
              </h2>

              <ul className="space-y-2 text-sm">
                {procedures.map((item) => (
                  <li key={item?.id}>
                    <Link
                      to={`/procedures/${item?.slug}`}
                      className="
                    hover:text-[color:var(--footer-link-hover)]
                    text-[color:var(--footer-link)]
                  "
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          {/* {!loadingBlogs && blogs && blogs?.length > 1 && (
            <div>
              <h2 className="text-[color:var(--footer-heading)] font-bold mb-4 tracking-wide uppercase">
                {t("Navbar.patient education")}
              </h2>

              <ul className="space-y-2 text-xs">
                {blogs.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/patient-education/${item?.slug}`}
                      className="
                    hover:text-[color:var(--footer-link-hover)]
                    text-[color:var(--footer-link)]
                  "
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          {/* Contact */}
          <div>
            <h2 className="text-[color:var(--footer-heading)]  font-bold mb-4 tracking-wide uppercase">
              {t("Footer.contact")}
            </h2>

            <ul className="space-y-2 text-sm">
              {props?.contact_phone && (
                <li>
                  {t("Footer.hotline")}:{" "}
                  <a
                    dir="ltr"
                    className="text-[color:var(--footer-accent)] duration-300 hover:underline"
                    href={`https://wa.me/${props?.contact_phone}`}
                  >
                    {props?.contact_phone}
                  </a>
                </li>
              )}
              {props?.contact_address && (
                <li>
                  {t("Footer.address")}: {props?.contact_address}
                </li>
              )}
              {props?.contact_email && (
                <li>
                  {t("Footer.email")}:{" "}
                  <a
                    className="duration-300 hover:underline"
                    href={`mailto:${props?.contact_email}`}
                  >
                    {props?.contact_email}
                  </a>
                </li>
              )}
              {props?.business_hours && (
                <li>
                  {t("Footer.hours")}: {props?.business_hours}
                </li>
              )}
            </ul>
          </div>
        </div>
        {props?.copyright_text && (
          <div className="w-full flex items-center justify-center py-3">
            {props?.copyright_text}
          </div>
        )}
      </div>
    </footer>
  );
}
