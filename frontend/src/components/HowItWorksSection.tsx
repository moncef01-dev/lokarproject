import { Car, Calendar, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Car className="h-8 w-8" />,
      title: t("howitworks.step1.title"),
      description: t("howitworks.step1.desc"),
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t("howitworks.step2.title"),
      description: t("howitworks.step2.desc"),
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: t("howitworks.step3.title"),
      description: t("howitworks.step3.desc"),
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
            {t("howitworks.title1")}
          </h2>
          <h3 className="text-4xl font-bold text-[#0A1633] sm:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {t("howitworks.title2")}
          </h3>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-8 transition-all hover:translate-y-[-8px]"
            >
              <div className="mb-8 relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-[#0A1633] shadow-sm ring-1 ring-gray-200 transition-all group-hover:bg-[#0A1633] group-hover:text-white group-hover:shadow-xl group-hover:rotate-6">
                  {step.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#C8102E] text-white text-xs font-bold ring-4 ring-white">
                  {index + 1}
                </div>
              </div>
              <h4 className="mb-4 text-xl font-bold text-[#0A1633]">
                {step.title}
              </h4>
              <p className="text-gray-500 leading-relaxed font-medium">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-[75%] w-full h-[2px] bg-linear-to-r from-gray-200 to-transparent z-[-1]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
