// src/features/blog/utils/jumpToId.ts

// export const jumpToId = (id: string) => {
//   const el = document.getElementById(id);
//   if (!el) return;

//   el.scrollIntoView({ behavior: "smooth", block: "start" });
//   window.history.replaceState(null, "", `#${id}`);
// };
// export function jumpToId(id: string) {
//   const el = document.getElementById(id);
//   if (!el) return;

//   const raw =
//     Number.parseFloat(
//       getComputedStyle(document.documentElement).getPropertyValue("--toc-offset")
//     ) || 96;

//   const offset = raw + 16; // نفس اللي بتستخدمه في scroll-mt

//   const y = el.getBoundingClientRect().top + window.scrollY - offset;

//   window.scrollTo({ top: y, behavior: "smooth" });

//   // (اختياري) تحديث الـ hash بدون ما يعمل jump
//   history.replaceState(null, "", `#${id}`);
// }
// utils/jumpToId.ts
export function jumpToId(raw: string) {
  // يقبل: "intro" أو "page#intro" أو "#intro"
  const id = decodeURIComponent(raw).split("#").pop()?.replace(/^#/, "") || "";
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const rawOffset =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--toc-offset")
    ) || 96;

  const offset = rawOffset + 16;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}
