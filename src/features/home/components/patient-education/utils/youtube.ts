// utils/youtube.ts
// export function getYouTubeId(input: string): string | null {
//   try {
//     const url = new URL(input);

//     // youtu.be/VIDEO_ID
//     if (url.hostname.includes("youtu.be")) {
//       return url.pathname.replace("/", "") || null;
//     }

//     // youtube.com/watch?v=VIDEO_ID
//     if (url.searchParams.get("v")) return url.searchParams.get("v");

//     // youtube.com/embed/VIDEO_ID
//     const parts = url?.pathname?.split("/").filter(Boolean);
//     const embedIndex = parts.indexOf("embed");
//     if (embedIndex !== -1 && parts[embedIndex + 1])
//       return parts[embedIndex + 1];

//     return null;
//   } catch {
//     // fallback regex لو url مش valid
//     const m =
//       input.match(/[?&]v=([^&]+)/) ||
//       input.match(/youtu\.be\/([^?&]+)/) ||
//       input.match(/youtube\.com\/embed\/([^?&/]+)/);
//     return m?.[1] ?? null;
//   }
// }
// utils/youtube.ts
export function getYouTubeId(input: string): string | null {
  // ✅ Guard: لو input مش string فعليًا، نرجّع null بدل ما نكسر
  if (typeof input !== "string") return null;

  // ✅ تنظيف بسيط
  const raw = input.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);

    // youtu.be/VIDEO_ID
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "") || null;
    }

    // youtube.com/watch?v=VIDEO_ID
    const v = url.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/VIDEO_ID
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1])
      return parts[embedIndex + 1];

    return null;
  } catch {
    // ✅ fallback regex لو url مش valid
    const m =
      raw.match(/[?&]v=([^&]+)/) ||
      raw.match(/youtu\.be\/([^?&]+)/) ||
      raw.match(/youtube\.com\/embed\/([^?&/]+)/);

    return m?.[1] ?? null;
  }
}

export function getYouTubeThumb(videoId: string, quality: "hq" | "mq" = "hq") {
  // hqdefault / mqdefault
  return `https://i.ytimg.com/vi/${videoId}/${
    quality === "hq" ? "hqdefault" : "mqdefault"
  }.jpg`;
}

export function getYouTubeEmbed(videoId: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
