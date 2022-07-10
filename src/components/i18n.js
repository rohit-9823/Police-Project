import i18n from "i18next";
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      //translation file path
      loadPath: "/assests/i18n/{{ns}}/{{lng}}.json",
    },
    fallbacklng: "en",
    debug: true,
    // disabled in production
    debug: false,

    ns: "login",

    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
    },
  });
export default i18n;
