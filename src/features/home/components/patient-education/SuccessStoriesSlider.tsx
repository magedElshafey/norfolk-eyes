import React, {
  memo,
  useCallback,
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

import SuccessStoryCard from "./SuccessStoryCard";
import useGetSuccessStories from "../../api/useGetSuccessStories";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useLanguage } from "@/store/LanguageProvider";
import MainBtn from "@/common/components/buttons/MainBtn";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";

/* ---------------------------- Helpers (Hooks) ---------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setReduced("matches" in e ? e.matches : mql.matches);
    };

    // init
    setReduced(mql.matches);

    // modern
    if (typeof mql.addEventListener === "function") {
      const handler = onChange as (e: MediaQueryListEvent) => void;
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    // legacy Safari
    const legacy = mql as unknown as {
      addListener: (fn: (e: MediaQueryList) => void) => void;
      removeListener: (fn: (e: MediaQueryList) => void) => void;
    };
    legacy.addListener(onChange as (e: MediaQueryList) => void);
    return () => legacy.removeListener(onChange as (e: MediaQueryList) => void);
  }, []);

  return reduced;
}

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
      { root: null, threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return inView;
}

/* --------------------------- Static slider config --------------------------- */

const DEFAULT_PER_VIEW = 5;

const BREAKPOINTS: NonNullable<KeenSliderOptions["breakpoints"]> = {
  "(min-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
  "(max-width: 1280px)": { slides: { perView: 3, spacing: 16 } },
  "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
  "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
};

/* -------------------------------- Component -------------------------------- */

