import { Search, Filter } from "lucide-react";

interface CarFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
  agencies: string[];
}

const CarFilters: React.FC<CarFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedAgency,
  setSelectedAgency,
  agencies,
}) => {
  return (
    <div className="mb-12">
      <h2
        className="mb-6 text-4xl font-bold text-[#0A1633]"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        AVAILABLE <span className="text-[#C8102E]">CARS</span>
      </h2>

      <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md md:flex-row md:items-center">
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

        <div className="flex items-center gap-2 md:w-1/3">
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
      </div>
    </div>
  );
};

export default CarFilters;
