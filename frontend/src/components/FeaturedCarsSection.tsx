import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { allCars } from "../data/mockData";

const FeaturedCarsSection = () => {
  const navigate = useNavigate();
  const featuredCars = allCars.slice(0, 6);

  return (
    <div id="browse" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3
            className="mb-4 text-4xl font-bold text-[#0A1633]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            OUR FEATURED
            <br />
            CARS
          </h3>
          <p className="text-gray-600">
            Explore our top-rated vehicles from verified agencies
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/cars")}
            className="mx-auto flex items-center gap-2 rounded-lg bg-[#C8102E] px-10 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            View All Available Cars
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarsSection;
