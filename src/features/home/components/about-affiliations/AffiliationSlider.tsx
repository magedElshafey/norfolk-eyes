// import React, {
//   memo,
//   useCallback,
//   useEffect,
//   useId,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   useKeenSlider,
//   KeenSliderInstance,
//   KeenSliderOptions,
// } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

// import SectionTitle from "@/common/components/sections/SectionTitle";
// import SectionDescription from "@/common/components/sections/SectionDescription";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";
// import type { Affiliation } from "../../types/aboutSection.types";

// /* ---------------------------- Helpers ---------------------------- */

// function usePrefersReducedMotion() {
//   const [reduced, setReduced] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
//       setReduced("matches" in e ? e.matches : mql.matches);

//     setReduced(mql.matches);

//     if (typeof mql.addEventListener === "function") {
//       const handler = onChange as (e: MediaQueryListEvent) => void;
//       mql.addEventListener("change", handler);
//       return () => mql.removeEventListener("change", handler);
//     }

//     const legacy = mql as any;
//     legacy.addListener(onChange);
//     return () => legacy.removeListener(onChange);
//   }, []);

//   return reduced;
// }

// function usePageVisibility() {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     if (typeof document === "undefined") return;
//     const onVis = () => setVisible(!document.hidden);
//     onVis();
//     document.addEventListener("visibilitychange", onVis);
//     return () => document.removeEventListener("visibilitychange", onVis);
//   }, []);

//   return visible;
// }