const SuccessStoriesSlider: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language ? language === "ar" : i18n.dir() === "rtl";

  const sectionId = useId();
  const sliderContainerRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisibility();
  const inViewport = useInViewport(
    sliderContainerRef as React.RefObject<HTMLElement>
  );

  const queryResult = useGetSuccessStories();

  const reviews = useMemo(
    () => queryResult?.data?.reviews ?? [],
    [queryResult?.data?.reviews]
  );

  const total = reviews.length;

  // Track slider state for UX + a11y
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(DEFAULT_PER_VIEW);

  // Autoplay controls
  const AUTOPLAY_ENABLED = true;
  const AUTOPLAY_MS = 4000;
  const autoplayTimerRef = useRef<number | null>(null);

  const canShowControls = total > slidesPerView;

  const clearAutoplay = useCallback(() => {
    if (autoplayTimerRef.current != null) {
      window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(
    (slider?: KeenSliderInstance | null) => {
      if (!AUTOPLAY_ENABLED) return;
      if (!loaded) return;
      if (!pageVisible) return;
      if (!inViewport) return;
      if (prefersReducedMotion) return;
      if (!slider) return;

      clearAutoplay();
      autoplayTimerRef.current = window.setInterval(() => {
        slider.next();
      }, AUTOPLAY_MS);
    },
    [loaded, pageVisible, inViewport, prefersReducedMotion, clearAutoplay]
  );

  const keenOptions = useMemo<KeenSliderOptions>(
    () => ({
      initial: 0,
      rtl: isRTL,
      loop: true,
      mode: "free-snap",
      renderMode: "performance",
      slides: { perView: DEFAULT_PER_VIEW, spacing: 10 },
      breakpoints: BREAKPOINTS,
      created(slider) {
        setLoaded(true);
        setSlidesPerView(
          typeof slider.options.slides === "object" &&
            slider.options.slides &&
            "perView" in slider.options.slides &&
            typeof (slider.options.slides as any).perView === "number"
            ? ((slider.options.slides as any).perView as number)
            : DEFAULT_PER_VIEW
        );
        setCurrentSlide(slider.track.details.rel);
      },
      updated(slider) {
        setSlidesPerView(
          typeof slider.options.slides === "object" &&
            slider.options.slides &&
            "perView" in slider.options.slides &&
            typeof (slider.options.slides as any).perView === "number"
            ? ((slider.options.slides as any).perView as number)
            : DEFAULT_PER_VIEW
        );
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    }),
    [isRTL]
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenOptions);

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    startAutoplay(slider);
    return () => clearAutoplay();
  }, [instanceRef, startAutoplay, clearAutoplay]);

  // Pause on hover/focus (UX + a11y)
  const handlePointerEnter = useCallback(
    () => clearAutoplay(),
    [clearAutoplay]
  );
  const handlePointerLeave = useCallback(
    () => startAutoplay(instanceRef.current),
    [startAutoplay, instanceRef]
  );
  const handleFocusCapture = useCallback(
    () => clearAutoplay(),
    [clearAutoplay]
  );
  const handleBlurCapture = useCallback(
    () => startAutoplay(instanceRef.current),
    [startAutoplay, instanceRef]
  );

  const goPrev = useCallback(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    slider.prev();
    startAutoplay(slider);
  }, [instanceRef, startAutoplay]);

  const goNext = useCallback(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    slider.next();
    startAutoplay(slider);
  }, [instanceRef, startAutoplay]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const heading = queryResult?.data?.section?.heading || "";
  const description = queryResult?.data?.section?.description || "";

  const carouselLabel = t(
    "Education.successStoriesCarousel",
    "Success stories carousel"
  );
  const prevLabel = t("Education.prevStory", "Previous story");
  const nextLabel = t("Education.nextStory", "Next story");

  return (
    <FetchHandler queryResult={queryResult} skeletonType="success-stories">
      {queryResult?.data?.is_active ? (
        <section
          ref={(node) => {
            sliderContainerRef.current = node;
          }}
          aria-labelledby={`${sectionId}-heading`}
          aria-roledescription="carousel"
          className="bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)] py-10 md:py-14 lg:py-16"
        >
          <div className="containerr space-y-4">
            {/* Header + Controls */}

            <div className="w-full">
              <SectionTitle
                as="h3"
                text={heading}
                id={`${sectionId}-heading`}
              />
              <div className="max-w-[80%]">
                <SectionDescription description={description} />
              </div>

              {/* SR status */}
              <p className="sr-only" aria-live="polite">
                {total > 0
                  ? t("Education.carouselStatus", "Slide {{x}} of {{y}}", {
                      x: currentSlide + 1,
                      y: total,
                    })
                  : ""}
              </p>
            </div>

            {canShowControls && (
              <div className="flex items-center gap-2 invisible sm:visible w-full">
                <button
                  type="button"
                  onClick={goPrev}
                  className="
                    inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-[var(--border-subtle)]
                    bg-[var(--card-bg)]
                    text-[color:var(--text-main)]
                    hover:bg-[var(--accent-soft-bg)]
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-[color:var(--focus-ring)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--bg-subtle)]
                  "
                  aria-label={prevLabel}
                  aria-controls={`${sectionId}-slider`}
                >
                  {isRTL ? (
                    <IoChevronForward aria-hidden="true" />
                  ) : (
                    <IoChevronBack aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="
                    inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-[var(--border-subtle)]
                    bg-[var(--card-bg)]
                    text-[color:var(--text-main)]
                    hover:bg-[var(--accent-soft-bg)]
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-[color:var(--focus-ring)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--bg-subtle)]
                  "
                  aria-label={nextLabel}
                  aria-controls={`${sectionId}-slider`}
                >
                  {isRTL ? (
                    <IoChevronBack aria-hidden="true" />
                  ) : (
                    <IoChevronForward aria-hidden="true" />
                  )}
                </button>
              </div>
            )}

            {/* Slider */}
            <div
              id={`${sectionId}-slider`}
              ref={sliderRef}
              dir={isRTL ? "rtl" : "ltr"}
              role="group"
              aria-label={carouselLabel}
              aria-roledescription="carousel"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onFocusCapture={handleFocusCapture}
              onBlurCapture={handleBlurCapture}
              className="keen-slider outline-none !overflow-visible items-stretch"
            >
              {reviews.map((story, index) => (
                <div
                  key={
                    (story as any)?.id ??
                    `${index}-${(story as any)?.user_name ?? "story"}`
                  }
                  className="keen-slider__slide h-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t(
                    "Education.slideLabel",
                    "Slide {{x}} of {{y}}",
                    {
                      x: index + 1,
                      y: total,
                    }
                  )}
                >
                  <SuccessStoryCard story={story} />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center md:justify-end items-center flex-wrap gap-3">
              <MainBtn theme="secondary">
                <a
                  href="www.google.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("submit review")}
                </a>
              </MainBtn>
              <BookConsultationButton />
            </div>
          </div>
        </section>
      ) : null}
    </FetchHandler>
  );
};

export default memo(SuccessStoriesSlider);
