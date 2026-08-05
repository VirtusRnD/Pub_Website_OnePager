import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "tr";
  const isTurkish = currentLang.toLowerCase().startsWith("tr");

  const toggleLanguage = () => {
    const nextLang = isTurkish ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm tracking-[0.2em] py-[0.1em] uppercase font-bold text-current hover:text-cafe-cinnamon transition-colors duration-300 cursor-pointer"
      aria-label="Language Switcher"
    >
      {isTurkish ? "TR" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
