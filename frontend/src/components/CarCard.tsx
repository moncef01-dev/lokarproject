import React, { useState } from "react";
import { Star, Fuel, Settings, Users, ArrowRight } from "lucide-react";
import PrebookingModal from "./prebooking/PrebookingModal";
import { getImageUrl } from "../utils/imageUtils";

interface CarProps {
  car: {
    _id?: string;
    id?: number; // fallback for mock
    model: string; // Real
    name?: string; // Mock
    brand: string;
    year: string | number;
    price?: number;
    img_path?: string; // Real
    image?: string; // Mock
    agency_id?: { _id?: string; name: string; phone?: string; email?: string }; // Real
    agency?: string; // Mock
    rating?: number;
    specs?: {
      fuel: string;
      transmission: string;
      seats: number;
    };
    availability?: string;
  };
}

const CarCard: React.FC<CarProps> = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const image = getImageUrl(car.img_path || car.image);
  const name = car.model || car.name || "Unknown Model";
  const agencyName = car.agency_id?.name || car.agency || "Unknown Agency";
  const hasPrice = typeof car.price === "number" && !Number.isNaN(car.price);

  return (
    <>
      <div className="group relative h-full flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-2 ring-1 ring-gray-100">
        {/* Top Section: Image Area */}
        <div className="relative h-64 w-full overflow-hidden bg-[#F9FAFB]">
          <img
            src={image}
            alt={`${car.brand} ${name}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000";
            }}
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-[#0A1633]/40 via-transparent to-transparent opacity-60"></div>
          
          {/* Agency Badge */}
          <div className="absolute top-5 left-5">
            <div className="glass-card rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#0A1633] uppercase shadow-sm">
              {agencyName}
            </div>
          </div>
          
          {/* Status/Urgency Badges */}
          <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#0A1633] shadow-sm backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{car.rating || "5.0"}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Info */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="mb-2">
            <h4 className="text-2xl font-bold tracking-tight text-[#0A1633]">
              {car.brand} <span className="text-gray-400">{name}</span>
            </h4>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Model Year {car.year}
            </p>
          </div>

          {/* Specs */}
          <div className="my-8 flex items-center justify-between border-y border-gray-50 py-4">
            <div className="flex flex-col items-center gap-1">
              <Fuel className="h-4 w-4 text-[#C8102E]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.specs?.fuel || "Petrol"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Settings className="h-4 w-4 text-[#C8102E]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.specs?.transmission || "Auto"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users className="h-4 w-4 text-[#C8102E]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.specs?.seats || 5} Seats</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price Per Day</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#0A1633]">
                  {hasPrice ? `${car.price?.toLocaleString()} DZD` : "-- DZD"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn relative flex items-center justify-center rounded-full bg-[#0A1633] p-4 text-white transition-all hover:bg-[#C8102E] hover:rotate-90 active:scale-90"
            >
              <ArrowRight className="h-5 w-5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <PrebookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={car}
      />
    </>
  );
};

export default CarCard;
