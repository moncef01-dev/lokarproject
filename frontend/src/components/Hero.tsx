import React from "react";
import { MapPin, Calendar, Car, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[#C8102E] to-[#0A1633] pt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="z-10 text-white">
            <h2
              className="mb-6 text-5xl leading-tight font-bold md:text-6xl"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              RENT YOUR
              <br />
              <span className="text-gray-200">DREAM CAR</span>
            </h2>
            <p className="mb-8 text-xl text-gray-200">
              From the Best Local Agencies
            </p>

            {/* Search Widget */}
            <div className="space-y-4 rounded-lg bg-white p-6 shadow-2xl">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    Location/Agency
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-[#C8102E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-[#C8102E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <Car className="h-4 w-4" />
                    Car Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-[#C8102E]">
                    <option>All Types</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Sport</option>
                    <option>Economy</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => navigate("/cars")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] py-4 font-semibold text-white transition hover:bg-red-700"
              >
                <Search className="h-5 w-5" />
                Search Available Cars
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800"
              alt="Mercedes"
              className="w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
