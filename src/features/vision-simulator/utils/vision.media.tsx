import type { VisionVideo } from "../types/vision.types";
import AnimatedFrames from "../components/AnimatedFrames";

export function hasMedia(v?: VisionVideo | null) {
  return !!(v && (v.src || (v.frames && v.frames.length > 0)));
}

export function renderVisionMedia(
  video: VisionVideo,
  alt: string,
  className: string
) {
  if (video.frames && video.frames.length > 0) {
    return (
      <AnimatedFrames
        frames={video.frames}
        alt={alt}
        className={className}
        fps={video.fps ?? 8}
      />
    );
  }
  if (video.src) {
    return (
      <img
        src={video.src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return null;
}
