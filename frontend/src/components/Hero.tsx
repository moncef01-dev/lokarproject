import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/cars");
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#0A1633] text-white">
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
            <div className="space-y-4">
              {/* <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium backdrop-blur-md">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">Premium Car Rental Service</span>
              </div> */}

              <h1
                className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                FIND AND BOOK
                <br />
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  RENTAL CARS IN SECONDS.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl border-l-4 border-[#C8102E] pl-4">
                Browse verified agencies, compare prices, and reserve instantly.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleExplore}
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#C8102E] shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
              >
                Browse Cars
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/become-partner")}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Become Partner
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium pt-4">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-1"><Check className="h-4 w-4 text-white" /></div>
                Verified agencies
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-1"><Check className="h-4 w-4 text-white" /></div>
                No hidden fees
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-1"><Check className="h-4 w-4 text-white" /></div>
                Fast booking
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-12 flex justify-center lg:mt-0">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-white/10 to-transparent blur-2xl"></div>

            <div className="relative z-10 w-full max-w-150 transform transition-transform duration-500 hover:scale-105 max-lg:hidden">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800"
                alt="Luxury Sports Car"
                className="w-full drop-shadow-2xl"
              />

              <div className="absolute top-0 -right-4 animate-pulse rounded-xl bg-white/10 p-4 backdrop-blur-md sm:top-20 sm:-right-8">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-300">
                    Daily Rate
                  </p>
                  <p className="text-xl font-bold text-white">From DZD 4500</p>
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
