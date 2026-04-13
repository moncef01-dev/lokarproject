
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
    <div className="bg-white py-24 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
          Trusted Network
        </h2>
        <h3 className="text-3xl font-bold text-[#0A1633] sm:text-4xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
          Browse Cars from Leading Brands
        </h3>
      </div>

      <div className="relative flex overflow-hidden w-full group">
        <div className="flex animate-marquee gap-20 whitespace-nowrap">
          {/* We duplicate the array to create a seamless infinite scroll loop */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-10 flex-shrink-0 transition-all duration-500 hover:scale-110 opacity-70 hover:opacity-100"
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default MovingLogosSection;
