import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
// import LocalStorageBackend from "i18next-localstorage-backend";
import HttpApi from "i18next-http-backend";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(ChainedBackend)
    .init({
        debug: true,
        supportedLngs: ["ukr", "en"],
        fallbackLng: "ukr",
        ns: ["common", "pages", "components", "validation"],
        defaultNS: "pages",
        detection: {
            order: ["cookie", "navigator", "htmlTag"],
            caches: ["cookie"]
        },
        backend: {
            backends: [HttpApi], // на production додати local storage backend на першу позицію у масив
            backendOptions: [
                {
                    prefix: "i18next_res_",
                    expirationTime: 24 * 60 * 60 * 1000
                },
                {
                    loadPath: "locales/{{lng}}/{{ns}}.json"
                    // loadPath: 'http://localhost:5000/locales/{{lng}}/{{ns}}.json'
                }
            ]
        }
    });

export default i18n;
