import React, { useEffect, useState } from "react";
import { useConfig } from "../hooks/useConfig";

const Hero = () => {
  const { currentConfig } = useConfig();
  const { hero } = currentConfig;

  // 👑 State'ler: İlk yüklenme animasyonları ve Parallax kaydırma takibi
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Sayfa yüklendiğinde ilk giriş animasyonunu tetikle
    setIsLoaded(true);

    // Kaydırma miktarını dinleyerek parallax pozisyonunu güncelle
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-150 flex items-center overflow-hidden">
      {/* 👑 PARALLAX + ZOOM-OUT BACKGROUND
          - scale-125 -> scale-100 ile ilk açılışta görsel uzaklaşır.
          - translateY ile kaydırdıkça görsel arka planda daha yavaş süzülür (Parallax).
      */}
      <div
        className={`absolute inset-0 w-full h-[120%] bg-cover bg-center transition-transform duration-1000 ease-out will-change-transform ${
          isLoaded ? "scale-100" : "scale-125"
        }`}
        style={{
          backgroundImage: `url('images/hero.webp')`,
          transform: `translate3d(0, ${scrollY * 0.4}px, 0) ${
            isLoaded ? "scale(1)" : "scale(1.25)"
          }`,
        }}
      />

      {/* Karartma / Gradient Katmanı */}
      <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/60 to-transparent z-1" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center">
        <div className="max-w-xl">
          {/* 👑 FADE-IN-UP: Başlık Alanı */}
          <h1
            className={`font-serif text-text flex flex-col gap-1 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-6xl md:text-7xl lg:text-8xl tracking-widest uppercase font-light">
              {hero?.titleMain}
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl italic">
              {hero?.titleItalic}
            </span>
          </h1>

          {/* 👑 FADE-IN-UP: Ayraç (Delay: 200ms) */}
          <div
            className={`flex items-center gap-3 my-6 opacity-60 transition-all duration-1000 delay-200 ease-out ${
              isLoaded
                ? "opacity-60 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="h-px w-10 bg-cafe-oat"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-cafe-oat"></div>
            <div className="h-px w-10 bg-cafe-oat"></div>
          </div>

          {/* 👑 FADE-IN-UP: Açıklama Metni (Delay: 400ms) */}
          <p
            className={`font-sans text-text/90 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light transition-all duration-1000 delay-400 ease-out ${
              isLoaded
                ? "opacity-90 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {hero?.description}
          </p>

          {/* 👑 FADE-IN-UP: Buton (Delay: 600ms) */}
          <div
            className={`transition-all duration-1000 delay-600 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#menu"
              className="inline-block bg-surface hover:bg-accent text-text hover:text-surface px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 shadow-md"
            >
              {hero?.ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;