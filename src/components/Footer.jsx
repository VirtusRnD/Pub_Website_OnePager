import React from "react";
import { useConfig } from "../hooks/useConfig";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

const Footer = () => {
  const { currentConfig } = useConfig();
  const { footer } = currentConfig;

  // 👑 GÜVENLİK KALKANI: footer?.days?.weekdays şeklinde '?' eklendi
  const formattedHours = [
    { day: footer?.days?.weekdays, time: "11:00-14:00 & 17:00-21:00" },
    { day: footer?.days?.wednesday, time: footer?.days?.closed },
    { day: footer?.days?.weekend, time: "10:00-14:00 & 16:00-21:00" },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-gradient-to-b from-surface to-background text-text pb-16 z-50"
    >
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[99%]">
        <svg
          className="relative block w-full h-[50px] md:h-[90px] text-surface"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C480,150 960,-20 1440,64 V120 H0 V64 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-32">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-surface/50"></span>
            <span className="text-xs tracking-[0.2em] uppercase font-sans text-text">
              {footer?.overline}
            </span>
            <span className="h-[1px] w-8 bg-surface/50"></span>
          </div>

          <h2 className="flex flex-col leading-none">
            <span className="font-sans font-bold text-5xl md:text-7xl text-transparent [-webkit-text-stroke:1px_var(--color-accent)] uppercase tracking-wide">
              {footer?.titleOutline}
            </span>
            <span className="font-serif italic font-light text-5xl md:text-7xl mt-2 text-text">
              {footer?.titleFilled}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-stretch justify-center max-w-5xl mx-auto">
          <div className="relative w-full h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden bg-background shadow-2xl">
            <iframe
              title="Lumière Location Map"
              src={footer?.map?.embedSrc}
              className="absolute -top-[100px] -left-[20px] w-[calc(100%+40px)] h-[calc(100%+150px)] border-0 opacity-80 [filter:grayscale(20%)_sepia(60%)__saturate(60%)_contrast(100%)]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="absolute z-10 bottom-6 left-6 md:bottom-8 md:left-8 bg-surface/90 backdrop-blur-md border border-surface/20 p-5 md:p-6 rounded-2xl max-w-[260px] shadow-xl">
              <h4 className="font-sans font-bold text-lg text-cafe-oat uppercase tracking-tight leading-tight">
                {footer?.addressTitle}
              </h4>
              <p className="font-serif italic text-cafe-oat/70 text-sm mb-4 mt-1">
                {footer?.addressSubtitle}
              </p>
              <a
                href={footer?.map?.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-bold font-sans uppercase tracking-widest text-cafe-cinnamon hover:text-white transition-colors"
              >
                {footer?.openInMaps} <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[400px] bg-cafe-espresso/50 border border-cafe-oat/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col gap-8 h-full justify-between">
            <div>
              <h5 className="text-[10px] tracking-[0.2em] font-bold text-cafe-oat/50 uppercase mb-4">
                {footer?.hoursTitle}
              </h5>
              <ul className="space-y-2">
                {formattedHours.map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:gap-2 font-sans text-sm md:text-base"
                  >
                    <span className="font-bold text-cafe-oat">{item.day}</span>
                    <span className="hidden sm:inline text-cafe-oat/30">•</span>
                    <span className="text-cafe-oat/80">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] tracking-[0.2em] font-bold text-cafe-oat/50 uppercase mb-2">
                {footer?.phoneTitle}
              </h5>
              <a
                // telefon linkindeki boşlukları silerken replace metodundan önce de güvenlik kalkanı ekliyoruz
                href={`tel:${footer?.contact?.phone?.replace(/\s+/g, "")}`}
                className="font-sans font-bold text-cafe-oat hover:text-cafe-cinnamon transition-colors text-lg"
              >
                {footer?.contact?.phone}
              </a>
            </div>

            <div>
              <h5 className="text-[10px] tracking-[0.2em] font-bold text-cafe-oat/50 uppercase mb-2">
                {footer?.emailTitle}
              </h5>
              <a
                href={`mailto:${footer?.contact?.email}`}
                className="font-sans font-bold text-cafe-oat hover:text-cafe-cinnamon transition-colors text-lg"
              >
                {footer?.contact?.email}
              </a>
            </div>

            <div>
              <h5 className="text-[10px] tracking-[0.2em] font-bold text-cafe-oat/50 uppercase mb-2">
                {footer?.ordersTitle}
              </h5>
              <a
                href={`mailto:${footer?.contact?.orders}`}
                className="font-sans font-bold text-cafe-oat hover:text-cafe-cinnamon transition-colors text-lg"
              >
                {footer?.contact?.orders}
              </a>
            </div>

            <div>
              <h5 className="text-[10px] tracking-[0.2em] font-bold text-cafe-oat/50 uppercase mb-4">
                {footer?.followTitle}
              </h5>
              <div className="flex items-center gap-6">
                <a
                  href={footer?.contact?.socials?.[0]?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cafe-oat hover:text-cafe-cinnamon transition-transform hover:-translate-y-1 duration-300"
                >
                  <AiOutlineInstagram size={28} />
                </a>
                <a
                  href={footer?.contact?.socials?.[1]?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cafe-oat hover:text-cafe-cinnamon transition-transform hover:-translate-y-1 duration-300"
                >
                  <AiOutlineWhatsApp size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif font-bold text-4xl md:text-6xl tracking-widest text-cafe-oat hover:text-cafe-cinnamon transition-colors cursor-pointer"
          >
            LUMIÈRE
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
