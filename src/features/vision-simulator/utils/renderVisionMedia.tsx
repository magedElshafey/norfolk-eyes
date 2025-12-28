import type { VisionVideo } from "../data/data";
import AnimatedFrames from "../components/AnimatedFrames";
export function renderVisionMedia(
  video: VisionVideo,
  alt: string,
  className: string
) {
  if (video.frames && video.frames.length > 0) {
    // 👈 Animated sequence
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
    // 👈 صورة ثابتة عادي
    return <img src={video.src} alt={alt} className={className} />;
  }

  return null;
}
