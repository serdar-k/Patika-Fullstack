import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import tr from "./translations/tr.json";

const initialLang =
  localStorage.getItem("app-lang") || navigator.language || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  // lng: "en",
  fallbackLng: initialLang,

  interpolation: {
    escapeValue: false,
  },
});
