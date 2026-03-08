import { motion } from "framer-motion";
import { MapPin, Lightbulb, Settings, Download, Monitor, Smartphone } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";
import leafVeinImg from "@/assets/leaf-vein.png";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const processSteps = [
  { icon: MapPin, label: "Mapping", desc: "Comprehensive stakeholder landscape analysis and regulatory framework review across government sectors." },
  { icon: Lightbulb, label: "Insights", desc: "Deep-dive user research uncovering fragmented workflows and adoption barriers in legacy systems." },
  { icon: Settings, label: "Solutions", desc: "Designed modular platform architecture enabling rapid iteration under strict compliance constraints." },
];

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

  const title = cs?.title || "TarbutON";
  const tagline = cs?.tagline || "An interactive deep-dive into cultural education transformation.";
  const problem = cs?.problem_statement || "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.";
  const presentationLink = cs?.presentation_link;
  const desktopImg = cs?.desktop_image_url;
  const mobileImg = cs?.mobile_image_url;
  const dbSteps = cs?.process_steps as Array<{ label: string; desc: string }> | null;

  // Merge DB steps with icons if available
  const steps = dbSteps && dbSteps.length >= 3
    ? dbSteps.slice(0, 3).map((s, i) => ({ ...processSteps[i], ...s }))
    : processSteps;

  return (
    <section id="casestudy" className="relative py-28 px-6" style={{ background: "#1A1A1B" }}>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={font}>
            Case <span className="text-accent">Study</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ ...font, color: "#A3B8B8" }}>{tagline}</p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          className="rounded-3xl p-8 md:p-10 mb-16 max-w-3xl mx-auto relative overflow-hidden"
          style={{ background: "hsla(180, 30%, 16%, 0.7)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <img
            src={leafVeinImg}
            alt=""
            className="absolute -right-8 -bottom-8 w-40 h-40 object-cover opacity-[0.08] rotate-12"
            style={{ maskImage: "radial-gradient(circle, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white mb-3" style={font}>The Problem</h3>
            <p className="leading-relaxed text-lg text-white/90" style={font}>{problem}</p>
          </div>
        </motion.div>

        {/* ═══ Process Steps — Horizontal 3-Column Grid ═══ */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-10" style={font}>
            Process <span className="text-accent">Steps</span>
          </h3>

          {/* Connector line + cards */}
          <div className="relative">
            {/* Horizontal connector line (desktop only) */}
            <div className="hidden md:block absolute top-[56px] left-[16.67%] right-[16.67%] h-0.5 bg-accent/40 z-0" />

            <motion.div
              className="gap-6 relative z-10"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {steps.map((step, i) => {
                const Icon = processSteps[i]?.icon || MapPin;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="rounded-3xl p-7 flex flex-col"
                    style={{
                      background: "hsla(180, 30%, 16%, 0.85)",
                      border: "1px solid hsla(180, 43%, 30%, 0.25)",
                      minHeight: "220px",
                    }}
                  >
                    <div className="w-12 h-12 rounded-full backdrop-blur-xl border border-primary/30 flex items-center justify-center mb-5" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
                      <Icon size={22} strokeWidth={1.5} className="text-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold text-accent mb-3" style={font}>{step.label}</h4>
                    <p className="text-sm leading-relaxed mt-auto" style={{ ...font, color: "hsla(180, 30%, 80%, 1)" }}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ Device Mockups — Z-Pattern ═══ */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="rounded-3xl p-6 md:p-8" style={{ background: "hsla(180, 30%, 16%, 0.5)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
            <DesktopMockup img={desktopImg} title={title} />
          </div>
          <div className="rounded-3xl p-8 md:p-10 flex justify-center gap-5" style={{ background: "hsla(180, 30%, 16%, 0.5)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
            <MobileMockup img={mobileImg} label="TarbutON Mobile App" />
            <MobileMockup img={null} label="TarbutON Mobile App" offset />
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
