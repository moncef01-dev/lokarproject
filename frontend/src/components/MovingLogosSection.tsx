import React from "react";

const logos = [
  "BMW",
  "MERCEDES",
  "AUDI",
  "VOLKSWAGEN",
  "PORSCHE",
  "TOYOTA",
  "KIA",
  "HYUNDAI",
];

const MovingLogosSection = () => {
  return (
    <div className="bg-white py-16 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
          Trusted by top global automotive brands
        </p>
      </div>

      <div className="group relative flex overflow-hidden w-full">
        <div className="flex animate-marquee gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {/* We duplicate the array to create a seamless infinite scroll loop */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 transition-colors duration-300 grayscale hover:grayscale-0"
            >
              <span className="text-3xl font-bold tracking-tight text-gray-800" style={{ fontFamily: "Orbitron, sans-serif" }}>
                {logo}
              </span>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default MovingLogosSection;
