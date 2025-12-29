import React from "react";
import { Star, Fuel, Settings, Users, Phone } from "lucide-react";

interface CarProps {
  car: {
    id: number;
    name: string;
    brand: string;
    year: number;
    price: number;
    image: string;
    agency: string;
    rating: number;
    specs: {
      fuel: string;
      transmission: string;
      seats: number;
    };
  };
}

const CarCard: React.FC<CarProps> = ({ car }) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-2xl">
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rounded-full bg-[#C8102E] px-3 py-1 text-xs font-semibold text-white">
          {car.agency}
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {car.rating}
        </div>
      </div>

      <div className="p-6">
        <h4 className="mb-2 text-2xl font-bold text-[#0A1633]">
          {car.brand} {car.name}
        </h4>
        <div className="mb-4 text-sm text-gray-500">
          {car.year} • {car.agency}
        </div>

        <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {car.specs.fuel}
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            {car.specs.transmission}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {car.specs.seats}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-[#0A1633]">
              ${car.price}
            </span>
            <span className="text-gray-500">/day</span>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#00C853] px-6 py-2 text-white transition hover:bg-green-600">
            <Phone className="h-4 w-4" />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
