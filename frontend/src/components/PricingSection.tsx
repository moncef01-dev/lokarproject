import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5")
    }
  ];

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
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-gray-300 font-medium">
            {t("pricing.subtitle")}
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-bold uppercase tracking-widest ${!isYearly ? "text-white" : "text-gray-500"}`}>{t("pricing.monthly")}</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-[#C8102E] transition-transform duration-300 ${isYearly ? "translate-x-8" : ""}`} />
            </button>
            <span className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${isYearly ? "text-white" : "text-gray-500"}`}>
              {t("pricing.yearly")} <span className="px-2 py-0.5 rounded-full bg-[#C8102E]/20 text-[#C8102E] text-[10px]">{t("pricing.save")}</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Starter Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-8">
              <span className="text-[#C8102E] font-bold uppercase tracking-widest text-sm">{t("pricing.starter")}</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">4,999 <span className="text-lg text-gray-400 font-normal">{t("pricing.mo")}</span></h3>
              <p className="text-sm text-gray-400 h-10">{t("pricing.starter.desc")}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[t("pricing.starter.f1"), t("pricing.starter.f2"), t("pricing.starter.f3"), t("pricing.starter.f4"), t("pricing.starter.f5")].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-[#C8102E]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate(language === 'en' ? "/en/become-partner" : "/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              {t("pricing.starter.btn")}
            </button>
          </div>

          {/* Growth Card */}
          <div className="bg-gradient-to-b from-[#1a2b4c] to-[#0A1633] border border-[#C8102E]/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(200,16,46,0.2)] transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#C8102E] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                {t("pricing.popular")}
              </span>
            </div>
            <div className="mb-8 mt-4">
              <span className="text-white font-bold uppercase tracking-widest text-sm">{t("pricing.growth")}</span>
              <h3 className="text-4xl font-bold mt-2 mb-4">9,999 <span className="text-lg text-gray-400 font-normal">{t("pricing.mo")}</span></h3>
              <p className="text-sm text-gray-300 h-10">{t("pricing.growth.desc")}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[t("pricing.growth.f1"), t("pricing.growth.f2"), t("pricing.growth.f3"), t("pricing.growth.f4"), t("pricing.growth.f5"), t("pricing.growth.f6")].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-5 h-5 text-[#C8102E]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate(language === 'en' ? "/en/become-partner" : "/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-[#C8102E] hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {t("pricing.growth.btn")}
            </button>
          </div>

          {/* Enterprise Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-8">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">{t("pricing.enterprise")}</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">{t("pricing.custom")}</h3>
              <p className="text-sm text-gray-400 h-10">{t("pricing.enterprise.desc")}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {[t("pricing.enterprise.f1"), t("pricing.enterprise.f2"), t("pricing.enterprise.f3"), t("pricing.enterprise.f4"), t("pricing.enterprise.f5"), t("pricing.enterprise.f6")].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-5 h-5 text-gray-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate(language === 'en' ? "/en/become-partner" : "/become-partner")}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              {t("pricing.enterprise.btn")}
            </button>
          </div>
        </div>

        <div className="text-center mt-12 mb-24">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
            {t("pricing.commissionNote")}
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">{t("pricing.faq.title")}</h3>
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
