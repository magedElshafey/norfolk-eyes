import React, { useEffect, useMemo, useState } from "react";

type DomPurifyLike = {
  sanitize: (dirty: string) => string;
};

type Props = {
  html?: string | null;
  className?: string;
  /**
   * default true
   * لو false: هيرندر raw HTML مباشرة (غير آمن)
   */
  sanitize?: boolean;

  /**
   * لو true: يعرض Skeleton لحد ما dompurify يحمل
   * default true (ده اللي انت طالبّه)
   */
  blockUntilReady?: boolean;

  /**
   * عدد سطور الـ skeleton (اختياري)
   */
  skeletonLines?: number;
};

function HtmlSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: Math.max(2, lines) }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)]"
          style={{ width: `${90 - i * 8}%` }}
        />
      ))}
    </div>
  );
}

const HtmlConverter: React.FC<Props> = ({
  html,
  className = "",
  sanitize = true,
  blockUntilReady = true,
  skeletonLines = 4,
}) => {
  const [purify, setPurify] = useState<DomPurifyLike | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    // لو مش هنعمل sanitize أصلاً: جاهز فوراً
    if (!sanitize) {
      setReady(true);
      return;
    }

    setReady(false);

    (async () => {
      try {
        const mod = await import("dompurify");
        const instance = (mod as any).default ?? mod;
        if (!mounted) return;

        setPurify(instance as DomPurifyLike);
        setReady(true);
      } catch {
        // لو فشل التحميل: من منظور أمان، الأفضل ما نرندرش HTML
        if (!mounted) return;
        setPurify(null);
        setReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [sanitize]);

  const raw = String(html ?? "");

  const safeHtml = useMemo(() => {
    if (!sanitize) return raw;
    if (!purify) return ""; // في حالة فشل purify أو لسه محمّلش
    return purify.sanitize(raw);
  }, [raw, purify, sanitize]);

  // ✅ هنا الفرق: لو blockUntilReady => skeleton لحد ما يبقى ready
  if (sanitize && blockUntilReady && !ready) {
    return (
      <div
        className={[
          "prose max-w-full !text-xs md:!text-sm",
          "!text-[var(--text-muted)]",
          className,
        ].join(" ")}
      >
        <HtmlSkeleton lines={skeletonLines} />
      </div>
    );
  }

  // لو sanitize شغال لكن purify فشل => ما نرندرش HTML (أمان)
  if (sanitize && !purify) {
    return null;
  }

  if (!safeHtml) return null;

  return (
    <div
      className={[
        "prose max-w-full !text-xs md:!text-sm",
        "!text-[var(--text-muted)]",
        className,
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};

export default React.memo(HtmlConverter);
