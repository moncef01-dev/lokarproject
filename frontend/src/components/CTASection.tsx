import React from "react";

const CTASection = () => {
  return (
    <div className="bg-[#C8102E] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-white">
            <h3 className="mb-2 text-3xl font-bold">
              GET LATEST UPDATES AND BEST OFFERS
            </h3>
            <p className="text-gray-100">
              Subscribe to our newsletter for exclusive deals
            </p>
          </div>
          <button className="rounded-lg bg-white px-8 py-4 font-semibold text-[#C8102E] transition hover:bg-gray-100">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
