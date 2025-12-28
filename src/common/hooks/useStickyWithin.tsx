// import { useEffect, useState } from "react";

// type Options = {
//   top: number; // px
// };

// export function useStickyWithin(
//   containerEl: HTMLElement | null,
//   stickyEl: HTMLElement | null,
//   { top }: Options
// ) {
//   const [style, setStyle] = useState<React.CSSProperties>({});

//   useEffect(() => {
//     if (!containerEl || !stickyEl) return;

//     const onScroll = () => {
//       const c = containerEl.getBoundingClientRect();
//       const s = stickyEl.getBoundingClientRect();

//       const stickyHeight = s.height;
//       const start = c.top + window.scrollY - top;
//       const end = c.bottom + window.scrollY - top - stickyHeight;

//       const y = window.scrollY;

//       if (y < start) {
//         // قبل بداية الكونتينر
//         setStyle({ position: "relative", top: 0 });
//       } else if (y > end) {
//         // بعد نهاية الكونتينر (قف تحت)
//         setStyle({ position: "relative", top: end - start });
//       } else {
//         // أثناء التمرير (اشتغل زي sticky)
//         setStyle({ position: "fixed", top, width: stickyEl.offsetWidth });
//       }
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, [containerEl, stickyEl, top]);

//   return style;
// }
// common/hooks/useStickyWithin.ts
import { useEffect, useState } from "react";

type Options = { top: number };

export function useStickyWithin(
  containerEl: HTMLElement | null,
  stickyEl: HTMLElement | null,
  { top }: Options
) {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "relative",
  });

  useEffect(() => {
    if (!containerEl || !stickyEl) return;

    const isRTL =
      document.documentElement.dir === "rtl" ||
      getComputedStyle(document.documentElement).direction === "rtl";

    const onScroll = () => {
      const c = containerEl.getBoundingClientRect();
      const sRect = stickyEl.getBoundingClientRect();
      const stickyHeight = sRect.height;

      const start = c.top + window.scrollY - top;
      const end = c.bottom + window.scrollY - top - stickyHeight;

      const y = window.scrollY;

      if (y < start) {
        setStyle({
          position: "relative",
          top: 0,
          left: undefined,
          right: undefined,
          width: undefined,
        });
        return;
      }

      if (y > end) {
        setStyle({
          position: "relative",
          top: end - start,
          left: undefined,
          right: undefined,
          width: undefined,
        });
        return;
      }

      // ✅ أثناء التمرير: ثبّت مكانه أفقيًا
      const width = stickyEl.offsetWidth;
      const left = sRect.left;
      const right = window.innerWidth - sRect.right;

      setStyle({
        position: "fixed",
        top,
        width,
        ...(isRTL ? { right } : { left }),
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerEl, stickyEl, top]);

  return style;
}
