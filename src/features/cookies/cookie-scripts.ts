// src/features/cookies/cookie-scripts.ts
import type { CookieConsentState, CookieCategory } from "./cookie-consent";

/** ====== Optional: typings for gtag ====== */
type GtagCommand = "js" | "config" | "consent" | "event" | "set";
type GtagFn = (command: GtagCommand, ...params: any[]) => void;

declare global {
    interface Window {
        dataLayer?: any[][];
        gtag?: GtagFn;
    }
}

type ScriptStatus = "idle" | "loaded" | "error";

type ScriptDef = {
    id: string;
    category: Exclude<CookieCategory, "essential">;
    load: () => Promise<void> | void;
    unload?: () => void;
};

/** ====== helpers ====== */
function injectExternalScript(opts: {
    id: string;
    src: string;
    async?: boolean;
    defer?: boolean;
    attrs?: Record<string, string>;
}) {
    if (document.getElementById(opts.id)) return;

    const s = document.createElement("script");
    s.id = opts.id;
    s.src = opts.src;
    s.async = opts.async ?? true;
    s.defer = opts.defer ?? true;
    if (opts.attrs) {
        for (const [k, v] of Object.entries(opts.attrs)) s.setAttribute(k, v);
    }
    document.head.appendChild(s);
}

function removeElById(id: string) {
    document.getElementById(id)?.remove();
}

function deleteCookieEverywhere(name: string) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    const host = window.location.hostname;

    // no domain
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;

    // domain current host
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; Domain=${host}; SameSite=Lax${secure}`;

    // root domain
    const parts = host.split(".");
    if (parts.length >= 2) {
        const root = parts.slice(-2).join(".");
        document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; Domain=.${root}; SameSite=Lax${secure}`;
    }
}

function deleteCookiesByNames(names: string[]) {
    names.forEach(deleteCookieEverywhere);
}

/** ====== GA4 Direct Loader (recommended baseline) ======
 * - No inline snippet
 * - No arguments usage
 * - Loads only after analytics consent
 */
export function ga4Loader(measurementId: string): ScriptDef[] {
    const LIB_ID = "wf-ga4-lib";

    return [
        {
            id: "wf-ga4",
            category: "analytics",
            load: () => {
                // init dataLayer + gtag function (NO arguments)
                window.dataLayer = window.dataLayer || [];
                window.gtag = ((command: GtagCommand, ...params: any[]) => {
                    window.dataLayer!.push([command, ...params]);
                }) as GtagFn;

                // load library
                injectExternalScript({
                    id: LIB_ID,
                    src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
                        measurementId
                    )}`,
                    async: true,
                });

                // configure
                window.gtag("js", new Date());
                window.gtag("config", measurementId, {
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false,
                });
            },
            unload: () => {
                removeElById(LIB_ID);

                // best-effort disable
                (window as any)["ga-disable-" + measurementId] = true;

                // remove common GA cookies
                // NOTE: _ga_XXXX cookie name for GA4 is _ga_<containerSuffix> (not always derivable)
                deleteCookiesByNames(["_ga", "_gid", "_gat"]);
            },
        },
    ];
}

/** ====== Registry ====== */
export function buildScriptRegistry() {
    const scripts: ScriptDef[] = [
        // ✅ ضع الـ Measurement ID الحقيقي هنا
        ...ga4Loader("G-XXXXXXXXXX"),

        // لو هتضيف Vendors لاحقًا:
        // ...metaPixelLoader("123"),
        // ...hotjarLoader("456"),
    ];

    return scripts;
}

/** ====== Engine ====== */
const statusById = new Map<string, ScriptStatus>();

function shouldEnableCategory(
    consent: CookieConsentState,
    cat: ScriptDef["category"]
) {
    const p = consent.preferences;
    if (cat === "analytics") return !!p.analytics;
    if (cat === "functional") return !!p.functional;
    if (cat === "marketing") return !!p.marketing;
    return false;
}

export async function applyConsentToScripts(consent: CookieConsentState) {
    const registry = buildScriptRegistry();

    // enable allowed
    for (const s of registry) {
        const allowed = shouldEnableCategory(consent, s.category);
        const status = statusById.get(s.id) ?? "idle";

        if (allowed && status !== "loaded") {
            try {
                await s.load();
                statusById.set(s.id, "loaded");
            } catch {
                statusById.set(s.id, "error");
            }
        }
    }

    // disable not allowed (best effort)
    for (const s of registry) {
        const allowed = shouldEnableCategory(consent, s.category);
        const status = statusById.get(s.id) ?? "idle";

        if (!allowed && status === "loaded") {
            try {
                s.unload?.();
            } finally {
                statusById.set(s.id, "idle");
            }
        }
    }
}
