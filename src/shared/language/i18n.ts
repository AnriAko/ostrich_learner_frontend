import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";
import translationKA from "./locales/ka/translation.json";
import UserStorage from "../storage/user-storage";
import { INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY } from "../context/language-context/interface-language-local-storage";

const storedLang = localStorage.getItem(INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY);
const userLang = UserStorage.getInterfaceLanguage();

const normalizeLang = (lang: string | null) => {
    const code = lang?.toLowerCase();
    if (code === "en" || code === "ru" || code === "ka") return code;
    return null;
};

const initialLang =
    normalizeLang(storedLang) || normalizeLang(userLang) || "en";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: translationEN },
        ru: { translation: translationRU },
        ka: { translation: translationKA },
    },
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
        order: [],
        caches: [],
    },
});

export default i18n;
