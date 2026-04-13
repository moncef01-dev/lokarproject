import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Reda Belkacem",
    role: "Business Traveler",
    content: "The selection of premium cars is unmatched. Booking was seamless, and the car was in perfect condition. Highly recommended for professionals.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Amine Mansouri",
    role: "Regular Customer",
    content: "I've used Lokar several times now. The transparency and lack of hidden fees make it my go-to platform for all my travel needs in Algeria.",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Yasmine Haddad",
    role: "Freelance Designer",
    content: "As someone who values aesthetics, driving a clean Porsche for the weekend was a dream. The process was fast and the service was top-notch.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=26"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
              Community Reviews
            </h2>
            <h3 className="text-4xl font-bold text-[#0A1633] sm:text-5xl" style={{ fontFamily: "Orbitron, sans-serif" }}>
              WHAT OUR USERS SAY
            </h3>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="text-right">
              <div className="text-xl font-bold text-[#0A1633]">Excellent 4.8/5</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Based on 2.5k reviews</div>
            </div>
            <div className="flex gap-1 text-[#C8102E]">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative flex flex-col rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2">
              <div className="absolute top-8 right-8 text-gray-100">
                <Quote className="h-12 w-12 fill-current" />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-full border-2 border-[#C8102E]/10 p-0.5 overflow-hidden">
                  <img src={t.image} alt={t.name} className="h-full w-full rounded-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A1633]">{t.name}</h4>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>

              <p className="text-gray-600 leading-relaxed font-medium italic">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
