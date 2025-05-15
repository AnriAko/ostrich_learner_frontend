import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationKA from "./locales/ka/translation.json";
import UserStorage from "../storage/user-storage";

i18n.use(initReactI18next).init({
    resources: {
        EN: { translation: translationEN },
        RU: { translation: translationRU },
        KA: { translation: translationKA },
    },
    lng: UserStorage.getInterfaceLanguage() || "en",

    fallbackLng: "EN",
    interpolation: { escapeValue: false },
    detection: {
        order: [],
        caches: [],
    },
});

export default i18n;
