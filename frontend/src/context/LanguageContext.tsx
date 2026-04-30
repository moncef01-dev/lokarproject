import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { en } from '../translations/en';
import { fr } from '../translations/fr';
import { useLocation, useNavigate } from 'react-router-dom';

type Language = 'fr' | 'en';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const translations: Record<Language, Translations> = { en, fr };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize language from URL or fallback to 'fr'
  useEffect(() => {
    const isEnglishRoute = location.pathname.startsWith('/en');
    setLanguageState(isEnglishRoute ? 'en' : 'fr');
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    // Replace URL path keeping everything else intact
    const currentPath = location.pathname;
    let newPath = currentPath;
    
    if (lang === 'en') {
      newPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
    } else {
      newPath = currentPath.replace(/^\/en/, '') || '/';
    }
    
    navigate(newPath + location.search + location.hash, { replace: true });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['fr'][key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
