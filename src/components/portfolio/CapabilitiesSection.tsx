import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, BarChart3, Landmark, Rocket, Bot, Cpu, Lightbulb } from "lucide-react";
import { useCapabilities } from "@/hooks/use-portfolio-data";
import { useRef } from "react";
import monsteraImg from "@/assets/monstera-leaf.png";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fallbackSkills = [
  "RBAC (Role-Based Access Control)",
  "Data-Driven Decision Making",
  "GovTech Compliance",
  "B2B SaaS Strategy",
];

const fallbackAI = [
  { name: "Automation & Agents", level: "Native" },
  { name: "Prototyping & Logic validation", level: "Native" },
  { name: "Synthesis & Strategic Discovery", level: "Native" },
];

const skillIcons = [ShieldCheck, BarChart3, Landmark, Rocket];
const aiIcons = [Bot, Cpu, Lightbulb];

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const CapabilitiesSection = () => {
  const { data: capabilities } = useCapabilities();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const dbSkills = capabilities?.filter((c: any) => c.category?.trim() === "skill") ?? [];
  const dbAI = capabilities?.filter((c: any) => c.category?.trim() === "AI") ?? [];

  const skills = dbSkills.length > 0
    ? dbSkills.map((s: any) => s.skill_name?.trim())
    : fallbackSkills;

  const aiCapabilities = dbAI.length > 0
    ? dbAI.map((a: any) => ({ name: a.skill_name?.trim(), level: a.proficiency_label || "" }))
    : fallbackAI;

  return (
    <section id="capabilities" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/[0.04] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <motion.img
        src={monsteraImg}
        alt=""
        className="absolute -bottom-24 -left-24 w-[550px] h-[550px] object-contain pointer-events-none select-none"
        style={{
          opacity: 0.7,
          mixBlendMode: "screen",
          y: parallaxY,
          filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.5)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.25)) brightness(0.5) saturate(1.4)",
          transform: "rotate(-15deg)",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          className="text-[32px] md:text-[48px] font-bold text-center mb-16 text-foreground"
          style={font}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          Core <span className="text-accent">Capabilities</span>
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Strategic Skills */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
              style={font}
            >
              Strategic Skills
            </motion.h3>
            <div className="space-y-3">
              {skills.map((label: string, i: number) => {
                const Icon = skillIcons[i % skillIcons.length];
                return (
                  <motion.div
                    key={label}
                    variants={popIn}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
                    className="flex items-center gap-3.5 px-5 py-3 rounded-2xl text-foreground/90 cursor-default transition-colors duration-300 backdrop-blur-md"
                    style={{ ...font, background: "hsla(0, 0%, 14%, 0.5)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center" style={{ background: "hsla(0, 0%, 100%, 0.08)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
                      <Icon size={16} strokeWidth={1.5} className="text-foreground" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Capabilities */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
              style={font}
            >
              AI Capabilities
            </motion.h3>
            <div className="space-y-3">
              {aiCapabilities.map((item: { name: string; level: string }, i: number) => {
                const Icon = aiIcons[i % aiIcons.length];
                return (
                  <motion.div
                    key={item.name}
                    variants={popIn}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
                    className="flex items-center gap-3.5 px-5 py-3 rounded-2xl text-foreground backdrop-blur-md cursor-default transition-colors duration-300"
                    style={{
                      ...font,
                      background: "hsla(0, 0%, 14%, 0.6)",
                      border: "1px solid hsla(180, 43%, 30%, 0.15)",
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center" style={{ background: "hsla(0, 0%, 100%, 0.08)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
                      <Icon size={16} strokeWidth={1.5} className="text-foreground" />
                    </div>
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                    {item.level && (
                      <span className="text-xs text-accent font-medium">{item.level}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
