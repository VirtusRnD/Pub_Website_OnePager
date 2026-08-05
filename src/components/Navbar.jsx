import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LanguageSwitcher from "./LanguageSwitcher";
import { useConfig } from "../hooks/useConfig";

const Navbar = () => {
  const { currentConfig } = useConfig();
  const { common } = currentConfig; // Çevirileri çek
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleNav = useCallback(() => {
    setNav((prev) => !prev);
  }, []);

  const scrollToSection = (sectionId) => {
    if (nav) setNav(false);

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY < 50) setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const sections = ["hero", "our-story", "menu", "reviews"];
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -40% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.scrollY >= 50) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Metinler çeviriden geliyor
  const navItems = useMemo(
    () => [
      { id: "hero", label: common?.home },
      { id: "our-story", label: common?.ourStory },
      { id: "reviews", label: common?.reviews },
      { id: "menu", label: common?.menu },
    ],
    [common],
  );

  return (
    <>
      <div
        // 👑 ÇÖZÜM BURADA: z-50 değeri z-[100] olarak değiştirildi.
        // Artık Footer (z-50) dahil hiçbir şey Navbar'ın üstüne çıkamaz.
        className={`fixed top-0 left-0 w-full h-[72px] z-[100] transition-all duration-500
        ${
          scrolled
            ? "bg-background/90 border-b border-surface/20 shadow-sm backdrop-blur-md text-text"
            : "bg-transparent border-b border-transparent text-white drop-shadow-md"
        }`}
      >
        <div className="absolute lg:right-8 lg:left-auto left-6 top-1/2 -translate-y-1/2 z-[160] flex items-center">
          <LanguageSwitcher />
        </div>

        <div className="relative flex justify-end lg:justify-between items-center h-full pl-4 pr-6 lg:pl-8 lg:pr-24 max-w-[1240px] mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 xl:-translate-x-15 flex flex-col justify-center items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer focus:outline-none font-serif font-bold text-2xl tracking-widest ml-10 transition-colors duration-500"
            >
              LUMIÈRE
            </button>
          </div>

          <ul className="hidden lg:flex font-medium mx-auto uppercase tracking-[0.05em] pl-[0.05em] text-sm items-center gap-2">
            {navItems.map((item) => (
              <li key={item.id} className="font-sans p-4">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`pb-1 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "border-b-2 border-cafe-cinnamon text-cafe-cinnamon font-bold"
                      : "hover:text-cafe-cinnamon hover:cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex lg:hidden justify-end items-center z-[150]">
            <div onClick={handleNav} className="cursor-pointer p-1">
              {nav ? (
                <AiOutlineClose size={24} className="text-current" />
              ) : (
                <AiOutlineMenu size={24} className="text-current" />
              )}
            </div>
          </div>
        </div>
      </div>

      {nav && (
        <div
          onClick={handleNav}
          className="fixed inset-0 w-full h-full bg-black/40 z-[140] transition-all duration-300 backdrop-blur-sm"
        />
      )}

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[80%] max-w-[350px] h-screen border-r border-cafe-cinnamon/20 bg-cafe-oat ease-in-out duration-500 z-[150] p-8 shadow-2xl flex flex-col text-cafe-espresso"
            : "fixed -left-full top-0 h-screen w-0 p-8 bg-cafe-oat ease-in-out duration-500 z-[150] text-cafe-espresso"
        }
      >
        <div className="mb-12 select-none">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-serif font-bold text-2xl tracking-widest text-cafe-espresso"
          >
            LUMIÈRE
          </button>
        </div>

        <ul className="text-cafe-espresso uppercase tracking-widest text-sm font-medium space-y-4 flex-grow">
          {navItems.map((item) => (
            <li key={item.id} className="border-b border-cafe-espresso/10 pb-4">
              <button
                onClick={() => {
                  scrollToSection(item.id);
                  setNav(false);
                }}
                className={`block w-full text-left cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? "text-cafe-cinnamon font-bold"
                    : "hover:text-cafe-cinnamon"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
