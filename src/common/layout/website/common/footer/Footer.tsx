import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";

import { Setting } from "@/features/settings/types/settings.type";
import { openCookieSettings } from "@/features/cookies/CookieConsentProvider";

// ✅ Your button
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
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

const BulletLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="
      inline-flex items-center gap-2
      text-[color:var(--footer-link)]
      hover:text-[color:var(--footer-link-hover)]
      transition
      hover:underline underline-offset-4
    "
  >
    <span className="h-1.5 w-1.5 rounded-full bg-[var(--footer-accent)] opacity-70" />
    {children}
  </Link>
);

const CardLink = ({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  desc?: React.ReactNode;
}) => (
  <Link
    to={to}
    className="
      block rounded-2xl p-4
      border border-[var(--footer-border,rgba(255,255,255,.14))]
      bg-[rgba(255,255,255,.03)]
      hover:bg-[rgba(255,255,255,.06)]
      transition
    "
  >
    <div className="flex items-start gap-3">
      <span className="mt-0.5">{icon}</span>
      <div className="text-sm">
        <p className="font-semibold">{title}</p>
        {desc ? (
          <p className="text-[var(--footer-muted)] text-xs mt-1 leading-relaxed">
            {desc}
          </p>
        ) : null}
      </div>
    </div>
  </Link>
);

