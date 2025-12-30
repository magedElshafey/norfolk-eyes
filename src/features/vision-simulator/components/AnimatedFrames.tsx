import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  frames: string[];
  fps?: number;
  alt?: string;
  className?: string;
  preload?: boolean;
};

const AnimatedFrames: React.FC<Props> = ({
  frames,
  fps = 8,
  alt = "",
  className = "",
  preload = true,
}) => {
  const safeFrames = useMemo(
    () => (Array.isArray(frames) ? frames.filter(Boolean) : []),
    [frames]
  );

  const [index, setIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  // optional preload (خفيف)
  useEffect(() => {
    if (!preload || safeFrames.length <= 1) return;
    let cancelled = false;

    (async () => {
      for (const src of safeFrames) {
        if (cancelled) return;
        const img = new Image();
        img.src = src;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [safeFrames, preload]);

  useEffect(() => {
    if (safeFrames.length <= 1) return;

    const frameMs = 1000 / Math.max(1, fps);

    const loop = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      const delta = t - lastRef.current;

      if (delta >= frameMs) {
        lastRef.current = t;
        setIndex((prev) => (prev + 1) % safeFrames.length);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = 0;
    };
  }, [safeFrames, fps]);

  if (!safeFrames.length) return null;

  return (
    <img
      src={safeFrames[index]}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};

export default React.memo(AnimatedFrames);
