// ─────────────────────────────────────────────────────────────
// GOOGLE TRANSLATE (full-page Telugu)
// Loads Google's free Translate Element and switches it via the
// "googtrans" cookie + one page reload — the reliable way to do
// it inside a React SPA. The hand-written dictionary in
// i18n-dict.ts still takes priority for the main UI chrome;
// Google Translate covers EVERYTHING else (products, articles…).
// ─────────────────────────────────────────────────────────────

const COOKIE = "googtrans";
const SCRIPT_ID = "google-translate-script";
let injected = false;

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${value};path=/;SameSite=Lax`;
}

/** Cookie value that makes Google render the page in Telugu. */
function cookieFor(lang: "en" | "te"): string {
  return lang === "te" ? "/en/te" : "/en/en";
}

/**
 * Switch full-page Google translation to `lang`.
 * Saves the googtrans cookie and reloads once (no-op if already in sync).
 */
export function googleTranslateTo(lang: "en" | "te"): void {
  const target = cookieFor(lang);
  if (getCookie(COOKIE) === target) return;
  setCookie(COOKIE, target);
  window.location.reload();
}

/**
 * Called once on app start: sync the cookie with the saved choice
 * (reloading if it changed), then inject Google's script so a saved
 * Telugu choice auto-translates the page on load.
 */
export function syncGoogleTranslate(lang: "en" | "te"): void {
  const target = cookieFor(lang);
  if (getCookie(COOKIE) !== target) {
    setCookie(COOKIE, target);
    window.location.reload();
    return;
  }
  if (injected || document.getElementById(SCRIPT_ID)) return;
  injected = true;

  // Hidden target element the widget renders into (kept invisible via CSS).
  if (!document.getElementById("google_translate_element")) {
    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    document.body.appendChild(holder);
  }

  window.googleTranslateElementInit = () => {
    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "te",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    } catch {
      /* Google unavailable — the manual dictionary toggle still works */
    }
  };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
}