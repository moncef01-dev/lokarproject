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
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#C8102E] selection:text-white">
      <Navbar />
      <Hero />
      <ScrollReveal><HowItWorksSection /></ScrollReveal>
      <ScrollReveal delay={200}><MovingLogosSection /></ScrollReveal>
      <ScrollReveal><FeaturedCarsSection /></ScrollReveal>
      <ScrollReveal><ExperienceSection /></ScrollReveal>
      <ScrollReveal><WhyChooseSection /></ScrollReveal>
      <ScrollReveal><BrandSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection /></ScrollReveal>
      <ScrollReveal><PricingSection /></ScrollReveal>
      <CTASection />
      <Footer />
    </div>
  );
};


export default Home;
