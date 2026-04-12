import { Search, Filter, Tag, DollarSign, Gem } from "lucide-react";

interface CarFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
  agencies: string[];

  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  brands: string[];

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];

  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;

  isLuxury: boolean;
  setIsLuxury: (luxury: boolean) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedAgency,
  setSelectedAgency,
  agencies,
  selectedBrand,
  setSelectedBrand,
  brands,
  selectedCategory,
  setSelectedCategory,
  categories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  isLuxury,
  setIsLuxury,
}) => {
  return (
    <div className="mb-12">
      <h2
        className="mb-6 text-4xl font-bold text-[#0A1633]"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        AVAILABLE <span className="text-[#C8102E]">CARS</span>
      </h2>

      <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
        {/* Top Row: Search and Core Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-10 focus:border-[#C8102E] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:w-1/4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#C8102E] focus:outline-none"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              {agencies.map((agency) => (
                <option key={agency} value={agency}>
                  {agency === "All" ? "All Agencies" : agency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 md:w-1/4">
            <Tag className="h-5 w-5 text-gray-500" />
            <select
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#C8102E] focus:outline-none"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "All" ? "All Brands" : brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 md:w-1/4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#C8102E] focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== "All").map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Row: Price and Luxury */}
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <input
                type="number"
                placeholder="Min Price"
                className="w-32 rounded-lg border border-gray-200 px-4 py-2 focus:border-[#C8102E] focus:outline-none"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max Price"
                className="w-32 rounded-lg border border-gray-200 px-4 py-2 focus:border-[#C8102E] focus:outline-none"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <Gem className={`h-5 w-5 ${isLuxury ? "text-[#C8102E]" : "text-gray-400"}`} />
            <input
              type="checkbox"
              checked={isLuxury}
              onChange={(e) => setIsLuxury(e.target.checked)}
              className="hidden"
            />
            <span className={`font-medium ${isLuxury ? "text-[#C8102E]" : "text-gray-600"}`}>
              Luxury Vehicles Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
