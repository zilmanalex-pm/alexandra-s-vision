import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Lightbulb, Settings, Route, Download, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { icon: MapPin, label: "Mapping", desc: "Comprehensive stakeholder landscape analysis and regulatory framework review across government sectors." },
  { icon: Lightbulb, label: "Insights", desc: "Deep-dive user research uncovering fragmented workflows and adoption barriers in legacy systems." },
  { icon: Settings, label: "Solutions", desc: "Designed modular platform architecture enabling rapid iteration under strict compliance constraints." },
  { icon: Route, label: "Roadmap", desc: "Phased delivery plan balancing quick wins with long-term platform scalability and stakeholder buy-in." },
];

const CaseStudySection = () => {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a > 0 ? a - 1 : steps.length - 1));
  const next = () => setActive((a) => (a < steps.length - 1 ? a + 1 : 0));

  return (
    <section id="casestudy" className="relative py-24 px-6">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Case Study — <span className="text-primary">TarbutON</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">An interactive deep-dive into cultural education transformation.</p>

        {/* Process Carousel */}
        <motion.div
          className="glass-card p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  i === active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                <s.icon size={16} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="relative min-h-[120px] flex items-center">
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <motion.div
              key={active}
              className="text-center px-14 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">{steps[active].label}</h3>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">{steps[active].desc}</p>
            </motion.div>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { title: "The Problem", color: "border-destructive/30", content: "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts." },
            { title: "The Solution", color: "border-primary/30", content: "A unified platform with modular content delivery, real-time analytics dashboards, and a phased rollout strategy that achieved 3× engagement targets within the first pilot quarter." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`glass-card p-8 border-l-4 ${item.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              {/* Device mockup frame */}
              <div className="mt-6 rounded-2xl bg-muted/60 border border-border h-40 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  {i === 0 ? "📱 Mobile View" : "🖥️ Desktop View"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl animate-pulse-glow hover:opacity-90 transition-opacity text-lg">
            <Download size={20} />
            Download Full Case Study
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
