import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, AlertTriangle, Lightbulb, Route, BarChart3, GitMerge, Monitor, Smartphone } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";
import eucalyptusImg from "@/assets/eucalyptus-branch.png";
import ScreenshotLightbox from "./ScreenshotLightbox";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const stepIcons = [Compass, AlertTriangle, Lightbulb, Route, BarChart3, GitMerge];

const ProcessStepCard = ({ step, index }: { step: { label: string; desc: string; details?: string }; index: number }) => {
  const Icon = stepIcons[index] || Compass;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
      className="rounded-2xl p-6 flex flex-col relative overflow-hidden transition-colors duration-300"
      style={{
        background: "hsla(0, 0%, 12%, 0.9)",
        border: "1px solid hsla(180, 43%, 30%, 0.15)",
        minHeight: "200px",
      }}
    >
      {/* Muted teal step number */}
      <span
        className="absolute top-4 right-5 text-4xl font-black select-none"
        style={{ ...font, color: "hsla(36, 90%, 44%, 0.25)" }}
      >
        {index + 1}
      </span>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "hsla(180, 43%, 30%, 0.12)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
      >
        <Icon size={18} strokeWidth={1} className="text-white" />
      </div>

      {/* Label */}
      <h4 className="text-base font-semibold text-accent mb-2" style={font}>{step.label}</h4>

      {/* Description — always fully visible */}
      <p className="text-sm leading-relaxed flex-1" style={{ ...font, color: "hsla(180, 30%, 75%, 1)" }}>{step.desc}</p>

      {/* Details — always fully visible */}
      {step.details && (
        <div
          className="mt-3 pt-3 text-sm leading-relaxed"
          style={{ ...font, color: "hsla(180, 30%, 80%, 0.9)", borderTop: "1px solid hsla(180, 43%, 30%, 0.1)" }}
        >
          {step.details}
        </div>
      )}
    </motion.div>
  );
};

const DesktopMockup = ({ img, title, onClick }: { img?: string | null; title: string; onClick?: () => void }) => (
  <div className={`w-full ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
    <div className="rounded-t-xl bg-secondary/80 flex items-center gap-2 px-4 py-2.5" style={{ border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
      </div>
      <span className="text-[10px] text-muted-foreground ml-2 truncate">tarbuton.app/dashboard</span>
    </div>
    <div
      className="rounded-b-xl aspect-video flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #244D4D 0%, #1a3a3a 50%, #2D6A6A 100%)", border: "1px solid hsla(180, 43%, 30%, 0.15)", borderTop: "none" }}
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
    <div className="mx-auto w-[60%] h-2 bg-secondary/60 rounded-b-lg" style={{ border: "1px solid hsla(180, 43%, 30%, 0.15)", borderTop: "none" }} />
  </div>
);

const MobileMockup = ({ img, label, offset = false, onClick }: { img?: string | null; label: string; offset?: boolean; onClick?: () => void }) => (
  <div className={`relative w-28 md:w-36 ${offset ? "mt-8" : ""} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
    <div
      className="rounded-[1.4rem] aspect-[9/19] flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background: offset ? "linear-gradient(180deg, #2D6A6A 0%, #244D4D 100%)" : "linear-gradient(180deg, #244D4D 0%, #2D6A6A 100%)",
        border: "1px solid hsla(180, 43%, 30%, 0.15)",
      }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const cs = caseStudies?.[0];

  const title = cs?.title || "TarbutON";
  const tagline = "An interactive deep-dive into cultural education transformation.";
  const problem = cs?.problem_statement || "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.";
  const desktopImg = null;
  const mobileImg = null;
  const dbSteps = cs?.process_steps as Array<{ label: string; desc: string; details?: string }> | null;

  const defaultSteps = [
    { label: "Mapping", desc: "Comprehensive stakeholder landscape analysis and regulatory framework review." },
    { label: "Pain Points", desc: "Deep-dive user research uncovering fragmented workflows and adoption barriers." },
    { label: "Solution", desc: "Designed modular platform architecture enabling rapid iteration." },
    { label: "Roadmap", desc: "Phased delivery plan balancing quick wins with long-term scalability." },
    { label: "Metrics", desc: "Defined success KPIs and built measurement frameworks." },
    { label: "Flow", desc: "End-to-end user flow optimization reducing friction." },
  ];

  const steps = dbSteps && dbSteps.length > 0 ? dbSteps : defaultSteps;

  return (
    <section id="casestudy" ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: "#1A1A1B" }}>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      {/* Eucalyptus branch - right edge */}
      <motion.img
        src={eucalyptusImg}
        alt=""
        className="absolute top-0 -right-4 w-[400px] h-full object-contain pointer-events-none select-none hidden lg:block"
        style={{
          opacity: 0.85,
          mixBlendMode: "screen",
          y: parallaxY,
          filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.5)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.25)) brightness(0.5) saturate(1.4)",
          zIndex: 0,
        }}
      />

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
          style={{ background: "#242426", border: "none" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white mb-3" style={font}>The Problem</h3>
            <p className="leading-relaxed text-lg" style={{ ...font, color: "#E2E8F0" }}>{problem}</p>
          </div>
        </motion.div>

        {/* ═══ Process Steps — 3x2 Grid ═══ */}
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

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, i) => (
              <ProcessStepCard key={i} step={step} index={i} />
            ))}
          </motion.div>
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
      </div>
    </section>
  );
};

export default CaseStudySection;
