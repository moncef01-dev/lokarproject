import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicService, type Agency } from "../services/public.service";

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
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3
            className="mb-4 text-4xl font-bold text-[#0A1633]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            OUR PARTNER AGENCIES
          </h3>
          <p className="text-gray-600">
            Browse cars by verified rental agencies
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            {agencies.length > 0 ? (
              agencies.map((agency) => (
                <button
                  key={agency._id}
                  className="group flex flex-col items-center justify-center rounded-xl bg-gray-50 p-6 transition hover:bg-[#C8102E] hover:text-white"
                  onClick={() => navigate("/cars")} // Ideally filter by agency
                >
                  <img
                    src={
                      agency.img_path ||
                      "https://ui-avatars.com/api/?name=" +
                        agency.name +
                        "&background=random"
                    }
                    alt={agency.name}
                    className="mb-3 h-16 w-16 rounded-full bg-white object-cover shadow-sm transition-transform group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=" +
                        agency.name +
                        "&background=random";
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-white">
                    {agency.name}
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No agencies registered yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSection;
