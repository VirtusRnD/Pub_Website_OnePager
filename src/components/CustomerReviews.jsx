import React, { useEffect, useRef, useState } from "react";
import { useConfig } from "../hooks/useConfig";

const CustomerReviews = () => {
  const { currentConfig } = useConfig();
  const { reviews } = currentConfig;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const leftTiltClasses = [
    "-rotate-3 -translate-y-4",
    "rotate-2 translate-x-4 translate-y-6",
  ];
  const rightTiltClasses = [
    "rotate-3 translate-y-8",
    "-rotate-2 -translate-x-6",
  ];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full flex flex-col bg-background items-center z-30 -mt-12 md:-mt-24"
    >
      <div className="relative w-full z-20">
        <img
          src="images/barrel_bottom.webp"
          alt="Barrel Transition"
          className="scale-101 w-full h-auto relative z-20 drop-shadow-2xl"
        />
      </div>

      <div className="relative w-full bg-background flex flex-col items-center -mt-12 md:-mt-24 z-10 pt-32 pb-32">
        {/* 🍺 SIVI VE BEYAZ KÖPÜK AKIŞ ALANI */}
        <div
          className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-[120px] z-0 transition-all ${
            !isVisible ? "[animation-play-state:paused]" : ""
          }`}
        >
          {/* Akıp giden ana sıvı kanalı */}
          <div className="absolute inset-0 bg-accent coffee-stream z-0" />

          {/* 👑 EN ÜSTTEKİ DALGALI BEYAZ KÖPÜK KATMANI */}
          <div
            className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-white z-10 pointer-events-none drop-shadow-sm"
            style={{
              maskImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 120 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L 120 0 L 120 12 C 105 24, 90 4, 75 16 C 60 28, 45 6, 30 18 C 15 28, 0 8, 0 16 Z\' fill=\'black\'/%3E%3C/svg%3E")',
              WebkitMaskImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 120 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L 120 0 L 120 12 C 105 24, 90 4, 75 16 C 60 28, 45 6, 30 18 C 15 28, 0 8, 0 16 Z\' fill=\'black\'/%3E%3C/svg%3E")',
              maskSize: "200% 100%",
              WebkitMaskSize: "200% 100%",
              maskRepeat: "repeat-x",
              WebkitMaskRepeat: "repeat-x",
              animation: "wave-ripple 4s linear infinite",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center mb-24 px-6">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-8 bg-text"></span>
            <span className="text-xs tracking-[0.2em] pl-[0.2em] uppercase font-sans text-text">
              {reviews?.overline}
            </span>
            <span className="h-px w-8 bg-text"></span>
          </div>
          <h2 className="font-serif italic font-light text-4xl md:text-5xl text-text leading-tight">
            {reviews?.title}
          </h2>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-16 md:gap-y-32 mt-8">
          <div className="flex flex-col items-center md:items-end gap-16 md:gap-32">
            {reviews?.testimonials?.slice(0, 2).map((item, index) => (
              <div
                key={item.id}
                className={`group relative w-full max-w-[340px] h-[280px] perspective-[1000px] cursor-pointer transition-transform duration-500 ${leftTiltClasses[index]}`}
              >
                <div className="relative w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)] shadow-xl rounded-3xl">
                  <div className="absolute inset-0 w-full h-full bg-surface rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-cafe-cinnamon/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-[3px] border-black shadow-sm"
                    />
                    <h4 className="font-sans font-bold text-xl text-text uppercase tracking-tight mb-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                          key={starIndex}
                          src={
                            starIndex <= item.rating
                              ? "images/beer_filled.webp"
                              : "images/beer_empty.webp"
                          }
                          alt={
                            starIndex <= item.rating
                              ? "Filled Beer"
                              : "Empty Beer"
                          }
                          className="w-7 md:w-9 h-7 md:h-9 object-contain"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 w-full h-full bg-surface rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden transform-[rotateY(180deg)] text-text shadow-inner">
                    <span className="text-6xl font-serif leading-none mb-2 opacity-50">
                      “
                    </span>
                    <p className="font-serif italic text-lg leading-relaxed px-2">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block w-10 md:w-[120px]"></div>

          <div className="flex flex-col items-center md:items-start gap-16 md:gap-32">
            {reviews?.testimonials?.slice(2, 4).map((item, index) => (
              <div
                key={item.id}
                className={`group relative w-full max-w-[340px] h-[280px] perspective-[1000px] cursor-pointer transition-transform duration-500 ${rightTiltClasses[index]}`}
              >
                <div className="relative w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)] shadow-xl rounded-3xl">
                  <div className="absolute inset-0 w-full h-full bg-surface rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-text/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-[3px] border-black shadow-sm"
                    />
                    <h4 className="font-sans font-bold text-xl text-text uppercase tracking-tight mb-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                          key={starIndex}
                          src={
                            starIndex <= item.rating
                              ? "images/beer_filled.webp"
                              : "images/beer_empty.webp"
                          }
                          alt={
                            starIndex <= item.rating
                              ? "Filled Beer"
                              : "Empty Beer"
                          }
                          className="w-7 md:w-9 h-7 md:h-9 object-contain"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 w-full h-full bg-surface rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden transform-[rotateY(180deg)] text-text shadow-inner">
                    <span className="text-6xl font-serif leading-none mb-2 opacity-50">
                      “
                    </span>
                    <p className="font-serif italic text-lg leading-relaxed px-2">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;