// src/seo/seo.config.ts
export const seoConfig = {
  siteName: "Norfolk Eyes",
  defaultTitle: "Specialist Eye Clinic in Norfolk",
  defaultDescription:
    "Evidence-based patient information and expert ophthalmology care in the UK.",
  siteUrl: "https://norfolkeyes.com",
  defaultOgImage: "https://norfolkeyes.com/static/og-default.jpg",
  twitterHandle: "@NorfolkEyes",

  // favicons
  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.png",
  manifestUrl: "/site.webmanifest",
  themeColor: "#ffffff",
  msTileColor: "#ffffff",
} as const;
