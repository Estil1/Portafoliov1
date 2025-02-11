import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize with 'en' but will update from window.__LANGUAGE__ when available
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Get the language from window.__LANGUAGE__ if it exists
    if (typeof window !== 'undefined' && window.__LANGUAGE__) {
      setLanguage(window.__LANGUAGE__);
    }

    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam && ['en', 'es'].includes(langParam)) {
      setLanguage(langParam);
      window.__LANGUAGE__ = langParam;
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      window.__LANGUAGE__ = newLang;
      
      // Update URL params without refresh
      const params = new URLSearchParams(window.location.search);
      params.set('lang', newLang);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
