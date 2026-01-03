
import type { NavItemConfig, NavItem } from "../types/navbar.types";
import { buildNav } from "../utils/buildNav";

export const navConfig: NavItemConfig[] = [
  { name: "Home", isIndex: true },
  { name: "About" },

  {
    name: "Procedures",
    kind: "procedures",
    segment: "procedures",
    // children optional fallback (لو API فاضي)
    children: [{ name: "test" }],
  },

  {
    name: "patient education",
    kind: "patientEducation",
    // children optional fallback
    children: [
      { name: "Eye Conditions & Symptoms" },
      { name: "Treatment Guides" },
    ],
  },
  { name: "vision simulator" },
  // ✅ Dropdown بسيط (مش Mega)
  {
    name: "More",
    kind: "default",
    children: [
      { name: "contact us", segment: "/contact-us" },
      { name: "Pre visit form", segment: "/pre-visit" },
      { name: "Submit review", segment: "/submit-review" },
    ],
  },


];

export const sidebarConfig: NavItemConfig[] = [
  { name: "Home", isIndex: true },
  { name: "About" },
  { name: "procedures" },
  { name: "patient education" },

  // (اختياري) تظهر في السايد بار برضه
  { name: "Pre visit form", segment: "/pre-visit" },
  { name: "Submit review", segment: "/submit-review" },

  { name: "vision simulator" },
  { name: "contact us" },
];

export const navLinks: NavItem[] = buildNav(navConfig);
export const sidebarLinks: NavItem[] = buildNav(sidebarConfig);
