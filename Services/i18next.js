import i18next from "i18next/index.v4";
import { initReactI18next } from "react-i18next";
import en from "try3/src/locales/en.json";
import ar from "try3/src/locales/ar.json";
import he from "try3/src/locales/he.json";


const languageResources = {
    en: { translation: en },
    ar: { translation: ar },
    he: { translation: he }
};

i18next.use(initReactI18next) // passes i18next instance to react-i18next
    .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources : languageResources,
});



export default i18next;
