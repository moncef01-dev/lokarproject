import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does pricing work?",
    answer: "Our pricing is structured into three tiers based on your agency's size and needs. You pay a flat monthly or yearly fee, plus a small commission only on successful bookings."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, our Starter plan includes a free trial so you can experience our booking management tools before committing."
  },
  {
    question: "What commission does LOKAR take?",
    answer: "We charge a minimal commission only when you get a successful booking through our platform. Contact us for exact rates."
  },
  {
    question: "Can I change plans later?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time as your business needs evolve."
  },
  {
    question: "Do you support large agencies?",
    answer: "Yes, our Enterprise plan is tailored specifically for large agencies requiring unlimited vehicles, multi-user access, and custom integrations."
  }
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-[#0A1633] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C8102E] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Choose the right plan for your agency
          </h2>
          <p className="text-xl text-gray-300 font-medium">
            Smart tools to manage bookings, customers, and grow your rental business.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-bold uppercase tracking-widest ${!isYearly ? "text-white" : "text-gray-500"}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-[#C8102E] transition-transform duration-300 ${isYearly ? "translate-x-8" : ""}`} />
            </button>
            <span className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${isYearly ? "text-white" : "text-gray-500"}`}>
              Yearly <span className="px-2 py-0.5 rounded-full bg-[#C8102E]/20 text-[#C8102E] text-[10px]">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Starter Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-8">
              <span className="text-[#C8102E] font-bold uppercase tracking-widest text-sm">Starter</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">4,999 <span className="text-lg text-gray-400 font-normal">DA/mo</span></h3>
              <p className="text-sm text-gray-400 h-10">Start organizing your bookings and managing your rental business online.</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["Up to 10 vehicles", "Booking management", "Customer requests", "Basic analytics", "Email support"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-[#C8102E]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate("/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth Card */}
          <div className="bg-gradient-to-b from-[#1a2b4c] to-[#0A1633] border border-[#C8102E]/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(200,16,46,0.2)] transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#C8102E] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Most Popular
              </span>
            </div>
            <div className="mb-8 mt-4">
              <span className="text-white font-bold uppercase tracking-widest text-sm">Growth</span>
              <h3 className="text-4xl font-bold mt-2 mb-4">9,999 <span className="text-lg text-gray-400 font-normal">DA/mo</span></h3>
              <p className="text-sm text-gray-300 h-10">Grow faster with advanced tools and increased visibility.</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["Up to 30 vehicles", "Advanced analytics", "Customer reviews", "Priority visibility", "Customer management", "Faster support"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-5 h-5 text-[#C8102E]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate("/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-[#C8102E] hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Enterprise Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-8">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Enterprise</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">Custom</h3>
              <p className="text-sm text-gray-400 h-10">Advanced solutions for large rental businesses.</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["Unlimited vehicles", "Multi-user access", "Dedicated support", "Advanced reporting", "Premium placement", "Custom integrations"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate("/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>

        <div className="text-center mt-12 mb-24">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
            A small commission only applies to successful bookings.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/10 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h4 className="font-bold text-lg">{faq.question}</h4>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-[#C8102E]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
