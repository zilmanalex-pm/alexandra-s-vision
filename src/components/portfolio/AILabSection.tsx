import { motion } from "framer-motion";
import { Terminal, Workflow, Bot, FlaskConical, GitBranch, Globe2 } from "lucide-react";

const slow = { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

type LabCard = {
  icon: typeof Terminal;
  title: string;
  subtitle: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  skills: string[];
};

const cards: LabCard[] = [
  {
    icon: Workflow,
    title: "Operational Automation & Data Routing Engine",
    subtitle: "Project: 'Pomogusha' / Make.com Architecture",
    imageUrl: "/lovable-uploads/06a16af7-874e-40a4-a931-4db57bcdc7db.png",
    challenge:
      "Managing multi-stakeholder personal and professional operations efficiently without manual overhead.",
    solution:
      "Built 'Pomogusha,' an automated data-routing engine using Make.com. The architecture features a central data ingest, conditional routing logic to parse data into specialized domain tables (Operational, Analytical, Growth), and automated webhooks pushing real-time alerts to Telegram endpoints.",
    skills: ["Systems Thinking", "Data Architecture", "Event-Driven Automation"],
  },
  {
    icon: Bot,
    title: "AI Persona Engineering & Workflow Automation",
    subtitle: "Project: My LinkedIn Engine / Autonomous Agent Engine",
    imageUrl: "/lovable-uploads/LinkedIN%20Engine.png",
    challenge:
      "Scaling professional presence and content creation while maintaining a highly specific, authentic individual brand voice and rigorous quality control.",
    solution:
      "Developed a closed-loop AI content engine. Engineered a dual-file system architecture combining a stylistic framework with a personalized linguistic blueprint, governed by strict execution guardrails ('The Alexandra Protocol') to automate continuous high-fidelity professional output.",
    skills: ["AI Productization", "Prompt Architecture", "Knowledge-Base Engineering"],
  },
  {
    icon: FlaskConical,
    title: "Enterprise Transformation: AI-Powered QA Orchestration",
    subtitle: "Framework: Feature Testing Complete Lifecycle",
    imageUrl: "/lovable-uploads/Feature%20Testing.png",
    challenge:
      "Accelerating the enterprise testing cycle without sacrificing quality benchmarks or alignment across cross-functional R&D and Product teams.",
    solution:
      "Designed an end-to-end Feature Testing Framework integrating specialized AI testing agents. Spearheaded the technical architecture for the 'Learn & Build' phase, mapping specific testing dimensions (Robustness, Compatibility, Interoperability) to an automated strategy generator, successfully minimizing manual test plan creation times.",
    skills: ["Technical Roadmap Design", "Cross-Functional Alignment", "AI Agent Deployment Strategy"],
  },
  {
    icon: GitBranch,
    title: "AI Skill Architecture & GitOps Framework",
    subtitle: "Repository: cowork-skills / Safe Harbor Project",
    imageUrl: "/lovable-uploads/GitHub%20Repo.png",
    challenge:
      "Version-controlling prompt variations, agent personas, and systemic AI rules without losing track of code deployments.",
    solution:
      "Developed a centralized, modular repository (cowork-skills) to version-control and scale custom AI agent workflows. Implemented a structured directory configuration isolating system personas (Brand Strategist, Growth Specialist, Web Developer) from reusable functional skill layers, enabling iterative prompt engineering updates via structured Git commits.",
    skills: [
      "Technical Product Operations",
      "Git Workflow",
      "Architecture Modularization",
      "AI Agent Lifecycle Management",
    ],
  },
  {
    icon: Globe2,
    title: "Bilingual Client Platform Delivery",
    subtitle: "Live Product: Psychotherapist Production Site",
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80",
    challenge:
      "Launching a highly specialized, human-centric professional digital presence within tight timeline constraints while ensuring localization across multiple languages.",
    solution:
      "Engineered and shipped a production-ready, highly intuitive website for a psychotherapist using advanced terminal development environments (Claude Code). Managed the complete lifecycle from requirements gathering and localized UX copy mapping (Hebrew/Russian) to deployment optimization.",
    skills: ["End-to-End Delivery", "Localization Strategy", "Agile Prototyping", "AI-Assisted Engineering"],
  },
];

const AILabSection = () => {
  return (
    <section
      id="ai-lab"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(0,0%,7%) 0%, hsl(220,15%,9%) 50%, hsl(0,0%,7%) 100%)",
      }}
    >
      {/* Terminal-style grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsla(180,43%,40%,0.35) 1px, transparent 1px), linear-gradient(90deg, hsla(180,43%,40%,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/[0.08] blur-[160px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/[0.05] blur-[160px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "hsla(180,43%,30%,0.12)",
              border: "1px solid hsla(180,43%,40%,0.3)",
            }}
          >
            <Terminal size={14} strokeWidth={1.5} className="text-primary" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium" style={{ fontFamily: "'Lexend', sans-serif" }}>
              AI & Automation Lab
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            From Concept to <span className="text-accent">Code</span>
          </h2>
          <p className="text-foreground/65 max-w-2xl mx-auto text-base md:text-lg">
            A live build-log of AI systems, automation pipelines, and product experiments
            shipped end-to-end.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={i}
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(160deg, hsla(220,15%,11%,0.95) 0%, hsla(0,0%,8%,0.95) 100%)",
                  border: "1px solid hsla(180,43%,40%,0.18)",
                  boxShadow: "0 4px 30px hsla(0,0%,0%,0.4)",
                }}
              >
                {/* Animated border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsla(180,60%,50%,0.45), 0 0 40px hsla(180,60%,45%,0.25), inset 0 0 30px hsla(180,60%,40%,0.05)",
                  }}
                />

                {/* Image placeholder with terminal header */}
                <div
                  className="relative aspect-[16/9] overflow-hidden border-b"
                  style={{
                    background:
                      "linear-gradient(135deg, hsla(180,30%,15%,0.6) 0%, hsla(220,20%,10%,0.6) 100%)",
                    borderColor: "hsla(180,43%,40%,0.15)",
                  }}
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                  {/* terminal dots */}
                  <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70" />
                  </div>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-mono z-10">
                    ~/lab/0{i + 1}
                  </div>
                  {/* faint grid */}
                  <div
                    className="absolute inset-1 opacity-30 pointer-events-none z-[1]"
                    style={{
                      backgroundImage:
                        "linear-gradient(hsla(180,40%,50%,0.15) 1px, transparent 1px), linear-gradient(90deg, hsla(180,40%,50%,0.15) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* scanline */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, hsl(0,0%,100%) 0px, hsl(0,0%,100%) 1px, transparent 1px, transparent 3px)",
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: "hsla(180,43%,30%,0.18)",
                        border: "1px solid hsla(180,43%,40%,0.3)",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-base md:text-lg font-semibold text-foreground leading-snug"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-primary/80 mt-1 font-mono">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-2 mb-5 text-sm">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent/90 font-mono block mb-1">
                        // Challenge
                      </span>
                      <p className="text-foreground/70 leading-relaxed">{card.challenge}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent/90 font-mono block mb-1">
                        // Solution
                      </span>
                      <p className="text-foreground/80 leading-relaxed">{card.solution}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t flex flex-wrap gap-1.5" style={{ borderColor: "hsla(180,43%,40%,0.12)" }}>
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10.5px] font-medium px-2.5 py-1 rounded-md tracking-wide"
                        style={{
                          background: "hsla(36,90%,44%,0.1)",
                          border: "1px solid hsla(36,90%,44%,0.3)",
                          color: "hsl(36,90%,65%)",
                          fontFamily: "'Lexend', sans-serif",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AILabSection;