import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandSection from "../components/BrandSection";
import WhyChooseSection from "../components/WhyChooseSection";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <BrandSection />
      <WhyChooseSection />
      <FeaturedCarsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