export default function Footer(props: FooterProps) {
  const { t } = useTranslation();
  const POLICY_LINKS: { label: string; href: string }[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
    { label: "terms of use", href: "/terms" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  ];

  const socials = [
    {
      key: "facebook",
      href: props.social_facebook,
      icon: <FaFacebookF size={16} aria-hidden="true" />,
      label: "facebook",
    },
    {
      key: "instagram",
      href: props.social_instagram,
      icon: <FaInstagram size={16} aria-hidden="true" />,
      label: "instagram",
    },
    {
      key: "youtube",
      href: props.social_youtube,
      icon: <FaYoutube size={16} aria-hidden="true" />,
      label: "youtube",
    },
    {
      key: "twitter",
      href: props.social_twitter,
      icon: <FaXTwitter size={16} aria-hidden="true" />,
      label: "twitter",
    },
    {
      key: "linkedin",
      href: props.social_linkedin,
      icon: <FaLinkedin size={16} aria-hidden="true" />,
      label: "linkedin",
    },
  ].filter((x) => Boolean(x.href));

  return (
    <footer className="mt-10">
      <div
        className="
          bg-[var(--footer-bg)]
          text-[var(--footer-text)]
          transition-colors duration-300
          border-t border-[var(--footer-border,rgba(255,255,255,.08))]
        "
      >
        {/* =======================
            TOP CTA BAR (Non-traditional)
           ======================= */}
        <div className="containerr pt-10">
          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-[var(--footer-border,rgba(255,255,255,.10))]
              bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]
              p-6 md:p-8
            "
          >
            {/* soft blobs */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -top-20 -right-20
                w-72 h-72 rounded-full blur-3xl
                bg-[color:var(--footer-accent,rgba(56,189,248,.35))]
                opacity-40
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -bottom-24 -left-24
                w-80 h-80 rounded-full blur-3xl
                bg-[color:var(--footer-accent-2,rgba(34,197,94,.28))]
                opacity-35
              "
            />
            {/* subtle grid overlay */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 opacity-[0.08]
                [background-image:linear-gradient(to_right,rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.6)_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--footer-muted)]">
                  {t("Footer.quick")}
                </p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-[color:var(--footer-heading)]">
                  {t("Need help choosing the right option?")}
                </h3>
                <p className="mt-2 text-sm md:text-base text-[var(--footer-muted)] leading-relaxed">
                  {t(
                    "Reach out and we’ll guide you with the safest and clearest recommendations."
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary: WhatsApp (if phone) */}
                {props?.contact_phone ? (
                  <a
                    href={`https://wa.me/${props.contact_phone}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-2xl px-4 py-3
                      bg-[var(--footer-accent)]
                      text-white
                      hover:opacity-95 transition
                      shadow-sm
                    "
                  >
                    <Phone size={18} aria-hidden="true" />
                    <span className="font-semibold">{t("WhatsApp")}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ) : null}

                {/* Secondary */}
                <Link
                  to="/contact-us"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl px-4 py-3
                    border border-[var(--footer-border,rgba(255,255,255,.14))]
                    bg-[rgba(255,255,255,.03)]
                    hover:bg-[rgba(255,255,255,.06)]
                    transition
                  "
                >
                  <span className="font-semibold">
                    {t("Navbar.contact us")}
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =======================
            MAIN FOOTER CONTENT
           ======================= */}
        <div className="containerr py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Brand (Desktop: left big) */}
            <div className="lg:col-span-5 order-1">
              {/* Contact (Cards) */}
              <div className="mb-7">
                <h2 className="text-[color:var(--footer-heading)] font-bold tracking-wide uppercase text-xs">
                  {t("Footer.contact")}
                </h2>
                <div className="mt-4 grid gap-3">
                  {props.contact_phone ? (
                    <a
                      href={`https://wa.me/${props.contact_phone}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="
                      block rounded-2xl p-4
                      border border-[var(--footer-border,rgba(255,255,255,.14))]
                      bg-[rgba(255,255,255,.03)]
                      hover:bg-[rgba(255,255,255,.06)]
                      transition
                    "
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          <Phone size={18} aria-hidden="true" />
                        </span>
                        <div className="text-sm">
                          <p className="text-[var(--footer-muted)]">
                            {t("Footer.hotline")}
                          </p>
                          <p
                            dir="ltr"
                            className="font-semibold text-[color:var(--footer-accent)]"
                          >
                            {props.contact_phone}
                          </p>
                        </div>
                      </div>
                    </a>
                  ) : null}

                  {props.contact_email ? (
                    <a
                      href={`mailto:${props.contact_email}`}
                      className="
                      block rounded-2xl p-4
                      border border-[var(--footer-border,rgba(255,255,255,.14))]
                      bg-[rgba(255,255,255,.03)]
                      hover:bg-[rgba(255,255,255,.06)]
                      transition
                    "
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          <Mail size={18} aria-hidden="true" />
                        </span>
                        <div className="text-sm">
                          <p className="text-[var(--footer-muted)]">
                            {t("Footer.email")}
                          </p>
                          <p className="font-semibold break-all">
                            {props.contact_email}
                          </p>
                        </div>
                      </div>
                    </a>
                  ) : null}

                  {props.contact_address ? (
                    <div
                      className="
                      rounded-2xl p-4
                      border border-[var(--footer-border,rgba(255,255,255,.14))]
                      bg-[rgba(255,255,255,.03)]
                    "
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          <MapPin size={18} aria-hidden="true" />
                        </span>
                        <div className="text-sm">
                          <p className="text-[var(--footer-muted)]">
                            {t("Footer.address")}
                          </p>
                          <p className="font-semibold">
                            {props.contact_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {props.business_hours ? (
                    <div
                      className="
                      rounded-2xl p-4
                      border border-[var(--footer-border,rgba(255,255,255,.14))]
                      bg-[rgba(255,255,255,.03)]
                    "
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          <Clock size={18} aria-hidden="true" />
                        </span>
                        <div className="text-sm">
                          <p className="text-[var(--footer-muted)]">
                            {t("Footer.hours")}
                          </p>
                          <p className="font-semibold">
                            {props.business_hours}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Social pills */}
              {socials.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href as string}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="
                        group inline-flex items-center gap-2
                        rounded-full px-3 py-2
                        border border-[var(--footer-border,rgba(255,255,255,.14))]
                        bg-[rgba(255,255,255,.03)]
                        hover:bg-[rgba(255,255,255,.06)]
                        transition
                      "
                    >
                      <span
                        className="
                          w-8 h-8 rounded-full
                          grid place-items-center
                          bg-[var(--footer-icon-bg)]
                          text-[var(--footer-icon-text)]
                          group-hover:bg-[var(--footer-icon-hover-bg)]
                          group-hover:text-[var(--footer-icon-hover-text)]
                          transition-colors
                        "
                      >
                        {s.icon}
                      </span>
                      <span className="text-sm">{t(s.label)}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Actions (Mobile: show early / Desktop: right) */}
            <div className="lg:col-span-3 order-2 lg:order-4">
              <h2 className="text-[color:var(--footer-heading)] font-bold tracking-wide uppercase text-xs">
                {t("important links")}
              </h2>

              <div className="mt-4 space-y-3">
                {/* Primary action – Book */}
                <div
                  className="
                    rounded-2xl p-4
                    border border-[var(--footer-border,rgba(255,255,255,.14))]
                    bg-[linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.03))]
                    relative overflow-hidden
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute -top-16 -right-16
                      w-56 h-56 rounded-full blur-3xl
                      bg-[color:var(--footer-accent,rgba(56,189,248,.35))]
                      opacity-35
                    "
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="
                          w-9 h-9 rounded-xl grid place-items-center
                          bg-[rgba(255,255,255,.08)]
                          border border-[var(--footer-border,rgba(255,255,255,.14))]
                        "
                      >
                        <CalendarCheck size={18} aria-hidden />
                      </span>
                      <div className="text-sm">
                        <p className="font-semibold text-[color:var(--footer-heading)]">
                          {t("Global.Book a consultation")}
                        </p>
                        <p className="text-[var(--footer-muted)] text-xs mt-0.5">
                          {t("Fast booking, real support")}
                        </p>
                      </div>
                    </div>

                    {/* Your existing button */}
                    <BookConsultationButton
                      className="block w-full"
                      notPill={true}
                    />
                  </div>
                </div>

                {/* Submit review */}
                <CardLink
                  to="/submit-review"
                  icon={
                    <span
                      className="
                        w-9 h-9 rounded-xl grid place-items-center
                        bg-[rgba(255,255,255,.06)]
                        border border-[var(--footer-border,rgba(255,255,255,.14))]
                      "
                    >
                      <Star size={18} aria-hidden />
                    </span>
                  }
                  title={t("Navbar.Submit review")}
                  desc={t("Share your experience and help others")}
                />

                {/* Pre-visit form */}
                <CardLink
                  to="/pre-visit"
                  icon={
                    <span
                      className="
                        w-9 h-9 rounded-xl grid place-items-center
                        bg-[rgba(255,255,255,.06)]
                        border border-[var(--footer-border,rgba(255,255,255,.14))]
                      "
                    >
                      <ClipboardList size={18} aria-hidden />
                    </span>
                  }
                  title={t("Navbar.Pre visit form")}
                  desc={t("Save time before your appointment")}
                />
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-2 order-3 lg:order-2">
              <h2 className="text-[color:var(--footer-heading)] font-bold tracking-wide uppercase text-xs">
                {t("Footer.quick")}
              </h2>

              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <BulletLink to="/">{t("Navbar.Home")}</BulletLink>
                </li>
                <li>
                  <BulletLink to="/about-us">{t("Navbar.About")}</BulletLink>
                </li>
                <li>
                  <BulletLink to="/vision-simulator">
                    {t("Navbar.vision simulator")}
                  </BulletLink>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="lg:col-span-2 order-4 lg:order-3">
              <h2 className="text-[color:var(--footer-heading)] font-bold tracking-wide uppercase text-xs">
                {t("policies")}
              </h2>

              <ul className="mt-4 space-y-3 text-sm">
                {POLICY_LINKS.map((item) => (
                  <li key={item.href}>
                    <BulletLink to={item.href}>{t(item.label)}</BulletLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =======================
              BOTTOM BAR
             ======================= */}
          <div
            className="
              mt-10 pt-6
              border-t border-[var(--footer-border,rgba(255,255,255,.10))]
              flex flex-col md:flex-row gap-4
              items-center justify-between
            "
          >
            <div className="text-xs md:text-sm text-[var(--footer-muted)] text-center md:text-left">
              <a
                className=" mx-1 underline font-semibold"
                href="http://medwisely.com/"
                target="_blank"
              >
                MedWisely
              </a>
              {t("© All rights reserved")}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={openCookieSettings}
                className="
                  rounded-full px-4 py-2 text-xs md:text-sm
                  border border-[var(--footer-border,rgba(255,255,255,.14))]
                  bg-[rgba(255,255,255,.03)]
                  hover:bg-[rgba(255,255,255,.06)]
                  transition
                "
              >
                {t("Cookie settings")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
