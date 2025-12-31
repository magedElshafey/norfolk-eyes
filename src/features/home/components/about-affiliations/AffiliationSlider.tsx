import React, {
  memo,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  useKeenSlider,
  KeenSliderInstance,
  KeenSliderOptions,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import type { Affiliation } from "../../types/aboutSection.types";

/* ---------------------------- Helpers ---------------------------- */

function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => setVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return visible;
}

function useInViewport<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return inView;
}

/* ---------------------------- Autoplay ---------------------------- */

function useKeenAutoplay(params: {
  slider: React.MutableRefObject<KeenSliderInstance | null>;
  enabled: boolean;
  interval?: number;
}) {
  const { slider, enabled, interval = 900 } = params;

  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const clear = () => {
    if (timerRef.current != null) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    const s = slider.current;
    if (!s) return;

    const start = () => {
      clear();
      if (!enabled || pausedRef.current) return;
      timerRef.current = window.setInterval(() => {
        slider.current?.next();
      }, interval);
    };

    const pause = () => {
      pausedRef.current = true;
      clear();
    };

    const resume = () => {
      pausedRef.current = false;
      start();
    };

    const el = s.container;

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    s.on("dragStarted", pause);
    s.on("animationEnded", start);
    s.on("updated", start);

    start();

    return () => {
      clear();
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, [slider, enabled, interval]);
}

/* ---------------------------- Motion config ---------------------------- */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ---------------------------- Component ---------------------------- */

type Props = {
  items: Affiliation[];
  heading?: string;
  description?: string;
};

const AffiliationSlider: React.FC<Props> = ({
  items,
  heading = "Professional affiliations & partnerships",
  description = "Recognised memberships and organisations we work with.",
}) => {
  const { t, i18n } = useTranslation();
  const sectionId = useId();
  const isRTL = i18n.dir() === "rtl";

  const shouldReduceMotion = useReducedMotion();
  const pageVisible = usePageVisibility();

  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewport = useInViewport(sectionRef as React.RefObject<HTMLElement>);

  const affiliations = useMemo(() => items ?? [], [items]);
  const total = affiliations.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const keenOptions = useMemo<KeenSliderOptions>(
    () => ({
      rtl: isRTL,
      loop: true,
      mode: "free-snap",
      rubberband: false,
      renderMode: "performance",
      slides: { perView: "auto", spacing: 8 },
      breakpoints: {
        "(max-width: 640px)": { slides: { perView: "auto", spacing: 6 } },
        "(min-width: 1280px)": { slides: { perView: "auto", spacing: 10 } },
      },
      created(s) {
        setLoaded(true);
        setCurrentSlide(s.track.details.rel);
        s.options.defaultAnimation = { duration: 420 } as any;
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    }),
    [isRTL]
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenOptions);

  const canRunAutoplay =
    loaded && pageVisible && inViewport && !shouldReduceMotion && total > 2;

  useKeenAutoplay({
    slider: instanceRef,
    enabled: canRunAutoplay,
    interval: 850,
  });

  if (!total) return null;

  const carouselLabel = t(
    "About.affiliationsCarousel",
    "Affiliations carousel"
  );

  /* ---------------------------- Motion (safe) ---------------------------- */

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const animate =
    shouldReduceMotion || inViewport ? { opacity: 1, y: 0 } : initial;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE_OUT };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        aria-labelledby={`${sectionId}-label`}
        aria-roledescription="carousel"
        className="py-10 md:py-12"
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {/* Header */}
        <div className="containerr flex flex-col gap-3 items-center text-center">
          <SectionTitle id={`${sectionId}-label`} as="h2" text={heading} />
          <SectionDescription description={description} />

          <p className="sr-only" aria-live="polite">
            {t("About.carouselStatus", "Slide {{x}} of {{y}}", {
              x: currentSlide + 1,
              y: total,
            })}
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-6 w-screen left-1/2 -translate-x-1/2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-[var(--page-bg,#F9FAFB)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-[var(--page-bg,#F9FAFB)] to-transparent z-10" />

          <div className="px-3 sm:px-6 md:px-10">
            <div
              ref={sliderRef}
              dir={isRTL ? "rtl" : "ltr"}
              role="group"
              aria-label={carouselLabel}
              aria-roledescription="carousel"
              className="keen-slider"
            >
              {affiliations.map((item, index) => (
                <div
                  key={item.id ?? `${index}-${item.organization_name}`}
                  className="keen-slider__slide !min-w-[140px] md:!min-w-[160px]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t("About.slideLabel", "Slide {{x}} of {{y}}", {
                    x: index + 1,
                    y: total,
                  })}
                >
                  <AffLogo item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

function AffLogo({ item }: { item: Affiliation }) {
  const Wrapper = item.website_url ? "a" : "div";
  const wrapperProps = item.website_url
    ? { href: item.website_url, target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="
        group w-full h-[54px] md:h-[60px]
  inline-flex items-center justify-center
  rounded-2xl
  bg-[var(--card-bg,#FFFFFF)]
  border border-[var(--card-border,#E5E7EB)]
 duration-200
  transition
  hover:shadow-xl 
 
      "
    >
      <img
        src={item.logo || "/images/rc.png"}
        alt={item.organization_name || ""}
        loading="lazy"
        draggable={false}
        className="
          h-7 md:h-8 w-auto max-w-[140px]
          object-contain
          filter grayscale contrast-125
          transition
          group-hover:grayscale-0 group-hover:contrast-100
        "
      />
    </Wrapper>
  );
}

export default memo(AffiliationSlider);
