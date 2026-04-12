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
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_14px_28px_rgba(0,0,0,0.06)] hover:ring-[3px] hover:ring-slate-100/70">
        {/* Top Section: Image */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={`${car.brand} ${name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000";
            }}
          />
          
          {/* Subtle Dark Gradient Overlay for Cinematic Lighting */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Top-left: Agency Badge */}
          <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-900 shadow-sm backdrop-blur-md border border-white/20">
            {agencyName}
          </div>
          
          {/* Top-right: Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur-md border border-white/20">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{car.rating || "New"}</span>
            </div>
            <div
              className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md border border-white/20 ${
                car.availability === "available" 
                  ? "bg-green-500/90 text-white" 
                  : "bg-[#C8102E]/90 text-white"
              }`}
            >
              {car.availability === "available"
                ? "Available"
                : car.availability === "rented"
                  ? "Rented"
                  : car.availability === "maintenance"
                    ? "Maintenance"
                    : car.availability
                      ? car.availability.charAt(0).toUpperCase() + car.availability.slice(1)
                      : "Unknown"}
            </div>
          </div>
        </div>

        {/* Bottom Section: Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-1 flex items-baseline justify-between">
            <h4 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
              {car.brand} {name}
            </h4>
          </div>
          
          <div className="mb-6 text-sm font-medium text-gray-500">
            {car.year} • {agencyName}
          </div>

          {/* Specs */}
          <div className="mb-7 flex items-center gap-5 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-gray-400" />
              {car.specs?.fuel || "Petrol"}
            </div>
            <div className="flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-gray-400" />
              {car.specs?.transmission || "Auto"}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gray-400" />
              {car.specs?.seats || 5} Seats
            </div>
          </div>

          {/* Divider */}
          <div className="mt-auto border-t border-slate-100 pt-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight text-gray-900">
                    {hasPrice ? `${car.price?.toLocaleString()} DZD` : "-- DZD"}
                  </span>
                  <span className="text-sm font-medium text-gray-500">/day</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-95"
              >
                Reserve
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
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
