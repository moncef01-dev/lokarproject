import React from "react";
import { useNavigate } from "react-router-dom";
import { carBrands } from "../data/mockData";

const BrandSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3
            className="mb-4 text-4xl font-bold text-[#0A1633]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            / WANT SEARCH
          </h3>
          <p className="text-gray-600">Browse cars by your favorite brands</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-6 md:grid-cols-5 lg:grid-cols-6">
          {carBrands.map((brand, index) => (
            <button
              key={index}
              className="group flex flex-col items-center justify-center rounded-xl bg-gray-50 p-6 transition hover:bg-[#C8102E] hover:text-white"
              onClick={() => navigate("/cars")}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="mb-3 h-16 w-16 rounded-full object-cover shadow-sm transition-transform group-hover:scale-110"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white">
                {brand.name}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/cars")}
            className="rounded-lg bg-[#C8102E] px-8 py-3 text-white transition hover:bg-red-700"
          >
            See All Brands
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
