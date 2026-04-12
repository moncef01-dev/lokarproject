import { Shield, Award, Clock, DollarSign, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Transactions",
    description: "Every payment is protected with industry-standard encryption for your peace of mind."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Verified Agencies",
    description: "We hand-pick and vet every rental partner to ensure premium service quality."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Instant Booking",
    description: "Skip the waiting room. Confirm your reservation and get on the road instantly."
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "No Hidden Fees",
    description: "What you see is what you pay. We believe in transparent pricing at every step."
  }
];

const WhyChooseSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A1633] py-24 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#C8102E] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C8102E] opacity-10 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
              Why Lokar
            </h2>
            <h3
              className="mb-8 text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              DRIVE YOUR DREAM CAR
              <br />
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">WITH COMPLETE TRUST.</span>
            </h3>
            <p className="mb-10 text-lg text-gray-400 font-medium max-w-lg leading-relaxed">
              Lokar provides the most secure and reliable marketplace for high-end vehicle rentals. We focus on the experience, so you can focus on the journey.
            </p>

            <button
              onClick={() => navigate("/become-partner")}
              className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold tracking-widest text-[#0A1633] uppercase transition-all hover:scale-105 hover:bg-gray-100"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card-dark p-8 rounded-3xl group transition-all hover:bg-white/[0.08] hover:-translate-y-2">
                <div className="mb-6 h-12 w-12 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center text-[#C8102E] border border-[#C8102E]/30 transition-all group-hover:bg-[#C8102E] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(200,16,46,0.4)]">
                  {b.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-white">
                  {b.title}
                </h4>
                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;

