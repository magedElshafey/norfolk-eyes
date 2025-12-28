// export type CookieCategory =
//   | "essential"
//   | "analytics"
//   | "functional"
//   | "marketing";

// export type CookiePreferences = {
//   essential: true; // always true
//   analytics: boolean;
//   functional: boolean;
//   marketing: boolean;
// };

// export type CookieConsentState = {
//   version: number;
//   updatedAt: string; // ISO string
//   preferences: CookiePreferences;
// };

// const STORAGE_KEY = "wf_cookie_consent";
// const CONSENT_VERSION = 1;

// export const defaultPrefs: CookiePreferences = {
//   essential: true,
//   analytics: false,
//   functional: false,
//   marketing: false,
// };

// export function readConsent(): CookieConsentState | null {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return null;

//     const parsed = JSON.parse(raw) as CookieConsentState;
//     if (!parsed?.preferences?.essential) return null;

//     // if version changed, re-consent
//     if (parsed.version !== CONSENT_VERSION) return null;

//     return parsed;
//   } catch {
//     return null;
//   }
// }

// export function writeConsent(
//   preferences: Omit<CookiePreferences, "essential"> & { essential?: true }
// ): CookieConsentState {
//   const state: CookieConsentState = {
//     version: CONSENT_VERSION,
//     updatedAt: new Date().toISOString(),
//     preferences: {
//       essential: true,
//       analytics: !!preferences.analytics,
//       functional: !!preferences.functional,
//       marketing: !!preferences.marketing,
//     },
//   };

//   localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   window.dispatchEvent(
//     new CustomEvent("wf:cookie-consent-changed", { detail: state })
//   );
//   return state;
// }

// export function clearConsent() {
//   localStorage.removeItem(STORAGE_KEY);
//   window.dispatchEvent(new CustomEvent("wf:cookie-consent-cleared"));
// }

// export function openCookieSettings() {
//   window.dispatchEvent(new CustomEvent("wf:open-cookie-settings"));
// }
// src/cookies/cookie-consent.ts



// src/features/cookies/cookie-consent.ts
export type CookieCategory = "essential" | "analytics" | "functional" | "marketing";

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
};

export type CookieConsentState = {
  version: number;
  decidedAt: string; // ISO
  preferences: CookiePreferences;
};

export const CONSENT_VERSION = 1;

export const defaultPrefs: CookiePreferences = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
};

const COOKIE_NAME = "wf_cookie_consent";
const LS_KEY = "wf_cookie_consent";

function safeJsonParse<T>(v: string | null): T | null {
  if (!v) return null;
  try {
    return JSON.parse(v) as T;
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string, days = 180) {
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | null {
  const needle = encodeURIComponent(name) + "=";
  const parts = document.cookie.split("; ");
  for (const p of parts) {
    if (p.startsWith(needle)) return decodeURIComponent(p.slice(needle.length));
  }
  return null;
}

function deleteCookieEverywhere(name: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const base = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;

  // delete without domain
  document.cookie = base;

  // delete with domain variants (best effort)
  const host = window.location.hostname; // e.g. sub.example.com
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; Domain=${host}; SameSite=Lax${secure}`;

  const parts = host.split(".");
  if (parts.length >= 2) {
    const root = parts.slice(-2).join("."); // example.com
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; Domain=.${root}; SameSite=Lax${secure}`;
  }
}

export function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;

  const fromCookie = safeJsonParse<CookieConsentState>(getCookie(COOKIE_NAME));
  if (fromCookie?.preferences?.essential) {
    if (fromCookie.version === CONSENT_VERSION) return fromCookie;
    return null;
  }

  const fromLS = safeJsonParse<CookieConsentState>(localStorage.getItem(LS_KEY));
  if (fromLS?.preferences?.essential) {
    if (fromLS.version === CONSENT_VERSION) return fromLS;
    return null;
  }

  return null;
}

export function clearConsentStorage() {
  deleteCookieEverywhere(COOKIE_NAME);
  localStorage.removeItem(LS_KEY);
}

export function writeConsent(
  p: Omit<CookiePreferences, "essential">
): CookieConsentState {
  const state: CookieConsentState = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    preferences: {
      essential: true,
      analytics: !!p.analytics,
      functional: !!p.functional,
      marketing: !!p.marketing,
    },
  };

  const json = JSON.stringify(state);
  setCookie(COOKIE_NAME, json, 180);
  localStorage.setItem(LS_KEY, json);

  window.dispatchEvent(
    new CustomEvent<CookieConsentState>("wf:cookie-consent-changed", {
      detail: state,
    })
  );

  return state;
}
