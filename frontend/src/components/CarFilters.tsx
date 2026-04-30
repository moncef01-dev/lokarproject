import { Search, Filter, Tag, DollarSign, Gem } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();
  return (
    <div className="mb-12">
      <h2
        className="mb-6 text-2xl sm:text-3xl font-bold text-[#0A1633]"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Véhicules <span className="text-[#C8102E]">Disponibles</span>
      </h2>

      <div className="flex flex-col gap-6 rounded-2xl bg-white p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-[1.5]">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("filters.search")}
              className="w-full rounded-xl border border-gray-200 py-3.5 pr-4 pl-12 text-gray-900 placeholder-gray-400 bg-gray-50/50 shadow-sm transition-all hover:bg-gray-50 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 flex-1 relative">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pr-10 pl-11 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
            >
              <option value="All">{t("filters.agency")}</option>
              {agencies.filter(a => a !== "All").map((agency) => (
                <option key={agency} value={agency}>
                  {agency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1 relative">
            <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pr-10 pl-11 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="All">{t("filters.brand")}</option>
              {brands.filter(b => b !== "All").map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1 relative">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pr-10 pl-11 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">{t("filters.category")}</option>
              {categories.filter(c => c !== "All").map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Row: Price and Luxury */}
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder={t("filters.min")}
                    className="w-28 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-gray-300">-</span>
                  <input
                    type="number"
                    placeholder={t("filters.max")}
                    className="w-28 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
              </div>
            </div>
          </div>
          
          <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-2.5 shadow-sm transition-all hover:bg-white hover:border-gray-300 hover:shadow-md">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isLuxury ? "bg-gray-900" : "bg-white border border-gray-200"}`}>
               <Gem className={`h-4 w-4 transition-colors ${isLuxury ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
            </div>
            <input
              type="checkbox"
              checked={isLuxury}
              onChange={(e) => setIsLuxury(e.target.checked)}
              className="hidden"
            />
            <span className={`text-sm font-bold transition-colors ${isLuxury ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}>
              {t("filters.luxury")}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
