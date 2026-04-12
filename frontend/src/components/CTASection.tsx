import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#C8102E] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <div className="text-white">
            <h3 className="mb-4 text-4xl font-bold tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
              START RENTING TODAY
            </h3>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover the easiest way to book your next ride. Your premium adventure awaits.
            </p>
          </div>
          <button 
            onClick={() => navigate("/cars")}
            className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#C8102E] shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
          >
            Browse Cars
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
