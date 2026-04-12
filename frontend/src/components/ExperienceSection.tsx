import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ExperienceSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Image with Fixed Attachment for Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
          alt="Lifestyle Car"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1633]/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-[#0A1633] via-transparent to-[#0A1633]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md ring-1 ring-white/20">
            <span className="h-2 w-2 rounded-full bg-[#C8102E] animate-pulse"></span>
            Elevate Your Journey
          </div>
          
          <h2 
            className="mb-8 text-4xl font-bold text-white sm:text-7xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            DRIVE YOUR DREAM CAR
            <br />
            <span className="text-gray-400">WITH CONFIDENCE.</span>
          </h2>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-300 font-medium">
            From sleek sports cars to luxury sedans, we provide access to the world's most desired brands. Experience mobility at its finest.
          </p>

          <button
            onClick={() => navigate("/cars")}
            className="group flex items-center gap-3 rounded-full bg-[#C8102E] px-10 py-5 text-sm font-bold tracking-widest text-white uppercase shadow-2xl transition-all hover:scale-105 hover:bg-red-700 active:scale-95"
          >
            Explore Our Fleet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
