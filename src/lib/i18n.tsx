import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translate, type DictKey, type Lang } from "./i18n-dict";

// ─────────────────────────────────────────────────────────────
// LANGUAGE PROVIDER — English / తెలుగు
// Choice is remembered in localStorage and applied to <html lang>.
// Wrap the app once with <LangProvider>; use useLang() anywhere.
// ─────────────────────────────────────────────────────────────

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: DictKey) => string;
  pick: (en: string, te: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "snsp-lang";

function initialLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "te" ? "te" : "en";
  } catch {
    return "en";
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — choice just won't persist */
    }
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "te" : "en"),
      t: (key: DictKey) => translate(key, lang),
      pick: (en: string, te: string) => (lang === "te" && te ? te : en),
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Safe fallback so components never crash outside the provider.
    return {
      lang: "en",
      setLang: () => {},
      toggle: () => {},
      t: (key: DictKey) => translate(key, "en"),
      pick: (en: string) => en,
    };
  }
  return ctx;
}

export type { Lang, DictKey };
