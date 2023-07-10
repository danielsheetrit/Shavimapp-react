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
// import arabic from './locales/ar.json';
// import russian from './locales/ru.json';

// Define the shape of your context state
type TranslationsType = typeof english;
type languageType = "en" | "he" | "ar" | "ru" | null;
interface LanguageContextProps {
  language: languageType;
  translations: TranslationsType;
  setLanguage: (language: "en" | "he" | "ar" | "ru") => void;
  direction: "left" | "right";
}

// Create the context
export const LanguageContext = createContext<LanguageContextProps | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<languageType>(null);
  const [translations, setTranslations] = useState<TranslationsType>(english);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const { user } = useAuth();

  // Load the appropriate translations based on the selected language
  const handleTranslations = useCallback(() => {
    const html = document.querySelector("html");

    if (!html) return;

    let translations = english;
    let direction = "";
    switch (language) {
      case "en":
        translations = english;
        direction = "ltr";
        break;
      case "he":
        translations = hebrew;
        direction = "rtl";
        break;
      case "ar":
        // translations = arabic;
        direction = "rtl";
        break;
      case "ru":
        // translations = russian;
        direction = "ltr";
        break;
      default:
        translations = english;
    }

    // setD
    html.dir = direction;
    setDirection(direction === "ltr" ? "left" : "right");
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
    <LanguageContext.Provider
      value={{ language, translations, setLanguage, direction }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
