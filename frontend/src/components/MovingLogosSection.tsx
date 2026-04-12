import React from "react";

const logos = [
  { name: "BMW", path: "/carLogos/BMW-logo.png" },
  { name: "Porsche", path: "/carLogos/Porsche-logo.png" },
  { name: "Volkswagen", path: "/carLogos/Volkswagen-logo.png" },
  { name: "Audi", path: "/carLogos/audi-logo.png" },
  { name: "Chevrolet", path: "/carLogos/chevrolet-logo.png" },
  { name: "Fiat", path: "/carLogos/fiat-logo.png" },
  { name: "Kia", path: "/carLogos/kia-logo.png" },
  { name: "Land Rover", path: "/carLogos/landRover-logo.png" },
  { name: "Mercedes", path: "/carLogos/mercedess-logo.png" },
  { name: "Nissan", path: "/carLogos/nissan-logo.png" },
  { name: "Seat", path: "/carLogos/seat-logo.png" },
  { name: "Toyota", path: "/carLogos/toyota-logos.png" },
];

const MovingLogosSection = () => {
  return (
    <div className="bg-white py-20 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold tracking-widest text-[#0A1633] uppercase opacity-60">
          Discover our world-class marques
        </p>
      </div>

      <div className="relative flex overflow-hidden w-full">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {/* We duplicate the array to create a seamless infinite scroll loop */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-10 flex-shrink-0"
            >
              <img
                src={logo.path}
                alt={logo.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
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
