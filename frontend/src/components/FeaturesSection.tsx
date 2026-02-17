import { Award, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "All Brands",
    description: "Access to all major car brands from trusted agencies",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Free Support",
    description: "24/7 customer support for all your rental needs",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Affordable Prices",
    description: "Competitive rates from multiple agencies in one place",
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-8 text-center shadow-lg transition hover:shadow-xl"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C8102E] text-white">
                {feature.icon}
              </div>
              <h4 className="mb-3 text-xl font-bold text-[#0A1633]">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
