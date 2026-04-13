import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";

const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden bg-black py-24 sm:py-32">
            {/* Background Layer: Cinematic Image Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
                    alt="Luxury Car Detail"
                    className="h-full w-full object-cover opacity-30 brightness-50 grayscale-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                
                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-[400px] w-[600px] rounded-full bg-[#C8102E]/20 blur-[150px]" />
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    
                    {/* Content Header */}
                    <div className="space-y-6">
                        <h2 
                            className="text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl lg:text-7xl"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                            Find Your Perfect
                            <br />
                            <span className="bg-gradient-to-r from-[#C8102E] to-red-400 bg-clip-text text-transparent">
                                Car Today
                            </span>
                        </h2>
                        
                        <p className="mx-auto max-w-2xl text-lg font-medium tracking-tight text-gray-400 sm:text-xl">
                            Browse premium vehicles from trusted agencies and book in seconds.
                            The most reliable car rental experience in Algeria.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex flex-col gap-6 sm:flex-row">
                        <button
                            onClick={() => navigate("/cars")}
                            className="group flex items-center justify-center gap-3 rounded-full bg-white px-12 py-5 text-sm font-black tracking-widest text-[#0A1633] shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 uppercase"
                        >
                            Browse Cars
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={() => navigate("/cars?category=luxury")}
                            className="relative flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-12 py-5 text-sm font-bold tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 active:scale-95 uppercase group"
                        >
                            <span className="absolute inset-0 rounded-full bg-red-600/10 blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
                            Explore Luxury Cars
                        </button>
                    </div>

                    {/* Trust Verification Row */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/10 pt-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                        <div className="flex items-center gap-3 group transition-colors hover:text-white/80">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500/10 text-green-500 ring-1 ring-green-500/20">
                                <Check size={12} strokeWidth={4} />
                            </div>
                            <span>Verified agencies only</span>
                        </div>
                        
                        <div className="flex items-center gap-3 group transition-colors hover:text-white/80">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500/10 text-[#C8102E] ring-1 ring-[#C8102E]/20">
                                <Check size={12} strokeWidth={4} />
                            </div>
                            <span>Pay online with CIB / Edahabia</span>
                        </div>

                        <div className="flex items-center gap-3 group transition-colors hover:text-white/80">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                                <Check size={12} strokeWidth={4} />
                            </div>
                            <span>Or pay at pickup</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;

