import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import CarFilters from "../components/CarFilters";
import { allCars } from "../data/mockData";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("All");

  const agencies = ["All", ...new Set(allCars.map((car) => car.agency))];

  const filteredCars = allCars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency =
      selectedAgency === "All" || car.agency === selectedAgency;
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {filteredCars.length === 0 && (
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
