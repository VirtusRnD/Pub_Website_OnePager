import React, { useState, useEffect, useRef } from "react";
import { useConfig } from "../hooks/useConfig";

const Menu = () => {
  const { currentConfig } = useConfig();
  const { menu } = currentConfig;

  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("beers");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative z-40 w-full bg-accent pt-24 pb-32 px-6 sm:px-12 md:px-20 lg:px-32"
    >
      {/* ==========================================
          🌊 TAM SENKRONİZE KÖPÜK VE KAHVE DALGASI
          ========================================== */}
      
      {/* 1. KATMAN: KÖPÜK DALGASI (Arkada ama dikeyde daha yukarıda) 
          Gecikme (delay) silindi. Artık ana dalgayı birebir kopyalayarak hareket ediyor.
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 -translate-y-[calc(100%+8px)] md:-translate-y-[calc(100%+12px)] z-10">
        <div className="flex w-[200%] animate-wave-ripple">
          <svg
            className="w-1/2 h-16 md:h-40 text-[#ebdcc4]" /* Köpük rengi */
            fill="currentColor"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
          >
            <path d="M0,25 Q250,0 500,25 T1000,25 L1000,50 L0,50 Z" />
          </svg>
          <svg
            className="w-1/2 h-16 md:h-40 text-[#ebdcc4]"
            fill="currentColor"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
          >
            <path d="M0,25 Q250,0 500,25 T1000,25 L1000,50 L0,50 Z" />
          </svg>
        </div>
      </div>

      {/* 2. KATMAN: ANA KAHVE DALGASI (Önde) 
          Köpük dalgasının alt kısmını örterek sadece üstteki 8-12 piksellik şeridi bırakır.
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 -translate-y-full z-20">
        <div className="flex w-[200%] animate-wave-ripple">
          <svg
            className="w-1/2 h-8 md:h-12 text-accent"
            fill="currentColor"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
          >
            <path d="M0,25 Q250,0 500,25 T1000,25 L1000,50 L0,50 Z" />
          </svg>
          <svg
            className="w-1/2 h-8 md:h-12 text-accent"
            fill="currentColor"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
          >
           <path d="M0,25 Q250,0 500,25 T1000,25 L1000,50 L0,50 Z" />
          </svg>
        </div>
      </div>
      {/* ========================================== */}

      <div className="max-w-7xl mx-auto relative z-30">
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 transition-all duration-1000 ease-out transform ${
            isSectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-8 bg-surface"></span>
              <span className="text-sm tracking-[0.2em] uppercase font-sans font-bold text-text-dark">
                {menu?.overline}
              </span>
            </div>
            <h2
              className={`flex flex-col leading-none text-background transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="font-serif italic font-light text-6xl md:text-[6rem] mb-3">
                {menu?.dynamicTitles?.[activeTab]?.italic}
              </span>
              <span className="font-sans font-bold text-6xl md:text-[6.5rem] uppercase tracking-tighter">
                {menu?.dynamicTitles?.[activeTab]?.bold}
              </span>
            </h2>
          </div>
          <div className="md:max-w-sm pl-6 border-l-2 border-background">
            <p className="font-sans font-light text-background/80 leading-relaxed text-sm md:text-base">
              {menu?.description}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-4 mb-16 transition-all duration-1000 delay-200 ease-out transform ${
            isSectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {menu?.tabs?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`inline-flex items-center justify-center border-2 h-11 px-7 rounded-full font-sans text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-surface text-text shadow-md"
                  : "bg-transparent border border-background/30 text-background hover:border-background"
              }`}
            >
              <span className="mt-[2px]">{tab.label}</span>
            </button>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 transition-all duration-500 ease-out transform ${
            !isSectionVisible
              ? "opacity-0 translate-y-12"
              : isAnimating
                ? "opacity-0 translate-y-8"
                : "opacity-100 translate-y-0"
          }`}
        >
          {menu?.items?.[activeTab]?.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-transparent [-webkit-text-stroke:1px_var(--color-text-dark)] uppercase tracking-wide">
                  {group.groupName}
                </h3>
                <span className="font-sans text-xs text-background/50 mb-1">
                  0{group.products.length}
                </span>
              </div>
              <hr className="border-t border-background/20 mb-8" />

              <div className="flex flex-col gap-10">
                {group.products.map((item) => (
                  <div key={item.id} className="flex items-center gap-5 group">
                    <div className="w-[5.5rem] h-[5.5rem] md:w-[7rem] md:h-[7rem] rounded-full bg-background/5 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-serif font-bold text-lg md:text-xl text-background mb-1 uppercase tracking-tight">
                        {item.name}
                      </h4>
                      <p className="font-sans italic text-background/70 text-[13px] md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;