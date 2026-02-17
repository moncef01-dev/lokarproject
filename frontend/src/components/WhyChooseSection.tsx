import { Shield, Award } from "lucide-react";
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
              YOUR
              <br />
              TRUSTED
              <br />
              PARTNER IN
              <br />
              CAR RENTALS
            </h3>
            <p className="mb-8 text-gray-300">
              Lokar connects you with the best local car rental agencies,
              offering a wide selection of vehicles to match your needs and
              budget. Drive your dream car with confidence and support from
              experts.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E]">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-bold">
                    Secure Transactions
                  </h4>
                  <p className="text-sm text-gray-300">
                    Safety comes first with secure payment and verified agencies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C8102E]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-bold">Premium Selection</h4>
                  <p className="text-sm text-gray-300">
                    Choose from thousands of cars across all major brands
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/become-partner")}
              className="mt-8 rounded-lg bg-[#C8102E] px-8 py-3 text-white transition hover:bg-red-700"
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
