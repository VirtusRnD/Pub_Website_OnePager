import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { config } from "../config";

export const useConfig = () => {
  const { t, i18n } = useTranslation();
  const activeLang = i18n.language?.startsWith("en") ? "en" : "tr";

  const currentConfig = useMemo(() => {
    return {
      hero: t("hero", { returnObjects: true }),
      home: t("home", { returnObjects: true }),
      ourStory: t("ourStory", { returnObjects: true }),
      ourStoryHero: t("ourStoryHero", { returnObjects: true }),
      reviewsHero: t("reviewsHero", { returnObjects: true }),
      menuHero: t("menuHero", { returnObjects: true }),
      signatureMenu: {
        ...t("signatureMenu", { returnObjects: true }),
        images: config.signatureMenu.images, // 👑 Görselleri buraya bağladık
      },
      reviews: t("reviews", { returnObjects: true }),
      menu: t("menu", { returnObjects: true }),
      common: t("common", { returnObjects: true }),
      footer: {
        ...t("footer", { returnObjects: true }),
        map: config.map,
        contact: config.contact,
      },
    };
  }, [t]);

  return {
    currentConfig,
    activeLang,
  };
};

export default useConfig;