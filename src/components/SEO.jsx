import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = () => {
  const { t } = useTranslation();

  // JSON dosyalarından seo objesini çekiyoruz
  const seo = t("seo", { returnObjects: true });

  return (
    <Helmet>
      {/* Tarayıcı Sekme Başlığı */}
      <title>{seo?.title || "Lumière"}</title>

      {/* Google Arama Açıklaması */}
      <meta name="description" content={seo?.description} />

      {/* Sosyal Medya (WhatsApp, Instagram, Twitter) Paylaşım Kartları İçin */}
      <meta property="og:title" content={seo?.title} />
      <meta property="og:description" content={seo?.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