// function useInViewport<T extends HTMLElement>(ref: React.RefObject<T>) {
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el || typeof IntersectionObserver === "undefined") {
//       setInView(true);
//       return;
//     }

//     const obs = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       { threshold: 0.15 }
//     );

//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [ref]);

//   return inView;
// }

// /* ---------------------------- Autoplay plugin (smooth) ---------------------------- */
// /**
//  * - أسرع
//  * - أنعم (duration)
//  * - يتوقف على hover/focus
//  */
// function autoplayPlugin({
//   interval = 1400,
//   animationDuration = 650,
//   enabled = true,
//   canRun = true,
// }: {
//   interval?: number;
//   animationDuration?: number;
//   enabled?: boolean;
//   canRun?: boolean;
// }) {
//   return (slider: KeenSliderInstance) => {
//     let timer: number | null = null;
//     let stopped = false;

//     const clear = () => {
//       if (timer != null) window.clearInterval(timer);
//       timer = null;
//     };

//     const start = () => {
//       clear();
//       if (!enabled || !canRun) return;
//       if (stopped) return;
//       timer = window.setInterval(() => {
//         slider.next();
//       }, interval);
//     };

//     slider.on("created", () => {
//       slider.container.addEventListener("pointerenter", () => {
//         stopped = true;
//         clear();
//       });
//       slider.container.addEventListener("pointerleave", () => {
//         stopped = false;
//         start();
//       });

//       slider.container.addEventListener("focusin", () => {
//         stopped = true;
//         clear();
//       });
//       slider.container.addEventListener("focusout", () => {
//         stopped = false;
//         start();
//       });

//       start();
//     });

//     slider.on("dragStarted", clear);
//     slider.on("animationEnded", start);
//     slider.on("updated", start);

//     // 👇 خلي الحركة أنعم
//     slider.on("created", () => {
//       slider.options.defaultAnimation = {
//         duration: animationDuration,
//       } as any;
//     });

//     slider.on("destroyed", clear);
//   };
// }

// /* ---------------------------- Component ---------------------------- */

// type Props = {
//   items: Affiliation[];
//   heading?: string;
//   description?: string;
// };

// const AffiliationSlider: React.FC<Props> = ({
//   items,
//   heading = "Professional affiliations & partnerships",
//   description = "Recognised memberships and organisations we work with.",
// }) => {
//   const { t, i18n } = useTranslation();
//   const sectionId = useId();
//   const isRTL = i18n.dir() === "rtl";

//   const prefersReducedMotion = usePrefersReducedMotion();
//   const pageVisible = usePageVisibility();

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const inViewport = useInViewport(sectionRef as React.RefObject<HTMLElement>);

//   const affiliations = useMemo(() => items ?? [], [items]);
//   const total = affiliations.length;

//   // a11y status
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   // ✅ دي اللي هتخلي الشكل “Logo Strip” مش Cards كبيرة:
//   // perView: "auto" + كل slide ليها عرض ثابت (responsive) + spacing صغير
//   const keenOptions = useMemo<KeenSliderOptions>(
//     () => ({
//       rtl: isRTL,
//       loop: true,
//       mode: "free-snap",
//       rubberband: false,
//       renderMode: "performance",
//       slides: {
//         perView: "auto",
//         spacing: 10, // ✅ قللنا المسافة
//       },
//       breakpoints: {
//         "(max-width: 420px)": { slides: { perView: "auto", spacing: 8 } },
//         "(max-width: 640px)": { slides: { perView: "auto", spacing: 8 } },
//         "(max-width: 1024px)": { slides: { perView: "auto", spacing: 10 } },
//       },
//       created(s) {
//         setLoaded(true);
//         setCurrentSlide(s.track.details.rel);
//       },
//       slideChanged(s) {
//         setCurrentSlide(s.track.details.rel);
//       },
//     }),
//     [isRTL]
//   );

//   const canRunAutoplay =
//     loaded && pageVisible && inViewport && !prefersReducedMotion;

//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenOptions, [
//     autoplayPlugin({
//       interval: 1150, // ✅ أسرع
//       animationDuration: 520, // ✅ أنعم
//       enabled: true,
//       canRun: canRunAutoplay,
//     }),
//   ]);

//   const goPrev = useCallback(() => {
//     instanceRef.current?.prev();
//   }, [instanceRef]);

//   const goNext = useCallback(() => {
//     instanceRef.current?.next();
//   }, [instanceRef]);

//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent) => {
//       if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         goPrev();
//       }
//       if (e.key === "ArrowRight") {
//         e.preventDefault();
//         goNext();
//       }
//     },
//     [goPrev, goNext]
//   );

//   if (!total) return null;

//   const carouselLabel = t(
//     "About.affiliationsCarousel",
//     "Affiliations carousel"
//   );
//   const prevLabel = t("About.prevAffiliation", "Previous");
//   const nextLabel = t("About.nextAffiliation", "Next");

//   return (
//     <section
//       ref={(node) => {
//         sectionRef.current = node;
//       }}
//       aria-labelledby={`${sectionId}-label`}
//       aria-roledescription="carousel"
//       className="py-10 md:py-12"
//     >
//       {/* Header */}
//       <div className="containerr flex flex-col gap-3 items-center justify-center text-center">
//         <SectionTitle id={`${sectionId}-label`} as="h2" text={heading} />
//         <SectionDescription description={description} />

//         <p className="sr-only" aria-live="polite">
//           {t("About.carouselStatus", "Slide {{x}} of {{y}}", {
//             x: currentSlide + 1,
//             y: total,
//           })}
//         </p>
//       </div>

//       {/* ✅ Full-bleed area حتى لو جوّه container */}
//       <div className="relative mt-6 w-screen left-1/2 -translate-x-1/2">
//         {/* ✅ Edge fade = فخامة + UX */}
//         <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-[var(--page-bg,#F9FAFB)] to-transparent z-10" />
//         <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-[var(--page-bg,#F9FAFB)] to-transparent z-10" />

//         {/* Controls */}
//         {total > 3 && (
//           <div className="absolute z-20 top-1/2 -translate-y-1/2 inset-x-0 flex items-center justify-between px-2 sm:px-6">
//             <button
//               type="button"
//               onClick={goPrev}
//               aria-label={prevLabel}
//               className="
//                 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full
//                 border border-[var(--border-subtle,#E5E7EB)]
//                 bg-[var(--card-bg,#fff)] shadow-sm
//                 hover:bg-[var(--accent-soft-bg,rgba(15,118,110,0.08))]
//                 focus:outline-none focus-visible:ring-2
//                 focus-visible:ring-[color:var(--focus-ring,#0f766e)]
//                 focus-visible:ring-offset-2
//                 focus-visible:ring-offset-[var(--page-bg,#F9FAFB)]
//               "
//             >
//               {isRTL ? <IoChevronForward /> : <IoChevronBack />}
//             </button>

//             <button
//               type="button"
//               onClick={goNext}
//               aria-label={nextLabel}
//               className="
//                 hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full
//                 border border-[var(--border-subtle,#E5E7EB)]
//                 bg-[var(--card-bg,#fff)] shadow-sm
//                 hover:bg-[var(--accent-soft-bg,rgba(15,118,110,0.08))]
//                 focus:outline-none focus-visible:ring-2
//                 focus-visible:ring-[color:var(--focus-ring,#0f766e)]
//                 focus-visible:ring-offset-2
//                 focus-visible:ring-offset-[var(--page-bg,#F9FAFB)]
//               "
//             >
//               {isRTL ? <IoChevronBack /> : <IoChevronForward />}
//             </button>
//           </div>
//         )}

//         {/* Slider */}
//         <div className="px-4 sm:px-8 md:px-10">
//           <div
//             ref={sliderRef}
//             dir={isRTL ? "rtl" : "ltr"}
//             role="group"
//             aria-label={carouselLabel}
//             aria-roledescription="carousel"
//             tabIndex={0}
//             onKeyDown={handleKeyDown}
//             className="keen-slider outline-none"
//           >
//             {affiliations.map((item, index) => (
//               <div
//                 key={item.id ?? `${index}-${item.organization_name ?? "aff"}`}
//                 className="
//                   keen-slider__slide
//                   !min-w-[180px] sm:!min-w-[200px]
//                 "
//                 role="group"
//                 aria-roledescription="slide"
//                 aria-label={t("About.slideLabel", "Slide {{x}} of {{y}}", {
//                   x: index + 1,
//                   y: total,
//                 })}
//               >
//                 <AffLogo item={item} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <ul className="sr-only">
//           {affiliations.map((item) => (
//             <li key={item.id}>{item.organization_name}</li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// function AffLogo({ item }: { item: Affiliation }) {
//   const Wrapper = item.website_url ? "a" : "div";
//   const wrapperProps = item.website_url
//     ? { href: item.website_url, target: "_blank", rel: "noreferrer noopener" }
//     : {};

//   return (
//     <Wrapper
//       {...(wrapperProps as any)}
//       className="
//         group
//         w-full
//         h-[64px] md:h-[72px]
//         inline-flex items-center justify-center
//         rounded-2xl
//         bg-[var(--card-bg,#FFFFFF)]
//         border border-[var(--card-border,#E5E7EB)]
//         shadow-sm
//         transition
//         hover:shadow-md hover:-translate-y-[1px]
//         focus:outline-none focus-visible:ring-2
//         focus-visible:ring-[var(--focus-ring,#0f766e)]
//         focus-visible:ring-offset-2
//         focus-visible:ring-offset-[var(--page-bg,#F9FAFB)]
//       "
//     >
//       <img
//         src={item.logo || "/images/rc.png"}
//         alt={item.organization_name || ""}
//         loading="lazy"
//         className="
//           h-8 md:h-10 w-auto max-w-[150px]
//           object-contain
//           filter grayscale contrast-125
//           transition
//           group-hover:grayscale-0 group-hover:contrast-100
//         "
//         draggable={false}
//       />
//     </Wrapper>
//   );
// }

// export default memo(AffiliationSlider);
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

import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import type { Affiliation } from "../../types/aboutSection.types";

/* ---------------------------- Helpers ---------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setReduced("matches" in e ? e.matches : mql.matches);

    setReduced(mql.matches);

    if (typeof mql.addEventListener === "function") {
      const handler = onChange as (e: MediaQueryListEvent) => void;
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    const legacy = mql as any;
    legacy.addListener(onChange);
    return () => legacy.removeListener(onChange);
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
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return inView;
}

/* ---------------------------- Autoplay (reliable) ---------------------------- */
/**
 * ✅ autoplay يعتمد على effect خارجي (مش plugin) عشان يشتغل/يقف مع state changes
 * - أسرع + أنعم
 * - يتوقف على hover/focus/drag
 */
function useKeenAutoplay(params: {
  slider: React.MutableRefObject<KeenSliderInstance | null>;
  enabled: boolean;
  interval?: number;
}) {
  const { slider, enabled, interval = 950 } = params;

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
      if (!enabled) return;
      if (pausedRef.current) return;

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

    // attach events once per slider instance
    const el = s.container;

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    s.on("dragStarted", pause);
    s.on("animationEnded", start);
    s.on("updated", start);

    // start now
    start();

    return () => {
      clear();
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
    // مهم: enabled والـ interval يخلوك restart صح
  }, [slider, enabled, interval]);
}

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

  const prefersReducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisibility();

  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewport = useInViewport(sectionRef as React.RefObject<HTMLElement>);

  const affiliations = useMemo(() => items ?? [], [items]);
  const total = affiliations.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // ✅ أصغر + أظهر عدد أكبر: perView="auto" + min-width أقل
  // ✅ spacing أصغر
  const keenOptions = useMemo<KeenSliderOptions>(
    () => ({
      rtl: isRTL,
      loop: true,
      mode: "free-snap",
      rubberband: false,
      renderMode: "performance",
      slides: { perView: "auto", spacing: 8 },
      breakpoints: {
        "(max-width: 420px)": { slides: { perView: "auto", spacing: 6 } },
        "(max-width: 640px)": { slides: { perView: "auto", spacing: 6 } },
        "(max-width: 1024px)": { slides: { perView: "auto", spacing: 8 } },
        "(min-width: 1280px)": { slides: { perView: "auto", spacing: 10 } },
      },
      created(s) {
        setLoaded(true);
        setCurrentSlide(s.track.details.rel);

        // ✅ خلي الانتقال ناعم (snap animation)
        s.options.defaultAnimation = { duration: 420 } as any;
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    }),
    [isRTL]
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenOptions);

  // ✅ autoplay يشتغل فعلاً (ويتأثر بالـ state)
  const canRunAutoplay =
    loaded && pageVisible && inViewport && !prefersReducedMotion && total > 2;

  useKeenAutoplay({
    slider: instanceRef,
    enabled: canRunAutoplay,
    interval: 850, // ✅ أسرع (قلل الرقم لو عايزه أسرع أكتر)
  });

  if (!total) return null;

  const carouselLabel = t(
    "About.affiliationsCarousel",
    "Affiliations carousel"
  );

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      aria-labelledby={`${sectionId}-label`}
      aria-roledescription="carousel"
      className="py-10 md:py-12"
    >
      {/* Header */}
      <div className="containerr flex flex-col gap-3 items-center justify-center text-center">
        <SectionTitle id={`${sectionId}-label`} as="h2" text={heading} />
        <SectionDescription description={description} />

        <p className="sr-only" aria-live="polite">
          {t("About.carouselStatus", "Slide {{x}} of {{y}}", {
            x: currentSlide + 1,
            y: total,
          })}
        </p>
      </div>

      {/* Full-bleed */}
      <div className="relative mt-6 w-screen left-1/2 -translate-x-1/2">
        {/* Edge fade */}
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
                key={item.id ?? `${index}-${item.organization_name ?? "aff"}`}
                className="
                  keen-slider__slide
                  !min-w-[140px] sm:!min-w-[150px] md:!min-w-[160px] lg:!min-w-[170px]
                "
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

        <ul className="sr-only">
          {affiliations.map((item) => (
            <li key={item.id}>{item.organization_name}</li>
          ))}
        </ul>
      </div>
    </section>
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
        group w-full
        h-[54px] md:h-[60px]   /* ✅ أصغر */
        inline-flex items-center justify-center
        rounded-2xl
        bg-[var(--card-bg,#FFFFFF)]
        border border-[var(--card-border,#E5E7EB)]
        shadow-sm
        transition
        hover:shadow-md hover:-translate-y-[1px]
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--focus-ring,#0f766e)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--page-bg,#F9FAFB)]
      "
    >
      <img
        src={item.logo || "/images/rc.png"}
        alt={item.organization_name || ""}
        loading="lazy"
        className="
          h-7 md:h-8   /* ✅ أصغر */
          w-auto max-w-[140px]
          object-contain
          filter grayscale contrast-125
          transition
          group-hover:grayscale-0 group-hover:contrast-100
        "
        draggable={false}
      />
    </Wrapper>
  );
}

export default memo(AffiliationSlider);
