import { useContext } from "react";
import { LanguageContext } from "../contexts/I18nContext";

// ----------------------------------------------------------------------

const useI18n = () => {
  const context = useContext(LanguageContext);

  if (!context)
    throw new Error("Language context must be use inside LanguageProvider");

  return context;
};

export default useI18n;
