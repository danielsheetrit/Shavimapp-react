import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import useAuth from "../hooks/useAuth";

// Import your language files
import english from "../languages/en.json";
import hebrew from "../languages/he.json";
// import hebrew from './locales/he.json';
// import arabic from './locales/ar.json';
// import russian from './locales/ru.json';

// Define the shape of your context state
type TranslationsType = typeof english;

interface LanguageContextProps {
  language: "en" | "he" | "ar" | "ru";
  translations: TranslationsType;
  setLanguage: (language: "en" | "he" | "ar" | "ru") => void;
}

// Create the context
export const LanguageContext = createContext<LanguageContextProps | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "he" | "ar" | "ru">("en");
  const [translations, setTranslations] = useState<TranslationsType>(english);
  const { user } = useAuth();

  // Load the appropriate translations based on the selected language
  const handleTranslations = useCallback(() => {
    const html = document.querySelector("html");

    if (!html) return;

    let translations = english;
    switch (language) {
      case "en":
        translations = english;
        html.dir = "ltr";
        break;
      case "he":
        // translations = hebrew;
        // html.dir = "rtl";
        break;
      case "ar":
        // translations = arabic;
        html.dir = "rtl";
        break;
      case "ru":
        // translations = russian;
        html.dir = "ltr";
        break;
      default:
        translations = english;
    }

    setTranslations(translations);
  }, [language]);

  useEffect(() => {
    if (language) {
      handleTranslations();
    }
  }, [language, handleTranslations]);

  useEffect(() => {
    if (user) {
      setLanguage(user.language);
    }
  }, [user]);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
