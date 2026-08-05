import React, { useState, useEffect, useRef } from "react";
import { useConfig } from "../hooks/useConfig";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SignatureMenu = () => {
  const { currentConfig } = useConfig();
  const { signatureMenu } = currentConfig;

  // 👑 SCROLL ANİMASYONU STATE'LERİ
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }, // Section'ın %15'i göründüğünde
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = signatureMenu?.images?.length || 4;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section
      id="signature-menu"
      ref={sectionRef} // Observer Referansı
      className="w-full bg-background text-text relative flex flex-col justify-between overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-10 bg-repeat bg-[length:400px] animate-bg-scroll"
        style={{
          backgroundImage: `url('images/seamless_signature.png')`,
        }}
      />

      <div className="relative w-full text-accent leading-0 z-10">
        <svg
          className="w-full block h-12.5 md:h-20 lg:h-30"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L0,10 C 350,150 1000,-50 1440,100 L1440,0 Z" />
        </svg>
      </div>

      <div className="relative mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-40 py-20 md:py-32 mb-20 grow flex items-center w-full z-20 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full">
          {/* 👑 SOL TARAF: Soldan sağa doğru gelerek belirme */}
          <div
            className={`w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <h3 className="font-serif text-5xl md:text-6xl lg:text-[4.5rem] text-accent mb-8 drop-shadow-sm leading-tight">
              {signatureMenu?.titleMain}
              <br />
              <span className="italic text-text font-light">
                {signatureMenu?.titleItalic}
              </span>
            </h3>

            <div className="min-h-[120px] md:min-h-[100px] mb-8">
              <p className="font-sans font-light text-base md:text-xl text-text/90 leading-relaxed">
                {signatureMenu?.slides?.[activeIndex]}
              </p>
            </div>

            <div className="flex items-center gap-8 mt-2">
              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full bg-surface text-text flex items-center justify-center hover:bg-cafe-oat hover:text-cafe-espresso transition-colors duration-300 shadow-lg cursor-pointer"
                >
                  <AiOutlineArrowLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full bg-surface text-text flex items-center justify-center hover:bg-cafe-oat hover:text-cafe-espresso transition-colors duration-300 shadow-lg cursor-pointer"
                >
                  <AiOutlineArrowRight size={24} />
                </button>
              </div>
              <span className="font-sans text-base tracking-[0.2em] text-text/60 font-medium">
                {padZero(activeIndex + 1)} / {padZero(totalSlides)}
              </span>
            </div>
          </div>

          {/* 👑 SAĞ TARAF: Sağdan sola doğru gelerek belirme (Gecikmeli) */}
          <div
            className={`w-full lg:w-7/12 relative h-[450px] md:h-[550px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <div className="relative w-72 h-[400px] md:w-[360px] md:h-[500px]">
              {signatureMenu?.images?.map((img, index) => {
                const offset =
                  (index - activeIndex + totalSlides) % totalSlides;
                let transformClasses = "";
                let zIndexClass = "";

                if (offset === 0) {
                  transformClasses =
                    "translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100";
                  zIndexClass = "z-40";
                } else if (offset === 1) {
                  transformClasses =
                    "translate-x-8 md:translate-x-12 translate-y-4 scale-95 rotate-[6deg] opacity-100";
                  zIndexClass = "z-30";
                } else if (offset === 2) {
                  transformClasses =
                    "translate-x-16 md:translate-x-24 translate-y-8 scale-90 rotate-[12deg] opacity-100";
                  zIndexClass = "z-20";
                } else {
                  transformClasses =
                    "-translate-x-16 translate-y-0 scale-105 -rotate-[6deg] opacity-0";
                  zIndexClass = "z-10";
                }

                return (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-text/20 ${transformClasses} ${zIndexClass}`}
                  >
                    <img
                      src={img}
                      alt={`Signature Menu ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureMenu;