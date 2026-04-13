import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicService, type Agency } from "../services/public.service";
import { getImageUrl } from "../utils/imageUtils";

const BrandSection = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await publicService.getAllAgencies();
        let displayAgencies = data;
        
        // Pad with mock agencies to ensure a minimum of 4 agencies are shown
        if (displayAgencies.length < 4) {
          const mockAgencies = [
            { _id: 'mock1', name: 'Elite Rentals', img_path: '' },
            { _id: 'mock2', name: 'Global Drive', img_path: '' },
            { _id: 'mock3', name: 'Speedo Cars', img_path: '' },
            { _id: 'mock4', name: 'Luxury Motors', img_path: '' },
          ];
          displayAgencies = [...displayAgencies, ...mockAgencies.slice(0, 4 - displayAgencies.length)] as Agency[];
        }
        
        setAgencies(displayAgencies);
      } catch (error) {
        console.error("Failed to fetch agencies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  return (
    <div className="bg-gray-50 py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
            Network Excellence
          </h2>
          <h3
            className="text-4xl font-bold text-[#0A1633] sm:text-5xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            VERIFIED RENTAL PARTNERS
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#C8102E]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {agencies.length > 0 ? (
              agencies.map((agency) => (
                <div
                  key={agency._id}
                  className="group relative flex flex-col items-center justify-center rounded-3xl bg-white p-8 transition-all hover:bg-[#0A1633] shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100"
                  onClick={() => navigate("/cars")}
                >
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-gray-50 transition-all group-hover:ring-[#C8102E]/20">
                    <img
                      src={
                        getImageUrl(agency.img_path) ||
                        "https://ui-avatars.com/api/?name=" +
                          agency.name +
                          "&background=random"
                      }
                      alt={agency.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" +
                          agency.name +
                          "&background=random";
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0A1633] uppercase tracking-widest text-center group-hover:text-white transition-colors line-clamp-1">
                    {agency.name}
                  </span>
                  
                  {/* Subtle Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-[#C8102E] opacity-0 blur-xl transition-all group-hover:opacity-5 -z-10"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 font-medium">
                Establishing partner networks...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSection;
