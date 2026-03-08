import { motion } from "framer-motion";
import { MapPin, Lightbulb, Settings, Route, Download, Monitor, Smartphone } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";
import leafVeinImg from "@/assets/leaf-vein.png";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const iconMap: Record<string, typeof MapPin> = { Mapping: MapPin, Insights: Lightbulb, Solutions: Settings, Roadmap: Route };

const fallbackSteps = [
  { label: "Mapping", desc: "Comprehensive stakeholder landscape analysis and regulatory framework review across government sectors." },
  { label: "Insights", desc: "Deep-dive user research uncovering fragmented workflows and adoption barriers in legacy systems." },
  { label: "Solutions", desc: "Designed modular platform architecture enabling rapid iteration under strict compliance constraints." },
  { label: "Roadmap", desc: "Phased delivery plan balancing quick wins with long-term platform scalability and stakeholder buy-in." },
];

const font = { fontFamily: "'Lexend', sans-serif" } as const;

/* ─── Glass device placeholder ─── */
const DesktopMockup = ({ img, title }: { img?: string | null; title: string }) => (
  <div className="w-full">
    <div className="rounded-t-xl bg-secondary/80 border border-border px-4 py-2.5 flex items-center gap-2">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
      </div>
      <span className="text-[10px] text-muted-foreground ml-2 truncate">tarbuton.app/dashboard</span>
    </div>
    <div
      className="rounded-b-xl border border-t-0 border-border aspect-video flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #244D4D 0%, #1a3a3a 50%, #2D6A6A 100%)" }}
    >
      {img ? (
        <img src={img} alt={`${title} desktop`} className="w-full h-full object-cover" />
      ) : (
        <>
          <Monitor size={36} strokeWidth={1} className="text-foreground/30 mb-3" />
          <span className="text-sm font-medium text-foreground/50">TarbutON Dashboard</span>
          <span className="text-[10px] text-foreground/30 mt-1">Screenshot placeholder</span>
        </>
      )}
    </div>
    <div className="mx-auto w-[60%] h-2 bg-secondary/60 rounded-b-lg border border-t-0 border-border" />
  </div>
);

const MobileMockup = ({ img, label, offset = false }: { img?: string | null; label: string; offset?: boolean }) => (
  <div className={`relative w-28 md:w-36 ${offset ? "mt-8" : ""}`}>
    <div
      className="rounded-[1.4rem] border-2 border-border aspect-[9/19] flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: offset ? "linear-gradient(180deg, #2D6A6A 0%, #244D4D 100%)" : "linear-gradient(180deg, #244D4D 0%, #2D6A6A 100%)" }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border/50" />
      {img ? (
        <img src={img} alt={label} className="w-full h-full object-cover rounded-[1.2rem]" />
      ) : (
        <>
          <Smartphone size={20} strokeWidth={1} className="text-foreground/30 mb-2" />
          <span className="text-[9px] font-medium text-foreground/50 px-2 text-center">{label}</span>
        </>
      )}
    </div>
  </div>
);

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
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={font}>
            Case Study — <span className="text-accent">{title}</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto" style={font}>{tagline}</p>
        </motion.div>

        {/* ═══ Z-Row 1: Text Left + Desktop Right ═══ */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          {/* Text — Problem & Mapping */}
          <div>
            <div className="glass-card-frost p-8 border-l-4 border-foreground/20 relative overflow-hidden mb-8">
              <img
                src={leafVeinImg}
                alt=""
                className="absolute -right-8 -bottom-8 w-40 h-40 object-cover opacity-[0.08] rotate-12"
                style={{
                  maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-3" style={font}>The Problem</h3>
                <p className="text-muted-foreground leading-relaxed" style={font}>{problem}</p>
              </div>
            </div>

            {/* Mapping step */}
            {steps.slice(0, 2).map((step, i) => {
              const Icon = iconMap[step.label] || MapPin;
              return (
                <div key={i} className="glass-card-frost p-5 mb-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center mt-0.5">
                    <Icon size={15} strokeWidth={1.5} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" style={font}>{step.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={font}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Mockup */}
          <div className="glass-card-frost p-6 md:p-8">
            <DesktopMockup img={desktopImg} title={title} />
          </div>
        </motion.div>

        {/* ═══ Z-Row 2: Mobiles Left + Text Right ═══ */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          {/* Mobile Mockups */}
          <div className="glass-card-frost p-8 md:p-10 flex justify-center gap-5">
            <MobileMockup img={mobileImg} label="TarbutON Mobile App" />
            <MobileMockup img={null} label="TarbutON Mobile App" offset />
          </div>

          {/* Text — Metrics & Flow */}
          <div>
            {steps.slice(2).map((step, i) => {
              const Icon = iconMap[step.label] || MapPin;
              return (
                <div key={i} className="glass-card-frost p-5 mb-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center mt-0.5">
                    <Icon size={15} strokeWidth={1.5} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1" style={font}>{step.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={font}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {presentationLink && (
          <div className="text-center">
            <a
              href={presentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-2xl animate-pulse-glow hover:opacity-90 transition-opacity text-lg"
              style={font}
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
