import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import CapabilitiesSection from "@/components/portfolio/CapabilitiesSection";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProductEdgeSection from "@/components/portfolio/ProductEdgeSection";
import PsychologySection from "@/components/portfolio/PsychologySection";
import CaseStudySection from "@/components/portfolio/CaseStudySection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import FooterSection from "@/components/portfolio/FooterSection";
import WaveDivider from "@/components/portfolio/WaveDivider";

const bg = "hsl(0,0%,10.2%)";
const teal = "#244D4D";
const orange = "#B45309";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <WaveDivider from={teal} to={bg} />
    <AboutSection />
    <WaveDivider from={bg} to={teal} flip />
    <MetricsSection />
    <WaveDivider from={teal} to={bg} />
    <ProductEdgeSection />
    <WaveDivider from={bg} to={orange} flip />
    <PsychologySection />
    <WaveDivider from={orange} to={bg} />
    <CaseStudySection />
    <WaveDivider from={bg} to={orange} flip />
    <TestimonialsSection />
    <WaveDivider from={orange} to={bg} />
    <FooterSection />
  </div>
);

export default Index;
