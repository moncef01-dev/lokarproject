import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorksSection from "../components/HowItWorksSection";
import MovingLogosSection from "../components/MovingLogosSection";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import WhyChooseSection from "../components/WhyChooseSection";
import ExperienceSection from "../components/ExperienceSection";
import BrandSection from "../components/BrandSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C8102E] selection:text-white">
      <Navbar />
      <Hero />
      <HowItWorksSection />
      <MovingLogosSection />
      <FeaturedCarsSection />
      <ExperienceSection />
      <WhyChooseSection />
      <BrandSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};


export default Home;
