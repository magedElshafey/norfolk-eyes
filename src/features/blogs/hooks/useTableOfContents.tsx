// src/features/blog/hooks/useTableOfContents.ts

import { useEffect, useState } from "react";
import type { TocItem } from "../types/TocItem";

export function useTableOfContents(
  articleEl: HTMLElement | null,
  deps: unknown
) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!articleEl) return;

    const headings = Array.from(
      articleEl.querySelectorAll<HTMLHeadingElement>("h2[id]")
    );

    const toc: TocItem[] = headings
      .map((h) => {
        const text = h.textContent?.trim();
        const id = h.id;
        if (!text || !id) return null;

        return { id, text, level: 2 };
      })
      .filter(Boolean) as TocItem[];

    setItems(toc);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [articleEl, deps]);

  return { items, activeId };
}
