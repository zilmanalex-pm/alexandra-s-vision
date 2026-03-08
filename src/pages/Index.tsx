import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/portfolio/HeroSection";
import ValueSection from "@/components/portfolio/ValueSection";
import CapabilitiesSection from "@/components/portfolio/CapabilitiesSection";
import MetricsSection from "@/components/portfolio/MetricsSection";
import ProductEdgeSection from "@/components/portfolio/ProductEdgeSection";
import PsychologySection from "@/components/portfolio/PsychologySection";
import CaseStudySection from "@/components/portfolio/CaseStudySection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import ConnectSection from "@/components/portfolio/ConnectSection";
import FooterSection from "@/components/portfolio/FooterSection";

const Divider = () => (
  <div className="w-full px-6">
    <div className="max-w-6xl mx-auto" style={{ height: "1px", background: "#2D6A6A" }} />
  </div>
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
