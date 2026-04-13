/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { publicService } from "../services/public.service";

const FeaturedCarsSection = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await publicService.getAllVehicles();
        setFeaturedCars(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

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
          <p className="text-gray-600 font-medium">
            Explore our top-rated vehicles from verified agencies
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[#0A1633] uppercase tracking-[0.2em] opacity-60">
            <span className="h-px w-8 bg-gray-200"></span>
            Pay Online with CIB / Edahabia
            <span className="h-px w-8 bg-gray-200"></span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.length > 0 ? (
              featuredCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No cars available at the moment.
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/cars")}
            className="mx-auto flex items-center gap-2 rounded-lg bg-[#C8102E] px-10 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            View All Cars
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarsSection;
