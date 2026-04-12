/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import CarFilters from "../components/CarFilters";
import { publicService } from "../services/public.service";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLuxury, setIsLuxury] = useState(false);

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

  // Extract unique arrays for filters
  const agencies = [
    "All",
    ...new Set(cars.map((car) => car.agency_id?.name).filter(Boolean)),
  ];
  
  const brands = [
    "All",
    ...new Set(cars.map((car) => car.brand).filter(Boolean)),
  ];

  const categories = [
    "All",
    ...new Set(cars.map((car) => car.category).filter(Boolean)),
  ];

  const filteredCars = cars.filter((car) => {
    const model = car.model || "";
    const brand = car.brand || "";
    const agencyName = car.agency_id?.name || "";
    const category = car.category || "";
    const price = car.price || 0;
    const luxury = car.is_luxury || false;

    const matchesSearch =
      model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesAgency =
      selectedAgency === "All" || agencyName === selectedAgency;

    const matchesBrand = selectedBrand === "All" || brand === selectedBrand;
    
    const matchesCategory = selectedCategory === "All" || category === selectedCategory;

    const matchesMinPrice = minPrice === "" || price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || price <= Number(maxPrice);
    
    const matchesLuxury = !isLuxury || luxury;

    return matchesSearch && matchesAgency && matchesBrand && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesLuxury;
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
            agencies={agencies as string[]}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            brands={brands as string[]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories as string[]}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            isLuxury={isLuxury}
            setIsLuxury={setIsLuxury}
          />

          {/* Cars Grid */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm animate-pulse">
                  <div className="h-64 bg-gray-100" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 h-6 w-3/4 rounded-md bg-gray-200" />
                    <div className="mb-8 h-4 w-1/3 rounded-md bg-gray-100" />
                    <div className="mb-6 flex gap-4">
                      <div className="h-4 w-16 rounded-md bg-gray-100" />
                      <div className="h-4 w-16 rounded-md bg-gray-100" />
                    </div>
                    <div className="mt-auto flex justify-between border-t border-gray-100 pt-5">
                      <div className="h-8 w-24 rounded-md bg-gray-200" />
                      <div className="h-10 w-28 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {!loading && filteredCars.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 transition-opacity duration-500">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                No cars found
              </h3>
              <p className="max-w-sm text-center font-medium text-gray-500">
                We couldn't find any vehicles matching your exact criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedAgency("All");
                  setSelectedBrand("All");
                  setSelectedCategory("All");
                  setMinPrice("");
                  setMaxPrice("");
                  setIsLuxury(false);
                }}
                className="mt-8 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
