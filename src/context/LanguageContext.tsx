import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: (key) => key,
  dir: 'rtl',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [dir, setDir] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    let initialLang: Language = 'ar';
    const saved = localStorage.getItem('zoviq_language');
    
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      initialLang = saved as Language;
    } else if (navigator.language) {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'fr', 'ar'].includes(browserLang)) {
        initialLang = browserLang as Language;
      }
    }
    
    setLanguage(initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('zoviq_language', lang);
    const newDir = lang === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      if (result === undefined) break;
      result = result[k as keyof typeof result];
    }
    
    if (result !== undefined && typeof result === 'string') return result;
    
    let fallback: any = translations['en'];
    for (const k of keys) {
      if (fallback === undefined) break;
      fallback = fallback[k as keyof typeof fallback];
    }
    
    return typeof fallback === 'string' ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
