import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProductEdgeSection from "@/components/portfolio/ProductEdgeSection";
import CaseStudySection from "@/components/portfolio/CaseStudySection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import FooterSection from "@/components/portfolio/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <AboutSection />
    <ProductEdgeSection />
    <CaseStudySection />
    <TestimonialsSection />
    <FooterSection />
  </div>
);

export default Index;
