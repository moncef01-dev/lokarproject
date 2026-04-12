import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyChooseSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-br from-[#0A1633] to-[#1a2847] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h3
              className="mb-8 text-5xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              YOUR TRUSTED
              <br />
              PARTNER IN
              <br />
              CAR RENTALS
            </h3>
            <div className="flex flex-col gap-6 text-lg font-medium text-white mb-8">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8102E]">
                  <Check className="h-5 w-5" />
                </div>
                <span>Verified agencies only</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8102E]">
                  <Check className="h-5 w-5" />
                </div>
                <span>Transparent pricing</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8102E]">
                  <Check className="h-5 w-5" />
                </div>
                <span>Fast booking process</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/become-partner")}
              className="rounded-lg bg-[#C8102E] px-8 py-4 text-white font-bold transition hover:bg-red-700"
            >
              Get Started
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600"
              alt="Car showroom"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
