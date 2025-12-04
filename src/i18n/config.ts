import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const supported = ['en', 'fr', 'ar'];

/**
 * Custom language detection function
 * Detects browser language, normalizes it, and stores in localStorage
 */
function detectLanguage(): string {
  // Check if user has manually selected a language
  const saved = localStorage.getItem('lang');
  if (saved && supported.includes(saved)) {
    return saved;
  }

  // Detect browser language
  const browserLang = navigator.language || navigator.languages?.[0] || 'fr';
  const lang = browserLang.split('-')[0].toLowerCase();

  // Check if detected language is supported, otherwise default to French
  const finalLang = supported.includes(lang) ? lang : 'fr';
  
  // Store in localStorage for future visits
  localStorage.setItem('lang', finalLang);
  
  return finalLang;
}

/**
 * Apply language and direction to the document
 */
function applyLanguageSettings(lang: string): void {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Detect language before initializing i18n
const detectedLang = detectLanguage();
applyLanguageSettings(detectedLang);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar }
    },
    lng: detectedLang, // Set the detected language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    detection: {
      // Configure language detector
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage']
    },
    supportedLngs: supported
  });

// Listen for language changes to update document settings
i18n.on('languageChanged', (lng) => {
  applyLanguageSettings(lng);
  localStorage.setItem('lang', lng);
});

export default i18n;
