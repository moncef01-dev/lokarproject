import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(() => {
        if (heroRef.current) {
          heroRef.current.style.setProperty("--parallax-y", `${window.scrollY}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const handleExplore = () => {
    navigate(language === 'en' ? "/en/cars" : "/cars");
  };

  return (
    <div 
      ref={heroRef}
      className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-black text-white"
      style={{ "--parallax-y": "0" } as React.CSSProperties}
    >
      {/* Background Layer: Cinematic Image + Slow Zoom */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full animate-slow-zoom duration-[8s] infinite linear opacity-80"
          style={{ transform: "translateY(calc(var(--parallax-y) * 0.05px)) scale(1.05)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80"
            alt="Luxury Automotive"
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Dark Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content Layer: Centered & Cinematic */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8 text-center">
        <div className="animate-fade-in-up flex flex-col items-center space-y-10 sm:space-y-12">
          
          <div className="space-y-6">
            <h1
              className={`${language === 'fr' ? 'text-[28px] sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[80px]' : 'text-4xl sm:text-6xl lg:text-7xl xl:text-[100px]'} font-black uppercase tracking-tighter leading-[1.1] sm:leading-[1.05]`}
            >
              <span className="block mb-1 sm:mb-2">{t("hero.title1")}</span>
              <span className="bg-gradient-to-r from-white via-white/80 to-gray-400 bg-clip-text text-transparent block text-balance mx-auto">
                {t("hero.title2")}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-medium tracking-tight text-gray-300 sm:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <button
              onClick={handleExplore}
              className="group flex items-center justify-center gap-3 rounded-full bg-white px-12 py-5 text-sm font-bold tracking-widest text-[#0A1633] shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:bg-gray-100 uppercase"
            >
              {t("hero.btn.browse")}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate(language === 'en' ? "/en/become-partner" : "/become-partner")}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-12 py-5 text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 uppercase"
            >
              {t("hero.btn.partner")}
            </button>
          </div>

          {/* Trust Signals Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 text-sm font-bold tracking-[0.15em] text-white/60 uppercase">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C8102E]" strokeWidth={3} />
              {t("hero.trust.verified")}
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C8102E]" strokeWidth={3} />
              {t("hero.trust.noHidden")}
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-10 py-5 rounded-full border-2 border-white/20 backdrop-blur-2xl hover:bg-white/15 transition-all hover:scale-105 active:scale-95 cursor-default group">
              <div className="flex gap-3 mr-5 bg-white/10 p-2 rounded-lg">
                <img src="/assets/cib.svg" alt="CIB" className="h-6 w-auto brightness-0 invert opacity-100" />
                <img src="/assets/edahabia.svg" alt="Edahabia" className="h-6 w-auto brightness-0 invert opacity-100" />
              </div>
              <span className="text-sm sm:text-base text-white font-black tracking-[0.1em] uppercase">{t("hero.trust.payOnline")}</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="h-10 w-6 rounded-full border-2 border-white flex justify-center p-1">
          <div className="h-2 w-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
