import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Lightbulb, Settings, Route, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";

const slow = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const iconMap: Record<string, typeof MapPin> = { Mapping: MapPin, Insights: Lightbulb, Solutions: Settings, Roadmap: Route };

const fallbackSteps = [
  { label: "Mapping", desc: "Comprehensive stakeholder landscape analysis and regulatory framework review across government sectors." },
  { label: "Insights", desc: "Deep-dive user research uncovering fragmented workflows and adoption barriers in legacy systems." },
  { label: "Solutions", desc: "Designed modular platform architecture enabling rapid iteration under strict compliance constraints." },
  { label: "Roadmap", desc: "Phased delivery plan balancing quick wins with long-term platform scalability and stakeholder buy-in." },
];

const CaseStudySection = () => {
  const { data: caseStudies } = useCaseStudies();
  const cs = caseStudies?.[0];

  const steps = (cs?.process_steps as Array<{ label: string; desc: string }>) || fallbackSteps;
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a > 0 ? a - 1 : steps.length - 1));
  const next = () => setActive((a) => (a < steps.length - 1 ? a + 1 : 0));

  const title = cs?.title || "TarbutON";
  const tagline = cs?.tagline || "An interactive deep-dive into cultural education transformation.";
  const problem = cs?.problem_statement || "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.";
  const presentationLink = cs?.presentation_link;

  return (
    <section id="casestudy" className="relative py-28 px-6">
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] animate-blob" style={{ animationDelay: "6s" }} />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={slow}>
          Case Study — <span className="text-accent">{title}</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">{tagline}</p>

        {/* Process Carousel */}
        <motion.div className="glass-card p-8 md:p-12 mb-16" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={slow}>
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            {steps.map((s, i) => {
              const Icon = iconMap[s.label] || MapPin;
              return (
                <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${i === active ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`}>
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
          <div className="relative min-h-[120px] flex items-center">
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors">
              <ChevronLeft size={20} strokeWidth={1.5} className="text-foreground" />
            </button>
            <motion.div key={active} className="text-center px-14 w-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <h3 className="text-2xl font-semibold text-foreground mb-3">{steps[active]?.label}</h3>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">{steps[active]?.desc}</p>
            </motion.div>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors">
              <ChevronRight size={20} strokeWidth={1.5} className="text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Problem & Mockups */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div className="glass-card p-8 border-l-4 border-accent/40" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={slow}>
            <h3 className="text-xl font-semibold text-foreground mb-3">The Problem</h3>
            <p className="text-muted-foreground leading-relaxed">{problem}</p>
            <div className="mt-6 rounded-2xl bg-secondary/60 border border-border h-40 flex items-center justify-center overflow-hidden">
              {cs?.mobile_image_url ? <img src={cs.mobile_image_url} alt="Mobile mockup" className="w-full h-full object-cover" /> : <span className="text-sm text-muted-foreground">📱 Mobile View</span>}
            </div>
          </motion.div>
          <motion.div className="glass-card p-8 border-l-4 border-primary/40" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...slow, delay: 0.2 }}>
            <h3 className="text-xl font-semibold text-foreground mb-3">The Solution</h3>
            <p className="text-muted-foreground leading-relaxed">A unified platform with modular content delivery, real-time analytics dashboards, and a phased rollout strategy that achieved 3× engagement targets within the first pilot quarter.</p>
            <div className="mt-6 rounded-2xl bg-secondary/60 border border-border h-40 flex items-center justify-center overflow-hidden">
              {cs?.desktop_image_url ? <img src={cs.desktop_image_url} alt="Desktop mockup" className="w-full h-full object-cover" /> : <span className="text-sm text-muted-foreground">🖥️ Desktop View</span>}
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <a href={presentationLink || "#"} className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-2xl animate-pulse-glow hover:opacity-90 transition-opacity text-lg">
            <Download size={20} strokeWidth={1.5} />
            Download Full Case Study
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
