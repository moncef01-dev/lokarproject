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

// CarProps definitions remain unchanged
// But we need to make sure we don't break existing props.

const CarCard: React.FC<CarProps> = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const image = getImageUrl(car.img_path || car.image);
  const name = car.model || car.name || "Unknown Model";
  const agencyName = car.agency_id?.name || car.agency || "Unknown Agency";


  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-2xl">
      <div className="relative">
        <div className="h-56 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={`${car.brand} ${name}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000";
            }}
          />
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-[#C8102E] px-3 py-1 text-xs font-semibold text-white shadow-md">
          {agencyName}
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow-md">
          {car.availability === "available" ? (
            <span className="text-green-600">Available</span>
          ) : (
            <>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {car.rating || "New"}
            </>
          )}
        </div>
      </div>

      <div className="p-6">
        <h4 className="mb-2 text-2xl font-bold text-[#0A1633]">
          {car.brand} {name}
        </h4>
        <div className="mb-4 text-sm text-gray-500">
          {car.year} • {agencyName}
        </div>

        {/* Specs Placeholder - Real data might not have this yet */}
        <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {car.specs?.fuel || "Petrol"}
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            {car.specs?.transmission || "Auto"}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {car.specs?.seats || 5}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-[#0A1633]">
              {car.price ? `$${car.price}` : "Contact"}
            </span>
            {car.price && <span className="text-gray-500">/day</span>}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#0A1633] px-6 py-2 text-white transition hover:bg-[#0A1633]/90"
          >
            More Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <PrebookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={car}
      />
    </div >
  );
};

export default CarCard;
