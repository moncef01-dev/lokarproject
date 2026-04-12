import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

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
    navigate("/cars");
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#0A1633] text-white"
      style={{ "--parallax-y": "0" } as React.CSSProperties}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E] via-[#8B0A1E] to-[#0A1633] opacity-90"></div>

      {/* Animated Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute -right-24 bottom-0 h-125 w-125 rounded-full bg-[#C8102E] opacity-20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto flex h-full flex-col justify-center px-4 pt-12 pb-12 max-lg:max-w-7xl max-lg:pt-40 sm:px-6 lg:px-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <div className="animate-fade-in-up z-10 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#C8102E]"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#C8102E] uppercase">
                  Premium Mobility Solutions
                </span>
              </div>
              
              <h1
                className="text-5xl leading-[1.1] font-bold tracking-tight sm:text-7xl lg:text-8xl"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                REDEFINING
                <br />
                <span className="bg-gradient-to-r from-white via-white/80 to-gray-500 bg-clip-text text-transparent">
                  MOBILITY.
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl font-medium">
                Discover a seamless way to rent. Lokar bridges the gap between premium car agencies and your next adventure.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleExplore}
                className="group flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-bold tracking-widest text-[#0A1633] shadow-2xl transition-all hover:scale-105 hover:bg-gray-100 uppercase"
              >
                Find Your Car
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/become-partner")}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-10 py-5 text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 uppercase"
              >
                Become Partner
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cars Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Partner Agencies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white flex items-center gap-1">
                  4.8<span className="text-[#C8102E] text-lg">★</span>
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-12 flex justify-center lg:mt-0">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-white/10 to-transparent blur-3xl opacity-30"></div>

            {/* Parallax Container */}
            <div 
              className="relative z-10 w-full max-w-2xl transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: "translateY(calc(var(--parallax-y) * 0.05px))" }}
            >
              {/* Animation Layer (Slow Zoom + Hover Scale) */}
              <div className="group/car relative overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-in-out hover:scale-[1.02]">
                <div className="animate-slow-zoom duration-[10s] infinite ease-in-out">
                  <img
                    src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200"
                    alt="Luxury Sports Car"
                    className="w-full object-cover grayscale-[0.2] transition-all duration-700 group-hover/car:grayscale-0"
                  />
                </div>

                {/* Cinematic Gradient Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(10,22,51,0.8), rgba(10,22,51,0.2), transparent)"
                  }}
                ></div>

                {/* Light Sweep / Reflection Effect */}
                <div className="absolute inset-0 animate-light-sweep pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-[0.08] duration-[8s] infinite ease-in-out"></div>
              </div>

              {/* Floating UI Cards */}
              <div className="absolute -bottom-10 -left-10 animate-float delay-700 transition-all">
                <div className="glass-card-dark rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#C8102E]/20 flex items-center justify-center border border-[#C8102E]/30">
                      <div className="h-4 w-4 rounded-full bg-[#C8102E] animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting From</p>
                      <p className="text-xl font-bold text-white">4500 DZD <span className="text-xs text-gray-500">/day</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-10 -right-6 animate-float transition-all">
                <div className="glass-card rounded-2xl p-4 shadow-xl ring-1 ring-white/20">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#0A1633] uppercase">Recent Booking</p>
                      <p className="text-xs font-bold text-gray-600">Porsche 911 GT3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
