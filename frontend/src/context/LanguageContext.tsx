import { createContext, useContext } from "react";
import type { ReactNode, FC } from "react";
import { en } from "../translations/en";
import { fr } from "../translations/fr";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "fr" | "en";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  t: (
    key: keyof Translations,
    params?: Record<string, string | number>,
  ) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const translations: Record<Language, Translations> = { en, fr };

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive language directly from URL path
  const language: Language = location.pathname.startsWith("/en") ? "en" : "fr";

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    // 1. Strip existing /en prefix to get clean base path
    const cleanPath = location.pathname.replace(/^\/en(\/|$)/, "/").replace(/\/\/+$/, "/").replace(/\/$/, "") || "/";

    // 2. Apply language prefix
    const newPath = lang === "en" && cleanPath === "/" ? "/en" : lang === "en" ? `/en${cleanPath}` : cleanPath;

    navigate(newPath + location.search + location.hash, { replace: true });
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  const t = (
    key: keyof Translations,
    params?: Record<string, string | number>,
  ): string => {
    let text = translations[language][key] || translations["fr"][key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider
      value={{ language, t, setLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
