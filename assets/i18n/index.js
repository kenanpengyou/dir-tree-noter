import i18next from "i18next";
import resBundle from "i18next-resource-store-loader!./locales";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(LanguageDetector)
    .init({
         resources: resBundle
    });

export default i18next;
