import HeroSection from "@/components/portfolio/HeroSection";
import ValueSection from "@/components/portfolio/ValueSection";
import CapabilitiesSection from "@/components/portfolio/CapabilitiesSection";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProductEdgeSection from "@/components/portfolio/ProductEdgeSection";
import PsychologySection from "@/components/portfolio/PsychologySection";
import CaseStudySection from "@/components/portfolio/CaseStudySection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import FooterSection from "@/components/portfolio/FooterSection";

const Divider = () => (
  <div className="w-full px-6">
    <div className="max-w-6xl mx-auto h-px bg-border/50" />
  </div>
);

const TealFadeDivider = () => (
  <div className="w-full h-16" style={{ background: "linear-gradient(180deg, #1A1A1B 0%, hsl(180, 30%, 12%) 50%, hsl(0, 0%, 10.2%) 100%)" }} />
);

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <Divider />
    <ValueSection />
    <Divider />
    <CapabilitiesSection />
    <Divider />
    <MetricsSection />
    <Divider />
    <ProductEdgeSection />
    <Divider />
    <PsychologySection />
    <Divider />
    <CaseStudySection />
    <Divider />
    <TestimonialsSection />
    <Divider />
    <FooterSection />
  </div>
);

export default Index;
