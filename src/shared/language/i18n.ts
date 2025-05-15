import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationKA from "./locales/ka/translation.json";

i18n.use(initReactI18next).init({
    resources: {
        EN: { translation: translationEN },
        RU: { translation: translationRU },
        KA: { translation: translationKA },
    },
    fallbackLng: "EN",
    interpolation: { escapeValue: false },
    detection: {
        order: [],
        caches: [],
    },
});

export default i18n;
