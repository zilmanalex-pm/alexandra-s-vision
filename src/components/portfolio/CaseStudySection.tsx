import { motion } from "framer-motion";
import { MapPin, Lightbulb, Settings, Route, Download, Monitor, Smartphone } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
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
  const title = cs?.title || "TarbutON";
  const tagline = cs?.tagline || "An interactive deep-dive into cultural education transformation.";
  const problem = cs?.problem_statement || "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.";
  const presentationLink = cs?.presentation_link;
  const desktopImg = cs?.desktop_image_url;
  const mobileImg = cs?.mobile_image_url;

  return (
    <section id="casestudy" className="relative py-28 px-6" style={{ background: "linear-gradient(180deg, hsl(0,0%,10.2%) 0%, #B45309 25%, #B45309 75%, hsl(0,0%,10.2%) 100%)" }}>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Case Study — <span className="text-accent">{title}</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{tagline}</p>
        </motion.div>

        {/* Laptop + Mobile Mockup Duo */}
        <motion.div
          className="glass-card-frost p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="flex flex-col md:flex-row items-end justify-center gap-6">
            {/* Desktop mockup */}
            <div className="relative w-full md:w-3/5">
              <div className="rounded-t-xl bg-secondary/80 border border-border px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
                </div>
                <span className="text-[10px] text-muted-foreground ml-2 truncate">tarbuton.app</span>
              </div>
              <div className="rounded-b-xl bg-secondary/40 border border-t-0 border-border aspect-video flex items-center justify-center overflow-hidden">
                {desktopImg ? (
                  <img src={desktopImg} alt={`${title} desktop view`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Monitor size={32} strokeWidth={1.5} className="mx-auto mb-2 text-primary/40" />
                    <span className="text-sm">Desktop View</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile mockup */}
            <div className="relative w-32 md:w-36 flex-shrink-0">
              <div className="rounded-[1.2rem] bg-secondary/40 border-2 border-border aspect-[9/19] flex items-center justify-center overflow-hidden relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-border" />
                {mobileImg ? (
                  <img src={mobileImg} alt={`${title} mobile view`} className="w-full h-full object-cover rounded-[1rem]" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Smartphone size={20} strokeWidth={1.5} className="mx-auto mb-1 text-primary/40" />
                    <span className="text-[10px]">Mobile</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          className="glass-card p-8 md:p-10 border-l-4 border-accent/40 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">The Problem</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">{problem}</p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.h3
            className="text-2xl font-bold text-foreground text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={slow}
          >
            Process <span className="text-primary">Steps</span>
          </motion.h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />

            {steps.map((step, i) => {
              const Icon = iconMap[step.label] || MapPin;
              return (
                <motion.div
                  key={i}
                  className="relative pl-16 pb-10 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...slow, delay: i * 0.15 }}
                >
                  {/* Node */}
                  <div className="absolute left-3 top-1 w-7 h-7 rounded-full bg-secondary border border-primary/30 flex items-center justify-center">
                    <Icon size={14} strokeWidth={1.5} className="text-primary" />
                  </div>

                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-foreground mb-1.5">{step.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {presentationLink && (
          <div className="text-center">
            <a
              href={presentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-2xl animate-pulse-glow hover:opacity-90 transition-opacity text-lg"
            >
              <Download size={20} strokeWidth={1.5} />
              Download Full Case Study
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudySection;
