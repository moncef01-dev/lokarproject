import { useNavigate } from "react-router-dom";
import { ArrowRight, Gift } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0A1633] py-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 h-full w-full opacity-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8102E] blur-[120px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card-dark flex flex-col items-center justify-between gap-12 rounded-[40px] p-12 md:flex-row md:p-20 ring-1 ring-white/10">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#C8102E]/20 px-4 py-2 text-xs font-bold tracking-widest text-[#C8102E] uppercase ring-1 ring-[#C8102E]/30">
              <Gift className="h-4 w-4" />
              Limited Offer
            </div>
            <h3 className="mb-6 text-4xl font-bold text-white sm:text-6xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
              GET UP TO 30% OFF
              <br />
              <span className="text-gray-400">EXCLUSIVE DEALS.</span>
            </h3>
            <p className="max-w-md text-lg text-gray-400 font-medium leading-relaxed">
              Join our premium club and be the first to know about new luxury arrivals and member-only pricing.
            </p>
          </div>

          <div className="flex w-full flex-1 flex-col gap-4 sm:flex-row md:justify-end">
            <div className="relative flex-1 max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded-full bg-white/5 border border-white/10 px-8 py-5 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#C8102E]/50"
              />
            </div>
            <button className="flex items-center justify-center gap-3 rounded-full bg-[#C8102E] px-10 py-5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-red-700 hover:scale-105 active:scale-95">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;

