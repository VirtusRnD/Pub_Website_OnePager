import React from "react";
import { useConfig } from "../hooks/useConfig";

const OurStory = () => {
  const { currentConfig } = useConfig();
  const { ourStory } = currentConfig;

  return (
    <section
      id="our-story"
      className="w-full pt-24 md:pt-32 flex flex-col items-center justify-center bg-background relative overflow-hidden"
    >
      {/* 👑 METİN İÇERİK KAPSAYICISI (px-6 buraya taşındı, böylece fıçı tam genişlik kalacak) */}
      <div className="w-full max-w-2xl px-6 flex flex-col items-center text-center">
        {/* Üst Başlık (Overline) ve Çizgiler */}
        <div className="flex items-center gap-4 mb-10">
          <span className="h-px w-8 md:w-12 bg-background opacity-40"></span>
          <span className="text-xs md:text-sm tracking-[0.25em] uppercase font-sans text-heading/80">
            {ourStory?.subtitle}
          </span>
          <span className="h-px w-8 md:w-12 bg-background opacity-40"></span>
        </div>

        {/* Ana Başlık (Tipografi Oyunu) */}
        <h2 className="flex flex-col items-center justify-center leading-none mb-12">
          <span className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] pl-[0.025em] tracking-wide uppercase text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)] pb-2">
            {ourStory?.titleOutline}
          </span>

          <span className="font-serif italic text-3xl md:text-5xl lg:text-[4rem] text-heading md:-mt-3.75 -mt-2.5">
            {ourStory?.titleFilled}
          </span>
        </h2>

        {/* Açıklama Paragrafları */}
        <div className="flex flex-col gap-6 items-center text-text/80 max-w-2xl mx-auto text-center mb-16">
          {ourStory?.paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className="font-sans font-light text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>

      {/* 🍺 FIÇI GEÇİŞ GÖRSELİ (CustomerReviews ile birebir aynı tam genişlikte z-20 yapısı) */}
      <div className="relative w-full z-20">
        <img
          src="images/barrel_bottom.webp"
          alt="Barrel Transition"
          className="scale-101 rotate-180 w-full h-auto relative z-20 drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default OurStory;