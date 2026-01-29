/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import CarFilters from "../components/CarFilters";
import { publicService } from "../services/public.service";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("All");
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await publicService.getAllVehicles();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Extract unique agency names for filter
  const agencies = [
    "All",
    ...new Set(cars.map((car) => car.agency_id?.name).filter(Boolean)),
  ];

  const filteredCars = cars.filter((car) => {
    const model = car.model || "";
    const brand = car.brand || "";
    const agencyName = car.agency_id?.name || "";

    const matchesSearch =
      model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency =
      selectedAgency === "All" || agencyName === selectedAgency;
    return matchesSearch && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CarFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedAgency={selectedAgency}
            setSelectedAgency={setSelectedAgency}
            agencies={agencies}
          />

          {/* Cars Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {!loading && filteredCars.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-500">
                No cars found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
