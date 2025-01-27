import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations/en.json";
import de from "./translations/de.json";
import nl from "./translations/nl.json";
import ar from "./translations/ar.json";
import it from "./translations/it.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      nl: { translation: nl },
      be: { translation: nl },
      ar: { translation: ar },
      it: { translation: it },
      fr: { translation: fr },
      es: { translation: es },
    },
    fallbackLng: "en", // Default language if the detected language is not available
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
