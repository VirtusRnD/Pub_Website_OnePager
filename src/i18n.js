import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 👑 JSON dosyalarını doğrudan içe aktarıyoruz
import translationTR from "./locales/tr/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  tr: {
    translation: translationTR,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  // Kullanıcının tarayıcı dilini (veya önceden seçip kaydettiği dili) otomatik algılar
  .use(LanguageDetector)
  // i18next'i React'e bağlar
  .use(initReactI18next)
  // Ayarları başlatır
  .init({
    resources,
    fallbackLng: "tr", // Algılanan dil desteklenmiyorsa varsayılan dil Türkçe olsun
    debug: false,

    interpolation: {
      escapeValue: false, // React XSS korumasını zaten yaptığı için buna gerek yok
    },

    detection: {
      // Dil tercihini tarayıcı belleğinde saklar, sayfa yenilense de dil kaybolmaz
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
